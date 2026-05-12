import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SkipToContent } from '../src/components/SkipToContent';

const meta: Meta<typeof SkipToContent> = {
  title: 'react-n-design/SkipToContent',
  component: SkipToContent,
  tags: ['autodocs'],
  argTypes: {
    targetId: { control: 'text' },
    label: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof SkipToContent>;

export const Default: Story = {
  args: {
    targetId: 'main-content',
    label: 'Skip to main content',
  },
  render: (args) => (
    <div>
      <SkipToContent {...args} />
      <nav style={{ padding: '16px', background: '#f0f0f0' }}>
        <strong>Navigation</strong>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <main id={args.targetId} style={{ padding: '16px' }} tabIndex={-1}>
        <h1>Main Content</h1>
        <p>Press Tab to reveal the skip link, then press Enter to jump here.</p>
      </main>
    </div>
  ),
};
