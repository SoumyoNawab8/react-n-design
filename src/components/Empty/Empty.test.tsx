import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Empty } from './Empty';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Empty', () => {
  it('renders with default description and is accessible', async () => {
    const { container } = renderWithTheme(<Empty />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders with custom description', () => {
    renderWithTheme(<Empty description="No results found" />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    expect(screen.queryByText(/no data/i)).not.toBeInTheDocument();
  });

  it('renders with custom description as React node', () => {
    renderWithTheme(
      <Empty description={<span data-testid="custom-desc">Custom Description</span>} />
    );
    expect(screen.getByTestId('custom-desc')).toBeInTheDocument();
    expect(screen.getByText(/custom description/i)).toBeInTheDocument();
  });

  it('renders with custom image', () => {
    renderWithTheme(
      <Empty image={<img src="/custom-image.png" alt="Custom" data-testid="custom-image" />} />
    );
    expect(screen.getByTestId('custom-image')).toBeInTheDocument();
    expect(screen.getByAltText(/custom/i)).toBeInTheDocument();
  });

  it('renders default image when no custom image provided', () => {
    const { container } = renderWithTheme(<Empty />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('renders children content', () => {
    renderWithTheme(
      <Empty description="No data">
        <button type="button" data-testid="action-btn">
          Create Item
        </button>
      </Empty>
    );
    expect(screen.getByTestId('action-btn')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create item/i })).toBeInTheDocument();
  });

  it('renders with empty string description', () => {
    const { container } = renderWithTheme(<Empty description="" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies correct wrapper styles', () => {
    const { container } = renderWithTheme(<Empty />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    });
  });

  it('renders with complex children', () => {
    renderWithTheme(
      <Empty description="No items available">
        <div data-testid="actions">
          <button type="button">Refresh</button>
          <button type="button">Add New</button>
        </div>
      </Empty>
    );
    expect(screen.getByTestId('actions')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('renders with HTML description', () => {
    renderWithTheme(
      <Empty
        description={
          <span data-testid="html-desc">
            <strong>Bold</strong> Description
          </span>
        }
      />
    );
    expect(screen.getByTestId('html-desc')).toBeInTheDocument();
    expect(screen.getByText(/bold/i)).toBeInTheDocument();
  });
});
