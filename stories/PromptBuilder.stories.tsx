import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PromptBuilder } from '../src/components/PromptBuilder';

const meta: Meta<typeof PromptBuilder> = {
  title: 'AI / PromptBuilder',
  component: PromptBuilder,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A few-shot example editor for prompt engineering. Supports system prompts, user/assistant message pairs, variable highlighting ({{var}}), and reordering.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    systemPrompt: { control: 'text' },
    examples: { control: 'object' },
    variables: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const demoExamples = [
  { id: '1', role: 'user' as const, content: 'Hello, my name is {{name}}' },
  { id: '2', role: 'assistant' as const, content: 'Nice to meet you, {{name}}! How can I help you today?' },
  { id: '3', role: 'user' as const, content: 'What is {{topic}}?' },
  { id: '4', role: 'assistant' as const, content: '{{topic}} is a fascinating subject. Let me explain...' },
];

export const Default: Story = {
  args: {
    systemPrompt: 'You are a helpful assistant. Be concise and friendly.',
    examples: demoExamples,
    variables: ['name', 'topic'],
  },
};

export const Empty: Story = {
  args: {
    systemPrompt: '',
    examples: [],
  },
};

export const SystemOnly: Story = {
  args: {
    systemPrompt: 'You are an expert React developer. Provide clean, modern code examples.',
    examples: [],
  },
};

export const NoVariables: Story = {
  args: {
    systemPrompt: 'You are a translator. Translate the user message into French.',
    examples: [
      { id: '1', role: 'user' as const, content: 'Hello world' },
      { id: '2', role: 'assistant' as const, content: 'Bonjour le monde' },
    ],
  },
};

export const Interactive: Story = {
  render: () => {
    const [examples, setExamples] = useState(demoExamples);
    const [systemPrompt, setSystemPrompt] = useState(
      'You are a helpful assistant. Be concise and friendly.'
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <PromptBuilder
          systemPrompt={systemPrompt}
          examples={examples}
          onChange={(newExamples, newSystem) => {
            setExamples(newExamples);
            setSystemPrompt(newSystem);
          }}
          variables={['name', 'topic']}
        />
        <details>
          <summary>Raw Output</summary>
          <pre
            style={{
              background: '#f5f5f5',
              padding: 16,
              borderRadius: 8,
              fontSize: 12,
              overflow: 'auto',
            }}
          >
            {JSON.stringify({ systemPrompt, examples }, null, 2)}
          </pre>
        </details>
      </div>
    );
  },
};
