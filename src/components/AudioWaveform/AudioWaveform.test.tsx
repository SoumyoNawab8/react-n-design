import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { AudioWaveform } from './AudioWaveform';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('AudioWaveform', () => {
  it('renders the waveform and is accessible', async () => {
    const { container } = renderWithTheme(<AudioWaveform />);
    const waveform = screen.getByTestId('audio-waveform');
    expect(waveform).toBeInTheDocument();
    expect(waveform).toHaveAttribute('role', 'img');
    expect(waveform).toHaveAttribute('aria-label', 'Audio waveform');
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders correct number of bars', () => {
    renderWithTheme(<AudioWaveform bars={20} />);
    const bars = screen.getAllByTestId('audio-waveform-bar');
    expect(bars).toHaveLength(20);
  });

  it('defaults to 40 bars', () => {
    renderWithTheme(<AudioWaveform />);
    const bars = screen.getAllByTestId('audio-waveform-bar');
    expect(bars).toHaveLength(40);
  });

  it('sets aria-label to active when isActive is true', () => {
    renderWithTheme(<AudioWaveform isActive />);
    const waveform = screen.getByTestId('audio-waveform');
    expect(waveform).toHaveAttribute('aria-label', 'Audio waveform active');
  });

  it('applies custom className', () => {
    renderWithTheme(<AudioWaveform className="my-waveform" />);
    const waveform = screen.getByTestId('audio-waveform');
    expect(waveform).toHaveClass('my-waveform');
  });

  it('renders with different amplitude', () => {
    renderWithTheme(<AudioWaveform amplitude={0.8} />);
    expect(screen.getAllByTestId('audio-waveform-bar')).toHaveLength(40);
  });

  it('renders with different barGap', () => {
    renderWithTheme(<AudioWaveform barGap={4} />);
    expect(screen.getAllByTestId('audio-waveform-bar')).toHaveLength(40);
  });
});
