import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { StreamingText } from '../src/components/StreamingText';

const meta: Meta<typeof StreamingText> = {
  title: 'AI / StreamingText',
  component: StreamingText,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Renders text with a typewriter/streaming effect, revealing characters one by one. Supports Markdown rendering when complete.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    speed: { control: { type: 'range', min: 10, max: 200, step: 10 } },
    renderMarkdown: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Hello! I am an AI assistant powered by react-n-design. I can help you with coding, design, and much more.',
    speed: 30,
    renderMarkdown: false,
  },
};

export const Markdown: Story = {
  args: {
    text: '# Hello World\n\nThis supports **bold**, *italic*, and `inline code`.\n\n> A blockquote for emphasis.',
    speed: 20,
    renderMarkdown: true,
  },
};

export const Fast: Story = {
  args: {
    text: 'This text streams very quickly to demonstrate the fast speed mode.',
    speed: 5,
    renderMarkdown: false,
  },
};

export const CodeStreaming: Story = {
  args: {
    text: "Here's a code example:\n\n```tsx\nfunction greet(name: string) {\n  return `Hello, ${name}!`;\n}\n```\n\nPretty neat, right?",
    speed: 25,
    renderMarkdown: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [text, setText] = useState('Type something and click Stream to see the effect!');
    const [key, setKey] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%', padding: 12, borderRadius: 8, fontFamily: 'inherit' }}
        />
        <button
          onClick={() => {
            setIsComplete(false);
            setKey((k) => k + 1);
          }}
          style={{ padding: '10px 16px', borderRadius: 8, cursor: 'pointer' }}
        >
          Stream Text
        </button>
        <div
          style={{
            padding: 16,
            borderRadius: 8,
            background: '#f5f5f5',
            minHeight: 60,
          }}
        >
          <StreamingText
            key={key}
            text={text}
            speed={30}
            renderMarkdown
            onComplete={() => setIsComplete(true)}
          />
        </div>
        {isComplete && (
          <span style={{ color: '#28a745', fontSize: 12 }}>Streaming complete!</span>
        )}
      </div>
    );
  },
};
