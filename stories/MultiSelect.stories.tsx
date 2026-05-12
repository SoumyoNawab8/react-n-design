import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from '../src/components/MultiSelect';

const meta: Meta<typeof MultiSelect> = {
  title: 'react-n-design/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    maxHeight: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof MultiSelect>;

const options = [
  'Apple',
  'Banana',
  'Cherry',
  'Date',
  'Elderberry',
  'Fig',
  'Grape',
  'Honeydew',
  'Kiwi',
  'Lemon',
  'Mango',
  'Nectarine',
  'Orange',
  'Papaya',
  'Quince',
  'Raspberry',
  'Strawberry',
  'Tangerine',
  'Ugli fruit',
  'Watermelon',
];

const ControlledMultiSelect = (args: React.ComponentProps<typeof MultiSelect>) => {
  const [value, setValue] = useState<string[]>([]);
  return <MultiSelect {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <ControlledMultiSelect {...args} />,
  args: {
    options,
    placeholder: 'Select fruits...',
  },
};

export const WithPreselected: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['Apple', 'Banana']);
    return (
      <MultiSelect
        options={options}
        value={value}
        onChange={setValue}
        placeholder="Select fruits..."
      />
    );
  },
};

export const Disabled: Story = {
  render: (args) => <ControlledMultiSelect {...args} />,
  args: {
    options,
    disabled: true,
    placeholder: 'Disabled...',
  },
};

export const MaxHeight: Story = {
  render: (args) => <ControlledMultiSelect {...args} />,
  args: {
    options,
    maxHeight: 150,
    placeholder: 'Limited height...',
  },
};
