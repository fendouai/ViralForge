import { spawn } from 'node:child_process';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const child = spawn('node', [path.join(ROOT, 'mcp', 'server.mjs')], { stdio: ['pipe', 'pipe', 'pipe'] });
const rl = readline.createInterface({ input: child.stdout });
const pending = new Map();
let nextId = 1;

rl.on('line', (line) => {
  const message = JSON.parse(line);
  if (pending.has(message.id)) {
    pending.get(message.id)(message);
    pending.delete(message.id);
  }
});

function request(method, params) {
  return new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, resolve);
    child.stdin.write(`${JSON.stringify({ jsonrpc: '2.0', id, method, params })}\n`);
    setTimeout(() => reject(new Error(`timeout: ${method}`)), 15000);
  });
}

const assert = (name, ok, detail = '') => {
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` · ${detail}` : ''}`);
  if (!ok) process.exitCode = 1;
};

const init = await request('initialize', {
  protocolVersion: '2024-11-05',
  capabilities: {},
  clientInfo: { name: 'viralforge-test', version: '1.0.0' },
});
assert('initialize', init.result?.serverInfo?.name === 'viralforge');
assert('protocolVersion', Boolean(init.result?.protocolVersion), init.result?.protocolVersion);

const list = await request('tools/list', {});
const names = list.result?.tools?.map((tool) => tool.name) ?? [];
assert('tools/list', names.length === 4, names.join(', '));

const cases = await request('tools/call', { name: 'list_cases', arguments: {} });
const text = cases.result?.content?.[0]?.text ?? '';
assert('list_cases', text.includes('glow') && text.includes('lamp'));

const analysis = await request('tools/call', {
  name: 'analyze_video',
  arguments: { path: path.join(ROOT, 'public', 'media', 'glow.mp4') },
});
const dna = analysis.result?.content?.[0]?.text ?? '';
assert('analyze_video', dna.includes('"shotCount": 5'), dna.includes('"bpm"') ? 'bpm present' : 'bpm missing');

child.kill('SIGTERM');
console.log('mcp checks complete');
