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
});
