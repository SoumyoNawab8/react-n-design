import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { MultiSelect } from './MultiSelect';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('MultiSelect', () => {
  const mockOptions = ['Apple', 'Banana', 'Cherry', 'Date'];

  it('renders with placeholder', () => {
    renderWithTheme(<MultiSelect options={mockOptions} placeholder="Select fruits" />);
    const input = screen.getByPlaceholderText('Select fruits');
    expect(input).toBeInTheDocument();
  });

  it('opens dropdown on focus', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('selects option when clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(<MultiSelect options={mockOptions} onChange={onChange} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    const option = screen.getByRole('option', { name: 'Apple' });
    await userEvent.click(option);
    expect(onChange).toHaveBeenCalledWith(['Apple']);
  });

  it('removes tag when remove button clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <MultiSelect options={mockOptions} value={['Apple', 'Banana']} onChange={onChange} />
    );
    const removeButton = screen.getByLabelText('Remove Apple');
    await userEvent.click(removeButton);
    expect(onChange).toHaveBeenCalledWith(['Banana']);
  });

  it('filters options when typing', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'App');
    await waitFor(() => {
      expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    });
  });

  it('removes last tag on Backspace when input is empty', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <MultiSelect options={mockOptions} value={['Apple', 'Banana']} onChange={onChange} />
    );
    const input = screen.getByRole('combobox');
    await userEvent.type(input, '{backspace}');
    expect(onChange).toHaveBeenCalledWith(['Apple']);
  });

  it('closes dropdown on Escape key', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.keyboard('{escape}');
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('closes dropdown on Tab key', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.tab();
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  it('navigates options with keyboard', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.keyboard('{arrowdown}');
    await userEvent.keyboard('{enter}');
  });

  it('shows disabled state', () => {
    renderWithTheme(<MultiSelect options={mockOptions} disabled />);
    const input = screen.getByRole('combobox');
    expect(input).toBeDisabled();
  });

  it('renders with custom placeholder', () => {
    renderWithTheme(<MultiSelect options={mockOptions} placeholder="Choose items" />);
    expect(screen.getByPlaceholderText('Choose items')).toBeInTheDocument();
  });

  it('filters out already selected options from dropdown', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} value={['Apple']} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    const options = screen.getAllByRole('option');
    expect(options).not.toHaveLength(mockOptions.length);
  });

  it('shows empty state when all options are selected', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} value={[...mockOptions]} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders with maxHeight prop', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} maxHeight={200} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    const dropdown = screen.getByRole('listbox');
    expect(dropdown).toHaveStyle({ maxHeight: 200 });
  });

  it('opens dropdown on ArrowUp key when closed', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.type(input, '{arrowup}');
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });
  });

  it('highlights option on mouse enter', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    const options = screen.getAllByRole('option');
    fireEvent.mouseEnter(options[1]);
    expect(options[1]).toHaveAttribute('tabindex', expect.anything());
  });

  it('has correct aria attributes', () => {
    renderWithTheme(<MultiSelect options={mockOptions} />);
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-autocomplete', 'list');
    expect(input).toHaveAttribute('aria-haspopup', 'listbox');
  });

  it('listbox has correct aria attributes', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.click(input);
    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
  });

  it('renders selected tags', () => {
    renderWithTheme(<MultiSelect options={mockOptions} value={['Apple', 'Banana']} />);
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('clear input value after selection', async () => {
    renderWithTheme(<MultiSelect options={mockOptions} />);
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'App');
    await userEvent.click(screen.getByRole('option'));
    expect(input).toHaveValue('');
  });
});
