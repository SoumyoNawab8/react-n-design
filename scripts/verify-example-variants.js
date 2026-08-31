const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const baseUrl = 'http://localhost:4173/react-n-design/components';
  const results = { screenshots: [], errors: {} };

  const components = [
    'Button',
    'Switch',
    'Checkbox',
    'Slider',
    'Select',
    'DatePicker',
    'ColorPicker',
    'Rating',
    'Toast',
    'Menu',
    'Stack',
    'Tooltip',
    'AudioWaveform',
    'ToolCallCard',
    'Collapsible',
    'Stepper',
    'Popover',
    'ProgressBar',
    'AIChat',
    'Markdown',
    'Form',
    'Grid',
  ];

  for (const name of components) {
    const key = name;
    results.errors[key] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') results.errors[key].push(msg.text());
    });
    page.on('pageerror', (err) => {
      results.errors[key].push(err.message);
    });

    try {
      await page.goto(`${baseUrl}/${name}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      const screenshotPath = path.resolve(__dirname, `../site-verify-${name.toLowerCase()}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      results.screenshots.push({ name, path: screenshotPath });
    } catch (e) {
      results.screenshots.push({ name, error: e.message });
    }

    page.removeAllListeners('console');
    page.removeAllListeners('pageerror');
  }

  await browser.close();

  const outPath = path.resolve(__dirname, './verify-example-results.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
})();
