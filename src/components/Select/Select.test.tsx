import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Select } from './Select';
import axe from 'axe-core';
import { vi } from 'vitest';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C', disabled: true },
];

describe('Select', () => {
  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(<Select options={options} placeholder="Choose" aria-label="Test select" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText(/choose/i)).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('opens dropdown and selects an option', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Select options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: /option a/i }));
    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Select options={options} disabled />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-disabled', 'true');
  });
});
