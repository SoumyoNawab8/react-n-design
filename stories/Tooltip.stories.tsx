import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../src/components/Tooltip';
import { Button } from '../src/components/Button';
import { Input } from '../src/components/Input';

const meta: Meta<typeof Tooltip> = {
  title: 'react-n-design/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { description: 'Content to show (ReactNode)' },
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    trigger: { control: 'radio', options: ['hover', 'click', 'focus'] },
    mouseEnterDelay: { control: 'number' },
    mouseLeaveDelay: { control: 'number' },
    withArrow: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Hover: Story = {
  args: {
    content: 'Tooltip on hover',
    trigger: 'hover',
    children: <Button>Hover Over Me</Button>,
  },
};

export const Click: Story = {
  args: {
    content: 'Tooltip on click',
    trigger: 'click',
    children: <Button>Click Me</Button>,
  },
};

export const Focus: Story = {
  args: {
    content: 'Tooltip on focus',
    trigger: 'focus',
    children: <Input placeholder="Focus on me" />,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div>
        <b>User Profile</b>
        <p style={{ margin: 0, fontSize: '12px' }}>Click to view details</p>
      </div>
    ),
    children: <Button>Rich Content</Button>,
  },
};

export const Controlled: Story = {
  render: function Render(args) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button onClick={() => setIsOpen(!isOpen)}>Toggle Tooltip</Button>
        <Tooltip {...args} isOpen={isOpen}>
          <span>A controlled tooltip</span>
        </Tooltip>
      </div>
    );
  },
  args: {
    content: 'This visibility is controlled by an external state.',
    trigger: 'hover', // Trigger is ignored when isOpen is controlled
  },
};