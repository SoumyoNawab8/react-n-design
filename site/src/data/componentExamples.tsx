import React from 'react';
import exampleCodeJson from './exampleCode.json';
import {
  Accordion,
  AudioWaveform,
  Avatar,
  AvatarGroup,
  AIChat,
  AIThinking,
  Alert,
  AppBar,
  Badge,
  Breadcrumbs,
  Button,
  Calendar,
  Card,
  Carousel,
  ChartBar,
  ChartLine,
  ChartArea,
  Checkbox,
  CodeBlock,
  Collapsible,
  ColorPicker,
  ComboBox,
  CommandPalette,
  CopyButton,
  DataGrid,
  DatePicker,
  DiffViewer,
  Divider,
  Drawer,
  Empty,
  FileUpload,
  FloatButton,
  Form,
  GanttChart,
  GradientBorder,
  Grid,
  HeatmapCalendar,
  Icon,
  ImageGallery,
  Input,
  KanbanBoard,
  Markdown,
  Menu,
  MentionInput,
  Modal,
  ModelSelector,
  MultiSelect,
  OrgChart,
  OTPInput,
  Pagination,
  PinInput,
  Popover,
  ProgressBar,
  PromptBuilder,
  PromptInput,
  RadioGroup,
  Rating,
  Resizable,
  Result,
  ScrollArea,
  Segmented,
  Select,
  Skeleton,
  SkipToContent,
  Slider,
  Stack,
  Statistic,
  Stepper,
  Steps,
  StreamingText,
  SuggestionChips,
  Switch,
  Table,
  Tabs,
  Tag,
  RichTextEditor,
  Terminal,
  Text,
  TextArea,
  ThinkingBlock,
  TimePicker,
  Timeline,
  Toast,
  Toggle,
  ToolCallCard,
  Tooltip,
  Tour,
  Tree,
  VirtualList,
  VisuallyHidden,
  ToastProvider,
  useToast,
} from 'react-n-design';

export interface Example {
  title: string;
  description: string;
  render: () => React.ReactNode;
  code?: string;
}

/* ---------- Stateful example components ----------
 * These are defined as real components so hooks run at the top level,
 * not inside the render() callback that is memoized by ComponentDemo.
 */
const ModalBasicExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Modal Title">
        <p>This is the modal content area.</p>
        <Stack direction="row" gap={12} style={{ marginTop: 16 }}>
          <Button onClick={() => setOpen(false)}>OK</Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

const ModalSizesExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Small Modal
      </Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Small" size="small">
        <p>Compact modal content.</p>
      </Modal>
    </>
  );
};

const ModalWithFooterExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        footer={
          <Stack direction="row" gap={12}>
            <Button size="small" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="small" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </Stack>
        }
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </>
  );
};

const CommandPaletteExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Open Palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        items={[
          { id: '1', label: 'Copy', shortcut: '⌘C', onSelect: () => {} },
          { id: '2', label: 'Paste', shortcut: '⌘V', onSelect: () => {} },
        ]}
      />
    </>
  );
};

const TourExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Start Tour
      </Button>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={[{ target: '#demo', title: 'Welcome', description: 'This is the first step.' }]}
      />
    </>
  );
};

const DrawerExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Drawer Title" placement="right">
        <p>This is the drawer content area.</p>
      </Drawer>
    </>
  );
};

const ToastDemoExample: React.FC = () => {
  const { success } = useToast();
  return (
    <Button size="small" onClick={() => success('Saved successfully!')}>
      Show Toast
    </Button>
  );
};

const ToastVariantsExample: React.FC = () => {
  const { success, error, warning } = useToast();
  return (
    <Stack direction="row" gap={12}>
      <Button size="small" onClick={() => success('Operation completed')}>
        Success
      </Button>
      <Button size="small" variant="secondary" onClick={() => warning('Please review')}>
        Warning
      </Button>
      <Button size="small" variant="danger" onClick={() => error('Something went wrong')}>
        Error
      </Button>
    </Stack>
  );
};

const ControlledCheckboxExample: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  return <Checkbox checked={checked} onChange={setChecked} label="Accept terms" />;
};

const ControlledColorPickerExample: React.FC = () => {
  const [color, setColor] = React.useState('#6d5dfc');
  return <ColorPicker value={color} onChange={setColor} />;
};

const ControlledComboBoxExample: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <ComboBox
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Search framework..."
    />
  );
};

const ControlledDatePickerExample: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());
  return <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />;
};

const ControlledFileUploadExample: React.FC = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  return <FileUpload accept="image/*" multiple onFilesChange={setFiles} />;
};

const ControlledMentionInputExample: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <MentionInput
      options={[{ id: '1', label: 'Alice', value: 'alice' }]}
      value={value}
      onChange={setValue}
      placeholder="Type @ to mention"
    />
  );
};

const ControlledMultiSelectExample: React.FC = () => {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <MultiSelect
      options={['React', 'Vue', 'Angular', 'Svelte']}
      value={value}
      onChange={setValue}
      placeholder="Pick frameworks"
    />
  );
};

const ControlledOTPInputExample: React.FC = () => {
  const [otp, setOtp] = React.useState('');
  return <OTPInput length={6} value={otp} onChange={setOtp} />;
};

const ControlledPinInputExample: React.FC = () => {
  const [pin, setPin] = React.useState('');
  return <PinInput length={4} value={pin} onChange={setPin} />;
};

const ControlledPromptInputExample: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <PromptInput value={value} onChange={setValue} onSend={setValue} placeholder="Ask anything…" />
  );
};

const ControlledRadioGroupExample: React.FC = () => {
  const [value, setValue] = React.useState('a');
  return (
    <RadioGroup
      options={[
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
      ]}
      value={value}
      onChange={setValue}
    />
  );
};

const ControlledRatingExample: React.FC = () => {
  const [value, setValue] = React.useState(3);
  return <Rating value={value} onChange={setValue} precision={0.5} />;
};

const ControlledRichTextEditorExample: React.FC = () => {
  const [value, setValue] = React.useState('<p>Edit <strong>rich text</strong> content.</p>');
  return <RichTextEditor value={value} onChange={setValue} placeholder="Start typing..." />;
};

const ControlledRichTextEditorDisabledExample: React.FC = () => {
  const [value] = React.useState('<p>This content is <strong>read only</strong>.</p>');
  return <RichTextEditor value={value} onChange={() => {}} disabled={true} />;
};

const ControlledSegmentedExample: React.FC = () => {
  const [value, setValue] = React.useState('Day');
  return <Segmented options={['Day', 'Week', 'Month']} value={value} onChange={setValue} />;
};

const ControlledSelectExample: React.FC = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  return (
    <Select
      options={[
        { value: '1', label: 'Option One' },
        { value: '2', label: 'Option Two' },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Select an option"
    />
  );
};

const ControlledSliderExample: React.FC = () => {
  const [value, setValue] = React.useState(30);
  return <Slider value={value} onChange={setValue} label="Volume" />;
};

const ControlledSwitchExample: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  return <Switch checked={checked} onChange={setChecked} label="Notifications" />;
};

const ControlledTextAreaExample: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <TextArea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type a message…"
      rows={4}
    />
  );
};

const ControlledTimePickerExample: React.FC = () => {
  const [time, setTime] = React.useState<{ hours: number; minutes: number } | null>({
    hours: 10,
    minutes: 0,
  });
  return <TimePicker value={time} onChange={setTime} />;
};

const ControlledToggleExample: React.FC = () => {
  const [pressed, setPressed] = React.useState(false);
  return (
    <Toggle pressed={pressed} onPressedChange={setPressed}>
      {pressed ? 'On' : 'Off'}
    </Toggle>
  );
};

const DrawerLeftExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Open Left Drawer
      </Button>
      <Drawer isOpen={open} onClose={() => setOpen(false)} title="Left Drawer" placement="left">
        <p>This drawer slides in from the left.</p>
      </Drawer>
    </>
  );
};

const CommandPaletteGroupsExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Open Palette
      </Button>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        placeholder="Search commands..."
        items={[
          { id: '1', label: 'Copy', shortcut: '⌘C', onSelect: () => {} },
          { id: '2', label: 'Paste', shortcut: '⌘V', onSelect: () => {} },
          { id: '3', label: 'Run Build', shortcut: '⌘B', onSelect: () => {} },
          { id: '4', label: 'Deploy', shortcut: '⌘D', onSelect: () => {} },
        ]}
      />
    </>
  );
};

const TourMultiStepExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button size="small" onClick={() => setOpen(true)}>
        Start Tour
      </Button>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={[
          { target: '#demo', title: 'Welcome', description: 'This is the first step.' },
          { target: '#demo', title: 'Explore', description: 'This is the second step.' },
          { target: '#demo', title: 'Finish', description: 'This is the final step.' },
        ]}
      />
    </>
  );
};

const ControlledModelSelectorExample: React.FC = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  return (
    <ModelSelector
      value={value}
      onChange={setValue}
      placeholder="Select a model"
      models={[
        {
          id: 'gpt-4',
          name: 'GPT-4',
          provider: 'OpenAI',
          contextWindow: 128000,
          pricePer1kTokens: 0.03,
        },
        {
          id: 'claude',
          name: 'Claude 3.5',
          provider: 'Anthropic',
          contextWindow: 200000,
          pricePer1kTokens: 0.008,
        },
        {
          id: 'gemini',
          name: 'Gemini',
          provider: 'Google',
          contextWindow: 1000000,
          pricePer1kTokens: 0.0005,
        },
      ]}
    />
  );
};

const ControlledTabsExample: React.FC = () => {
  const [activeKey, setActiveKey] = React.useState('1');
  return (
    <Tabs
      activeKey={activeKey}
      onTabChange={setActiveKey}
      items={[
        { key: '1', label: 'Design', children: <p>Design content for tab 1</p> },
        { key: '2', label: 'Code', children: <p>Code content for tab 2</p> },
        { key: '3', label: 'Preview', children: <p>Preview content for tab 3</p> },
      ]}
    />
  );
};

const ControlledAccordionExample: React.FC = () => {
  const [activeKey, setActiveKey] = React.useState<string | number>('1');
  return (
    <Accordion
      activeKey={activeKey}
      onChange={setActiveKey}
      items={[
        { key: '1', label: 'Billing', children: 'Manage your billing settings.' },
        { key: '2', label: 'Notifications', children: 'Configure notification preferences.' },
        { key: '3', label: 'Security', children: 'Update passwords and 2FA.' },
      ]}
    />
  );
};

const ControlledPopoverExample: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={<Button size="small">Toggle Popover</Button>}
      content={
        <div style={{ padding: 12 }}>
          <p>This popover is controlled externally.</p>
          <Button size="small" onClick={() => setOpen(false)}>
            Close
          </Button>
        </div>
      }
    />
  );
};

const ControlledStepsExample: React.FC = () => {
  const [current, setCurrent] = React.useState(0);
  return (
    <Stack direction="column" gap={16}>
      <Steps
        current={current}
        items={[
          { title: 'Account', description: 'Create account' },
          { title: 'Profile', description: 'Add details' },
          { title: 'Confirm', description: 'Review and submit' },
        ]}
      />
      <Stack direction="row" gap={12}>
        <Button
          size="small"
          disabled={current === 0}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
        >
          Previous
        </Button>
        <Button size="small" onClick={() => setCurrent((c) => Math.min(2, c + 1))}>
          {current === 2 ? 'Finish' : 'Next'}
        </Button>
      </Stack>
    </Stack>
  );
};

const ControlledToastExample: React.FC = () => {
  const { success, info } = useToast();
  return (
    <Stack direction="row" gap={12}>
      <Button size="small" onClick={() => info('Processing...')}>
        Info
      </Button>
      <Button size="small" variant="secondary" onClick={() => success('Done!')}>
        Success
      </Button>
    </Stack>
  );
};

const ControlledTimelineExample: React.FC = () => {
  const [reverse, setReverse] = React.useState(false);
  return (
    <>
      <Button size="small" onClick={() => setReverse((r) => !r)} style={{ marginBottom: 12 }}>
        {reverse ? 'Oldest First' : 'Newest First'}
      </Button>
      <Timeline
        reverse={reverse}
        items={[
          { children: 'Created project', color: 'blue' },
          { children: 'Released v1.0', color: 'red' },
        ]}
      />
    </>
  );
};

const ControlledPaginationExample: React.FC = () => {
  const [page, setPage] = React.useState(1);
  return <Pagination currentPage={page} totalPages={10} onChange={setPage} showPrevNext={false} />;
};

const ControlledCalendarExample: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Calendar
      value={date}
      onChange={(d) => d && setDate(d)}
      disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6}
    />
  );
};

const ControlledCodeBlockExample: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  const code = `function greet(name: string) {\n  return \`Hello, \${name}!\`;\n}`;
  return <CodeBlock code={code} language="typescript" showLineNumbers={true} copyable={true} />;
};

const ControlledTreeExample: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  return (
    <Tree
      data={[
        {
          key: '1',
          title: 'Parent',
          children: [
            { key: '1-1', title: 'Child A' },
            { key: '1-2', title: 'Child B', children: [{ key: '1-2-1', title: 'Grandchild' }] },
          ],
        },
      ]}
      defaultExpandedKeys={['1']}
      onSelect={setSelectedKeys}
    />
  );
};

const ControlledSegmentedExample2: React.FC = () => {
  const [value, setValue] = React.useState('Day');
  return (
    <Segmented options={['Day', 'Week', 'Month']} value={value} onChange={setValue} size="small" />
  );
};

const ControlledKanbanExample: React.FC = () => {
  const [columns, setColumns] = React.useState([
    { title: 'To Do', tasks: [{ id: '1', title: 'Design' }] },
    { title: 'Done', tasks: [{ id: '2', title: 'Research' }] },
  ]);
  return <KanbanBoard columns={columns} onChange={setColumns} />;
};

const ControlledFloatButtonExample: React.FC = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ position: 'relative', height: 120, width: '100%' }}>
      <p style={{ textAlign: 'center' }}>Clicked {count} times</p>
      <FloatButton icon="+" position="bottom-right" onClick={() => setCount((c) => c + 1)} />
    </div>
  );
};


export const componentExamples: Record<string, Example[]> = {
  Button: [
    {
      title: 'Variants',
      description: 'Primary, secondary, ghost, and danger variants.',
      render: () => (
        <Stack direction="row" gap={12} align="center" wrap={true}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </Stack>
      ),
    },
    {
      title: 'Sizes',
      description: 'Small, medium (default), and large buttons.',
      render: () => (
        <Stack direction="row" gap={12} align="center" wrap={true}>
          <Button size="small">Small</Button>
          <Button size="medium">Medium</Button>
          <Button size="large">Large</Button>
        </Stack>
      ),
    },
    {
      title: 'States',
      description: 'Loading and disabled states.',
      render: () => (
        <Stack direction="row" gap={12} align="center" wrap={true}>
          <Button loading={true}>Loading</Button>
          <Button disabled={true}>Disabled</Button>
        </Stack>
      ),
    },
    {
      title: 'With Icons',
      description: 'Buttons with left and right icons.',
      render: () => (
        <Stack direction="row" gap={12} align="center" wrap={true}>
          <Button leftIcon={<span>←</span>}>Back</Button>
          <Button rightIcon={<span>→</span>}>Next</Button>
        </Stack>
      ),
    },
      {
      title: 'Shapes',
      description: 'Default and circle buttons for different layouts.',
      render: () => (
  <Stack direction="row" gap={12} align="center" wrap={true}>
    <Button shape="default">Default</Button>
    <Button shape="circle" aria-label="Add">+</Button>
  </Stack>
),
    },
    {
      title: 'Full Width',
      description: 'Button that spans the full width of its container.',
      render: () => (
  <div style={{ width: 240 }}>
    <Button fullWidth={true}>Full-width button</Button>
  </div>
),
    },
    {
      title: 'Loading Text',
      description: 'Loading state with custom text feedback.',
      render: () => (
  <Stack direction="row" gap={12} align="center" wrap={true}>
    <Button loading={true} loadingText="Saving...">
      Save
    </Button>
    <Button loading={true} />
  </Stack>
),
    },
    {
      title: 'Glass & Gradient',
      description: 'Glass morphism and gradient visual styles.',
      render: () => (
  <Stack direction="row" gap={12} align="center" wrap={true}>
    <Button glassMorphism={true}>Glass</Button>
    <Button gradient={true}>Gradient</Button>
  </Stack>
),
    },
    {
      title: 'Success & Text',
      description: 'Success and text variants for subtle actions.',
      render: () => (
  <Stack direction="row" gap={12} align="center" wrap={true}>
    <Button variant="success">Success</Button>
    <Button variant="text">Text link</Button>
  </Stack>
),
    },
],

  Input: [
    {
      title: 'Basic',
      description: 'Standard text input with placeholder.',
      render: () => <Input placeholder="Type something…" />,
    },
    {
      title: 'States',
      description: 'Disabled and error states.',
      render: () => (
        <Stack direction="column" gap={12}>
          <Input placeholder="Disabled" disabled={true} />
          <Input placeholder="Error" error="Invalid input" />
        </Stack>
      ),
    },
    {
      title: 'Sizes',
      description: 'Small and medium inputs.',
      render: () => (
        <Stack direction="column" gap={12}>
          <Input placeholder="Small" inputSize="small" />
          <Input placeholder="Medium" inputSize="medium" />
        </Stack>
      ),
    },
      {
      title: 'Label and Helper',
      description: 'Input with a visible label and helper text.',
      render: () => (
  <Input
    label="Email address"
    placeholder="you@example.com"
    helperText="We will never share your email."
  />
),
    },
    {
      title: 'Add-ons',
      description: 'Input with before and after add-ons.',
      render: () => (
  <Input
    placeholder="Amount"
    addonBefore={<span>$</span>}
    addonAfter={<span>USD</span>}
  />
),
    },
    {
      title: 'Prefix and Suffix',
      description: 'Input with inline prefix and suffix icons.',
      render: () => (
  <Stack direction="column" gap={12}>
    <Input placeholder="Search" prefix={<Icon name="search" size={16} />} />
    <Input placeholder="Website" suffix={<Icon name="globe" size={16} />} />
  </Stack>
),
    },
    {
      title: 'Floating Label',
      description: 'Input with an animated floating label.',
      render: () => (
  <Input
    label="Username"
    placeholder="Enter username"
    floatingLabel={true}
  />
),
    },
    {
      title: 'Character Count',
      description: 'Input that shows remaining characters with a max length.',
      render: () => (
  <Input
    placeholder="Bio"
    maxLength={80}
    characterCount={true}
  />
),
    },
],

  Card: [
    {
      title: 'Variants',
      description: 'Outset, inset, and glassmorphism variants.',
      render: () => (
        <Stack direction="row" gap={16} wrap={true}>
          <Card variant="outset" style={{ width: 180, padding: 20 }}>
            Outset
          </Card>
          <Card variant="inset" style={{ width: 180, padding: 20 }}>
            Inset
          </Card>
          <Card variant="glass" style={{ width: 180, padding: 20 }}>
            Glass
          </Card>
        </Stack>
      ),
    },
    {
      title: 'With Content',
      description: 'Card with title, body, and footer.',
      render: () => (
        <Card variant="outset" style={{ maxWidth: 320, padding: 24 }}>
          <strong style={{ fontSize: '1.1rem' }}>Card Title</strong>
          <p style={{ margin: '8px 0 0', color: 'var(--n-color-text-secondary)' }}>
            This is the card body with some description text.
          </p>
        </Card>
      ),
    },
    {
      title: 'Loading States',
      description: 'Card with loading spinner and shimmer effects.',
      render: () => (
        <Stack direction="row" gap={16} wrap={true}>
          <Card loading={true} style={{ width: 180, padding: 20 }}>
            Loading content
          </Card>
          <Card shimmer={true} style={{ width: 180, padding: 20 }}>
            Shimmer content
          </Card>
        </Stack>
      ),
    },
      {
      title: 'Elevated Variant',
      description: 'Card with an elevated shadow style.',
      render: () => (
  <Stack direction="row" gap={16} wrap={true}>
    <Card variant="elevated" style={{ width: 180, padding: 20 }}>
      Elevated
    </Card>
    <Card variant="outset" bordered={true} style={{ width: 180, padding: 20 }}>
      Bordered outset
    </Card>
  </Stack>
),
    },
    {
      title: 'Header and Footer',
      description: 'Card with structured header, body, and footer.',
      render: () => (
  <Card
    style={{ maxWidth: 320 }}
    header={<strong>Plan</strong>}
    footer={
      <Button size="small" fullWidth={true}>
        Select plan
      </Button>
    }
  >
    <p style={{ margin: 0, color: 'var(--n-color-text-secondary)' }}>
      Everything you need to ship faster.
    </p>
  </Card>
),
    },
    {
      title: 'Cover Image',
      description: 'Card with a top cover area and aspect ratio.',
      render: () => (
  <Card
    variant="outset"
    cover={<div style={{ background: 'var(--n-color-primary)', height: '100%' }} />}
    coverAspectRatio="16/9"
    style={{ maxWidth: 280, padding: 16 }}
  >
    <strong>Project preview</strong>
    <p style={{ margin: '8px 0 0', color: 'var(--n-color-text-secondary)' }}>
      A cover area adds visual context.
    </p>
  </Card>
),
    },
    {
      title: 'Hoverable Card',
      description: 'Card that lifts on hover, useful for clickable surfaces.',
      render: () => (
  <Card hoverable={true} style={{ width: 220, padding: 20 }}>
    <strong>Hover me</strong>
    <p style={{ margin: '8px 0 0', color: 'var(--n-color-text-secondary)' }}>
      The whole card responds to hover.
    </p>
  </Card>
),
    },
    {
      title: 'Entrance Animation',
      description: 'Card that animates in with a fade effect.',
      render: () => (
  <Card entrance="fade" style={{ width: 220, padding: 20 }}>
    <strong>Fade in</strong>
    <p style={{ margin: '8px 0 0', color: 'var(--n-color-text-secondary)' }}>
      This card animates on mount.
    </p>
  </Card>
),
    },
],

  Badge: [
    {
      title: 'Basic',
      description: 'Badge with count or dot.',
      render: () => (
        <Stack direction="row" gap={24} align="center">
          <Badge count={5}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                background: 'rgba(128,128,128,0.3)',
              }}
            />
          </Badge>
          <Badge dot={true}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                background: 'rgba(128,128,128,0.3)',
              }}
            />
          </Badge>
        </Stack>
      ),
    },
    {
      title: 'Colors',
      description: 'Different status colors.',
      render: () => (
        <Stack direction="row" gap={12} align="center" wrap={true}>
          <Badge count={1} variant="primary" />
          <Badge count={2} variant="success" />
          <Badge count={3} variant="warning" />
          <Badge count={4} variant="error" />
        </Stack>
      ),
    },
    {
      title: 'Overflow',
      description: 'Badge count with overflow limit.',
      render: () => (
        <Stack direction="row" gap={16} align="center">
          <Badge count={120} overflowCount={99} />
          <Badge count={0} showZero={true} />
        </Stack>
      ),
    },
      {
      title: 'Sizes',
      description: 'Badge in small and medium sizes.',
      render: () => (
  <Stack direction="row" gap={24} align="center">
    <Badge count={3} size="small">
      <Icon name="mail" size={24} />
    </Badge>
    <Badge count={3} size="medium">
      <Icon name="mail" size={24} />
    </Badge>
  </Stack>
),
    },
    {
      title: 'Secondary Variant',
      description: 'Badge rendered with secondary and status variants.',
      render: () => (
  <Stack direction="row" gap={12} align="center" wrap={true}>
    <Badge count={1} variant="secondary" />
    <Badge count={2} variant="success" />
    <Badge count={3} variant="warning" />
    <Badge count={4} variant="error" />
  </Stack>
),
    },
    {
      title: 'Status Dots',
      description: 'Dot badges used as status indicators.',
      render: () => (
  <Stack direction="row" gap={24} align="center" wrap={true}>
    <Badge dot={true} variant="success">
      <Icon name="user" size={24} />
    </Badge>
    <Badge dot={true} variant="warning">
      <Icon name="bell" size={24} />
    </Badge>
    <Badge dot={true} variant="error">
      <Icon name="heart" size={24} />
    </Badge>
  </Stack>
),
    },
    {
      title: 'Standalone',
      description: 'Badge used without a child element.',
      render: () => (
  <Stack direction="row" gap={12} align="center" wrap={true}>
    <Badge count={8} />
    <Badge count={0} showZero={true} />
    <Badge dot={true} />
  </Stack>
),
    },
    {
      title: 'Custom Overflow',
      description: 'Badge with a custom overflow limit.',
      render: () => (
  <Stack direction="row" gap={12} align="center" wrap={true}>
    <Badge count={50} overflowCount={9} />
    <Badge count={1000} overflowCount={999} />
  </Stack>
),
    },
],

  Alert: [
    {
      title: 'Types',
      description: 'Info, success, warning, and error alerts.',
      render: () => (
        <Stack direction="column" gap={12}>
          <Alert type="info" message="This is an informational alert." />
          <Alert type="success" message="Operation completed successfully." />
          <Alert type="warning" message="Please review your settings." />
          <Alert type="error" message="Something went wrong." />
        </Stack>
      ),
    },
    {
      title: 'With Description',
      description: 'Alert with additional description text.',
      render: () => (
        <Alert
          type="info"
          message="Update available"
          description="A new version of the library has been released with bug fixes."
        />
      ),
    },
    {
      title: 'Closable',
      description: 'Alert that can be dismissed by the user.',
      render: () => (
        <Alert
          type="warning"
          message="Unsaved changes"
          description="Your changes will be lost if you leave this page."
          closable={true}
          showIcon={true}
        />
      ),
    },
      {
      title: 'Custom Icon',
      description: 'Alert with a manually provided icon.',
      render: () => (
  <Alert
    type="info"
    message="Custom icon"
    description="You can override the default alert icon."
    showIcon={true}
    icon={<Icon name="star" size={20} />}
  />
),
    },
    {
      title: 'Without Icon',
      description: 'Compact alert with the icon hidden.',
      render: () => (
  <Alert
    type="success"
    message="No icon"
    description="This alert keeps the layout minimal."
    showIcon={false}
  />
),
    },
    {
      title: 'Inline Types',
      description: 'Multiple alert types in a compact row.',
      render: () => (
  <Stack direction="column" gap={8}>
    <Alert type="info" message="Info note" showIcon={true} />
    <Alert type="success" message="Saved" showIcon={true} />
    <Alert type="error" message="Failed" showIcon={true} />
  </Stack>
),
    },
    {
      title: 'Close Callback',
      description: 'Alert that logs when it is dismissed.',
      render: () => (
  <Alert
    type="warning"
    message="Dismissible"
    description="Click the close icon to trigger the onClose callback."
    closable={true}
    onClose={() => console.log('Alert closed')}
  />
),
    },
    {
      title: 'Error Banner',
      description: 'A prominent error alert with description.',
      render: () => (
  <Alert
    type="error"
    message="Connection lost"
    description="Please check your network and try again."
    showIcon={true}
  />
),
    },
],

  Tag: [
    {
      title: 'Basic',
      description: 'Simple tags with different colors.',
      render: () => (
        <Stack direction="row" gap={8} wrap={true}>
          <Tag color="blue">Blue</Tag>
          <Tag color="green">Green</Tag>
          <Tag color="red">Red</Tag>
          <Tag color="orange">Orange</Tag>
          <Tag color="purple">Purple</Tag>
        </Stack>
      ),
    },
    {
      title: 'Closable',
      description: 'Tags that can be dismissed.',
      render: () => (
        <Stack direction="row" gap={8} wrap={true}>
          <Tag onClose={() => {}}>Removable</Tag>
          <Tag onClose={() => {}}>Tag B</Tag>
        </Stack>
      ),
    },
    {
      title: 'Variants',
      description: 'Tags with different style variants and icons.',
      render: () => (
        <Stack direction="row" gap={8} wrap={true}>
          <Tag variant="primary" leftIcon={<Icon name="check" size={14} />}>
            Primary
          </Tag>
          <Tag variant="outline" leftIcon={<Icon name="star" size={14} />}>
            Outline
          </Tag>
          <Tag size="small">Small</Tag>
        </Stack>
      ),
    },
      {
      title: 'Sizes',
      description: 'Tags in small and medium sizes.',
      render: () => (
  <Stack direction="row" gap={8} align="center" wrap={true}>
    <Tag size="small">Small</Tag>
    <Tag size="medium">Medium</Tag>
  </Stack>
),
    },
    {
      title: 'Outline Variant',
      description: 'Outline tags for subtle categorization.',
      render: () => (
  <Stack direction="row" gap={8} wrap={true}>
    <Tag variant="outline">Design</Tag>
    <Tag variant="outline">Engineering</Tag>
    <Tag variant="outline">Product</Tag>
  </Stack>
),
    },
    {
      title: 'Custom Colors',
      description: 'Tags with custom CSS colors.',
      render: () => (
  <Stack direction="row" gap={8} wrap={true}>
    <Tag color="#6d5dfc">Purple</Tag>
    <Tag color="#f43f5e">Pink</Tag>
    <Tag color="#10b981">Teal</Tag>
  </Stack>
),
    },
    {
      title: 'With Icons',
      description: 'Tags with leading icons.',
      render: () => (
  <Stack direction="row" gap={8} wrap={true}>
    <Tag leftIcon={<Icon name="check" size={14} />}>Verified</Tag>
    <Tag leftIcon={<Icon name="lock" size={14} />}>Secure</Tag>
    <Tag leftIcon={<Icon name="star" size={14} />}>Featured</Tag>
  </Stack>
),
    },
    {
      title: 'Removable Group',
      description: 'A row of tags that can be dismissed.',
      render: () => (
  <Stack direction="row" gap={8} wrap={true}>
    <Tag onClose={() => {}}>React</Tag>
    <Tag onClose={() => {}}>TypeScript</Tag>
    <Tag onClose={() => {}}>Storybook</Tag>
  </Stack>
),
    },
],

  Switch: [
    {
      title: 'Basic',
      description: 'Checked and unchecked states.',
      render: () => (
        <Stack direction="row" gap={24} align="center">
          <Switch checked={false} />
          <Switch checked={true} />
        </Stack>
      ),
    },
    {
      title: 'Sizes',
      description: 'Small and default size switches.',
      render: () => (
        <Stack direction="row" gap={24} align="center">
          <Switch size="small" />
          <Switch size="medium" />
        </Stack>
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive switch with React state.',
      render: () => <ControlledSwitchExample />,
    },
      {
      title: 'Label Position',
      description: 'Switch labels placed on the left or right.',
      render: () => (
  <Stack direction="column" gap={16}>
    <Switch checked={true} onChange={() => {}} label="Label right" labelPosition="right" />
    <Switch checked={false} onChange={() => {}} label="Label left" labelPosition="left" />
  </Stack>
),
    },
    {
      title: 'With Icons',
      description: 'Switch with custom on and off knob icons.',
      render: () => (
  <Stack direction="row" gap={24} align="center">
    <Switch
      checked={true}
      onChange={() => {}}
      onIcon={<Icon name="check" size={12} />}
      offIcon={<Icon name="x" size={12} />}
    />
    <Switch
      checked={false}
      onChange={() => {}}
      onIcon={<Icon name="check" size={12} />}
      offIcon={<Icon name="x" size={12} />}
    />
  </Stack>
),
    },
    {
      title: 'Disabled States',
      description: 'Disabled switches in checked and unchecked states.',
      render: () => (
  <Stack direction="row" gap={24} align="center">
    <Switch checked={true} onChange={() => {}} disabled={true} />
    <Switch checked={false} onChange={() => {}} disabled={true} />
  </Stack>
),
    },
    {
      title: 'Loading',
      description: 'Switch showing a loading spinner and non-interactive state.',
      render: () => (
        <Switch
          checked={true}
          onChange={() => {}}
          loading={true}
          label="Syncing"
        />
      ),
    },
    {
      title: 'Sizes with Labels',
      description: 'Switch sizes paired with descriptive labels for settings.',
      render: () => (
        <Stack direction="column" gap={16}>
          <Switch size="small" checked={true} onChange={() => {}} label="Compact mode" />
          <Switch size="medium" checked={true} onChange={() => {}} label="Standard mode" />
          <Switch size="large" checked={true} onChange={() => {}} label="Large mode" />
        </Stack>
      ),
    },
  ],

  Checkbox: [
    {
      title: 'Basic',
      description: 'Checked, unchecked, and indeterminate.',
      render: () => (
        <Stack direction="column" gap={12}>
          <Checkbox checked={false} label="Unchecked" />
          <Checkbox checked={true} label="Checked" />
          <Checkbox indeterminate={true} label="Indeterminate" />
        </Stack>
      ),
    },
    {
      title: 'Disabled',
      description: 'Disabled states.',
      render: () => (
        <Stack direction="column" gap={12}>
          <Checkbox disabled={true} label="Disabled unchecked" />
          <Checkbox checked={true} disabled={true} label="Disabled checked" />
        </Stack>
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive checkbox with React state.',
      render: () => <ControlledCheckboxExample />,
    },
      {
      title: 'Indeterminate',
      description: 'Checkbox in an indeterminate state for partial selection.',
      render: () => (
  <Stack direction="column" gap={12}>
    <Checkbox indeterminate={true} label="Select all" />
    <Checkbox checked={true} label="Item selected" />
  </Stack>
),
    },
    {
      title: 'Form Values',
      description: 'Checkboxes with name and value for form submissions.',
      render: () => (
  <Stack direction="column" gap={12}>
    <Checkbox name="features" value="darkMode" label="Dark mode" />
    <Checkbox name="features" value="notifications" label="Notifications" />
  </Stack>
),
    },
    {
      title: 'Without Label',
      description: 'Standalone checkbox with no text label.',
      render: () => (
  <Stack direction="row" gap={24} align="center">
    <Checkbox checked={false} />
    <Checkbox checked={true} />
    <Checkbox indeterminate={true} />
  </Stack>
),
    },
    {
      title: 'Checked Group',
      description: 'A group of checked and unchecked options.',
      render: () => (
        <Stack direction="column" gap={12}>
          <Checkbox checked={true} label="In stock" />
          <Checkbox checked={false} label="On sale" />
          <Checkbox checked={false} label="Backorder" />
        </Stack>
      ),
    },
    {
      title: 'Card Selection',
      description: 'Checkboxes inside selectable cards for feature toggles.',
      render: () => (
        <Stack direction="row" gap={16} wrap={true}>
          <Card variant="outset" style={{ width: 180, padding: 20 }}>
            <Stack direction="column" gap={12}>
              <strong>Analytics</strong>
              <Checkbox checked={true} label="Enable tracking" />
            </Stack>
          </Card>
          <Card variant="outset" style={{ width: 180, padding: 20 }}>
            <Stack direction="column" gap={12}>
              <strong>Notifications</strong>
              <Checkbox checked={false} label="Email alerts" />
            </Stack>
          </Card>
        </Stack>
      ),
    },
  ],

  RadioGroup: [
    {
      title: 'Basic',
      description: 'Single-choice group with options.',
      render: () => (
        <RadioGroup
          options={[
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ]}
          value="a"
        />
      ),
    },
    {
      title: 'Horizontal',
      description: 'Radio group with horizontal layout.',
      render: () => (
        <RadioGroup
          options={[
            { value: 'day', label: 'Day' },
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
          ]}
          value="day"
          orientation="horizontal"
        />
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive radio group with React state.',
      render: () => <ControlledRadioGroupExample />,
    },
      {
      title: 'Disabled Option',
      description: 'Radio group with one option disabled.',
      render: () => (
      <RadioGroup
        options={[
          { value: 'free', label: 'Free' },
          { value: 'pro', label: 'Pro', disabled: true },
          { value: 'enterprise', label: 'Enterprise' }
        ]}
        value="free"
      />
    ),
    },
    {
      title: 'Preselected Value',
      description: 'Radio group with a default selection set via the value prop.',
      render: () => (
      <RadioGroup
        options={[
          { value: 'email', label: 'Email' },
          { value: 'sms', label: 'SMS' },
          { value: 'push', label: 'Push' }
        ]}
        value="sms"
      />
    ),
    },
    {
      title: 'Named Group',
      description: 'Radio group with a shared form name for accessible grouping.',
      render: () => (
      <RadioGroup
        name="notification-channel"
        options={[
          { value: 'email', label: 'Email' },
          { value: 'sms', label: 'SMS' },
          { value: 'push', label: 'Push' }
        ]}
        value="email"
      />
    ),
    },
    {
      title: 'Horizontal States',
      description: 'Horizontal layout mixing enabled and disabled options.',
      render: () => (
      <RadioGroup
        orientation="horizontal"
        options={[
          { value: 'active', label: 'Active' },
          { value: 'paused', label: 'Paused' },
          { value: 'archived', label: 'Archived', disabled: true }
        ]}
        value="active"
      />
    ),
    },
    {
      title: 'Vertical in Card',
      description: 'Vertical radio group wrapped in a card for layout context.',
      render: () => (
      <Card variant="outset" style={{ padding: 20, maxWidth: 320 }}>
        <RadioGroup
          options={[
            { value: 'monthly', label: 'Monthly' },
            { value: 'yearly', label: 'Yearly' },
            { value: 'lifetime', label: 'Lifetime' }
          ]}
          value="yearly"
        />
      </Card>
    ),
    },
],

  Select: [
    {
      title: 'Basic',
      description: 'Dropdown selection with options.',
      render: () => (
        <Select
          options={[
            { value: '1', label: 'Option One' },
            { value: '2', label: 'Option Two' },
            { value: '3', label: 'Option Three' },
          ]}
          placeholder="Select an option"
        />
      ),
    },
    {
      title: 'Sizes',
      description: 'Different select sizes.',
      render: () => (
        <Stack direction="column" gap={12}>
          <Select size="small" options={[{ value: '1', label: 'Small' }]} />
          <Select size="medium" options={[{ value: '1', label: 'Medium' }]} />
          <Select size="large" options={[{ value: '1', label: 'Large' }]} />
        </Stack>
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive select with React state.',
      render: () => <ControlledSelectExample />,
    },
      {
      title: 'Grouped Options',
      description: 'Select with categorized option groups.',
      render: () => (
      <Select
        options={[
          {
            label: 'Frontend',
            options: [
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue' }
            ]
          },
          {
            label: 'Backend',
            options: [
              { value: 'node', label: 'Node.js' },
              { value: 'go', label: 'Go' }
            ]
          }
        ]}
        placeholder="Pick a stack"
        style={{ width: 240 }}
      />
    ),
    },
    {
      title: 'Clearable Selection',
      description: 'Select with a default value and a clear button.',
      render: () => (
      <Select
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Published' }
        ]}
        defaultValue="published"
        allowClear
        style={{ width: 220 }}
      />
    ),
    },
    {
      title: 'Searchable',
      description: 'Select with a search input to filter long option lists.',
      render: () => (
      <Select
        options={[
          { value: 'apple', label: 'Apple' },
          { value: 'banana', label: 'Banana' },
          { value: 'cherry', label: 'Cherry' },
          { value: 'date', label: 'Date' }
        ]}
        placeholder="Search fruit"
        searchable
        style={{ width: 240 }}
      />
    ),
    },
    {
      title: 'Loading',
      description: 'Select in a loading state with a spinner.',
      render: () => (
      <Select
        options={[
          { value: '1', label: 'Option One' },
          { value: '2', label: 'Option Two' }
        ]}
        placeholder="Loading options…"
        loading
        style={{ width: 220 }}
      />
    ),
    },
    {
      title: 'Error State',
      description: 'Select showing an error validation state.',
      render: () => (
      <Select
        options={[
          { value: 'valid', label: 'Valid choice' },
          { value: 'invalid', label: 'Invalid choice', disabled: true }
        ]}
        placeholder="Required field"
        error
        style={{ width: 240 }}
      />
    ),
    },
],

  ThinkingBlock: [
    {
      title: 'Basic',
      description: 'Collapsible AI reasoning block.',
      render: () => (
        <ThinkingBlock
          steps={[
            { id: '1', text: 'Received user question' },
            { id: '2', text: 'Retrieved relevant documentation' },
            { id: '3', text: 'Formulated response' },
          ]}
          isThinking={false}
        />
      ),
    },
    {
      title: 'Thinking',
      description: 'Thinking state with animated indicator.',
      render: () => (
        <ThinkingBlock
          steps={[
            { id: '1', text: 'Planning approach' },
            { id: '2', text: 'Executing steps' },
          ]}
          isThinking={true}
          title="AI is thinking"
        />
      ),
    },
    {
      title: 'With Timestamps',
      description: 'Reasoning steps showing timestamps.',
      render: () => (
        <ThinkingBlock
          steps={[
            { id: '1', text: 'Received user question', timestamp: Date.now() - 3000 },
            { id: '2', text: 'Retrieved relevant documentation', timestamp: Date.now() - 2000 },
            { id: '3', text: 'Formulated response', timestamp: Date.now() - 1000 },
          ]}
          showTimestamps={true}
        />
      ),
    },
      {
      title: 'Collapsed by Default',
      description: 'Thinking block that starts in a collapsed state.',
      render: () => (
      <ThinkingBlock
        defaultExpanded={false}
        title="Reasoning"
        steps={[
          { id: '1', text: 'Analyzing request' },
          { id: '2', text: 'Retrieving data' }
        ]}
      />
    ),
    },
    {
      title: 'Custom Title',
      description: 'Thinking block with a custom header title.',
      render: () => (
      <ThinkingBlock
        title="How the AI decided"
        steps={[
          { id: '1', text: 'Parsed user intent' },
          { id: '2', text: 'Ranked candidate answers' },
          { id: '3', text: 'Selected best response' }
        ]}
      />
    ),
    },
    {
      title: 'Empty Thinking',
      description: 'Thinking block shown while no steps have completed yet.',
      render: () => (
      <ThinkingBlock
        isThinking={true}
        title="Processing request"
        steps={[]}
      />
    ),
    },
    {
      title: 'Long Reasoning Chain',
      description: 'Thinking block displaying many sequential reasoning steps.',
      render: () => (
      <ThinkingBlock
        title="Step-by-step reasoning"
        steps={[
          { id: '1', text: 'Understand the question' },
          { id: '2', text: 'Break down into sub-tasks' },
          { id: '3', text: 'Search knowledge base' },
          { id: '4', text: 'Evaluate candidate answers' },
          { id: '5', text: 'Format final response' }
        ]}
      />
    ),
    },
    {
      title: 'Timestamped Steps',
      description: 'Reasoning steps with recorded timestamps.',
      render: () => (
      <ThinkingBlock
        title="Agent trace"
        showTimestamps={true}
        steps={[
          { id: '1', text: 'Received prompt', timestamp: Date.now() - 5000 },
          { id: '2', text: 'Called search tool', timestamp: Date.now() - 3000 },
          { id: '3', text: 'Synthesized answer', timestamp: Date.now() - 1000 }
        ]}
      />
    ),
    },
],

  Tabs: [
    {
      title: 'Basic',
      description: 'Standard tab navigation.',
      render: () => (
        <Tabs
          items={[
            { key: '1', label: 'Design', children: <p>Design content</p> },
            { key: '2', label: 'Code', children: <p>Code content</p> },
            { key: '3', label: 'Preview', children: <p>Preview content</p> },
          ]}
        />
      ),
    },
    {
      title: 'Card Type',
      description: 'Tabs with card-style container.',
      render: () => (
        <Tabs
          type="card"
          items={[
            { key: '1', label: 'Tab A', children: <p>Content A</p> },
            { key: '2', label: 'Tab B', children: <p>Content B</p> },
          ]}
        />
      ),
    },
    {
      title: 'Controlled',
      description: 'Tabs controlled by React state with change handler.',
      render: () => <ControlledTabsExample />,
    },
      {
      title: 'Left Position',
      description: 'Tabs with the tab bar positioned on the left.',
      render: () => (
      <Tabs
        tabPosition="left"
        items={[
          { key: '1', label: 'General', children: <p>General settings</p> },
          { key: '2', label: 'Security', children: <p>Security settings</p> },
          { key: '3', label: 'Billing', children: <p>Billing settings</p> }
        ]}
      />
    ),
    },
    {
      title: 'Badges and Icons',
      description: 'Tabs with badge counts and leading icons.',
      render: () => (
      <Tabs
        items={[
          { key: '1', label: 'Inbox', icon: <Icon name="mail" size={14} />, badge: 3, children: <p>Inbox content</p> },
          { key: '2', label: 'Sent', icon: <Icon name="send" size={14} />, children: <p>Sent content</p> },
          { key: '3', label: 'Archive', icon: <Icon name="archive" size={14} />, badge: { dot: true }, children: <p>Archive content</p> }
        ]}
      />
    ),
    },
    {
      title: 'Disabled Tab',
      description: 'Tab set with one disabled panel.',
      render: () => (
      <Tabs
        items={[
          { key: '1', label: 'Preview', children: <p>Preview content</p> },
          { key: '2', label: 'Settings', disabled: true, children: <p>Settings content</p> },
          { key: '3', label: 'Share', children: <p>Share content</p> }
        ]}
      />
    ),
    },
    {
      title: 'Extra Toolbar Content',
      description: 'Tabs with an action button in the tab bar.',
      render: () => (
      <Tabs
        tabBarExtraContent={<Button size="small">New</Button>}
        items={[
          { key: '1', label: 'Projects', children: <p>Projects list</p> },
          { key: '2', label: 'Teams', children: <p>Teams list</p> }
        ]}
      />
    ),
    },
    {
      title: 'Small and Centered',
      description: 'Compact centered tabs for narrow layouts.',
      render: () => (
      <Tabs
        size="small"
        centered
        items={[
          { key: '1', label: 'Day', children: <p>Day view</p> },
          { key: '2', label: 'Week', children: <p>Week view</p> },
          { key: '3', label: 'Month', children: <p>Month view</p> }
        ]}
      />
    ),
    },
],

  Table: [
    {
      title: 'Basic',
      description: 'Simple data table with columns.',
      render: () => {
        const cols = [
          { key: 'name', title: 'Name', dataIndex: 'name' as const },
          { key: 'role', title: 'Role', dataIndex: 'role' as const },
          { key: 'status', title: 'Status', dataIndex: 'status' as const },
        ];
        const data = [
          { name: 'Alice', role: 'Engineer', status: 'Active' },
          { name: 'Bob', role: 'Designer', status: 'Away' },
          { name: 'Carol', role: 'Manager', status: 'Active' },
        ];
        return <Table columns={cols} dataSource={data} pagination={false} />;
      },
    },
    {
      title: 'With Selection',
      description: 'Table with row selection checkboxes.',
      render: () => {
        const cols = [
          { key: 'product', title: 'Product', dataIndex: 'product' as const },
          { key: 'price', title: 'Price', dataIndex: 'price' as const },
        ];
        const data = [
          { product: 'Widget A', price: '$19.99' },
          { product: 'Widget B', price: '$29.99' },
        ];
        return <Table columns={cols} dataSource={data} rowSelection={{}} pagination={false} />;
      },
    },
    {
      title: 'Loading',
      description: 'Table showing loading skeleton rows.',
      render: () => {
        const cols = [
          { key: 'name', title: 'Name', dataIndex: 'name' as const },
          { key: 'role', title: 'Role', dataIndex: 'role' as const },
        ];
        return (
          <Table
            columns={cols}
            dataSource={[]}
            loading={true}
            skeletonRows={4}
            pagination={false}
          />
        );
      },
    },
      {
      title: 'Sortable Columns',
      description: 'Table with sortable column headers.',
      render: () => {
      const cols = [
        { key: 'name', title: 'Name', dataIndex: 'name' as const, sorter: (a, b) => a.name.localeCompare(b.name) },
        { key: 'age', title: 'Age', dataIndex: 'age' as const, sorter: (a, b) => a.age - b.age }
      ];
      const data = [
        { name: 'Alice', age: 34 },
        { name: 'Bob', age: 27 },
        { name: 'Carol', age: 42 }
      ];
      return <Table columns={cols} dataSource={data} pagination={false} />;
    },
    },
    {
      title: 'Custom Cell Render',
      description: 'Table with a status column rendered as tags.',
      render: () => {
      const cols = [
        { key: 'task', title: 'Task', dataIndex: 'task' as const },
        {
          key: 'status',
          title: 'Status',
          dataIndex: 'status' as const,
          render: (status) => <Tag color={status === 'done' ? 'green' : 'orange'}>{status}</Tag>
        }
      ];
      const data = [
        { task: 'Design review', status: 'done' },
        { task: 'Write tests', status: 'in progress' }
      ];
      return <Table columns={cols} dataSource={data} pagination={false} />;
    },
    },
    {
      title: 'Sticky Header',
      description: 'Table with a sticky header inside a scrollable container.',
      render: () => {
      const cols = [
        { key: 'id', title: 'ID', dataIndex: 'id' as const },
        { key: 'item', title: 'Item', dataIndex: 'item' as const }
      ];
      const data = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, item: `Item ${i + 1}` }));
      return (
        <div style={{ maxHeight: 200, overflow: 'auto' }}>
          <Table columns={cols} dataSource={data} stickyHeader pagination={false} />
        </div>
      );
    },
    },
    {
      title: 'Pagination',
      description: 'Table with page navigation for many rows.',
      render: () => {
      const cols = [
        { key: 'id', title: 'ID', dataIndex: 'id' as const },
        { key: 'name', title: 'Name', dataIndex: 'name' as const }
      ];
      const data = Array.from({ length: 35 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}` }));
      return <Table columns={cols} dataSource={data} pagination={{ pageSize: 5 }} />;
    },
    },
    {
      title: 'Empty State',
      description: 'Table with a custom empty message.',
      render: () => {
      const cols = [
        { key: 'name', title: 'Name', dataIndex: 'name' as const },
        { key: 'role', title: 'Role', dataIndex: 'role' as const }
      ];
      return (
        <Table
          columns={cols}
          dataSource={[]}
          pagination={false}
          emptyTitle="No team members"
          emptyDescription="Invite teammates to see them here."
        />
      );
    },
    },
],

  Modal: [
    {
      title: 'Basic',
      description: 'Standard modal dialog.',
      render: () => <ModalBasicExample />,
    },
    {
      title: 'Sizes',
      description: 'Modal in different sizes.',
      render: () => <ModalSizesExample />,
    },
    {
      title: 'Footer',
      description: 'Modal with custom footer content.',
      render: () => <ModalWithFooterExample />,
    },
      {
      title: 'Full Screen',
      description: 'Modal that fills the entire viewport.',
      render: () => (
      <Modal isOpen={true} onClose={() => {}} title="Full Screen" fullScreen>
        <p>This modal takes up the whole screen.</p>
      </Modal>
    ),
    },
    {
      title: 'Glass Variant',
      description: 'Modal with a glassmorphism backdrop variant.',
      render: () => (
      <Modal isOpen={true} onClose={() => {}} title="Glass" variant="glass">
        <p>Glass modal content.</p>
      </Modal>
    ),
    },
    {
      title: 'Top Position',
      description: 'Modal aligned to the top of the viewport.',
      render: () => (
      <Modal isOpen={true} onClose={() => {}} title="Top Aligned" position="top">
        <p>This modal is positioned at the top.</p>
      </Modal>
    ),
    },
    {
      title: 'Prevent Backdrop Click',
      description: 'Modal that does not close when clicking the backdrop.',
      render: () => (
      <Modal isOpen={true} onClose={() => {}} title="Confirm" preventBackdropClick>
        <p>Clicking outside will not close this modal.</p>
        <Button size="small" onClick={() => {}} style={{ marginTop: 12 }}>Understood</Button>
      </Modal>
    ),
    },
    {
      title: 'Custom Backdrop',
      description: 'Modal with a custom backdrop color style.',
      render: () => (
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Custom Backdrop"
        backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
      >
        <p>Darker backdrop for focused attention.</p>
      </Modal>
    ),
    },
],

  SkipToContent: [
    {
      title: 'Basic',
      description: 'Accessibility shortcut to main content.',
      render: () => <SkipToContent targetId="main-content" />,
    },
    {
      title: 'Custom Label',
      description: 'Skip link with a custom accessible label.',
      render: () => <SkipToContent targetId="main-content" label="Jump to main content" />,
    },
      {
      title: 'Default Target',
      description: 'Skip link using the default main content target.',
      render: () => <SkipToContent />,
    },
    {
      title: 'Article Target',
      description: 'Skip link targeting a specific article container.',
      render: () => <SkipToContent targetId="article-content" label="Skip to article" />,
    },
    {
      title: 'Compact Label',
      description: 'Skip link with a short accessible label.',
      render: () => <SkipToContent targetId="main" label="Skip" />,
    },
    {
      title: 'In Page Context',
      description: 'Skip link placed inside a page layout container.',
      render: () => (
      <Card variant="outset" style={{ padding: 20 }}>
        <SkipToContent targetId="content" label="Jump to content" />
        <p style={{ marginTop: 12, color: 'var(--n-color-text-secondary)' }}>
          Tab into the card to reveal the skip link.
        </p>
      </Card>
    ),
    },
    {
      title: 'Section Target',
      description: 'Skip link targeting a secondary section id.',
      render: () => <SkipToContent targetId="section-details" label="Skip to section details" />,
    },
],


  Skeleton: [
    {
      title: 'Basic',
      description: 'Loading placeholder shapes.',
      render: () => (
        <Stack direction="column" gap={12}>
          <Skeleton variant="text" width="100%" height={16} active={true} />
          <Skeleton variant="text" width="80%" height={16} active={true} />
          <Skeleton variant="text" width="60%" height={16} active={true} />
        </Stack>
      ),
    },
    {
      title: 'Avatar + Text',
      description: 'Combined skeleton layout.',
      render: () => (
        <Stack direction="row" gap={12} align="center">
          <Skeleton variant="circle" width={40} height={40} active={true} />
          <Stack direction="column" gap={8}>
            <Skeleton variant="text" width={120} height={16} active={true} />
            <Skeleton variant="text" width={80} height={12} active={true} />
          </Stack>
        </Stack>
      ),
    },
    {
      title: 'Wrapped Content',
      description: 'Skeleton wraps real content and fades it out while loading.',
      render: () => (
        <Skeleton loading={true}>
          <Card style={{ width: 220, padding: 16 }}>
            <strong>Card Title</strong>
            <p>This content is hidden while loading.</p>
          </Card>
        </Skeleton>
      ),
    },
      {
      title: 'Card Skeleton',
      description: 'A realistic card placeholder layout with title, body lines, and a media block.',
      render: () => (
  <Card style={{ width: 260, padding: 16 }}>
    <Stack direction="column" gap={12}>
      <Skeleton variant="rect" width="100%" height={120} active={true} />
      <Skeleton variant="text" width="60%" height={18} active={true} />
      <Skeleton variant="text" width="90%" height={14} active={true} />
      <Skeleton variant="text" width="70%" height={14} active={true} />
    </Stack>
  </Card>
),
    },
    {
      title: 'Inactive Placeholder',
      description: 'Skeleton placeholders with the shimmer animation turned off.',
      render: () => (
  <Stack direction="column" gap={12} style={{ width: 240 }}>
    <Skeleton variant="text" width="100%" height={16} active={false} />
    <Skeleton variant="text" width="80%" height={16} active={false} />
    <Skeleton variant="circle" width={40} height={40} active={false} />
  </Stack>
),
    },
    {
      title: 'Media Placeholder',
      description: 'Rectangular skeleton used as an image or video placeholder.',
      render: () => (
  <Stack direction="row" gap={16} align="center">
    <Skeleton variant="rect" width={120} height={80} active={true} />
    <Skeleton variant="rect" width={160} height={90} active={true} />
    <Skeleton variant="rect" width={80} height={80} active={true} />
  </Stack>
),
    },
    {
      title: 'Avatar Placeholder',
      description: 'Circular skeleton placeholders in different sizes for avatar loading states.',
      render: () => (
  <Stack direction="row" gap={16} align="center">
    <Skeleton variant="circle" width={24} height={24} active={true} />
    <Skeleton variant="circle" width={40} height={40} active={true} />
    <Skeleton variant="circle" width={64} height={64} active={true} />
  </Stack>
),
    },
    {
      title: 'Loaded Content',
      description: 'Skeleton wrapper with loading set to false reveals the actual content.',
      render: () => (
  <Skeleton loading={false}>
    <Card style={{ width: 220, padding: 16 }}>
      <strong>Loaded Title</strong>
      <p style={{ margin: '8px 0 0', color: 'var(--n-color-text-secondary)' }}>
        This content is shown once data has finished loading.
      </p>
    </Card>
  </Skeleton>
),
    },
],

  ProgressBar: [
    {
      title: 'Basic',
      description: 'Standard progress indicator.',
      render: () => (
        <Stack direction="column" gap={16} style={{ width: 300 }}>
          <ProgressBar value={30} />
          <ProgressBar value={60} />
          <ProgressBar value={90} />
          <ProgressBar value={100} />
        </Stack>
      ),
    },
    {
      title: 'Statuses',
      description: 'Progress bars with status colors.',
      render: () => (
        <Stack direction="column" gap={16} style={{ width: 300 }}>
          <ProgressBar value={60} status="success" showLabel />
          <ProgressBar value={40} status="warning" />
          <ProgressBar value={80} status="error" />
        </Stack>
      ),
    },
    {
      title: 'Indeterminate',
      description: 'Progress bar showing an indeterminate loading state.',
      render: () => <ProgressBar value={0} indeterminate={true} style={{ width: 300 }} />,
    },
      {
      title: 'Sizes',
      description: 'Progress bars rendered in small, medium, and large sizes.',
      render: () => (
  <Stack direction="column" gap={16} style={{ width: 300 }}>
    <ProgressBar value={40} size="small" />
    <ProgressBar value={60} size="medium" />
    <ProgressBar value={80} size="large" />
  </Stack>
),
    },
    {
      title: 'With Labels',
      description: 'Progress bars showing percentage labels next to the bar.',
      render: () => (
  <Stack direction="column" gap={16} style={{ width: 300 }}>
    <ProgressBar value={25} showLabel />
    <ProgressBar value={50} showLabel />
    <ProgressBar value={75} showLabel />
  </Stack>
),
    },
    {
      title: 'Completion State',
      description: 'A fully complete progress bar highlighted as successful.',
      render: () => (
  <Card style={{ width: 320, padding: 16 }}>
    <p style={{ margin: '0 0 8px' }}>Upload complete</p>
    <ProgressBar value={100} status="success" showLabel />
  </Card>
),
    },
    {
      title: 'Error State',
      description: 'A progress bar colored to indicate a failed or blocked operation.',
      render: () => (
  <Card style={{ width: 320, padding: 16 }}>
    <p style={{ margin: '0 0 8px' }}>Upload failed</p>
    <ProgressBar value={45} status="error" showLabel />
  </Card>
),
    },
    {
      title: 'Inline Progress',
      description: 'A compact progress bar shown alongside descriptive text.',
      render: () => (
  <Stack direction="column" gap={12} style={{ width: 300 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: '0.875rem', width: 80 }}>Processing</span>
      <ProgressBar value={60} size="small" style={{ flex: 1 }} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: '0.875rem', width: 80 }}>Saving</span>
      <ProgressBar value={30} size="small" status="warning" style={{ flex: 1 }} />
    </div>
  </Stack>
),
    },
],

  Avatar: [
    {
      title: 'Initials',
      description: 'Avatar with initials fallback.',
      render: () => (
        <Stack direction="row" gap={12} align="center">
          <Avatar name="Alice Baker" />
          <Avatar name="Bob Chen" />
          <Avatar name="Carol Davis" />
        </Stack>
      ),
    },
    {
      title: 'Sizes',
      description: 'Avatar in different sizes.',
      render: () => (
        <Stack direction="row" gap={12} align="center">
          <Avatar name="User" size="small" />
          <Avatar name="User" size="medium" />
          <Avatar name="User" size="large" />
        </Stack>
      ),
    },
    {
      title: 'Shapes',
      description: 'Avatar in different shapes with image fallback.',
      render: () => (
        <Stack direction="row" gap={12} align="center">
          <Avatar name="User" shape="circle" />
          <Avatar name="User" shape="square" />
        </Stack>
      ),
    },
      {
      title: 'With Icons',
      description: 'Avatars that display an icon instead of initials or an image.',
      render: () => (
  <Stack direction="row" gap={12} align="center">
    <Avatar icon={<Icon name="user" size={20} />} size="small" />
    <Avatar icon={<Icon name="user" size={24} />} size="medium" />
    <Avatar icon={<Icon name="user" size={32} />} size="large" />
  </Stack>
),
    },
    {
      title: 'With Images',
      description: 'Avatars using remote image sources with initials fallback.',
      render: () => (
  <Stack direction="row" gap={12} align="center">
    <Avatar src="https://i.pravatar.cc/150?img=1" alt="User one" size="medium" />
    <Avatar src="https://i.pravatar.cc/150?img=5" alt="User two" size="medium" />
    <Avatar src="https://i.pravatar.cc/150?img=8" alt="User three" size="medium" />
  </Stack>
),
    },
    {
      title: 'Grouped Stacked',
      description: 'Multiple avatars stacked together to show a team or group.',
      render: () => (
  <Stack direction="row" gap={24} align="center">
    <AvatarGroup
      size="small"
      max={3}
      avatars={[
        { name: 'Alice', src: 'https://i.pravatar.cc/150?img=1' },
        { name: 'Bob', src: 'https://i.pravatar.cc/150?img=2' },
        { name: 'Carol', src: 'https://i.pravatar.cc/150?img=3' },
        { name: 'Dave', src: 'https://i.pravatar.cc/150?img=4' },
      ]}
    />
    <AvatarGroup
      size="medium"
      max={2}
      avatars={[
        { name: 'Eve', initials: 'E' },
        { name: 'Frank', initials: 'F' },
        { name: 'Grace', initials: 'G' },
      ]}
    />
  </Stack>
),
    },
    {
      title: 'Initials and Shapes',
      description: 'Avatars combining initials with different sizes and shapes.',
      render: () => (
  <Stack direction="row" gap={16} align="center">
    <Avatar initials="AB" shape="circle" size="small" />
    <Avatar initials="CD" shape="square" size="medium" />
    <Avatar initials="EF" shape="circle" size="large" />
  </Stack>
),
    },
    {
      title: 'In a Card Header',
      description: 'Avatars placed inside a card header alongside text content.',
      render: () => (
  <Card style={{ width: 280, padding: 16 }}>
    <Stack direction="row" gap={12} align="center">
      <Avatar initials="JD" size="large" />
      <Stack direction="column" gap={4}>
        <strong>Jane Doe</strong>
        <span style={{ fontSize: '0.875rem', color: 'var(--n-color-text-secondary)' }}>Product Designer</span>
      </Stack>
    </Stack>
  </Card>
),
    },
],

  Breadcrumbs: [
    {
      title: 'Basic',
      description: 'Standard path navigation.',
      render: () => (
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Components', href: '/components' },
            { label: 'Button' },
          ]}
        />
      ),
    },
    {
      title: 'Custom Separator',
      description: 'Breadcrumbs with a custom separator.',
      render: () => (
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Library', href: '/library' },
            { label: 'Book' },
          ]}
          separator=">"
        />
      ),
    },
    {
      title: 'With Home Icon',
      description: 'Breadcrumbs with a custom home icon and accessible label.',
      render: () => (
        <Breadcrumbs
          ariaLabel="Breadcrumb navigation"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Components', href: '/components' },
            { label: 'Button' },
          ]}
          homeIcon={<Icon name="home" size={14} />}
        />
      ),
    },
      {
      title: 'Long Path',
      description: 'Breadcrumbs navigating through a deep page hierarchy.',
      render: () => (
  <Breadcrumbs
    items={[
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops', href: '/products/electronics/laptops' },
      { label: 'ProBook 15' },
    ]}
  />
),
    },
    {
      title: 'Icon Separator',
      description: 'Breadcrumbs using a custom icon as the path separator.',
      render: () => (
  <Breadcrumbs
    separator={<Icon name="chevron-right" size={12} />}
    items={[
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data', href: '/library/data' },
      { label: 'Current' },
    ]}
  />
),
    },
    {
      title: 'Without Home Icon',
      description: 'Breadcrumbs rendered without the default home icon.',
      render: () => (
  <Breadcrumbs
    homeIcon={null}
    items={[
      { label: 'App', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile' },
    ]}
  />
),
    },
    {
      title: 'Accessible Label',
      description: 'Breadcrumbs with a custom accessible label for screen readers.',
      render: () => (
  <Breadcrumbs
    ariaLabel="Project navigation"
    items={[
      { label: 'Projects', href: '/projects' },
      { label: 'Acme Corp', href: '/projects/acme' },
      { label: 'Settings' },
    ]}
  />
),
    },
    {
      title: 'In a Page Header',
      description: 'Breadcrumbs placed inside a card to mimic a page header.',
      render: () => (
  <Card style={{ width: '100%', padding: 16 }}>
    <Breadcrumbs
      items={[
        { label: 'Dashboard', href: '/' },
        { label: 'Reports', href: '/reports' },
        { label: 'Monthly Sales' },
      ]}
    />
    <h3 style={{ margin: '12px 0 0' }}>Monthly Sales Report</h3>
  </Card>
),
    },
],

  Divider: [
    {
      title: 'Basic',
      description: 'Horizontal separator.',
      render: () => (
        <Stack direction="column" gap={12} style={{ width: 300 }}>
          <p>Above</p>
          <Divider />
          <p>Below</p>
        </Stack>
      ),
    },
    {
      title: 'With Text',
      description: 'Divider with center label.',
      render: () => <Divider>OR</Divider>,
    },
    {
      title: 'Vertical',
      description: 'Vertical divider separating inline content.',
      render: () => (
        <Stack direction="row" gap={12} align="center">
          <span>Left</span>
          <Divider type="vertical" />
          <span>Right</span>
        </Stack>
      ),
    },
      {
      title: 'Dashed Divider',
      description: 'A horizontal divider with a dashed line style.',
      render: () => (
  <Stack direction="column" gap={12} style={{ width: 300 }}>
    <span>Section A</span>
    <Divider type="dashed" />
    <span>Section B</span>
  </Stack>
),
    },
    {
      title: 'Divider Between Items',
      description: 'Dividers used to separate rows in a vertical list.',
      render: () => (
  <Stack direction="column" style={{ width: 240 }}>
    <span style={{ padding: '8px 0' }}>First item</span>
    <Divider />
    <span style={{ padding: '8px 0' }}>Second item</span>
    <Divider />
    <span style={{ padding: '8px 0' }}>Third item</span>
  </Stack>
),
    },
    {
      title: 'Vertical Separator',
      description: 'A vertical divider separating inline content with explicit orientation.',
      render: () => (
  <Stack direction="row" gap={12} align="center">
    <Button size="small">Edit</Button>
    <Divider orientation="vertical" />
    <Button size="small" variant="secondary">Delete</Button>
  </Stack>
),
    },
    {
      title: 'Divider with Role',
      description: 'A divider explicitly exposed as a presentation role.',
      render: () => (
  <Stack direction="column" gap={12} style={{ width: 300 }}>
    <p>Above the line</p>
    <Divider role="presentation" />
    <p>Below the line</p>
  </Stack>
),
    },
    {
      title: 'Thick Divider',
      description: 'A thicker horizontal divider using inline styles for emphasis.',
      render: () => (
  <Stack direction="column" gap={12} style={{ width: 300 }}>
    <span>Top content</span>
    <Divider style={{ borderTopWidth: 2 }} />
    <span>Bottom content</span>
  </Stack>
),
    },
],

  Tooltip: [
    {
      title: 'Positions',
      description: 'Tooltip shown in different positions.',
      render: () => (
      <Stack direction="row" gap={24} align="center">
        <Tooltip content="Top" position="top"><Button size="small">Top</Button></Tooltip>
        <Tooltip content="Bottom" position="bottom"><Button size="small">Bottom</Button></Tooltip>
        <Tooltip content="Left" position="left"><Button size="small">Left</Button></Tooltip>
        <Tooltip content="Right" position="right"><Button size="small">Right</Button></Tooltip>
      </Stack>
    ),
    },
    {
      title: 'Triggers',
      description: 'Click and focus triggered tooltips.',
      render: () => (
      <Stack direction="row" gap={24} align="center">
        <Tooltip content="Click tooltip" trigger="click"><Button size="small">Click</Button></Tooltip>
        <Tooltip content="Focus tooltip" trigger="focus"><Button size="small">Focus</Button></Tooltip>
      </Stack>
    ),
    },
      {
      title: 'Hover Delays',
      description: 'Tooltip with custom enter and leave hover delays.',
      render: () => (
  <Tooltip content="Appears after 500ms" mouseEnterDelay={500} mouseLeaveDelay={500}>
    <Button size="small">Delayed tooltip</Button>
  </Tooltip>
),
    },
    {
      title: 'Always Visible',
      description: 'Tooltip controlled to stay open for demonstration.',
      render: () => (
  <Tooltip content="I stay visible" isOpen={true}>
    <Button size="small">Pinned tooltip</Button>
  </Tooltip>
),
    },
    {
      title: 'Rich Content',
      description: 'Tooltip containing formatted content instead of plain text.',
      render: () => (
  <Tooltip
    content={
      <Stack direction="column" gap={4}>
        <strong>Tip</strong>
        <span>Use concise labels for clarity.</span>
      </Stack>
    }
  >
    <Button size="small">Rich tooltip</Button>
  </Tooltip>
),
    },
    {
      title: 'No Arrow',
      description: 'Tooltip with the pointer arrow hidden.',
      render: () => (
  <Stack direction="row" gap={24} align="center">
    <Tooltip content="No arrow here" withArrow={false}>
      <Button size="small">No arrow</Button>
    </Tooltip>
    <Tooltip content="Default arrow" withArrow={true}>
      <Button size="small">With arrow</Button>
    </Tooltip>
  </Stack>
),
    },
    {
      title: 'With Input',
      description: 'Tooltip attached to a form input to explain validation rules.',
      render: () => (
  <Tooltip content="Password must be at least 8 characters." position="right">
    <Input placeholder="Password" type="password" style={{ width: 200 }} />
  </Tooltip>
),
    },
],

  Popover: [
    {
      title: 'Basic',
      description: 'Click to open popover panel.',
      render: () => (
        <Popover
          trigger={<Button size="small">Click me</Button>}
          content={
            <div style={{ padding: 8 }}>
              <p>Popover content</p>
            </div>
          }
        />
      ),
    },
    {
      title: 'Hover Top',
      description: 'Popover that opens on hover and is placed at the top.',
      render: () => (
        <Popover
          trigger={<Button size="small">Hover me</Button>}
          content={
            <div style={{ padding: 8 }}>
              <p>Hover popover</p>
            </div>
          }
          triggerMode="hover"
          placement="top"
        />
      ),
    },
    {
      title: 'Controlled',
      description: 'Popover controlled by React state.',
      render: () => <ControlledPopoverExample />,
    },
      {
      title: 'Placements',
      description: 'Popovers opened in different positions relative to the trigger.',
      render: () => (
  <Stack direction="row" gap={16} align="center">
    <Popover
      trigger={<Button size="small">Bottom</Button>}
      placement="bottom"
      content={<div style={{ padding: 8 }}>Bottom content</div>}
    />
    <Popover
      trigger={<Button size="small">Left</Button>}
      placement="left"
      content={<div style={{ padding: 8 }}>Left content</div>}
    />
    <Popover
      trigger={<Button size="small">Right</Button>}
      placement="right"
      content={<div style={{ padding: 8 }}>Right content</div>}
    />
  </Stack>
),
    },
    {
      title: 'Without Arrow',
      description: 'Popover with the pointer arrow disabled.',
      render: () => (
  <Popover
    withArrow={false}
    trigger={<Button size="small">No arrow</Button>}
    content={<div style={{ padding: 8 }}>Popover without an arrow.</div>}
  />
),
    },
    {
      title: 'Default Open',
      description: 'Popover that starts in an open state when rendered.',
      render: () => (
  <Popover
    defaultOpen={true}
    trigger={<Button size="small">Trigger</Button>}
    content={<div style={{ padding: 8 }}>This popover starts open.</div>}
  />
),
    },
    {
      title: 'Hover with Delay',
      description: 'Popover that opens on hover after a short delay.',
      render: () => (
  <Popover
    triggerMode="hover"
    hoverDelay={300}
    trigger={<Button size="small">Hover me</Button>}
    content={<div style={{ padding: 8 }}>Appears after 300ms hover.</div>}
  />
),
    },
    {
      title: 'Rich Content',
      description: 'Popover containing structured content with action buttons.',
      render: () => (
  <Popover
    trigger={<Button size="small">User profile</Button>}
    content={
      <Stack direction="column" gap={12} style={{ padding: 8, width: 200 }}>
        <Stack direction="row" gap={12} align="center">
          <Avatar initials="AB" size="small" />
          <Stack direction="column" gap={2}>
            <strong style={{ fontSize: '0.875rem' }}>Alex Brown</strong>
            <span style={{ fontSize: '0.75rem', color: 'var(--n-color-text-secondary)' }}>Developer</span>
          </Stack>
        </Stack>
        <Button size="small" fullWidth>View profile</Button>
      </Stack>
    }
  />
),
    },
],

  Steps: [
    {
      title: 'Basic',
      description: 'Step-by-step wizard indicator.',
      render: () => (
        <Steps
          current={1}
          items={[
            { title: 'Cart', description: 'Review items' },
            { title: 'Shipping', description: 'Enter address' },
            { title: 'Payment', description: 'Confirm order' },
          ]}
        />
      ),
    },
    {
      title: 'Vertical',
      description: 'Vertical step indicator layout.',
      render: () => (
        <Steps
          direction="vertical"
          current={1}
          items={[
            { title: 'Cart', description: 'Review items' },
            { title: 'Shipping', description: 'Enter address' },
            { title: 'Payment', description: 'Confirm order' },
          ]}
        />
      ),
    },
    {
      title: 'Interactive',
      description: 'Step indicator controlled by Next/Previous buttons.',
      render: () => <ControlledStepsExample />,
    },
      {
      title: 'Sizes',
      description: 'Step indicators rendered in small, default, and large sizes.',
      render: () => (
  <Stack direction="column" gap={24}>
    <Steps
      size="small"
      current={1}
      items={[
        { title: 'Cart', description: 'Review' },
        { title: 'Address', description: 'Shipping' },
        { title: 'Pay', description: 'Payment' },
      ]}
    />
    <Steps
      size="default"
      current={1}
      items={[
        { title: 'Cart', description: 'Review' },
        { title: 'Address', description: 'Shipping' },
        { title: 'Pay', description: 'Payment' },
      ]}
    />
  </Stack>
),
    },
    {
      title: 'Clickable Steps',
      description: 'Steps that can be clicked to navigate between stages.',
      render: () => (
  <Steps
    current={1}
    onChange={(index) => console.log('Moved to step', index)}
    items={[
      { title: 'Plan', description: 'Choose plan' },
      { title: 'Billing', description: 'Add billing' },
      { title: 'Review', description: 'Confirm' },
    ]}
  />
),
    },
    {
      title: 'Completed Workflow',
      description: 'All steps marked as completed in a checkout-style workflow.',
      render: () => (
  <Card style={{ width: '100%', padding: 16 }}>
    <Steps
      current={3}
      items={[
        { title: 'Account', description: 'Created' },
        { title: 'Profile', description: 'Completed' },
        { title: 'Settings', description: 'Saved' },
      ]}
    />
  </Card>
),
    },
    {
      title: 'In a Card',
      description: 'Steps displayed inside a card for a contained wizard feel.',
      render: () => (
  <Card style={{ width: '100%', padding: 20 }}>
    <h4 style={{ margin: '0 0 16px' }}>Setup Progress</h4>
    <Steps
      current={2}
      items={[
        { title: 'Connect', description: 'Integrate data source' },
        { title: 'Configure', description: 'Map fields' },
        { title: 'Sync', description: 'Start syncing' },
      ]}
    />
  </Card>
),
    },
    {
      title: 'Compact Horizontal',
      description: 'A compact horizontal step indicator for dense layouts.',
      render: () => (
  <Steps
    size="small"
    direction="horizontal"
    current={0}
    items={[
      { title: 'Draft', description: 'Created' },
      { title: 'Review', description: 'Pending' },
      { title: 'Publish', description: 'Pending' },
    ]}
  />
),
    },
],

  Stack: [
    {
      title: 'Horizontal',
      description: 'Horizontal stacking with gaps.',
      render: () => (
      <Stack direction="row" gap={16} align="center">
        <Badge count={1} />
        <Badge count={2} />
        <Badge count={3} />
      </Stack>
    ),
    },
    {
      title: 'Vertical',
      description: 'Vertical stacking with gaps.',
      render: () => (
      <Stack direction="column" gap={16}>
        <Badge count={1} />
        <Badge count={2} />
        <Badge count={3} />
      </Stack>
    ),
    },
      {
      title: 'Spacing Sizes',
      description: 'Various gap values between stacked items.',
      render: () => (<Stack direction="column" gap={16}><Stack direction="row" gap={4} align="center"><Tag>A</Tag><Tag>B</Tag></Stack><Stack direction="row" gap={16} align="center"><Tag>A</Tag><Tag>B</Tag></Stack><Stack direction="row" gap={32} align="center"><Tag>A</Tag><Tag>B</Tag></Stack></Stack>),
    },
    {
      title: 'Justify Distribution',
      description: 'Row alignment using justify options.',
      render: () => (<Stack direction="column" gap={16} style={{ width: 320 }}><Stack direction="row" gap={8} justify="flex-start"><Tag>Start</Tag></Stack><Stack direction="row" gap={8} justify="center"><Tag>Center</Tag></Stack><Stack direction="row" gap={8} justify="flex-end"><Tag>End</Tag></Stack></Stack>),
    },
    {
      title: 'Wrapping Items',
      description: 'Tags that wrap onto multiple lines when space is tight.',
      render: () => (<Stack direction="row" gap={8} wrap={true} style={{ width: 160 }}><Tag>One</Tag><Tag>Two</Tag><Tag>Three</Tag><Tag>Four</Tag><Tag>Five</Tag></Stack>),
    },
    {
      title: 'Nested Layout',
      description: 'Rows nested inside a column to build a simple dashboard layout.',
      render: () => (<Stack direction="column" gap={16}><Stack direction="row" gap={12}><Card style={{ padding: 16, flex: 1 }}>Metric A</Card><Card style={{ padding: 16, flex: 1 }}>Metric B</Card></Stack><Card style={{ padding: 16 }}>Chart area</Card></Stack>),
    },
    {
      title: 'Centered Alignment',
      description: 'Row items centered along the cross axis.',
      render: () => (<Stack direction="row" gap={16} align="center" style={{ height: 60, border: '1px dashed var(--n-color-border)' }}><div style={{ height: 40, width: 40, background: 'var(--n-color-primary)', borderRadius: 8 }} /><Tag>Centered</Tag></Stack>),
    },
],

  Statistic: [
    {
      title: 'Basic',
      description: 'Key metric display.',
      render: () => (
        <Stack direction="row" gap={24} wrap={true}>
          <Statistic title="Users" value={1234} />
          <Statistic title="Revenue" value={5678} prefix="$" />
        </Stack>
      ),
    },
    {
      title: 'Trends',
      description: 'Statistics showing trend direction.',
      render: () => (
        <Stack direction="row" gap={24} wrap={true}>
          <Statistic title="Growth" value={12.5} precision={1} suffix="%" trend="up" />
          <Statistic title="Churn" value={2.4} precision={1} suffix="%" trend="down" />
        </Stack>
      ),
    },
    {
      title: 'Animated',
      description: 'Statistic value animates when it changes.',
      render: () => <Statistic title="Downloads" value={5420} animate={true} />,
    },
      {
      title: 'Currency',
      description: 'Monetary value with dollar prefix and two decimals.',
      render: () => (<Statistic title="Monthly Recurring Revenue" value={12453.21} prefix="$" precision={2} />),
    },
    {
      title: 'Metric Grid',
      description: 'Multiple statistics arranged in a compact grid.',
      render: () => (<Grid columns={2} gap={16} style={{ width: 360 }}><Statistic title="Users" value={8920} trend="up" /><Statistic title="Bounce Rate" value={42.3} suffix="%" precision={1} trend="down" /><Statistic title="Revenue" value={12450} prefix="$" /><Statistic title="Sessions" value={15300} /></Grid>),
    },
    {
      title: 'Large Number',
      description: 'Big metric with a millions suffix and animation.',
      render: () => (<Statistic title="Total Downloads" value={1.2} suffix="M" precision={1} animate={true} />),
    },
    {
      title: 'Prefix Icon',
      description: 'Statistic value with a leading icon as the prefix.',
      render: () => (<Statistic title="Active Users" value={98} suffix="%" prefix={<Icon name="check" size={20} />} precision={0} />),
    },
    {
      title: 'Static Value',
      description: 'Statistic rendered without entry animation.',
      render: () => (<Statistic title="Server Uptime" value={99.99} suffix="%" precision={2} animate={false} />),
    },
],

  Slider: [
    {
      title: 'Basic',
      description: 'Range value picker.',
      render: () => (
        <Stack direction="column" gap={24} style={{ width: 300 }}>
          <Slider value={30} />
          <Slider value={70} />
        </Stack>
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive slider with React state.',
      render: () => <ControlledSliderExample />,
    },
    {
      title: 'With Marks',
      description: 'Slider showing discrete value markers.',
      render: () => (
        <Slider
          value={50}
          marks={[
            { value: 0, label: '0' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
            { value: 75, label: '75' },
            { value: 100, label: '100' },
          ]}
          style={{ width: 300 }}
        />
      ),
    },
      {
      title: 'Negative Range',
      description: 'Slider spanning from -50 to 50.',
      render: () => (<Slider defaultValue={0} min={-50} max={50} style={{ width: 300 }} />),
    },
    {
      title: 'Stepped',
      description: 'Discrete steps of 10 with labeled markers.',
      render: () => (<Slider defaultValue={30} step={10} marks={[{ value: 0, label: '0' }, { value: 50, label: '50' }, { value: 100, label: '100' }]} style={{ width: 300 }} />),
    },
    {
      title: 'Disabled',
      description: 'Slider that cannot be interacted with.',
      render: () => (<Slider value={60} disabled={true} style={{ width: 300 }} />),
    },
    {
      title: 'Vertical',
      description: 'Vertical slider orientation.',
      render: () => (<div style={{ height: 160 }}><Slider defaultValue={40} vertical={true} /></div>),
    },
    {
      title: 'Error State',
      description: 'Slider showing a validation error.',
      render: () => (<Slider defaultValue={20} error="Select at least 50%" style={{ width: 300 }} />),
    },
],

  TextArea: [
    {
      title: 'Basic',
      description: 'Multi-line text input.',
      render: () => <TextArea placeholder="Enter your message…" rows={4} />,
    },
    {
      title: 'States',
      description: 'Disabled and error states.',
      render: () => (
        <Stack direction="column" gap={12}>
          <TextArea placeholder="Disabled" disabled={true} />
          <TextArea placeholder="Error" error="Invalid input" />
        </Stack>
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive text area with React state.',
      render: () => <ControlledTextAreaExample />,
    },
      {
      title: 'With Label',
      description: 'Text area with a label and placeholder.',
      render: () => (<TextArea label="Feedback" placeholder="Share your thoughts…" minRows={3} />),
    },
    {
      title: 'Character Count',
      description: 'Text area showing remaining characters.',
      render: () => (<TextArea placeholder="Max 120 characters" maxLength={120} showCount={true} minRows={3} />),
    },
    {
      title: 'Auto Resize',
      description: 'Text area that grows with content up to a max height.',
      render: () => (<TextArea placeholder="Type to expand…" autoResize={true} minRows={2} maxRows={6} style={{ width: 300 }} />),
    },
    {
      title: 'Sizes',
      description: 'Small and medium text area sizes.',
      render: () => (<Stack direction="column" gap={12}><TextArea inputSize="small" placeholder="Small" minRows={2} /><TextArea inputSize="medium" placeholder="Medium" minRows={2} /></Stack>),
    },
    {
      title: 'Helper Text',
      description: 'Text area with helper text and required marker.',
      render: () => (<TextArea label="Bio" placeholder="Tell us about yourself" helperText="This will appear on your profile." required={true} minRows={3} />),
    },
],

  DatePicker: [
    {
      title: 'Basic',
      description: 'Calendar date selection.',
      render: () => <DatePicker placeholder="Pick a date" />,
    },
    {
      title: 'Controlled',
      description: 'Interactive date picker with React state.',
      render: () => <ControlledDatePickerExample />,
    },
      {
      title: 'Range Mode',
      description: 'Select a start and end date range.',
      render: () => (<DatePicker mode="range" placeholder="Pick a range" />),
    },
    {
      title: 'Bounded Dates',
      description: 'Picker limited to a minimum and maximum date.',
      render: () => (<DatePicker minDate={new Date('2026-01-01')} maxDate={new Date('2026-12-31')} placeholder="2026 only" />),
    },
    {
      title: 'Custom Format',
      description: 'Date displayed in a custom format.',
      render: () => (<DatePicker format="dd/MM/yyyy" placeholder="DD/MM/YYYY" />),
    },
    {
      title: 'With Label',
      description: 'Date picker with an accessible label.',
      render: () => (<DatePicker label="Start date" id="start-date" placeholder="Choose start" />),
    },
    {
      title: 'Disabled',
      description: 'Date picker in a disabled state.',
      render: () => (<DatePicker disabled={true} placeholder="Unavailable" />),
    },
],

  TimePicker: [
    {
      title: 'Basic',
      description: 'Time selection control.',
      render: () => <TimePicker placeholder="Select time" />,
    },
    {
      title: 'Controlled',
      description: 'Interactive time picker with React state.',
      render: () => <ControlledTimePickerExample />,
    },
    {
      title: 'Disabled',
      description: 'Time picker in a disabled state.',
      render: () => <TimePicker value={{ hours: 10, minutes: 30 }} disabled />,
    },
      {
      title: '12-Hour Format',
      description: 'Time picker using AM/PM format.',
      render: () => (<TimePicker format="12h" placeholder="Pick time" />),
    },
    {
      title: 'Minute Intervals',
      description: 'Selectable times in 30-minute steps.',
      render: () => (<TimePicker minuteInterval={30} placeholder="Every 30 min" />),
    },
    {
      title: 'Time Bounds',
      description: 'Picker restricted to business hours.',
      render: () => (<TimePicker minTime={{ hours: 9, minutes: 0 }} maxTime={{ hours: 17, minutes: 0 }} placeholder="9:00 - 17:00" />),
    },
    {
      title: 'Sizes',
      description: 'Small and large time picker sizes.',
      render: () => (<Stack direction="row" gap={16} align="center"><TimePicker size="small" placeholder="Small" /><TimePicker size="large" placeholder="Large" /></Stack>),
    },
    {
      title: 'Help Text',
      description: 'Time picker with helper text.',
      render: () => (<TimePicker label="Meeting time" helpText="Choose a time in your local timezone." placeholder="Select time" />),
    },
],

  OTPInput: [
    {
      title: 'Basic',
      description: 'One-time password input.',
      render: () => <OTPInput length={6} />,
    },
    {
      title: 'Controlled',
      description: 'Interactive OTP input with React state.',
      render: () => <ControlledOTPInputExample />,
    },
    {
      title: 'Disabled',
      description: 'OTP input that cannot be edited.',
      render: () => <OTPInput length={6} value="123456" disabled />,
    },
      {
      title: 'Four Digits',
      description: 'Shorter OTP input with four boxes.',
      render: () => (<OTPInput length={4} />),
    },
    {
      title: 'Error State',
      description: 'OTP input showing an invalid entry.',
      render: () => (<OTPInput length={6} value="123" error={true} />),
    },
    {
      title: 'Completion Callback',
      description: 'OTP input that logs when all digits are filled.',
      render: () => (<OTPInput length={6} onComplete={(v) => console.log(v)} />),
    },
    {
      title: 'Eight Digits',
      description: 'Longer OTP input for secure tokens.',
      render: () => (<OTPInput length={8} value="ABCDEF12" />),
    },
    {
      title: 'Disabled Filled',
      description: 'Completed OTP input that cannot be edited.',
      render: () => (<OTPInput length={6} value="654321" disabled={true} />),
    },
],

  Rating: [
    {
      title: 'Basic',
      description: 'Star rating display and input.',
      render: () => (
        <Stack direction="row" gap={24} align="center">
          <Rating value={3} />
          <Rating value={4.5} precision={0.5} />
        </Stack>
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive star rating with React state.',
      render: () => <ControlledRatingExample />,
    },
    {
      title: 'Read Only',
      description: 'Star rating displayed without user interaction.',
      render: () => <Rating value={4} precision={0.5} readOnly={true} />,
    },
      {
      title: 'Sizes',
      description: 'Star ratings in small, medium, and large sizes.',
      render: () => (<Stack direction="row" gap={24} align="center"><Rating value={4} size="small" /><Rating value={4} size="medium" /><Rating value={4} size="large" /></Stack>),
    },
    {
      title: 'Half Stars',
      description: 'Ratings using half-star precision for finer scores.',
      render: () => (<Stack direction="row" gap={24} align="center"><Rating value={3.5} precision={0.5} /><Rating value={4.5} precision={0.5} readOnly={true} /></Stack>),
    },
    {
      title: 'Ten Star Scale',
      description: 'A wider rating scale out of ten stars.',
      render: () => <Rating value={7} max={10} precision={1} readOnly={true} />,
    },
    {
      title: 'Accessible Label',
      description: 'Rating with a custom accessible label.',
      render: () => <Rating value={2} label="Product rating" readOnly={true} />,
    },
    {
      title: 'Product Review',
      description: 'Read-only rating displayed as a product review score.',
      render: () => (<Stack direction="row" gap={12} align="center"><Rating value={4.5} precision={0.5} readOnly={true} /><Tag color="orange">4.5 / 5</Tag></Stack>),
    },
],

  Calendar: [
    {
      title: 'Basic',
      description: 'Full calendar view.',
      render: () => <Calendar />,
    },
    {
      title: 'With Events',
      description: 'Calendar showing an event marker.',
      render: () => {
        const today = new Date();
        return (
          <Calendar value={today} events={[{ date: today, title: 'Release', type: 'success' }]} />
        );
      },
    },
    {
      title: 'Disabled Weekends',
      description: 'Calendar that disables Saturday and Sunday.',
      render: () => <ControlledCalendarExample />,
    },
      {
      title: 'Preselected Date',
      description: 'Calendar with a preselected date value.',
      render: () => <Calendar value={new Date(2026, 5, 15)} />,
    },
    {
      title: 'Event Types',
      description: 'Calendar with multiple event types marked.',
      render: () => { const today = new Date(); return <Calendar value={today} events={[{ date: today, title: 'Release', type: 'success' }, { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2), title: 'Review', type: 'warning' }, { date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5), title: 'Planning', type: 'info' }]} />; },
    },
    {
      title: 'Disable Past Dates',
      description: 'Calendar that prevents selecting past dates.',
      render: () => { const today = new Date(); today.setHours(0, 0, 0, 0); return <Calendar value={new Date()} disabledDate={(d) => d < today} />; },
    },
    {
      title: 'Holiday Markers',
      description: 'Calendar highlighting important dates with event markers.',
      render: () => { const year = new Date().getFullYear(); return <Calendar value={new Date(year, 0, 1)} events={[{ date: new Date(year, 0, 1), title: 'New Year', type: 'error' }, { date: new Date(year, 6, 4), title: 'Independence Day', type: 'success' }]} />; },
    },
    {
      title: 'Weekend Events',
      description: 'Calendar showing events only on weekends.',
      render: () => { const today = new Date(); const sat = new Date(today); sat.setDate(today.getDate() + (6 - today.getDay())); return <Calendar value={today} events={[{ date: sat, title: 'Sprint review', type: 'info' }]} />; },
    },
],

  Segmented: [
    {
      title: 'Basic',
      description: 'Segmented control for options.',
      render: () => <Segmented options={['Day', 'Week', 'Month', 'Year']} value="Day" />,
    },
    {
      title: 'Controlled',
      description: 'Interactive segmented control with React state.',
      render: () => <ControlledSegmentedExample />,
    },
    {
      title: 'Sizes',
      description: 'Segmented control in different sizes.',
      render: () => <ControlledSegmentedExample2 />,
    },
      {
      title: 'Block Mode',
      description: 'Segmented control that fills the full width of its container.',
      render: () => <Segmented options={['Day', 'Week', 'Month']} value="Week" onChange={() => {}} block={true} />,
    },
    {
      title: 'Inline Sizes',
      description: 'Segmented controls shown in different sizes side by side.',
      render: () => (<Stack direction="column" gap={16}><Segmented options={['S', 'M']} value="S" onChange={() => {}} size="small" /><Segmented options={['Day', 'Week']} value="Day" onChange={() => {}} size="medium" /><Segmented options={['Month', 'Year']} value="Year" onChange={() => {}} size="large" /></Stack>),
    },
    {
      title: 'View Switcher',
      description: 'Segmented control for switching between list and grid views.',
      render: () => <Segmented options={['List', 'Grid', 'Kanban']} value="Grid" onChange={() => {}} />,
    },
    {
      title: 'Status Filter',
      description: 'Segmented control filtering by status.',
      render: () => <Segmented options={['All', 'Active', 'Archived']} value="Active" onChange={() => {}} />,
    },
    {
      title: 'Large Block Options',
      description: 'Large, full-width segmented control for primary navigation.',
      render: () => <Segmented options={['Overview', 'Details', 'Settings']} value="Overview" onChange={() => {}} size="large" block={true} />,
    },
],

  Pagination: [
    {
      title: 'Basic',
      description: 'Page navigation.',
      render: () => <Pagination currentPage={1} totalPages={10} />,
    },
    {
      title: 'More Siblings',
      description: 'Pagination with a larger sibling window.',
      render: () => <Pagination currentPage={5} totalPages={10} siblingCount={2} />,
    },
    {
      title: 'Controlled',
      description: 'Interactive pagination with React state.',
      render: () => <ControlledPaginationExample />,
    },
      {
      title: 'Compact',
      description: 'Pagination without previous and next arrows.',
      render: () => <Pagination currentPage={3} totalPages={8} onChange={() => {}} showPrevNext={false} />,
    },
    {
      title: 'Disabled',
      description: 'Pagination in a disabled, non-interactive state.',
      render: () => <Pagination currentPage={2} totalPages={5} onChange={() => {}} disabled={true} />,
    },
    {
      title: 'Wide Range',
      description: 'Pagination spanning many pages.',
      render: () => <Pagination currentPage={12} totalPages={24} onChange={() => {}} siblingCount={2} />,
    },
    {
      title: 'Small Total',
      description: 'Pagination with only a few pages.',
      render: () => <Pagination currentPage={1} totalPages={3} onChange={() => {}} />,
    },
    {
      title: 'Two Siblings',
      description: 'Pagination showing two sibling pages on each side.',
      render: () => <Pagination currentPage={7} totalPages={20} onChange={() => {}} siblingCount={2} showPrevNext={true} />,
    },
],

  RichTextEditor: [
    {
      title: 'Basic',
      description: 'WYSIWYG rich text editor with default content.',
      render: () => (
        <RichTextEditor defaultValue="<p>Edit this <strong>rich text</strong> content.</p>" />
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive rich text editor with React state.',
      render: () => <ControlledRichTextEditorExample />,
    },
    {
      title: 'Disabled',
      description: 'Read-only rich text editor.',
      render: () => <ControlledRichTextEditorDisabledExample />,
    },
      {
      title: 'Placeholder',
      description: 'Empty rich text editor with placeholder text.',
      render: () => <RichTextEditor value="" onChange={() => {}} placeholder="Start writing your content here…" />,
    },
    {
      title: 'Pre-filled Content',
      description: 'Rich text editor initialized with formatted HTML content.',
      render: () => <RichTextEditor value="<h3>Release Notes</h3><p>Version <strong>1.2.0</strong> is now available.</p><ul><li>New components</li><li>Bug fixes</li></ul>" onChange={() => {}} />,
    },
    {
      title: 'Styled Container',
      description: 'Rich text editor with a custom class name for styling.',
      render: () => <RichTextEditor value="<p>Styled editor content.</p>" onChange={() => {}} className="demo-editor" />,
    },
    {
      title: 'Minimal Value',
      description: 'Rich text editor with a short plain value.',
      render: () => <RichTextEditor value="<p>Edit me</p>" onChange={() => {}} />,
    },
    {
      title: 'Read Only View',
      description: 'Rich text editor rendered in a read-only state.',
      render: () => <RichTextEditor value="<p>This content is <em>read only</em>.</p>" onChange={() => {}} disabled={true} />,
    },
],

  Result: [
    {
      title: 'Success',
      description: 'Result page for success state.',
      render: () => (
        <Result
          status="success"
          title="Operation Successful"
          description="Your changes have been saved."
        />
      ),
    },
    {
      title: 'Error',
      description: 'Result page for error state.',
      render: () => (
        <Result status="error" title="Something Went Wrong" description="Please try again later." />
      ),
    },
    {
      title: 'With Actions',
      description: 'Result state with action buttons.',
      render: () => (
        <Result
          status="warning"
          title="Payment Failed"
          subTitle="We could not process your payment. Please check your details and try again."
          extra={
            <Stack direction="row" gap={12}>
              <Button size="small">Retry</Button>
              <Button size="small" variant="secondary">
                Contact Support
              </Button>
            </Stack>
          }
        />
      ),
    },
      {
      title: 'Warning Status',
      description: 'Result page for a warning state.',
      render: () => <Result status="warning" title="Attention Needed" subTitle="Your account requires verification before continuing." />,
    },
    {
      title: 'Info Status',
      description: 'Result page for an informational state.',
      render: () => <Result status="info" title="Update Available" subTitle="A new version of the app is ready to install." />,
    },
    {
      title: 'Custom Icon',
      description: 'Result with a custom icon override.',
      render: () => <Result status="success" title="Custom Icon" subTitle="This result uses a custom icon provided as a React node." icon={<Icon name="trophy" size={48} color="orange" />} />,
    },
    {
      title: 'Subtitle Focus',
      description: 'Result emphasizing the subtitle with no title.',
      render: () => <Result status="info" subTitle="No data matches your search filters." />,
    },
    {
      title: '404 Not Found',
      description: 'Result page for a missing resource.',
      render: () => <Result status="404" title="Page Not Found" subTitle="The page you are looking for does not exist." extra={<Button size="small">Go Home</Button>} />,
    },
],

  RSC: [
    {
      title: 'Server Components',
      description: 'RSC-compatible exports are available as a separate entry point.',
      render: () => (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <Text size="small" color="textSecondary">
            Live demo unavailable in the browser build. Use the import path below.
          </Text>
        </div>
      ),
      code: `import { Badge, Divider, Skeleton } from 'react-n-design/rsc';

export default async function ServerPage() {
  return (
    <>
      <Skeleton variant="text" width="40%" />
      <Badge count={3} />
      <Divider />
    </>
  );
}`,
    },
    {
      title: 'Compatible Components',
      description: 'RSC entry exports several presentational components.',
      render: () => (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <Text size="small" color="textSecondary">
            Available RSC components: Badge, Divider, Skeleton, Text.
          </Text>
        </div>
      ),
      code: `import { Badge, Divider, Skeleton, Text } from 'react-n-design/rsc';

export default async function ServerPage() {
  return (
    <>
      <Skeleton variant="text" width="40%" />
      <Badge count={3} />
      <Divider />
      <Text>Server-rendered text</Text>
    </>
  );
}`,
    },
    {
      title: 'Async Streaming',
      description: 'RSC page streaming async data alongside presentational components.',
      render: () => (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <Text size="small" color="textSecondary">
            Use async components to fetch data on the server and render with react-n-design RSC primitives.
          </Text>
        </div>
      ),
      code: `import { Suspense } from 'react';
import { Badge, Skeleton, Text } from 'react-n-design/rsc';

async function ServerData() {
  const data = await fetch('/api/stats').then((r) => r.json());
  return (
    <>
      <Text>Users: {data.users}</Text>
      <Badge count={data.notifications} />
    </>
  );
}

export default async function ServerPage() {
  return (
    <>
      <Skeleton variant="text" width="40%" />
      <Suspense fallback={<Skeleton variant="text" width="20%" />}>
        <ServerData />
      </Suspense>
    </>
  );
}`,
    },
      {
      title: 'Static Primitives',
      description: 'RSC entry renders static presentational components on the server.',
      render: () => (<Stack direction="column" gap={12} align="center"><Badge count={3} variant="success" /><Divider /><Text>Server-rendered text</Text></Stack>),
    },
    {
      title: 'Suspense Fallback',
      description: 'RSC page uses Skeleton as a streaming fallback while data loads.',
      render: () => (<Card style={{ padding: 24, width: 320 }}><Skeleton variant="text" width="60%" height={16} active={true} /><Skeleton variant="text" width="40%" height={12} active={true} /></Card>),
    },
    {
      title: 'Loading Skeletons',
      description: 'RSC-compatible skeleton placeholders for server-rendered lists.',
      render: () => (<Stack direction="column" gap={8}><Skeleton variant="text" width="100%" height={16} active={true} /><Skeleton variant="text" width="80%" height={16} active={true} /><Skeleton variant="text" width="60%" height={16} active={true} /></Stack>),
    },
    {
      title: 'Server Badge Count',
      description: 'RSC page can render dynamic badge counts from server data.',
      render: () => (<Stack direction="row" gap={16} align="center"><Badge count={12} variant="primary" /><Badge count={99} overflowCount={99} variant="error" /><Badge dot={true} /></Stack>),
    },
    {
      title: 'Async List Pattern',
      description: 'RSC pattern for streaming an async list of presentational items.',
      render: () => (<Stack direction="column" gap={8}><Divider /><Text size="small">Item 1</Text><Divider /><Text size="small">Item 2</Text><Divider /><Text size="small">Item 3</Text></Stack>),
    },
],

  Collapsible: [
    {
      title: 'Basic',
      description: 'Expandable content with a trigger.',
      render: () => (
      <Collapsible trigger="Click to expand">
        This content is hidden until expanded.
      </Collapsible>
    ),
    },
    {
      title: 'Default Open',
      description: 'Collapsible that starts expanded.',
      render: () => (
      <Collapsible trigger="Expanded by default" defaultOpen={true}>
        This content starts visible.
      </Collapsible>
    ),
    },
      {
      title: 'Custom Icon',
      description: 'Collapsible with a custom expand/collapse icon.',
      render: () => (<Collapsible trigger="View details" icon={<Icon name="chevron-down" size={16} />}>Additional details are shown here with a custom icon.</Collapsible>),
    },
    {
      title: 'Unmount on Exit',
      description: 'Collapsible that unmounts content when collapsed.',
      render: () => (<Collapsible trigger="Toggle content" unmountOnExit={true}>This content is unmounted when the collapsible is closed.</Collapsible>),
    },
    {
      title: 'Nested Panels',
      description: 'Collapsible panels nested inside one another.',
      render: () => (<Collapsible trigger="Parent section" defaultOpen={true}><p style={{ margin: '8px 0' }}>Parent content.</p><Collapsible trigger="Child section">Nested child content.</Collapsible></Collapsible>),
    },
    {
      title: 'Card Wrapper',
      description: 'Collapsible styled inside a card container.',
      render: () => (<Card style={{ padding: 16, maxWidth: 360 }}><Collapsible trigger="Card settings">Settings content inside a card.</Collapsible></Card>),
    },
    {
      title: 'Rich Trigger',
      description: 'Collapsible with a styled trigger containing multiple elements.',
      render: () => (<Collapsible trigger={<Stack direction="row" gap={8} align="center"><Badge count={2} /><span>Notifications</span></Stack>}>Here are your latest notifications.</Collapsible>),
    },
],

  CodeBlock: [
    {
      title: 'Basic',
      description: 'Syntax highlighted code.',
      render: () => <CodeBlock code="const x = 1;" language="typescript" />,
    },
    {
      title: 'With Line Numbers',
      description: 'Code block with line numbers.',
      render: () => (
        <CodeBlock
          code="function hello() {\\n  return 'world';\\n}"
          language="typescript"
          showLineNumbers={true}
        />
      ),
    },
    {
      title: 'Copyable',
      description: 'Code block with a copy button.',
      render: () => <ControlledCodeBlockExample />,
    },
      {
      title: 'JSON Config',
      description: 'Syntax-highlighted JSON configuration with line numbers and copy support.',
      render: () => <CodeBlock code='{
  "name": "app",
  "version": "1.0.0",
  "private": true
}' language='json' showLineNumbers copyable />,
    },
    {
      title: 'CSS Rules',
      description: 'CSS snippet rendered without line numbers for a focused preview.',
      render: () => <CodeBlock code='.button {
  background: #6d5dfc;
  color: white;
  border-radius: 8px;
}' language='css' showLineNumbers={false} copyable />,
    },
    {
      title: 'Shell Script',
      description: 'A realistic shell workflow with line numbers enabled.',
      render: () => <CodeBlock code='git add .
git commit -m "feat: update"
git push origin main' language='bash' showLineNumbers />,
    },
    {
      title: 'SQL Query',
      description: 'SQL selection query with a copy button.',
      render: () => <CodeBlock code='SELECT id, name, email
FROM users
WHERE active = true
ORDER BY created_at DESC;' language='sql' copyable />,
    },
    {
      title: 'Python Function',
      description: 'Python function without line numbers or copy support.',
      render: () => <CodeBlock code='def greet(name):
    return f"Hello, {name}!"

print(greet("World"))' language='python' showLineNumbers={false} copyable={false} />,
    },
],

  Tree: [
    {
      title: 'Basic',
      description: 'Hierarchical data tree.',
      render: () => (
        <Tree
          data={[
            {
              key: '1',
              title: 'Parent',
              children: [
                { key: '1-1', title: 'Child A' },
                { key: '1-2', title: 'Child B', children: [{ key: '1-2-1', title: 'Grandchild' }] },
              ],
            },
          ]}
        />
      ),
    },
    {
      title: 'Pre-expanded',
      description: 'Tree with the first node expanded by default.',
      render: () => (
        <Tree
          defaultExpandedKeys={['1']}
          data={[
            {
              key: '1',
              title: 'Parent',
              children: [
                { key: '1-1', title: 'Child A' },
                { key: '1-2', title: 'Child B', children: [{ key: '1-2-1', title: 'Grandchild' }] },
              ],
            },
          ]}
        />
      ),
    },
    {
      title: 'Selectable',
      description: 'Tree with node selection callback.',
      render: () => <ControlledTreeExample />,
    },
      {
      title: 'Default Selection',
      description: 'Tree with a default selected node.',
      render: () => <Tree data={[{ key: '1', title: 'Project', children: [{ key: '1-1', title: 'src' }, { key: '1-2', title: 'docs', children: [{ key: '1-2-1', title: 'README.md' }] }] }]} defaultSelectedKeys={['1-1']} />,
    },
    {
      title: 'Expand Handler',
      description: 'Tree that logs the expanded keys whenever a node is toggled.',
      render: () => <Tree data={[{ key: 'root', title: 'Root', children: [{ key: 'a', title: 'Branch A' }, { key: 'b', title: 'Branch B' }] }]} defaultExpandedKeys={['root']} onExpand={(keys) => console.log(keys)} />,
    },
    {
      title: 'Deeply Nested',
      description: 'Tree expanded down to a deeply nested hierarchy.',
      render: () => <Tree data={[{ key: '1', title: 'Level 1', children: [{ key: '1-1', title: 'Level 2', children: [{ key: '1-1-1', title: 'Level 3', children: [{ key: '1-1-1-1', title: 'Level 4' }] }] }] }]} defaultExpandedKeys={['1', '1-1', '1-1-1']} />,
    },
    {
      title: 'Flat List',
      description: 'Tree rendered as a flat list without nested children.',
      render: () => <Tree data={[{ key: 'a', title: 'Documents' }, { key: 'b', title: 'Downloads' }, { key: 'c', title: 'Pictures' }]} />,
    },
    {
      title: 'Expand and Select',
      description: 'Tree with both default expansion and default selection combined.',
      render: () => <Tree data={[{ key: '1', title: 'Workspace', children: [{ key: '1-1', title: 'Design' }, { key: '1-2', title: 'Engineering' }] }]} defaultExpandedKeys={['1']} defaultSelectedKeys={['1-2']} onSelect={() => {}} onExpand={() => {}} />,
    },
],

  Toast: [
    {
      title: 'Basic',
      description: 'Show a temporary notification with the toast hook.',
      render: () => (
      <ToastProvider>
        <ToastDemoExample />
      </ToastProvider>
    ),
    },
    {
      title: 'Variants',
      description: 'Success, warning, and error toasts.',
      render: () => (
      <ToastProvider>
        <ToastVariantsExample />
      </ToastProvider>
    ),
    },
      {
      title: 'Success Toast',
      description: 'A standalone success toast with title, description, and duration.',
      render: () => <Toast id='success-1' variant='success' title='Saved' description='Your changes were saved successfully.' duration={5000} onDismiss={() => {}} />,
    },
    {
      title: 'With Action',
      description: 'Toast that includes a call-to-action button.',
      render: () => <Toast id='action-1' variant='warning' title='Undo available' description='The item was deleted.' action={<Button size='small' onClick={() => {}}>Undo</Button>} onDismiss={() => {}} />,
    },
    {
      title: 'Glass Toast',
      description: 'Info toast using the glassmorphism style.',
      render: () => <Toast id='glass-1' variant='info' title='New update' description='A new version is available.' isGlass onDismiss={() => {}} />,
    },
    {
      title: 'Avatar Toast',
      description: 'Toast with an avatar for a user-generated notification.',
      render: () => <Toast id='avatar-1' variant='info' title='Alice commented' description='Looks great, ship it!' avatar={{ src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice', alt: 'Alice' }} onDismiss={() => {}} />,
    },
    {
      title: 'Rich Content',
      description: 'Toast with rich custom content and meta text.',
      render: () => <Toast id='rich-1' variant='success' title='Deployment complete' richContent={<div><strong>Production</strong> deployed at 12:30 PM.</div>} meta='2 minutes ago' onDismiss={() => {}} />,
    },
],

  Toggle: [
    {
      title: 'Basic',
      description: 'On/off toggle button.',
      render: () => (
        <Stack direction="row" gap={16} align="center">
          <Toggle pressed={false}>Off</Toggle>
          <Toggle pressed={true}>On</Toggle>
        </Stack>
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive toggle button with React state.',
      render: () => <ControlledToggleExample />,
    },
    {
      title: 'Disabled',
      description: 'Toggle button in a disabled state.',
      render: () => (
        <Stack direction="row" gap={16} align="center">
          <Toggle pressed={false} disabled={true}>
            Off
          </Toggle>
          <Toggle pressed={true} disabled={true}>
            On
          </Toggle>
        </Stack>
      ),
    },
      {
      title: 'Default On',
      description: 'Toggle that starts in the pressed state by default.',
      render: () => <Toggle defaultPressed={true}>Dark mode</Toggle>,
    },
    {
      title: 'Icon Toggles',
      description: 'Toggle buttons using icons as their content.',
      render: () => (
        <Stack direction="row" gap={12} align="center">
          <Toggle pressed={false} value="star">
            <Icon name="star" size={16} />
          </Toggle>
          <Toggle pressed={true} value="heart">
            <Icon name="heart" size={16} />
          </Toggle>
        </Stack>
      ),
    },
    {
      title: 'Pressed Toolbar',
      description: 'A group of toggles with mixed pressed states for a formatting toolbar.',
      render: () => (
        <Stack direction="row" gap={8} align="center">
          <Toggle pressed={true} value="bold">
            <strong>B</strong>
          </Toggle>
          <Toggle pressed={false} value="italic">
            <em>I</em>
          </Toggle>
          <Toggle pressed={true} value="underline">
            <span style={{ textDecoration: 'underline' }}>U</span>
          </Toggle>
        </Stack>
      ),
    },
    {
      title: 'Disabled Pressed',
      description: 'Toggle locked in the pressed state and disabled.',
      render: () => <Toggle pressed={true} disabled={true}>Locked</Toggle>,
    },
    {
      title: 'Form Values',
      description: 'Group of toggles with value attributes for toolbar-like forms.',
      render: () => <Stack direction='row' gap={12} align='center'><Toggle value='bold'>Bold</Toggle><Toggle value='italic'>Italic</Toggle><Toggle value='underline'>Underline</Toggle></Stack>,
    },
],

  Timeline: [
    {
      title: 'Basic',
      description: 'Chronological event list.',
      render: () => (
        <Timeline
          items={[
            { children: 'Created project', color: 'blue' },
            { children: 'Added first component', color: 'green' },
            { children: 'Released v1.0', color: 'red' },
          ]}
        />
      ),
    },
    {
      title: 'Right Mode',
      description: 'Timeline aligned to the right.',
      render: () => (
        <Timeline
          mode="right"
          items={[
            { children: 'Created project', color: 'blue' },
            { children: 'Released v1.0', color: 'red' },
          ]}
        />
      ),
    },
    {
      title: 'Reversible',
      description: 'Timeline that can be reversed with a button.',
      render: () => <ControlledTimelineExample />,
    },
      {
      title: 'Alternate Mode',
      description: 'Timeline items alternating between left and right sides.',
      render: () => <Timeline mode='alternate' items={[{ children: 'Created repository', label: 'Jan 1', color: 'blue' }, { children: 'First commit', label: 'Jan 2', color: 'green' }, { children: 'Released v1.0', label: 'Jan 5', color: 'red' }]} />,
    },
    {
      title: 'Reversed',
      description: 'Timeline rendered in reverse chronological order.',
      render: () => <Timeline reverse items={[{ children: 'Project finished', color: 'green' }, { children: 'Development started', color: 'blue' }, { children: 'Ideation', color: 'gray' }]} />,
    },
    {
      title: 'With Labels',
      description: 'Timeline items showing time labels alongside events.',
      render: () => <Timeline items={[{ children: 'Design review', label: '09:00', color: 'purple' }, { children: 'Stand-up', label: '10:30', color: 'orange' }, { children: 'Demo', label: '14:00', color: 'blue' }]} />,
    },
    {
      title: 'Custom Dots',
      description: 'Timeline using custom icon dots for each status.',
      render: () => <Timeline items={[{ children: 'In progress', dot: <Icon name='clock' size={14} />, color: 'blue' }, { children: 'Done', dot: <Icon name='check' size={14} />, color: 'green' }, { children: 'Blocked', dot: <Icon name='alert' size={14} />, color: 'red' }]} />,
    },
    {
      title: 'Right Aligned Items',
      description: 'Timeline with every item explicitly aligned to the right.',
      render: () => <Timeline items={[{ children: 'Onboarding', position: 'right', color: 'blue' }, { children: 'Training', position: 'right', color: 'green' }, { children: 'Graduation', position: 'right', color: 'gold' }]} />,
    },
],

  Terminal: [
    {
      title: 'Basic',
      description: 'Terminal output display.',
      render: () => (
        <Terminal
          lines={[{ text: 'npm install react-n-design' }, { text: '✓ Installed 1 package' }]}
        />
      ),
    },
    {
      title: 'With Title',
      description: 'Terminal with a custom title.',
      render: () => (
        <Terminal title="Build output" lines={[{ text: 'npm run build' }, { text: '✓ Done' }]} />
      ),
    },
    {
      title: 'With Timestamps',
      description: 'Terminal output showing line timestamps.',
      render: () => (
        <Terminal
          showTimestamps={true}
          lines={[
            { text: 'npm install react-n-design' },
            { text: '✓ Installed 1 package' },
            { text: 'npm run build' },
          ]}
        />
      ),
    },
      {
      title: 'Compact Height',
      description: 'Terminal constrained to a compact maximum height.',
      render: () => <Terminal title='Short log' maxHeight='120px' lines={[{ content: 'npm install', type: 'command' }, { content: 'added 42 packages', type: 'output' }]} />,
    },
    {
      title: 'Static Scroll',
      description: 'Terminal output with auto-scroll disabled.',
      render: () => <Terminal title='Static output' autoScroll={false} lines={[{ content: 'Starting server...', type: 'info' }, { content: 'Server ready on port 3000', type: 'output' }]} />,
    },
    {
      title: 'Error Log',
      description: 'Terminal styled for error output with command and error lines.',
      render: () => <Terminal title='Error output' lines={[{ content: 'npm run lint', type: 'command' }, { content: 'src/index.ts:12:10 - error TS2345', type: 'error' }, { content: 'Found 1 error.', type: 'output' }]} />,
    },
    {
      title: 'Build Log',
      description: 'Build output with a mix of command, info, and output lines.',
      render: () => <Terminal title='Build output' lines={[{ content: 'npm run build', type: 'command' }, { content: 'vite v5.0 building for production...', type: 'info' }, { content: 'dist/assets/index-abc.js', type: 'output' }, { content: 'Build completed in 2.34s', type: 'output' }]} />,
    },
    {
      title: 'Long Output',
      description: 'Terminal rendering a long scrolling list of generated lines.',
      render: () => <Terminal title='Long output' maxHeight='160px' lines={Array.from({ length: 20 }, (_, i) => ({ content: `Line ${i + 1}: processing item ${i + 1}`, type: i % 5 === 0 ? 'info' : 'output' }))} />,
    },
],

  Markdown: [
    {
      title: 'Basic',
      description: 'Markdown renderer.',
      render: () => (
        <Markdown># Hello\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n</Markdown>
      ),
    },
    {
      title: 'List and Link',
      description: 'Markdown with a list and a link.',
      render: () => (
        <Markdown># Features\n\n- Fast\n- Accessible\n\n[Read more](https://example.com)</Markdown>
      ),
    },
    {
      title: 'Code Block',
      description: 'Markdown rendering an inline code block.',
      render: () => (
        <Markdown># Code Example\n\n```tsx\nconst x = 1;\n```\n\nUse `code` inline.</Markdown>
      ),
    },
      {
      title: 'Blockquote',
      description: 'Markdown rendering a formatted blockquote.',
      render: () => <Markdown>{`> Design is not just what it looks like and feels like.
> Design is how it works.

— Steve Jobs`}</Markdown>,
    },
    {
      title: 'Table',
      description: 'Markdown table with headers and rows.',
      render: () => <Markdown>{`| Name | Role | Status |
|------|------|--------|
| Alice | Engineer | Active |
| Bob | Designer | Away |`}</Markdown>,
    },
    {
      title: 'Ordered List',
      description: 'Numbered Markdown list for step-by-step instructions.',
      render: () => <Markdown>{`1. Install the package
2. Import the component
3. Build your UI`}</Markdown>,
    },
    {
      title: 'Headings',
      description: 'Markdown heading hierarchy from h1 to h4.',
      render: () => <Markdown>{`# Heading 1
## Heading 2
### Heading 3
#### Heading 4`}</Markdown>,
    },
    {
      title: 'Custom Components',
      description: 'Markdown with a custom component override for headings.',
      render: () => <Markdown components={{ h1: ({ children }) => <h1 style={{ color: '#6d5dfc' }}>{children}</h1> }}>{`# Custom styled heading

This paragraph uses the default renderer.`}</Markdown>,
    },
],

  CopyButton: [
    {
      title: 'Basic',
      description: 'Click-to-copy button.',
      render: () => <CopyButton text="Copy this text" />,
    },
    {
      title: 'Sizes',
      description: 'Copy button in small, medium, and large sizes.',
      render: () => (
        <Stack direction="row" gap={16} align="center">
          <CopyButton text="Copied" size="sm" />
          <CopyButton text="Copied" size="md" />
          <CopyButton text="Copied" size="lg" />
        </Stack>
      ),
    },
    {
      title: 'Custom Tooltip',
      description: 'Copy button with custom success feedback labels.',
      render: () => (
        <CopyButton
          text="Copy me"
          tooltipLabel="Click to copy"
          successTooltipLabel="Copied!"
          successDuration={2000}
        />
      ),
    },
    {
      title: 'Custom Icons',
      description: 'Copy button with custom copy and success icons.',
      render: () => (
        <CopyButton
          text="Copy me"
          copyIcon={<Icon name="copy" size={16} />}
          successIcon={<Icon name="check" size={16} />}
        />
      ),
    },
    {
      title: 'Command Snippet',
      description: 'Copy a terminal command with tailored tooltip labels.',
      render: () => (
        <CopyButton
          text="npm install react-n-design"
          tooltipLabel="Copy install command"
          successTooltipLabel="Copied to clipboard"
          successDuration={1500}
        />
      ),
    },
    {
      title: 'Success Callback',
      description: 'Copy button that logs the copied text after a successful copy.',
      render: () => (
        <CopyButton
          text="Copy and log"
          onCopySuccess={(text) => console.log('Copied:', text)}
          successDuration={2000}
        />
      ),
    },
    {
      title: 'Error Callback',
      description: 'Copy button that handles copy failures gracefully.',
      render: () => (
        <CopyButton
          text="Copy with fallback"
          onCopyError={(error) => console.log('Copy failed:', error.message)}
        />
      ),
    },
    {
      title: 'Accessible Label',
      description: 'Small copy button with a custom accessible label.',
      render: () => (
        <CopyButton
          text="Copy"
          size="sm"
          aria-label="Copy email address to clipboard"
        />
      ),
    },
  ],

  DiffViewer: [
    {
      title: 'Basic',
      description: 'Code diff visualization.',
      render: () => <DiffViewer oldValue="const a = 1;" newValue="const a = 2;" />,
    },
    {
      title: 'Inline',
      description: 'Diff displayed in inline mode.',
      render: () => <DiffViewer oldValue="const a = 1;" newValue="const a = 2;" mode="inline" />,
    },
    {
      title: 'Larger Diff',
      description: 'Diff viewer showing a multi-line code change.',
      render: () => (
        <DiffViewer
          oldValue={`function sum(a, b) {\n  return a + b;\n}`}
          newValue={`function sum(...numbers) {\n  return numbers.reduce((a, b) => a + b, 0);\n}`}
        />
      ),
    },
      {
      title: 'Unified View',
      description: 'Diff rendered in a single unified column.',
      render: () => <DiffViewer oldValue="function add(a, b) { return a + b; }" newValue="function add(a, b) { return a + b + 1; }" mode="unified" />,
    },
    {
      title: 'Split JSON',
      description: 'Side-by-side diff for JSON content.',
      render: () => <DiffViewer oldValue='{\\n  "name": "alice"\\n}' newValue='{\\n  "name": "alice",\\n  "age": 30\\n}' />,
    },
    {
      title: 'Styled Container',
      description: 'Diff viewer wrapped with a custom class name.',
      render: () => <DiffViewer className="demo-diff" oldValue="theme: light" newValue="theme: dark" />,
    },
    {
      title: 'Configuration Diff',
      description: 'Diff for a simple key-value configuration change.',
      render: () => <DiffViewer oldValue="debug: true\ntimeout: 5000" newValue="debug: false\ntimeout: 10000" />,
    },
    {
      title: 'Added Content',
      description: 'Diff showing content added from an empty starting value.',
      render: () => <DiffViewer oldValue="" newValue="function hello() {\n  return 'world';\n}" />,
    },
],

  Drawer: [
    {
      title: 'Basic',
      description: 'Side panel that slides in from the right.',
      render: () => <DrawerExample />,
    },
    {
      title: 'Left Placement',
      description: 'Drawer that slides in from the left.',
      render: () => <DrawerLeftExample />,
    },
    {
      title: 'Sizes',
      description: 'Drawer in different sizes.',
      render: () => (
        <>
          <Button size="small" onClick={() => {}}>
            Large Drawer
          </Button>
          <Drawer isOpen={false} onClose={() => {}} title="Large Drawer" size="large">
            <p>Large drawer content.</p>
          </Drawer>
        </>
      ),
    },
      {
      title: 'Top Placement',
      description: 'Drawer that slides in from the top of the viewport.',
      render: () => { const [open, setOpen] = React.useState(false); return (<><Button size="small" onClick={() => setOpen(true)}>Open Top</Button><Drawer isOpen={open} onClose={() => setOpen(false)} title="Top Drawer" placement="top"><p>This drawer slides down from the top.</p></Drawer></>); },
    },
    {
      title: 'Bottom Placement',
      description: 'Drawer that slides in from the bottom of the viewport.',
      render: () => { const [open, setOpen] = React.useState(false); return (<><Button size="small" onClick={() => setOpen(true)}>Open Bottom</Button><Drawer isOpen={open} onClose={() => setOpen(false)} title="Bottom Drawer" placement="bottom"><p>This drawer slides up from the bottom.</p></Drawer></>); },
    },
    {
      title: 'Glass Variant',
      description: 'Drawer with a frosted-glass panel style.',
      render: () => { const [open, setOpen] = React.useState(false); return (<><Button size="small" onClick={() => setOpen(true)}>Open Glass</Button><Drawer isOpen={open} onClose={() => setOpen(false)} title="Glass Drawer" variant="glass"><p>Content behind the backdrop is blurred.</p></Drawer></>); },
    },
    {
      title: 'Footer Actions',
      description: 'Drawer with action buttons in the footer.',
      render: () => { const [open, setOpen] = React.useState(false); return (<><Button size="small" onClick={() => setOpen(true)}>Open Drawer</Button><Drawer isOpen={open} onClose={() => setOpen(false)} title="Confirm" footer={<Stack direction="row" gap={12}><Button size="small" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button size="small" onClick={() => setOpen(false)}>Confirm</Button></Stack>}><p>Are you sure you want to continue?</p></Drawer></>); },
    },
    {
      title: 'Prevent Backdrop Click',
      description: 'Drawer that cannot be closed by clicking the backdrop.',
      render: () => { const [open, setOpen] = React.useState(false); return (<><Button size="small" onClick={() => setOpen(true)}>Open Drawer</Button><Drawer isOpen={open} onClose={() => setOpen(false)} title="Backdrop Locked" preventBackdropClick={true}><p>Click outside will not close this drawer.</p></Drawer></>); },
    },
],

  Empty: [
    {
      title: 'Basic',
      description: 'Empty state illustration with description.',
      render: () => <Empty description="There is nothing to show here." />,
    },
    {
      title: 'With Action',
      description: 'Empty state with a call-to-action button.',
      render: () => (
        <Empty
          description={
            <div>
              <strong>No Projects</strong>
              <p>Create your first project to get started.</p>
            </div>
          }
        >
          <Button size="small" style={{ marginTop: 16 }}>
            Create Project
          </Button>
        </Empty>
      ),
    },
    {
      title: 'Custom Image',
      description: 'Empty state with a custom image.',
      render: () => (
        <Empty
          description="No search results found."
          image={<Icon name="search" size={64} color="var(--n-color-text-secondary)" />}
        />
      ),
    },
      {
      title: 'Default',
      description: 'Empty state using the default illustration and text.',
      render: () => <Empty />,
    },
    {
      title: 'Custom Icon',
      description: 'Empty state with a custom icon as the image.',
      render: () => <Empty description="No messages" image={<Icon name="inbox" size={64} color="var(--n-color-text-secondary)" />} />,
    },
    {
      title: 'Rich Description',
      description: 'Empty state with structured description content.',
      render: () => <Empty description={<div><strong>No projects</strong><p>Create a project to get started.</p></div>} />,
    },
    {
      title: 'In a Card',
      description: 'Empty state nested inside a card container.',
      render: () => <Card style={{ width: 320, padding: 24 }}><Empty description="No data" /></Card>,
    },
    {
      title: 'With Two Actions',
      description: 'Empty state with primary and secondary action buttons.',
      render: () => <Empty description="No projects found"><Stack direction="row" gap={12} style={{ marginTop: 16 }}><Button size="small">Create</Button><Button size="small" variant="secondary">Import</Button></Stack></Empty>,
    },
],

  HeatmapCalendar: [
    {
      title: 'Basic',
      description: 'Activity heatmap calendar.',
      render: () => (
        <HeatmapCalendar
          data={[
            { date: '2024-01-01', count: 5 },
            { date: '2024-01-02', count: 3 },
          ]}
        />
      ),
    },
    {
      title: 'Previous Year',
      description: 'Heatmap calendar for a different year.',
      render: () => (
        <HeatmapCalendar
          year={2023}
          data={[
            { date: '2023-01-01', count: 5 },
            { date: '2023-01-02', count: 3 },
          ]}
        />
      ),
    },
    {
      title: 'Monday Start',
      description: 'Heatmap calendar starting weeks on Monday.',
      render: () => (
        <HeatmapCalendar
          startWeekOnMonday={true}
          data={[
            { date: '2024-06-03', count: 4 },
            { date: '2024-06-04', count: 7 },
            { date: '2024-06-05', count: 2 },
          ]}
        />
      ),
    },
      {
      title: 'Sunday Start',
      description: 'Heatmap calendar with weeks starting on Sunday.',
      render: () => <HeatmapCalendar startWeekOnMonday={false} data={[{ date: '2024-01-07', count: 5 }, { date: '2024-01-14', count: 3 }, { date: '2024-01-21', count: 8 }]} />,
    },
    {
      title: 'Full Year 2024',
      description: 'Heatmap showing activity distributed across the year.',
      render: () => <HeatmapCalendar year={2024} data={[{ date: '2024-01-05', count: 2 }, { date: '2024-02-12', count: 6 }, { date: '2024-03-20', count: 4 }, { date: '2024-04-08', count: 9 }, { date: '2024-05-15', count: 1 }, { date: '2024-06-30', count: 7 }, { date: '2024-07-18', count: 5 }, { date: '2024-08-25', count: 3 }, { date: '2024-09-10', count: 8 }, { date: '2024-10-31', count: 4 }, { date: '2024-11-22', count: 6 }, { date: '2024-12-12', count: 10 }]} />,
    },
    {
      title: 'Sparse Data',
      description: 'Heatmap with only a few active days.',
      render: () => <HeatmapCalendar data={[{ date: '2024-06-01', count: 1 }, { date: '2024-06-15', count: 3 }]} />,
    },
    {
      title: 'Custom Class',
      description: 'Heatmap calendar with a custom wrapper class name.',
      render: () => <HeatmapCalendar className="demo-heatmap" data={[{ date: '2024-07-04', count: 4 }, { date: '2024-07-05', count: 7 }, { date: '2024-07-06', count: 2 }]} />,
    },
    {
      title: 'Recent Year 2025',
      description: 'Heatmap calendar focused on a recent calendar year.',
      render: () => <HeatmapCalendar year={2025} data={[{ date: '2025-01-10', count: 3 }, { date: '2025-02-14', count: 6 }, { date: '2025-03-22', count: 9 }, { date: '2025-04-05', count: 2 }]} />,
    },
],

  KanbanBoard: [
    {
      title: 'Basic',
      description: 'Kanban task board.',
      render: () => (
        <KanbanBoard
          columns={[
            { title: 'To Do', tasks: [{ id: '1', title: 'Design' }] },
            { title: 'Done', tasks: [{ id: '2', title: 'Research' }] },
          ]}
        />
      ),
    },
    {
      title: 'More Columns',
      description: 'Kanban board with three columns.',
      render: () => (
        <KanbanBoard
          columns={[
            {
              title: 'Backlog',
              tasks: [
                { id: '1', title: 'Idea' },
                { id: '2', title: 'Spec' },
              ],
            },
            { title: 'In Progress', tasks: [{ id: '3', title: 'Coding' }] },
            { title: 'Done', tasks: [{ id: '4', title: 'Shipped' }] },
          ]}
        />
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive Kanban board with React state.',
      render: () => <ControlledKanbanExample />,
    },
      {
      title: 'Single Column',
      description: 'Kanban board with a single task column.',
      render: () => <KanbanBoard onChange={() => {}} columns={[{ id: 'todo', title: 'To Do', tasks: [{ id: 't1', title: 'Design mockups', description: 'Create initial screens' }] }]} />,
    },
    {
      title: 'Empty Column',
      description: 'Kanban board that includes an empty backlog column.',
      render: () => <KanbanBoard onChange={() => {}} columns={[{ id: 'backlog', title: 'Backlog', tasks: [] }, { id: 'doing', title: 'In Progress', tasks: [{ id: 't1', title: 'Wireframes' }] }]} />,
    },
    {
      title: 'Custom Class',
      description: 'Kanban board styled through a custom class name.',
      render: () => <KanbanBoard className="demo-kanban" onChange={() => {}} columns={[{ id: 'todo', title: 'To Do', tasks: [{ id: 't1', title: 'Research' }] }, { id: 'done', title: 'Done', tasks: [{ id: 't2', title: 'Planning' }] }]} />,
    },
    {
      title: 'Wrapped in Card',
      description: 'Kanban board displayed inside a card container.',
      render: () => <Card style={{ padding: 16 }}><KanbanBoard onChange={() => {}} columns={[{ id: 'todo', title: 'To Do', tasks: [{ id: 't1', title: 'Design' }] }, { id: 'done', title: 'Done', tasks: [{ id: 't2', title: 'Deploy' }] }]} /></Card>,
    },
    {
      title: 'Many Tasks',
      description: 'Kanban board with several tasks including tags and descriptions.',
      render: () => <KanbanBoard onChange={() => {}} columns={[{ id: 'todo', title: 'To Do', tasks: [{ id: 't1', title: 'Refactor auth', description: 'Simplify login flow', tags: ['backend'] }, { id: 't2', title: 'Update docs', tags: ['docs'] }, { id: 't3', title: 'Fix icons' }] }, { id: 'done', title: 'Done', tasks: [{ id: 't4', title: 'Setup CI', description: 'GitHub Actions workflow' }] }]} />,
    },
],

  DataGrid: [
    {
      title: 'Basic',
      description: 'Advanced data grid.',
      render: () => {
        const cols = [
          { key: 'name', title: 'Name', dataIndex: 'name' as const },
          { key: 'email', title: 'Email', dataIndex: 'email' as const },
        ];
        const data = [
          { name: 'Alice', email: 'alice@example.com' },
          { name: 'Bob', email: 'bob@example.com' },
        ];
        return <DataGrid columns={cols} dataSource={data} pagination={false} />;
      },
    },
    {
      title: 'Loading',
      description: 'Data grid in a loading state.',
      render: () => (
        <DataGrid
          columns={[{ key: 'name', title: 'Name', dataIndex: 'name' }]}
          dataSource={[]}
          loading={true}
        />
      ),
    },
    {
      title: 'Expandable Rows',
      description: 'Data grid with expandable row details.',
      render: () => {
        const cols = [
          { key: 'name', title: 'Name', dataIndex: 'name' as const },
          { key: 'role', title: 'Role', dataIndex: 'role' as const },
        ];
        const data = [
          { name: 'Alice', role: 'Engineer' },
          { name: 'Bob', role: 'Designer' },
        ];
        return (
          <DataGrid
            columns={cols}
            dataSource={data}
            expandable={{
              expandedRowRender: (record) => <p>Details for {record.name}</p>,
            }}
            pagination={false}
          />
        );
      },
    },
      {
      title: 'Minimal Variant',
      description: 'Data grid with a minimal visual variant.',
      render: () => { const cols = [{ key: 'name', title: 'Name' }, { key: 'role', title: 'Role' }]; const data = [{ name: 'Alice', role: 'Engineer' }, { name: 'Bob', role: 'Designer' }, { name: 'Carol', role: 'Manager' }]; return <DataGrid columns={cols} dataSource={data} variant="minimal" pagination={false} />; },
    },
    {
      title: 'Glass Variant',
      description: 'Data grid with a glassmorphism visual variant.',
      render: () => { const cols = [{ key: 'name', title: 'Name' }, { key: 'role', title: 'Role' }]; const data = [{ name: 'Alice', role: 'Engineer' }, { name: 'Bob', role: 'Designer' }, { name: 'Carol', role: 'Manager' }]; return <DataGrid columns={cols} dataSource={data} variant="glass" pagination={false} />; },
    },
    {
      title: 'With Pagination',
      description: 'Data grid with paginated rows and custom page size.',
      render: () => { const cols = [{ key: 'name', title: 'Name' }, { key: 'role', title: 'Role' }]; const data = [{ name: 'Alice', role: 'Engineer' }, { name: 'Bob', role: 'Designer' }, { name: 'Carol', role: 'Manager' }, { name: 'Dave', role: 'QA' }, { name: 'Eve', role: 'DevOps' }, { name: 'Frank', role: 'PM' }]; return <DataGrid columns={cols} dataSource={data} pagination={{ pageSize: 3, defaultCurrent: 1 }} />; },
    },
    {
      title: 'Row Selection',
      description: 'Data grid with row selection checkboxes.',
      render: () => { const cols = [{ key: 'name', title: 'Name' }, { key: 'role', title: 'Role' }]; const data = [{ name: 'Alice', role: 'Engineer' }, { name: 'Bob', role: 'Designer' }, { name: 'Carol', role: 'Manager' }]; return <DataGrid columns={cols} dataSource={data} rowSelection={{}} pagination={false} />; },
    },
    {
      title: 'Toolbar',
      description: 'Data grid with a custom toolbar action.',
      render: () => { const cols = [{ key: 'name', title: 'Name' }, { key: 'role', title: 'Role' }]; const data = [{ name: 'Alice', role: 'Engineer' }, { name: 'Bob', role: 'Designer' }]; return <DataGrid columns={cols} dataSource={data} toolbar={<Button size="small">Export</Button>} pagination={false} />; },
    },
],

  Form: [
    {
      title: 'Basic',
      description: 'Form layout and validation.',
      render: () => (
        <Form>
          <Input placeholder="Name" />
          <Input placeholder="Email" />
          <Button>Submit</Button>
        </Form>
      ),
    },
    {
      title: 'Vertical Layout',
      description: 'Form with vertical field layout.',
      render: () => (
        <Form layout="vertical">
          <Input placeholder="Username" />
          <Input placeholder="Password" type="password" />
          <Button>Submit</Button>
        </Form>
      ),
    },
    {
      title: 'Inline Layout',
      description: 'Form with horizontal inline field layout.',
      render: () => (
        <Form layout="inline">
          <Input placeholder="Username" />
          <Input placeholder="Password" type="password" />
          <Button>Submit</Button>
        </Form>
      ),
    },
      {
      title: 'Initial Values',
      description: 'Form populated with initial field values.',
      render: () => <Form initialValues={{ name: 'Alice', email: 'alice@example.com' }}><Input placeholder="Name" name="name" /><Input placeholder="Email" name="email" /><Button>Submit</Button></Form>,
    },
    {
      title: 'Horizontal Layout',
      description: 'Form with horizontal labels and wrapper columns.',
      render: () => <Form layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}><Input label="Name" placeholder="Name" /><Input label="Email" placeholder="Email" /><Button>Submit</Button></Form>,
    },
    {
      title: 'Disabled Form',
      description: 'Form that disables all child fields.',
      render: () => <Form disabled><Input placeholder="Name" /><Input placeholder="Email" /><Button disabled>Submit</Button></Form>,
    },
    {
      title: 'Compact Layout',
      description: 'Form using the compact layout variant.',
      render: () => <Form compact><Input placeholder="Name" /><Input placeholder="Email" /><Button>Submit</Button></Form>,
    },
    {
      title: 'Submit Callback',
      description: 'Form that calls a callback with values on successful submit.',
      render: () => <Form onFinish={(values) => alert(JSON.stringify(values))}><Input placeholder="Name" name="name" /><Input placeholder="Email" name="email" /><Button>Submit</Button></Form>,
    },
],

  CommandPalette: [
    {
      title: 'Basic',
      description: 'Keyboard-driven command search.',
      render: () => <CommandPaletteExample />,
    },
    {
      title: 'With Groups',
      description: 'Command palette with grouped items and a custom placeholder.',
      render: () => <CommandPaletteGroupsExample />,
    },
    {
      title: 'OnSelect Callback',
      description: 'Command palette with selectable items.',
      render: () => (
        <CommandPalette
          open={true}
          onClose={() => {}}
          items={[
            { id: '1', label: 'Copy', shortcut: '⌘C', onSelect: () => alert('Copy selected') },
            { id: '2', label: 'Paste', shortcut: '⌘V', onSelect: () => alert('Paste selected') },
          ]}
        />
      ),
    },
      {
      title: 'Open by Default',
      description: 'Command palette rendered open with rich actions and a custom search prompt.',
      render: () => (<CommandPalette open={true} onClose={() => {}} placeholder="Search actions..." items={[{ id: '1', label: 'Go to Dashboard', shortcut: '⌘D', onSelect: () => {} }, { id: '2', label: 'Open Settings', shortcut: '⌘,', onSelect: () => {} }, { id: '3', label: 'Toggle Theme', shortcut: '⌘T', onSelect: () => {} }]} />),
    },
    {
      title: 'Editor Shortcuts',
      description: 'Common text editor commands with keyboard shortcuts.',
      render: () => (<CommandPalette open={true} onClose={() => {}} placeholder="Find an editor command..." items={[{ id: '1', label: 'Find', shortcut: '⌘F', onSelect: () => {} }, { id: '2', label: 'Replace', shortcut: '⌘H', onSelect: () => {} }, { id: '3', label: 'Save File', shortcut: '⌘S', onSelect: () => {} }, { id: '4', label: 'Command Palette', shortcut: '⇧⌘P', onSelect: () => {} }]} />),
    },
    {
      title: 'Single Command',
      description: 'Minimal palette with one actionable command.',
      render: () => (<CommandPalette open={true} onClose={() => {}} placeholder="Type to run..." items={[{ id: '1', label: 'Run Build', shortcut: '⌘B', onSelect: () => {} }]} />),
    },
    {
      title: 'Project Actions',
      description: 'Palette scoped to project-level actions like deploy and archive.',
      render: () => (<CommandPalette open={true} onClose={() => {}} placeholder="Search project actions..." items={[{ id: '1', label: 'Deploy to Production', shortcut: '⌘D', onSelect: () => {} }, { id: '2', label: 'Run Tests', shortcut: '⌘T', onSelect: () => {} }, { id: '3', label: 'Open Documentation', onSelect: () => {} }, { id: '4', label: 'Archive Project', onSelect: () => {} }]} />),
    },
    {
      title: 'Search Without Shortcuts',
      description: 'Command items displayed without keyboard shortcut labels.',
      render: () => (<CommandPalette open={true} onClose={() => {}} placeholder="Search..." items={[{ id: '1', label: 'New File', onSelect: () => {} }, { id: '2', label: 'Open Recent', onSelect: () => {} }, { id: '3', label: 'Preferences', onSelect: () => {} }]} />),
    },
],

  AppBar: [
    {
      title: 'Basic',
      description: 'Top application bar.',
      render: () => <AppBar title="My App" />,
    },
    {
      title: 'With Actions',
      description: 'App bar with action buttons.',
      render: () => <AppBar title="Dashboard" actions={<Button size="small">Logout</Button>} />,
    },
    {
      title: 'Elevated',
      description: 'App bar with elevated shadow and menu button.',
      render: () => (
        <AppBar
          title="Settings"
          elevated={true}
          onMenuClick={() => {}}
          actions={
            <Button size="small" variant="secondary">
              Logout
            </Button>
          }
        />
      ),
    },
      {
      title: 'With Menu Button',
      description: 'App bar with a hamburger menu button for navigation.',
      render: () => <AppBar title="Products" onMenuClick={() => {}} />,
    },
    {
      title: 'Sticky Header',
      description: 'App bar positioned sticky with actions.',
      render: () => <AppBar title="Dashboard" position="sticky" actions={<Button size="small">Profile</Button>} />,
    },
    {
      title: 'Flat Style',
      description: 'App bar without elevation shadow for subtle headers.',
      render: () => <AppBar title="Flat Header" elevated={false} actions={<Button size="small" variant="ghost">Help</Button>} />,
    },
    {
      title: 'Custom Title Content',
      description: 'App bar title rendered as a React node with an icon and text.',
      render: () => <AppBar title={<Stack direction="row" gap={8} align="center"><Icon name="home" size={20} /><span>Home</span></Stack>} actions={<Button size="small">Logout</Button>} />,
    },
    {
      title: 'Fixed Navigation',
      description: 'Fixed-position app bar spanning the viewport with menu and actions.',
      render: () => <AppBar title="Fixed AppBar" position="fixed" onMenuClick={() => {}} actions={<Button size="small">Search</Button>} />,
    },
],

  FloatButton: [
    {
      title: 'Basic',
      description: 'Floating action button.',
      render: () => <FloatButton icon="+" />,
    },
    {
      title: 'Tooltip',
      description: 'Floating button with tooltip and position.',
      render: () => <FloatButton icon="?" tooltip="Help" position="bottom-left" />,
    },
    {
      title: 'Controlled Click',
      description: 'Floating button that updates a counter on click.',
      render: () => <ControlledFloatButtonExample />,
    },
      {
      title: 'Top Left',
      description: 'Floating action button placed in the top-left corner.',
      render: () => <FloatButton icon="+" position="top-left" tooltip="Add" />,
    },
    {
      title: 'Bottom Left',
      description: 'Floating help button anchored to the bottom-left.',
      render: () => <FloatButton icon="?" position="bottom-left" tooltip="Help" />,
    },
    {
      title: 'Action Menu',
      description: 'Floating button that expands into a small action menu.',
      render: () => <FloatButton icon="≡" menu={[{ icon: '✎', label: 'Edit', onClick: () => {} }, { icon: '⚙', label: 'Settings', onClick: () => {} }, { icon: '↶', label: 'Undo', onClick: () => {} }]} />,
    },
    {
      title: 'Menu with Disabled Item',
      description: 'Floating menu containing one disabled menu item.',
      render: () => <FloatButton icon="≡" tooltip="More" menu={[{ icon: '✎', label: 'Edit', onClick: () => {} }, { icon: '✕', label: 'Delete', disabled: true, onClick: () => {} }]} />,
    },
    {
      title: 'Primary Add Button',
      description: 'Primary floating action button with a plus icon and click handler.',
      render: () => <FloatButton icon="+" position="bottom-right" tooltip="Create" onClick={() => {}} />,
    },
],

  ScrollArea: [
    {
      title: 'Basic',
      description: 'Custom scrollable container.',
      render: () => (
        <ScrollArea style={{ height: 120, width: 200 }}>
          <div style={{ height: 400 }}>Scrollable content</div>
        </ScrollArea>
      ),
    },
    {
      title: 'Horizontal',
      description: 'Horizontal scrollable container.',
      render: () => (
        <ScrollArea horizontal style={{ width: 300 }}>
          <div style={{ width: 600, whiteSpace: 'nowrap' }}>
            Long horizontal content that scrolls...
          </div>
        </ScrollArea>
      ),
    },
    {
      title: 'Auto Hide',
      description: 'Scrollable container with auto-hiding scrollbar.',
      render: () => (
        <ScrollArea autoHide style={{ height: 120, width: 200 }}>
          <div style={{ height: 400 }}>Hover to reveal the scrollbar.</div>
        </ScrollArea>
      ),
    },
      {
      title: 'Bounded Max Height',
      description: 'Scrollable container constrained by a max height with several cards.',
      render: () => (<div style={{ width: 260 }}><ScrollArea maxHeight={150}><Stack direction="column" gap={12}>{[1, 2, 3, 4, 5].map((i) => (<Card key={i} style={{ padding: 14 }}>Card {i}</Card>))}</Stack></ScrollArea></div>),
    },
    {
      title: 'Card List',
      description: 'A vertical list of cards inside a custom scroll area.',
      render: () => (<div style={{ width: 260 }}><ScrollArea maxHeight={160}><Stack direction="column" gap={12}>{['Design', 'Code', 'Review', 'Deploy', 'Ship'].map((label) => (<Card key={label} style={{ padding: 14 }}>{label}</Card>))}</Stack></ScrollArea></div>),
    },
    {
      title: 'Hidden Scrollbars',
      description: 'Scrollbars that auto-hide when the user is not interacting.',
      render: () => (<div style={{ width: 260 }}><ScrollArea autoHide maxHeight={120}><Stack direction="column" gap={12}>{[1, 2, 3, 4].map((i) => (<Card key={i} style={{ padding: 14 }}>Item {i}</Card>))}</Stack></ScrollArea></div>),
    },
    {
      title: 'Horizontal Tag Strip',
      description: 'Horizontally scrolling row of tags inside a scroll area.',
      render: () => (<div style={{ width: 320 }}><ScrollArea horizontal><div style={{ width: 600, display: 'flex', gap: 8, padding: 8 }}>{['React', 'Vue', 'Angular', 'Svelte', 'Solid', 'Preact'].map((t) => (<Tag key={t}>{t}</Tag>))}</div></ScrollArea></div>),
    },
    {
      title: 'Custom Styled Container',
      description: 'Scroll area with a custom className and visible card content.',
      render: () => (<div style={{ width: 260 }}><ScrollArea className="demo-scroll" maxHeight={140}><Stack direction="column" gap={12}>{[1, 2, 3].map((i) => (<Card key={i} style={{ padding: 14 }}>Row {i}</Card>))}</Stack></ScrollArea></div>),
    },
],

  Grid: [
    {
      title: 'Basic',
      description: 'Responsive grid system.',
      render: () => (
        <Grid columns={3} gap={12}>
          <Card>Item 1</Card>
          <Card>Item 2</Card>
          <Card>Item 3</Card>
        </Grid>
      ),
    },
    {
      title: 'Min Child Width',
      description: 'Responsive grid with a minimum child width.',
      render: () => (
        <Grid minChildWidth={120} gap={12}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Card key={n} style={{ padding: 16, textAlign: 'center' }}>
              {n}
            </Card>
          ))}
        </Grid>
      ),
    },
    {
      title: 'Fluid Columns',
      description: 'Grid with responsive column count and larger gap.',
      render: () => (
        <Grid columns={{ base: 1, md: 2, lg: 4 }} gap={24}>
          {[1, 2, 3, 4].map((n) => (
            <Card key={n} style={{ padding: 16, textAlign: 'center' }}>
              {n}
            </Card>
          ))}
        </Grid>
      ),
    },
      {
      title: 'Two Columns',
      description: 'A simple two-column grid layout.',
      render: () => (<Grid columns={2} gap={16}>{[1, 2, 3, 4].map((n) => (<Card key={n} style={{ padding: 16, textAlign: 'center' }}>{n}</Card>))}</Grid>),
    },
    {
      title: 'Four Columns',
      description: 'A tight four-column grid with smaller gaps.',
      render: () => (<Grid columns={4} gap={8}>{['A', 'B', 'C', 'D'].map((n) => (<Card key={n} style={{ padding: 16, textAlign: 'center' }}>{n}</Card>))}</Grid>),
    },
    {
      title: 'Large Gap',
      description: 'Grid with a large gap between items.',
      render: () => (<Grid columns={3} gap={40}>{[1, 2, 3].map((n) => (<Card key={n} style={{ padding: 16, textAlign: 'center' }}>{n}</Card>))}</Grid>),
    },
    {
      title: 'Auto Fit Cards',
      description: 'Responsive grid that auto-fits cards based on a minimum child width.',
      render: () => (<Grid minChildWidth={120} gap={12}>{[1, 2, 3, 4, 5, 6].map((n) => (<Card key={n} style={{ padding: 16, textAlign: 'center' }}>{n}</Card>))}</Grid>),
    },
    {
      title: 'Mixed Column Sizing',
      description: 'Grid using a custom CSS track sizing string for uneven columns.',
      render: () => (<Grid columns="1fr 2fr 1fr" gap={16}>{['Sidebar', 'Main', 'Sidebar'].map((label, i) => (<Card key={i} style={{ padding: 16, textAlign: 'center' }}>{label}</Card>))}</Grid>),
    },
],

  Tour: [
    {
      title: 'Basic',
      description: 'Guided product tour.',
      render: () => <TourExample />,
    },
    {
      title: 'Multi-Step',
      description: 'Guided tour with multiple steps and finish callback.',
      render: () => <TourMultiStepExample />,
    },
    {
      title: 'Placements',
      description: 'Tour steps with different tooltip placements.',
      render: () => (
        <Tour
          open={false}
          onClose={() => {}}
          steps={[
            { target: '#demo', title: 'Top', description: 'Step placed above.', placement: 'top' },
            {
              target: '#demo',
              title: 'Left',
              description: 'Step placed to the left.',
              placement: 'left',
            },
          ]}
        />
      ),
    },
      {
      title: 'Finish Callback',
      description: 'Tour that triggers a callback when the final step is completed.',
      render: () => <Tour open={true} onClose={() => {}} onFinish={() => {}} steps={[{ target: '#demo', title: 'Welcome', description: 'Start your guided tour.' }, { target: '#demo', title: 'Finish', description: 'Complete the tour to continue.' }]} />,
    },
    {
      title: 'Single Step',
      description: 'Tour with only one highlighted step.',
      render: () => <Tour open={true} onClose={() => {}} steps={[{ target: '#demo', title: 'Single Highlight', description: 'This is the only step in the tour.', placement: 'bottom' }]} />,
    },
    {
      title: 'Bottom Placement',
      description: 'Tour step positioned below the target element.',
      render: () => <Tour open={true} onClose={() => {}} steps={[{ target: '#demo', title: 'Below Target', description: 'This tooltip appears below the target.', placement: 'bottom' }]} />,
    },
    {
      title: 'Right Aligned',
      description: 'Tour step aligned to the right of the target.',
      render: () => <Tour open={true} onClose={() => {}} steps={[{ target: '#demo', title: 'Right Side', description: 'This tooltip appears to the right.', placement: 'right' }]} />,
    },
    {
      title: 'Inline Tour',
      description: 'Compact two-step tour rendered inline for small flows.',
      render: () => <Tour open={true} onClose={() => {}} steps={[{ target: '#demo', title: 'Step 1', description: 'First step of the flow.' }, { target: '#demo', title: 'Step 2', description: 'Second and final step.' }]} />,
    },
],

  AIChat: [
    {
      title: 'Basic',
      description: 'AI chat interface.',
      render: () => (
        <AIChat
          messages={[
            { role: 'user', content: 'Hello!' },
            { role: 'assistant', content: 'Hi! How can I help you today?' },
          ]}
        />
      ),
    },
    {
      title: 'Loading',
      description: 'Chat interface in a loading state.',
      render: () => (
        <AIChat
          messages={[{ role: 'user', content: 'Hello!' }]}
          onSend={() => {}}
          isLoading={true}
          placeholder="Type a message..."
        />
      ),
    },
    {
      title: 'Streaming',
      description: 'Chat interface streaming an assistant response.',
      render: () => (
        <AIChat
          messages={[
            { role: 'user', content: 'Write a haiku' },
            { role: 'assistant', content: 'Code flows like a stream...' },
          ]}
          isStreaming={true}
          placeholder="Type a message..."
        />
      ),
    },
      {
      title: 'Empty Chat',
      description: 'AI chat interface with no messages and a custom placeholder.',
      render: () => <AIChat messages={[]} onSend={() => {}} placeholder="Ask the assistant anything..." />,
    },
    {
      title: 'Conversation History',
      description: 'Chat showing a longer back-and-forth conversation.',
      render: () => <AIChat messages={[{ role: 'user', content: 'What is react-n-design?' }, { role: 'assistant', content: 'It is a modern React component library.' }, { role: 'user', content: 'Is it accessible?' }, { role: 'assistant', content: 'Yes, every component follows WCAG guidelines.' }]} onSend={() => {}} />,
    },
    {
      title: 'Custom Placeholder',
      description: 'Chat with a tailored input placeholder for coding help.',
      render: () => <AIChat messages={[{ role: 'user', content: 'Refactor this function' }]} onSend={() => {}} placeholder="Paste code or ask a question..." />,
    },
    {
      title: 'Messages with IDs',
      description: 'Chat messages provided with unique IDs for stable keys and actions.',
      render: () => <AIChat messages={[{ id: 'm1', role: 'user', content: 'Hello!' }, { id: 'm2', role: 'assistant', content: 'Hi there, how can I help?' }]} onSend={() => {}} />,
    },
    {
      title: 'Loading and Streaming',
      description: 'Chat interface showing both streaming and loading indicators at once.',
      render: () => <AIChat messages={[{ role: 'user', content: 'Write a poem' }, { role: 'assistant', content: 'Roses are red...' }]} onSend={() => {}} isLoading={true} isStreaming={true} placeholder="Type a message..." />,
    },
],

  PromptInput: [
    {
      title: 'Basic',
      description: 'AI prompt text field with send.',
      render: () => <PromptInput value="" onSend={() => {}} placeholder="Ask anything…" />,
    },
    {
      title: 'Controlled',
      description: 'Interactive prompt input with React state.',
      render: () => <ControlledPromptInputExample />,
    },
    {
      title: 'Loading',
      description: 'Prompt input in a loading state with max length.',
      render: () => (
        <PromptInput
          value=""
          onSend={() => {}}
          isLoading={true}
          maxLength={100}
          placeholder="Ask anything…"
        />
      ),
    },
      {
      title: 'Max Length',
      description: 'Prompt input limited to a maximum number of characters.',
      render: () => <PromptInput value="" onChange={() => {}} onSend={() => {}} maxLength={50} placeholder="Brief prompt..." />,
    },
    {
      title: 'Token Counter',
      description: 'Prompt input with a visible token budget and count.',
      render: () => <PromptInput value="Summarize this document" onChange={() => {}} onSend={() => {}} showTokenCount={true} maxTokens={20} tokenLabel="tokens" />,
    },
    {
      title: 'Slash Commands',
      description: 'Prompt input with slash command suggestions for common actions.',
      render: () => <PromptInput value="/" onChange={() => {}} onSend={() => {}} slashCommands={[{ command: '/summarize', description: 'Summarize selection' }, { command: '/translate', description: 'Translate text' }]} placeholder="Type / for commands..." />,
    },
    {
      title: 'Mention Targets',
      description: 'Prompt input configured with mentionable users.',
      render: () => <PromptInput value="@" onChange={() => {}} onSend={() => {}} mentionTargets={[{ id: '1', name: 'Alice' }, { id: '2', name: 'Bob' }]} placeholder="Type @ to mention..." />,
    },
    {
      title: 'Disabled',
      description: 'Prompt input in a non-editable disabled state.',
      render: () => <PromptInput value="This input is disabled" onChange={() => {}} onSend={() => {}} disabled={true} placeholder="Cannot type..." />,
    },
],

  SuggestionChips: [
    {
      title: 'Basic',
      description: 'Prompt suggestion chips.',
      render: () => (
        <SuggestionChips
          suggestions={[
            { id: '1', label: 'Explain quantum computing' },
            { id: '2', label: 'Write a poem' },
          ]}
          onAccept={() => {}}
        />
      ),
    },
    {
      title: 'With Reject',
      description: 'Suggestion chips with accept and reject handlers.',
      render: () => (
        <SuggestionChips
          suggestions={[
            { id: '1', label: 'Summarize' },
            { id: '2', label: 'Translate' },
          ]}
          onAccept={() => {}}
          onReject={() => {}}
          onAcceptAll={() => {}}
          onRejectAll={() => {}}
        />
      ),
    },
    {
      title: 'Compact',
      description: 'Compact suggestion chips without reject actions.',
      render: () => (
        <SuggestionChips
          suggestions={[
            { id: '1', label: 'Explain' },
            { id: '2', label: 'Summarize' },
            { id: '3', label: 'Translate' },
          ]}
          onAccept={() => {}}
          compact={true}
        />
      ),
    },
      {
      title: 'Full Actions',
      description: 'Suggestion chips with accept/reject handlers for each chip and bulk actions.',
      render: () => (
        <SuggestionChips
          suggestions={[
            { id: '1', label: 'Summarize this article' },
            { id: '2', label: 'Translate to Spanish' },
            { id: '3', label: 'Rewrite more formally' },
          ]}
          onAccept={() => {}}
          onReject={() => {}}
          onAcceptAll={() => {}}
          onRejectAll={() => {}}
        />
      ),
    },
    {
      title: 'Inline Wrap',
      description: 'Many suggestion chips arranged in a wrapping row.',
      render: () => (
        <div style={{ maxWidth: 420 }}>
          <SuggestionChips
            suggestions={[
              { id: '1', label: 'Explain' },
              { id: '2', label: 'Compare' },
              { id: '3', label: 'Examples' },
              { id: '4', label: 'Pros & cons' },
              { id: '5', label: 'Simplify' },
              { id: '6', label: 'Code' },
            ]}
            onAccept={() => {}}
            onReject={() => {}}
          />
        </div>
      ),
    },
    {
      title: 'Short Prompts',
      description: 'Compact one-word suggestion chips for quick actions.',
      render: () => (
        <SuggestionChips
          suggestions={[
            { id: '1', label: 'Yes' },
            { id: '2', label: 'No' },
            { id: '3', label: 'Maybe' },
            { id: '4', label: 'Later' },
          ]}
          onAccept={() => {}}
          onReject={() => {}}
        />
      ),
    },
    {
      title: 'Rich Suggestions',
      description: 'Longer, descriptive suggestion labels that explain the action.',
      render: () => (
        <SuggestionChips
          suggestions={[
            { id: '1', label: 'Generate a unit test for this function' },
            { id: '2', label: 'Refactor the code to use async/await' },
            { id: '3', label: 'Add JSDoc comments to the public API' },
          ]}
          onAccept={() => {}}
          onReject={() => {}}
        />
      ),
    },
    {
      title: 'Bulk Actions Only',
      description: 'Suggestion chips that only expose accept all and reject all actions.',
      render: () => (
        <SuggestionChips
          suggestions={[
            { id: '1', label: 'Apply all fixes' },
            { id: '2', label: 'Update all dependencies' },
          ]}
          onAccept={() => {}}
          onReject={() => {}}
          onAcceptAll={() => {}}
          onRejectAll={() => {}}
        />
      ),
    },
],

  MentionInput: [
    {
      title: 'Basic',
      description: '@mention autocomplete.',
      render: () => (
        <MentionInput options={[{ id: '1', label: 'Alice', value: 'alice' }]} value="" />
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive mention input with React state.',
      render: () => <ControlledMentionInputExample />,
    },
    {
      title: 'Multiple Users',
      description: 'Mention input with several user options.',
      render: () => (
        <MentionInput
          options={[
            { id: '1', label: 'Alice', value: 'alice' },
            { id: '2', label: 'Bob', value: 'bob' },
            { id: '3', label: 'Carol', value: 'carol' },
          ]}
          value=""
          placeholder="Type @ to mention"
        />
      ),
    },
    {
      title: 'Single User',
      description: 'Mention input with only one available option.',
      render: () => (
        <MentionInput
          value=""
          onChange={() => {}}
          options={[{ id: '1', label: 'Alice', value: 'alice' }]}
          placeholder="Type @alice to mention"
        />
      ),
    },
    {
      title: 'Large Team',
      description: 'Mention input populated with a long list of team members.',
      render: () => (
        <MentionInput
          value=""
          onChange={() => {}}
          options={[
            { id: '1', label: 'Alice Chen', value: 'alice' },
            { id: '2', label: 'Bob Davis', value: 'bob' },
            { id: '3', label: 'Carol Evans', value: 'carol' },
            { id: '4', label: 'Dave Foster', value: 'dave' },
            { id: '5', label: 'Eve Garcia', value: 'eve' },
            { id: '6', label: 'Frank Hall', value: 'frank' },
          ]}
          placeholder="@mention a teammate"
        />
      ),
    },
    {
      title: 'Custom Placeholder',
      description: 'Mention input with a task-specific placeholder.',
      render: () => (
        <MentionInput
          value=""
          onChange={() => {}}
          options={[
            { id: '1', label: 'Design', value: 'design' },
            { id: '2', label: 'Engineering', value: 'engineering' },
            { id: '3', label: 'Product', value: 'product' },
          ]}
          placeholder="Type @ to assign an owner"
        />
      ),
    },
    {
      title: 'Prefilled Value',
      description: 'Mention input initialized with an existing mention.',
      render: () => (
        <MentionInput
          value="Thanks @alice for the review!"
          onChange={() => {}}
          options={[
            { id: '1', label: 'Alice', value: 'alice' },
            { id: '2', label: 'Bob', value: 'bob' },
            { id: '3', label: 'Carol', value: 'carol' },
          ]}
        />
      ),
    },
    {
      title: 'Wide Input',
      description: 'Mention input stretched to fill a wider container using a className.',
      render: () => (
        <MentionInput
          value=""
          onChange={() => {}}
          options={[
            { id: '1', label: 'Alice', value: 'alice' },
            { id: '2', label: 'Bob', value: 'bob' },
          ]}
          placeholder="Type @ to mention"
          className="mention-wide"
        />
      ),
    },
],

  Accordion: [
    {
      title: 'Basic',
      description: 'Simple collapsible panels.',
      render: () => (
        <Accordion
          items={[
            {
              key: '1',
              label: 'What is react-n-design?',
              children: 'A modern neomorphic React component library.',
            },
            {
              key: '2',
              label: 'Is it accessible?',
              children: 'Yes, all components follow WCAG guidelines.',
            },
          ]}
        />
      ),
    },
    {
      title: 'Multiple Open',
      description: 'Allow multiple panels open at once.',
      render: () => (
        <Accordion
          multiple
          defaultActiveKey={['1']}
          items={[
            { key: '1', label: 'Panel A', children: 'Content for panel A.' },
            { key: '2', label: 'Panel B', children: 'Content for panel B.' },
            { key: '3', label: 'Panel C', children: 'Content for panel C.' },
          ]}
        />
      ),
    },
    {
      title: 'Controlled',
      description: 'Accordion controlled by React state.',
      render: () => <ControlledAccordionExample />,
    },
      {
      title: 'Minimal Variant',
      description: 'Borderless accordion with a minimal visual style.',
      render: () => (
        <Accordion
          variant="minimal"
          items={[
            { key: '1', label: 'General', children: 'General account settings.' },
            { key: '2', label: 'Security', children: 'Password and two-factor options.' },
            { key: '3', label: 'Notifications', children: 'Email and push notification preferences.' },
          ]}
        />
      ),
    },
    {
      title: 'Glass Variant',
      description: 'Accordion with a glassmorphism backdrop blur style.',
      render: () => (
        <Accordion
          variant="glass"
          items={[
            { key: '1', label: 'Overview', children: 'High-level project overview.' },
            { key: '2', label: 'Metrics', children: 'Performance and usage metrics.' },
            { key: '3', label: 'Logs', children: 'Recent activity logs.' },
          ]}
        />
      ),
    },
    {
      title: 'Borderless',
      description: 'Accordion with borders hidden for a cleaner look.',
      render: () => (
        <Accordion
          bordered={false}
          items={[
            { key: '1', label: 'Plan', children: 'Choose the right plan for your team.' },
            { key: '2', label: 'Billing', children: 'Manage invoices and payment methods.' },
            { key: '3', label: 'Usage', children: 'Review current resource usage.' },
          ]}
        />
      ),
    },
    {
      title: 'Staggered Entry',
      description: 'Accordion items animate in with a staggered entrance effect.',
      render: () => (
        <Accordion
          stagger={true}
          staggerDelay={0.1}
          items={[
            { key: '1', label: 'Step 1', children: 'Define the problem statement.' },
            { key: '2', label: 'Step 2', children: 'Collect relevant data and constraints.' },
            { key: '3', label: 'Step 3', children: 'Iterate on a solution.' },
          ]}
        />
      ),
    },
    {
      title: 'Default Expanded',
      description: 'Accordion with the first panel open by default.',
      render: () => (
        <Accordion
          defaultActiveKey="1"
          items={[
            { key: '1', label: 'Getting started', children: 'Welcome! Here is how to begin.' },
            { key: '2', label: 'Configuration', children: 'Set up your environment variables.' },
            { key: '3', label: 'Deployment', children: 'Deploy to your preferred platform.' },
          ]}
        />
      ),
    },
],

  MultiSelect: [
    {
      title: 'Basic',
      description: 'Select multiple options from a dropdown.',
      render: () => (
        <MultiSelect
          options={['React', 'Vue', 'Angular', 'Svelte']}
          placeholder="Pick frameworks"
        />
      ),
    },
    {
      title: 'Pre-selected',
      description: 'Options already selected on mount.',
      render: () => (
        <MultiSelect
          options={['Red', 'Green', 'Blue']}
          value={['Red', 'Blue']}
          placeholder="Pick colors"
        />
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive multi-select with React state.',
      render: () => <ControlledMultiSelectExample />,
    },
    {
      title: 'Compact Dropdown',
      description: 'Multi-select with a smaller dropdown max height for tight spaces.',
      render: () => (
        <MultiSelect
          options={[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          placeholder="Select months"
          maxHeight={120}
        />
      ),
    },
    {
      title: 'Disabled',
      description: 'Multi-select in a non-interactive disabled state.',
      render: () => (
        <MultiSelect
          options={['React', 'Vue', 'Angular']}
          value={['React']}
          disabled={true}
          placeholder="Pick frameworks"
        />
      ),
    },
    {
      title: 'Tall Dropdown',
      description: 'Multi-select with an increased dropdown max height.',
      render: () => (
        <MultiSelect
          options={[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ]}
          placeholder="Select months"
          maxHeight={220}
        />
      ),
    },
    {
      title: 'Custom Placeholder',
      description: 'Multi-select with a tailored placeholder for skill selection.',
      render: () => (
        <MultiSelect
          options={['TypeScript', 'React', 'Node.js', 'CSS', 'Accessibility']}
          placeholder="Choose your skills"
        />
      ),
    },
    {
      title: 'Single Option',
      description: 'Multi-select with only one available option.',
      render: () => (
        <MultiSelect options={['Only option']} placeholder="Select an option" />
      ),
    },
],

  Resizable: [
    {
      title: 'Horizontal',
      description: 'Split panels side by side.',
      render: () => (
        <Resizable direction="horizontal" defaultSize="50%">
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            Left Panel
          </div>
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            Right Panel
          </div>
        </Resizable>
      ),
    },
    {
      title: 'Vertical',
      description: 'Vertically resizable panels.',
      render: () => (
        <Resizable direction="vertical" defaultSize="40%">
          <div style={{ padding: 16 }}>Top Panel</div>
          <div style={{ padding: 16 }}>Bottom Panel</div>
        </Resizable>
      ),
    },
    {
      title: 'Constrained',
      description: 'Resizable panels with min and max size limits.',
      render: () => (
        <Resizable direction="horizontal" defaultSize="50%" minSize={100} maxSize={400}>
          <div style={{ padding: 16 }}>Left</div>
          <div style={{ padding: 16 }}>Right</div>
        </Resizable>
      ),
    },
      {
      title: 'Third Split',
      description: 'Horizontal panels with the first panel starting at one third.',
      render: () => (
        <Resizable direction="horizontal" defaultSize="33%">
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            Narrow panel
          </div>
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            Wide panel
          </div>
        </Resizable>
      ),
    },
    {
      title: 'Fixed Pixel Start',
      description: 'Resizable panels with a fixed pixel default for the first panel.',
      render: () => (
        <Resizable direction="horizontal" defaultSize={180}>
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            180px start
          </div>
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            Remaining space
          </div>
        </Resizable>
      ),
    },
    {
      title: 'Size Change Callback',
      description: 'Resizable panels that log size changes as the divider moves.',
      render: () => (
        <Resizable direction="horizontal" defaultSize="50%" onSizeChange={() => {}}>
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            Left
          </div>
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            Right
          </div>
        </Resizable>
      ),
    },
    {
      title: 'Narrow Range',
      description: 'Resizable panels constrained within a small size range.',
      render: () => (
        <Resizable direction="horizontal" defaultSize={160} minSize={120} maxSize={240}>
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            Bounded
          </div>
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            Flexible
          </div>
        </Resizable>
      ),
    },
    {
      title: 'Vertical Panels',
      description: 'Vertically resizable panels with a 60/40 starting split.',
      render: () => (
        <Resizable direction="vertical" defaultSize="60%">
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            Top panel
          </div>
          <div style={{ padding: 16, background: 'var(--n-color-card-bg)', borderRadius: 8 }}>
            Bottom panel
          </div>
        </Resizable>
      ),
    },
],

  ColorPicker: [
    {
      title: 'Basic',
      description: 'Pick a color with preset swatches.',
      render: () => <ColorPicker value="#6d5dfc" />,
    },
    {
      title: 'Controlled',
      description: 'Interactive color picker with React state.',
      render: () => <ControlledColorPickerExample />,
    },
    {
      title: 'Disabled',
      description: 'Color picker in a disabled state.',
      render: () => <ColorPicker value="#ff6b6b" disabled={true} />,
    },
    {
      title: 'Form Row',
      description: 'Color picker aligned with a label in a form layout.',
      render: () => (
        <Stack direction="row" gap={16} align="center">
          <span style={{ fontSize: '0.9375rem', color: 'var(--n-color-text-secondary)' }}>Brand color</span>
          <ColorPicker value="#6d5dfc" presets={['#6d5dfc', '#0ea5e9', '#10b981', '#f59e0b']} />
        </Stack>
      ),
    },
    {
      title: 'Custom Presets',
      description: 'Color picker with a curated set of brand presets.',
      render: () => (
        <ColorPicker
          value="#0ea5e9"
          presets={['#ef4444', '#f97316', '#f59e0b', '#22c55e', '#0ea5e9', '#8b5cf6']}
        />
      ),
    },
    {
      title: 'No Input',
      description: 'Color picker showing only swatches without the manual input.',
      render: () => (
        <ColorPicker value="#10b981" showInput={false} presets={['#10b981', '#06b6d4', '#3b82f6']} />
      ),
    },
    {
      title: 'Warm Palette',
      description: 'Color picker restricted to warm color swatches.',
      render: () => (
        <ColorPicker
          value="#f97316"
          presets={['#7f1d1d', '#b91c1c', '#ef4444', '#f97316', '#f59e0b', '#eab308']}
        />
      ),
    },
    {
      title: 'Default Open Swatches',
      description: 'Color picker initialized to a neutral gray value.',
      render: () => (
        <ColorPicker
          value="#64748b"
          presets={['#0f172a', '#334155', '#64748b', '#94a3b8', '#e2e8f0', '#f8fafc']}
        />
      ),
    },
],

  FileUpload: [
    {
      title: 'Basic',
      description: 'Drag and drop file upload area.',
      render: () => <FileUpload accept="image/*" />,
    },
    {
      title: 'Controlled',
      description: 'Interactive file upload with React state.',
      render: () => <ControlledFileUploadExample />,
    },
    {
      title: 'Multiple Restricted',
      description: 'File upload accepting multiple PDF files only.',
      render: () => <FileUpload accept=".pdf" multiple maxFiles={3} />,
    },
    {
      title: 'Validation Error',
      description: 'File upload with a strict size limit to demonstrate error feedback.',
      render: () => (
        <FileUpload
          accept="image/*"
          maxSize={1024}
          multiple={false}
        />
      ),
    },
    {
      title: 'Single Document',
      description: 'File upload accepting a single PDF document.',
      render: () => (
        <FileUpload accept=".pdf" multiple={false} />
      ),
    },
    {
      title: 'Size Limit',
      description: 'File upload with a maximum file size of 2MB.',
      render: () => (
        <FileUpload accept="image/*" maxSize={2 * 1024 * 1024} />
      ),
    },
    {
      title: 'Upload Progress',
      description: 'File upload showing simulated progress for queued files.',
      render: () => (
        <FileUpload
          accept=".zip"
          multiple
          uploadProgress={{ 'archive.zip': 65, 'data.zip': 30 }}
        />
      ),
    },
    {
      title: 'Spreadsheet Upload',
      description: 'File upload configured for CSV spreadsheet files.',
      render: () => (
        <FileUpload accept=".csv" multiple />
      ),
    },
],

  ComboBox: [
    {
      title: 'Basic',
      description: 'Autocomplete with search.',
      render: () => (
        <ComboBox
          options={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' },
          ]}
          placeholder="Search framework..."
        />
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive combo box with React state.',
      render: () => <ControlledComboBoxExample />,
    },
    {
      title: 'Disabled',
      description: 'Combo box that cannot be edited.',
      render: () => (
        <ComboBox options={[{ value: 'react', label: 'React' }]} value="react" disabled={true} />
      ),
    },
      {
      title: 'Multi-select',
      description: 'Combo box allowing multiple selections with tags.',
      render: () => (<ComboBox mode="multiple" defaultValue={['react']} options={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'angular', label: 'Angular' }, { value: 'svelte', label: 'Svelte' }]} placeholder="Pick frameworks" />),
    },
    {
      title: 'Loading with Clear',
      description: 'Combo box showing a loading spinner with a clear button.',
      render: () => (<ComboBox loading allowClear options={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }]} placeholder="Loading options..." />),
    },
    {
      title: 'Allow Create',
      description: 'Combo box that lets users create a new option when no match is found.',
      render: () => (<ComboBox allowCreate options={[{ value: 'new-york', label: 'New York' }, { value: 'los-angeles', label: 'Los Angeles' }]} placeholder="Search or create a city" />),
    },
    {
      title: 'With Label and Error',
      description: 'Combo box with an accessible label and an error message.',
      render: () => (<ComboBox label="Assignee" error="Please select an assignee" id="assignee-combobox" options={[{ value: 'alice', label: 'Alice' }, { value: 'bob', label: 'Bob' }]} placeholder="Select assignee" />),
    },
    {
      title: 'Custom Filter',
      description: 'Combo box filtering options by value instead of label.',
      render: () => (<ComboBox filterOption={(input, option) => option.value.toLowerCase().includes(input.toLowerCase())} onSearch={() => {}} options={[{ value: 'react', label: 'React' }, { value: 'vue', label: 'Vue' }, { value: 'angular', label: 'Angular' }]} placeholder="Filter by value" />),
    },
],

  VisuallyHidden: [
    {
      title: 'Basic',
      description: 'Screen-reader only text attached to a visible element.',
      render: () => (
        <Button aria-label="Close dialog">
          <VisuallyHidden>Close dialog</VisuallyHidden>×
        </Button>
      ),
    },
    {
      title: 'With Description',
      description: 'Visually hidden description linked to a visible input.',
      render: () => (
        <>
          <label htmlFor="search" style={{ display: 'block', marginBottom: 8 }}>
            Search
          </label>
          <VisuallyHidden>Start typing to search the site</VisuallyHidden>
          <Input id="search" placeholder="Search…" />
        </>
      ),
    },
    {
      title: 'Table Caption',
      description: 'Visually hidden caption for an accessible table.',
      render: () => (
        <>
          <VisuallyHidden>Monthly sales report by region</VisuallyHidden>
          <Table
            columns={[
              { key: 'region', title: 'Region', dataIndex: 'region' as const },
              { key: 'sales', title: 'Sales', dataIndex: 'sales' as const },
            ]}
            dataSource={[
              { region: 'North', sales: '$12,000' },
              { region: 'South', sales: '$8,500' },
            ]}
            pagination={false}
          />
        </>
      ),
    },
      {
      title: 'Form Hint',
      description: 'Hidden helper text that describes password requirements.',
      render: () => (<><label htmlFor="password" style={{ display: 'block', marginBottom: 8 }}>Password</label><VisuallyHidden>Must be at least 8 characters with a number and symbol.</VisuallyHidden><Input id="password" type="password" placeholder="Enter password" /></>),
    },
    {
      title: 'Status Update',
      description: 'Hidden status message for screen-reader users.',
      render: () => (<Card style={{ padding: 16, width: 260 }}><p style={{ margin: 0 }}>Saved</p><VisuallyHidden>Your changes have been saved successfully.</VisuallyHidden></Card>),
    },
    {
      title: 'Button Context',
      description: 'Hidden context inside an icon-only button.',
      render: () => (<Button aria-label="Close"><VisuallyHidden>Close notification</VisuallyHidden><Icon name="times" size={16} /></Button>),
    },
    {
      title: 'Link Description',
      description: 'Hidden descriptive text for an external link.',
      render: () => (<><a href="https://example.com">Documentation</a><VisuallyHidden>Opens in a new tab</VisuallyHidden></>),
    },
    {
      title: 'Skip Instructions',
      description: 'Hidden instructions for keyboard navigation shortcuts.',
      render: () => (<VisuallyHidden>Press Shift plus question mark to open the keyboard shortcuts dialog.</VisuallyHidden>),
    },
],

  VirtualList: [
    {
      title: 'Basic',
      description: 'Efficiently render a long list.',
      render: () => (
        <VirtualList
          items={Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)}
          itemHeight={40}
          renderItem={(item) => <div style={{ padding: '8px 12px' }}>{item}</div>}
          containerHeight={200}
        />
      ),
    },
    {
      title: 'Overscan',
      description: 'Virtual list with increased overscan.',
      render: () => (
        <VirtualList
          items={Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`)}
          itemHeight={40}
          renderItem={(item) => <div style={{ padding: '8px 12px' }}>{item}</div>}
          containerHeight={200}
          overscan={5}
        />
      ),
    },
    {
      title: 'Horizontal',
      description: 'Virtualized horizontal list.',
      render: () => (
        <VirtualList
          items={Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)}
          itemHeight={40}
          renderItem={(item) => <div style={{ padding: '8px 12px', minWidth: 120 }}>{item}</div>}
          containerHeight={200}
          direction="horizontal"
        />
      ),
    },
      {
      title: 'Tall Items',
      description: 'Virtual list rendering taller list rows.',
      render: () => (<VirtualList items={Array.from({ length: 500 }, (_, i) => `Item ${i + 1}`)} itemHeight={60} containerHeight={240} renderItem={(item) => <div style={{ padding: '16px 12px' }}>{item}</div>} />),
    },
    {
      title: 'Sticky Headers',
      description: 'Virtual list with sticky headers at specific indices.',
      render: () => (<VirtualList items={Array.from({ length: 200 }, (_, i) => `Task ${i + 1}`)} itemHeight={40} containerHeight={200} stickyHeaders={[{ index: 0, height: 40 }, { index: 50, height: 40 }, { index: 100, height: 40 }]} renderItem={(item) => <div style={{ padding: '8px 12px' }}>{item}</div>} />),
    },
    {
      title: 'Scroll Callback',
      description: 'Virtual list reporting scroll position via a callback.',
      render: () => (<VirtualList items={Array.from({ length: 1000 }, (_, i) => `Row ${i + 1}`)} itemHeight={40} containerHeight={200} onScroll={(scrollTop) => console.log(scrollTop)} renderItem={(item) => <div style={{ padding: '8px 12px' }}>{item}</div>} />),
    },
    {
      title: 'Compact List',
      description: 'Virtual list in a short container.',
      render: () => (<VirtualList items={Array.from({ length: 100 }, (_, i) => `Entry ${i + 1}`)} itemHeight={32} containerHeight={150} overscan={2} renderItem={(item) => <div style={{ padding: '6px 12px', fontSize: 14 }}>{item}</div>} />),
    },
    {
      title: 'Rendered Cards',
      description: 'Virtual list rendering card components for each item.',
      render: () => (<VirtualList items={Array.from({ length: 300 }, (_, i) => `Card ${i + 1}`)} itemHeight={56} containerHeight={220} renderItem={(item) => <Card style={{ padding: '12px 16px', margin: '0 8px' }}>{item}</Card>} />),
    },
],

  OrgChart: [
    {
      title: 'Basic',
      description: 'Hierarchical org chart.',
      render: () => (
        <OrgChart
          root={{
            id: '1',
            label: 'CEO',
            role: 'Chief Executive',
            children: [
              {
                id: '2',
                label: 'CTO',
                role: 'Engineering',
                children: [{ id: '4', label: 'Dev Lead', role: 'Frontend' }],
              },
              { id: '3', label: 'CFO', role: 'Finance' },
            ],
          }}
        />
      ),
    },
    {
      title: 'Larger Tree',
      description: 'Organization chart with multiple levels.',
      render: () => (
        <OrgChart
          root={{
            id: '1',
            label: 'CEO',
            role: 'Executive',
            children: [
              {
                id: '2',
                label: 'CTO',
                role: 'Engineering',
                children: [{ id: '4', label: 'Dev Lead', role: 'Frontend' }],
              },
              { id: '3', label: 'CFO', role: 'Finance' },
            ],
          }}
        />
      ),
    },
    {
      title: 'Clickable',
      description: 'Organization chart with clickable nodes.',
      render: () => (
        <OrgChart
          root={{
            id: '1',
            label: 'CEO',
            role: 'Executive',
            children: [
              {
                id: '2',
                label: 'CTO',
                role: 'Engineering',
                children: [{ id: '4', label: 'Dev Lead', role: 'Frontend' }],
              },
              { id: '3', label: 'CFO', role: 'Finance' },
            ],
          }}
          onNodeClick={(node) => alert(node.label)}
        />
      ),
    },
    {
      title: 'Deep Hierarchy',
      description: 'Organization chart showing three levels of reporting.',
      render: () => (
        <OrgChart
          root={{
            id: '1',
            label: 'CEO',
            role: 'Chief Executive',
            children: [
              {
                id: '2',
                label: 'VP Engineering',
                role: 'Engineering',
                children: [
                  {
                    id: '5',
                    label: 'Engineering Manager',
                    role: 'Platform',
                    children: [{ id: '8', label: 'Senior Engineer', role: 'Backend' }],
                  },
                  {
                    id: '6',
                    label: 'Engineering Manager',
                    role: 'Frontend',
                    children: [{ id: '9', label: 'Senior Engineer', role: 'UI' }],
                  },
                ],
              },
              { id: '3', label: 'VP Product', role: 'Product', children: [{ id: '7', label: 'Product Manager', role: 'Growth' }] },
              { id: '4', label: 'VP Design', role: 'Design' },
            ],
          }}
        />
      ),
    },
    {
      title: 'Department View',
      description: 'Organization chart for a single department.',
      render: () => (
        <OrgChart
          root={{
            id: '1',
            label: 'Engineering Director',
            role: 'Engineering',
            children: [
              { id: '2', label: 'Platform Lead', role: 'Infrastructure' },
              { id: '3', label: 'Frontend Lead', role: 'Web' },
              { id: '4', label: 'Mobile Lead', role: 'Mobile' },
              { id: '5', label: 'QA Lead', role: 'Quality' },
            ],
          }}
        />
      ),
    },
    {
      title: 'Flat Team',
      description: 'Organization chart with many direct reports under one lead.',
      render: () => (
        <OrgChart
          root={{
            id: '1',
            label: 'Team Lead',
            role: 'Squad Lead',
            children: [
              { id: '2', label: 'Alice', role: 'Engineer' },
              { id: '3', label: 'Bob', role: 'Engineer' },
              { id: '4', label: 'Carol', role: 'Designer' },
              { id: '5', label: 'Dave', role: 'Product Manager' },
              { id: '6', label: 'Eve', role: 'QA Engineer' },
            ],
          }}
        />
      ),
    },
    {
      title: 'Styled Chart',
      description: 'Organization chart with a custom class name.',
      render: () => (
        <OrgChart
          className="org-chart-demo"
          root={{
            id: '1',
            label: 'CTO',
            role: 'Technology',
            children: [
              { id: '2', label: 'Architect', role: 'Systems' },
              { id: '3', label: 'DevOps Lead', role: 'Operations' },
            ],
          }}
        />
      ),
    },
    {
      title: 'Cross-functional Team',
      description: 'Organization chart spanning product, design, and engineering roles.',
      render: () => (
        <OrgChart
          root={{
            id: '1',
            label: 'Product Director',
            role: 'Product',
            children: [
              {
                id: '2',
                label: 'Product Manager',
                role: 'Core',
                children: [{ id: '5', label: 'Analyst', role: 'Data' }],
              },
              {
                id: '3',
                label: 'Design Lead',
                role: 'Design',
                children: [
                  { id: '6', label: 'UX Designer', role: 'Research' },
                  { id: '7', label: 'Visual Designer', role: 'Brand' },
                ],
              },
              {
                id: '4',
                label: 'Tech Lead',
                role: 'Engineering',
                children: [{ id: '8', label: 'Full-stack Engineer', role: 'Web' }],
              },
            ],
          }}
        />
      ),
    },
],

  GanttChart: [
    {
      title: 'Basic',
      description: 'Project timeline chart.',
      render: () => (
        <GanttChart
          tasks={[
            { id: '1', name: 'Design', start: new Date('2024-01-01'), end: new Date('2024-01-10'), progress: 100 },
            { id: '2', name: 'Development', start: new Date('2024-01-11'), end: new Date('2024-02-10'), progress: 60 },
          ]}
        />
      ),
    },
    {
      title: 'Row Height',
      description: 'Gantt chart with taller rows.',
      render: () => (
        <GanttChart
          tasks={[
            { id: '1', name: 'Design', start: new Date('2024-01-01'), end: new Date('2024-01-10'), progress: 100 },
            { id: '2', name: 'Development', start: new Date('2024-01-11'), end: new Date('2024-02-10'), progress: 60 },
          ]}
          rowHeight={48}
        />
      ),
    },
    {
      title: 'Custom Range',
      description: 'Gantt chart with a custom date range.',
      render: () => (
        <GanttChart
          startDate={new Date('2024-01-01')}
          endDate={new Date('2024-03-01')}
          tasks={[
            { id: '1', name: 'Design', start: new Date('2024-01-01'), end: new Date('2024-01-10'), progress: 100 },
            { id: '2', name: 'Development', start: new Date('2024-01-11'), end: new Date('2024-02-10'), progress: 60 },
          ]}
        />
      ),
    },
    {
      title: 'Multiple Tasks',
      description: 'Project timeline showing several tasks with varying progress.',
      render: () => (
        <GanttChart
          tasks={[
            { id: '1', name: 'Discovery', start: new Date('2024-01-01'), end: new Date('2024-01-10'), progress: 100 },
            { id: '2', name: 'Design', start: new Date('2024-01-08'), end: new Date('2024-01-20'), progress: 80 },
            { id: '3', name: 'Development', start: new Date('2024-01-18'), end: new Date('2024-02-15'), progress: 45 },
            { id: '4', name: 'QA', start: new Date('2024-02-12'), end: new Date('2024-02-28'), progress: 10 },
          ]}
        />
      ),
    },
    {
      title: 'Compact Timeline',
      description: 'Gantt chart with smaller row height for dense views.',
      render: () => (
        <GanttChart
          rowHeight={32}
          tasks={[
            { id: '1', name: 'Task A', start: new Date('2024-03-01'), end: new Date('2024-03-05'), progress: 100 },
            { id: '2', name: 'Task B', start: new Date('2024-03-04'), end: new Date('2024-03-10'), progress: 60 },
            { id: '3', name: 'Task C', start: new Date('2024-03-09'), end: new Date('2024-03-15'), progress: 30 },
          ]}
        />
      ),
    },
    {
      title: 'Quarterly View',
      description: 'Gantt chart constrained to a quarterly date window.',
      render: () => (
        <GanttChart
          startDate={new Date('2024-04-01')}
          endDate={new Date('2024-06-30')}
          tasks={[
            { id: '1', name: 'Q2 Planning', start: new Date('2024-04-01'), end: new Date('2024-04-15'), progress: 100 },
            { id: '2', name: 'Feature Work', start: new Date('2024-04-10'), end: new Date('2024-05-30'), progress: 70 },
            { id: '3', name: 'Q2 Review', start: new Date('2024-05-25'), end: new Date('2024-06-28'), progress: 20 },
          ]}
        />
      ),
    },
    {
      title: 'Project Milestones',
      description: 'Gantt chart highlighting milestone tasks at 0% and 100% progress.',
      render: () => (
        <GanttChart
          tasks={[
            { id: '1', name: 'Kickoff', start: new Date('2024-01-01'), end: new Date('2024-01-02'), progress: 100 },
            { id: '2', name: 'Alpha Release', start: new Date('2024-02-01'), end: new Date('2024-02-02'), progress: 0 },
            { id: '3', name: 'Beta Release', start: new Date('2024-03-01'), end: new Date('2024-03-02'), progress: 0 },
            { id: '4', name: 'GA Release', start: new Date('2024-04-01'), end: new Date('2024-04-02'), progress: 0 },
          ]}
        />
      ),
    },
    {
      title: 'Styled Container',
      description: 'Gantt chart wrapped with a custom class name for theming.',
      render: () => (
        <GanttChart
          className="gantt-demo"
          tasks={[
            { id: '1', name: 'Design', start: new Date('2024-05-01'), end: new Date('2024-05-10'), progress: 100 },
            { id: '2', name: 'Build', start: new Date('2024-05-11'), end: new Date('2024-05-25'), progress: 55 },
          ]}
        />
      ),
    },
],

  GradientBorder: [
    {
      title: 'Basic',
      description: 'Container with animated gradient border.',
      render: () => (
        <GradientBorder>
          <div style={{ padding: 24 }}>Content inside gradient border</div>
        </GradientBorder>
      ),
    },
    {
      title: 'Animated',
      description: 'Container with animated gradient border.',
      render: () => (
        <GradientBorder animated>
          <div style={{ padding: 24 }}>Animated gradient border</div>
        </GradientBorder>
      ),
    },
    {
      title: 'Custom Gradient',
      description: 'Container with a custom gradient color.',
      render: () => (
        <GradientBorder gradient="linear-gradient(45deg, #ff6b6b, #4ecdc4)" animated>
          <div style={{ padding: 24 }}>Custom gradient border</div>
        </GradientBorder>
      ),
    },
      {
      title: 'Card Highlight',
      description: 'Animated gradient border highlighting a card.',
      render: () => (<GradientBorder animated><Card style={{ padding: 20, width: 220, textAlign: 'center' }}>Premium feature</Card></GradientBorder>),
    },
    {
      title: 'Button Glow',
      description: 'Gradient border wrapped around a call-to-action button.',
      render: () => (<GradientBorder animated><Button>Upgrade now</Button></GradientBorder>),
    },
    {
      title: 'Alert Banner',
      description: 'Gradient border drawing attention to an important alert.',
      render: () => (<GradientBorder animated><Alert type="warning" message="Limited time offer" showIcon /></GradientBorder>),
    },
    {
      title: 'Input Field',
      description: 'Gradient border framing a search input.',
      render: () => (<GradientBorder animated><Input placeholder="Search..." /></GradientBorder>),
    },
    {
      title: 'Static Border',
      description: 'Non-animated gradient border for subtle emphasis.',
      render: () => (<GradientBorder className="gradient-border-static"><Card style={{ padding: 20, width: 220, textAlign: 'center' }}>Static highlight</Card></GradientBorder>),
    },
],

  Icon: [
    {
      title: 'Basic',
      description: 'Inline SVG icon with name and size.',
      render: () => (
        <Stack direction="row" gap={16} align="center">
          <Icon name="home" size={24} />
          <Icon name="user" size={32} />
          <Icon name="cog" size={40} />
        </Stack>
      ),
    },
    {
      title: 'Colors',
      description: 'Icons rendered with different colors.',
      render: () => (
        <Stack direction="row" gap={16} align="center">
          <Icon name="heart" size={28} color="red" />
          <Icon name="star" size={28} color="orange" />
          <Icon name="check" size={28} color="green" />
        </Stack>
      ),
    },
    {
      title: 'Variants',
      description: 'Icons with different style variants.',
      render: () => (
        <Stack direction="row" gap={16} align="center">
          <Icon name="bell" size={28} variant="filled" />
          <Icon name="bell" size={28} variant="outlined" />
        </Stack>
      ),
    },
      {
      title: 'Sizes',
      description: 'Built-in icons rendered at multiple sizes.',
      render: () => (<Stack direction="row" gap={16} align="center"><Icon name="home" size={16} /><Icon name="home" size={24} /><Icon name="home" size={32} /><Icon name="home" size={48} /></Stack>),
    },
    {
      title: 'Accessible',
      description: 'Icon with an accessible label for screen readers.',
      render: () => (<Stack direction="row" gap={16} align="center"><Icon name="search" size={24} ariaLabel="Search" /><Icon name="bell" size={24} ariaLabel="Notifications" /><Icon name="user" size={24} ariaLabel="Account" /></Stack>),
    },
    {
      title: 'Inside Button',
      description: 'Icon used as a button icon for common actions.',
      render: () => (<Stack direction="row" gap={12} align="center"><Button size="small" leftIcon={<Icon name="plus" size={14} />}>Add</Button><Button size="small" variant="secondary" leftIcon={<Icon name="trash" size={14} />}>Delete</Button></Stack>),
    },
    {
      title: 'Container Variants',
      description: 'Icons with different neomorphic container shapes.',
      render: () => (<Stack direction="row" gap={16} align="center"><Icon name="star" size={28} variant="default" /><Icon name="star" size={28} variant="circle" /><Icon name="star" size={28} variant="square" /></Stack>),
    },
    {
      title: 'Custom Styling',
      description: 'Icons with a custom className for additional styling hooks.',
      render: () => (<Stack direction="row" gap={16} align="center"><Icon name="check" size={28} color="green" className="icon-success" /><Icon name="times" size={28} color="red" className="icon-error" /></Stack>),
    },
],

  ImageGallery: [
    {
      title: 'Basic',
      description: 'Carousel image gallery.',
      render: () => (
        <ImageGallery
          images={[
            { src: 'https://picsum.photos/400/300?random=1', alt: 'Sample 1' },
            { src: 'https://picsum.photos/400/300?random=2', alt: 'Sample 2' },
          ]}
        />
      ),
    },
    {
      title: 'Two Columns',
      description: 'Image gallery with two-column layout.',
      render: () => (
        <ImageGallery
          columns={2}
          gap="8px"
          images={[
            { src: 'https://picsum.photos/400/300?random=1', alt: 'Sample 1' },
            { src: 'https://picsum.photos/400/300?random=2', alt: 'Sample 2' },
            { src: 'https://picsum.photos/400/300?random=3', alt: 'Sample 3' },
            { src: 'https://picsum.photos/400/300?random=4', alt: 'Sample 4' },
          ]}
        />
      ),
    },
    {
      title: 'With Captions',
      description: 'Image gallery showing captions under each image.',
      render: () => (
        <ImageGallery
          images={[
            {
              src: 'https://picsum.photos/400/300?random=1',
              alt: 'Mountain',
              caption: 'Mountain view',
            },
            {
              src: 'https://picsum.photos/400/300?random=2',
              alt: 'Ocean',
              caption: 'Ocean sunset',
            },
          ]}
        />
      ),
    },
      {
      title: 'Four Column Grid',
      description: 'Image gallery arranged in a compact four-column grid.',
      render: () => (
  <ImageGallery
    columns={4}
    images={[
      { src: 'https://picsum.photos/300/200?random=10', alt: 'Sample 10' },
      { src: 'https://picsum.photos/300/200?random=11', alt: 'Sample 11' },
      { src: 'https://picsum.photos/300/200?random=12', alt: 'Sample 12' },
      { src: 'https://picsum.photos/300/200?random=13', alt: 'Sample 13' },
    ]}
  />
),
    },
    {
      title: 'Single Column',
      description: 'One image per row for a list-style gallery.',
      render: () => (
  <ImageGallery
    columns={1}
    images={[
      { src: 'https://picsum.photos/400/200?random=20', alt: 'Sample 20' },
      { src: 'https://picsum.photos/400/200?random=21', alt: 'Sample 21' },
    ]}
  />
),
    },
    {
      title: 'Compact Spacing',
      description: 'Gallery with a narrow 4px gap between images.',
      render: () => (
  <ImageGallery
    columns={3}
    gap="4px"
    images={[
      { src: 'https://picsum.photos/300/200?random=30', alt: 'Sample 30' },
      { src: 'https://picsum.photos/300/200?random=31', alt: 'Sample 31' },
      { src: 'https://picsum.photos/300/200?random=32', alt: 'Sample 32' },
    ]}
  />
),
    },
    {
      title: 'Roomy Spacing',
      description: 'Gallery with a wide 32px gap for a spacious layout.',
      render: () => (
  <ImageGallery
    columns={2}
    gap="32px"
    images={[
      { src: 'https://picsum.photos/400/300?random=40', alt: 'Sample 40' },
      { src: 'https://picsum.photos/400/300?random=41', alt: 'Sample 41' },
      { src: 'https://picsum.photos/400/300?random=42', alt: 'Sample 42' },
      { src: 'https://picsum.photos/400/300?random=43', alt: 'Sample 43' },
    ]}
  />
),
    },
    {
      title: 'Portrait Gallery',
      description: 'Portrait-oriented images with captions.',
      render: () => (
  <ImageGallery
    columns={3}
    images={[
      { src: 'https://picsum.photos/200/300?random=50', alt: 'Portrait 50', caption: 'Portrait one' },
      { src: 'https://picsum.photos/200/300?random=51', alt: 'Portrait 51', caption: 'Portrait two' },
      { src: 'https://picsum.photos/200/300?random=52', alt: 'Portrait 52', caption: 'Portrait three' },
    ]}
  />
),
    },
],

  AvatarGroup: [
    {
      title: 'Basic',
      description: 'Stacked avatars with overflow count.',
      render: () => (
        <AvatarGroup
          avatars={[
            { name: 'Alice' },
            { name: 'Bob' },
            { name: 'Carol' },
            { name: 'Dave' },
            { name: 'Eve' },
          ]}
          max={3}
        />
      ),
    },
    {
      title: 'Sizes',
      description: 'Avatar group in different sizes.',
      render: () => (
        <Stack direction="row" gap={16} align="center">
          <AvatarGroup
            size="small"
            avatars={[{ name: 'Alice' }, { name: 'Bob' }, { name: 'Carol' }]}
            max={3}
          />
          <AvatarGroup
            size="large"
            avatars={[{ name: 'Alice' }, { name: 'Bob' }, { name: 'Carol' }]}
            max={3}
          />
        </Stack>
      ),
    },
    {
      title: 'Spread',
      description: 'Avatar group with spread overlap and custom max.',
      render: () => (
        <AvatarGroup
          avatars={[
            { name: 'Alice' },
            { name: 'Bob' },
            { name: 'Carol' },
            { name: 'Dave' },
            { name: 'Eve' },
          ]}
          max={4}
          spread={true}
        />
      ),
    },
      {
      title: 'Overflow',
      description: 'Avatar group showing an overflow count when avatars exceed the max.',
      render: () => (
  <AvatarGroup max={2}>
    <Avatar initials="AB" alt="Alice" />
    <Avatar initials="BC" alt="Bob" />
    <Avatar initials="CD" alt="Carol" />
    <Avatar initials="DE" alt="Dave" />
  </AvatarGroup>
),
    },
    {
      title: 'Small',
      description: 'Small-sized avatar group.',
      render: () => (
  <AvatarGroup size="small" max={3}>
    <Avatar initials="A" alt="A" />
    <Avatar initials="B" alt="B" />
    <Avatar initials="C" alt="C" />
    <Avatar initials="D" alt="D" />
  </AvatarGroup>
),
    },
    {
      title: 'Large',
      description: 'Large-sized avatar group.',
      render: () => (
  <AvatarGroup size="large" max={3}>
    <Avatar initials="A" alt="A" />
    <Avatar initials="B" alt="B" />
    <Avatar initials="C" alt="C" />
    <Avatar initials="D" alt="D" />
  </AvatarGroup>
),
    },
    {
      title: 'Initials',
      description: 'Avatar group displaying initials for each member.',
      render: () => (
  <AvatarGroup max={4}>
    <Avatar initials="AL" alt="Alice" />
    <Avatar initials="BO" alt="Bob" />
    <Avatar initials="CA" alt="Carol" />
    <Avatar initials="DA" alt="Dave" />
    <Avatar initials="EV" alt="Eve" />
  </AvatarGroup>
),
    },
    {
      title: 'Mixed Shapes',
      description: 'Avatar group combining circle and square avatars.',
      render: () => (
  <AvatarGroup max={3}>
    <Avatar initials="S1" shape="circle" alt="Shape one" />
    <Avatar initials="S2" shape="square" alt="Shape two" />
    <Avatar initials="S3" shape="rounded" alt="Shape three" />
    <Avatar initials="S4" shape="circle" alt="Shape four" />
  </AvatarGroup>
),
    },
],

  AudioWaveform: [
    {
      title: 'Active',
      description: 'Animated audio waveform.',
      render: () => <AudioWaveform bars={20} isActive={true} />,
    },
    {
      title: 'Sizes',
      description: 'Different amplitude and bar gaps.',
      render: () => (
      <Stack direction="row" gap={24} align="center">
        <AudioWaveform bars={20} amplitude={0.3} barGap={1} isActive={true} />
        <AudioWaveform bars={30} amplitude={0.8} barGap={4} isActive={true} />
      </Stack>
    ),
    },
      {
      title: 'Dense Bars',
      description: 'Audio waveform rendered with many narrow bars.',
      render: () => <AudioWaveform bars={60} isActive={true} amplitude={0.5} barGap={1} />,
    },
    {
      title: 'Sparse Bars',
      description: 'Audio waveform rendered with fewer, wider bars.',
      render: () => <AudioWaveform bars={12} isActive={true} amplitude={0.6} barGap={6} />,
    },
    {
      title: 'Low Amplitude',
      description: 'Subtle waveform with a low amplitude.',
      render: () => <AudioWaveform bars={30} isActive={true} amplitude={0.2} barGap={2} />,
    },
    {
      title: 'High Amplitude',
      description: 'Prominent waveform with a high amplitude.',
      render: () => <AudioWaveform bars={30} isActive={true} amplitude={0.9} barGap={2} />,
    },
    {
      title: 'Custom Gap',
      description: 'Waveform with an exaggerated bar gap for a different rhythm look.',
      render: () => <AudioWaveform bars={24} isActive={true} amplitude={0.5} barGap={8} />,
    },
],

  PinInput: [
    {
      title: 'Basic',
      description: 'PIN code entry field.',
      render: () => <PinInput length={4} />,
    },
    {
      title: 'Controlled',
      description: 'Interactive PIN input with React state.',
      render: () => <ControlledPinInputExample />,
    },
    {
      title: 'Error State',
      description: 'PIN input showing an error state.',
      render: () => <PinInput length={4} value="12" error={true} />,
    },
      {
      title: 'Six Digits',
      description: 'PIN input configured for a six-digit code.',
      render: () => <PinInput length={6} />,
    },
    {
      title: 'Three Digits',
      description: 'Short PIN input with only three digits.',
      render: () => <PinInput length={3} />,
    },
    {
      title: 'Disabled',
      description: 'PIN input that cannot be edited.',
      render: () => <PinInput length={4} disabled={true} value="12" />,
    },
    {
      title: 'Filled',
      description: 'PIN input prefilled with a complete value.',
      render: () => <PinInput length={4} value="1234" />,
    },
    {
      title: 'Complete Handler',
      description: 'PIN input that triggers a callback when all digits are entered.',
      render: () => <PinInput length={4} onComplete={() => {}} />,
    },
],

  Stepper: [
    {
      title: 'Horizontal',
      description: 'Default horizontal stepper.',
      render: () => (
      <Stepper
        activeStep={1}
        steps={[
          { title: 'Account' },
          { title: 'Profile' },
          { title: 'Confirm' },
        ]}
      />
    ),
    },
    {
      title: 'Vertical',
      description: 'Vertical stepper layout.',
      render: () => (
      <Stepper
        activeStep={1}
        orientation="vertical"
        steps={[
          { title: 'Account' },
          { title: 'Profile' },
          { title: 'Confirm' },
        ]}
      />
    ),
    },
      {
      title: 'Glass Variant',
      description: 'Stepper with a glass morphism visual style.',
      render: () => (
  <Stepper
    variant="glass"
    activeStep={1}
    steps={[{ title: 'Account' }, { title: 'Profile' }, { title: 'Confirm' }]}
  />
),
    },
    {
      title: 'Icon Only',
      description: 'Stepper that hides labels and shows only step icons.',
      render: () => (
  <Stepper
    iconOnly={true}
    activeStep={1}
    steps={[{ title: 'Account' }, { title: 'Profile' }, { title: 'Confirm' }]}
  />
),
    },
    {
      title: 'No Connectors',
      description: 'Stepper with the connecting lines removed.',
      render: () => (
  <Stepper
    showConnectors={false}
    activeStep={1}
    steps={[{ title: 'Account' }, { title: 'Profile' }, { title: 'Confirm' }]}
  />
),
    },
    {
      title: 'Default Active Step',
      description: 'Stepper that starts on the second step by default.',
      render: () => (
  <Stepper
    defaultActiveStep={1}
    steps={[{ title: 'Account' }, { title: 'Profile' }, { title: 'Confirm' }]}
  />
),
    },
    {
      title: 'With Descriptions',
      description: 'Stepper steps with both titles and descriptions.',
      render: () => (
  <Stepper
    activeStep={1}
    steps={[
      { title: 'Account', description: 'Create your account' },
      { title: 'Profile', description: 'Add your details' },
      { title: 'Confirm', description: 'Review and submit' },
    ]}
  />
),
    },
],

  Menu: [
    {
      title: 'Basic',
      description: 'Dropdown menu triggered by a button.',
      render: () => (
      <Menu
        trigger={<Button size="small">Open Menu</Button>}
        items={[
          { key: '1', label: 'Copy' },
          { key: '2', label: 'Paste' },
          { key: '3', label: 'Delete', danger: true },
        ]}
      />
    ),
    },
    {
      title: 'With Icons',
      description: 'Menu items with leading icons.',
      render: () => (
      <Menu
        trigger={<Button size="small" variant="secondary">Actions</Button>}
        items={[
          { key: '1', label: 'Copy', icon: <span>📄</span> },
          { key: '2', label: 'Paste', icon: <span>📋</span> },
        ]}
      />
    ),
    },
      {
      title: 'Bottom Right Placement',
      description: 'Menu dropdown aligned to the bottom-right of the trigger.',
      render: () => (
  <Menu
    trigger={<Button size="small">Open Menu</Button>}
    placement="bottom-right"
    items={[
      { key: '1', label: 'Copy' },
      { key: '2', label: 'Paste' },
      { key: '3', label: 'Delete', danger: true },
    ]}
  />
),
    },
    {
      title: 'With Divider',
      description: 'Menu with a visual separator between groups of items.',
      render: () => (
  <Menu
    trigger={<Button size="small" variant="secondary">Actions</Button>}
    items={[
      { key: '1', label: 'Edit' },
      { key: '2', label: 'Duplicate' },
      { type: 'divider' },
      { key: '3', label: 'Archive' },
      { key: '4', label: 'Delete', danger: true },
    ]}
  />
),
    },
    {
      title: 'With Section Label',
      description: 'Menu with a non-selectable section label.',
      render: () => (
  <Menu
    trigger={<Button size="small" variant="secondary">Options</Button>}
    items={[
      { type: 'label', label: 'View' },
      { key: '1', label: 'List' },
      { key: '2', label: 'Grid' },
      { type: 'label', label: 'Settings' },
      { key: '3', label: 'Preferences' },
    ]}
  />
),
    },
    {
      title: 'Disabled Options',
      description: 'Menu with some items that cannot be selected.',
      render: () => (
  <Menu
    trigger={<Button size="small" variant="secondary">Actions</Button>}
    items={[
      { key: '1', label: 'Share' },
      { key: '2', label: 'Export', disabled: true },
      { key: '3', label: 'Delete', danger: true, disabled: true },
    ]}
  />
),
    },
    {
      title: 'Checkable Items',
      description: 'Menu items rendered as checkbox and radio options.',
      render: () => (
  <Menu
    trigger={<Button size="small" variant="secondary">Settings</Button>}
    items={[
      { key: '1', label: 'Show sidebar', checkable: 'checkbox', checked: true },
      { key: '2', label: 'Show status bar', checkable: 'checkbox', checked: false },
      { key: '3', label: 'Theme: Dark', checkable: 'radio', checked: true },
      { key: '4', label: 'Theme: Light', checkable: 'radio', checked: false },
    ]}
  />
),
    },
],

  ModelSelector: [
    {
      title: 'Basic',
      description: 'LLM model picker dropdown.',
      render: () => (
        <ModelSelector
          models={[
            {
              id: 'gpt-4',
              name: 'GPT-4',
              provider: 'OpenAI',
              contextWindow: 128000,
              pricePer1kTokens: 0.03,
            },
            {
              id: 'claude',
              name: 'Claude 3',
              provider: 'Anthropic',
              contextWindow: 200000,
              pricePer1kTokens: 0.008,
            },
          ]}
          placeholder="Select a model"
        />
      ),
    },
    {
      title: 'Controlled',
      description: 'Interactive model selector with React state.',
      render: () => <ControlledModelSelectorExample />,
    },
    {
      title: 'With Metadata',
      description: 'Model selector showing latency and context window.',
      render: () => (
        <ModelSelector
          models={[
            {
              id: 'gpt-4',
              name: 'GPT-4',
              provider: 'OpenAI',
              contextWindow: 128000,
              pricePer1kTokens: 0.03,
              latencyMs: 250,
              description: 'Reliable general-purpose model',
            },
            {
              id: 'claude',
              name: 'Claude 3',
              provider: 'Anthropic',
              contextWindow: 200000,
              pricePer1kTokens: 0.008,
              latencyMs: 180,
              description: 'Strong for long context tasks',
            },
          ]}
        />
      ),
    },
      {
      title: 'Preselected Model',
      description: 'Model selector with a model already chosen.',
      render: () => (
  <ModelSelector
    value="gpt-4"
    onChange={() => {}}
    models={[
      { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', contextWindow: 128000, pricePer1kTokens: 0.03 },
      { id: 'claude', name: 'Claude 3', provider: 'Anthropic', contextWindow: 200000, pricePer1kTokens: 0.008 },
    ]}
  />
),
    },
    {
      title: 'Custom Placeholder',
      description: 'Model selector with a custom placeholder message.',
      render: () => (
  <ModelSelector
    placeholder="Pick a model for this task"
    onChange={() => {}}
    models={[
      { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', contextWindow: 128000, pricePer1kTokens: 0.03 },
      { id: 'claude', name: 'Claude 3', provider: 'Anthropic', contextWindow: 200000, pricePer1kTokens: 0.008 },
    ]}
  />
),
    },
    {
      title: 'Three Providers',
      description: 'Model selector listing models from three different providers.',
      render: () => (
  <ModelSelector
    onChange={() => {}}
    models={[
      { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', contextWindow: 128000, pricePer1kTokens: 0.03 },
      { id: 'claude', name: 'Claude 3', provider: 'Anthropic', contextWindow: 200000, pricePer1kTokens: 0.008 },
      { id: 'gemini', name: 'Gemini', provider: 'Google', contextWindow: 1000000, pricePer1kTokens: 0.0005 },
    ]}
  />
),
    },
    {
      title: 'Latency Focused',
      description: 'Model selector highlighting response latency metadata.',
      render: () => (
  <ModelSelector
    onChange={() => {}}
    models={[
      { id: 'fast', name: 'Fast-Llama', provider: 'Meta', contextWindow: 32000, pricePer1kTokens: 0.001, latencyMs: 120, description: 'Low latency for quick tasks' },
      { id: 'balanced', name: 'GPT-4o', provider: 'OpenAI', contextWindow: 128000, pricePer1kTokens: 0.005, latencyMs: 300, description: 'Balanced speed and quality' },
      { id: 'slow', name: 'Claude 3', provider: 'Anthropic', contextWindow: 200000, pricePer1kTokens: 0.008, latencyMs: 600, description: 'Higher latency, strong reasoning' },
    ]}
  />
),
    },
    {
      title: 'Single Model',
      description: 'Model selector with only one available model.',
      render: () => (
  <ModelSelector
    onChange={() => {}}
    models={[
      { id: 'only', name: 'GPT-4', provider: 'OpenAI', contextWindow: 128000, pricePer1kTokens: 0.03 },
    ]}
  />
),
    },
],

  PromptBuilder: [
    {
      title: 'Basic',
      description: 'Structured prompt composer with example turns.',
      render: () => (
        <PromptBuilder
          systemPrompt="You are a helpful assistant."
          examples={[{ id: '1', role: 'user', content: 'Hello' }]}
          onChange={() => {}}
        />
      ),
    },
    {
      title: 'With Variables',
      description: 'Prompt builder with variables, examples, and system prompt.',
      render: () => (
        <PromptBuilder
          systemPrompt="You are a helpful assistant."
          variables={['topic', 'tone']}
          examples={[
            { id: '1', role: 'user', content: 'Write about {{topic}} in a {{tone}} tone.' },
            { id: '2', role: 'assistant', content: 'Here is a {{tone}} response about {{topic}}.' },
          ]}
          onChange={() => {}}
        />
      ),
    },
    {
      title: 'With Examples',
      description: 'Prompt builder with example shots and variables.',
      render: () => (
        <PromptBuilder
          systemPrompt="You are a helpful assistant."
          variables={['topic']}
          examples={[
            { id: '1', role: 'user', content: 'Tell me about {{topic}}' },
            { id: '2', role: 'assistant', content: '{{topic}} is a useful concept.' },
          ]}
          onChange={() => {}}
        />
      ),
    },
    {
      title: 'Travel Planner',
      description: 'Prompt builder for travel recommendations with variables and example turns.',
      render: () => (
        <PromptBuilder
          systemPrompt="You are a travel assistant."
          examples={[
            { id: '1', role: 'user', content: 'Plan a {{duration}} trip to {{destination}}.' },
            { id: '2', role: 'assistant', content: 'Here is a {{duration}} itinerary for {{destination}}.' },
          ]}
          variables={['destination', 'duration']}
          onChange={() => {}}
        />
      ),
    },
    {
      title: 'Code Reviewer',
      description: 'Structured prompt for reviewing code changes with a variable placeholder.',
      render: () => (
        <PromptBuilder
          systemPrompt="You are a senior engineer reviewing pull requests."
          examples={[
            { id: '1', role: 'user', content: 'Review this diff: {{code}}' },
            { id: '2', role: 'assistant', content: 'The code looks good, but consider edge cases.' },
          ]}
          variables={['code']}
          onChange={() => {}}
        />
      ),
    },
    {
      title: 'Multi-turn Chat',
      description: 'Prompt builder with several alternating user and assistant turns.',
      render: () => (
        <PromptBuilder
          systemPrompt="You are a helpful tutor."
          examples={[
            { id: '1', role: 'user', content: 'Explain {{topic}}' },
            { id: '2', role: 'assistant', content: '{{topic}} is a fundamental concept.' },
            { id: '3', role: 'user', content: 'Give an example' },
            { id: '4', role: 'assistant', content: 'Here is a practical example.' },
          ]}
          variables={['topic']}
          onChange={() => {}}
        />
      ),
    },
    {
      title: 'Custom Class',
      description: 'Prompt builder with a custom class name for themed styling.',
      render: () => (
        <PromptBuilder
          className="custom-prompt-builder"
          examples={[
            { id: '1', role: 'user', content: 'Summarize: {{article}}' },
            { id: '2', role: 'assistant', content: 'Summary of {{article}}...' },
          ]}
          variables={['article']}
          onChange={() => {}}
        />
      ),
    },
    {
      title: 'Email Composer',
      description: 'Prompt builder for drafting professional emails with multiple variables.',
      render: () => (
        <PromptBuilder
          systemPrompt="You are a professional email assistant."
          examples={[
            { id: '1', role: 'user', content: 'Write a {{tone}} email to {{recipient}} about {{subject}}.' },
            { id: '2', role: 'assistant', content: 'Subject: {{subject}}...' },
          ]}
          variables={['tone', 'recipient', 'subject']}
          onChange={() => {}}
        />
      ),
    },
],

  AIThinking: [
    {
      title: 'Basic',
      description: 'AI thinking animation with a default set of reasoning steps.',
      render: () => <AIThinking steps={[{ id: '1', text: 'Analyzing request' }, { id: '2', text: 'Retrieving context' }]} />,
    },
    {
      title: 'Thinking',
      description: 'AI thinking animation state with steps.',
      render: () => (
        <AIThinking
          steps={[{ id: '1', text: 'Planning approach' }, { id: '2', text: 'Executing steps' }]}
          isThinking={true}
          title="AI is thinking"
        />
      ),
    },
    {
      title: 'With Steps',
      description: 'AI thinking block showing detailed steps.',
      render: () => (
        <AIThinking
          steps={[
            { id: '1', text: 'Understanding question' },
            { id: '2', text: 'Retrieving sources' },
            { id: '3', text: 'Synthesizing answer' },
          ]}
          isThinking={true}
          showElapsed={true}
          startTime={Date.now()}
        />
      ),
    },
    {
      title: 'Collapsed Reasoning',
      description: 'Thinking block collapsed by default to save space.',
      render: () => (
        <AIThinking
          steps={[{ id: '1', text: 'Parsing input' }, { id: '2', text: 'Checking constraints' }]}
          defaultExpanded={false}
          isThinking={false}
          title="Reasoning"
        />
      ),
    },
    {
      title: 'Custom Title',
      description: 'Thinking animation with a custom accessible title.',
      render: () => (
        <AIThinking
          steps={[{ id: '1', text: 'Loading models' }, { id: '2', text: 'Preparing response' }]}
          isThinking={true}
          title="Assistant is reasoning..."
        />
      ),
    },
    {
      title: 'Completed Steps',
      description: 'Thinking block showing finished reasoning without the elapsed timer.',
      render: () => (
        <AIThinking
          steps={[
            { id: '1', text: 'Analyzed request' },
            { id: '2', text: 'Found sources' },
            { id: '3', text: 'Produced answer' },
          ]}
          isThinking={false}
          showElapsed={false}
          title="Finished"
        />
      ),
    },
    {
      title: 'No Elapsed Timer',
      description: 'Thinking steps shown while active but with the timer hidden.',
      render: () => (
        <AIThinking
          steps={[{ id: '1', text: 'Indexing documents' }, { id: '2', text: 'Ranking results' }]}
          isThinking={true}
          showElapsed={false}
          title="Searching"
        />
      ),
    },
    {
      title: 'Long Reasoning Chain',
      description: 'Thinking block displaying a longer chain of reasoning steps.',
      render: () => (
        <AIThinking
          steps={[
            { id: '1', text: 'Received query' },
            { id: '2', text: 'Identified intent' },
            { id: '3', text: 'Retrieved context' },
            { id: '4', text: 'Drafted response' },
            { id: '5', text: 'Verified facts' },
          ]}
          isThinking={true}
          title="Thinking through response"
        />
      ),
    },
],

  ToolCallCard: [
    {
      title: 'Running',
      description: 'Tool call in progress.',
      render: () => (
      <ToolCallCard
        toolName="search"
        status="loading"
        args={{ query: 'weather' }}
      />
    ),
    },
    {
      title: 'Success',
      description: 'Completed tool call with result.',
      render: () => (
      <ToolCallCard
        toolName="search"
        status="success"
        args={{ query: 'weather' }}
        result="Sunny, 24°C"
        durationMs={1200}
      />
    ),
    },
      {
      title: 'Custom Tool Icon',
      description: 'Tool call card with a custom icon for the tool name.',
      render: () => (<ToolCallCard toolName='search' toolIcon={<Icon name='search' size={16} />} status='success' args={{ query: 'react components' }} result='Found 3 results' durationMs={420} />),
    },
    {
      title: 'Empty Arguments',
      description: 'Tool call in progress with an empty arguments object.',
      render: () => (<ToolCallCard toolName='ping' status='loading' args={{}} />),
    },
    {
      title: 'Long Arguments',
      description: 'Tool call showing a formatted query with multiple arguments.',
      render: () => (<ToolCallCard toolName='query' status='success' args={{ select: 'name, email', from: 'users', where: 'active = true', limit: 50 }} result='12 records' durationMs={890} />),
    },
    {
      title: 'React Result',
      description: 'Tool call card rendering the result as a React node.',
      render: () => (<ToolCallCard toolName='status' status='success' args={{ service: 'api' }} result={<Tag color='green'>Healthy</Tag>} durationMs={210} />),
    },
    {
      title: 'Error Without Duration',
      description: 'Tool call failure with a clear error message and no duration badge.',
      render: () => (<ToolCallCard toolName='fetch' status='error' args={{ url: '/api/data' }} errorMessage='Request timeout after 30s' />),
    },
],

  StreamingText: [
    {
      title: 'Basic',
      description: 'Typewriter text effect.',
      render: () => <StreamingText text="Hello, this is streaming text." speed={50} />,
    },
    {
      title: 'Render Markdown',
      description: 'Streaming text with inline markdown.',
      render: () => (
        <StreamingText
          text="Hello, **this** is _streaming_ text."
          renderMarkdown={true}
          speed={50}
        />
      ),
    },
    {
      title: 'Fast Stream',
      description: 'Streaming text with a faster speed and completion handler.',
      render: () => (
        <StreamingText text="This text streams quickly." speed={20} onComplete={() => {}} />
      ),
    },
      {
      title: 'Slow Cinematic',
      description: 'Streaming text with a slow, readable reveal speed.',
      render: () => (<StreamingText text='This sentence appears one character at a time.' speed={80} />),
    },
    {
      title: 'Short Caption',
      description: 'A short phrase that streams quickly.',
      render: () => (<StreamingText text='Loading complete.' speed={60} />),
    },
    {
      title: 'Long Paragraph',
      description: 'Streaming text across a longer paragraph.',
      render: () => (<StreamingText text='Streaming longer content lets you preview how the assistant reveals a multi-sentence response without overwhelming the reader.' speed={35} />),
    },
    {
      title: 'Styled Container',
      description: 'Streaming text using a custom class name for styling.',
      render: () => (<StreamingText text='Styled streaming text example.' speed={40} className='streaming-demo' />),
    },
    {
      title: 'In a Card',
      description: 'Streaming text rendered inside a Card for layout context.',
      render: () => (<Card style={{ padding: 16 }}><StreamingText text='Streaming text inside a card.' speed={50} /></Card>),
    },
],

  Carousel: [
    {
      title: 'Basic',
      description: 'Sliding image carousel with navigation.',
      render: () => (
        <Carousel style={{ width: 300 }}>
          <div
            style={{
              padding: 40,
              textAlign: 'center',
              background: 'var(--n-color-card-bg)',
              color: 'var(--n-color-text)',
              borderRadius: 12,
            }}
          >
            Slide 1
          </div>
          <div
            style={{
              padding: 40,
              textAlign: 'center',
              background: 'var(--n-color-card-bg)',
              color: 'var(--n-color-text)',
              borderRadius: 12,
            }}
          >
            Slide 2
          </div>
          <div
            style={{
              padding: 40,
              textAlign: 'center',
              background: 'var(--n-color-card-bg)',
              color: 'var(--n-color-text)',
              borderRadius: 12,
            }}
          >
            Slide 3
          </div>
        </Carousel>
      ),
    },
    {
      title: 'Autoplay',
      description: 'Carousel that advances automatically.',
      render: () => (
        <Carousel
          autoPlay={true}
          autoPlayInterval={3000}
          showDots={true}
          showNav={false}
          style={{ width: 300 }}
        >
          <div
            style={{
              padding: 40,
              textAlign: 'center',
              background: 'var(--n-color-card-bg)',
              color: 'var(--n-color-text)',
              borderRadius: 12,
            }}
          >
            Slide 1
          </div>
          <div
            style={{
              padding: 40,
              textAlign: 'center',
              background: 'var(--n-color-card-bg)',
              color: 'var(--n-color-text)',
              borderRadius: 12,
            }}
          >
            Slide 2
          </div>
          <div
            style={{
              padding: 40,
              textAlign: 'center',
              background: 'var(--n-color-card-bg)',
              color: 'var(--n-color-text)',
              borderRadius: 12,
            }}
          >
            Slide 3
          </div>
        </Carousel>
      ),
    },
    {
      title: 'With Counter',
      description: 'Carousel showing a slide counter and looping.',
      render: () => (
        <Carousel showCounter={true} loop={true} style={{ width: 300 }}>
          <div
            style={{
              padding: 40,
              textAlign: 'center',
              background: 'var(--n-color-card-bg)',
              color: 'var(--n-color-text)',
              borderRadius: 12,
            }}
          >
            Slide 1
          </div>
          <div
            style={{
              padding: 40,
              textAlign: 'center',
              background: 'var(--n-color-card-bg)',
              color: 'var(--n-color-text)',
              borderRadius: 12,
            }}
          >
            Slide 2
          </div>
        </Carousel>
      ),
    },
      {
      title: 'Items API',
      description: 'Carousel built from the items prop with custom content slides.',
      render: () => (<Carousel items={[{ id: '1', content: <div style={{ padding: 40, textAlign: 'center', background: 'var(--n-color-card-bg)', color: 'var(--n-color-text)', borderRadius: 12 }}>Slide 1</div> }, { id: '2', content: <div style={{ padding: 40, textAlign: 'center', background: 'var(--n-color-card-bg)', color: 'var(--n-color-text)', borderRadius: 12 }}>Slide 2</div> }]} style={{ width: 300 }} />),
    },
    {
      title: 'Thumbnails',
      description: 'Carousel with image slides and thumbnail previews.',
      render: () => (<Carousel showThumbnails items={[{ id: '1', image: 'https://picsum.photos/seed/carousel1/400/200', title: 'Mountain' }, { id: '2', image: 'https://picsum.photos/seed/carousel2/400/200', title: 'Ocean' }, { id: '3', image: 'https://picsum.photos/seed/carousel3/400/200', title: 'Forest' }]} style={{ width: 320 }} />),
    },
    {
      title: 'Loop with Dots',
      description: 'Carousel set to loop with dot navigation only.',
      render: () => (<Carousel loop={true} showNav={false} showDots={true} style={{ width: 300 }}><div style={{ padding: 40, textAlign: 'center', background: 'var(--n-color-card-bg)', color: 'var(--n-color-text)', borderRadius: 12 }}>One</div><div style={{ padding: 40, textAlign: 'center', background: 'var(--n-color-card-bg)', color: 'var(--n-color-text)', borderRadius: 12 }}>Two</div></Carousel>),
    },
    {
      title: 'Custom Height',
      description: 'Carousel with a fixed height for taller slides.',
      render: () => (<Carousel height={200} style={{ width: 300 }}><div style={{ padding: 40, textAlign: 'center', background: 'var(--n-color-card-bg)', color: 'var(--n-color-text)', borderRadius: 12, height: '100%' }}>Tall slide</div><div style={{ padding: 40, textAlign: 'center', background: 'var(--n-color-card-bg)', color: 'var(--n-color-text)', borderRadius: 12, height: '100%' }}>Another</div></Carousel>),
    },
    {
      title: 'Swipe Disabled',
      description: 'Carousel with swipe gestures disabled so navigation uses arrows.',
      render: () => (<Carousel enableSwipe={false} items={[{ id: '1', content: <div style={{ padding: 40, textAlign: 'center', background: 'var(--n-color-card-bg)', color: 'var(--n-color-text)', borderRadius: 12 }}>Swipe off</div> }, { id: '2', content: <div style={{ padding: 40, textAlign: 'center', background: 'var(--n-color-card-bg)', color: 'var(--n-color-text)', borderRadius: 12 }}>Use arrows</div> }]} style={{ width: 300 }} />),
    },
],

  Charts: [
    {
      title: 'Bar Chart',
      description: 'Simple bar chart visualization.',
      render: () => (
        <ChartBar
          data={[
            { label: 'A', value: 30 },
            { label: 'B', value: 50 },
          ]}
        />
      ),
    },
    {
      title: 'Line Chart',
      description: 'Line chart with multiple points.',
      render: () => (
        <ChartLine
          data={[
            { label: 'Jan', value: 10 },
            { label: 'Feb', value: 25 },
            { label: 'Mar', value: 18 },
          ]}
        />
      ),
    },
    {
      title: 'Area Chart',
      description: 'Filled area chart.',
      render: () => (
        <ChartArea
          data={[
            { label: 'Q1', value: 40 },
            { label: 'Q2', value: 60 },
            { label: 'Q3', value: 35 },
          ]}
        />
      ),
    },
      {
      title: 'Revenue by Region',
      description: 'Bar chart comparing revenue across regions.',
      render: () => (<ChartBar data={[{ label: 'North', value: 45 }, { label: 'South', value: 30 }, { label: 'East', value: 55 }, { label: 'West', value: 40 }]} />),
    },
    {
      title: 'Weekly Signups',
      description: 'Line chart showing daily signups across a week.',
      render: () => (<ChartLine data={[{ label: 'Mon', value: 12 }, { label: 'Tue', value: 24 }, { label: 'Wed', value: 18 }, { label: 'Thu', value: 36 }, { label: 'Fri', value: 28 }, { label: 'Sat', value: 15 }, { label: 'Sun', value: 20 }]} />),
    },
    {
      title: 'Quarterly Growth',
      description: 'Area chart visualizing growth over four quarters.',
      render: () => (<ChartArea data={[{ label: 'Q1', value: 20 }, { label: 'Q2', value: 35 }, { label: 'Q3', value: 50 }, { label: 'Q4', value: 65 }]} />),
    },
    {
      title: 'All Chart Types',
      description: 'Stacked layout showing bar, line, and area charts together.',
      render: () => (<Stack direction='column' gap={24}><ChartBar data={[{ label: 'A', value: 30 }, { label: 'B', value: 50 }]} /><ChartLine data={[{ label: 'Jan', value: 10 }, { label: 'Feb', value: 25 }]} /><ChartArea data={[{ label: 'Q1', value: 40 }, { label: 'Q2', value: 60 }]} /></Stack>),
    },
    {
      title: 'Dense Bar Chart',
      description: 'Bar chart with a larger set of monthly data points.',
      render: () => (<ChartBar data={[{ label: 'Jan', value: 10 }, { label: 'Feb', value: 25 }, { label: 'Mar', value: 18 }, { label: 'Apr', value: 32 }, { label: 'May', value: 22 }, { label: 'Jun', value: 38 }, { label: 'Jul', value: 28 }, { label: 'Aug', value: 45 }]} />),
    },
],
};

// Fallback for any component not explicitly listed
export const getExamplesFor = (name: string): Example[] => {
  const examples = componentExamples[name] || [
    {
      title: 'Basic',
      description: `Basic ${name} usage.`,
      render: () => (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--n-color-text-secondary)' }}>
            Example coming soon for <strong>{name}</strong>
          </p>
          <p
            style={{
              margin: '8px 0 0',
              fontSize: '0.8125rem',
              opacity: 0.7,
              color: 'var(--n-color-text-secondary)',
            }}
          >
            Check the API table below for usage details.
          </p>
        </div>
      ),
      code: `<${name} />`,
    },
  ];
  const codes = (exampleCodeJson as Record<string, Record<string, string>>)[name];
  if (!codes) return examples;
  return examples.map((ex, i) => ({
    ...ex,
    code: codes[String(i)] || ex.code || '',
  }));
};
