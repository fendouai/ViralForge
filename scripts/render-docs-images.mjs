#!/usr/bin/env node
/**
 * Render the English documentation artwork used by README.md.
 *
 * These are designed case dossiers and pipeline diagrams, not screenshots of
 * the Chinese-first studio UI. Keeping them as generated HTML makes every word
 * in the English README easy to audit for language consistency.
 *
 * Usage: node scripts/render-docs-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from '../tests/browser.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs', 'en');

const FONT = '"Helvetica Neue", "Avenir Next", "Segoe UI", Arial, sans-serif';
const MONO = '"SF Mono", "IBM Plex Mono", Menlo, monospace';
const PAPER = '#F2EFE6';
const MUTED = '#8E9088';
const LINE = 'rgba(242,239,230,0.13)';
const INK = '#08090A';

const baseCss = `
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: ${INK}; color: ${PAPER}; }
  body { font-family: ${FONT}; -webkit-font-smoothing: antialiased; text-rendering: geometricPrecision; }
  .canvas { position: relative; overflow: hidden; background: ${INK}; }
  .mono { font-family: ${MONO}; font-size: 11px; letter-spacing: .13em; text-transform: uppercase; }
  .eyebrow { font-family: ${MONO}; font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: #C9FF3D; }
  .muted { color: ${MUTED}; }
  .accent { color: #C9FF3D; }
  .gridlines {
    position: absolute; inset: 0; pointer-events: none; opacity: .5;
    background-image: linear-gradient(rgba(242,239,230,.045) 1px, transparent 1px),
      linear-gradient(90deg, rgba(242,239,230,.045) 1px, transparent 1px);
    background-size: 80px 80px;
    mask-image: radial-gradient(90% 90% at 60% 30%, #000 20%, transparent 80%);
  }
  .grain {
    position: absolute; inset: 0; pointer-events: none; opacity: .05; mix-blend-mode: screen;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  .brand { display: flex; align-items: center; gap: 11px; font-size: 15px; font-weight: 700; letter-spacing: .22em; }
  .spark { color: #C9FF3D; width: 20px; height: 20px; }
  .pill { border: 1px solid ${LINE}; border-radius: 999px; padding: 6px 12px; font-family: ${MONO}; font-size: 10px; letter-spacing: .12em; text-transform: uppercase; color: ${PAPER}; }
  .rule { height: 1px; background: ${LINE}; }
`;

function pageCss(width, height) {
  return `${baseCss}
    .canvas { width: ${width}px; height: ${height}px; }
  `;
}

const sparkSvg = `<svg class="spark" viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M16 1.5 19.6 11.2 29.5 14 20.8 19.2 18.2 29.5 14.8 20.4 4.5 18.2 13.4 13.7Z" fill="currentColor"/></svg>`;

function glowArt() {
  return `<svg viewBox="0 0 240 360" role="img" aria-label="Serum bottle">
    <defs>
      <linearGradient id="g-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F7F4E8" stop-opacity=".96"/><stop offset=".55" stop-color="#D9D6C4" stop-opacity=".9"/><stop offset="1" stop-color="#8F9A7A" stop-opacity=".85"/></linearGradient>
      <linearGradient id="g-liquid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9FF3D" stop-opacity=".55"/><stop offset="1" stop-color="#6C7A4F" stop-opacity=".9"/></linearGradient>
      <linearGradient id="g-cap" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2B2E26"/><stop offset=".5" stop-color="#55594B"/><stop offset="1" stop-color="#1B1D18"/></linearGradient>
    </defs>
    <ellipse cx="120" cy="338" rx="82" ry="12" fill="#0A0C08" opacity=".22"/>
    <rect x="94" y="34" width="52" height="28" rx="9" fill="url(#g-cap)"/>
    <rect x="102" y="60" width="36" height="42" rx="7" fill="#22251E"/>
    <rect x="68" y="96" width="104" height="234" rx="26" fill="url(#g-glass)" stroke="#F9F7EC" stroke-opacity=".55"/>
    <rect x="76" y="176" width="88" height="146" rx="18" fill="url(#g-liquid)"/>
    <rect x="76" y="176" width="88" height="8" fill="#F6F3E4" opacity=".5"/>
    <rect x="82" y="196" width="76" height="92" rx="4" fill="#F5F1E2"/>
    <text x="120" y="218" text-anchor="middle" font-family="Helvetica Neue, Arial" font-size="9" letter-spacing="2.4" fill="#1A1C15">GLOW LAB</text>
    <text x="120" y="243" text-anchor="middle" font-family="Helvetica Neue, Arial" font-size="20" font-weight="700" fill="#1A1C15">5%</text>
    <text x="120" y="258" text-anchor="middle" font-family="Helvetica Neue, Arial" font-size="7" letter-spacing="1" fill="#3C4034">NIACINAMIDE</text>
    <rect x="92" y="268" width="56" height="1" fill="#1A1C15" opacity=".35"/>
    <text x="120" y="281" text-anchor="middle" font-family="Helvetica Neue, Arial" font-size="6.5" letter-spacing="2" fill="#3C4034">30 ML</text>
    <rect x="86" y="112" width="10" height="190" rx="5" fill="#fff" opacity=".5"/>
    <rect x="104" y="38" width="6" height="20" rx="3" fill="#fff" opacity=".25"/>
  </svg>`;
}

function toteArt() {
  return `<svg viewBox="0 0 320 300" role="img" aria-label="Tote bag">
    <defs>
      <linearGradient id="t-leather" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3A2B21"/><stop offset=".45" stop-color="#6B4A33"/><stop offset=".75" stop-color="#4A3226"/><stop offset="1" stop-color="#2C1F18"/></linearGradient>
      <linearGradient id="t-edge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A97B52"/><stop offset="1" stop-color="#5C3B28"/></linearGradient>
    </defs>
    <ellipse cx="160" cy="278" rx="112" ry="14" fill="#000" opacity=".18"/>
    <path d="M104 92 C104 30 216 30 216 92" fill="none" stroke="#4A3226" stroke-width="13" stroke-linecap="round"/>
    <path d="M104 92 C104 34 216 34 216 92" fill="none" stroke="#FF5A2B" stroke-width="2" stroke-linecap="round" opacity=".8"/>
    <path d="M62 88 L258 88 L282 252 C284 266 273 276 259 276 L61 276 C47 276 36 266 38 252 Z" fill="url(#t-leather)"/>
    <path d="M62 88 L258 88 L262 112 L58 112 Z" fill="url(#t-edge)" opacity=".9"/>
    <path d="M72 116 L248 116" stroke="#D8B98C" stroke-width="1.4" stroke-dasharray="7 6" opacity=".55"/>
    <path d="M50 244 L270 244" stroke="#D8B98C" stroke-width="1.2" stroke-dasharray="7 6" opacity=".35"/>
    <rect x="132" y="160" width="56" height="34" rx="5" fill="#E9DFC9" opacity=".92"/>
    <text x="160" y="181" text-anchor="middle" font-family="Helvetica Neue, Arial" font-size="14" font-weight="700" letter-spacing="3" fill="#241A13">AER</text>
    <rect x="250" y="150" width="5" height="54" rx="2.5" fill="#C9A16F" opacity=".8"/>
    <path d="M76 132 C86 196 82 234 76 258" stroke="#fff" stroke-opacity=".08" stroke-width="16" fill="none"/>
    <circle cx="160" cy="98" r="3" fill="#E9C58F" opacity=".7"/>
  </svg>`;
}

function lampArt() {
  return `<svg viewBox="0 0 300 320" role="img" aria-label="Ambient lamp">
    <defs>
      <radialGradient id="l-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#FFB347" stop-opacity=".55"/><stop offset=".55" stop-color="#FFB347" stop-opacity=".18"/><stop offset="1" stop-color="#FFB347" stop-opacity="0"/></radialGradient>
      <linearGradient id="l-dome" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF3DC"/><stop offset=".5" stop-color="#FFD79A"/><stop offset="1" stop-color="#C98B3E"/></linearGradient>
      <linearGradient id="l-stem" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7A4E27"/><stop offset=".5" stop-color="#C08A4E"/><stop offset="1" stop-color="#6B421F"/></linearGradient>
    </defs>
    <circle cx="150" cy="150" r="145" fill="url(#l-glow)"/>
    <ellipse cx="150" cy="286" rx="82" ry="12" fill="#000" opacity=".18"/>
    <ellipse cx="150" cy="276" rx="52" ry="10" fill="#5B3A1D"/>
    <path d="M132 186 L126 262 L174 262 L168 186 Z" fill="url(#l-stem)"/>
    <path d="M60 172 C60 96 240 96 240 172 L240 180 C240 188 232 194 222 194 L78 194 C68 194 60 188 60 180 Z" fill="url(#l-dome)"/>
    <path d="M60 174 C60 100 240 100 240 174" fill="none" stroke="#FFF8E8" stroke-width="3" opacity=".65"/>
    <ellipse cx="150" cy="193" rx="81" ry="10" fill="#FFE3B0" opacity=".9"/>
    <rect x="128" y="262" width="44" height="7" rx="3.5" fill="#3B2714"/>
    <circle cx="150" cy="272" r="6" fill="#E9B45F"/>
    <circle cx="150" cy="272" r="2.4" fill="#5A3B1B"/>
    <path d="M98 120 C112 108 130 102 148 101" stroke="#fff" stroke-opacity=".55" stroke-width="4" stroke-linecap="round" fill="none"/>
  </svg>`;
}

const hero = () => `<!doctype html><html><head><meta charset="utf-8"><style>${pageCss(1600, 900)}
  .canvas { padding: 52px 68px 44px; background:
    radial-gradient(900px 620px at 84% 18%, rgba(201,255,61,.16), transparent 64%),
    radial-gradient(840px 520px at 0% 100%, rgba(201,255,61,.07), transparent 62%),
    #08090A; }
  .top { display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 2; }
  .top-right { display: flex; align-items: center; gap: 10px; color: ${MUTED}; }
  .hero-grid { display: grid; grid-template-columns: 1.03fr .97fr; gap: 62px; align-items: center; margin-top: 76px; position: relative; z-index: 2; }
  .eyebrow-row { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: #C9FF3D; box-shadow: 0 0 14px rgba(201,255,61,.8); }
  h1 { margin: 0; font-size: 68px; line-height: .99; letter-spacing: -.045em; font-weight: 650; }
  h1 em { font-style: normal; color: #C9FF3D; }
  .lead { margin: 26px 0 0; font-size: 18px; line-height: 1.55; color: #B9BDB1; max-width: 610px; }
  .lead strong { color: ${PAPER}; font-weight: 600; }
  .tags { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 28px; }
  .tag { border: 1px solid ${LINE}; border-radius: 999px; padding: 7px 12px; font-family: ${MONO}; font-size: 10px; letter-spacing: .1em; text-transform: uppercase; color: #C7CBBF; }
  .tag.hot { border-color: rgba(201,255,61,.42); color: #C9FF3D; background: rgba(201,255,61,.06); }
  .flow { display: flex; align-items: center; gap: 10px; margin-top: 38px; font-family: ${MONO}; font-size: 10px; letter-spacing: .12em; color: ${MUTED}; }
  .flow b { color: ${PAPER}; font-weight: 500; }
  .flow i { color: rgba(201,255,61,.7); font-style: normal; }

  .report-wrap { position: relative; }
  .float { position: absolute; z-index: 4; border: 1px solid rgba(201,255,61,.34); background: rgba(10,12,9,.92); border-radius: 999px; padding: 7px 13px; font-family: ${MONO}; font-size: 10px; letter-spacing: .09em; color: #C9FF3D; box-shadow: 0 10px 30px rgba(0,0,0,.35); }
  .float b { color: ${PAPER}; font-weight: 600; }
  .f1 { top: -18px; left: 26px; }
  .f2 { top: 206px; right: -18px; color: #B9BDB1; border-color: ${LINE}; }
  .f3 { bottom: -18px; left: -20px; color: #B9BDB1; border-color: ${LINE}; }
  .report { border: 1px solid rgba(242,239,230,.16); border-radius: 24px; background: linear-gradient(180deg, rgba(21,24,19,.96), rgba(10,12,9,.98)); padding: 26px 26px 22px; box-shadow: 0 32px 90px rgba(0,0,0,.55); }
  .report-head { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
  .report-kicker { font-family: ${MONO}; font-size: 10px; letter-spacing: .15em; color: #C9FF3D; }
  .report h2 { margin: 8px 0 0; font-size: 27px; letter-spacing: -.02em; font-weight: 600; }
  .report-sub { margin-top: 6px; font-family: ${MONO}; font-size: 10px; letter-spacing: .1em; color: ${MUTED}; }
  .score { width: 86px; height: 86px; border-radius: 50%; background: conic-gradient(#C9FF3D 0 92%, rgba(242,239,230,.10) 92% 100%); display: grid; place-items: center; flex: none; }
  .score div { width: 70px; height: 70px; border-radius: 50%; background: #10130E; display: grid; place-items: center; text-align: center; }
  .score b { display: block; font-size: 28px; line-height: 1; }
  .score small { display: block; margin-top: 4px; font-family: ${MONO}; font-size: 7px; letter-spacing: .08em; color: ${MUTED}; }
  .metrics { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid ${LINE}; border-radius: 12px; margin-top: 22px; overflow: hidden; }
  .metric { padding: 13px 14px; border-right: 1px solid ${LINE}; }
  .metric:last-child { border-right: 0; }
  .metric b { display: block; font-size: 21px; font-weight: 600; letter-spacing: -.02em; }
  .metric span { display: block; margin-top: 5px; font-family: ${MONO}; font-size: 8px; letter-spacing: .08em; color: ${MUTED}; }
  .tl-head { display: flex; justify-content: space-between; margin-top: 20px; font-family: ${MONO}; font-size: 9px; letter-spacing: .1em; color: ${MUTED}; }
  .tl { margin-top: 9px; display: grid; gap: 6px; }
  .tl-row { display: grid; grid-template-columns: 64px 1fr 42px; align-items: center; gap: 9px; font-family: ${MONO}; font-size: 9px; letter-spacing: .06em; color: #B8BDB0; }
  .tl-track { height: 7px; background: rgba(242,239,230,.07); border-radius: 99px; position: relative; overflow: hidden; }
  .tl-track i { position: absolute; top: 0; bottom: 0; border-radius: 99px; background: #5D6B45; }
  .tl-row:first-child .tl-track i { background: #C9FF3D; }
  .tl-row span:last-child { text-align: right; color: ${MUTED}; }
  .hook { margin-top: 20px; border-left: 2px solid #C9FF3D; background: rgba(201,255,61,.035); padding: 12px 15px; border-radius: 0 8px 8px 0; }
  .hook span { font-family: ${MONO}; font-size: 9px; letter-spacing: .1em; color: ${MUTED}; }
  .hook p { margin: 7px 0 0; font-size: 19px; font-weight: 600; letter-spacing: -.01em; }
  .report-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 18px; padding-top: 16px; border-top: 1px solid ${LINE}; font-family: ${MONO}; font-size: 9px; letter-spacing: .1em; color: ${MUTED}; }
  .report-foot b { color: #C9FF3D; font-weight: 500; }
</style></head><body><div class="canvas">
  <div class="gridlines"></div><div class="grain"></div>
  <div class="top">
    <div class="brand">${sparkSvg} VIRALFORGE</div>
    <div class="top-right"><span class="mono">OPEN SOURCE · AGENT-NATIVE · APACHE-2.0</span></div>
  </div>
  <div class="hero-grid">
    <div>
      <div class="eyebrow-row"><span class="dot"></span><span class="eyebrow">One-click replication for viral short videos</span></div>
      <h1>Paste a link.<br/>Deconstruct the script.<br/><em>Ship 10 variants.</em></h1>
      <p class="lead">ViralForge is an <strong>agent-native studio</strong> for viral short videos. It extracts the hook, script, shot rhythm, beat grid and conversion logic into a <strong>Viral DNA report</strong> — then rebuilds the structure around your product and generates <strong>10 costed variants</strong> as an editable project.</p>
      <div class="tags">
        <span class="tag hot">Video script deconstruction</span>
        <span class="tag hot">One-click replication</span>
        <span class="tag">Agent + MCP</span>
        <span class="tag">Editable VFML</span>
        <span class="tag">No API key demo</span>
      </div>
      <div class="flow"><b>01 Deconstruct</b> <i>→</i> <b>02 Replicate</b> <i>→</i> <b>03 Variants</b></div>
    </div>
    <div class="report-wrap">
      <span class="float f1"><b>0.8s</b> hook detected</span>
      <span class="float f2"><b>5</b> structure segments</span>
      <span class="float f3"><b>10</b> variants · <b>¥4.34</b></span>
      <div class="report">
        <div class="report-head">
          <div>
            <div class="report-kicker">VIRAL DNA REPORT</div>
            <h2>Overnight skin, 7-day glow</h2>
            <div class="report-sub">GLOW LAB · DOUYIN · 15s</div>
          </div>
          <div class="score"><div><span><b>92</b><small>DNA SCORE</small></span></div></div>
        </div>
        <div class="metrics">
          <div class="metric"><b>78%</b><span>3s RETENTION</span></div>
          <div class="metric"><b>5</b><span>SEGMENTS</span></div>
          <div class="metric"><b>14</b><span>WORD ANCHORS</span></div>
          <div class="metric"><b>41.2%</b><span>COMPLETION</span></div>
        </div>
        <div class="tl-head"><span>STRUCTURE · RHYTHM CURVE</span><span>96 BPM</span></div>
        <div class="tl">
          <div class="tl-row"><span>HOOK</span><div class="tl-track"><i style="left:0%;width:16%"></i></div><span>2.4s</span></div>
          <div class="tl-row"><span>PROBLEM</span><div class="tl-track"><i style="left:16%;width:18.6%"></i></div><span>2.8s</span></div>
          <div class="tl-row"><span>EXPLAIN</span><div class="tl-track"><i style="left:34.6%;width:20%"></i></div><span>3.0s</span></div>
          <div class="tl-row"><span>PROOF</span><div class="tl-track"><i style="left:54.6%;width:22.7%"></i></div><span>3.4s</span></div>
          <div class="tl-row"><span>CTA</span><div class="tl-track"><i style="left:77.3%;width:22.7%"></i></div><span>3.4s</span></div>
        </div>
        <div class="hook"><span>HOOK · 0.0–2.4s</span><p>“Stop paying the stupid tax.”</p></div>
        <div class="tags" style="margin-top:15px">
          <span class="tag hot">Counter-intuitive</span><span class="tag">Outcome first</span><span class="tag">Transferable</span>
        </div>
        <div class="report-foot"><span>REPLICATE → VFML PROJECT</span><span><b>¥4.34</b> · 10 VARIANTS</span></div>
      </div>
    </div>
  </div>
</div></body></html>`;

const pipeline = () => `<!doctype html><html><head><meta charset="utf-8"><style>${pageCss(1600, 620)}
  .canvas { padding: 48px 60px; background:
    radial-gradient(760px 440px at 50% 0%, rgba(201,255,61,.10), transparent 70%), #08090A; }
  .head { display: flex; justify-content: space-between; align-items: flex-end; position: relative; z-index: 2; }
  .head h2 { margin: 12px 0 0; font-size: 44px; letter-spacing: -.035em; line-height: 1.02; font-weight: 650; }
  .head h2 em { font-style: normal; color: #C9FF3D; }
  .head p { margin: 0; color: ${MUTED}; font-size: 14px; max-width: 360px; line-height: 1.55; text-align: right; }
  .flow { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-top: 42px; position: relative; z-index: 2; }
  .node { border: 1px solid ${LINE}; border-radius: 16px; padding: 20px 18px 18px; background: linear-gradient(180deg, rgba(20,23,18,.9), rgba(10,12,9,.94)); min-height: 230px; position: relative; }
  .node::after { content: "→"; position: absolute; right: -13px; top: 108px; color: rgba(201,255,61,.55); font-size: 17px; z-index: 3; }
  .node:last-child::after { display: none; }
  .num { font-family: ${MONO}; font-size: 10px; letter-spacing: .14em; color: #C9FF3D; }
  .node h3 { margin: 13px 0 7px; font-size: 20px; letter-spacing: -.015em; font-weight: 600; }
  .node p { margin: 0; color: ${MUTED}; font-size: 12px; line-height: 1.5; }
  .node .out { margin-top: 16px; padding-top: 13px; border-top: 1px solid ${LINE}; font-family: ${MONO}; font-size: 9px; letter-spacing: .08em; color: #B7BCAE; line-height: 1.7; }
  .node .out b { color: ${PAPER}; font-weight: 500; }
  .node.hot { border-color: rgba(201,255,61,.45); box-shadow: 0 0 40px rgba(201,255,61,.06) inset; }
  .agent { margin-top: 20px; border: 1px solid rgba(201,255,61,.28); background: rgba(201,255,61,.05); border-radius: 12px; padding: 13px 18px; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2; }
  .agent span { font-family: ${MONO}; font-size: 10px; letter-spacing: .12em; color: #C9FF3D; }
  .agent b { font-family: ${MONO}; font-size: 10px; letter-spacing: .12em; color: #D8DCCF; font-weight: 400; }
</style></head><body><div class="canvas">
  <div class="gridlines"></div><div class="grain"></div>
  <div class="head">
    <div><span class="eyebrow">One pipeline · three layers</span><h2>From a viral link to <em>10 editable variants.</em></h2></div>
    <p>Every step produces a machine-readable artifact an agent can inspect, diff and re-run. No screen-scraping, no proprietary project format.</p>
  </div>
  <div class="flow">
    <div class="node"><div class="num">01 / INPUT</div><h3>Paste a link</h3><p>A local file you own, or a reference URL. The original footage is analyzed, never redistributed.</p><div class="out">→ <b>reference.mp4</b><br/>→ product image + selling points</div></div>
    <div class="node hot"><div class="num">02 / DECONSTRUCT</div><h3>Read the script</h3><p>Shot cuts, word-level anchors, hook type, beat grid, captions, emotional curve and conversion lines.</p><div class="out">→ <b>dna.json</b><br/>→ shareable report card</div></div>
    <div class="node"><div class="num">03 / DNA</div><h3>Keep the structure</h3><p>The transferable formula: what to keep, what to replace, and which words anchor each shot.</p><div class="out">→ <b>hook · rhythm · formula</b><br/>→ 78% 3s retention</div></div>
    <div class="node"><div class="num">04 / REPLICATE</div><h3>One-click rebuild</h3><p>Swap product, script, voice and licensed avatar. Product references lock every shot that shows it.</p><div class="out">→ <b>project.vfml.json</b><br/>→ shot list · captions · assets</div></div>
    <div class="node"><div class="num">05 / VARIANTS</div><h3>Ship 10 variants</h3><p>Hook × audience × scene. Only dirty shots are regenerated, rendered in parallel, costed per variant.</p><div class="out">→ <b>10 variants</b><br/>→ <b>variants.csv + cost ledger</b></div></div>
  </div>
  <div class="agent"><span>AGENT LAYER · SKILL + MCP + CLI</span><b>list_cases · get_case · analyze_video · build_project · viralforge analyze · viralforge report</b></div>
</div></body></html>`;


const social = () => `<!doctype html><html><head><meta charset="utf-8"><style>${pageCss(1280, 640)}
  .canvas { padding: 46px 54px 38px; background:
    radial-gradient(680px 460px at 92% 10%, rgba(201,255,61,.17), transparent 64%),
    radial-gradient(520px 420px at 0% 100%, rgba(201,255,61,.07), transparent 66%), #08090A; }
  .top { display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2; }
  .left { position: relative; z-index: 2; margin-top: 52px; width: 690px; }
  .eyebrow { margin-bottom: 18px; }
  h1 { margin: 0; font-size: 57px; line-height: 1.02; letter-spacing: -.045em; font-weight: 650; }
  h1 em { font-style: normal; color: #C9FF3D; }
  .lead { margin: 20px 0 0; color: #B9BDB1; font-size: 17px; line-height: 1.55; max-width: 620px; }
  .tags { display: flex; gap: 8px; margin-top: 24px; flex-wrap: wrap; }
  .tag { border: 1px solid ${LINE}; border-radius: 999px; padding: 6px 11px; font-family: ${MONO}; font-size: 9px; letter-spacing: .09em; text-transform: uppercase; color: #C7CBBF; }
  .tag.hot { border-color: rgba(201,255,61,.42); color: #C9FF3D; background: rgba(201,255,61,.06); }
  .panel { position: absolute; right: 54px; top: 158px; width: 444px; border: 1px solid rgba(242,239,230,.16); border-radius: 20px; background: linear-gradient(180deg, rgba(21,24,19,.96), rgba(10,12,9,.98)); padding: 22px; box-shadow: 0 28px 80px rgba(0,0,0,.55); z-index: 2; }
  .panel-head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 14px; border-bottom: 1px solid ${LINE}; }
  .panel-head span { font-family: ${MONO}; font-size: 9px; letter-spacing: .13em; color: #C9FF3D; }
  .panel-head b { font-family: ${MONO}; font-size: 9px; letter-spacing: .1em; color: ${MUTED}; font-weight: 400; }
  .case { display: flex; justify-content: space-between; align-items: center; gap: 14px; padding: 15px 0; border-bottom: 1px solid ${LINE}; }
  .case:last-of-type { border-bottom: 0; }
  .case .who { display: flex; flex-direction: column; gap: 4px; }
  .case .who b { font-size: 16px; font-weight: 600; letter-spacing: -.01em; }
  .case .who span { font-size: 11px; color: ${MUTED}; }
  .case .score { font-family: ${MONO}; font-size: 20px; color: #C9FF3D; letter-spacing: -.02em; }
  .panel-foot { display: flex; justify-content: space-between; margin-top: 14px; padding-top: 14px; border-top: 1px solid ${LINE}; font-family: ${MONO}; font-size: 9px; letter-spacing: .1em; color: ${MUTED}; }
  .panel-foot b { color: ${PAPER}; font-weight: 400; }
  .foot { position: absolute; left: 54px; bottom: 36px; font-family: ${MONO}; font-size: 9px; letter-spacing: .12em; color: ${MUTED}; z-index: 2; }
</style></head><body><div class="canvas">
  <div class="gridlines"></div><div class="grain"></div>
  <div class="top"><div class="brand">${sparkSvg} VIRALFORGE</div><span class="mono" style="color:${MUTED}">OPEN SOURCE · AGENT-NATIVE · APACHE-2.0</span></div>
  <div class="left">
    <div class="eyebrow">ONE-CLICK VIRAL REPLICATION</div>
    <h1>Deconstruct the script.<br/>Rebuild it for <em>your product.</em></h1>
    <p class="lead">A Viral DNA report for any short video, an editable replica project, and 10 costed variants — driven by an agent through Skill, MCP and CLI.</p>
    <div class="tags"><span class="tag hot">One-click replication</span><span class="tag hot">Script deconstruction</span><span class="tag">Agent + MCP</span><span class="tag">VFML</span></div>
  </div>
  <div class="panel">
    <div class="panel-head"><span>THREE WORKED CASES</span><b>DNA SCORE</b></div>
    <div class="case"><div class="who"><b>GLOW LAB</b><span>Beauty serum · 15s · 3.12M views</span></div><div class="score">92</div></div>
    <div class="case"><div class="who"><b>AER</b><span>Commuter tote · 14s · 1.86M views</span></div><div class="score">89</div></div>
    <div class="case"><div class="who"><b>MORI</b><span>Ambient lamp · 13s · 4.29M views</span></div><div class="score">94</div></div>
    <div class="panel-foot"><span>10 VARIANTS EACH</span><span><b>¥4.34</b> BATCH</span></div>
  </div>
  <div class="foot">SKILL + MCP + CLI · EDITABLE VFML PROJECTS · SELF-HOSTED, ZERO-KEY DEMO</div>
</div></body></html>`;

const CASE_DATA = [
  {
    num: '01',
    id: 'glow',
    platform: 'DOUYIN',
    category: 'BEAUTY · SKINCARE',
    brand: 'GLOW LAB',
    product: '5% Niacinamide Serum',
    headline: 'Overnight skin,\n7-day glow.',
    dek: 'A 15-second “counter-intuitive + before/after” beauty demo, rebuilt for a 5% niacinamide serum.',
    stats: [
      ['3.12M', 'VIEWS'],
      ['187K', 'LIKES'],
      ['41.2%', 'COMPLETION'],
      ['92', 'DNA SCORE'],
    ],
    hook: '“Stop paying the stupid tax.”',
    hookMeta: 'COUNTER-INTUITIVE NEGATION + OUTCOME FIRST · 2.4s',
    why: 'The first line rejects what the viewer already bought, creating a “did I get it wrong?” tension. A skin-scanner close-up immediately turns the claim into visual evidence.',
    dna: [
      ['HOOK', '0.0–2.4', 'Negate + evidence. Win the first 3 seconds.', 16],
      ['PROBLEM', '2.4–5.2', 'Dullness, creasing, no glow — three hits.', 18.6],
      ['EXPLAIN', '5.2–8.2', 'One ingredient, micro-encapsulated.', 20],
      ['PROOF', '8.2–11.6', 'Day 1 versus Day 7.', 22.7],
      ['CTA', '11.6–15', 'Free sample first. Lower the decision cost.', 22.7],
    ],
    formula: 'Negation → 3 concrete pains → one ingredient → 7-day proof → low-friction CTA.',
    script: [
      ['0.0–2.4', 'Stop layering ten bottles on your face.'],
      ['2.4–5.2', 'Late nights, creasing, dull skin — it is not your foundation.'],
      ['5.2–8.2', '5% niacinamide, micro-encapsulated for slow release.'],
      ['8.2–11.6', 'Day one. Day seven.'],
      ['11.6–15', 'Try a sample first. Then decide.'],
    ],
    cost: '¥1.86 replica · 2m41s',
    batch: '10 variants · ¥4.34 total',
    variants: ['Negate the purchase', 'Result first', 'Authority hook', 'Price contrast', 'Blame the routine', 'Live test'],
    accent: '#C9FF3D',
    art: glowArt(),
    tagline: '“Not a new face. New light.”',
  },
  {
    num: '02',
    id: 'tote',
    platform: 'XIAOHONGSHU',
    category: 'FASHION · BAGS',
    brand: 'AER',
    product: 'Commuter Tote',
    headline: 'Fits the laptop.\nDoesn’t look like the office.',
    dek: 'A 14-second “identity contrast + detail proof” bag film, rebuilt around a 14-inch commuter tote.',
    stats: [
      ['1.86M', 'VIEWS'],
      ['121K', 'LIKES'],
      ['38.6%', 'COMPLETION'],
      ['89', 'DNA SCORE'],
    ],
    hook: '“Every bag that fits a 14-inch laptop looks like it’s headed to a meeting.”',
    hookMeta: 'IDENTITY CONTRAST + SPECIFIC NUMBER · 2.6s',
    why: 'It puts the “big but ugly” stereotype on the table, then promises the opposite: not office-coded. 14 inches is the spec every commuter instantly understands.',
    dna: [
      ['HOOK', '0.0–2.6', 'Stereotype + contrast promise.', 18.6],
      ['SCENES', '2.6–5.4', 'Commute, travel, school run.', 20],
      ['DETAIL', '5.4–8.4', 'Leather, pockets, laptop sleeve.', 21.4],
      ['PROOF', '8.4–11.4', 'Fits everything. Still does not bulge.', 21.4],
      ['CTA', '11.4–14', 'Three colors. Walk out the door.', 18.6],
    ],
    formula: 'Identity contrast → 3 scenes → material and pocket details → one bag, three uses → color close.',
    script: [
      ['0.0–2.6', 'Every bag that fits a 14-inch laptop looks like it’s headed to a meeting.'],
      ['2.6–5.4', 'Until I carried this one. Commute. Travel. School run.'],
      ['5.4–8.4', 'One piece of vegetable-tanned leather. Softer every week.'],
      ['8.4–11.4', '13 pockets, plus a dedicated laptop sleeve.'],
      ['11.4–14', 'Three colors. Walk out the door.'],
    ],
    cost: '¥1.72 replica · 2m28s',
    batch: '10 variants · ¥4.21 total',
    variants: ['Laptop test', 'One-bag travel', 'Pocket math', 'Petite fit', 'Rain test', 'Interview proof'],
    accent: '#FF5A2B',
    art: toteArt(),
    tagline: '“One bag. Three lives.”',
  },
  {
    num: '03',
    id: 'lamp',
    platform: 'DOUYIN',
    category: 'HOME · AMBIENCE',
    brand: 'MORI',
    product: 'Ambient Aroma Lamp',
    headline: '¥30 turned my rental\ninto a showroom.',
    dek: 'A 13-second “price anchor + atmosphere contrast” home film, rebuilt for a ¥30 ambient lamp.',
    stats: [
      ['4.29M', 'VIEWS'],
      ['263K', 'LIKES'],
      ['44.1%', 'COMPLETION'],
      ['94', 'DNA SCORE'],
    ],
    hook: '“My landlord’s beat-up rental? I fixed it for 30 yuan.”',
    hookMeta: 'PRICE CONTRAST + RENOVATION STORY · 2.2s',
    why: 'Rental tenant is instant identity, 30 yuan is the price hook, and “I fixed it” is the result promise. Three pieces of information in one sentence.',
    dna: [
      ['HOOK', '0.0–2.2', 'Identity + price + result.', 16.9],
      ['CONTRAST', '2.2–4.8', 'Lights off, lights on. One second.', 20],
      ['DETAIL', '4.8–8.0', 'Three warmth levels, dimming, timer.', 24.6],
      ['SCENE', '8.0–10.8', 'Ten minutes before sleep.', 21.5],
      ['CTA', '10.8–13', '30 yuan. Buy the mood first.', 16.9],
    ],
    formula: 'Price contrast → off/on proof → 3 concrete features → pre-sleep scene → low-ticket CTA.',
    script: [
      ['0.0–2.2', 'My landlord’s beat-up rental. I fixed it for 30 yuan.'],
      ['2.2–4.8', 'One lamp. Lights off. Lights on.'],
      ['4.8–8.0', 'Three warm levels, stepless dimming, a timer.'],
      ['8.0–10.8', 'Ten minutes before bed, the room goes quiet first.'],
      ['10.8–13', '30 yuan. Start with the mood.'],
    ],
    cost: '¥1.64 replica · 2m19s',
    batch: '10 variants · ¥4.10 total',
    variants: ['Rental constraint', 'Sleep ritual', 'Gift math', 'Photo proof', 'Three moods', 'Commute reset'],
    accent: '#FFB347',
    art: lampArt(),
    tagline: '“Not a new apartment. New light.”',
  },
];

function casePage(item) {
  const accent = item.accent;
  return `<!doctype html><html><head><meta charset="utf-8"><style>${pageCss(1600, 1040)}
  .canvas { padding: 44px 58px 36px; background:
    radial-gradient(800px 560px at 92% 0%, ${accent}22, transparent 66%),
    radial-gradient(700px 520px at 0% 100%, rgba(242,239,230,.04), transparent 62%), #08090A; }
  .top { display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 2; }
  .top .right { display: flex; gap: 9px; align-items: center; color: ${MUTED}; }
  .hero { display: grid; grid-template-columns: 1fr 300px; gap: 44px; margin-top: 30px; position: relative; z-index: 2; align-items: start; }
  .case-label { display: flex; gap: 10px; align-items: center; margin-bottom: 14px; }
  .case-label .pill { color: ${accent}; border-color: ${accent}66; }
  h1 { margin: 0; font-size: 62px; line-height: 1.0; letter-spacing: -.045em; white-space: pre-line; font-weight: 650; }
  .dek { margin: 16px 0 0; max-width: 760px; color: #B9BDB1; font-size: 16px; line-height: 1.55; }
  .statrow { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 24px; border-top: 1px solid ${LINE}; border-bottom: 1px solid ${LINE}; max-width: 820px; }
  .stat { padding: 15px 18px 14px 0; }
  .stat b { display: block; font-size: 29px; letter-spacing: -.035em; font-weight: 600; }
  .stat span { display: block; margin-top: 4px; font-family: ${MONO}; font-size: 8px; letter-spacing: .1em; color: ${MUTED}; }
  .product-card { border: 1px solid ${LINE}; border-radius: 20px; background: linear-gradient(180deg, rgba(22,25,20,.92), rgba(9,11,8,.98)); padding: 18px; position: relative; overflow: hidden; }
  .product-card::before { content: ""; position: absolute; inset: -30%; background: radial-gradient(circle at 55% 35%, ${accent}2e, transparent 55%); }
  .product-card .art { position: relative; height: 235px; display: grid; place-items: center; }
  .product-card .art svg { height: 100%; width: auto; filter: drop-shadow(0 22px 28px rgba(0,0,0,.45)); }
  .product-meta { position: relative; border-top: 1px solid ${LINE}; padding-top: 13px; }
  .product-meta .brandline { font-family: ${MONO}; font-size: 9px; letter-spacing: .14em; color: ${accent}; }
  .product-meta h3 { margin: 6px 0 0; font-size: 17px; font-weight: 600; }
  .product-meta p { margin: 5px 0 0; color: ${MUTED}; font-size: 11px; line-height: 1.4; }
  .tapeline { margin-top: 12px; border-left: 2px solid ${accent}; padding-left: 10px; font-size: 12px; color: ${PAPER}; }

  .grid { display: grid; grid-template-columns: 1.02fr 1.16fr 1.02fr; gap: 15px; margin-top: 24px; position: relative; z-index: 2; }
  .panel { border: 1px solid ${LINE}; border-radius: 16px; padding: 18px 18px 16px; background: rgba(13,15,12,.72); min-height: 520px; }
  .panel-head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 12px; border-bottom: 1px solid ${LINE}; }
  .panel-head span:first-child { font-family: ${MONO}; font-size: 10px; letter-spacing: .14em; color: ${accent}; }
  .panel-head span:last-child { font-family: ${MONO}; font-size: 8px; letter-spacing: .1em; color: ${MUTED}; }
  .quote { margin: 18px 0 0; font-size: 23px; line-height: 1.24; letter-spacing: -.02em; font-weight: 550; }
  .quote-meta { margin-top: 9px; font-family: ${MONO}; font-size: 8px; letter-spacing: .09em; color: ${MUTED}; line-height: 1.6; }
  .why { margin: 16px 0 0; color: #B9BDB1; font-size: 12px; line-height: 1.55; }
  .divider { height: 1px; background: ${LINE}; margin: 18px 0 14px; }
  .mini { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; }
  .mini div { border: 1px solid ${LINE}; border-radius: 10px; padding: 10px 11px; }
  .mini b { display: block; font-size: 15px; font-weight: 600; }
  .mini span { display: block; margin-top: 3px; font-family: ${MONO}; font-size: 7px; letter-spacing: .09em; color: ${MUTED}; }
  .dna-list { display: grid; gap: 11px; margin-top: 18px; }
  .dna-row { display: grid; grid-template-columns: 70px 1fr 50px; gap: 9px; align-items: center; }
  .dna-row .name { font-family: ${MONO}; font-size: 9px; letter-spacing: .1em; color: #D4D8CB; }
  .dna-row .track { height: 8px; background: rgba(242,239,230,.07); border-radius: 99px; position: relative; overflow: hidden; }
  .dna-row .track i { position: absolute; top: 0; bottom: 0; left: 0; border-radius: 99px; background: ${accent}; opacity: .75; }
  .dna-row:first-child .track i { opacity: 1; }
  .dna-row .time { font-family: ${MONO}; font-size: 8px; color: ${MUTED}; text-align: right; }
  .purpose { margin-top: 3px; color: #A7AC9F; font-size: 10px; line-height: 1.35; }
  .formula { margin-top: 16px; border: 1px dashed ${LINE}; border-radius: 10px; padding: 12px; font-size: 11.5px; line-height: 1.5; color: #C9CEC0; }
  .script-list { margin-top: 15px; display: grid; gap: 9px; }
  .script-row { display: grid; grid-template-columns: 62px 1fr; gap: 9px; align-items: baseline; }
  .script-row .time { font-family: ${MONO}; font-size: 8px; letter-spacing: .04em; color: ${accent}; padding-top: 3px; }
  .script-row p { margin: 0; font-size: 12px; line-height: 1.4; color: #E4E7DD; }
  .costbar { margin-top: 16px; border-top: 1px solid ${LINE}; padding-top: 13px; display: flex; justify-content: space-between; align-items: center; }
  .costbar b { font-size: 14px; font-weight: 600; color: ${PAPER}; }
  .costbar span { font-family: ${MONO}; font-size: 8px; letter-spacing: .07em; color: ${MUTED}; }
  .var-list { margin-top: 17px; display: grid; gap: 8px; }
  .var { display: flex; justify-content: space-between; align-items: center; border: 1px solid ${LINE}; border-radius: 9px; padding: 9px 11px; }
  .var span { font-size: 11.5px; color: #DDE1D5; }
  .var b { font-family: ${MONO}; font-size: 7.5px; letter-spacing: .06em; color: ${MUTED}; font-weight: 400; }
  .var:first-child { border-color: ${accent}66; background: ${accent}0d; }
  .batch { margin-top: 12px; font-family: ${MONO}; font-size: 9px; letter-spacing: .1em; color: ${accent}; }
  .foot { display: flex; justify-content: space-between; margin-top: 20px; font-family: ${MONO}; font-size: 9px; letter-spacing: .1em; color: ${MUTED}; position: relative; z-index: 2; }
  .foot b { color: ${PAPER}; font-weight: 400; }
</style></head><body><div class="canvas">
  <div class="gridlines"></div><div class="grain"></div>
  <div class="top">
    <div class="brand">${sparkSvg} VIRALFORGE <span class="mono" style="color:${MUTED};letter-spacing:.14em">/ CASE ${item.num}</span></div>
    <div class="right"><span class="mono">${item.category} · ${item.platform}</span><span class="pill">DEMO CASE</span></div>
  </div>
  <div class="hero">
    <div>
      <div class="case-label"><span class="eyebrow">REFERENCE → REPLICA</span><span class="pill">${item.brand} · ${item.product}</span></div>
      <h1>${item.headline}</h1>
      <p class="dek">${item.dek}</p>
      <div class="statrow">
        ${item.stats.map(([value, label]) => `<div class="stat"><b>${value}</b><span>${label}</span></div>`).join('')}
      </div>
    </div>
    <div class="product-card">
      <div class="art">${item.art}</div>
      <div class="product-meta">
        <div class="brandline">${item.brand} · ${item.category}</div>
        <h3>${item.product}</h3>
        <p>${item.tagline}</p>
        <div class="tapeline">${item.cost}</div>
      </div>
    </div>
  </div>
  <div class="grid">
    <section class="panel">
      <div class="panel-head"><span>01 / REFERENCE</span><span>WHY IT HOLDS</span></div>
      <div class="quote">${item.hook}</div>
      <div class="quote-meta">${item.hookMeta}</div>
      <div class="why">${item.why}</div>
      <div class="divider"></div>
      <div class="mini">
        ${item.stats.slice(0, 4).map(([value, label]) => `<div><b>${value}</b><span>${label}</span></div>`).join('')}
      </div>
    </section>
    <section class="panel">
      <div class="panel-head"><span>02 / VIRAL DNA</span><span>5 SEGMENTS</span></div>
      <div class="dna-list">
        ${item.dna.map(([name, time, purpose, width]) => `<div><div class="dna-row"><span class="name">${name}</span><div class="track"><i style="width:${width}%"></i></div><span class="time">${time}s</span></div><div class="purpose">${purpose}</div></div>`).join('')}
      </div>
      <div class="formula"><strong style="color:${accent};font-weight:500">TRANSFERABLE FORMULA</strong><br/>${item.formula}</div>
    </section>
    <section class="panel">
      <div class="panel-head"><span>03 / REPLICA</span><span>EDITABLE SCRIPT</span></div>
      <div class="script-list">
        ${item.script.map(([time, line]) => `<div class="script-row"><span class="time">${time}</span><p>${line}</p></div>`).join('')}
      </div>
      <div class="costbar"><b>${item.cost}</b><span>PRE-RENDERED DEMO</span></div>
      <div class="divider"></div>
      <div class="panel-head" style="border-bottom:0;padding-bottom:0"><span>04 / VARIANTS</span><span>${item.batch}</span></div>
      <div class="var-list">
        ${item.variants.map((variant, index) => `<div class="var"><span>${variant}</span><b>V${String(index + 1).padStart(2, '0')}</b></div>`).join('')}
      </div>
    </section>
  </div>
  <div class="foot"><span>STRUCTURE, NOT FOOTAGE · AI-GENERATED LABELS ON EVERY OUTPUT</span><span><b>viralforge</b> · APACHE-2.0</span></div>
</div></body></html>`;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1.5 });
  const jobs = [
    ['hero.jpg', hero(), 1600, 900],
    ['pipeline.jpg', pipeline(), 1600, 620],
    ['social-preview.jpg', social(), 1280, 640],
    ...CASE_DATA.map((item) => [`case-${item.id}.jpg`, casePage(item), 1600, 1040]),
  ];
  for (const [name, html, width, height] of jobs) {
    await page.setViewportSize({ width, height });
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT, name), type: 'jpeg', quality: 90, animations: 'disabled' });
    const size = (fs.statSync(path.join(OUT, name)).size / 1024).toFixed(0);
    console.log(`  ${name} · ${width}×${height} · ${size} KB`);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
