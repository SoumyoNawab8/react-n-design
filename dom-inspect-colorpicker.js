const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const baseUrl = 'http://localhost:8080';

  // ColorPicker Default
  await page.goto(`${baseUrl}/iframe.html?id=react-n-design-colorpicker--default&viewMode=story`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const cpInfo = await page.evaluate(() => {
    const el = document.querySelector('[class*="ColorPicker"]') || document.body.querySelector('div > div');
    if (!el) return 'NO COLORPICKER FOUND';
    return {
      text: el.textContent?.trim()?.substring(0, 100),
      style: {
        backgroundColor: getComputedStyle(el).backgroundColor,
        boxShadow: getComputedStyle(el).boxShadow,
        borderRadius: getComputedStyle(el).borderRadius,
        padding: getComputedStyle(el).padding,
        display: getComputedStyle(el).display,
      }
    };
  });

  console.log('=== COLORPICKER ===');
  console.log(JSON.stringify(cpInfo, null, 2));

  await browser.close();
})();
