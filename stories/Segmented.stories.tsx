import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Segmented } from '../src/components/Segmented';

const meta: Meta<typeof Segmented> = {
  title: 'react-n-design/Segmented',
  component: Segmented,
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of options with label, value, and optional disabled state',
    },
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
    onChange: {
      description: 'Callback when selection changes',
      action: 'changed',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the segmented control',
    },
    block: {
      control: 'boolean',
      description: 'Whether the control takes full width',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Segmented>;

const defaultOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
];

const SegmentedWithState = ({ options, ...args }: { options: typeof defaultOptions } & Omit<Parameters<typeof Segmented>[0], 'options'>) => {
  const [value, setValue] = useState(options[0].value);
  return <Segmented {...args} options={options} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: () => <SegmentedWithState options={defaultOptions} />,
};

export const SmallSize: Story = {
  render: () => <SegmentedWithState options={defaultOptions} size="small" />,
};

export const LargeSize: Story = {
  render: () => <SegmentedWithState options={defaultOptions} size="large" />,
};

export const BlockStyle: Story = {
  render: () => <SegmentedWithState options={defaultOptions} block />,
};

export const WithDisabledOption: Story = {
  render: () => {
    const optionsWithDisabled = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry (Out of Stock)', value: 'cherry', disabled: true },
      { label: 'Date', value: 'date' },
    ];
    return <SegmentedWithState options={optionsWithDisabled} />;
  },
};

export const TwoOptions: Story = {
  render: () => (
    <SegmentedWithState 
      options={[
        { label: 'List', value: 'list' },
        { label: 'Grid', value: 'grid' },
      ]} 
    />
  ),
};

export const ManyOptions: Story = {
  render: () => (
    <SegmentedWithState 
      options={[
        { label: 'Jan', value: 'jan' },
        { label: 'Feb', value: 'feb' },
        { label: 'Mar', value: 'mar' },
        { label: 'Apr', value: 'apr' },
        { label: 'May', value: 'may' },
        { label: 'Jun', value: 'jun' },
      ]} 
    />
  ),
};

export const ComplexLabels: Story = {
  render: () => (
    <SegmentedWithState 
      options={[
        { label: <span style={{ color: '#666' }}>Basic</span>, value: 'basic' },
        { label: <strong>Pro</strong>, value: 'pro' },
        { label: <em>Enterprise</em>, value: 'enterprise' },
      ]} 
    />
  ),
};
