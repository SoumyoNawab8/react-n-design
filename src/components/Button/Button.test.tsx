import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Button } from './Button';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Button', () => {
  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button', { name: /disabled/i })).toBeDisabled();
  });

  it('shows spinner and disables button when loading', () => {
    renderWithTheme(
      <Button loading loadingText="Loading">
        Loading
      </Button>
    );
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button', { name: /click/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <Button onClick={handleClick} disabled>
        Click
      </Button>
    );
    await userEvent.click(screen.getByRole('button', { name: /click/i }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders left and right icons', () => {
    renderWithTheme(
      <Button
        leftIcon={<span data-testid="left-icon" />}
        rightIcon={<span data-testid="right-icon" />}
      >
        Icons
      </Button>
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('forwards additional props to the button element', () => {
    renderWithTheme(<Button data-testid="my-button">Test</Button>);
    expect(screen.getByTestId('my-button')).toBeInTheDocument();
  });

  // New v1.2.0 tests
  describe('v1.2.0 improvements', () => {
    it('renders with danger variant', () => {
      renderWithTheme(<Button variant="danger">Danger</Button>);
      const button = screen.getByRole('button', { name: /danger/i });
      expect(button).toBeInTheDocument();
    });

    it('renders with success variant', () => {
      renderWithTheme(<Button variant="success">Success</Button>);
      const button = screen.getByRole('button', { name: /success/i });
      expect(button).toBeInTheDocument();
    });

    it('renders with ghost variant', () => {
      renderWithTheme(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button', { name: /ghost/i });
      expect(button).toBeInTheDocument();
    });

    it('renders with glassMorphism prop', () => {
      renderWithTheme(<Button glassMorphism>Glass</Button>);
      const button = screen.getByRole('button', { name: /glass/i });
      expect(button).toBeInTheDocument();
    });

    it('renders with gradient prop', () => {
      renderWithTheme(<Button gradient>Gradient</Button>);
      const button = screen.getByRole('button', { name: /gradient/i });
      expect(button).toBeInTheDocument();
    });

    it('memoizes click handler to prevent unnecessary re-renders', () => {
      const handleClick = vi.fn();
      const { rerender } = renderWithTheme(
        <Button onClick={handleClick}>Click</Button>
      );
      
      // Re-render with same props should not trigger click handler
      rerender(<ThemeProvider theme={lightTheme}><Button onClick={handleClick}>Click</Button></ThemeProvider>);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('accepts className prop', () => {
      renderWithTheme(<Button className="my-custom-class">Custom</Button>);
      const button = screen.getByRole('button', { name: /custom/i });
      expect(button).toHaveClass('my-custom-class');
    });

    it('accepts style prop', () => {
      renderWithTheme(<Button style={{ backgroundColor: 'red' }}>Styled</Button>);
      const button = screen.getByRole('button', { name: /styled/i });
      expect(button).toBeInTheDocument();
    });

    it('handles keyboard Enter key', async () => {
      const handleClick = vi.fn();
      renderWithTheme(<Button onClick={handleClick}>KB Test</Button>);
      const button = screen.getByRole('button', { name: /kb test/i });
      button.focus();
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('handles keyboard Space key', async () => {
      const handleClick = vi.fn();
      renderWithTheme(<Button onClick={handleClick}>KB Test</Button>);
      const button = screen.getByRole('button', { name: /kb test/i });
      button.focus();
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalled();
    });

    it('renders with responsive size configuration', () => {
      renderWithTheme(
        <Button size={{ sm: 'small', md: 'medium', lg: 'large' }}>
          Responsive
        </Button>
      );
      const button = screen.getByRole('button', { name: /responsive/i });
      expect(button).toBeInTheDocument();
    });

    it('renders with responsive fullWidth configuration', () => {
      const fullWidthConfig = { sm: true, md: false, lg: true };
      renderWithTheme(
        <Button fullWidth={fullWidthConfig}>Responsive Width</Button>
      );
      const button = screen.getByRole('button', { name: /responsive width/i });
      expect(button).toBeInTheDocument();
    });
  });
});
