import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../src/components/Slider';

const meta: Meta<typeof Slider> = {
  title: 'react-n-design/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
    vertical: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Slider>;

const ControlledSlider = (args: React.ComponentProps<typeof Slider>) => {
  const [value, setValue] = useState(args.value ?? args.defaultValue ?? 50);
  return <Slider {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <ControlledSlider {...args} />,
  args: {
    label: 'Volume',
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
  },
};

export const WithMarks: Story = {
  render: (args) => <ControlledSlider {...args} />,
  args: {
    label: 'Rating',
    min: 0,
    max: 10,
    step: 1,
    defaultValue: 5,
    marks: [
      { value: 0, label: '0' },
      { value: 5, label: '5' },
      { value: 10, label: '10' },
    ],
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledSlider {...args} />,
  args: {
    label: 'Disabled',
    min: 0,
    max: 100,
    defaultValue: 30,
    disabled: true,
  },
};

export const SmallRange: Story = {
  render: (args) => <ControlledSlider {...args} />,
  args: {
    label: 'Opacity',
    min: 0,
    max: 1,
    step: 0.01,
    defaultValue: 0.75,
  },
};
