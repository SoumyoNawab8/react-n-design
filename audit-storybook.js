const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const baseUrl = 'http://localhost:8080';
const outputFile = '/Users/macworld/Desktop/dev/react-n-design/audit-findings.json';

async function auditStory(url, storyName) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const findings = [];

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(1000);

    const issues = await page.evaluate(() => {
      const results = [];
      const allElements = document.querySelectorAll('body *');

      allElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const parent = el.parentElement;
        if (!parent) return;
        const parentRect = parent.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const parentCs = getComputedStyle(parent);

        // Check if element overflows its parent
        const overflowsRight = rect.right > parentRect.right + 2;
        const overflowsLeft = rect.left < parentRect.left - 2;
        const overflowsBottom = rect.bottom > parentRect.bottom + 2;
        const overflowsTop = rect.top < parentRect.top - 2;

        if ((overflowsRight || overflowsLeft || overflowsBottom || overflowsTop) &&
            rect.width > 0 && rect.height > 0 &&
            cs.position !== 'fixed' && cs.position !== 'absolute') {
          results.push({
            type: 'overflow',
            tag: el.tagName,
            class: el.className?.substring(0, 80),
            text: el.textContent?.trim()?.substring(0, 40),
            detail: `overflows parent: right=${overflowsRight} left=${overflowsLeft} bottom=${overflowsBottom} top=${overflowsTop}`,
          });
        }

        // Check inputs without box-sizing border-box
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
          const hasBorderBox = cs.boxSizing === 'border-box';
          const hasPadding = parseFloat(cs.paddingLeft) > 0 || parseFloat(cs.paddingRight) > 0;
          const hasWidth = cs.width && cs.width !== 'auto';
          if (!hasBorderBox && hasPadding && hasWidth) {
            results.push({
              type: 'box-sizing',
              tag: el.tagName,
              class: el.className?.substring(0, 80),
              text: el.placeholder || el.value || el.textContent?.trim()?.substring(0, 20),
              detail: 'input/textarea has width + padding but no box-sizing: border-box',
            });
          }
        }

        // Check text clipping in flex/grid items
        if (cs.overflow === 'hidden' && cs.textOverflow !== 'ellipsis' &&
            cs.whiteSpace === 'nowrap' && el.children.length === 0) {
          const textWidth = el.scrollWidth;
          const containerWidth = el.clientWidth;
          if (textWidth > containerWidth + 2) {
            results.push({
              type: 'text-clip',
              tag: el.tagName,
              class: el.className?.substring(0, 80),
              text: el.textContent?.trim()?.substring(0, 40),
              detail: `text clipped: scrollWidth=${textWidth} clientWidth=${containerWidth}`,
            });
          }
        }
      });

      return results;
    });

    findings.push(...issues);
  } catch (e) {
    findings.push({ type: 'error', detail: e.message });
  }

  await browser.close();
  return { story: storyName, url, findings };
}

(async () => {
  // Start server
  const { spawn } = require('child_process');
  const server = spawn('python3', ['-m', 'http.server', '8080', '--directory', 'storybook-static'], {
    detached: true,
    stdio: 'ignore',
  });
  server.unref();
  await new Promise((r) => setTimeout(r, 2000));

  const stories = [
    { id: 'react-n-design-accordion--default', name: 'Accordion' },
    { id: 'react-n-design-alert--default', name: 'Alert' },
    { id: 'react-n-design-avatar--default', name: 'Avatar' },
    { id: 'react-n-design-badge--default', name: 'Badge' },
    { id: 'react-n-design-breadcrumbs--default', name: 'Breadcrumbs' },
    { id: 'react-n-design-button--default', name: 'Button' },
    { id: 'react-n-design-card--default', name: 'Card' },
    { id: 'react-n-design-carousel--default', name: 'Carousel' },
    { id: 'react-n-design-colorpicker--default', name: 'ColorPicker' },
    { id: 'react-n-design-combobox--default', name: 'ComboBox' },
    { id: 'react-n-design-datagrid--default', name: 'DataGrid' },
    { id: 'react-n-design-datepicker--default', name: 'DatePicker' },
    { id: 'react-n-design-divider--default', name: 'Divider' },
    { id: 'react-n-design-drawer--default', name: 'Drawer' },
    { id: 'react-n-design-fileupload--default', name: 'FileUpload' },
    { id: 'react-n-design-form--default', name: 'Form' },
    { id: 'react-n-design-grid--default', name: 'Grid' },
    { id: 'react-n-design-icon--default', name: 'Icon' },
    { id: 'react-n-design-input--default', name: 'Input' },
    { id: 'react-n-design-input--with-addons', name: 'Input_WithAddons' },
    { id: 'react-n-design-menu--default', name: 'Menu' },
    { id: 'react-n-design-modal--default', name: 'Modal' },
    { id: 'react-n-design-multiselect--default', name: 'MultiSelect' },
    { id: 'react-n-design-progressbar--default', name: 'ProgressBar' },
    { id: 'react-n-design-select--default', name: 'Select' },
    { id: 'react-n-design-skeleton--default', name: 'Skeleton' },
    { id: 'react-n-design-skiptocontent--default', name: 'SkipToContent' },
    { id: 'react-n-design-slider--default', name: 'Slider' },
    { id: 'react-n-design-stack--default', name: 'Stack' },
    { id: 'react-n-design-stepper--default', name: 'Stepper' },
    { id: 'react-n-design-switch--default', name: 'Switch' },
    { id: 'react-n-design-table--default', name: 'Table' },
    { id: 'react-n-design-tabs--default', name: 'Tabs' },
    { id: 'react-n-design-tag--default', name: 'Tag' },
    { id: 'react-n-design-toast--default', name: 'Toast' },
    { id: 'react-n-design-tooltip--default', name: 'Tooltip' },
    { id: 'react-n-design-tree--default', name: 'Tree' },
    { id: 'react-n-design-typography--default', name: 'Typography' },
    { id: 'react-n-design-visuallyhidden--default', name: 'VisuallyHidden' },
  ];

  const allResults = [];
  for (const story of stories) {
    const url = `${baseUrl}/iframe.html?id=${story.id}&viewMode=story`;
    const result = await auditStory(url, story.name);
    allResults.push(result);
    console.log(`Audited ${story.name}: ${result.findings.length} findings`);
  }

  fs.writeFileSync(outputFile, JSON.stringify(allResults, null, 2));
  console.log(`\nResults saved to ${outputFile}`);

  // Also write a markdown summary
  const md = allResults
    .filter((r) => r.findings.length > 0)
    .map((r) => {
      const items = r.findings
        .map((f) => `- [${f.type}] ${f.tag || ''} ${f.class || ''} \`${f.text || ''}\` — ${f.detail}`)
        .join('\n');
      return `## ${r.story}\n${items}`;
    })
    .join('\n\n');

  fs.writeFileSync('/Users/macworld/Desktop/dev/react-n-design/audit-findings.md', `# Storybook Visual Audit\n\n${md}`);
  console.log('Markdown summary saved to audit-findings.md');

  process.exit(0);
})();
