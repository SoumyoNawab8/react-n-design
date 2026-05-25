import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup } from '../src/components/RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'react-n-design/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    name: { control: 'text' },
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
};
export default meta;

const defaultOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

const InteractiveRadioGroup = (args: any) => {
  const [selected, setSelected] = useState(args.value);
  return <RadioGroup {...args} value={selected} onChange={setSelected} />;
};

export const Default: StoryObj<typeof RadioGroup> = {
  render: (args) => <InteractiveRadioGroup {...args} />,
  args: {
    options: defaultOptions,
  },
};

export const Horizontal: StoryObj<typeof RadioGroup> = {
  render: (args) => <InteractiveRadioGroup {...args} />,
  args: {
    options: defaultOptions,
    orientation: 'horizontal',
    name: 'fruit-horizontal',
  },
};

export const DisabledOption: StoryObj<typeof RadioGroup> = {
  render: (args) => <InteractiveRadioGroup {...args} />,
  args: {
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
      { value: 'cherry', label: 'Cherry' },
    ],
    value: 'apple',
    name: 'fruit-disabled',
  },
};

export const Preselected: StoryObj<typeof RadioGroup> = {
  render: (args) => <InteractiveRadioGroup {...args} />,
  args: {
    options: defaultOptions,
    value: 'banana',
    name: 'fruit-preselected',
  },
};
