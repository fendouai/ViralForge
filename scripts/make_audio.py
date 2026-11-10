#!/usr/bin/env python3
"""Synthesize the three demo BGM beds. Pure numpy, no external samples."""
import os
import wave

import numpy as np

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "audio")

TRACKS = {
    # id, duration, bpm, root, minor?, mood
    "glow": (15.0, 96, 220.00, True, "warm"),
    "tote": (14.0, 112, 146.83, False, "crisp"),
    "lamp": (13.0, 72, 174.61, True, "ambient"),
}


def freq(root, semitones):
    return root * (2 ** (semitones / 12))


def env(n, attack, decay, release=0.0):
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    d = np.exp(-t / max(decay, 1e-4))
    if release > 0:
        r = np.clip((n / SR - t) / release, 0, 1)
        return a * d * r
    return a * d


def add(buf, signal, at, pan=0.0, gain=1.0):
    start = int(at * SR)
    if start >= buf.shape[1]:
        return
    end = min(start + len(signal), buf.shape[1])
    sig = signal[: end - start] * gain
    left = np.sqrt((1 - pan) / 2)
    right = np.sqrt((1 + pan) / 2)
    buf[0, start:end] += sig * left
    buf[1, start:end] += sig * right


def sine(f, n, amp=0.2, phase=0.0):
    t = np.arange(n) / SR
    return amp * np.sin(2 * np.pi * f * t + phase)


def pluck(f, dur, amp=0.2):
    n = int(dur * SR)
    t = np.arange(n) / SR
    tone = (
        np.sin(2 * np.pi * f * t)
        + 0.35 * np.sin(2 * np.pi * f * 2 * t)
        + 0.14 * np.sin(2 * np.pi * f * 3 * t)
    )
    return tone * env(n, 0.004, 0.16) * amp


def kick(dur=0.32, amp=0.5):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = 105 * np.exp(-t * 22) + 42
    phase = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(phase) * env(n, 0.002, 0.13) * amp


def hat(dur=0.05, amp=0.09):
    n = int(dur * SR)
    noise = np.random.default_rng(7).normal(0, 1, n)
    noise = np.diff(noise, prepend=0)
    return noise * env(n, 0.001, 0.02) * amp


def whoosh(dur=0.7, amp=0.12):
    n = int(dur * SR)
    noise = np.random.default_rng(3).normal(0, 1, n)
    smooth = np.convolve(noise, np.ones(28) / 28, mode="same")
    t = np.arange(n) / SR
    shape = np.clip(t / 0.1, 0, 1) * np.clip((dur - t) / 0.3, 0, 1)
    return smooth * shape * amp


def build(track_id, duration, bpm, root, minor, mood):
    n = int(duration * SR) + SR
    buf = np.zeros((2, n))
    beat = 60.0 / bpm
    bar = beat * 4
    chord = [0, 3, 7, 10] if minor else [0, 4, 7, 11]
    rng = np.random.default_rng(11)

    bars = int(np.ceil(duration / bar))
    for b in range(bars):
        at = b * bar
        if at >= duration:
            break
        length = min(bar, duration - at)
        # pad
        pad_n = int((length + 0.8) * SR)
        pad_signal = np.zeros(pad_n)
        for semitone in chord:
            f = freq(root, semitone)
            for detune in (-0.6, 0.6):
                pad_signal += sine(f + detune, pad_n, amp=0.035, phase=rng.random() * 6.28)
        pad_signal *= env(pad_n, 0.7, 2.2, release=0.6)
        add(buf, pad_signal, at, pan=-0.15, gain=0.9)

        # bass
        for beat_i in range(int(np.ceil(length / beat))):
            bass_at = at + beat_i * beat
            if bass_at >= duration:
                break
            bass_n = int(beat * 0.9 * SR)
            bass = sine(freq(root, 0) / 2, bass_n, amp=0.16)
            bass *= env(bass_n, 0.01, 0.28)
            add(buf, bass, bass_at, pan=0.0, gain=0.9)

        # arpeggio
        if mood != "ambient":
            steps = int(length / (beat / 2))
            for step in range(steps):
                note_at = at + step * beat / 2
                if note_at >= duration:
                    break
                semitone = chord[step % len(chord)] + (12 if step % 4 == 2 else 0)
                add(
                    buf,
                    pluck(freq(root, semitone) * 2, beat * 0.7, amp=0.1),
                    note_at,
                    pan=0.35 if step % 2 else -0.35,
                    gain=0.9,
                )
        else:
            for step in range(2):
                note_at = at + step * bar / 2
                if note_at >= duration:
                    break
                add(buf, pluck(freq(root, 12), 1.6, amp=0.11), note_at, pan=0.25, gain=0.9)

        # drums
        if mood != "ambient":
            for beat_i in range(int(np.ceil(length / beat))):
                kick_at = at + beat_i * beat
                if kick_at >= duration:
                    break
                add(buf, kick(amp=0.42 if beat_i % 2 == 0 else 0.3), kick_at, gain=1.0)
                add(buf, hat(), kick_at + beat / 2, pan=0.3)
        else:
            for beat_i in range(int(np.ceil(length / (beat * 2)))):
                add(buf, hat(amp=0.035), at + beat_i * beat * 2, pan=0.4)

    # scene-change risers
    boundaries = [2.4, 5.2, 8.2, 11.6] if track_id == "glow" else (
        [2.6, 5.4, 8.4, 11.4] if track_id == "tote" else [2.2, 4.8, 8.0, 10.8]
    )
    for boundary in boundaries:
        add(buf, whoosh(), boundary - 0.7, pan=0.0, gain=0.9)

    # sub drone
    drone = sine(freq(root, 0) / 4, n, amp=0.05)
    drone *= np.clip(np.arange(n) / SR / 1.5, 0, 1)
    buf[0] += drone
    buf[1] += drone

    # fades
    tt = np.arange(n) / SR
    fade = np.clip(tt / 0.8, 0, 1) * np.clip((duration - tt) / 1.2, 0, 1)
    buf *= fade

    # gentle limiting / normalize
    peak = np.max(np.abs(buf))
    if peak > 0:
        buf = buf / peak * 0.72
    buf = np.tanh(buf * 1.2) * 0.9
    buf = np.clip(buf, -1, 1)
    return buf[:, : int(duration * SR)]


def write_wav(path, stereo):
    pcm = (stereo.T * 32767).astype(np.int16)
    with wave.open(path, "wb") as fh:
        fh.setnchannels(2)
        fh.setsampwidth(2)
        fh.setframerate(SR)
        fh.writeframes(pcm.tobytes())


def main():
    os.makedirs(OUT, exist_ok=True)
    for track_id, (duration, bpm, root, minor, mood) in TRACKS.items():
        buf = build(track_id, duration, bpm, root, minor, mood)
        path = os.path.abspath(os.path.join(OUT, f"{track_id}.wav"))
        write_wav(path, buf)
        print(f"wrote {path} · {duration:.1f}s · peak {np.max(np.abs(buf)):.2f}")


if __name__ == "__main__":
    main()
