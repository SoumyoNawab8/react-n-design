const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.log('CONSOLE ERROR:', msg.text());
    }
  });
  page.on('pageerror', (err) => {
    errors.push(err.message);
    console.log('PAGE ERROR:', err.message);
  });

  const base = 'http://localhost:4173/react-n-design';
  const shots = [];

  // Home page
  await page.goto(`${base}/`);
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: '/Users/macworld/Desktop/dev/react-n-design/site-test-home.png',
    fullPage: true,
  });
  shots.push('home');

  // Components page
  await page.goto(`${base}/components`);
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: '/Users/macworld/Desktop/dev/react-n-design/site-test-components.png',
    fullPage: true,
  });
  shots.push('components');

  // Component detail pages to test
  const componentsToTest = [
    'Button',
    'Input',
    'Card',
    'Modal',
    'Table',
    'Badge',
    'Alert',
    'Tag',
    'Switch',
    'Checkbox',
    'RadioGroup',
    'Select',
    'Tabs',
    'Skeleton',
    'ProgressBar',
    'Avatar',
    'Breadcrumbs',
    'Divider',
    'Tooltip',
    'Popover',
    'Steps',
    'Statistic',
    'Slider',
    'TextArea',
    'DatePicker',
    'TimePicker',
    'OTPInput',
    'Rating',
    'Calendar',
    'Segmented',
    'Pagination',
    'Result',
    'Collapsible',
    'CodeBlock',
    'Tree',
    'Timeline',
    'Terminal',
    'Markdown',
    'CopyButton',
    'DiffViewer',
    'HeatmapCalendar',
    'KanbanBoard',
    'DataGrid',
    'Form',
    'CommandPalette',
    'AppBar',
    'FloatButton',
    'ScrollArea',
    'Grid',
    'Tour',
    'AIChat',
    'PromptInput',
    'SuggestionChips',
    'MentionInput',
    'ChartBar',
  ];

  for (const name of componentsToTest) {
    await page.goto(`${base}/components/${name}`);
    await page.waitForTimeout(1500);
    const hasError = errors.some(
      (e) => e.includes(name) || e.includes('undefined') || e.includes('not a function')
    );
    if (hasError) {
      console.log(`⚠️ ${name} had errors`);
    } else {
      console.log(`✅ ${name} OK`);
    }
    // Clear errors for next component
    errors.length = 0;
  }

  await browser.close();
  console.log('Screenshots saved:', shots.join(', '));
})();
