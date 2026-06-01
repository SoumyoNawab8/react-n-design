import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { describe, expect, it, vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { ThinkingBlock } from './ThinkingBlock';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const steps = [
  { text: 'First reasoning step', id: '1', timestamp: 1717257600000 },
  { text: 'Second reasoning step', id: '2', timestamp: 1717257660000 },
];

describe('ThinkingBlock', () => {
  it('renders with the title', () => {
    renderWithTheme(<ThinkingBlock steps={steps} isThinking={false} />);
    expect(screen.getByText('Thinking')).toBeInTheDocument();
  });

  it('renders with a custom title', () => {
    renderWithTheme(
      <ThinkingBlock steps={steps} isThinking={false} title="Reasoning" />
    );
    expect(screen.getByText('Reasoning')).toBeInTheDocument();
  });

  it('shows steps when expanded by default', () => {
    renderWithTheme(<ThinkingBlock steps={steps} defaultExpanded />);
    expect(screen.getByText('First reasoning step')).toBeInTheDocument();
    expect(screen.getByText('Second reasoning step')).toBeInTheDocument();
  });

  it('hides steps when collapsed by default', () => {
    renderWithTheme(<ThinkingBlock steps={steps} defaultExpanded={false} />);
    expect(screen.queryByText('First reasoning step')).not.toBeInTheDocument();
  });

  it('toggles expand/collapse when header is clicked', async () => {
    renderWithTheme(<ThinkingBlock steps={steps} defaultExpanded />);
    const header = screen.getByRole('button', { name: /thinking/i });
    expect(header).toHaveAttribute('aria-expanded', 'true');

    await userEvent.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('First reasoning step')).not.toBeInTheDocument();

    await userEvent.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('First reasoning step')).toBeInTheDocument();
  });

  it('calls onToggle when expanded/collapsed', async () => {
    const onToggle = vi.fn();
    renderWithTheme(
      <ThinkingBlock steps={steps} defaultExpanded onToggle={onToggle} />
    );
    const header = screen.getByRole('button', { name: /thinking/i });

    await userEvent.click(header);
    expect(onToggle).toHaveBeenCalledWith(false);

    await userEvent.click(header);
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('shows timestamps when showTimestamps is true', () => {
    renderWithTheme(
      <ThinkingBlock steps={steps} defaultExpanded showTimestamps />
    );
    // Timestamps should be rendered as localized time strings
    const timestamps = screen.getAllByText(/\d{1,2}:\d{2}:\d{2}/);
    expect(timestamps.length).toBe(2);
  });

  it('does not show timestamps when showTimestamps is false', () => {
    renderWithTheme(
      <ThinkingBlock steps={steps} defaultExpanded showTimestamps={false} />
    );
    const timestamps = screen.queryAllByText(/\d{1,2}:\d{2}:\d{2}/);
    expect(timestamps.length).toBe(0);
  });

  it('shows "Thinking..." indicator when isThinking is true and steps exist', () => {
    renderWithTheme(<ThinkingBlock steps={steps} isThinking defaultExpanded />);
    expect(screen.getByText('Thinking...')).toBeInTheDocument();
  });

  it('shows "Analyzing your request..." when isThinking is true and steps is empty', () => {
    renderWithTheme(<ThinkingBlock steps={[]} isThinking defaultExpanded />);
    expect(
      screen.getByText('Analyzing your request...')
    ).toBeInTheDocument();
  });

  it('does not show thinking indicator when isThinking is false', () => {
    renderWithTheme(<ThinkingBlock steps={steps} isThinking={false} defaultExpanded />);
    expect(screen.queryByText('Thinking...')).not.toBeInTheDocument();
  });

  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(
      <ThinkingBlock steps={steps} isThinking defaultExpanded showTimestamps />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders step numbers', () => {
    renderWithTheme(<ThinkingBlock steps={steps} defaultExpanded />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <ThinkingBlock steps={steps} className="my-custom-class" />
    );
    expect(container.querySelector('.my-custom-class')).toBeInTheDocument();
  });

  it('toggles on Enter key press', async () => {
    renderWithTheme(<ThinkingBlock steps={steps} defaultExpanded />);
    const header = screen.getByRole('button', { name: /thinking/i });
    header.focus();
    await userEvent.keyboard('{Enter}');
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });

  it('toggles on Space key press', async () => {
    renderWithTheme(<ThinkingBlock steps={steps} defaultExpanded />);
    const header = screen.getByRole('button', { name: /thinking/i });
    header.focus();
    await userEvent.keyboard(' ');
    expect(header).toHaveAttribute('aria-expanded', 'false');
  });
});
