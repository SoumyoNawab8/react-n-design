import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../src/components/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'react-n-design/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    // ... other argTypes ...
    variant: { control: 'radio', options: ['default', 'striped'] },
    status: { control: 'select', options: ['normal', 'success', 'error'] },
    indeterminate: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 65,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
  },
};

export const Small: Story = {
  args: {
    value: 40,
    size: 'small',
  },
};

export const Success: Story = { args: { value: 100, status: 'success' } };
export const Error: Story = { args: { value: 75, status: 'error' } };
export const Striped: Story = { args: { value: 50, variant: 'striped' } };
export const Indeterminate: Story = { args: { value: 0, indeterminate: true, variant: 'striped' } };