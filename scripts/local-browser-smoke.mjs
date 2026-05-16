import { chromium } from '@playwright/test';

const url = process.argv[2] ?? 'http://127.0.0.1:3000';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const consoleMessages = [];
const pageErrors = [];
const failedRequests = [];

page.on('console', (message) => {
  consoleMessages.push({
    type: message.type(),
    text: message.text(),
  });
});

page.on('pageerror', (error) => {
  pageErrors.push(error.message);
});

page.on('requestfailed', (request) => {
  failedRequests.push({
    url: request.url(),
    error: request.failure()?.errorText ?? 'unknown',
  });
});

try {
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForLoadState('networkidle', { timeout: 30000 });

  const title = await page.title();
  const bodyText = await page.locator('body').innerText();

  await page.screenshot({
    path: 'graphify-out/local-browser-smoke.png',
    fullPage: true,
  });

  console.log(
    JSON.stringify(
      {
        ok: true,
        url,
        status: response?.status() ?? null,
        title,
        bodyPreview: bodyText.slice(0, 400),
        consoleMessages,
        pageErrors,
        failedRequests,
      },
      null,
      2,
    ),
  );
} catch (error) {
  console.log(
    JSON.stringify(
      {
        ok: false,
        url,
        error: error instanceof Error ? error.message : String(error),
        consoleMessages,
        pageErrors,
        failedRequests,
      },
      null,
      2,
    ),
  );
  process.exitCode = 1;
} finally {
  await browser.close();
}
