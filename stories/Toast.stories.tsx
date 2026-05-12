import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider } from '../src/components/Toast/ToastProvider';
import { useToast } from '../src/components/Toast/useToast';
import { Button } from '../src/components/Button';

const meta: Meta<typeof ToastProvider> = {
  title: 'react-n-design/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'radio',
      options: [
        'top-right',
        'top-center',
        'top-left',
        'bottom-right',
        'bottom-center',
        'bottom-left',
      ],
    },
    maxToasts: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof ToastProvider>;

const ToastDemo = () => {
  const { success, error, warning, info, promise, dismissAll } = useToast();

  const handlePromise = () => {
    const fakePromise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('Data saved!'), 2000);
    });
    promise(fakePromise, {
      loading: 'Saving...',
      success: (data) => `Success: ${data}`,
      error: 'Something went wrong',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Button onClick={() => success('Changes saved successfully')}>Success Toast</Button>
      <Button onClick={() => error('Something went wrong')}>Error Toast</Button>
      <Button onClick={() => warning('Please review your input')}>Warning Toast</Button>
      <Button onClick={() => info('New update available')}>Info Toast</Button>
      <Button onClick={handlePromise}>Promise Toast</Button>
      <Button variant="secondary" onClick={dismissAll}>
        Dismiss All
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'top-right',
    maxToasts: 5,
  },
};

export const TopCenter: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'top-center',
    maxToasts: 5,
  },
};

export const BottomLeft: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'bottom-left',
    maxToasts: 5,
  },
};
