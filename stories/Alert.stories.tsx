import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../src/components/Alert';
import { FaBell } from 'react-icons/fa';

const meta: Meta<typeof Alert> = {
  title: 'react-n-design/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    description: { control: 'text' },
    type: { control: 'radio', options: ['success', 'info', 'warning', 'error'] },
    closable: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    onClose: { action: 'closed' },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    message: 'Success',
    description: 'Your operation was completed successfully.',
    type: 'success',
    showIcon: true,
  },
};

export const Info: Story = {
  args: {
    message: 'Informational Message',
    type: 'info',
    showIcon: true,
  },
};

export const Warning: Story = {
  args: {
    message: 'Warning: Please Read Carefully',
    description: 'There might be potential issues with your current configuration.',
    type: 'warning',
    showIcon: true,
  },
};

export const Error: Story = {
  args: {
    message: 'Error',
    description: 'An unexpected error occurred. Please try again.',
    type: 'error',
    showIcon: true,
    closable: true,
  },
};

export const WithDescription: Story = {
  args: {
    message: 'A Message with a Detailed Description',
    description: 'This is the longer description text that provides more context and information to the user. It can span multiple lines if necessary.',
    type: 'info',
  },
};

export const Closable: Story = {
  args: {
    message: 'This alert can be closed.',
    type: 'info',
    closable: true,
  },
};

export const CustomIcon: Story = {
    args: {
      message: 'A Custom Notification',
      type: 'info',
      showIcon: true,
      icon: <FaBell />,
    },
  };