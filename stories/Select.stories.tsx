import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectOptionProps } from '../src/components/Select';

const meta: Meta<typeof Select> = {
  title: 'react-n-design/Select',
  component: Select,
  tags: ['autodocs'],
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
];

const InteractiveSelect = (args: any) => {
  const [value, setValue] = useState(args.defaultValue);
  return <Select {...args} value={value} onChange={setValue} />;
};

export const Default: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: sampleOptions,
    placeholder: 'Select a city...',
  },
};

export const AllowClear: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    ...Default.args,
    allowClear: true,
    defaultValue: 'london',
  },
};

export const Loading: StoryObj<typeof Select> = {
  args: {
    ...Default.args,
    loading: true,
  },
};

export const Disabled: StoryObj<typeof Select> = {
  args: {
    ...Default.args,
    defaultValue: 'tokyo',
    disabled: true,
  },
};

export const MultiSelect: StoryObj<typeof Select> = {
  render: (args) => <InteractiveSelect {...args} />,
  args: {
    options: sampleOptions,
    placeholder: 'Select cities...',
    mode: 'multiple',
    allowClear: true,
    defaultValue: ['new-york', 'sydney'],
  },
};