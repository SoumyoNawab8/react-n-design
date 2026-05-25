import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { DatePicker } from './DatePicker';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('DatePicker', () => {
  it('renders input field', () => {
    renderWithTheme(<DatePicker placeholder="Pick a date" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/pick a date/i)).toBeInTheDocument();
  });

  it('opens calendar overlay when input group is clicked', async () => {
    renderWithTheme(<DatePicker />);

    const combobox = screen.getByRole('combobox');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(combobox);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('selecting a date closes calendar and updates input value', async () => {
    const onChange = vi.fn();
    renderWithTheme(<DatePicker onChange={onChange} />);

    // Open panel
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Find a day button (e.g. day 15) and click it
    const today = new Date();
    const target = new Date(today.getFullYear(), today.getMonth(), 15);
    const day15 = screen.getByRole('button', { name: target.toDateString() });
    await userEvent.click(day15);

    // Panel should close
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // onChange should have been called with a Date
    expect(onChange).toHaveBeenCalledTimes(1);
    const calledDate = onChange.mock.calls[0][0] as Date;
    expect(calledDate.getDate()).toBe(15);
  });

  it('keyboard Escape closes calendar', async () => {
    renderWithTheme(<DatePicker />);

    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Focus a day button first so Escape handler is inside panel
    const dayBtn = screen.getAllByRole('button').find((btn) => /^\d+$/.test(btn.textContent || ''));
    if (dayBtn) {
      dayBtn.focus();
    }

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('click outside closes calendar', async () => {
    renderWithTheme(
      <div>
        <DatePicker />
        <button type="button">Outside</button>
      </div>
    );

    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /outside/i }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('minDate / maxDate disable out-of-range dates', async () => {
    const minDate = new Date(2026, 4, 10); // May 10 2026
    const maxDate = new Date(2026, 4, 20); // May 20 2026

    renderWithTheme(
      <DatePicker minDate={minDate} maxDate={maxDate} defaultValue={new Date(2026, 4, 15)} />
    );

    await userEvent.click(screen.getByRole('combobox'));

    // May 5 should be disabled (before minDate)
    const day5 = screen.getByRole('button', { name: new Date(2026, 4, 5).toDateString() });
    expect(day5).toBeDisabled();

    // May 25 should be disabled (after maxDate)
    const day25 = screen.getByRole('button', { name: new Date(2026, 4, 25).toDateString() });
    expect(day25).toBeDisabled();

    // May 15 should be enabled
    const day15 = screen.getByRole('button', { name: new Date(2026, 4, 15).toDateString() });
    expect(day15).toBeEnabled();
  });

  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(<DatePicker label="Birth date" id="birth" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
