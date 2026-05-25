import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaUnderline,
} from 'react-icons/fa';
import { Toggle, ToggleGroup } from '../src/components/Toggle';

const meta: Meta<typeof Toggle> = {
  title: 'react-n-design/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    pressed: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onPressedChange: { action: 'pressed changed' },
  },
};
export default meta;

const InteractiveToggle = (args: any) => {
  const [pressed, setPressed] = useState(args.pressed || false);
  return <Toggle {...args} pressed={pressed} onPressedChange={setPressed} />;
};

export const Default: StoryObj<typeof Toggle> = {
  render: (args) => <InteractiveToggle {...args} />,
  args: {
    children: 'Toggle',
  },
};

export const Pressed: StoryObj<typeof Toggle> = {
  render: (args) => <InteractiveToggle {...args} />,
  args: {
    pressed: true,
    children: 'Pressed',
  },
};

export const Disabled: StoryObj<typeof Toggle> = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const WithIcon: StoryObj<typeof Toggle> = {
  render: (args) => <InteractiveToggle {...args} />,
  args: {
    children: (
      <>
        <FaBold />
        <span>Bold</span>
      </>
    ),
  },
};

export const ToggleGroupSingle: StoryObj<typeof Toggle> = {
  render: () => {
    const [value, setValue] = useState('left');
    return (
      <ToggleGroup type="single" value={value} onValueChange={setValue}>
        <Toggle value="left">
          <FaAlignLeft />
        </Toggle>
        <Toggle value="center">
          <FaAlignCenter />
        </Toggle>
        <Toggle value="right">
          <FaAlignRight />
        </Toggle>
      </ToggleGroup>
    );
  },
};

export const ToggleGroupMultiple: StoryObj<typeof Toggle> = {
  render: () => {
    const [value, setValue] = useState<string[]>(['bold']);
    return (
      <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
        <Toggle value="bold">
          <FaBold />
        </Toggle>
        <Toggle value="italic">
          <FaItalic />
        </Toggle>
        <Toggle value="underline">
          <FaUnderline />
        </Toggle>
      </ToggleGroup>
    );
  },
};
