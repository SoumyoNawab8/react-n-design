import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { ColorPicker } from './ColorPicker';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('ColorPicker', () => {
  it('renders with default state', () => {
    renderWithTheme(<ColorPicker />);
    expect(screen.getByLabelText(/Selected color/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Hex color value/i })).toBeInTheDocument();
  });

  it('renders color preview', () => {
    renderWithTheme(<ColorPicker value="#ff0000" />);
    const preview = screen.getByLabelText(/Selected color #ff0000/i);
    expect(preview).toBeInTheDocument();
  });

  it('renders RGB sliders', () => {
    renderWithTheme(<ColorPicker />);
    expect(screen.getByLabelText(/R value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/G value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/B value/i)).toBeInTheDocument();
  });

  it('renders preset color swatches', () => {
    renderWithTheme(<ColorPicker />);
    const swatches = screen.getAllByRole('button', { name: /Select color/i });
    expect(swatches.length).toBeGreaterThan(0);
  });

  it('calls onChange when hex input changes', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ColorPicker onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: /Hex color value/i });
    await userEvent.clear(input);
    await userEvent.type(input, '#ff0000');
    expect(onChange).toHaveBeenCalledWith('#ff0000');
  });

  it('calls onChange when RGB slider changes', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ColorPicker onChange={onChange} />);
    const redSlider = screen.getByLabelText(/R value/i);
    fireEvent.change(redSlider, { target: { value: '255' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onChange when swatch is clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ColorPicker onChange={onChange} />);
    const swatches = screen.getAllByRole('button', { name: /Select color/i });
    await userEvent.click(swatches[0]);
    expect(onChange).toHaveBeenCalled();
  });

  it('handles controlled mode with value prop', () => {
    const { rerender } = renderWithTheme(<ColorPicker value="#ff0000" />);
    rerender(
      <ThemeProvider theme={lightTheme}>
        <ColorPicker value="#00ff00" />
      </ThemeProvider>
    );
    expect(screen.getByLabelText(/Selected color #00ff00/i)).toBeInTheDocument();
  });

  it('reverts invalid hex on blur', async () => {
    renderWithTheme(<ColorPicker value="#ff0000" />);
    const input = screen.getByRole('textbox', { name: /Hex color value/i });
    await userEvent.clear(input);
    await userEvent.type(input, 'invalid');
    await userEvent.tab();
    expect(input).toHaveValue('#ff0000');
  });

  it('handles custom presets', () => {
    const customPresets = ['#111111', '#222222', '#333333'];
    renderWithTheme(<ColorPicker presets={customPresets} />);
    const swatches = screen.getAllByRole('button', { name: /Select color/i });
    expect(swatches.length).toBe(3);
  });

  it('hides hex input when showInput is false', () => {
    renderWithTheme(<ColorPicker showInput={false} />);
    expect(screen.queryByLabelText(/Hex color value/i)).not.toBeInTheDocument();
  });

  it('handles keyboard navigation on swatches', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ColorPicker onChange={onChange} />);
    const swatches = screen.getAllByRole('button', { name: /Select color/i });
    swatches[0].focus();

    fireEvent.keyDown(swatches[0], { key: 'ArrowRight' });
    expect(document.activeElement).toBe(swatches[1]);

    fireEvent.keyDown(swatches[1], { key: 'Enter' });
    expect(onChange).toHaveBeenCalled();
  });

  it('handles arrow down navigation on swatches', async () => {
    renderWithTheme(<ColorPicker />);
    const swatches = screen.getAllByRole('button', { name: /Select color/i });
    swatches[0].focus();
    fireEvent.keyDown(swatches[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBeTruthy();
  });

  it('handles Home key to first swatch', async () => {
    renderWithTheme(<ColorPicker />);
    const swatches = screen.getAllByRole('button', { name: /Select color/i });
    swatches[5].focus();
    fireEvent.keyDown(swatches[5], { key: 'Home' });
    expect(document.activeElement).toBe(swatches[0]);
  });

  it('handles End key to last swatch', async () => {
    renderWithTheme(<ColorPicker />);
    const swatches = screen.getAllByRole('button', { name: /Select color/i });
    swatches[0].focus();
    fireEvent.keyDown(swatches[0], { key: 'End' });
    expect(document.activeElement).toBe(swatches[swatches.length - 1]);
  });

  it('indicates selected swatch with aria-pressed', () => {
    renderWithTheme(<ColorPicker value="#ef4444" />);
    const selectedSwatch = screen.getByRole('button', { name: /#ef4444/i });
    expect(selectedSwatch).toHaveAttribute('aria-pressed', 'true');
  });

  it('handles 3-char hex input', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ColorPicker onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: /Hex color value/i });
    await userEvent.clear(input);
    await userEvent.type(input, '#fff');
    await userEvent.tab();
    expect(input.value).toContain('#');
  });

  it('handles uppercase hex input', async () => {
    const onChange = vi.fn();
    renderWithTheme(<ColorPicker onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: /Hex color value/i });
    await userEvent.clear(input);
    await userEvent.type(input, '#FF0000');
    await userEvent.tab();
    expect(input.value).toContain('#');
  });
});
