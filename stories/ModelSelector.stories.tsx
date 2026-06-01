import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FaBolt, FaBrain, FaRobot } from 'react-icons/fa';
import type { AIModel } from '../src/components/ModelSelector';
import { ModelSelector } from '../src/components/ModelSelector';

const meta: Meta<typeof ModelSelector> = {
  title: 'AI / ModelSelector',
  component: ModelSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A dropdown selector for AI models showing provider, latency, context window, and pricing metadata. Fully keyboard accessible.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    models: { control: 'object' },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    onChange: { action: 'model changed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const demoModels: AIModel[] = [
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    contextWindow: 128000,
    pricePer1kTokens: 0.005,
    latencyMs: 120,
    logo: <FaRobot size={20} color="#10a37f" />,
    description: 'Flagship multimodal model with vision capabilities.',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    contextWindow: 200000,
    pricePer1kTokens: 0.003,
    latencyMs: 180,
    logo: <FaBrain size={20} color="#d97757" />,
    description: 'Excellent for coding and long-context reasoning.',
  },
  {
    id: 'gemini-1-5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    contextWindow: 1000000,
    pricePer1kTokens: 0.0035,
    latencyMs: 250,
    logo: <FaBolt size={20} color="#4285f4" />,
    description: 'Massive context window and strong reasoning.',
  },
  {
    id: 'llama-3-1-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    contextWindow: 128000,
    pricePer1kTokens: 0.0009,
    latencyMs: 350,
    logo: <FaBrain size={20} color="#0866ff" />,
    description: 'Open-weight model with strong performance.',
  },
];

const ControlledSelector = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  return (
    <ModelSelector
      {...args}
      value={value}
      onChange={(v) => {
        setValue(v);
        args.onChange?.(v);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <ControlledSelector {...args} />,
  args: {
    models: demoModels,
    placeholder: 'Select a model...',
  },
};

export const WithSelection: Story = {
  render: (args) => <ControlledSelector {...args} />,
  args: {
    models: demoModels,
    value: 'claude-3-5-sonnet',
    placeholder: 'Select a model...',
  },
};

export const SingleModel: Story = {
  render: (args) => <ControlledSelector {...args} />,
  args: {
    models: [demoModels[0]],
    placeholder: 'Select a model...',
  },
};

export const NoModels: Story = {
  render: (args) => <ControlledSelector {...args} />,
  args: {
    models: [],
    placeholder: 'Select a model...',
  },
};
