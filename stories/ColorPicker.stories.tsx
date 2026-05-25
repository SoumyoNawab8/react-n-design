import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { useState } from 'react';
import { ColorPicker } from '../src/components/ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'react-n-design/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  argTypes: {
    showInput: { control: 'boolean' },
    presets: { control: 'object' },
  },
};
export default meta;

type Story = StoryObj<typeof ColorPicker>;

const ControlledColorPicker = (args: React.ComponentProps<typeof ColorPicker>) => {
  const [value, setValue] = useState(args.value ?? '#6d5dfc');
  return <ColorPicker {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <ControlledColorPicker {...args} />,
  args: {
    value: '#6d5dfc',
  },
};

export const WithoutInput: Story = {
  render: (args) => <ControlledColorPicker {...args} />,
  args: {
    value: '#22c55e',
    showInput: false,
  },
};

export const CustomPresets: Story = {
  render: (args) => <ControlledColorPicker {...args} />,
  args: {
    value: '#ef4444',
    presets: [
      '#ef4444',
      '#f97316',
      '#f59e0b',
      '#84cc16',
      '#22c55e',
      '#3b82f6',
      '#6366f1',
      '#a855f7',
    ],
  },
};

export const DarkColor: Story = {
  render: (args) => <ControlledColorPicker {...args} />,
  args: {
    value: '#111827',
  },
};
