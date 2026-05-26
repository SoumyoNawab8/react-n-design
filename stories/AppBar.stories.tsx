import type { Meta, StoryObj } from '@storybook/react';
import { AppBar } from '../src/components/AppBar';
import { Button } from '../src/components/Button';

const meta: Meta<typeof AppBar> = {
  title: 'react-n-design/AppBar',
  component: AppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

export const Default: Story = {
  args: {
    title: 'Application Title',
  },
};

export const WithMenuButton: Story = {
  args: {
    title: 'Dashboard',
    onMenuClick: () => alert('Menu clicked!'),
  },
};

export const WithActions: Story = {
  args: {
    title: 'My App',
    actions: (
      <>
        <Button size="small" variant="secondary">
          Login
        </Button>
        <Button size="small">Sign Up</Button>
      </>
    ),
  },
};

export const Complete: Story = {
  args: {
    title: 'Navigation Bar',
    onMenuClick: () => console.log('Menu opened'),
    actions: (
      <>
        <Button size="small" variant="secondary">
          Settings
        </Button>
        <Button size="small">Profile</Button>
      </>
    ),
  },
};

export const Sticky: Story = {
  args: {
    title: 'Sticky Header',
    position: 'sticky',
    onMenuClick: () => {},
    actions: (
      <>
        <Button size="small">Action</Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'This AppBar has sticky positioning and will stay at the top when scrolling.',
      },
    },
  },
};

export const NonElevated: Story = {
  args: {
    title: 'Flat AppBar',
    elevated: false,
  },
};
