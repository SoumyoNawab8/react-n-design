import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '../src/components/Breadcrumbs';
import { FaHome, FaCog, FaUser, FaFileAlt } from 'react-icons/fa';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'react-n-design/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Settings', href: '/settings' },
      { label: 'Profile' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: <FaHome size={14} /> },
      { label: 'Documents', href: '/docs', icon: <FaFileAlt size={14} /> },
      { label: 'Settings', href: '/settings', icon: <FaCog size={14} /> },
      { label: 'Profile', icon: <FaUser size={14} /> },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops', href: '/products/electronics/laptops' },
      { label: 'Gaming', href: '/products/electronics/laptops/gaming' },
      { label: 'ASUS ROG' },
    ],
  },
};
