const { chromium } = require('playwright');
const fs = require('node:fs');
const _path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const results = {
    screenshots: [],
    errors: {},
  };

  // Helper: capture console errors
  const captureConsole = (key) => {
    results.errors[key] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        results.errors[key].push(msg.text());
      }
    });
    page.on('pageerror', (err) => {
      results.errors[key].push(err.message);
    });
  };

  // 1. Navigate to Button
  try {
    await page.goto('http://localhost:4173/react-n-design/components/Button', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: '/Users/macworld/Desktop/dev/react-n-design/site-test-button-v2.png',
    });
    results.screenshots.push('site-test-button-v2.png');
  } catch (e) {
    results.screenshots.push({ name: 'site-test-button-v2.png', error: e.message });
  }

  // 4. Click "View Code" under first example
  try {
    const viewCodeBtn = await page.$('text=View Code');
    if (viewCodeBtn) {
      await viewCodeBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: '/Users/macworld/Desktop/dev/react-n-design/site-test-button-code-v2.png',
      });
      results.screenshots.push('site-test-button-code-v2.png');
    } else {
      results.screenshots.push({
        name: 'site-test-button-code-v2.png',
        error: 'View Code button not found',
      });
    }
  } catch (e) {
    results.screenshots.push({ name: 'site-test-button-code-v2.png', error: e.message });
  }

  // 7. Accordion
  try {
    captureConsole('Accordion');
    await page.goto('http://localhost:4173/react-n-design/components/Accordion', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: '/Users/macworld/Desktop/dev/react-n-design/site-test-accordion.png',
    });
    results.screenshots.push('site-test-accordion.png');
  } catch (e) {
    results.screenshots.push({ name: 'site-test-accordion.png', error: e.message });
  }

  // 11. Carousel
  try {
    captureConsole('Carousel');
    await page.goto('http://localhost:4173/react-n-design/components/Carousel', {
      waitUntil: 'networkidle',
    });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: '/Users/macworld/Desktop/dev/react-n-design/site-test-carousel.png',
    });
    results.screenshots.push('site-test-carousel.png');
  } catch (e) {
    results.screenshots.push({ name: 'site-test-carousel.png', error: e.message });
  }

  await browser.close();

  fs.writeFileSync(
    '/Users/macworld/Desktop/dev/react-n-design/scripts/playwright-results.json',
    JSON.stringify(results, null, 2)
  );
  console.log(JSON.stringify(results, null, 2));
})();
