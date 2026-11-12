#!/usr/bin/env node
/**
 * Render click-to-play poster cards for the README demo videos.
 * English posters live in docs/en; Chinese posters live in docs/zh.
 *
 * Usage: npm run docs:posters
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from '../tests/browser.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FONT = '"Helvetica Neue", "Avenir Next", "Segoe UI", Arial, sans-serif';
const MONO = '"SF Mono", Menlo, monospace';

const CASES = [
  { id: 'glow', brand: 'GLOW LAB', title: 'Overnight skin, 7-day glow', titleZh: '熬夜脸，7 天有光', duration: 15, accent: '#C9FF3D' },
  { id: 'tote', brand: 'AER', title: 'Fits the laptop. Not the office.', titleZh: '装得下电脑，还不像上班', duration: 14, accent: '#FF5A2B' },
  { id: 'lamp', brand: 'MORI', title: '30 yuan. New rental.', titleZh: '30 块，把出租屋变成样板间', duration: 13, accent: '#FFB347' },
];

const LOCALES = [
  {
    key: 'en',
    dir: 'docs/en',
    coverDir: 'public/media/en',
    kicker: 'VIRALFORGE / REPLICA',
    label: 'WATCH THE DEMO',
    sub: (item) => `${item.brand} · ${item.duration}s · ENGLISH CUT`,
    foot: 'CLICK TO PLAY',
    title: (item) => item.title,
    font: FONT,
  },
  {
    key: 'zh',
    dir: 'docs/zh',
    coverDir: 'public/media',
    kicker: 'VIRALFORGE / 复刻成片',
    label: '点击播放演示',
    sub: (item) => `${item.brand} · ${item.duration}s · 中文版`,
    foot: '点击播放',
    title: (item) => item.titleZh,
    font: '"PingFang SC", "Hiragino Sans GB", ' + FONT,
  },
];

function html(item, locale) {
  const coverPath = path.join(ROOT, locale.coverDir, `${item.id}-cover.jpg`);
  const cover = fs.readFileSync(coverPath).toString('base64');
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { box-sizing: border-box; }
    html, body { margin: 0; background: #08090A; }
    .card { width: 720px; height: 1280px; position: relative; overflow: hidden; background: #08090A; font-family: ${locale.font}; color: #F2EFE6; }
    .cover { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
    .shade { position: absolute; inset: 0; background:
      linear-gradient(180deg, rgba(8,9,10,.72) 0%, rgba(8,9,10,.06) 28%, rgba(8,9,10,0) 48%, rgba(8,9,10,.72) 78%, rgba(8,9,10,.96) 100%); }
    .play { position: absolute; left: 50%; top: 44%; transform: translate(-50%, -50%); width: 118px; height: 118px; border-radius: 50%; border: 1px solid ${item.accent}cc; background: rgba(8,9,10,.58); backdrop-filter: blur(8px); display: grid; place-items: center; box-shadow: 0 18px 60px rgba(0,0,0,.45); z-index: 3; }
    .play::before { content: ""; width: 0; height: 0; border-left: 34px solid ${item.accent}; border-top: 21px solid transparent; border-bottom: 21px solid transparent; margin-left: 9px; }
    .play::after { content: ""; position: absolute; inset: 10px; border-radius: 50%; border: 1px solid rgba(242,239,230,.16); }
    .copy-wrap { position: absolute; left: 0; right: 0; bottom: 0; height: 540px; background: linear-gradient(180deg, rgba(8,9,10,0) 0%, rgba(8,9,10,.96) 22%, #08090A 46%, #08090A 100%); z-index: 2; }
    .copy { position: absolute; left: 44px; right: 44px; bottom: 58px; z-index: 4; }
    .copy .eyebrow { font-family: ${MONO}; font-size: 10px; letter-spacing: .16em; color: ${item.accent}; margin-bottom: 12px; }
    .copy h1 { margin: 0; font-size: 38px; line-height: 1.06; letter-spacing: -.035em; font-weight: 650; max-width: 640px; }
    .copy p { margin: 14px 0 0; font-family: ${MONO}; font-size: 10px; letter-spacing: .1em; color: rgba(242,239,230,.58); }
    .copy .foot { display: inline-block; margin-top: 18px; border: 1px solid rgba(242,239,230,.18); border-radius: 999px; padding: 7px 12px; font-family: ${MONO}; font-size: 9px; letter-spacing: .12em; color: rgba(242,239,230,.76); }
  </style></head><body><div class="card">
    <img class="cover" src="data:image/jpeg;base64,${cover}" alt="" />
    <div class="shade"></div>
    <div class="play"></div>
    <div class="copy-wrap"></div>
    <div class="copy">
      <div class="eyebrow">${locale.label}</div>
      <h1>${locale.title(item)}</h1>
      <p>${locale.sub(item)}</p>
      <span class="foot">${locale.foot} · ${item.duration}s</span>
    </div>
  </div></body></html>`;
}

const browser = await launch();
const page = await browser.newPage({ viewport: { width: 720, height: 1280 }, deviceScaleFactor: 1.5 });
for (const locale of LOCALES) {
  fs.mkdirSync(path.join(ROOT, locale.dir), { recursive: true });
  for (const item of CASES) {
    await page.setContent(html(item, locale), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(ROOT, locale.dir, `demo-${item.id}.jpg`);
    await page.screenshot({ path: out, type: 'jpeg', quality: 90, animations: 'disabled' });
    console.log(`  ${locale.key}/${item.id} · ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
  }
}
await browser.close();
