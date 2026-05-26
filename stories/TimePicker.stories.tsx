import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { useState } from 'react';
import { TimePicker } from '../src/components/TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'react-n-design/TimePicker',
  component: TimePicker,
  tags: ['autodocs'],
  argTypes: {
    format: { control: 'radio', options: ['12h', '24h'] },
    minuteInterval: {
      control: 'select',
      options: [1, 5, 10, 15, 30, 60],
      description:
        'Minute intervals: 1 (every minute), 5 (every 5 min), 15 (quarter), 30 (half), 60 (hour)',
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    fullWidth: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    error: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof TimePicker>;

const ControlledTimePicker = (args: React.ComponentProps<typeof TimePicker>) => {
  const [value, setValue] = useState(args.value ?? null);
  return <TimePicker {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    placeholder: 'Select a time',
    label: 'Time',
  },
};

export const Format12h: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    format: '12h',
    placeholder: 'Select time (AM/PM)',
    label: '12-Hour Format',
  },
};

export const Format24h: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    format: '24h',
    placeholder: 'Select time (24h)',
    label: '24-Hour Format',
  },
};

export const WithDefaultValue: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    defaultValue: '14:30',
    format: '24h',
    label: 'Meeting Time',
  },
};

export const Interval10min: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    minuteInterval: 10,
    placeholder: '10-minute intervals',
    label: '10-Minute Intervals',
  },
};

export const Interval15min: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    minuteInterval: 15,
    placeholder: 'Quarter hours (:00, :15)',
    label: '15-Minute Intervals',
  },
};

export const Interval30min: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    minuteInterval: 30,
    placeholder: 'Half hours (:00, :30)',
    label: '30-Minute Intervals',
  },
};

export const Interval60min: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    minuteInterval: 60,
    placeholder: 'Hourly only',
    label: 'Hourly (60 min)',
  },
};

export const RestrictedHours: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    minTime: { hours: 9, minutes: 0 },
    maxTime: { hours: 17, minutes: 30 },
    format: '24h',
    placeholder: 'Business hours only',
    label: 'Business Hours (9:00 - 17:30)',
  },
};

export const DisabledTimes: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    disabledTimes: [
      { hours: 12, minutes: 0 },
      { hours: 12, minutes: 15 },
      { hours: 12, minutes: 30 },
      { hours: 12, minutes: 45 },
    ],
    format: '24h',
    placeholder: 'Lunch hour disabled',
    label: 'No Lunch Hour (12:00-12:45)',
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    disabled: true,
    value: '10:00',
    label: 'Disabled',
  },
};

export const FullWidth: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    fullWidth: true,
    placeholder: 'Full width time picker',
    label: 'Full Width',
  },
};

export const WithError: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    error: true,
    helpText: 'Please select a valid time',
    label: 'Time with Error',
    placeholder: 'Select time',
  },
};

export const SizeSmall: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    size: 'small',
    label: 'Small Size',
    format: '24h',
  },
};

export const SizeLarge: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    size: 'large',
    label: 'Large Size',
    format: '24h',
  },
};

export const WithoutClear: Story = {
  render: (args) => <ControlledTimePicker {...args} />,
  args: {
    allowClear: false,
    value: '14:30',
    label: 'No Clear Button',
  },
};
