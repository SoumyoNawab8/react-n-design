const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  const baseUrl = 'http://localhost:8080';

  // Input With Addons - more robust inspection
  await page.goto(`${baseUrl}/iframe.html?id=react-n-design-input--with-addons&viewMode=story`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const inputInfo = await page.evaluate(() => {
    const allDivs = document.querySelectorAll('div');
    let inputGroupWrapper = null;
    allDivs.forEach(d => {
      if (d.children.length >= 2 && d.style.display === 'flex') {
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
      }
    }));

    return {
      wrapperHTML: inputGroupWrapper.outerHTML.substring(0, 800),
      wrapperStyle: {
        display: getComputedStyle(inputGroupWrapper).display,
        alignItems: getComputedStyle(inputGroupWrapper).alignItems,
      },
      children,
    };
  });

  console.log('=== INPUT WITH ADDONS ===');
  console.log(JSON.stringify(inputInfo, null, 2));

  // DataGrid - check specific cells
  await page.goto(`${baseUrl}/iframe.html?id=react-n-design-datagrid--default&viewMode=story`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const gridInfo = await page.evaluate(() => {
    const statusCells = [];
    const cells = document.querySelectorAll('[role="gridcell"]');
    cells.forEach(c => {
      const text = c.textContent?.trim();
      if (text === 'active' || text === 'inactive') {
        statusCells.push({
          text,
          html: c.innerHTML.substring(0, 200),
          style: {
            overflow: getComputedStyle(c).overflow,
            textOverflow: getComputedStyle(c).textOverflow,
            whiteSpace: getComputedStyle(c).whiteSpace,
            width: getComputedStyle(c).width,
            display: getComputedStyle(c).display,
            color: getComputedStyle(c).color,
          }
        });
      }
    });
    return statusCells.slice(0, 3);
  });

  console.log('\n=== DATAGRID STATUS CELLS ===');
  console.log(JSON.stringify(gridInfo, null, 2));

  await browser.close();
})();
