import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { CopyButton } from '../src/components/CopyButton';

const meta: Meta<typeof CopyButton> = {
  title: 'react-n-design/CopyButton',
  component: CopyButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    text: {
      control: 'text',
      description: 'The text to copy to clipboard',
    },
    tooltipLabel: {
      control: 'text',
      description: 'Tooltip text shown before copying',
    },
    successTooltipLabel: {
      control: 'text',
      description: 'Tooltip text shown after successful copy',
    },
    successDuration: {
      control: 'number',
      description: 'Duration in milliseconds to show success state',
      table: {
        defaultValue: { summary: '2000' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onCopySuccess: {
      action: 'copied',
      description: 'Called when text is successfully copied',
    },
    onCopyError: {
      action: 'copy error',
      description: 'Called when copy operation fails',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {
    text: 'This text will be copied to your clipboard',
    'aria-label': 'Copy text to clipboard',
  },
};

export const SmallSize: Story = {
  args: {
    text: 'Small copy button',
    size: 'sm',
    'aria-label': 'Copy text',
  },
};

export const MediumSize: Story = {
  args: {
    text: 'Medium copy button',
    size: 'md',
    'aria-label': 'Copy text',
  },
};

export const LargeSize: Story = {
  args: {
    text: 'Large copy button',
    size: 'lg',
    'aria-label': 'Copy text',
  },
};

export const WithCustomTooltip: Story = {
  args: {
    text: 'Custom tooltip example',
    tooltipLabel: 'Click to copy code',
    successTooltipLabel: 'Code copied to clipboard!',
    'aria-label': 'Copy code',
  },
};

export const WithShorterSuccessDuration: Story = {
  args: {
    text: 'Quick revert example',
    successDuration: 1000,
    'aria-label': 'Copy text quickly',
  },
};

export const Disabled: Story = {
  args: {
    text: 'Cannot copy this',
    disabled: true,
    'aria-label': 'Copy disabled',
  },
};

// Story demonstrating auto-detect from text selection
export const WithAutoDetect: Story = {
  render: () => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <div style={{ maxWidth: '400px' }}>
        <div
          ref={ref}
          style={{
            padding: '16px',
            background: '#f5f5f5',
            borderRadius: '8px',
            marginBottom: '16px',
            fontFamily: 'monospace',
          }}
        >
          {`const greeting = "Hello, World!";
console.log(greeting);`}
        </div>
        <div style={{ textAlign: 'right' }}>
          <CopyButton
            targetRef={ref}
            tooltipLabel="Copy code snippet"
            successTooltipLabel="Code copied!"
          />
        </div>
      </div>
    );
  },
};

// Story with all sizes side by side
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <CopyButton text="Small" size="sm" />
      <CopyButton text="Medium" size="md" />
      <CopyButton text="Large" size="lg" />
    </div>
  ),
};

// Story demonstrating callbacks
export const WithCallbacks: Story = {
  args: {
    text: 'Copy with console logging',
    onCopySuccess: (text: string) => console.log('Copied:', text),
    onCopyError: (error: Error) => console.error('Copy failed:', error),
    'aria-label': 'Copy text with logging',
  },
};

// Custom icons example
export const WithCustomIcons: Story = {
  args: {
    text: 'Custom icons example',
    copyIcon: <span>📋</span>,
    successIcon: <span>✅</span>,
    'aria-label': 'Copy with emoji icons',
  },
};

// Story with long text
export const WithLongText: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    tooltipLabel: 'Copy long text',
    'aria-label': 'Copy long text',
  },
};
