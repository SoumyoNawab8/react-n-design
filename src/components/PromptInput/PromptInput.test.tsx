import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { PromptInput } from './PromptInput';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const ControlledPromptInput = (props: { value?: string } & Record<string, unknown>) => {
  const [value, setValue] = useState((props.value as string) || '');
  return <PromptInput {...props} value={value} onChange={setValue} />;
};

const slashCommands = [
  { command: '/code', description: 'Generate code' },
  { command: '/explain', description: 'Explain' },
];

const mentionTargets = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
];

describe('PromptInput', () => {
  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(<ControlledPromptInput onSend={vi.fn()} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('shows token counter when showTokenCount is true', () => {
    renderWithTheme(
      <ControlledPromptInput onSend={vi.fn()} showTokenCount maxTokens={100} value="Hello world" />
    );
    expect(screen.getByText(/tokens/i)).toBeInTheDocument();
  });

  it('shows send button disabled when empty', () => {
    renderWithTheme(<ControlledPromptInput onSend={vi.fn()} value="" />);
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
  });

  it('sends on Enter when content present', async () => {
    const onSend = vi.fn();
    renderWithTheme(<ControlledPromptInput onSend={onSend} value="Hello" />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '{Enter}');
    expect(onSend).toHaveBeenCalledWith('Hello');
  });

  it('shows slash command menu when / typed', async () => {
    renderWithTheme(<ControlledPromptInput onSend={vi.fn()} slashCommands={slashCommands} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '/co' } });
    expect(await screen.findByText('/code')).toBeInTheDocument();
  });

  it('shows mention menu when @ typed', async () => {
    renderWithTheme(<ControlledPromptInput onSend={vi.fn()} mentionTargets={mentionTargets} />);
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '@Al' } });
    expect(await screen.findByText('@Alice')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    renderWithTheme(<ControlledPromptInput onSend={vi.fn()} value="Loading" isLoading />);
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
  });

  it('shows character count with max length', async () => {
    renderWithTheme(
      <PromptInput value="abcde" onChange={() => {}} onSend={vi.fn()} maxLength={10} />
    );
    expect(screen.getByText(/5 \/ 10/i)).toBeInTheDocument();
  });
});
