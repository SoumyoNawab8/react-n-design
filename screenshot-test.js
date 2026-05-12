const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const baseUrl = 'http://localhost:8080';

  // Screenshot helper
  async function screenshotStory(kind, story, filename) {
    const url = `${baseUrl}/iframe.html?id=${kind}--${story}&viewMode=story`;
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `/Users/macworld/Desktop/dev/react-n-design/screenshots/${filename}`, fullPage: false });
    console.log(`Screenshot: ${filename}`);
  }

  await page.goto(`${baseUrl}/iframe.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Screenshot Input With Addons
  await screenshotStory('react-n-design-input', 'with-addons', 'input-with-addons.png');

  // Screenshot DataGrid Default
  await screenshotStory('react-n-design-datagrid', 'default', 'datagrid-default.png');

  // Screenshot ColorPicker Default
  await screenshotStory('react-n-design-colorpicker', 'default', 'colorpicker-default.png');

  await browser.close();
})();
