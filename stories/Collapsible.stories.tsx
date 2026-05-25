import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Collapsible } from '../src/components/Collapsible';

const meta: Meta<typeof Collapsible> = {
  title: 'react-n-design/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: { control: 'boolean' },
    unmountOnExit: { control: 'boolean' },
  },
};
export default meta;

export const Default: StoryObj<typeof Collapsible> = {
  args: {
    trigger: 'Toggle Content',
    children:
      'This is collapsible content that can be shown or hidden by clicking the trigger above.',
  },
};

export const DefaultOpen: StoryObj<typeof Collapsible> = {
  args: {
    trigger: 'Initially Open',
    defaultOpen: true,
    children: 'This content is visible by default because defaultOpen is set to true.',
  },
};

export const UnmountOnExit: StoryObj<typeof Collapsible> = {
  args: {
    trigger: 'Unmount on Exit',
    unmountOnExit: true,
    children:
      'When collapsed, this content is completely removed from the DOM instead of just hidden.',
  },
};

export const Nested: StoryObj<typeof Collapsible> = {
  render: function NestedCollapsible() {
    const [outerOpen, setOuterOpen] = useState(true);
    return (
      <Collapsible trigger="Outer Collapsible" open={outerOpen} onOpenChange={setOuterOpen}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p>This is the outer collapsible content.</p>
          <Collapsible trigger="Inner Collapsible">
            <p>This is nested inside the outer collapsible.</p>
          </Collapsible>
        </div>
      </Collapsible>
    );
  },
};
