import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from '../src/components/Drawer';
import { Button } from '../src/components/Button';

const meta: Meta<typeof Drawer> = {
  title: 'react-n-design/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  argTypes: {
    placement: { control: 'radio', options: ['left', 'right', 'top', 'bottom'] },
    size: { control: 'radio', options: ['small', 'medium', 'large', 'full'] },
    preventBackdropClick: { control: 'boolean' },
    lockScroll: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

const InteractiveDrawer = (args: React.ComponentProps<typeof Drawer>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>This is the drawer content area.</p>
      </Drawer>
    </>
  );
};

export const Default: Story = {
  render: (args) => <InteractiveDrawer {...args} />,
  args: {
    title: 'Default Drawer',
    placement: 'right',
    size: 'medium',
  },
};

export const LeftPlacement: Story = {
  render: (args) => <InteractiveDrawer {...args} />,
  args: {
    title: 'Left Drawer',
    placement: 'left',
    size: 'medium',
  },
};

export const TopPlacement: Story = {
  render: (args) => <InteractiveDrawer {...args} />,
  args: {
    title: 'Top Drawer',
    placement: 'top',
    size: 'small',
  },
};

export const BottomPlacement: Story = {
  render: (args) => <InteractiveDrawer {...args} />,
  args: {
    title: 'Bottom Drawer',
    placement: 'bottom',
    size: 'small',
  },
};

export const WithFooter: Story = {
  render: (args) => <InteractiveDrawer {...args} />,
  args: {
    title: 'Confirm Action',
    placement: 'right',
    size: 'medium',
    footer: (
      <>
        <Button variant="secondary" onClick={() => alert('Cancelled')}>
          Cancel
        </Button>
        <Button onClick={() => alert('Confirmed')}>Confirm</Button>
      </>
    ),
  },
};

export const FullSize: Story = {
  render: (args) => <InteractiveDrawer {...args} />,
  args: {
    title: 'Full Drawer',
    placement: 'right',
    size: 'full',
  },
};
