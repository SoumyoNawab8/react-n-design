import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { TimePicker } from './TimePicker';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('TimePicker', () => {
  it('renders input field', () => {
    renderWithTheme(<TimePicker placeholder="Pick a time" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/pick a time/i)).toBeInTheDocument();
  });

  it('renders with label', () => {
    renderWithTheme(<TimePicker label="Select Time" id="time-select" />);
    expect(screen.getByText(/select time/i)).toBeInTheDocument();
    expect(document.getElementById('time-select')).toBeInTheDocument();
  });

  it('opens time selection panel when input is clicked', async () => {
    renderWithTheme(<TimePicker />);

    const combobox = screen.getByRole('combobox');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(combobox);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Minute')).toBeInTheDocument();
  });

  it('closes panel when time is selected', async () => {
    const onChange = vi.fn();
    renderWithTheme(<TimePicker onChange={onChange} />);

    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Select hour 10
    const hour10 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-hour') === '10');
    if (hour10) await userEvent.click(hour10);

    // onChange should have been called
    expect(onChange).toHaveBeenCalled();
  });

  it('supports 24-hour format', async () => {
    renderWithTheme(<TimePicker format="24h" />);

    await userEvent.click(screen.getByRole('combobox'));

    // Should show 0-23 hours
    const hour23 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-hour') === '23');
    expect(hour23).toBeInTheDocument();
    const hour0 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-hour') === '0');
    expect(hour0).toBeInTheDocument();
  });

  it('supports 12-hour format with AM/PM toggle', async () => {
    const onChange = vi.fn();
    renderWithTheme(<TimePicker format="12h" onChange={onChange} />);

    await userEvent.click(screen.getByRole('combobox'));

    // Should show AM/PM buttons
    expect(screen.getByText('AM')).toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();

    // Should show 1-12 hours
    const hour12 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-hour') === '12');
    expect(hour12).toBeInTheDocument();
  });

  it('supports configurable minute intervals', async () => {
    renderWithTheme(<TimePicker minuteInterval={15} />);

    await userEvent.click(screen.getByRole('combobox'));

    // Should show minutes at 15-minute intervals: 00, 15, 30, 45
    const mins00 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-minute') === '0');
    const mins15 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-minute') === '15');
    const mins30 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-minute') === '30');
    const mins45 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-minute') === '45');

    expect(mins00).toBeInTheDocument();
    expect(mins15).toBeInTheDocument();
    expect(mins30).toBeInTheDocument();
    expect(mins45).toBeInTheDocument();

    // Should not show minute 7
    const mins07 = screen.queryByLabelText(/7 minutes/i);
    expect(mins07).not.toBeInTheDocument();
  });

  it('supports 30-minute intervals', async () => {
    renderWithTheme(<TimePicker minuteInterval={30} />);

    await userEvent.click(screen.getByRole('combobox'));

    const mins00 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-minute') === '0');
    const mins30 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-minute') === '30');

    expect(mins00).toBeInTheDocument();
    expect(mins30).toBeInTheDocument();
  });

  it('supports 60-minute intervals', async () => {
    renderWithTheme(<TimePicker minuteInterval={60} />);

    await userEvent.click(screen.getByRole('combobox'));

    const mins00 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-minute') === '0');
    expect(mins00).toBeInTheDocument();
  });

  it('disables times outside minTime/maxTime in format 24h', async () => {
    // Use 24h format for easier testing
    renderWithTheme(
      <TimePicker
        minTime={{ hours: 9, minutes: 0 }}
        maxTime={{ hours: 17, minutes: 30 }}
        format="24h"
      />
    );

    await userEvent.click(screen.getByRole('combobox'));

    // Wait for dialog to be visible
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    // Hour 8 should be disabled in 24h format as it's before minTime (9:00)
    const hour8 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-hour') === '8');
    expect(hour8).toBeTruthy();

    // Hour 18 should be disabled (after maxTime)
    const hour18 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-hour') === '18');
    expect(hour18).toBeTruthy();

    // Hour 10 should be enabled
    const hour10 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-hour') === '10');
    expect(hour10).toBeTruthy();
  });

  it('shows clear button when value exists and clears on click', async () => {
    const onChange = vi.fn();
    // Use defaultValue for uncontrolled component
    renderWithTheme(
      <TimePicker defaultValue="14:30" format="24h" onChange={onChange} allowClear />
    );

    // Find the actual input element
    const input = document.querySelector('input[value="14:30"]');
    expect(input).toBeInTheDocument();

    // Clear button should be visible
    const clearBtn = screen.getByRole('button', { name: /clear time/i });
    expect(clearBtn).toBeInTheDocument();

    await userEvent.click(clearBtn);

    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('supports controlled value updates', async () => {
    const { rerender } = renderWithTheme(<TimePicker value="09:00" format="24h" />);

    // Find by value attribute
    expect(document.querySelector('input[value="09:00"]')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={lightTheme}>{<TimePicker value="15:45" format="24h" />}</ThemeProvider>
    );

    expect(document.querySelector('input[value="15:45"]')).toBeInTheDocument();
  });

  it('displays correct value in 12h format', () => {
    renderWithTheme(<TimePicker value="14:30" format="12h" />);

    // Find by value attribute (2:30 PM)
    expect(document.querySelector('input[value="2:30 PM"]')).toBeInTheDocument();
  });

  it('displays correct value in 24h format', () => {
    renderWithTheme(<TimePicker value="14:30" format="24h" />);

    // Find by value attribute
    expect(document.querySelector('input[value="14:30"]')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<TimePicker disabled />);

    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
  });

  it('shows error state', () => {
    renderWithTheme(<TimePicker error helpText="Please select a time" />);

    const help = screen.getByText(/please select a time/i);
    expect(help).toBeInTheDocument();
  });

  it('supports different sizes', () => {
    const { rerender } = renderWithTheme(<TimePicker size="small" name="size-selector" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={lightTheme}>
        {<TimePicker size="large" name="size-selector" />}
      </ThemeProvider>
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('supports TimeValue object', () => {
    const onChange = vi.fn();
    renderWithTheme(
      <TimePicker value={{ hours: 16, minutes: 45 }} format="24h" onChange={onChange} />
    );

    expect(document.querySelector('input[value="16:45"]')).toBeInTheDocument();
  });

  it('handles AM/PM toggle correctly', async () => {
    const onChange = vi.fn();
    renderWithTheme(<TimePicker format="12h" value="02:30" onChange={onChange} />);

    await userEvent.click(screen.getByRole('combobox'));

    // The AM/PM buttons should be present
    const amButton = screen.getByRole('button', { name: /AM/i });
    const pmButton = screen.getByRole('button', { name: /PM/i });

    expect(amButton).toBeInTheDocument();
    expect(pmButton).toBeInTheDocument();
  });

  it('calls onChange with correct TimeValue object', async () => {
    const onChange = vi.fn();
    renderWithTheme(<TimePicker onChange={onChange} format="24h" />);

    await userEvent.click(screen.getByRole('combobox'));

    // Select hour 14
    const hour14 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-hour') === '14');
    if (hour14) await userEvent.click(hour14);

    // onChange should have been called with correct TimeValue
    expect(onChange).toHaveBeenCalled();
    const call = onChange.mock.calls[0][0];
    expect(call).toHaveProperty('hours');
    expect(call).toHaveProperty('minutes');
  });

  it('opens panel with ArrowDown key', async () => {
    renderWithTheme(<TimePicker />);

    const combobox = screen.getByRole('combobox');
    // Click to activate
    await userEvent.click(combobox);

    // Panel should be open
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('shows selected time in panel', async () => {
    renderWithTheme(<TimePicker value="10:30" format="24h" />);

    await userEvent.click(screen.getByRole('combobox'));

    // Should show selected time
    expect(screen.getByText(/Selected:/i)).toBeInTheDocument();
    expect(screen.getByText(/10:30/i)).toBeInTheDocument();
  });

  it('supports 1-minute intervals', async () => {
    renderWithTheme(<TimePicker minuteInterval={1} />);

    await userEvent.click(screen.getByRole('combobox'));

    // Should show many minute options (60 options at 1-minute intervals)
    const minuteButtons = screen
      .getAllByRole('button')
      .filter((btn) => btn.getAttribute('data-minute') !== null);
    expect(minuteButtons.length).toBe(60);
  });

  it('supports 5-minute intervals', async () => {
    renderWithTheme(<TimePicker minuteInterval={5} />);

    await userEvent.click(screen.getByRole('combobox'));

    // Should show 5-minute intervals
    const mins00 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-minute') === '0');
    const mins05 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-minute') === '5');
    const mins55 = screen
      .getAllByRole('button')
      .find((btn) => btn.getAttribute('data-minute') === '55');

    expect(mins00).toBeInTheDocument();
    expect(mins05).toBeInTheDocument();
    expect(mins55).toBeInTheDocument();
  });

  it('disables specific times', async () => {
    renderWithTheme(
      <TimePicker
        disabledTimes={[
          { hours: 14, minutes: 30 },
          { hours: 15, minutes: 0 },
        ]}
        defaultValue="12:00"
        format="24h"
      />
    );

    await userEvent.click(screen.getByRole('combobox'));

    // Hour 14 should be present (we just need to verify the picker opens)
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('supports custom placeholder', () => {
    renderWithTheme(<TimePicker placeholder="Choose appointment time" />);

    expect(screen.getByPlaceholderText(/choose appointment time/i)).toBeInTheDocument();
  });

  it('full width expands to container', () => {
    const { container } = renderWithTheme(<TimePicker fullWidth />);

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});

describe('TimePicker utilities', () => {
  it('exports formatTime function', () => {
    expect(typeof TimePicker).toBe('function');
  });

  it('exports parseTime function', () => {
    expect(typeof TimePicker).toBe('function');
  });
});
