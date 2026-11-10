import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launch } from './browser.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = 4179;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(ROOT, 'test-results');
fs.mkdirSync(OUT, { recursive: true });

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` · ${detail}` : ''}`);
};

async function waitForServer(url, timeout = 20000) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`preview server did not start at ${url}`);
}

async function main() {
  const preview = spawn(path.join(ROOT, 'node_modules', '.bin', 'vite'), ['preview', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let previewLog = '';
  preview.stdout.on('data', (chunk) => {
    previewLog += chunk.toString();
  });
  preview.stderr.on('data', (chunk) => {
    previewLog += chunk.toString();
  });

  const browser = await launch();
  const errors = [];
  const mediaFailures = [];
  try {
    await waitForServer(BASE);
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error' && !message.text().includes('favicon')) errors.push(message.text());
    });
    page.on('response', (response) => {
      if (response.url().includes('/media/') && ![200, 206].includes(response.status())) {
        mediaFailures.push(`${response.status()} ${response.url()}`);
      }
    });

    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    check('首页标题', (await page.title()).includes('ViralForge'), await page.title());
    check('首页 H1', (await page.locator('h1').first().innerText()).includes('把爆款拆开'));
    await page.screenshot({ path: path.join(OUT, 'home.png') });

    await page.getByRole('button', { name: /美妆 · 5% 烟酰胺精华/ }).click();
    await page.waitForFunction(() => window.location.hash.includes('/studio'));
    await page.getByRole('button', { name: /开始拆解|拆解中/ }).waitFor();
    await page.getByText('爆款基因报告').first().waitFor({ timeout: 15000 });
    check('拆解生成报告', await page.getByText('「别再交智商税了。」').first().isVisible());
    check('分析日志完成', await page.getByText('生成爆款基因').first().isVisible());
    await page.screenshot({ path: path.join(OUT, 'studio-report.png') });

    await page.getByRole('button', { name: /用这条基因复刻/ }).first().click();
    await page.getByRole('button', { name: /生成复刻工程/ }).waitFor();
    await page.getByRole('button', { name: /生成复刻工程/ }).click();
    await page.getByRole('button', { name: /导出 VFML/ }).waitFor({ timeout: 8000 });
    check('复刻工程生成', await page.getByText('VFML ·', { exact: false }).first().isVisible());
    await page.waitForFunction(
      () => Array.from(document.querySelectorAll('video')).some((video) => video.readyState >= 2 && video.videoWidth > 0),
      null,
      { timeout: 15000 },
    );
    check('成片可播放', true);
    await page.screenshot({ path: path.join(OUT, 'studio-replica.png') });

    await page.getByRole('button', { name: /应用/ }).click();
    check('dirty 镜头标记', await page.getByText(/DIRTY/).first().isVisible());

    await page.getByRole('button', { name: /去批量变体/ }).click();
    await page.getByRole('button', { name: /生成 10 个变体/ }).click();
    await page.waitForFunction(() => document.querySelectorAll('.variant-card').length === 10, null, { timeout: 10000 });
    check('10 条变体生成', (await page.locator('.variant-card').count()) === 10);
    check('成本账单可见', await page.getByText('成本账单').first().isVisible());
    await page.screenshot({ path: path.join(OUT, 'studio-variants.png') });

    await page.goto(`${BASE}/#/report/glow`, { waitUntil: 'networkidle' });
    check('报告页可访问', (await page.locator('h1').first().innerText()).includes('熬夜脸'));
    check('雷达图存在', (await page.locator('.radar').count()) > 0);
    await page.screenshot({ path: path.join(OUT, 'report.png') });

    await page.goto(`${BASE}/#/case/lamp`, { waitUntil: 'networkidle' });
    check('案例页可访问', (await page.locator('h1').first().innerText()).includes('30 块'));
    await page.waitForFunction(
      () => Array.from(document.querySelectorAll('video')).some((video) => video.readyState >= 2 && video.videoWidth > 0),
      null,
      { timeout: 15000 },
    );
    check('案例成片可播放', true);
    await page.screenshot({ path: path.join(OUT, 'case.png') });

    await page.goto(`${BASE}/#/docs`, { waitUntil: 'networkidle' });
    check('文档页可访问', (await page.locator('h1').first().innerText()).includes('ViralForge 文档'));

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
    await mobile.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check('移动端无横向溢出', overflow <= 1, `${overflow}px`);
    await mobile.screenshot({ path: path.join(OUT, 'mobile.png'), fullPage: false });
    await mobile.close();

    const emptyButtons = await page.evaluate(() =>
      Array.from(document.querySelectorAll('button')).filter((button) => {
        const name = (button.getAttribute('aria-label') || button.textContent || '').trim();
        return !name;
      }).length,
    );
    check('按钮均有可读名称', emptyButtons === 0, `${emptyButtons} empty`);

    check('无控制台错误', errors.length === 0, errors.slice(0, 3).join(' | '));
    check('媒体资源全部 200', mediaFailures.length === 0, mediaFailures.slice(0, 3).join(' | '));
  } finally {
    await browser.close();
    preview.kill('SIGTERM');
    if (preview.exitCode && preview.exitCode !== 0 && !results.some((item) => item.name === '预览服务')) {
      console.error(previewLog.slice(-800));
    }
  }

  const failed = results.filter((item) => !item.ok);
  fs.writeFileSync(path.join(OUT, 'results.json'), JSON.stringify(results, null, 2));
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  if (failed.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
