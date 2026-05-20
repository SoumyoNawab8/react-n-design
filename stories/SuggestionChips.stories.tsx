import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../src/styles/theme';
import { SuggestionChips } from '../src/components/SuggestionChips';

const meta: Meta<typeof SuggestionChips> = {
  title: 'react-n-design/SuggestionChips',
  component: SuggestionChips,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof SuggestionChips>;

export const Default: Story = {
  render: () => {
    const [suggestions, setSuggestions] = useState([
      { id: '1', text: 'Add import for React', type: 'insert' as const },
      { id: '2', text: 'Replace var with const', type: 'replace' as const },
      { id: '3', text: 'Remove unused console.log', type: 'delete' as const },
    ]);
    return (
      <SuggestionChips
        suggestions={suggestions}
        onAccept={(id) => setSuggestions((prev) => prev.filter((s) => s.id !== id))}
        onReject={(id) => setSuggestions((prev) => prev.filter((s) => s.id !== id))}
        onAcceptAll={() => setSuggestions([])}
        onRejectAll={() => setSuggestions([])}
      />
    );
  },
};

export const SingleSuggestion: Story = {
  render: () => {
    const [suggestions, setSuggestions] = useState([
      { id: '1', text: 'Refactor useEffect dependency array', type: 'replace' as const },
    ]);
    return (
      <SuggestionChips
        suggestions={suggestions}
        onAccept={(id) => setSuggestions((prev) => prev.filter((s) => s.id !== id))}
        onReject={(id) => setSuggestions((prev) => prev.filter((s) => s.id !== id))}
      />
    );
  },
};

export const Empty: Story = {
  args: {
    suggestions: [],
    onAccept: () => {},
    onReject: () => {},
  },
};
