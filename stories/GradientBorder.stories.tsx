import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { GradientBorder } from '../src/components/GradientBorder';

const meta: Meta<typeof GradientBorder> = {
  title: 'Visual / GradientBorder',
  component: GradientBorder,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Wraps children with a vibrant conic-gradient border. Use the animated variant for "AI is thinking" states or premium CTAs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    animated: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    animated: false,
    children: (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <h3 style={{ margin: 0 }}>Premium Feature</h3>
        <p style={{ margin: '8px 0 0' }}>Highlight important content with a gradient border.</p>
      </div>
    ),
  },
};

export const Animated: Story = {
  args: {
    animated: true,
    children: (
      <div style={{ padding: '24px', textAlign: 'center' }}>
        <h3 style={{ margin: 0 }}>AI is Thinking...</h3>
        <p style={{ margin: '8px 0 0' }}>The animated border draws attention to active processing states.</p>
      </div>
    ),
  },
};

export const WithCard: Story = {
  args: {
    animated: false,
    children: (
      <Card variant="glass" bordered style={{ margin: '2px' }}>
        <div style={{ padding: '16px' }}>
          <h4 style={{ margin: '0 0 8px' }}>Pro Plan</h4>
          <p style={{ margin: 0 }}>Unlock all features with our premium tier.</p>
        </div>
      </Card>
    ),
  },
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        { name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      ],
    },
  },
};

export const WithButton: Story = {
  args: {
    animated: true,
    children: (
      <div style={{ padding: '4px' }}>
        <Button size="large" fullWidth>
          Upgrade to Pro
        </Button>
      </div>
    ),
  },
};

export const MinimalContent: Story = {
  args: {
    animated: false,
    children: <span style={{ padding: '12px 24px', display: 'block' }}>Badge or label</span>,
  },
};
