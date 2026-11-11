#!/usr/bin/env node
/** Local runtime self-check. No network, no API keys. */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const rows = [];
let failed = 0;

function add(name, ok, detail, required = true) {
  rows.push({ name, ok, detail, required });
  if (!ok && required) failed += 1;
}

function capture(command, args) {
  try {
    return execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
}

const nodeVersion = process.versions.node;
const [major, minor] = nodeVersion.split('.').map(Number);
add('Node.js 22.15+', major > 22 || (major === 22 && minor >= 15), `v${nodeVersion}`);

const npmVersion = capture('npm', ['-v']);
add('npm', Boolean(npmVersion), npmVersion ? `v${npmVersion}` : 'missing');

for (const [id, duration] of [['glow', 15], ['tote', 14], ['lamp', 13]]) {
  const file = path.join(ROOT, 'public', 'media', `${id}.mp4`);
  const ok = fs.existsSync(file) && fs.statSync(file).size > 400_000;
  add(`Demo film ${id}.mp4`, ok, ok ? `${duration}s · ${(fs.statSync(file).size / 1024 / 1024).toFixed(1)} MB` : 'missing');
}

const ffmpeg = capture('ffmpeg', ['-version']);
add('FFmpeg（重新渲染 / 分析视频）', Boolean(ffmpeg), ffmpeg ? ffmpeg.split('\n')[0] : 'optional · not installed', false);
const ffprobe = capture('ffprobe', ['-version']);
add('ffprobe（媒体校验）', Boolean(ffprobe), ffprobe ? 'available' : 'optional · not installed', false);

const python = capture('python3', ['--version']);
add('Python 3（CLI 结构分析）', Boolean(python), python || 'optional · not installed', false);

if (python) {
  const libs = capture('python3', ['-c', 'import numpy,cv2;print(numpy.__version__, cv2.__version__)']);
  add('numpy + opencv-python（CLI 结构分析）', Boolean(libs), libs || 'optional · pip install -r scripts/requirements.txt', false);
}

const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright');
const chromium = fs.existsSync(cache)
  ? fs.readdirSync(cache).some((entry) => entry.startsWith('chromium'))
  : false;
add('Chromium（重新渲染 / E2E 测试）', chromium, chromium ? 'Playwright cache found' : 'optional · npx playwright install chromium', false);

console.log('\nViralForge · 本地运行自检\n');
for (const row of rows) {
  const mark = row.ok ? '✓' : row.required ? '✗' : '○';
  console.log(`${mark} ${row.name}  ${row.detail ? `· ${row.detail}` : ''}`);
}
console.log('\n外部 API Key：不需要。当前版本不读取任何模型 / 平台 Key。');
console.log('启动：npm install && npm run dev   （构建后：npm run build && npm run preview）');
if (failed) {
  console.error(`\n${failed} 项必需依赖缺失。`);
  process.exit(1);
}
console.log('\n必需依赖齐全，可以本地运行。');
