import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Toggle } from './Toggle';
import { ToggleGroup } from './ToggleGroup';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('ToggleGroup', () => {
  it('renders multiple Toggle children', () => {
    renderWithTheme(
      <ToggleGroup type="single">
        <Toggle value="a">A</Toggle>
        <Toggle value="b">B</Toggle>
        <Toggle value="c">C</Toggle>
      </ToggleGroup>
    );
    expect(screen.getByRole('button', { name: /a/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /b/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /c/i })).toBeInTheDocument();
  });

  it('type="single" allows only one toggle pressed at a time', async () => {
    const onValueChange = vi.fn();
    renderWithTheme(
      <ToggleGroup type="single" value="a" onValueChange={onValueChange}>
        <Toggle value="a">A</Toggle>
        <Toggle value="b">B</Toggle>
      </ToggleGroup>
    );
    const toggleA = screen.getByRole('button', { name: /a/i });
    const toggleB = screen.getByRole('button', { name: /b/i });

    expect(toggleA).toHaveAttribute('aria-pressed', 'true');
    expect(toggleB).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(toggleB);
    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  it('type="multiple" allows multiple toggles pressed', async () => {
    const onValueChange = vi.fn();
    renderWithTheme(
      <ToggleGroup type="multiple" value={['a']} onValueChange={onValueChange}>
        <Toggle value="a">A</Toggle>
        <Toggle value="b">B</Toggle>
      </ToggleGroup>
    );
    const toggleA = screen.getByRole('button', { name: /a/i });
    const toggleB = screen.getByRole('button', { name: /b/i });

    expect(toggleA).toHaveAttribute('aria-pressed', 'true');
    expect(toggleB).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(toggleB);
    expect(onValueChange).toHaveBeenCalledWith(['a', 'b']);
  });

  it('keyboard arrows navigate between toggles', async () => {
    renderWithTheme(
      <ToggleGroup type="single">
        <Toggle value="a">A</Toggle>
        <Toggle value="b">B</Toggle>
        <Toggle value="c">C</Toggle>
      </ToggleGroup>
    );
    const toggleA = screen.getByRole('button', { name: /a/i });
    const toggleB = screen.getByRole('button', { name: /b/i });

    toggleA.focus();
    expect(document.activeElement).toBe(toggleA);

    await userEvent.keyboard('{ArrowRight}');
    expect(document.activeElement).toBe(toggleB);

    await userEvent.keyboard('{ArrowLeft}');
    expect(document.activeElement).toBe(toggleA);
  });

  it('is accessible', async () => {
    const { container } = renderWithTheme(
      <ToggleGroup type="single" value="a">
        <Toggle value="a">A</Toggle>
        <Toggle value="b">B</Toggle>
      </ToggleGroup>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
