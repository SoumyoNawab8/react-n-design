import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Alert } from './Alert';
import axe from 'axe-core';
import { vi } from 'vitest';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Alert', () => {
  it('renders message and is accessible', async () => {
    const { container } = renderWithTheme(<Alert message="Alert message" />);
    expect(screen.getByRole('alert')).toHaveTextContent(/alert message/i);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders description when provided', () => {
    renderWithTheme(<Alert message="Title" description="Description text" />);
    expect(screen.getByText(/description text/i)).toBeInTheDocument();
  });

  it('can be closed when closable', async () => {
    const onClose = vi.fn();
    renderWithTheme(<Alert message="Closable" closable onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: /close alert/i }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });
});
