import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, type SelectOptionProps, type SelectOptionGroup, type SelectProps } from '../src/components/Select';

const meta: Meta<typeof Select> = {
  title: 'react-n-design/Select v1.2.0',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'outlined'],
    },
    mode: {
      control: 'select',
      options: ['single', 'multiple'],
    },
    searchable: {
      control: 'boolean',
    },
    showSearch: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    allowClear: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
};

export default meta;

const sampleOptions: SelectOptionProps[] = [
  { value: 'new-york', label: 'New York' },
  { value: 'london', label: 'London' },
  { value: 'tokyo', label: 'Tokyo' },
  { value: 'paris', label: 'Paris', disabled: true },
  { value: 'sydney', label: 'Sydney' },
  { value: 'berlin', label: 'Berlin' },
  { value: 'cairo', label: 'Cairo' },
  { value: 'dubai', label: 'Dubai' },
  { value: 'singapore', label: 'Singapore' },
];

const groupedOptions: SelectOptionGroup[] = [
  {
    label: 'North America',
    options: [
      { value: 'new-york', label: 'New York' },
      { value: 'los-angeles', label: 'Los Angeles' },
      { value: 'toronto', label: 'Toronto' },
    ],
  },
  {
    label: 'Europe',
    options: [
      { value: 'london', label: 'London' },
      { value: 'paris', label: 'Paris' },
      { value: 'berlin', label: 'Berlin' },
      { value: 'rome', label: 'Rome' },
    ],
  },
  {
    label: 'Asia',
    options: [
      { value: 'tokyo', label: 'Tokyo' },
      { value: 'singapore', label: 'Singapore' },
      { value: 'beijing', label: 'Beijing' },
      { value: 'seoul', label: 'Seoul' },
    ],
  },
];

// Generate many options for virtualization demo
const manyOptions: SelectOptionProps[] = Array.from({ length: 100 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i + 1} - ${['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'][i % 5]}`,
}));

const InteractiveSelect = (args: SelectProps) => {
  const [value, setValue] = useState(args.defaultValue);
  return <Select {...args} value={value} onChange={setValue} />;
};

// ============================================================================
// Basic Stories
// ============================================================================

export const Default: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: sampleOptions,
    placeholder: 'Select a city...',
  },
  storyName: 'Default',
};

export const Sizes: StoryObj<typeof Select> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select options={sampleOptions} size="small" placeholder="Small size..." />
      <Select options={sampleOptions} size="medium" placeholder="Medium size..." />
      <Select options={sampleOptions} size="large" placeholder="Large size..." />
    </div>
  ),
  storyName: 'Sizes',
};

export const Variants: StoryObj<typeof Select> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select options={sampleOptions} variant="default" placeholder="Default variant..." />
      <Select options={sampleOptions} variant="filled" placeholder="Filled variant..." />
      <Select options={sampleOptions} variant="outlined" placeholder="Outlined variant..." />
    </div>
  ),
  storyName: 'Variants',
};

// ============================================================================
// v1.2.0 Features
// ============================================================================

export const MultiSelect: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: sampleOptions,
    placeholder: 'Select cities...',
    mode: 'multiple',
    allowClear: true,
    defaultValue: ['new-york', 'sydney'],
  },
  storyName: '🆕 Multi-Select with Chips',
};

export const MultiSelectWithSearch: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: sampleOptions,
    placeholder: 'Select cities...',
    mode: 'multiple',
    showSearch: true,
    allowClear: true,
  },
  storyName: '🆕 Multi-Select with Inline Search',
};

export const Searchable: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: sampleOptions,
    placeholder: 'Search and select...',
    searchable: true,
    allowClear: true,
  },
  storyName: '🆕 Searchable Dropdown',
};

export const Grouped: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: groupedOptions,
    placeholder: 'Select a city...',
    searchable: true,
  },
  storyName: '🆕 Grouped Options',
};

export const Virtualized: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: manyOptions,
    placeholder: 'Virtualized list (100 items)...',
    virtualThreshold: 50,
    itemHeight: 44,
    searchable: true,
  },
  storyName: '🆕 Virtualized List (>50 items)',
};

export const Responsive: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: sampleOptions,
    placeholder: 'Resize window to see responsive behavior...',
    size: { mobile: 'small', tablet: 'medium', desktop: 'large' },
    fullWidth: { mobile: true, tablet: false, desktop: false },
  },
  storyName: '🆕 Responsive Sizing',
};

// ============================================================================
// States
// ============================================================================

export const States: StoryObj<typeof Select> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Select options={sampleOptions} placeholder="Default state..." />
      <Select
        options={sampleOptions}
        placeholder="Disabled state..."
        disabled
        defaultValue="london"
      />
      <Select
        options={sampleOptions}
        placeholder="Loading state..."
        loading
      />
      <Select
        options={sampleOptions}
        placeholder="Error state..."
        error
      />
    </div>
  ),
  storyName: 'States',
};

export const LoadingContent: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: sampleOptions,
    loading: true,
    loadingContent: <div>🔄 Loading cities... Please wait</div>,
  },
  storyName: '🆕 Custom Loading Content',
};

export const EmptyContent: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: [],
    placeholder: 'No options available...',
    emptyContent: <div>📭 No cities found. Try searching for something else.</div>,
  },
  storyName: '🆕 Custom Empty Content',
};

// ============================================================================
// Customization
// ============================================================================

export const CustomStyles: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: sampleOptions,
    placeholder: 'Custom styled...',
    className: 'my-custom-select',
    style: { marginTop: '10px' },
    dropdownStyle: { maxHeight: '300px', borderRadius: '12px' },
    allowClear: true,
  },
  storyName: '🆕 Custom Styles',
};

export const FullWidth: StoryObj<typeof Select> = {
  render: (args) => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <InteractiveSelect {...args} />
      <p style={{ marginTop: '16px', color: '#666' }}>
        The select above is set to fullWidth=true and spans the container.
      </p>
    </div>
  ),
  args: {
    options: sampleOptions,
    placeholder: 'Full width select...',
    fullWidth: true,
    allowClear: true,
  },
  storyName: '🆕 Full Width',
};

// ============================================================================
// Playground
// ============================================================================

export const Playground: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: sampleOptions,
    placeholder: 'Explore all v1.2.0 features...',
    mode: 'multiple',
    showSearch: true,
    searchable: true,
    allowClear: true,
    size: 'medium',
    variant: 'default',
    disabled: false,
    loading: false,
    error: false,
    fullWidth: false,
  },
  storyName: 'Playground - v1.2.0',
};

// ============================================================================
// Accessibility Demo
// ============================================================================

export const Accessibility: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: sampleOptions,
    placeholder: 'Keyboard accessible select...',
    'aria-label': 'City selector for travel planning',
    searchable: true,
    allowClear: true,
  },
  storyName: '♿ Accessibility Demo',
};
