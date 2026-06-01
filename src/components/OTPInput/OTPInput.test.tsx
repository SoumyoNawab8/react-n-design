import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { OTPInput, PinInput } from './OTPInput';

// jsdom does not implement ClipboardEvent
Object.defineProperty(window, 'ClipboardEvent', {
  writable: true,
  value: class MockClipboardEvent extends Event {
    clipboardData: { getData: (type: string) => string };
    constructor(type: string, options: any) {
      super(type, options);
      this.clipboardData = options.clipboardData;
    }
  },
});

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const ControlledOTPInput = (
  props: Omit<Parameters<typeof OTPInput>[0], 'value' | 'onChange'> & {
    initialValue?: string;
  }
) => {
  const [value, setValue] = useState(props.initialValue || '');
  return (
    <OTPInput
      {...props}
      value={value}
      onChange={(v) => setValue(v)}
    />
  );
};

describe('OTPInput', () => {
  it('renders the correct number of inputs and is accessible', async () => {
    const { container } = renderWithTheme(<OTPInput length={4} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('uses default length of 6 when length is not provided', () => {
    renderWithTheme(<OTPInput />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('typing a digit enters it and auto-advances focus', async () => {
    renderWithTheme(<OTPInput length={4} />);
    const inputs = screen.getAllByRole('textbox');

    await userEvent.type(inputs[0], '1');
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveFocus();

    await userEvent.type(inputs[1], '2');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveFocus();
  });

  it('typing a digit replaces the current value and advances', async () => {
    renderWithTheme(<ControlledOTPInput length={4} initialValue="1234" />);
    const inputs = screen.getAllByRole('textbox');

    // Use fireEvent.change because maxLength=1 blocks userEvent.type on non-empty inputs in jsdom
    fireEvent.change(inputs[1], { target: { value: '9' } });
    expect(inputs[1]).toHaveValue('9');
    expect(inputs[2]).toHaveFocus();
  });

  it('backspace on empty box moves focus to previous box and clears it', async () => {
    renderWithTheme(<ControlledOTPInput length={4} initialValue="12" />);
    const inputs = screen.getAllByRole('textbox');

    // Focus second input, which has value '2'
    await userEvent.click(inputs[1]);
    await userEvent.keyboard('{Backspace}');
    expect(inputs[1]).toHaveValue('');
    expect(inputs[1]).toHaveFocus();

    // Backspace again on empty input should move to previous and clear it
    await userEvent.keyboard('{Backspace}');
    expect(inputs[0]).toHaveValue('');
    expect(inputs[0]).toHaveFocus();
  });

  it('arrow keys navigate between inputs', async () => {
    renderWithTheme(<OTPInput length={4} />);
    const inputs = screen.getAllByRole('textbox');

    await userEvent.click(inputs[1]);
    await userEvent.keyboard('{ArrowLeft}');
    expect(inputs[0]).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}');
    expect(inputs[1]).toHaveFocus();
  });

  it('only accepts numeric input', async () => {
    renderWithTheme(<OTPInput length={4} />);
    const inputs = screen.getAllByRole('textbox');

    await userEvent.type(inputs[0], 'a');
    expect(inputs[0]).toHaveValue('');

    await userEvent.type(inputs[0], '!');
    expect(inputs[0]).toHaveValue('');

    await userEvent.type(inputs[0], '5');
    expect(inputs[0]).toHaveValue('5');
  });

  it('calls onChange when a digit is entered', async () => {
    const onChange = vi.fn();
    renderWithTheme(<OTPInput length={4} onChange={onChange} />);
    const inputs = screen.getAllByRole('textbox');

    await userEvent.type(inputs[0], '1');
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('calls onComplete when all boxes are filled', async () => {
    const onComplete = vi.fn();
    renderWithTheme(<OTPInput length={4} onComplete={onComplete} />);
    const inputs = screen.getAllByRole('textbox');

    await userEvent.type(inputs[0], '1');
    await userEvent.type(inputs[1], '2');
    await userEvent.type(inputs[2], '3');
    await userEvent.type(inputs[3], '4');

    expect(onComplete).toHaveBeenCalledWith('1234');
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('distributes pasted digits across boxes', async () => {
    const onChange = vi.fn();
    renderWithTheme(<OTPInput length={6} onChange={onChange} />);
    const inputs = screen.getAllByRole('textbox');

    await userEvent.click(inputs[0]);
    await userEvent.paste('123456');

    const allInputs = screen.getAllByRole('textbox');
    expect(allInputs[0]).toHaveValue('1');
    expect(allInputs[1]).toHaveValue('2');
    expect(allInputs[2]).toHaveValue('3');
    expect(allInputs[3]).toHaveValue('4');
    expect(allInputs[4]).toHaveValue('5');
    expect(allInputs[5]).toHaveValue('6');
    expect(onChange).toHaveBeenCalledWith('123456');
  });

  it('filters non-numeric characters on paste', async () => {
    renderWithTheme(<OTPInput length={4} />);
    const inputs = screen.getAllByRole('textbox');

    await userEvent.click(inputs[0]);
    await userEvent.paste('a1b2c3d4');

    const allInputs = screen.getAllByRole('textbox');
    expect(allInputs[0]).toHaveValue('1');
    expect(allInputs[1]).toHaveValue('2');
    expect(allInputs[2]).toHaveValue('3');
    expect(allInputs[3]).toHaveValue('4');
  });

  it('respects disabled state', () => {
    renderWithTheme(<OTPInput length={4} disabled />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input).toBeDisabled();
    });
  });

  it('supports error state', () => {
    renderWithTheme(<OTPInput length={4} error />);
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach((input) => {
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('accepts custom className', () => {
    renderWithTheme(<OTPInput length={4} className="custom-otp" />);
    const container = document.querySelector('.custom-otp');
    expect(container).toBeInTheDocument();
  });

  it('syncs with external value prop', () => {
    const { rerender } = renderWithTheme(<OTPInput length={4} value="12" />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');

    rerender(
      <ThemeProvider theme={lightTheme}>
        <OTPInput length={4} value="34" />
      </ThemeProvider>
    );
    expect(inputs[0]).toHaveValue('3');
    expect(inputs[1]).toHaveValue('4');
  });

  it('calls onComplete again after re-editing to a completed value', async () => {
    const onComplete = vi.fn();
    renderWithTheme(
      <ControlledOTPInput length={4} onComplete={onComplete} initialValue="1234" />
    );
    const inputs = screen.getAllByRole('textbox');

    // onComplete should not fire on initial mount even if value is complete
    expect(onComplete).toHaveBeenCalledTimes(0);

    fireEvent.change(inputs[1], { target: { value: '9' } });
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenLastCalledWith('1934');
  });
});

describe('PinInput', () => {
  it('is exported as an alias for OTPInput', () => {
    expect(PinInput).toBe(OTPInput);
  });

  it('renders correctly as PinInput', () => {
    renderWithTheme(<PinInput length={4} />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });
});
