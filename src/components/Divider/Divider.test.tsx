import { render, screen } from '@testing-library/react';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Divider } from './Divider';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    renderWithTheme(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders vertical divider', () => {
    renderWithTheme(<Divider orientation="vertical" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders solid border by default', () => {
    renderWithTheme(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
  });

  it('renders dashed border', () => {
    renderWithTheme(<Divider type="dashed" />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
  });

  it('renders dotted border', () => {
    renderWithTheme(<Divider type="dotted" />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
  });

  it('renders divider with text', () => {
    renderWithTheme(<Divider>Or</Divider>);
    const divider = screen.getByRole('separator');
    expect(divider).toBeInTheDocument();
    expect(screen.getByText('Or')).toBeInTheDocument();
  });

  it('renders with custom aria-orientation', () => {
    renderWithTheme(<Divider orientation="horizontal" aria-orientation="vertical" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('renders with children and uses computed orientation', () => {
    renderWithTheme(<Divider orientation="vertical">Text</Divider>);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('forwards additional props through separator attributes', () => {
    renderWithTheme(<Divider className="custom-class" id="my-divider" />);
    const divider = document.getElementById('my-divider');
    expect(divider).toBeInTheDocument();
    expect(divider).toHaveClass('custom-class');
  });

  it('renders complex children content', () => {
    renderWithTheme(
      <Divider>
        <span data-testid="child">Complex Content</span>
      </Divider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('maintains correct separator role', () => {
    renderWithTheme(<Divider />);
    const divider = screen.getByRole('separator');
    expect(divider).toBeTruthy();
  });

  it('renders horizontal divider with text correctly', () => {
    renderWithTheme(<Divider orientation="horizontal">Center Text</Divider>);
    expect(screen.getByText('Center Text')).toBeInTheDocument();
  });

  it('renders vertical divider with text', () => {
    renderWithTheme(<Divider orientation="vertical">Vertical Text</Divider>);
    expect(screen.getByText('Vertical Text')).toBeInTheDocument();
  });

  it('uses aria-orientation over orientation prop when provided', () => {
    renderWithTheme(<Divider orientation="horizontal" aria-orientation="vertical" />);
    const divider = screen.getByRole('separator');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('handles all border types', () => {
    const { rerender } = renderWithTheme(<Divider type="solid" />);
    rerender(
      <ThemeProvider theme={lightTheme}>
        <Divider type="dashed" />
      </ThemeProvider>
    );
    expect(screen.getByRole('separator')).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={lightTheme}>
        <Divider type="dotted" />
      </ThemeProvider>
    );
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
