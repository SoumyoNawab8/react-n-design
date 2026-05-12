const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const baseUrl = 'http://localhost:8080';

  // Input With Addons
  await page.goto(`${baseUrl}/iframe.html?id=react-n-design-input--with-addons&viewMode=story`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const inputHtml = await page.evaluate(() => {
    const el = document.querySelector('[class*="InputGroupWrapper"]');
    return el ? el.outerHTML : 'NOT FOUND';
  });
  console.log('=== INPUT WITH ADDONS DOM ===');
  console.log(inputHtml);

  // DataGrid Default
  await page.goto(`${baseUrl}/iframe.html?id=react-n-design-datagrid--default&viewMode=story`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const gridHtml = await page.evaluate(() => {
    const rows = document.querySelectorAll('[role="row"]');
    let out = '';
    rows.forEach((r, i) => {
      if (i < 3) out += r.outerHTML.substring(0, 500) + '...\n';
    });
    return out || 'NO ROWS FOUND';
  });
  console.log('\n=== DATAGRID DOM (first 3 rows) ===');
  console.log(gridHtml);

  // Check computed styles
  const styles = await page.evaluate(() => {
    const cells = document.querySelectorAll('[role="gridcell"]');
    const out = [];
    cells.forEach((c, i) => {
      if (i < 5) {
        const cs = getComputedStyle(c);
        out.push({
          text: c.textContent?.trim()?.substring(0, 30),
          overflow: cs.overflow,
          textOverflow: cs.textOverflow,
          whiteSpace: cs.whiteSpace,
          width: cs.width,
          minWidth: cs.minWidth,
          display: cs.display,
        });
      }
    });
    return out;
  });
  console.log('\n=== DATAGRID CELL STYLES ===');
  console.log(JSON.stringify(styles, null, 2));

  await browser.close();
})();
