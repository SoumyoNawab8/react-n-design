import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../src/components/Icon';
import { FaBeer, FaRocket, FaHeart } from 'react-icons/fa';

const meta: Meta<typeof Icon> = {
  title: 'react-n-design/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'home',
        'user',
        'search',
        'check',
        'times',
        'arrow-right',
        'star',
        'heart',
        'bell',
        'cog',
        'trash',
        'edit',
        'plus',
        'eye',
        'upload',
        'download',
        'lock',
        'envelope',
        'calendar',
        'info',
        'warning',
        'spinner',
      ],
      description: 'Predefined icon name from the built-in map',
    },
    icon: {
      control: false,
      description: 'Pass a react-icons component directly',
    },
    size: {
      control: { type: 'range', min: 12, max: 64, step: 1 },
      description: 'Pixel size of the icon',
    },
    color: {
      control: 'color',
      description: 'Explicit icon color',
    },
    variant: {
      control: 'radio',
      options: ['default', 'circle', 'square'],
      description: 'Neomorphic container variant',
    },
  },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'search',
    size: 24,
    variant: 'default',
  },
};

export const CircleVariant: Story = {
  args: {
    name: 'heart',
    size: 24,
    variant: 'circle',
    color: '#e53e3e',
  },
};

export const SquareVariant: Story = {
  args: {
    name: 'cog',
    size: 24,
    variant: 'square',
    color: '#6d5dfc',
  },
};

export const LargeSize: Story = {
  args: {
    name: 'star',
    size: 48,
    variant: 'circle',
    color: '#f6ad55',
  },
};

export const WithIconComponent: Story = {
  args: {
    icon: FaRocket,
    size: 32,
    variant: 'square',
    color: '#38b2ac',
  },
};

export const IconGrid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {['home', 'user', 'search', 'check', 'times', 'arrow-right', 'star', 'heart', 'bell', 'cog'].map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Icon name={name} variant="circle" size={20} />
          <span style={{ fontSize: '12px', color: '#888' }}>{name}</span>
        </div>
      ))}
    </div>
  ),
};
