import { render, screen } from '@testing-library/react';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { ProgressBar } from './ProgressBar';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('ProgressBar', () => {
  it('renders with value', () => {
    renderWithTheme(<ProgressBar value={50} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });

  it('clamps value to 0-100 range', () => {
    renderWithTheme(<ProgressBar value={150} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });

  it('clamps negative value to 0', () => {
    renderWithTheme(<ProgressBar value={-20} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });

  it('renders with label', () => {
    renderWithTheme(<ProgressBar value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('renders in small size', () => {
    renderWithTheme(<ProgressBar value={50} size="small" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders in medium size', () => {
    renderWithTheme(<ProgressBar value={50} size="medium" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders striped variant', () => {
    renderWithTheme(<ProgressBar value={50} variant="striped" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with success status', () => {
    renderWithTheme(<ProgressBar value={100} status="success" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with error status', () => {
    renderWithTheme(<ProgressBar value={30} status="error" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders indeterminate state', () => {
    renderWithTheme(<ProgressBar value={0} indeterminate />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).not.toHaveAttribute('aria-valuenow');
    expect(progressBar).toHaveAttribute('aria-valuetext', 'In progress');
  });

  it('forwards additional props', () => {
    renderWithTheme(<ProgressBar value={50} data-testid="my-progress" />);
    expect(screen.getByTestId('my-progress')).toBeInTheDocument();
  });

  it('does not show label when indeterminate', () => {
    renderWithTheme(<ProgressBar value={50} showLabel indeterminate />);
    expect(screen.queryByText('%')).not.toBeInTheDocument();
  });

  it('has correct aria attributes', () => {
    renderWithTheme(<ProgressBar value={60} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    expect(progressBar).toHaveAttribute('aria-valuetext', '60 percent');
    expect(progressBar).toHaveAttribute('aria-label', 'Progress');
  });

  it('uses custom aria-label', () => {
    renderWithTheme(<ProgressBar value={50} aria-label="Upload Progress" />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', 'Upload Progress');
  });

  it('renders with 0% value', () => {
    renderWithTheme(<ProgressBar value={0} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
  });

  it('renders with 100% value', () => {
    renderWithTheme(<ProgressBar value={100} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });

  it('renders with striped variant and success status', () => {
    renderWithTheme(<ProgressBar value={100} variant="striped" status="success" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with striped variant and error status', () => {
    renderWithTheme(<ProgressBar value={10} variant="striped" status="error" />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('rounds value to nearest integer', () => {
    renderWithTheme(<ProgressBar value={66.7} />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '67');
  });

  it('renders label with rounded value', () => {
    renderWithTheme(<ProgressBar value={33.33} showLabel />);
    expect(screen.getByText('33%')).toBeInTheDocument();
  });

  it('accepts any valid HTML div attributes', () => {
    renderWithTheme(
      <ProgressBar value={50} id="progress-id" className="progress-class" />
    );
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('progress-class');
  });
});
