export const meta = {
  name: 'generate-example-additions',
  description:
    'Use sub-agents to generate five new component example snippets for every component.',
  phases: [
    { title: 'Generate', detail: 'Agents produce five example snippets per component group.' },
    { title: 'Combine', detail: 'Merge snippets into a single additions object.' },
  ],
};

const SCHEMA = {
  type: 'object',
  properties: {
    additions: {
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            render: { type: 'string' },
          },
          required: ['title', 'description', 'render'],
        },
      },
    },
  },
  required: ['additions'],
};

const IMPORTED_COMPONENTS = [
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
  'ChartBar',
  'ChartLine',
  'ChartArea',
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
  'Text',
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

const CONTROLLED_NAMES = {
  Switch: 'ControlledSwitchExample',
  Checkbox: 'ControlledCheckboxExample',
  RadioGroup: 'ControlledRadioGroupExample',
  Slider: 'ControlledSliderExample',
  Segmented: 'ControlledSegmentedExample',
  Rating: 'ControlledRatingExample',
  Toggle: 'ControlledToggleExample',
  DatePicker: 'ControlledDatePickerExample',
  TimePicker: 'ControlledTimePickerExample',
  ColorPicker: 'ControlledColorPickerExample',
  FileUpload: 'ControlledFileUploadExample',
  OTPInput: 'ControlledOTPInputExample',
  PinInput: 'ControlledPinInputExample',
  Select: 'ControlledSelectExample',
  MultiSelect: 'ControlledMultiSelectExample',
  ComboBox: 'ControlledComboBoxExample',
  MentionInput: 'ControlledMentionInputExample',
  PromptInput: 'ControlledPromptInputExample',
  RichTextEditor: 'ControlledRichTextEditorExample',
};

const GROUPS = [
  ['Button', 'Input', 'Card', 'Badge', 'Alert', 'Tag', 'Switch', 'Checkbox'],
  ['RadioGroup', 'Select', 'ThinkingBlock', 'Tabs', 'Table', 'Modal', 'SkipToContent'],
  ['Skeleton', 'ProgressBar', 'Avatar', 'Breadcrumbs', 'Divider', 'Tooltip', 'Popover', 'Steps'],
  ['Stack', 'Statistic', 'Slider', 'TextArea', 'DatePicker', 'TimePicker', 'OTPInput'],
  [
    'Rating',
    'Calendar',
    'Segmented',
    'Pagination',
    'RichTextEditor',
    'Result',
    'RSC',
    'Collapsible',
  ],
  ['CodeBlock', 'Tree', 'Toast', 'Toggle', 'Timeline', 'Terminal', 'Markdown'],
  [
    'CopyButton',
    'DiffViewer',
    'Drawer',
    'Empty',
    'HeatmapCalendar',
    'KanbanBoard',
    'DataGrid',
    'Form',
  ],
  [
    'CommandPalette',
    'AppBar',
    'FloatButton',
    'ScrollArea',
    'Grid',
    'Tour',
    'AIChat',
    'PromptInput',
  ],
  [
    'SuggestionChips',
    'MentionInput',
    'Accordion',
    'MultiSelect',
    'Resizable',
    'ColorPicker',
    'FileUpload',
  ],
  ['ComboBox', 'VisuallyHidden', 'VirtualList', 'OrgChart', 'GanttChart', 'GradientBorder', 'Icon'],
  ['ImageGallery', 'AvatarGroup', 'AudioWaveform', 'PinInput', 'Stepper', 'Menu', 'ModelSelector'],
  ['PromptBuilder', 'AIThinking', 'ToolCallCard', 'StreamingText', 'Carousel', 'Charts'],
];

phase('Generate');
const results = await parallel(
  GROUPS.map(
    (group, idx) => () =>
      agent(generatePrompt(group, idx + 1), {
        label: `group-${idx + 1}`,
        phase: 'Generate',
        schema: SCHEMA,
      })
  )
);

phase('Combine');
const combined = { additions: {} };
for (const r of results) {
  if (r?.additions) {
    Object.assign(combined.additions, r.additions);
  }
}

log(`Combined ${Object.keys(combined.additions).length} component additions.`);

return combined;

function generatePrompt(group, label) {
  const lines = group
    .map((name) => {
      const controlled = CONTROLLED_NAMES[name];
      return `  - ${name}: add FIVE new examples. Show real, usable variants (sizes, states, colors, layouts, content).${
        controlled
          ? ` You may include one controlled example using "() => <${controlled} />" if it adds value.`
          : ''
      }`;
    })
    .join('\n');

  return `You are generating new example snippets for the react-n-design documentation site.

For each component listed below, read its existing examples in /Users/macworld/Desktop/dev/react-n-design/site/src/data/componentExamples.tsx and its props in /Users/macworld/Desktop/dev/react-n-design/site/src/data/componentProps.json. Produce EXACTLY FIVE additional Example objects per component that are visually distinct and demonstrate usable, realistic props.

Rules:
- Use ONLY the following imported components in JSX: ${IMPORTED_COMPONENTS.join(', ')}.
- Do NOT invent props; only use props documented in componentProps.json.
- Do NOT duplicate existing example titles or concepts.
- Keep snippets simple and centered. Use Stack/Card/Button as layout helpers when appropriate.
- Each Example must have title, description, and render fields.
- render must be a complete inline arrow function body string, e.g. render: "() => (<Stack direction=\\"row\\" gap={12}>...</Stack>)".
- For controlled components, you may output exactly one example with render: "() => <Controlled<Name>Example />" if a controlled example is appropriate; the remaining four should be inline.
- Avoid examples that depend on browser-only APIs (e.g., actual file selection, real image uploads) unless the component is specifically for that.
- Return a JSON object with a single key "additions" mapping each component name to an array of exactly five Example objects.

Components for group ${label}:
${lines}

Return only the JSON object. Do not wrap in markdown.`;
}
