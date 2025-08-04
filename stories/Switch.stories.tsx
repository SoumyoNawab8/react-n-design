import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../src/components/Switch';
import { FaMoon, FaSun } from 'react-icons/fa';

const meta: Meta<typeof Switch> = {
  title: 'react-n-design/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean', description: 'The controlled state of the switch' },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    labelPosition: { control: 'radio', options: ['left', 'right'] },
    loading: { control: 'boolean' },
    onIcon: { description: 'Icon for the ON state (ReactNode)' },
    offIcon: { description: 'Icon for the OFF state (ReactNode)' },
  },
};
export default meta;

// A helper component to manage state for stories, making them interactive
const InteractiveSwitch = (args: any) => {
  const [isChecked, setIsChecked] = useState(args.checked || false);
  return <Switch {...args} checked={isChecked} onChange={setIsChecked} />;
};

export const Default: StoryObj<typeof Switch> = {
  render: (args) => <InteractiveSwitch {...args} />,
  args: {
    checked: false,
  },
};

export const WithLabel: StoryObj<typeof Switch> = {
  render: (args) => <InteractiveSwitch {...args} />,
  args: {
    label: 'Enable Notifications',
    labelPosition: 'right',
  },
};

export const WithIcons: StoryObj<typeof Switch> = {
  render: (args) => <InteractiveSwitch {...args} />,
  args: {
    checked: false,
    label: 'Theme',
    size: 'large',
    onIcon: <FaMoon />,
    offIcon: <FaSun />,
  },
};

export const Loading: StoryObj<typeof Switch> = {
  render: (args) => <InteractiveSwitch {...args} />,
  args: {
    checked: false,
    loading: true,
    label: 'Processing...',
  },
};

export const Disabled: StoryObj<typeof Switch> = {
  render: (args) => <InteractiveSwitch {...args} />,
  args: {
    checked: true,
    disabled: true,
    label: "Can't change this",
  },
};