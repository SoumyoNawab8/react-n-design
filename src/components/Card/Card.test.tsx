import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Card } from './Card';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Card', () => {
  it('renders children and is accessible', async () => {
    const { container } = renderWithTheme(<Card>Card content</Card>);
    expect(screen.getByText(/card content/i)).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders with cover, header, and footer', () => {
    renderWithTheme(
      <Card
        cover={<div data-testid="cover" />}
        header={<div data-testid="header" />}
        footer={<div data-testid="footer" />}
      >
        Content
      </Card>
    );
    expect(screen.getByTestId('cover')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('shows loading state with aria-busy', () => {
    const { container } = renderWithTheme(<Card loading>Loading content</Card>);
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
  });

  it('shows shimmer loading state', () => {
    const { container } = renderWithTheme(<Card shimmer>Shimmer content</Card>);
    expect(container.querySelector('[aria-busy="true"]')).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });

  it('renders with glass variant', () => {
    const { container } = renderWithTheme(
      <Card variant="glass">Glass card</Card>
    );
    expect(screen.getByText(/glass card/i)).toBeInTheDocument();
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveAttribute('class');
  });

  it('renders with elevated variant', () => {
    const { container } = renderWithTheme(
      <Card variant="elevated">Elevated card</Card>
    );
    expect(screen.getByText(/elevated card/i)).toBeInTheDocument();
  });

  it('renders with cover aspect ratio', () => {
    const { container } = renderWithTheme(
      <Card
        cover={<img src="test.jpg" alt="test" />}
        coverAspectRatio="16/9"
      >
        Content
      </Card>
    );
    expect(screen.getByAltText('test')).toBeInTheDocument();
  });

  it('renders with responsive padding object', () => {
    renderWithTheme(
      <Card padding={{ xs: 'small', md: 'large' }}>Responsive padding</Card>
    );
    expect(screen.getByText(/responsive padding/i)).toBeInTheDocument();
  });

  it('renders with entrance animation', () => {
    const { container } = renderWithTheme(
      <Card entrance="slide-up">Animated card</Card>
    );
    expect(screen.getByText(/animated card/i)).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = renderWithTheme(
      <Card className="custom-card-class">Custom class</Card>
    );
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toHaveClass('custom-card-class');
  });

  it('accepts custom style prop', () => {
    const { container } = renderWithTheme(
      <Card style={{ marginTop: '10px' }}>Styled card</Card>
    );
    expect(screen.getByText(/styled card/i)).toBeInTheDocument();
  });

  it('renders hoverable card', () => {
    const { container } = renderWithTheme(
      <Card hoverable bordered>Hoverable card</Card>
    );
    expect(screen.getByText(/hoverable card/i)).toBeInTheDocument();
  });

  it('glass variant is accessible', async () => {
    const { container } = renderWithTheme(
      <Card variant="glass" title="Glass Card">
        Glass content
      </Card>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
