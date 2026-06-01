import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { MentionInput } from './MentionInput';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const ControlledMentionInput = (props: { initialValue?: string } & Record<string, unknown>) => {
  const [value, setValue] = useState(props.initialValue || '');
  return <MentionInput {...props} value={value} onChange={setValue} />;
};

const options = [
  { id: '1', label: 'Alice' },
  { id: '2', label: 'Bob' },
  { id: '3', label: 'Charlie' },
];

describe('MentionInput', () => {
  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(
      <ControlledMentionInput options={options} />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('shows dropdown when @ is typed', async () => {
    renderWithTheme(<ControlledMentionInput options={options} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '@');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('@Alice')).toBeInTheDocument();
    expect(screen.getByText('@Bob')).toBeInTheDocument();
    expect(screen.getByText('@Charlie')).toBeInTheDocument();
  });

  it('filters options based on typed query', async () => {
    renderWithTheme(<ControlledMentionInput options={options} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '@Al');
    expect(await screen.findByText('@Alice')).toBeInTheDocument();
    expect(screen.queryByText('@Bob')).not.toBeInTheDocument();
    expect(screen.queryByText('@Charlie')).not.toBeInTheDocument();
  });

  it('navigates options with arrow keys', async () => {
    renderWithTheme(<ControlledMentionInput options={options} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '@');
    const listbox = await screen.findByRole('listbox');
    expect(listbox).toBeInTheDocument();

    const firstOption = screen.getByRole('option', { name: '@Alice' });
    expect(firstOption).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(textarea, { key: 'ArrowDown' });
    const secondOption = screen.getByRole('option', { name: '@Bob' });
    expect(secondOption).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(textarea, { key: 'ArrowUp' });
    expect(firstOption).toHaveAttribute('aria-selected', 'true');
  });

  it('selects mention with Enter', async () => {
    renderWithTheme(<ControlledMentionInput options={options} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '@Al');
    await userEvent.type(textarea, '{Enter}');
    expect(textarea).toHaveValue('@Alice ');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects mention with Tab', async () => {
    renderWithTheme(<ControlledMentionInput options={options} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '@Bo');
    await userEvent.type(textarea, '{Tab}');
    expect(textarea).toHaveValue('@Bob ');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects mention on click', async () => {
    renderWithTheme(<ControlledMentionInput options={options} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '@');
    const option = await screen.findByText('@Charlie');
    await userEvent.click(option);
    expect(textarea).toHaveValue('@Charlie ');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes dropdown on Escape', async () => {
    renderWithTheme(<ControlledMentionInput options={options} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '@');
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(textarea, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('does not show dropdown when no options match', async () => {
    renderWithTheme(<ControlledMentionInput options={options} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '@xyz');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('shows placeholder when empty', () => {
    renderWithTheme(
      <ControlledMentionInput options={options} placeholder="Type @ to mention..." />
    );
    expect(screen.getByPlaceholderText('Type @ to mention...')).toBeInTheDocument();
  });

  it('renders styled mentions in overlay', () => {
    renderWithTheme(
      <MentionInput
        value="Hello @Alice and @Bob"
        onChange={vi.fn()}
        options={options}
      />
    );
    const overlay = screen.getByLabelText('Mention input').previousElementSibling;
    expect(overlay).toBeTruthy();
    // The overlay should contain the styled mention pills
    const pills = overlay?.querySelectorAll('span');
    expect(pills && pills.length > 0).toBe(true);
  });

  it('handles existing text before mention', async () => {
    renderWithTheme(<ControlledMentionInput initialValue="Hey " options={options} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, '@Al');
    await userEvent.type(textarea, '{Enter}');
    expect(textarea).toHaveValue('Hey @Alice ');
  });

  it('handles text after mention query', async () => {
    renderWithTheme(<ControlledMentionInput options={options} />);
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Hey @Al there');
    // Move cursor to after "@Al"
    textarea.setSelectionRange(7, 7);
    fireEvent.click(textarea);
    fireEvent.keyDown(textarea, { key: 'Enter' });
    expect(textarea).toHaveValue('Hey @Alice there');
  });
});
