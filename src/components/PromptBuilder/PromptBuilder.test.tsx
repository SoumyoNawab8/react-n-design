import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { PromptBuilder, type PromptBuilderProps, type PromptExample } from './PromptBuilder';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const ControlledPromptBuilder = (
  props: Omit<PromptBuilderProps, 'onChange'> & {
    onChange?: PromptBuilderProps['onChange'];
  }
) => {
  const [examples, setExamples] = useState<PromptExample[]>(props.examples);
  const [systemPrompt, setSystemPrompt] = useState(props.systemPrompt || '');
  return (
    <PromptBuilder
      {...props}
      systemPrompt={systemPrompt}
      examples={examples}
      onChange={(newExamples, newSystemPrompt) => {
        setExamples(newExamples);
        setSystemPrompt(newSystemPrompt);
        props.onChange?.(newExamples, newSystemPrompt);
      }}
    />
  );
};

describe('PromptBuilder', () => {
  const baseExamples: PromptExample[] = [
    { id: '1', role: 'user', content: 'Hello {{user_input}}' },
    { id: '2', role: 'assistant', content: 'Hello there!' },
  ];

  it('renders the system prompt', () => {
    renderWithTheme(
      <ControlledPromptBuilder
        examples={baseExamples}
        systemPrompt="You are a helpful assistant."
      />
    );
    expect(
      screen.getByDisplayValue('You are a helpful assistant.')
    ).toBeInTheDocument();
  });

  it('renders all examples', () => {
    renderWithTheme(<ControlledPromptBuilder examples={baseExamples} />);
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Assistant')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Hello {{user_input}}')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Hello there!')).toBeInTheDocument();
  });

  it('calls onChange when typing in system prompt textarea', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <ControlledPromptBuilder
        examples={baseExamples}
        systemPrompt=""
        onChange={onChange}
      />
    );
    const textarea = screen.getByLabelText('System prompt');
    await userEvent.type(textarea, 'New system prompt');
    expect(onChange).toHaveBeenLastCalledWith(baseExamples, 'New system prompt');
  });

  it('calls onChange when typing in an example textarea', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <ControlledPromptBuilder
        examples={baseExamples}
        systemPrompt=""
        onChange={onChange}
      />
    );
    const textarea = screen.getByLabelText('User message content');
    await userEvent.clear(textarea);
    await userEvent.type(textarea, 'Updated content');
    expect(onChange).toHaveBeenLastCalledWith(
      [
        { id: '1', role: 'user', content: 'Updated content' },
        { id: '2', role: 'assistant', content: 'Hello there!' },
      ],
      ''
    );
  });

  it('calls onChange with a new user example when Add Example is clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <PromptBuilder examples={baseExamples} systemPrompt="" onChange={onChange} />
    );
    const addButton = screen.getByRole('button', { name: /add example/i });
    await userEvent.click(addButton);
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
    expect(lastCall[0]).toHaveLength(3);
    expect(lastCall[0][2].role).toBe('user');
    expect(lastCall[0][2].content).toBe('');
    expect(lastCall[1]).toBe('');
  });

  it('calls onChange with opposite role when Add Turn is clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <PromptBuilder examples={baseExamples} systemPrompt="" onChange={onChange} />
    );
    const addTurnButton = screen.getByRole('button', { name: /add turn/i });
    await userEvent.click(addTurnButton);
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1];
    expect(lastCall[0]).toHaveLength(3);
    // Last example is assistant, so new should be user
    expect(lastCall[0][2].role).toBe('user');
  });

  it('calls onChange when deleting an example', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <PromptBuilder examples={baseExamples} systemPrompt="" onChange={onChange} />
    );
    const deleteButton = screen.getAllByRole('button', {
      name: /delete example/i,
    })[0];
    await userEvent.click(deleteButton);
    expect(onChange).toHaveBeenLastCalledWith(
      [{ id: '2', role: 'assistant', content: 'Hello there!' }],
      ''
    );
  });

  it('moves example up when clicking up button', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <PromptBuilder examples={baseExamples} systemPrompt="" onChange={onChange} />
    );
    const upButtons = screen.getAllByRole('button', {
      name: /move example up/i,
    });
    // First item up button is disabled, so click second item's up button
    await userEvent.click(upButtons[1]);
    expect(onChange).toHaveBeenLastCalledWith(
      [
        { id: '2', role: 'assistant', content: 'Hello there!' },
        { id: '1', role: 'user', content: 'Hello {{user_input}}' },
      ],
      ''
    );
  });

  it('moves example down when clicking down button', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <PromptBuilder examples={baseExamples} systemPrompt="" onChange={onChange} />
    );
    const downButtons = screen.getAllByRole('button', {
      name: /move example down/i,
    });
    // Click first item's down button
    await userEvent.click(downButtons[0]);
    expect(onChange).toHaveBeenLastCalledWith(
      [
        { id: '2', role: 'assistant', content: 'Hello there!' },
        { id: '1', role: 'user', content: 'Hello {{user_input}}' },
      ],
      ''
    );
  });

  it('highlights variable placeholders in a distinct color', () => {
    const { container } = renderWithTheme(
      <ControlledPromptBuilder examples={baseExamples} />
    );
    const spans = container.querySelectorAll('span');
    const variableSpan = Array.from(spans).find(
      (s) => s.textContent === '{{user_input}}'
    );
    expect(variableSpan).toBeTruthy();
    expect(variableSpan).toHaveStyle('color: #ff6b6b');
  });

  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(
      <ControlledPromptBuilder examples={baseExamples} systemPrompt="Test" />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
