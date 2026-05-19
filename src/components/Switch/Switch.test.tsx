import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Switch } from './Switch';
import axe from 'axe-core';
import { vi } from 'vitest';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Switch', () => {
  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(
      <Switch checked={false} onChange={() => {}} label="Toggle" />
    );
    expect(screen.getByRole('switch')).toBeInTheDocument();
    expect(screen.getByText(/toggle/i)).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('calls onChange when clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Switch checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Switch checked={false} onChange={() => {}} disabled />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders with left label position', () => {
    renderWithTheme(
      <Switch checked={false} onChange={() => {}} label="Left Label" labelPosition="left" />
    );
    expect(screen.getByText(/left label/i)).toBeInTheDocument();
  });
});
