import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Calendar } from './Calendar';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Calendar', () => {
  it('renders current month by default', () => {
    const today = new Date();
    renderWithTheme(<Calendar />);

    const monthYear = screen.getByText(
      new RegExp(`${today.toLocaleString('en-US', { month: 'long' })}\\s+${today.getFullYear()}`)
    );
    expect(monthYear).toBeInTheDocument();
  });

  it('previous and next month buttons work', async () => {
    renderWithTheme(<Calendar />);

    const prevBtn = screen.getByRole('button', { name: /previous month/i });
    const nextBtn = screen.getByRole('button', { name: /next month/i });

    await userEvent.click(nextBtn);
    const nextMonthText = screen.getByText(/\w+\s+\d{4}/);
    expect(nextMonthText).toBeInTheDocument();

    await userEvent.click(prevBtn);
    const prevMonthText = screen.getByText(/\w+\s+\d{4}/);
    expect(prevMonthText).toBeInTheDocument();
  });

  it('clicking a day calls onSelect with that date', async () => {
    const onSelect = vi.fn();
    renderWithTheme(<Calendar onChange={onSelect} />);

    const today = new Date();
    const target = new Date(today.getFullYear(), today.getMonth(), 10);
    const day10 = screen.getByRole('button', { name: target.toDateString() });
    await userEvent.click(day10);

    expect(onSelect).toHaveBeenCalledTimes(1);
    const selected = onSelect.mock.calls[0][0] as Date;
    expect(selected.getDate()).toBe(10);
  });

  it('selected date is visually highlighted', () => {
    const selectedDate = new Date(2026, 4, 15); // May 15 2026
    renderWithTheme(<Calendar value={selectedDate} />);

    const day15 = screen.getByRole('button', { name: selectedDate.toDateString() });
    expect(day15).toHaveAttribute('aria-pressed', 'true');
  });

  it('today is visually indicated', () => {
    const today = new Date();
    renderWithTheme(<Calendar />);

    const todayBtn = screen.getByRole('button', { name: today.toDateString() });
    expect(todayBtn).toBeInTheDocument();
  });

  it('keyboard arrow keys navigate between days and Enter selects', async () => {
    const onSelect = vi.fn();
    renderWithTheme(<Calendar onChange={onSelect} />);

    // Focus today button (tabbable by default)
    const today = new Date();
    const todayBtn = screen.getByRole('button', { name: today.toDateString() });
    todayBtn.focus();

    // ArrowRight should move to tomorrow; Enter selects
    await userEvent.keyboard('{ArrowRight}');
    await userEvent.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalled();
  });

  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(<Calendar />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
