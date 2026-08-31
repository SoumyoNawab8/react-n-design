const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');

const components = [
  'Accordion',
  'AudioWaveform',
  'Avatar',
  'AvatarGroup',
  'AIChat',
  'AIThinking',
  'Alert',
  'AppBar',
  'Badge',
  'Breadcrumbs',
  'Button',
  'Calendar',
  'Card',
  'Carousel',
  'Charts',
  'Checkbox',
  'CodeBlock',
  'Collapsible',
  'ColorPicker',
  'ComboBox',
  'CommandPalette',
  'CopyButton',
  'DataGrid',
  'DatePicker',
  'DiffViewer',
  'Divider',
  'Drawer',
  'Empty',
  'FileUpload',
  'FloatButton',
  'Form',
  'GanttChart',
  'GradientBorder',
  'Grid',
  'HeatmapCalendar',
  'Icon',
  'ImageGallery',
  'Input',
  'KanbanBoard',
  'Markdown',
  'Menu',
  'MentionInput',
  'Modal',
  'ModelSelector',
  'MultiSelect',
  'OrgChart',
  'OTPInput',
  'Pagination',
  'PinInput',
  'Popover',
  'ProgressBar',
  'PromptBuilder',
  'PromptInput',
  'RadioGroup',
  'Rating',
  'Resizable',
  'Result',
  'RSC',
  'ScrollArea',
  'Segmented',
  'Select',
  'Skeleton',
  'SkipToContent',
  'Slider',
  'Stack',
  'Statistic',
  'Stepper',
  'Steps',
  'StreamingText',
  'SuggestionChips',
  'Switch',
  'Table',
  'Tabs',
  'Tag',
  'RichTextEditor',
  'Terminal',
  'TextArea',
  'ThinkingBlock',
  'TimePicker',
  'Timeline',
  'Toast',
  'Toggle',
  'ToolCallCard',
  'Tooltip',
  'Tour',
  'Tree',
  'VirtualList',
  'VisuallyHidden',
];

const baseUrl = 'http://localhost:4173/react-n-design/components';
const outputDir = path.resolve(__dirname, '../example-screenshots');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const results = [];

  for (const name of components) {
    const componentDir = path.join(outputDir, name);
    if (!fs.existsSync(componentDir)) fs.mkdirSync(componentDir, { recursive: true });

    console.log(`\n📦 ${name}`);
    await page.goto(`${baseUrl}/${name}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);

    // Light mode
    await setTheme(page, 'light');
    await captureTabs(page, name, 'light', componentDir, results);

    // Dark mode
    await setTheme(page, 'dark');
    await captureTabs(page, name, 'dark', componentDir, results);
  }

  await browser.close();

  const summaryPath = path.join(outputDir, 'summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Captured ${results.length} screenshots to ${outputDir}`);
})();

async function setTheme(page, theme) {
  await page.evaluate((t) => {
    const select = document.querySelector('header select[aria-label="Theme"]');
    if (select) {
      select.value = t;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }, theme);
  await page.waitForTimeout(800);
}

async function captureTabs(page, name, theme, componentDir, results) {
  const tabLabels = await page.evaluate(() =>
    Array.from(document.querySelectorAll('button[role="tab"][id^="tab-"]')).map((b) => ({
      id: b.id,
      text: b.textContent.trim(),
    }))
  );

  if (tabLabels.length === 0) {
    const screenshotPath = path.join(componentDir, `${theme}-page.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    results.push({ component: name, theme, tab: 'page', path: screenshotPath });
    console.log(`  ${theme}: page screenshot (no tabs)`);
    return;
  }

  for (let i = 0; i < tabLabels.length; i++) {
    const { id, text } = tabLabels[i];
    const safeLabel = text.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    try {
      // Click via JS to bypass any overlay intercepts
      await page.evaluate((tabId) => {
        const tab = document.getElementById(tabId);
        if (tab) tab.click();
      }, id);
      await page.waitForTimeout(500);

      // Try to dismiss any modal/popover from previous example
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);

      const screenshotPath = path.join(componentDir, `${theme}-${i}-${safeLabel}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: false });
      results.push({ component: name, theme, tabIndex: i, tabLabel: text, path: screenshotPath });
      console.log(`  ${theme}: ${i}-${safeLabel}`);
    } catch (e) {
      console.log(`  ${theme}: ${i}-${safeLabel} FAILED: ${e.message}`);
      results.push({ component: name, theme, tabIndex: i, tabLabel: text, error: e.message });
    }
  }
}
