import { render, screen } from '@testing-library/react';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Grid } from './Grid';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Grid', () => {
  it('renders children', () => {
    renderWithTheme(
      <Grid>
        <div data-testid="child1">Item 1</div>
        <div data-testid="child2">Item 2</div>
      </Grid>
    );
    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    renderWithTheme(
      <Grid data-testid="grid">
        <div>Item</div>
      </Grid>
    );
    const grid = screen.getByTestId('grid');
    expect(grid).toBeInTheDocument();
  });

  it('renders with custom columns', () => {
    renderWithTheme(
      <Grid columns={4} data-testid="grid">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });

  it('renders with custom gap', () => {
    renderWithTheme(
      <Grid gap={24} data-testid="grid">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });

  it('renders with responsive minChildWidth', () => {
    renderWithTheme(
      <Grid minChildWidth={200} data-testid="grid">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });

  it('forwards additional props', () => {
    renderWithTheme(
      <Grid data-testid="my-grid" className="custom-class">
        <div>Item</div>
      </Grid>
    );
    const grid = screen.getByTestId('my-grid');
    expect(grid).toHaveClass('custom-class');
  });

  it('renders with all props combined', () => {
    renderWithTheme(
      <Grid columns="repeat(auto-fit, minmax(200px, 1fr))" gap={32} minChildWidth={250}>
        <div data-testid="item">Grid Item</div>
      </Grid>
    );
    expect(screen.getByTestId('item')).toBeInTheDocument();
  });

  it('renders single child', () => {
    renderWithTheme(
      <Grid>
        <span>Only Child</span>
      </Grid>
    );
    expect(screen.getByText('Only Child')).toBeInTheDocument();
  });

  it('renders with number column prop', () => {
    renderWithTheme(
      <Grid columns={6}>
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('renders with string column prop', () => {
    renderWithTheme(
      <Grid columns="auto auto">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('accepts HTML attributes', () => {
    renderWithTheme(
      <Grid id="grid-id" aria-label="Grid layout">
        <div>Item</div>
      </Grid>
    );
    expect(document.getElementById('grid-id')).toBeInTheDocument();
  });

  it('renders complex nested children', () => {
    renderWithTheme(
      <Grid>
        <div>
          <span>Nested</span>
          <span>Content</span>
        </div>
      </Grid>
    );
    expect(screen.getByText('Nested')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});
