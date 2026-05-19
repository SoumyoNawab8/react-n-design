import type { Meta, StoryObj } from '@storybook/react';
import { useState, useCallback } from 'react';
import { AIChat } from '../src/components/AIChat';
import type { AIChatMessage } from '../src/components/AIChat';

const meta: Meta<typeof AIChat> = {
  title: 'AI / AIChat',
  component: AIChat,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A full chat interface for AI conversations with streaming support, markdown rendering, typing indicators, and accessible message actions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    messages: { control: 'object' },
    isLoading: { control: 'boolean' },
    placeholder: { control: 'text' },
    onSend: { action: 'sent' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const demoMessages: AIChatMessage[] = [
  { role: 'assistant', content: 'Hello! How can I help you today?', id: '1' },
  { role: 'user', content: 'What is Neumorphism?', id: '2' },
  { role: 'assistant', content: 'Neumorphism (or **Soft UI**) is a design trend that combines the flat minimalism of modern UI with subtle shadows and highlights to create elements that appear to extrude from or be pressed into the background.\n\n## Key Characteristics\n\n- **Soft shadows** — usually a light shadow on one side and dark on the other\n- **Monochrome palettes** — typically the same color family\n- **Tactile depth** — elements look physically manipulable\n\nIt is the signature aesthetic of `react-n-design`.', id: '3' },
];

export const Default: Story = {
  args: {
    messages: demoMessages,
    isLoading: false,
    placeholder: 'Type a message...',
  },
};

export const EmptyState: Story = {
  args: {
    messages: [],
    isLoading: false,
    placeholder: 'Ask me anything...',
  },
};

export const Loading: Story = {
  args: {
    messages: [
      { role: 'user', content: 'Write a React component', id: '1' },
    ],
    isLoading: true,
    placeholder: 'Waiting for response...',
  },
};

export const Interactive: Story = {
  render: () => {
    const [messages, setMessages] = useState<AIChatMessage[]>([
      { role: 'assistant', content: 'Welcome! I am a demo assistant powered by react-n-design.', id: 'welcome' },
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = useCallback((text: string) => {
      const userMsg: AIChatMessage = {
        role: 'user',
        content: text,
        id: Date.now().toString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `You said: **${text}**.\n\nThis is a demo response from the AIChat component. In a real app, you would wire this to an LLM API like OpenAI, Claude, or your own backend.`,
            id: (Date.now() + 1).toString(),
          },
        ]);
        setIsLoading(false);
      }, 1500);
    }, []);

    return (
      <div style={{ height: 500, borderRadius: 12, overflow: 'hidden' }}>
        <AIChat
          messages={messages}
          onSend={handleSend}
          isLoading={isLoading}
          placeholder="Type a message..."
        />
      </div>
    );
  },
};
