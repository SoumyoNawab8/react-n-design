import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Toast } from './Toast';

describe('Toast', () => {
  const DEFAULT_PROPS = {
    id: '1',
    onDismiss: vi.fn(),
    title: 'Test Toast',
    description: 'This is a test notification',
  };

  const renderWithTheme = (ui: React.ReactElement) =>
    render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

  it('renders with title and description', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} />);
    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('This is a test notification')).toBeInTheDocument();
  });

  it('renders with correct role attribute', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} variant="info" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders with alert role for error variant', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} variant="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('calls onDismiss when close button is clicked', async () => {
    const onDismiss = vi.fn();
    renderWithTheme(<Toast {...DEFAULT_PROPS} onDismiss={onDismiss} />);

    await userEvent.click(screen.getByRole('button', { name: /dismiss notification/i }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledWith('1');
  });

  it('renders action when provided', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} action={<button>Undo</button>} />);
    expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument();
  });

  it('has correct aria attributes when rendered', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} variant="info" />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
  });

  it('has correct aria-live for error variant', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} variant="error" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'assertive');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<Toast {...DEFAULT_PROPS} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
