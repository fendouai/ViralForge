import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXPECTED = [
  { id: 'glow', duration: 15 },
  { id: 'tote', duration: 14 },
  { id: 'lamp', duration: 13 },
];

let failed = 0;
const LOCALES = [
  { dir: '', prefix: '' },
  { dir: 'en', prefix: 'en ' },
];
for (const locale of LOCALES) {
for (const item of EXPECTED) {
  const file = path.join(ROOT, 'public', 'media', locale.dir, `${item.id}.mp4`);
  const cover = path.join(ROOT, 'public', 'media', locale.dir, `${item.id}-cover.jpg`);
  if (!fs.existsSync(file) || fs.statSync(file).size < 400_000) {
    console.log(`✗ ${item.id}: missing or too small`);
    failed += 1;
    continue;
  }
  const probe = JSON.parse(
    execFileSync('ffprobe', [
      '-v', 'error',
      '-show_entries', 'format=duration,size',
      '-show_entries', 'stream=codec_name,width,height,pix_fmt',
      '-of', 'json', file,
    ], { encoding: 'utf8' }),
  );
  const video = probe.streams.find((stream) => stream.width);
  const audio = probe.streams.find((stream) => stream.codec_name === 'aac');
  const duration = Number(probe.format.duration);
  const checks = [
    ['duration', Math.abs(duration - item.duration) < 0.25, `${duration}s`],
    ['resolution', video?.width === 720 && video?.height === 1280, `${video?.width}x${video?.height}`],
    ['codec', video?.codec_name === 'h264', video?.codec_name],
    ['pixfmt', video?.pix_fmt === 'yuv420p', video?.pix_fmt],
    ['audio', Boolean(audio), audio ? 'aac' : 'missing'],
    ['cover', fs.existsSync(cover) && fs.statSync(cover).size > 10_000, cover ? 'ok' : 'missing'],
  ];
  for (const [name, ok, detail] of checks) {
    console.log(`${ok ? '✓' : '✗'} ${locale.prefix}${item.id} ${name} · ${detail}`);
    if (!ok) failed += 1;
  }
}
}
if (failed) process.exit(1);
console.log('\nmedia checks passed');
