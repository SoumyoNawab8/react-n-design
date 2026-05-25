import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { useState } from 'react';
import { DatePicker } from '../src/components/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'react-n-design/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'radio', options: ['single', 'range'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    format: { control: 'text' },
    fullWidth: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof DatePicker>;

const ControlledDatePicker = (args: React.ComponentProps<typeof DatePicker>) => {
  const [value, setValue] = useState(args.value ?? null);
  return <DatePicker {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <ControlledDatePicker {...args} />,
  args: {
    placeholder: 'Select a date',
    label: 'Date',
  },
};

export const Range: Story = {
  render: (args) => <ControlledDatePicker {...args} />,
  args: {
    mode: 'range',
    placeholder: 'Select date range',
    label: 'Date Range',
  },
};

export const DisabledDates: Story = {
  render: (args) => <ControlledDatePicker {...args} />,
  args: {
    placeholder: 'Avoid weekends',
    label: 'Weekdays Only',
    disabledDate: (date: Date) => {
      const day = date.getDay();
      return day === 0 || day === 6;
    },
  },
};

export const MinMax: Story = {
  render: (args) => {
    const today = new Date();
    const min = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const max = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);
    return <ControlledDatePicker {...args} minDate={min} maxDate={max} />;
  },
  args: {
    placeholder: 'Within 2 weeks',
    label: 'Restricted Dates',
  },
};

export const WithDefaultValue: Story = {
  render: (args) => <ControlledDatePicker {...args} />,
  args: {
    defaultValue: new Date(),
    label: 'Today',
  },
};

export const FullWidth: Story = {
  render: (args) => <ControlledDatePicker {...args} />,
  args: {
    fullWidth: true,
    placeholder: 'Full width date picker',
    label: 'Full Width',
  },
};
