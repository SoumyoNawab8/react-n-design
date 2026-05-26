import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { CopyButton } from './CopyButton';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('CopyButton', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    // Mock execCommand for fallback
    Object.defineProperty(document, 'execCommand', {
      value: vi.fn().mockReturnValue(true),
      writable: true,
      configurable: true,
    });

    // Mock isSecureContext
    Object.defineProperty(window, 'isSecureContext', {
      value: true,
      writable: true,
      configurable: true,
    });
  });

  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(<CopyButton text="Test text" />);
    expect(screen.getByRole('button', { name: /copy to clipboard/i })).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders with default copy icon', () => {
    renderWithTheme(<CopyButton text="Test text" />);
    const button = screen.getByTestId('copy-button');
    expect(button).toBeInTheDocument();
  });

  it('calls onCopySuccess callback after successful copy', async () => {
    const user = userEvent.setup();
    const onCopySuccess = vi.fn();
    renderWithTheme(<CopyButton text="Test text to copy" onCopySuccess={onCopySuccess} />);

    const button = screen.getByRole('button', { name: /copy to clipboard/i });
    await user.click(button);

    await waitFor(() => {
      expect(onCopySuccess).toHaveBeenCalledWith('Test text to copy');
    });
  }),
    it('calls onCopySuccess callback with copied text', async () => {
      const user = userEvent.setup();
      const onCopySuccess = vi.fn();
      renderWithTheme(<CopyButton text="Test" onCopySuccess={onCopySuccess} />);

      const button = screen.getByRole('button', { name: /copy to clipboard/i });
      await user.click(button);

      await waitFor(() => {
        expect(onCopySuccess).toHaveBeenCalledTimes(1);
      });
      expect(onCopySuccess).toHaveBeenCalledWith('Test');
    });

  it('shows success state after clicking', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CopyButton text="Test" />);

    const button = screen.getByRole('button', { name: /copy to clipboard/i });
    await user.click(button);

    // After click, the tooltip should show "Copied!"
    await waitFor(() => {
      expect(screen.getByText('Copied!')).toBeInTheDocument();
    });
  });

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<CopyButton text="Test" disabled />);
    expect(screen.getByRole('button', { name: /copy to clipboard/i })).toBeDisabled();
  });

  it('renders in small size', () => {
    renderWithTheme(<CopyButton text="Test" size="sm" />);
    const button = screen.getByTestId('copy-button');
    expect(button).toBeInTheDocument();
  });

  it('renders in medium size', () => {
    renderWithTheme(<CopyButton text="Test" size="md" />);
    const button = screen.getByTestId('copy-button');
    expect(button).toBeInTheDocument();
  });

  it('renders in large size', () => {
    renderWithTheme(<CopyButton text="Test" size="lg" />);
    const button = screen.getByTestId('copy-button');
    expect(button).toBeInTheDocument();
  });

  it('has correct ARIA attributes for accessibility', () => {
    renderWithTheme(<CopyButton text="Test" aria-label="Copy code snippet" />);
    const button = screen.getByRole('button', { name: /copy code snippet/i });
    expect(button).toHaveAttribute('aria-live', 'polite');
  });

  it('renders with custom copy icon', () => {
    renderWithTheme(
      <CopyButton text="Test" copyIcon={<span data-testid="custom-copy">Copy</span>} />
    );
    expect(screen.getByTestId('custom-copy')).toBeInTheDocument();
  });

  it('renders with custom success icon and triggers success state', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <CopyButton
        text="Test"
        successTooltipLabel="Success!"
        successIcon={<span data-testid="custom-success">Done</span>}
      />
    );

    const button = screen.getByRole('button', { name: /copy to clipboard/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('Success!')).toBeInTheDocument();
    });
  });

  it('auto-detects text from targetRef when text prop is not provided', async () => {
    const user = userEvent.setup();
    const onCopySuccess = vi.fn();

    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null);
      return (
        <>
          <div ref={ref}>Auto-detected text</div>
          <CopyButton targetRef={ref} onCopySuccess={onCopySuccess} />
        </>
      );
    }

    renderWithTheme(<TestComponent />);
    const button = screen.getByRole('button', { name: /copy to clipboard/i });
    await user.click(button);

    await waitFor(() => {
      expect(onCopySuccess).toHaveBeenCalledWith('Auto-detected text');
    });
  });

  it('uses fallback execCommand for non-secure context', async () => {
    const user = userEvent.setup();
    const execCommandSpy = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, 'execCommand', {
      value: execCommandSpy,
      writable: true,
      configurable: true,
    });

    Object.defineProperty(window, 'isSecureContext', {
      value: false,
      writable: true,
      configurable: true,
    });

    renderWithTheme(<CopyButton text="Test" />);
    const button = screen.getByRole('button', { name: /copy to clipboard/i });
    await user.click(button);

    await waitFor(() => {
      expect(execCommandSpy).toHaveBeenCalledWith('copy');
    });
  });
});
