import { render, screen } from '@testing-library/react';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Stack } from './Stack';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Stack', () => {
  it('renders children', () => {
    renderWithTheme(
      <Stack>
        <div data-testid="child1">Item 1</div>
        <div data-testid="child2">Item 2</div>
      </Stack>
    );
    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
  });

  it('renders with default column direction', () => {
    renderWithTheme(
      <Stack data-testid="stack">
        <div>Item</div>
      </Stack>
    );
    expect(screen.getByTestId('stack')).toBeInTheDocument();
  });

  it('renders with row direction', () => {
    renderWithTheme(
      <Stack direction="row" data-testid="stack">
        <div>Item</div>
      </Stack>
    );
    expect(screen.getByTestId('stack')).toBeInTheDocument();
  });

  it('renders with custom gap', () => {
    renderWithTheme(
      <Stack gap={24} data-testid="stack">
        <div>Item</div>
      </Stack>
    );
    expect(screen.getByTestId('stack')).toBeInTheDocument();
  });

  it('renders with different align values', () => {
    const alignValues = ['start', 'center', 'end', 'stretch'];
    alignValues.forEach((align) => {
      const { unmount } = renderWithTheme(
        <Stack align={align as any}>
          <div data-testid="item">Item</div>
        </Stack>
      );
      expect(screen.getByTestId('item')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with different justify values', () => {
    const justifyValues = ['start', 'center', 'end', 'between', 'around'];
    justifyValues.forEach((justify) => {
      const { unmount } = renderWithTheme(
        <Stack justify={justify as any}>
          <div data-testid="item">Item</div>
        </Stack>
      );
      expect(screen.getByTestId('item')).toBeInTheDocument();
      unmount();
    });
  });

  it('renders with wrap enabled', () => {
    renderWithTheme(
      <Stack wrap data-testid="stack">
        <div>Item</div>
      </Stack>
    );
    expect(screen.getByTestId('stack')).toBeInTheDocument();
  });

  it('forwards additional props', () => {
    renderWithTheme(
      <Stack data-testid="my-stack" className="custom-class">
        <div>Item</div>
      </Stack>
    );
    const stack = screen.getByTestId('my-stack');
    expect(stack).toHaveClass('custom-class');
  });

  it('renders with all props combined', () => {
    renderWithTheme(
      <Stack direction="row" gap={32} align="center" justify="between" wrap>
        <div data-testid="item1">Item 1</div>
        <div data-testid="item2">Item 2</div>
      </Stack>
    );
    expect(screen.getByTestId('item1')).toBeInTheDocument();
    expect(screen.getByTestId('item2')).toBeInTheDocument();
  });

  it('renders single child', () => {
    renderWithTheme(
      <Stack>
        <span>Only Child</span>
      </Stack>
    );
    expect(screen.getByText('Only Child')).toBeInTheDocument();
  });

  it('renders children with fragment', () => {
    renderWithTheme(
      <Stack>
        {
          <>
            <span>First</span>
            <span>Second</span>
          </>
        }
      </Stack>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('accepts HTML attributes', () => {
    renderWithTheme(
      <Stack id="stack-id" aria-label="Stack container">
        <div>Item</div>
      </Stack>
    );
    expect(document.getElementById('stack-id')).toBeInTheDocument();
  });

  it('renders complex nested children', () => {
    renderWithTheme(
      <Stack>
        <div>
          <span>Nested</span>
          <span>Content</span>
        </div>
      </Stack>
    );
    expect(screen.getByText('Nested')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders no wrap by default', () => {
    renderWithTheme(
      <Stack direction="row" data-testid="stack">
        <div>Item</div>
      </Stack>
    );
    expect(screen.getByTestId('stack')).toBeInTheDocument();
  });
});
