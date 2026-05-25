import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Checkbox } from './Checkbox';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Checkbox', () => {
  it('renders unchecked by default', () => {
    renderWithTheme(<Checkbox />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('renders checked state based on checked prop', () => {
    renderWithTheme(<Checkbox checked={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('renders unchecked state based on checked prop', () => {
    renderWithTheme(<Checkbox checked={false} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('renders indeterminate state with aria-checked="mixed"', () => {
    renderWithTheme(<Checkbox checked={true} indeterminate={true} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('calls onChange with the new checked value when clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Checkbox checked={false} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when clicked while checked', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Checkbox checked={true} onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Checkbox checked={false} onChange={onChange} disabled />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('has aria-disabled when disabled', () => {
    renderWithTheme(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-disabled', 'true');
  });

  it('has reduced opacity / muted visual when disabled', () => {
    renderWithTheme(<Checkbox disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveStyle('opacity: 0.5');
  });

  it('toggles with Space key', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Checkbox checked={false} onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle with Space when disabled', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Checkbox checked={false} onChange={onChange} disabled />);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await userEvent.keyboard(' ');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders label when provided', () => {
    renderWithTheme(<Checkbox label="Accept terms" />);
    expect(screen.getByText(/accept terms/i)).toBeInTheDocument();
  });

  it('associates label with checkbox via aria-labelledby', () => {
    renderWithTheme(<Checkbox label="Accept terms" />);
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText(/accept terms/i);
    expect(checkbox).toHaveAttribute('aria-labelledby', label.id);
  });

  it('passes name and value props', () => {
    renderWithTheme(<Checkbox name="terms" value="yes" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('data-name', 'terms');
    expect(checkbox).toHaveAttribute('data-value', 'yes');
  });

  it('passes axe-core audit with label', async () => {
    const { container } = renderWithTheme(<Checkbox label="Accessible checkbox" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
