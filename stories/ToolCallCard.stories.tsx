import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FaCalculator, FaDatabase, FaSearch } from 'react-icons/fa';
import { ToolCallCard } from '../src/components/ToolCallCard';

const meta: Meta<typeof ToolCallCard> = {
  title: 'AI / ToolCallCard',
  component: ToolCallCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shows when an AI calls a tool (search, calculator, API) with loading, success, and error states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    toolName: { control: 'text' },
    status: { control: 'select', options: ['loading', 'success', 'error'] },
    args: { control: 'object' },
    result: { control: 'text' },
    errorMessage: { control: 'text' },
    durationMs: { control: { type: 'range', min: 0, max: 5000, step: 100 } },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
  args: {
    toolName: 'Web Search',
    status: 'loading',
    args: { query: 'react component libraries 2026', limit: 5 },
    durationMs: 1200,
  },
};

export const Success: Story = {
  args: {
    toolName: 'Calculator',
    toolIcon: <FaCalculator />,
    status: 'success',
    args: { expression: '42 * 7' },
    result: '294',
    durationMs: 340,
  },
};

export const Error: Story = {
  args: {
    toolName: 'Database Query',
    toolIcon: <FaDatabase />,
    status: 'error',
    args: { table: 'users', query: 'SELECT * FROM users' },
    errorMessage: 'Connection refused: unable to connect to database at localhost:5432',
    durationMs: 5000,
  },
};

export const SearchSuccess: Story = {
  args: {
    toolName: 'Semantic Search',
    toolIcon: <FaSearch />,
    status: 'success',
    args: { query: 'neumorphism design system', top_k: 3 },
    result: 'Found 3 documents matching "neumorphism design system" in the knowledge base.',
    durationMs: 890,
  },
};

export const NoArgs: Story = {
  args: {
    toolName: 'Health Check',
    status: 'success',
    result: 'All systems operational.',
    durationMs: 120,
  },
};

export const Interactive: Story = {
  render: () => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => setStatus('loading')}>Loading</button>
          <button onClick={() => setStatus('success')}>Success</button>
          <button onClick={() => setStatus('error')}>Error</button>
        </div>
        <ToolCallCard
          toolName="API Call"
          status={status}
          args={{ endpoint: '/api/v1/users', method: 'GET' }}
          result={status === 'success' ? '{ "count": 42, "users": [...] }' : undefined}
          errorMessage={status === 'error' ? 'HTTP 500: Internal Server Error' : undefined}
          durationMs={status === 'loading' ? 800 : 420}
        />
      </div>
    );
  },
};
