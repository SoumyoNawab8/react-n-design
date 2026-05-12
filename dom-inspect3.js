const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const baseUrl = 'http://localhost:8080';

  // Input With Addons - use computed styles
  await page.goto(`${baseUrl}/iframe.html?id=react-n-design-input--with-addons&viewMode=story`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const inputInfo = await page.evaluate(() => {
    const allDivs = document.querySelectorAll('div');
    let inputGroupWrapper = null;
    allDivs.forEach(d => {
      const cs = getComputedStyle(d);
      if (d.children.length >= 2 && cs.display === 'flex' && cs.alignItems === 'stretch') {
        const text = d.textContent?.trim() || '';
        if (text.includes('https://') || text.includes('.com')) {
          inputGroupWrapper = d;
        }
      }
    });

    if (!inputGroupWrapper) return 'NO INPUT GROUP FOUND';

    const children = Array.from(inputGroupWrapper.children).map(c => ({
      tag: c.tagName,
      text: c.textContent?.trim()?.substring(0, 50),
      class: c.className?.substring(0, 100),
      style: {
        backgroundColor: getComputedStyle(c).backgroundColor,
        boxShadow: getComputedStyle(c).boxShadow,
        borderRadius: getComputedStyle(c).borderRadius,
        padding: getComputedStyle(c).padding,
        display: getComputedStyle(c).display,
        color: getComputedStyle(c).color,
        width: getComputedStyle(c).width,
        height: getComputedStyle(c).height,
      }
    }));

    return {
      wrapperText: inputGroupWrapper.textContent?.trim()?.substring(0, 100),
      wrapperStyle: {
        display: getComputedStyle(inputGroupWrapper).display,
        alignItems: getComputedStyle(inputGroupWrapper).alignItems,
        width: getComputedStyle(inputGroupWrapper).width,
      },
      children,
    };
  });

  console.log('=== INPUT WITH ADDONS ===');
  console.log(JSON.stringify(inputInfo, null, 2));

  // Also check body innerText to see if story loaded at all
  const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 200));
  console.log('\n=== PAGE BODY TEXT ===');
  console.log(bodyText);

  // DataGrid - check overflow clipping
  await page.goto(`${baseUrl}/iframe.html?id=react-n-design-datagrid--default&viewMode=story`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const gridBodyStyle = await page.evaluate(() => {
    const el = document.querySelector('[class*="GridBody"]') || document.querySelector('[role="grid"] > div:nth-child(2)');
    if (!el) return 'NO GRID BODY FOUND';
    const cs = getComputedStyle(el);
    return {
      overflow: cs.overflow,
      overflowX: cs.overflowX,
      overflowY: cs.overflowY,
      width: cs.width,
      height: cs.height,
    };
  });
  console.log('\n=== DATAGRID BODY STYLE ===');
  console.log(JSON.stringify(gridBodyStyle, null, 2));

  await browser.close();
})();
