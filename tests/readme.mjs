#!/usr/bin/env node
/**
 * Guard the English README contract:
 * - no CJK characters in the English landing page
 * - every local image lives under docs/en (English artwork)
 * - the Chinese README is linked
 * - the one-click / script-deconstruction / agent story is present
 * - GitHub metadata stays within topic limits
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'OK ' : 'FAIL'} ${name}${detail ? ` · ${detail}` : ''}`);
};

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const cjk = (text) => [...new Set(text.match(/[\u4e00-\u9fff]/g) ?? [])];

const readme = read('README.md');
check('README.md has no CJK characters', cjk(readme).length === 0, cjk(readme).join(''));
check('README.md links the Chinese documentation', readme.includes('README.zh-CN.md'));
check('README.md states English is the default', /English is the default documentation language/.test(readme));
check('README.md sells one-click replication', /one-click/i.test(readme));
check('README.md sells video script deconstruction', /deconstructs? the video script|script deconstruction/i.test(readme));
check('README.md emphasizes the agent surface', /Agent-native by design/.test(readme) && /MCP/.test(readme));

const localImages = [...readme.matchAll(/!\[[^\]]*\]\((\.\/[^)\s]+)\)/g)]
  .map((match) => match[1].replace(/^\.\//, ''))
  .concat(
    [...readme.matchAll(/<img[^>]+src="(\.\/[^"]+)"/g)].map((match) => match[1].replace(/^\.\//, '')),
  );
check('README.md declares local images', localImages.length >= 5, `${localImages.length} images`);
for (const image of localImages) {
  check(`${image} exists`, fs.existsSync(path.join(ROOT, image)));
  check(`${image} is English artwork`, image.startsWith('docs/en/'));
}

for (const file of fs.readdirSync(path.join(ROOT, 'docs/en')).filter((name) => name.endsWith('.md'))) {
  const text = read(`docs/en/${file}`);
  check(`docs/en/${file} has no CJK characters`, cjk(text).length === 0, cjk(text).join(''));
}

const metadata = read('docs/GITHUB-METADATA.md');
check('metadata has no CJK characters', cjk(metadata).length === 0);
const topicsBlock = metadata.split('```text')[1]?.split('```')[0] ?? '';
const topics = topicsBlock.split('\n').map((item) => item.trim()).filter(Boolean);
check('GitHub topics are non-empty', topics.length > 0);
check('GitHub topics fit the limit', topics.length <= 20, `${topics.length} topics`);

const failed = results.filter((item) => !item.ok);
if (failed.length) {
  console.error(`\n${failed.length} README checks failed.`);
  process.exit(1);
}
console.log(`\n${results.length}/${results.length} README checks passed`);
