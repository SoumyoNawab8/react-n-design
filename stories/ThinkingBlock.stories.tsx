import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThinkingBlock } from '../src/components/ThinkingBlock';

const meta: Meta<typeof ThinkingBlock> = {
  title: 'AI / ThinkingBlock',
  component: ThinkingBlock,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Visualizes an LLM\'s reasoning chain with collapsible, timestamped steps. Great for showing "chain of thought" or reasoning traces.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    steps: { control: 'object' },
    isThinking: { control: 'boolean' },
    title: { control: 'text' },
    defaultExpanded: { control: 'boolean' },
    showTimestamps: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const demoSteps = [
  { id: '1', text: 'Analyzing the user query for intent and entities...', timestamp: Date.now() - 3000 },
  { id: '2', text: 'Retrieving relevant documents from the knowledge base...', timestamp: Date.now() - 2000 },
  { id: '3', text: 'Synthesizing information into a coherent response...', timestamp: Date.now() - 1000 },
];

export const Default: Story = {
  args: {
    steps: demoSteps,
    isThinking: true,
    title: 'Thinking',
    defaultExpanded: true,
    showTimestamps: true,
  },
};

export const Collapsed: Story = {
  args: {
    steps: demoSteps,
    isThinking: false,
    title: 'Reasoning Steps',
    defaultExpanded: false,
    showTimestamps: false,
  },
};

export const EmptyThinking: Story = {
  args: {
    steps: [],
    isThinking: true,
    title: 'Thinking',
    defaultExpanded: true,
    showTimestamps: false,
  },
};

export const ManySteps: Story = {
  args: {
    steps: Array.from({ length: 8 }, (_, i) => ({
      id: String(i + 1),
      text: `Step ${i + 1}: Performing analysis phase ${i + 1}...`,
      timestamp: Date.now() - (8 - i) * 1000,
    })),
    isThinking: true,
    title: 'Deep Reasoning',
    defaultExpanded: true,
    showTimestamps: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(true);
    const [thinking, setThinking] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setExpanded((e) => !e)}>Toggle Expanded</button>
          <button onClick={() => setThinking((t) => !t)}>Toggle Thinking</button>
        </div>
        <ThinkingBlock
          steps={demoSteps}
          isThinking={thinking}
          title="Interactive Thinking"
          defaultExpanded={expanded}
          showTimestamps
          onToggle={setExpanded}
        />
      </div>
    );
  },
};
