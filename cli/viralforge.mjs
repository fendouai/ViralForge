#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CASES = [
  { id: 'glow', title: '熬夜脸，还有救', category: '美妆 · 护肤', duration: 15 },
  { id: 'tote', title: '装得下电脑，还不像去上班', category: '鞋包 · 配饰', duration: 14 },
  { id: 'lamp', title: '30 块，把出租屋变成样板间', category: '家居 · 氛围', duration: 13 },
];

function help() {
  console.log(`viralforge 0.1.0 — deconstruct, replicate and variant short videos

Usage:
  viralforge analyze <video> [--out dna.json]   Local structural analysis
  viralforge report <dna.json>                  Print a Markdown report card
  viralforge cases                              List demo cases
  viralforge render <case-id>                   Re-render a demo film (needs dev server)
  viralforge help

Notes:
  · analyze uses OpenCV + numpy; no API key required.
  · render requires FFmpeg and a running Vite dev server (npm run dev).
  · This CLI never downloads platform videos; pass a local file you own.
`);
}

function analyze(args) {
  const input = args.find((arg) => !arg.startsWith('-'));
  if (!input) {
    console.error('Missing video path. Try: viralforge analyze ./video.mp4');
    process.exit(2);
  }
  const outIndex = args.indexOf('--out');
  const out = outIndex >= 0 ? args[outIndex + 1] : null;
  const python = spawnSync('python3', [path.join(ROOT, 'scripts', 'analyze.py'), input, ...(out ? ['--out', out] : [])], {
    stdio: 'inherit',
  });
  process.exit(python.status ?? 1);
}

function report(args) {
  const file = args[0];
  if (!file || !fs.existsSync(file)) {
    console.error('Missing dna.json. Run: viralforge analyze ./video.mp4 --out dna.json');
    process.exit(2);
  }
  const dna = JSON.parse(fs.readFileSync(file, 'utf8'));
  const shots = dna.shots ?? [];
  const audio = dna.audio ?? {};
  const lines = [
    `# 爆款基因报告 · ${path.basename(file)}`,
    '',
    `- 时长：${dna.meta?.duration ?? '—'}s`,
    `- 分辨率：${dna.meta?.width ?? '—'}×${dna.meta?.height ?? '—'}`,
    `- 镜头：${shots.length} 个 · 平均 ${dna.structure?.averageShot ?? '—'}s · ${dna.structure?.pacing ?? '—'}`,
    `- BPM：${audio.bpm ?? '—'}`,
    `- 节拍锚点：${(audio.beats ?? []).slice(0, 8).join(', ') || '—'}`,
    '',
    '## 逐镜',
    '',
    '| # | 起止 | 时长 | 标签 |',
    '| --- | --- | --- | --- |',
    ...shots.map(
      (shot, index) =>
        `| ${index + 1} | ${shot.start}s–${shot.end}s | ${shot.duration}s | ${shot.label ?? '—'} |`,
    ),
    '',
    '## 可迁移公式（待补）',
    '',
    '> 钩子类型、情绪曲线与话术标注需要 WhisperX / 多模态模型；',
    '> 本地结构分析已完成。Web 工作台提供完整预置案例。',
    '',
  ];
  console.log(lines.join('\n'));
}

function render(args) {
  const id = args[0];
  if (!CASES.some((item) => item.id === id)) {
    console.error(`Unknown case: ${id}. Try one of ${CASES.map((item) => item.id).join(', ')}`);
    process.exit(2);
  }
  const result = spawnSync('npm', ['run', 'render', '--', '--case', id], { cwd: ROOT, stdio: 'inherit' });
  process.exit(result.status ?? 1);
}

function main() {
  const [, , command = 'help', ...args] = process.argv;
  if (command === 'analyze') return analyze(args);
  if (command === 'report') return report(args);
  if (command === 'render') return render(args);
  if (command === 'cases') {
    for (const item of CASES) {
      console.log(`${item.id.padEnd(6)} ${item.category.padEnd(10)} ${item.title} (${item.duration}s)`);
    }
    return;
  }
  if (command === 'version' || command === '--version') {
    console.log('0.1.0');
    return;
  }
  help();
}

main();
