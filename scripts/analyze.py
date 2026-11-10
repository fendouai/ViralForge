#!/usr/bin/env python3
"""Structural video analysis used by the ViralForge CLI.

Real local analysis: shot cuts (OpenCV), audio energy and tempo (numpy).
Speech alignment and multimodal annotation are opt-in upgrades that need
WhisperX or a model provider.
"""
import argparse
import json
import os
import subprocess
import sys
import tempfile
import wave

import cv2
import numpy as np

SR = 22050


def probe(path):
    out = subprocess.check_output(
        [
            "ffprobe", "-v", "error", "-select_streams", "v:0",
            "-show_entries", "stream=width,height,r_frame_rate",
            "-show_entries", "format=duration",
            "-of", "json", path,
        ],
        text=True,
    )
    data = json.loads(out)
    stream = data["streams"][0]
    num, den = stream.get("r_frame_rate", "30/1").split("/")
    return {
        "width": int(stream["width"]),
        "height": int(stream["height"]),
        "fps": round(float(num) / float(den or 1), 3),
        "duration": round(float(data["format"]["duration"]), 3),
    }


def detect_shots(path, duration, sample_fps=8.0, threshold=0.26):
    cap = cv2.VideoCapture(path)
    source_fps = cap.get(cv2.CAP_PROP_FPS) or 30
    step = max(1, int(round(source_fps / sample_fps)))
    previous = None
    times = []
    index = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if index % step == 0:
            small = cv2.resize(frame, (160, 284))
            hsv = cv2.cvtColor(small, cv2.COLOR_BGR2HSV)
            hist = cv2.calcHist([hsv], [0, 1, 2], None, [8, 8, 8], [0, 180, 0, 256, 0, 256])
            cv2.normalize(hist, hist)
            if previous is not None:
                distance = cv2.compareHist(previous, hist, cv2.HISTCMP_BHATTACHARYYA)
                if distance > threshold and index / source_fps - cuts[-1] > 0.6:
                    cuts.append(round(index / source_fps, 2))
            else:
                cuts = [0.0]
            previous = hist
        index += 1
    cap.release()

    if duration - cuts[-1] < 0.4 and len(cuts) > 1:
        cuts.pop()
    cuts.append(round(duration, 2))

    shots = []
    for i in range(len(cuts) - 1):
        start, end = cuts[i], cuts[i + 1]
        shots.append(
            {
                "id": f"s{i + 1}",
                "start": round(start, 2),
                "end": round(end, 2),
                "duration": round(end - start, 2),
                "wordRange": [i * 4, i * 4 + 3],
                "label": f"shot-{i + 1}",
                "caption": "",
                "productLock": False,
                "dirty": False,
            }
        )
    return shots


def decode_audio(path):
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        wav_path = tmp.name
    try:
        subprocess.run(
            ["ffmpeg", "-y", "-v", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "wav", wav_path],
            check=True,
        )
        with wave.open(wav_path, "rb") as handle:
            frames = handle.readframes(handle.getnframes())
            width = handle.getsampwidth()
            channels = handle.getnchannels()
        dtype = {1: np.uint8, 2: np.int16, 4: np.int32}.get(width)
        if dtype is None:
            return np.array([], dtype=np.float32)
        data = np.frombuffer(frames, dtype=dtype).astype(np.float32)
        if dtype is np.uint8:
            data = (data - 128) / 128
        else:
            data = data / max(1, np.iinfo(dtype).max)
        if channels > 1:
            data = data.reshape(-1, channels).mean(axis=1)
        return data
    finally:
        if os.path.exists(wav_path):
            os.remove(wav_path)


def stft_magnitude(y, frame_size=1024, hop=512):
    if y.size < frame_size:
        return np.zeros((frame_size // 2 + 1, 0), dtype=np.float32)
    window = np.hanning(frame_size).astype(np.float32)
    frames = 1 + (len(y) - frame_size) // hop
    result = np.empty((frame_size // 2 + 1, frames), dtype=np.float32)
    for index in range(frames):
        segment = y[index * hop: index * hop + frame_size] * window
        spectrum = np.abs(np.fft.rfft(segment))
        result[:, index] = spectrum.astype(np.float32)
    return result


def analyze_audio(path, duration):
    y = decode_audio(path)
    if y.size == 0:
        return {"bpm": None, "beats": [], "rms": []}

    magnitude = stft_magnitude(y)
    if magnitude.shape[1] < 4:
        return {"bpm": None, "beats": [], "rms": []}
    flux = np.maximum(0, np.diff(magnitude, axis=1)).sum(axis=0)
    flux = flux / (np.max(flux) + 1e-8)
    flux = np.convolve(flux, np.ones(3) / 3, mode="same")

    frame_rate = SR / 512
    corr = np.correlate(flux - flux.mean(), flux - flux.mean(), mode="full")[len(flux) - 1:]
    min_lag = int(frame_rate * 60 / 180)
    max_lag = int(frame_rate * 60 / 60)
    window = corr[min_lag:max_lag]
    if window.size == 0 or np.max(window) <= 0:
        bpm = None
    else:
        lag = min_lag + int(np.argmax(window))
        bpm = round(60.0 * frame_rate / lag, 1)
        if bpm < 70:
            bpm = round(bpm * 2, 1)
        elif bpm > 180:
            bpm = round(bpm / 2, 1)

    threshold = max(0.12, flux.mean() + flux.std() * 0.8)
    beats = []
    last = -10.0
    for index, value in enumerate(flux):
        if value < threshold:
            continue
        left = flux[index - 1] if index > 0 else 0
        right = flux[index + 1] if index + 1 < len(flux) else 0
        time = index * 512 / SR
        if value >= left and value >= right and time - last > 0.22:
            beats.append(round(time, 2))
            last = time

    rms = []
    for target in np.arange(0, duration, 0.5):
        start = int(target * SR)
        end = min(len(y), start + int(SR * 0.5))
        segment = y[start:end]
        rms.append(round(float(np.sqrt(np.mean(segment**2))) if segment.size else 0.0, 4))

    return {"bpm": bpm, "beats": beats[:64], "rms": rms}


def build_report(path):
    meta = probe(path)
    shots = detect_shots(path, meta["duration"])
    audio = analyze_audio(path, meta["duration"])
    avg_shot = sum(shot["duration"] for shot in shots) / max(1, len(shots))
    pacing = "fast" if avg_shot < 1.6 else "medium" if avg_shot <= 3.0 else "slow"
    return {
        "version": "0.1",
        "generator": "viralforge analyze 0.1.0",
        "source": os.path.abspath(path),
        "meta": meta,
        "shots": shots,
        "audio": audio,
        "structure": {
            "shotCount": len(shots),
            "averageShot": round(avg_shot, 2),
            "pacing": pacing,
            "estimatedHook": round(min(3.0, meta["duration"] * 0.2), 2),
        },
        "words": [],
        "transcript": None,
        "notes": [
            "镜头切分 / 节拍 / 能量为本地真实计算。",
            "词级对齐与多模态标注需配置 WhisperX 或模型服务；Web demo 使用预置案例。",
        ],
    }


def main():
    parser = argparse.ArgumentParser(description="ViralForge structural analyzer")
    parser.add_argument("input", help="local video path")
    parser.add_argument("--out", "-o", help="write dna.json to this path")
    args = parser.parse_args()
    if not os.path.exists(args.input):
        print(f"input not found: {args.input}", file=sys.stderr)
        return 2
    report = build_report(args.input)
    payload = json.dumps(report, ensure_ascii=False, indent=2)
    if args.out:
        with open(args.out, "w", encoding="utf-8") as handle:
            handle.write(payload)
        print(f"wrote {args.out}")
        print(
            f"{report['meta']['duration']}s · {len(report['shots'])} shots · "
            f"{report['audio'].get('bpm')} BPM · {report['structure']['pacing']}"
        )
    else:
        print(payload)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
