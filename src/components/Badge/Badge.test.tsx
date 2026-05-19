import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Badge } from './Badge';
import axe from 'axe-core';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Badge', () => {
  it('renders count and is accessible', async () => {
    const { container } = renderWithTheme(<Badge count={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders as a dot', () => {
    const { container } = renderWithTheme(<Badge dot />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with children', () => {
    renderWithTheme(
      <Badge count={3}>
        <span data-testid="badge-child">Inbox</span>
      </Badge>
    );
    expect(screen.getByTestId('badge-child')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows overflow count when exceeded', () => {
    renderWithTheme(<Badge count={150} overflowCount={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });
});
