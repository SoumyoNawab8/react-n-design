import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { useState } from 'react';
import { ComboBox } from '../src/components/ComboBox';

const meta: Meta<typeof ComboBox> = {
  title: 'react-n-design/ComboBox',
  component: ComboBox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    mode: { control: 'radio', options: ['single', 'multiple'] },
    allowClear: { control: 'boolean' },
    allowCreate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof ComboBox>;

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
];

const ControlledComboBox = (args: React.ComponentProps<typeof ComboBox>) => {
  const [value, setValue] = useState(args.value ?? (args.mode === 'multiple' ? [] : ''));
  return <ComboBox {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <ControlledComboBox {...args} />,
  args: {
    options,
    placeholder: 'Select a fruit...',
    label: 'Fruit',
  },
};

export const Multiple: Story = {
  render: (args) => <ControlledComboBox {...args} />,
  args: {
    options,
    mode: 'multiple',
    placeholder: 'Select fruits...',
    label: 'Fruits',
    allowClear: true,
  },
};

export const AllowCreate: Story = {
  render: (args) => <ControlledComboBox {...args} />,
  args: {
    options,
    allowCreate: true,
    placeholder: 'Type to search or create...',
    label: 'Custom Fruit',
  },
};

export const WithError: Story = {
  render: (args) => <ControlledComboBox {...args} />,
  args: {
    options,
    placeholder: 'Select a fruit...',
    label: 'Fruit',
    error: 'Please select a valid fruit',
  },
};

export const Loading: Story = {
  render: (args) => <ControlledComboBox {...args} />,
  args: {
    options,
    loading: true,
    placeholder: 'Loading...',
  },
};

export const SmallSize: Story = {
  render: (args) => <ControlledComboBox {...args} />,
  args: {
    options,
    size: 'small',
    placeholder: 'Small...',
  },
};

export const LargeSize: Story = {
  render: (args) => <ControlledComboBox {...args} />,
  args: {
    options,
    size: 'large',
    placeholder: 'Large...',
  },
};

export const AsyncSearch: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [opts, setOpts] = useState(options);

    const handleSearch = (query: string) => {
      setLoading(true);
      setTimeout(() => {
        setOpts(options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase())));
        setLoading(false);
      }, 500);
    };

    return (
      <ComboBox
        options={opts}
        placeholder="Type to search..."
        loading={loading}
        onSearch={handleSearch}
        allowClear
      />
    );
  },
};
