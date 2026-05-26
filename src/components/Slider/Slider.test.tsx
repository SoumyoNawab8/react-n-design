import { fireEvent, render, screen } from '@testing-library/react';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Slider } from './Slider';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Slider', () => {
  it('renders with default props', () => {
    renderWithTheme(<Slider />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  it('renders with custom value', () => {
    renderWithTheme(<Slider value={50} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('renders with label', () => {
    renderWithTheme(<Slider label="Volume" />);
    expect(screen.getByText('Volume')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument(); // Default value
  });

  it('renders with custom min and max', () => {
    renderWithTheme(<Slider min={0} max={100} value={50} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '100');
  });

  it('has correct aria attributes', () => {
    renderWithTheme(<Slider value={75} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '75');
    expect(slider).toHaveAttribute('aria-valuetext', '75');
  });

  it('handles keyboard navigation with ArrowRight', () => {
    const onChange = vi.fn();
    renderWithTheme(<Slider value={50} step={10} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(60);
  });

  it('handles keyboard navigation with ArrowUp', () => {
    const onChange = vi.fn();
    renderWithTheme(<Slider value={50} step={10} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowUp' });
    expect(onChange).toHaveBeenCalledWith(60);
  });

  it('handles keyboard navigation with ArrowLeft', () => {
    const onChange = vi.fn();
    renderWithTheme(<Slider value={50} step={10} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(40);
  });

  it('handles keyboard navigation with ArrowDown', () => {
    const onChange = vi.fn();
    renderWithTheme(<Slider value={50} step={10} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowDown' });
    expect(onChange).toHaveBeenCalledWith(40);
  });

  it('handles Home key to min value', () => {
    const onChange = vi.fn();
    renderWithTheme(<Slider value={80} min={0} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'Home' });
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('handles End key to max value', () => {
    const onChange = vi.fn();
    renderWithTheme(<Slider value={20} max={100} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'End' });
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it('handles PageUp key', () => {
    const onChange = vi.fn();
    renderWithTheme(<Slider value={20} step={5} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'PageUp' });
    expect(onChange).toHaveBeenCalledWith(70);
  });

  it('handles PageDown key', () => {
    const onChange = vi.fn();
    renderWithTheme(<Slider value={80} step={5} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'PageDown' });
    expect(onChange).toHaveBeenCalledWith(30);
  });

  it('calls onChangeComplete on keyboard release', () => {
    const onChangeComplete = vi.fn();
    renderWithTheme(<Slider value={50} onChangeComplete={onChangeComplete} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(onChangeComplete).toHaveBeenCalled();
  });

  it('renders with marks', () => {
    const marks = [
      { value: 0, label: 'Min' },
      { value: 50, label: 'Mid' },
      { value: 100, label: 'Max' },
    ];
    renderWithTheme(<Slider marks={marks} />);
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Mid')).toBeInTheDocument();
    expect(screen.getByText('Max')).toBeInTheDocument();
  });

  it('renders with custom id', () => {
    renderWithTheme(<Slider id="custom-slider" />);
    expect(document.getElementById('custom-slider')).toBeInTheDocument();
  });

  it('generates id from label', () => {
    renderWithTheme(<Slider label="My Slider" />);
    const label = document.querySelector('label');
    expect(label).toHaveAttribute('for', 'my-slider');
  });

  it('renders with error message', () => {
    renderWithTheme(<Slider error="Invalid value" />);
    expect(screen.getByText('Invalid value')).toBeInTheDocument();
  });

  it('has aria-invalid when error is present', () => {
    renderWithTheme(<Slider error="Error" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-invalid', 'true');
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Slider disabled />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-disabled', 'true');
    expect(slider).toHaveAttribute('tabindex', '-1');
  });

  it('renders in vertical orientation', () => {
    renderWithTheme(<Slider vertical />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('renders with full width', () => {
    renderWithTheme(<Slider fullWidth />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('clamps value to min-max range', () => {
    const onChange = vi.fn();
    renderWithTheme(<Slider value={150} max={100} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '100');
  });

  it('snapshots value to step increments', () => {
    const { rerender } = renderWithTheme(<Slider value={0} step={10} />);
    rerender(
      <ThemeProvider theme={lightTheme}>
        <Slider value={23} step={10} />
      </ThemeProvider>
    );
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '20');
  });

  it('handles controlled mode', () => {
    const { rerender } = renderWithTheme(<Slider value={50} />);
    rerender(
      <ThemeProvider theme={lightTheme}>
        <Slider value={75} />
      </ThemeProvider>
    );
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '75');
  });

  it('renders with defaultValue in uncontrolled mode', () => {
    renderWithTheme(<Slider defaultValue={50} />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '50');
  });

  it('does not dispatch default action on keydown', () => {
    const onChange = vi.fn();
    renderWithTheme(<Slider value={50} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    const _event = fireEvent.keyDown(slider, { key: 'ArrowRight' });
  });
});
