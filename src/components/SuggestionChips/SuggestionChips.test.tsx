import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { SuggestionChips } from './SuggestionChips';
import { vi } from 'vitest';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('SuggestionChips', () => {
  const suggestions = [
    { id: '1', text: 'Add import for React', type: 'insert' as const },
    { id: '2', text: 'Replace var with const', type: 'replace' as const },
    { id: '3', text: 'Remove unused console.log', type: 'delete' as const },
  ];

  it('renders suggestions and list roles', () => {
    renderWithTheme(
      <SuggestionChips
        suggestions={suggestions}
        onAccept={() => {}}
        onReject={() => {}}
      />
    );
    expect(screen.getByText('Add import for React')).toBeInTheDocument();
    expect(screen.getByText('Replace var with const')).toBeInTheDocument();
    expect(screen.getByText('Remove unused console.log')).toBeInTheDocument();
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('calls onAccept when accept button is clicked', async () => {
    const onAccept = vi.fn();
    renderWithTheme(
      <SuggestionChips
        suggestions={suggestions}
        onAccept={onAccept}
        onReject={() => {}}
      />
    );
    const buttons = screen.getAllByRole('button', { name: /accept suggestion/i });
    await userEvent.click(buttons[0]);
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onAccept).toHaveBeenCalledWith('1');
  });

  it('calls onReject when reject button is clicked', async () => {
    const onReject = vi.fn();
    renderWithTheme(
      <SuggestionChips
        suggestions={suggestions}
        onAccept={() => {}}
        onReject={onReject}
      />
    );
    const buttons = screen.getAllByRole('button', { name: /reject suggestion/i });
    await userEvent.click(buttons[1]);
    expect(onReject).toHaveBeenCalledTimes(1);
    expect(onReject).toHaveBeenCalledWith('2');
  });

  it('supports keyboard navigation: Enter accepts, Escape rejects', async () => {
    const onAccept = vi.fn();
    const onReject = vi.fn();
    renderWithTheme(
      <SuggestionChips
        suggestions={suggestions}
        onAccept={onAccept}
        onReject={onReject}
      />
    );
    const items = screen.getAllByRole('listitem');
    items[0].focus();
    await userEvent.keyboard('{Enter}');
    expect(onAccept).toHaveBeenCalledWith('1');
    items[1].focus();
    await userEvent.keyboard('{Escape}');
    expect(onReject).toHaveBeenCalledWith('2');
  });

  it('renders Accept All and Reject All buttons when callbacks provided', () => {
    renderWithTheme(
      <SuggestionChips
        suggestions={suggestions}
        onAccept={() => {}}
        onReject={() => {}}
        onAcceptAll={() => {}}
        onRejectAll={() => {}}
      />
    );
    expect(
      screen.getByRole('button', { name: /accept all suggestions/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /reject all suggestions/i })
    ).toBeInTheDocument();
  });

  it('calls onAcceptAll and onRejectAll when clicked', async () => {
    const onAcceptAll = vi.fn();
    const onRejectAll = vi.fn();
    renderWithTheme(
      <SuggestionChips
        suggestions={suggestions}
        onAccept={() => {}}
        onReject={() => {}}
        onAcceptAll={onAcceptAll}
        onRejectAll={onRejectAll}
      />
    );
    await userEvent.click(
      screen.getByRole('button', { name: /accept all suggestions/i })
    );
    expect(onAcceptAll).toHaveBeenCalledTimes(1);
    await userEvent.click(
      screen.getByRole('button', { name: /reject all suggestions/i })
    );
    expect(onRejectAll).toHaveBeenCalledTimes(1);
  });

  it('does not render footer when no bulk callbacks are provided', () => {
    renderWithTheme(
      <SuggestionChips
        suggestions={suggestions}
        onAccept={() => {}}
        onReject={() => {}}
      />
    );
    expect(
      screen.queryByRole('button', { name: /accept all/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /reject all/i })
    ).not.toBeInTheDocument();
  });
});
