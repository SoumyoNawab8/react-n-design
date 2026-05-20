import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { AIThinking } from '../src/components/AIThinking';

const meta: Meta<typeof AIThinking> = {
  title: 'AI / AIThinking',
  component: AIThinking,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Animated reasoning step display for LLMs like o1, Gemini Flash Thinking, and Claude. Shows chain-of-thought with elapsed timer.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    steps: { control: 'object' },
    isThinking: { control: 'boolean' },
    title: { control: 'text' },
    defaultExpanded: { control: 'boolean' },
    showElapsed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const demoSteps = [
  { text: 'User is asking about Neumorphism design principles.', id: '1' },
  { text: 'Neumorphism combines flat minimalism with soft shadows and highlights.', id: '2' },
  { text: 'Key characteristics: soft shadows, monochrome palettes, tactile depth.', id: '3' },
  { text: 'react-n-design is the only major library using this aesthetic.', id: '4' },
];

export const Default: Story = {
  args: {
    steps: demoSteps,
    isThinking: false,
    title: 'Reasoning',
    defaultExpanded: true,
    showElapsed: true,
    startTime: Date.now() - 12000,
  },
};

export const Thinking: Story = {
  args: {
    steps: demoSteps.slice(0, 2),
    isThinking: true,
    title: 'Thinking',
    defaultExpanded: true,
    showElapsed: true,
    startTime: Date.now(),
  },
};

export const Collapsed: Story = {
  args: {
    steps: demoSteps,
    isThinking: true,
    title: 'Reasoning',
    defaultExpanded: false,
    showElapsed: true,
    startTime: Date.now() - 5000,
  },
};

export const Streaming: Story = {
  render: () => {
    const [steps, setSteps] = useState([
      { text: 'Analyzing the query...', id: '1' },
    ]);
    const [isThinking, setIsThinking] = useState(true);
    const startTime = useState(Date.now())[0];

    useEffect(() => {
      const timers = [
        setTimeout(() => setSteps((prev) => [...prev, { text: 'Retrieving relevant context from knowledge base.', id: '2' }]), 2000),
        setTimeout(() => setSteps((prev) => [...prev, { text: 'Evaluating multiple solution paths.', id: '3' }]), 4000),
        setTimeout(() => setSteps((prev) => [...prev, { text: 'Finalizing the best answer.', id: '4' }]), 6000),
        setTimeout(() => setIsThinking(false), 7000),
      ];
      return () => timers.forEach(clearTimeout);
    }, []);

    return (
      <AIThinking
        steps={steps}
        isThinking={isThinking}
        title="Thinking"
        defaultExpanded
        showElapsed
        startTime={startTime}
      />
    );
  },
};
