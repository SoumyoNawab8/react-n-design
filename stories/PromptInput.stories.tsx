import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PromptInput } from '../src/components/PromptInput';

const meta: Meta<typeof PromptInput> = {
  title: 'AI / PromptInput',
  component: PromptInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An AI-ready textarea with slash commands, @mentions, token counting, and auto-resize.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    maxLength: { control: 'number' },
    maxTokens: { control: 'number' },
    showTokenCount: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const slashCommands = [
  { command: '/translate', description: 'Translate text to another language' },
  { command: '/summarize', description: 'Summarize long content' },
  { command: '/code', description: 'Generate code snippet' },
  { command: '/explain', description: 'Explain a concept' },
];

const mentionTargets = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <PromptInput
        value={value}
        onChange={setValue}
        onSend={(v) => {
          alert(`Sent: ${v}`);
          setValue('');
        }}
        placeholder="Type / for commands, @ to mention..."
      />
    );
  },
};

export const WithSlashCommands: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <PromptInput
        value={value}
        onChange={setValue}
        onSend={(v) => {
          alert(`Sent: ${v}`);
          setValue('');
        }}
        placeholder="Try /translate, /summarize, /code, /explain"
        slashCommands={slashCommands}
      />
    );
  },
};

export const WithMentions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <PromptInput
        value={value}
        onChange={setValue}
        onSend={(v) => {
          alert(`Sent: ${v}`);
          setValue('');
        }}
        placeholder="Type @ to mention someone"
        mentionTargets={mentionTargets}
      />
    );
  },
};

export const WithTokenCount: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <PromptInput
        value={value}
        onChange={setValue}
        onSend={(v) => {
          alert(`Sent: ${v}`);
          setValue('');
        }}
        placeholder="Type to see token count..."
        showTokenCount
        maxTokens={100}
      />
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [value] = useState('Generate a React component');
    return <PromptInput value={value} onChange={() => {}} onSend={() => {}} isLoading />;
  },
};

export const MaxLength: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <PromptInput
        value={value}
        onChange={setValue}
        onSend={(v) => {
          alert(`Sent: ${v}`);
          setValue('');
        }}
        maxLength={100}
        placeholder="Limited to 100 characters"
      />
    );
  },
};
