#!/usr/bin/env node
/**
 * Minimal MCP stdio server (newline-delimited JSON-RPC 2.0).
 * No SDK dependency: easy to audit, easy to embed.
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import readline from 'node:readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CASES = [
  {
    id: 'glow',
    title: '熬夜脸，还有救',
    brand: 'GLOW LAB',
    category: '美妆 · 护肤',
    duration: 15,
    score: 92,
    hook: '别再交智商税了。',
    formula: '反常识否定 → 三个具体痛点 → 单一成分证据 → 7 天前后对比 → 低门槛行动。',
  },
  {
    id: 'tote',
    title: '装得下电脑，还不像去上班',
    brand: 'AER',
    category: '鞋包 · 配饰',
    duration: 14,
    score: 89,
    hook: '能装下 14 寸电脑的包，都长得像去开会。',
    formula: '身份反差 → 三个场景 → 材质/分区细节 → 一包三用 → 颜色收尾。',
  },
  {
    id: 'lamp',
    title: '30 块，把出租屋变成样板间',
    brand: 'MORI',
    category: '家居 · 氛围',
    duration: 13,
    score: 94,
    hook: '房东的破出租屋，被我 30 块改了。',
    formula: '价格反差 → 关灯/开灯对比 → 三个功能 → 睡前场景 → 低客单行动。',
  },
];

const TOOLS = [
  {
    name: 'list_cases',
    description: 'List the three ViralForge demo cases (id, category, hook, score).',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
  },
  {
    name: 'get_case',
    description: 'Get one case DNA summary, including hook, formula and report URL.',
    inputSchema: {
      type: 'object',
      properties: { id: { type: 'string', enum: ['glow', 'tote', 'lamp'] } },
      required: ['id'],
      additionalProperties: false,
    },
  },
  {
    name: 'analyze_video',
    description: 'Run local structural analysis (shots, BPM, pacing) on a local video file. No API key required.',
    inputSchema: {
      type: 'object',
      properties: { path: { type: 'string', description: 'Absolute path to a local video file.' } },
      required: ['path'],
      additionalProperties: false,
    },
  },
  {
    name: 'build_project',
    description: 'Build an editable VFML project skeleton for a case. Product name is optional.',
    inputSchema: {
      type: 'object',
      properties: {
        caseId: { type: 'string', enum: ['glow', 'tote', 'lamp'] },
        product: { type: 'string' },
      },
      required: ['caseId'],
      additionalProperties: false,
    },
  },
];

function text(value) {
  return { content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] };
}

function error(value) {
  return { content: [{ type: 'text', text: String(value) }], isError: true };
}

function callTool(name, args) {
  const study = CASES.find((item) => item.id === args?.id || item.id === args?.caseId);
  if (name === 'list_cases') return text(CASES);
  if (name === 'get_case') {
    if (!study) return error('unknown case id');
    return text({
      ...study,
      reportUrl: `#/report/${study.id}`,
      caseUrl: `#/case/${study.id}`,
      boundaries: '结构复刻，不搬运原片画面 / 音乐 / 文案；不使用未授权真人脸。',
    });
  }
  if (name === 'analyze_video') {
    if (!args?.path) return error('path is required');
    const result = spawnSync('python3', [path.join(ROOT, 'scripts', 'analyze.py'), args.path], {
      encoding: 'utf8',
      maxBuffer: 8 * 1024 * 1024,
    });
    if (result.status !== 0) return error(result.stderr || 'analysis failed');
    return text(result.stdout);
  }
  if (name === 'build_project') {
    if (!study) return error('unknown case id');
    const shots = Array.from({ length: 5 }, (_, index) => ({
      id: `s${index + 1}`,
      wordRange: [index * 4, index * 4 + 3],
      visual: `shot-${index + 1}`,
      productLock: index >= 2,
      caption: '',
      transition: index === 0 ? 'flash' : 'cut',
      dirty: false,
    }));
    return text({
      version: '0.1',
      generator: 'viralforge mcp 0.1.0',
      meta: {
        id: `${study.id}-replica`,
        title: study.title,
        product: args.product ?? study.brand,
        ratio: '9:16',
        resolution: '720x1280',
        duration: study.duration,
        aiDisclosure: true,
      },
      sourceCase: study.id,
      productRefs: [{ id: study.id, brand: study.brand, lock: ['logo', 'color', 'shape'] }],
      words: [],
      shots,
      render: { engine: 'ffmpeg', fps: 30, parallelism: 4 },
      note: 'Skeleton only. Add words and captions before rendering.',
    });
  }
  return error(`unknown tool: ${name}`);
}

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on('line', (line) => {
  if (!line.trim()) return;
  let message;
  try {
    message = JSON.parse(line);
  } catch {
    send({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } });
    return;
  }
  if (message.id === undefined) return; // notification
  const { id, method, params } = message;
  try {
    if (method === 'initialize') {
      send({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'viralforge', version: '0.1.0' },
        },
      });
      return;
    }
    if (method === 'ping') {
      send({ jsonrpc: '2.0', id, result: {} });
      return;
    }
    if (method === 'tools/list') {
      send({ jsonrpc: '2.0', id, result: { tools: TOOLS } });
      return;
    }
    if (method === 'tools/call') {
      const result = callTool(params?.name, params?.arguments ?? {});
      send({ jsonrpc: '2.0', id, result });
      return;
    }
    send({ jsonrpc: '2.0', id, error: { code: -32601, message: `Method not found: ${method}` } });
  } catch (err) {
    send({ jsonrpc: '2.0', id, error: { code: -32603, message: String(err?.message ?? err) } });
  }
});
