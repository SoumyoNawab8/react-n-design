import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { RadioGroup } from './RadioGroup';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const defaultOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('RadioGroup', () => {
  it('renders radio options from options prop and is accessible', async () => {
    const { container } = renderWithTheme(<RadioGroup options={defaultOptions} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('Cherry')).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('only one option is selected at a time', () => {
    renderWithTheme(<RadioGroup options={defaultOptions} value="banana" />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('aria-checked', 'false');
    expect(radios[1]).toHaveAttribute('aria-checked', 'true');
    expect(radios[2]).toHaveAttribute('aria-checked', 'false');
  });

  it('clicking an unselected option selects it and deselects the previous', async () => {
    const onChange = vi.fn();
    renderWithTheme(<RadioGroup options={defaultOptions} value="apple" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
    await userEvent.click(radios[1]);
    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('each radio has role="radio", aria-checked, and tabindex', () => {
    renderWithTheme(<RadioGroup options={defaultOptions} value="apple" />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute('aria-checked');
    });
    expect(radios[0]).toHaveAttribute('tabindex', '0');
    expect(radios[1]).toHaveAttribute('tabindex', '-1');
    expect(radios[2]).toHaveAttribute('tabindex', '-1');
  });

  it('name prop groups radios via data-name', () => {
    renderWithTheme(<RadioGroup options={defaultOptions} name="fruit" value="apple" />);
    const radios = screen.getAllByRole('radio');
    radios.forEach((radio) => {
      expect(radio).toHaveAttribute('data-name', 'fruit');
    });
  });

  it('disabled option cannot be selected', async () => {
    const onChange = vi.fn();
    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
    ];
    renderWithTheme(<RadioGroup options={options} value="apple" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    expect(radios[1]).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(radios[1]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('keyboard ArrowDown moves focus and selects next option', async () => {
    const onChange = vi.fn();
    renderWithTheme(<RadioGroup options={defaultOptions} value="apple" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    radios[0].focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('keyboard ArrowUp moves focus and selects previous option', async () => {
    const onChange = vi.fn();
    renderWithTheme(<RadioGroup options={defaultOptions} value="banana" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    radios[1].focus();
    await userEvent.keyboard('{ArrowUp}');
    expect(onChange).toHaveBeenCalledWith('apple');
  });

  it('keyboard ArrowRight moves to next option', async () => {
    const onChange = vi.fn();
    renderWithTheme(<RadioGroup options={defaultOptions} value="apple" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    radios[0].focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('keyboard ArrowLeft moves to previous option', async () => {
    const onChange = vi.fn();
    renderWithTheme(<RadioGroup options={defaultOptions} value="cherry" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    radios[2].focus();
    await userEvent.keyboard('{ArrowLeft}');
    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('keyboard Space selects the focused option', async () => {
    const onChange = vi.fn();
    renderWithTheme(<RadioGroup options={defaultOptions} value="apple" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    radios[1].focus();
    await userEvent.keyboard(' ');
    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('keyboard cycles to first option after last with ArrowDown', async () => {
    const onChange = vi.fn();
    renderWithTheme(<RadioGroup options={defaultOptions} value="cherry" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    radios[2].focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(onChange).toHaveBeenCalledWith('apple');
  });

  it('keyboard cycles to last option before first with ArrowUp', async () => {
    const onChange = vi.fn();
    renderWithTheme(<RadioGroup options={defaultOptions} value="apple" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    radios[0].focus();
    await userEvent.keyboard('{ArrowUp}');
    expect(onChange).toHaveBeenCalledWith('cherry');
  });

  it('skips disabled options when cycling with keyboard', async () => {
    const onChange = vi.fn();
    const options = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
      { value: 'cherry', label: 'Cherry' },
    ];
    renderWithTheme(<RadioGroup options={options} value="apple" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    radios[0].focus();
    await userEvent.keyboard('{ArrowDown}');
    expect(onChange).toHaveBeenCalledWith('cherry');
  });

  it('passes axe-core audit with preselected value', async () => {
    const { container } = renderWithTheme(<RadioGroup options={defaultOptions} value="banana" />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
