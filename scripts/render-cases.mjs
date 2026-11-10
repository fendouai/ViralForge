#!/usr/bin/env node
/**
 * Render the three demo films: DOM frames via Chromium, encode with FFmpeg.
 * Usage: npm run render [-- --case glow]
 */
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FPS = 30;
const WIDTH = 720;
const HEIGHT = 1280;
const BASE_URL = process.env.VIRALFORGE_URL || 'http://127.0.0.1:5173';

const CASES = [
  { id: 'glow', duration: 15, coverAt: 6.8 },
  { id: 'tote', duration: 14, coverAt: 7.0 },
  { id: 'lamp', duration: 13, coverAt: 6.8 },
];

function findBrowser() {
  const home = os.homedir();
  const base = path.join(home, 'Library/Caches/ms-playwright');
  const candidates = [];
  for (const build of ['chromium-1254', 'chromium-1223', 'chromium-1194']) {
    candidates.push(
      path.join(base, build, 'chrome-mac-arm64', 'Google Chrome for Testing.app', 'Contents', 'MacOS', 'Google Chrome for Testing'),
    );
  }
  for (const build of ['chromium_headless_shell-1254', 'chromium_headless_shell-1223', 'chromium_headless_shell-1194']) {
    candidates.push(path.join(base, build, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell'));
  }
  candidates.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited ${code}\n${stderr.slice(-1200)}`));
    });
  });
}

async function renderCase(browser, study) {
  const frameDir = path.join(ROOT, '.render-tmp', study.id);
  fs.rmSync(frameDir, { recursive: true, force: true });
  fs.mkdirSync(frameDir, { recursive: true });

  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });

  await page.goto(`${BASE_URL}/render.html?case=${study.id}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__filmReady === true);
  await page.evaluate(() => document.fonts.ready);

  const total = Math.round(study.duration * FPS);
  const startedAt = Date.now();
  for (let index = 0; index < total; index += 1) {
    const time = index / FPS;
    await page.evaluate(async (value) => {
      window.__setTime(value);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    }, time);
    await page.screenshot({
      path: path.join(frameDir, `frame-${String(index).padStart(4, '0')}.png`),
      animations: 'disabled',
    });
    if (index % 90 === 0 && index > 0) {
      const rate = index / ((Date.now() - startedAt) / 1000);
      console.log(`  ${study.id}: ${index}/${total} frames (${rate.toFixed(1)} fps)`);
    }
  }
  await page.close();
  if (errors.length) console.warn(`  ${study.id}: console errors`, errors.slice(0, 3));

  const audio = path.join(ROOT, 'assets', 'audio', `${study.id}.wav`);
  const output = path.join(ROOT, 'public', 'media', `${study.id}.mp4`);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const args = [
    '-y',
    '-framerate', String(FPS),
    '-i', path.join(frameDir, 'frame-%04d.png'),
  ];
  if (fs.existsSync(audio)) args.push('-i', audio);
  args.push(
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
  );
  if (fs.existsSync(audio)) args.push('-c:a', 'aac', '-b:a', '128k', '-shortest');
  args.push(output);
  await run('ffmpeg', args);

  const cover = path.join(ROOT, 'public', 'media', `${study.id}-cover.jpg`);
  await run('ffmpeg', [
    '-y',
    '-ss', String(study.coverAt),
    '-i', output,
    '-frames:v', '1',
    '-q:v', '3',
    cover,
  ]);

  fs.rmSync(frameDir, { recursive: true, force: true });
  const size = (fs.statSync(output).size / 1024 / 1024).toFixed(1);
  console.log(`  ${study.id}: ${output} · ${size} MB · cover ${study.coverAt}s`);
}

async function main() {
  const only = process.argv.indexOf('--case');
  const target = only >= 0 ? process.argv[only + 1] : null;
  const cases = target ? CASES.filter((item) => item.id === target) : CASES;
  if (!cases.length) throw new Error(`Unknown case: ${target}`);

  const executablePath = findBrowser();
  if (!executablePath) {
    throw new Error('No Chromium found. Run `npx playwright install chromium` first.');
  }
  console.log(`Chromium: ${executablePath}`);
  const browser = await chromium.launch({ executablePath });
  try {
    for (const study of cases) {
      console.log(`Rendering ${study.id} (${study.duration}s @ ${FPS}fps)…`);
      await renderCase(browser, study);
    }
  } finally {
    await browser.close();
  }
  console.log('Done. MP4s are in public/media/.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
