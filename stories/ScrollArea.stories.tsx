import type { Meta, StoryObj } from '@storybook/react';
import { ScrollArea } from '../src/components/ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'react-n-design/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  argTypes: {
    horizontal: { control: 'boolean' },
    autoHide: { control: 'boolean' },
    maxHeight: { control: 'text' },
  },
};
export default meta;

const longContent = (
  <div style={{ padding: '16px' }}>
    {Array.from({ length: 30 }).map((_, i) => (
      <p key={i} style={{ margin: '8px 0' }}>
        Paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    ))}
  </div>
);

export const Default: StoryObj<typeof ScrollArea> = {
  args: {
    maxHeight: '300px',
    children: longContent,
  },
};

export const Horizontal: StoryObj<typeof ScrollArea> = {
  args: {
    horizontal: true,
    maxHeight: '300px',
    children: (
      <div style={{ width: '1200px', padding: '16px' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <p key={i} style={{ margin: '8px 0' }}>
            Wide paragraph {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    ),
  },
};

export const AutoHide: StoryObj<typeof ScrollArea> = {
  args: {
    autoHide: true,
    maxHeight: '300px',
    children: longContent,
  },
};

export const LongContent: StoryObj<typeof ScrollArea> = {
  args: {
    maxHeight: '400px',
    children: (
      <div style={{ padding: '16px' }}>
        {Array.from({ length: 100 }).map((_, i) => (
          <p key={i} style={{ margin: '4px 0', fontSize: '14px' }}>
            Item {i + 1}: The quick brown fox jumps over the lazy dog.
          </p>
        ))}
      </div>
    ),
  },
};
