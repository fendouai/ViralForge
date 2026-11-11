import { chromium } from 'playwright';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export function findBrowser() {
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

export async function launch() {
  const executablePath = findBrowser();
  // On Linux/CI, use Playwright's bundled browser; on this Mac, prefer the cached build.
  return executablePath ? chromium.launch({ executablePath }) : chromium.launch();
}
