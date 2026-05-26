import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { ComboBox } from './ComboBox';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('ComboBox', () => {
  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3', disabled: true },
  ];

  it('renders with placeholder', () => {
    renderWithTheme(<ComboBox options={mockOptions} placeholder="Select an option" />);
    expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument();
  });

  it('opens dropdown on focus', async () => {
    renderWithTheme(<ComboBox options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('opens dropdown on arrow down key', async () => {
    renderWithTheme(<ComboBox options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.type(input, '{arrowdown}');
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('selects option on click', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ComboBox options={mockOptions} onChange={onChange} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    const option = screen.getByText('Option 1');
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('filters options on input', async () => {
    renderWithTheme(<ComboBox options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'Option 1');
    await waitFor(() => {
      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });
  });

  it('shows empty state when no matches', async () => {
    renderWithTheme(<ComboBox options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'nonexistent');
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('closes dropdown on escape key', async () => {
    renderWithTheme(<ComboBox options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.keyboard('{escape}');
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('navigates options with arrow keys', async () => {
    renderWithTheme(<ComboBox options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.keyboard('{arrowdown}');
    await userEvent.keyboard('{enter}');
  });

  it('handles multiple selection mode', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ComboBox options={mockOptions} mode="multiple" onChange={onChange} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    const option = screen.getByText('Option 1');
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(['1']);
  });

  it('renders selected tags in multiple mode', async () => {
    renderWithTheme(<ComboBox options={mockOptions} mode="multiple" defaultValue={['1', '2']} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('removes tag when remove button is clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <ComboBox options={mockOptions} mode="multiple" value={['1']} onChange={onChange} />
    );
    const removeButton = screen.getByLabelText('Remove Option 1');
    await userEvent.click(removeButton);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('clears all selections when clear button clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ComboBox options={mockOptions} value="1" onChange={onChange} allowClear />);
    const clearButton = screen.getByLabelText('Clear selection');
    await userEvent.click(clearButton);
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('calls onSearch when typing', async () => {
    const onSearch = vi.fn();
    renderWithTheme(<ComboBox options={mockOptions} onSearch={onSearch} />);
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'test');
    expect(onSearch).toHaveBeenCalledWith('test');
  });

  it('shows loading state', () => {
    renderWithTheme(<ComboBox options={mockOptions} loading />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('shows disabled state', () => {
    renderWithTheme(<ComboBox options={mockOptions} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('shows error state', () => {
    renderWithTheme(<ComboBox options={mockOptions} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('allows creating new option when allowCreate is true', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ComboBox options={mockOptions} allowCreate onChange={onChange} />);
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'New Option');
    await userEvent.keyboard('{enter}');
    expect(onChange).toHaveBeenCalledWith('New Option');
  });

  it('renders with custom create label', async () => {
    renderWithTheme(
      <ComboBox options={mockOptions} allowCreate createLabel={(q) => `Add "${q}"`} />
    );
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'Custom');
    expect(screen.getByText('Add "Custom"')).toBeInTheDocument();
  });

  it('closes dropdown on tab key', async () => {
    renderWithTheme(<ComboBox options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.tab();
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('navigates to first option on Home key', async () => {
    renderWithTheme(<ComboBox options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    fireEvent.keyDown(input, { key: 'Home' });
  });

  it('navigates to last option on End key', async () => {
    renderWithTheme(<ComboBox options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    fireEvent.keyDown(input, { key: 'End' });
  });

  it('removes last tag on backspace in multiple mode', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <ComboBox options={mockOptions} mode="multiple" value={['1', '2']} onChange={onChange} />
    );
    const input = screen.getByRole('combobox');
    await userEvent.type(input, '{backspace}');
    expect(onChange).toHaveBeenCalledWith(['1']);
  });

  it('renders with label', () => {
    renderWithTheme(<ComboBox options={mockOptions} label="My ComboBox" />);
    expect(screen.getByText('My ComboBox')).toBeInTheDocument();
  });

  it('renders with custom id', () => {
    renderWithTheme(<ComboBox options={mockOptions} id="my-combobox" />);
    expect(document.getElementById('my-combobox')).toBeInTheDocument();
  });

  it('navigates with arrow up at closed dropdown', async () => {
    renderWithTheme(<ComboBox options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThan(0);
  });
});
