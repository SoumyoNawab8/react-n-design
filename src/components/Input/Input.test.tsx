import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Input } from './Input';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const ControlledInput = (props: any) => {
  const [value, setValue] = useState(props.value || '');
  return <Input {...props} value={value} onChange={(e: any) => setValue(e.target.value)} />;
};

describe('Input', () => {
  it('renders an input element', () => {
    renderWithTheme(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    renderWithTheme(<Input label="Email" id="email" />);
    const input = screen.getByLabelText(/email/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'email');
  });

  it('shows error text when error prop is provided', () => {
    renderWithTheme(<Input error="This field is required" id="username" />);
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'username-error');
  });

  it('typing updates the input value', async () => {
    renderWithTheme(<ControlledInput />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'hello world');
    expect(input).toHaveValue('hello world');
  });

  it('renders prefix and suffix', () => {
    renderWithTheme(
      <Input prefix={<span data-testid="prefix">$</span>} suffix={<span data-testid="suffix">.00</span>} />
    );
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });

  it('renders password toggle for password type', () => {
    renderWithTheme(<Input type="password" id="pwd" />);
    const toggle = screen.getByRole('button', { name: /show password/i });
    expect(toggle).toBeInTheDocument();
  });

  it('toggles password visibility on click', async () => {
    renderWithTheme(<ControlledInput type="password" id="pwd" value="secret" />);
    const input = screen.getByDisplayValue('secret');
    expect(input).toHaveAttribute('type', 'password');
    const toggle = screen.getByRole('button', { name: /show password/i });
    await userEvent.click(toggle);
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
  });

  it('renders clear button when allowClear and value are present', () => {
    renderWithTheme(<ControlledInput allowClear value="clearable text" />);
    expect(screen.getByRole('button', { name: /clear input/i })).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
