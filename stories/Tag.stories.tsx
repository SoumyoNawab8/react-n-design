import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '../src/components/Tag';
import { FaTag } from 'react-icons/fa';

const meta: Meta<typeof Tag> = {
  title: 'react-n-design/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: { control: 'radio', options: ['small', 'medium'] },
    variant: { control: 'radio', options: ['default', 'primary', 'outline'] },
    color: { control: 'color', description: 'Overrides default colors' },
    onClose: { action: 'closed', description: 'Callback for dismissible tags' },
  },
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = { args: { children: 'Default Tag' } };
export const Primary: Story = { args: { children: 'Primary Tag', variant: 'primary' } };

export const WithIcon: Story = {
  args: {
    children: 'Category',
    leftIcon: <FaTag />,
  },
};

export const Dismissible: Story = {
  args: {
    children: 'Click X to close',
    onClose: () => alert('Tag closed!'),
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Tag',
    variant: 'outline',
  },
};

export const CustomColor: Story = {
  args: {
    children: 'Success',
    variant: 'outline',
    color: '#28a745',
    leftIcon: '✅',
  },
};