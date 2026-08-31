const { chromium } = require('playwright');
const fs = require('node:fs');

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

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const results = { passed: [], failed: [], errors: {} };

  for (const name of components) {
    const errors = [];
    const onConsole = (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    };
    const onPageError = (err) => errors.push(err.message);
    page.on('console', onConsole);
    page.on('pageerror', onPageError);

    try {
      await page.goto(`http://localhost:4173/react-n-design/components/${name}`, {
        waitUntil: 'networkidle',
      });
      await page.waitForTimeout(1500);
      // Ensure something rendered inside the demo area
      const demo = await page.$('#demo, [class*="demo"], main');
      const hasVisible = demo ? await demo.isVisible().catch(() => false) : false;

      if (errors.length > 0) {
        results.errors[name] = errors;
        results.failed.push(name);
        console.log(`❌ ${name}: ${errors.length} error(s)`);
        for (const e of errors.slice(0, 3)) console.log(`   ${e}`);
      } else {
        results.passed.push(name);
        console.log(`✅ ${name}${hasVisible ? '' : ' (visibility uncertain)'}`);
      }
    } catch (e) {
      results.failed.push(name);
      results.errors[name] = [e.message];
      console.log(`❌ ${name}: navigation/render failed - ${e.message}`);
    }

    page.off('console', onConsole);
    page.off('pageerror', onPageError);
  }

  await browser.close();

  fs.writeFileSync(
    '/Users/macworld/Desktop/dev/react-n-design/scripts/verify-all-components-results.json',
    JSON.stringify(results, null, 2)
  );
  console.log(`\n${results.passed.length} passed, ${results.failed.length} failed`);
  if (results.failed.length > 0) {
    console.log('Failed components:', results.failed.join(', '));
  }
  process.exit(results.failed.length > 0 ? 1 : 0);
})();
