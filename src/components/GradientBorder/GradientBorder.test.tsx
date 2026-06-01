import { render, screen } from '@testing-library/react';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { GradientBorder } from './GradientBorder';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('GradientBorder', () => {
  it('renders children', () => {
    renderWithTheme(
      <GradientBorder>
        <div data-testid="content">Hello</div>
      </GradientBorder>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <GradientBorder className="my-border">
        <div>Content</div>
      </GradientBorder>
    );
    expect(container.querySelector('.my-border')).toBeInTheDocument();
  });

  it('renders with animated prop', () => {
    const { container } = renderWithTheme(
      <GradientBorder animated>
        <div data-testid="animated-content">Animated</div>
      </GradientBorder>
    );
    expect(screen.getByTestId('animated-content')).toBeInTheDocument();
    // The wrapper should have the animated styles applied via ::before
    const wrapper = container.firstChild;
    expect(wrapper).toBeTruthy();
  });
});
