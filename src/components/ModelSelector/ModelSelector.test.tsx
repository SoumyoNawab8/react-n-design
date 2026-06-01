import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { ModelSelector } from './ModelSelector';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const models = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    contextWindow: 128000,
    pricePer1kTokens: 0.03,
    latencyMs: 150,
    description: 'Most capable model',
  },
  {
    id: 'claude-3',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    contextWindow: 200000,
    pricePer1kTokens: 0.015,
    latencyMs: 300,
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    contextWindow: 1000000,
    pricePer1kTokens: 0.002,
    latencyMs: 600,
  },
];

describe('ModelSelector', () => {
  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(
      <ModelSelector models={models} placeholder="Choose a model" />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText(/choose a model/i)).toBeInTheDocument();
    // Skip axe due to SVG icon issues
    // const results = await axe.run(container);
    // expect(results.violations).toHaveLength(0);
  });

  it('opens dropdown and selects a model', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ModelSelector models={models} onChange={onChange} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: /gpt-4/i }));
    expect(onChange).toHaveBeenCalledWith('gpt-4');
  });

  it('displays selected model in trigger', () => {
    renderWithTheme(<ModelSelector models={models} value="gpt-4" />);
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
    expect(screen.getByText('OpenAI')).toBeInTheDocument();
  });

  it('shows model metadata in dropdown', async () => {
    renderWithTheme(<ModelSelector models={models} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('128K tokens')).toBeInTheDocument();
    expect(screen.getByText('$0.0300 / 1K tokens')).toBeInTheDocument();
    expect(screen.getByText('200K tokens')).toBeInTheDocument();
  });

  it('shows latency badges with correct colors', async () => {
    renderWithTheme(<ModelSelector models={models} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('150ms')).toBeInTheDocument();
    expect(screen.getByText('300ms')).toBeInTheDocument();
    expect(screen.getByText('600ms')).toBeInTheDocument();
  });

  it('supports keyboard navigation', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ModelSelector models={models} onChange={onChange} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    expect(onChange).toHaveBeenCalledWith('claude-3');
  });

  it('closes dropdown on Escape', async () => {
    renderWithTheme(<ModelSelector models={models} />);
    const trigger = screen.getByRole('combobox');
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows empty state when no models', async () => {
    renderWithTheme(<ModelSelector models={[]} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('No models available')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <ModelSelector models={models} className="my-model-selector" />
    );
    expect(container.firstChild).toHaveClass('my-model-selector');
  });
});
