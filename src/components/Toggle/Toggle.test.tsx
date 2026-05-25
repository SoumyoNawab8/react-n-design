import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Toggle } from './Toggle';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Toggle', () => {
  it('renders unpressed by default', () => {
    renderWithTheme(<Toggle>Press me</Toggle>);
    const toggle = screen.getByRole('button', { name: /press me/i });
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders pressed state when pressed prop is true', () => {
    renderWithTheme(<Toggle pressed>Press me</Toggle>);
    const toggle = screen.getByRole('button', { name: /press me/i });
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('toggles on click in uncontrolled mode', async () => {
    const onPressedChange = vi.fn();
    renderWithTheme(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>);
    const toggle = screen.getByRole('button', { name: /toggle/i });
    await userEvent.click(toggle);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onPressedChange with new state in controlled mode', async () => {
    const onPressedChange = vi.fn();
    renderWithTheme(
      <Toggle pressed={false} onPressedChange={onPressedChange}>
        Controlled
      </Toggle>
    );
    const toggle = screen.getByRole('button', { name: /controlled/i });
    await userEvent.click(toggle);
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('toggles with Space key', async () => {
    const onPressedChange = vi.fn();
    renderWithTheme(<Toggle onPressedChange={onPressedChange}>Keyboard</Toggle>);
    const toggle = screen.getByRole('button', { name: /keyboard/i });
    toggle.focus();
    await userEvent.keyboard(' ');
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('toggles with Enter key', async () => {
    const onPressedChange = vi.fn();
    renderWithTheme(<Toggle onPressedChange={onPressedChange}>Keyboard</Toggle>);
    const toggle = screen.getByRole('button', { name: /keyboard/i });
    toggle.focus();
    await userEvent.keyboard('{Enter}');
    expect(onPressedChange).toHaveBeenCalledWith(true);
  });

  it('has aria-pressed attribute', () => {
    renderWithTheme(<Toggle>Accessible</Toggle>);
    const toggle = screen.getByRole('button', { name: /accessible/i });
    expect(toggle).toHaveAttribute('aria-pressed');
  });

  it('does not toggle when disabled', async () => {
    const onPressedChange = vi.fn();
    renderWithTheme(
      <Toggle disabled onPressedChange={onPressedChange}>
        Disabled
      </Toggle>
    );
    const toggle = screen.getByRole('button', { name: /disabled/i });
    expect(toggle).toBeDisabled();
    await userEvent.click(toggle);
    expect(onPressedChange).not.toHaveBeenCalled();
  });

  it('is accessible', async () => {
    const { container } = renderWithTheme(
      <Toggle defaultPressed={false} onPressedChange={() => {}}>
        Accessible Toggle
      </Toggle>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
