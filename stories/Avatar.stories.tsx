import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from '../src/components/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'react-n-design/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['small', 'medium', 'large', 'xlarge'] },
    shape: { control: 'radio', options: ['circle', 'square', 'rounded'] },
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    initials: 'JD',
    size: 'medium',
    shape: 'circle',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=12',
    alt: 'Jane Doe',
    size: 'medium',
    shape: 'circle',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar initials="S" size="small" />
      <Avatar initials="M" size="medium" />
      <Avatar initials="L" size="large" />
      <Avatar initials="XL" size="xlarge" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar initials="C" shape="circle" />
      <Avatar initials="S" shape="square" />
      <Avatar initials="R" shape="rounded" />
    </div>
  ),
};

export const Fallbacks: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      <Avatar initials="AB" />
      <Avatar />
      <Avatar src="https://invalid-url.com/image.jpg" alt="Broken" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar initials="A" />
      <Avatar initials="B" />
      <Avatar initials="C" />
      <Avatar initials="D" />
      <Avatar initials="E" />
    </AvatarGroup>
  ),
};
