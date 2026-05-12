import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../src/components/Badge';
import { Button } from '../src/components/Button';
import { Avatar } from '../src/components/Avatar';

const meta: Meta<typeof Badge> = {
  title: 'react-n-design/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
    },
    size: { control: 'radio', options: ['small', 'medium'] },
    dot: { control: 'boolean' },
    showZero: { control: 'boolean' },
    overflowCount: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    count: 5,
    variant: 'primary',
    size: 'medium',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge count={1} variant="primary" />
      <Badge count={2} variant="secondary" />
      <Badge count={3} variant="success" />
      <Badge count={4} variant="warning" />
      <Badge count={5} variant="error" />
    </div>
  ),
};

export const Dot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge dot />
      <Badge dot variant="success" />
      <Badge dot variant="error" />
    </div>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Badge count={3}>
        <Button>Messages</Button>
      </Badge>
      <Badge count={12} variant="success">
        <Button variant="secondary">Notifications</Button>
      </Badge>
      <Badge dot variant="error">
        <Button>Alerts</Button>
      </Badge>
    </div>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Badge count={5}>
        <Avatar initials="JD" size="large" />
      </Badge>
      <Badge dot variant="success">
        <Avatar initials="JD" size="large" />
      </Badge>
    </div>
  ),
};

export const Overflow: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge count={99} />
      <Badge count={100} />
      <Badge count={999} overflowCount={99} />
    </div>
  ),
};

export const Zero: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Badge count={0} />
      <Badge count={0} showZero />
    </div>
  ),
};
