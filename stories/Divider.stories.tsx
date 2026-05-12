import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../src/components/Divider';

const meta: Meta<typeof Divider> = {
  title: 'react-n-design/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    type: { control: 'radio', options: ['solid', 'dashed', 'dotted'] },
    children: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = { args: {} };

export const Dashed: Story = { args: { type: 'dashed' } };
export const Dotted: Story = { args: { type: 'dotted' } };

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [
    (Story) => (
      <div style={{ height: 40, display: 'flex', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithText: Story = {
  args: { children: 'Section Title' },
};
