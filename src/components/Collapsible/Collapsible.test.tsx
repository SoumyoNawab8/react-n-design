import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { describe, expect, it, vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Collapsible } from './Collapsible';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const _wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Collapsible', () => {
  // ========== Basic Rendering Tests ==========
  describe('basic rendering', () => {
    it('renders trigger and hidden content when closed', () => {
      renderWithTheme(
        <Collapsible trigger="Open">
          <div>Hidden content</div>
        </Collapsible>
      );
      expect(screen.getByRole('button', { name: /open/i })).toBeInTheDocument();
      const content = screen.getByText(/hidden content/i).closest('[aria-hidden]');
      expect(content).toHaveAttribute('aria-hidden', 'true');
    });

    it('respects defaultOpen prop', () => {
      renderWithTheme(
        <Collapsible trigger="Open" defaultOpen={true}>
          <div>Visible content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      const content = screen.getByText(/visible content/i).closest('[aria-hidden]');
      expect(content).toHaveAttribute('aria-hidden', 'false');
    });

    it('applies custom className to wrapper', () => {
      const { container } = renderWithTheme(
        <Collapsible trigger="Open" className="custom-class">
          <div>Content</div>
        </Collapsible>
      );
      const wrapper = container.querySelector('.custom-class');
      expect(wrapper).toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      renderWithTheme(
        <Collapsible trigger="Open" icon={<span data-testid="custom-icon">→</span>}>
          <div>Content</div>
        </Collapsible>
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  // ========== Interaction Tests ==========
  describe('interactions', () => {
    it('shows content when trigger is clicked', async () => {
      renderWithTheme(
        <Collapsible trigger="Open">
          <div>Hidden content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await userEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      const content = screen.getByText(/hidden content/i).closest('[aria-hidden]');
      expect(content).toHaveAttribute('aria-hidden', 'false');
    });

    it('hides content when trigger is clicked again', async () => {
      renderWithTheme(
        <Collapsible trigger="Open">
          <div>Hidden content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      await userEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      await userEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      const content = screen.getByText(/hidden content/i).closest('[aria-hidden]');
      expect(content).toHaveAttribute('aria-hidden', 'true');
    });

    it('toggles on Enter key press', async () => {
      renderWithTheme(
        <Collapsible trigger="Open">
          <div>Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'Enter', preventDefault: vi.fn() });
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('toggles on Space key press', async () => {
      renderWithTheme(
        <Collapsible trigger="Open">
          <div>Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      trigger.focus();
      fireEvent.keyDown(trigger, { key: ' ', preventDefault: vi.fn() });
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('does not toggle on other key presses', async () => {
      renderWithTheme(
        <Collapsible trigger="Open">
          <div>Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      trigger.focus();
      fireEvent.keyDown(trigger, { key: 'Escape' });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  // ========== Controlled Mode Tests ==========
  describe('controlled mode', () => {
    it('respects controlled open prop', () => {
      const onOpenChange = vi.fn();
      const { rerender } = renderWithTheme(
        <Collapsible trigger="Open" open={false} onOpenChange={onOpenChange}>
          <div>Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');

      rerender(
        <ThemeProvider theme={lightTheme}>
          <Collapsible trigger="Open" open={true} onOpenChange={onOpenChange}>
            <div>Content</div>
          </Collapsible>
        </ThemeProvider>
      );

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('calls onOpenChange when toggled', async () => {
      const onOpenChange = vi.fn();
      renderWithTheme(
        <Collapsible trigger="Open" onOpenChange={onOpenChange}>
          <div>Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      await userEvent.click(trigger);
      expect(onOpenChange).toHaveBeenCalledWith(true);
      await userEvent.click(trigger);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('does not update internal state in controlled mode', async () => {
      const onOpenChange = vi.fn();
      renderWithTheme(
        <Collapsible trigger="Open" open={false} onOpenChange={onOpenChange}>
          <div data-testid="content">Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      await userEvent.click(trigger);
      // Should still be closed since open prop is false
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });
  });

  // ========== unmountOnExit Tests ==========
  describe('unmountOnExit', () => {
    it('content is removed from DOM when closed', async () => {
      renderWithTheme(
        <Collapsible trigger="Open" unmountOnExit={true}>
          <div data-testid="collapsible-content">Hidden content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      expect(screen.queryByTestId('collapsible-content')).not.toBeInTheDocument();
      await userEvent.click(trigger);
      expect(screen.getByTestId('collapsible-content')).toBeInTheDocument();
      await userEvent.click(trigger);
      expect(screen.queryByTestId('collapsible-content')).not.toBeInTheDocument();
    });
  });

  // ========== Disabled Tests ==========
  describe('disabled state', () => {
    it('renders disabled trigger', () => {
      renderWithTheme(
        <Collapsible trigger="Open" disabled>
          <div>Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      expect(trigger).toBeDisabled();
      expect(trigger).toHaveAttribute('aria-disabled', 'true');
    });

    it('does not toggle when disabled', async () => {
      const onOpenChange = vi.fn();
      renderWithTheme(
        <Collapsible trigger="Open" disabled onOpenChange={onOpenChange}>
          <div data-testid="content">Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      await userEvent.click(trigger);
      fireEvent.keyDown(trigger, { key: 'Enter' });
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('has correct disabled focus behavior', () => {
      renderWithTheme(
        <Collapsible trigger="Open" disabled>
          <div>Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      expect(trigger).toHaveAttribute('tabIndex', '-1');
    });
  });

  // ========== Accessibility Tests ==========
  describe('accessibility', () => {
    it('trigger has aria-expanded and aria-controls', () => {
      renderWithTheme(
        <Collapsible trigger="Open">
          <div>Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-controls');
      const ariaControls = trigger.getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();
      const content = document.getElementById(ariaControls!);
      expect(content).toBeInTheDocument();
    });

    it('content has aria-hidden when closed', () => {
      renderWithTheme(
        <Collapsible trigger="Open">
          <div>Content</div>
        </Collapsible>
      );
      const content = screen.getByText(/content/i).closest('[aria-hidden]');
      expect(content).toHaveAttribute('aria-hidden', 'true');
    });

    it('content has aria-labelledby pointing to trigger', () => {
      renderWithTheme(
        <Collapsible trigger="Open">
          <div>Content</div>
        </Collapsible>
      );
      const content = screen.getByText(/content/i).closest('[role="region"]');
      const ariaLabelledBy = content?.getAttribute('aria-labelledby');
      expect(ariaLabelledBy).toBeTruthy();
      const trigger = document.getElementById(ariaLabelledBy!);
      expect(trigger).toHaveAttribute('aria-controls', content?.id);
    });

    it('content has correct ARIA role', () => {
      renderWithTheme(
        <Collapsible trigger="Open" open={true}>
          <div>Content</div>
        </Collapsible>
      );
      const content = screen.getByRole('region');
      expect(content).toBeInTheDocument();
    });

    it('provides unique IDs for multiple collapsibles', () => {
      renderWithTheme(
        <>
          <Collapsible trigger="First" open={true}>
            <div>Content 1</div>
          </Collapsible>
          <Collapsible trigger="Second" open={true}>
            <div>Content 2</div>
          </Collapsible>
        </>
      );
      const triggers = screen.getAllByRole('button');
      const contents = screen.getAllByRole('region');
      expect(triggers.length).toBe(2);
      expect(contents.length).toBe(2);
      const contentIds = contents.map((c) => c.id);
      expect(new Set(contentIds).size).toBe(2); // All IDs should be unique
    });

    it('trigger is focusable via keyboard', async () => {
      renderWithTheme(
        <Collapsible trigger="Open" open={true}>
          <div>Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button');
      trigger.focus();
      expect(document.activeElement).toBe(trigger);
    });
  });

  // ========== Custom Trigger Tests ==========
  describe('custom trigger', () => {
    it('renders custom trigger element', () => {
      renderWithTheme(
        <Collapsible trigger={<button data-testid="custom-trigger">Custom</button>}>
          <div>Content</div>
        </Collapsible>
      );
      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
    });

    it('merges custom trigger onClick with toggle', async () => {
      const customOnClick = vi.fn();
      const onOpenChange = vi.fn();
      renderWithTheme(
        <Collapsible
          trigger={
            <button data-testid="custom-trigger" onClick={customOnClick}>
              Custom
            </button>
          }
          onOpenChange={onOpenChange}
        >
          <div>Content</div>
        </Collapsible>
      );
      const trigger = screen.getByTestId('custom-trigger');
      await userEvent.click(trigger);
      expect(customOnClick).toHaveBeenCalled();
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('custom trigger preserves ARIA attributes', () => {
      renderWithTheme(
        <Collapsible trigger={<button>Custom</button>}>
          <div>Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button', { name: /custom/i });
      expect(trigger).toHaveAttribute('aria-expanded');
      expect(trigger).toHaveAttribute('aria-controls');
    });
  });

  // ========== data-testid Tests ==========
  describe('data-testid', () => {
    it('applies data-testid to trigger and content', () => {
      renderWithTheme(
        <Collapsible trigger="Open" data-testid="my-collapsible" open={true}>
          <div>Content</div>
        </Collapsible>
      );
      expect(screen.getByTestId('my-collapsible')).toBeInTheDocument();
      expect(screen.getByTestId('my-collapsible-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('my-collapsible-content')).toBeInTheDocument();
    });
  });

  // ========== Edge Cases ==========
  describe('edge cases', () => {
    it('handles empty children', () => {
      renderWithTheme(
        <Collapsible trigger="Open" open={true}>
          {null}
        </Collapsible>
      );
      const trigger = screen.getByRole('button');
      expect(trigger).toBeInTheDocument();
    });

    it('handles deeply nested content', async () => {
      renderWithTheme(
        <Collapsible trigger="Open">
          <div>
            <div>
              <div>
                <span>Deeply nested</span>
              </div>
            </div>
          </div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button');
      await userEvent.click(trigger);
      expect(screen.getByText(/deeply nested/i)).toBeInTheDocument();
    });

    it('handles rapid toggling', async () => {
      const onOpenChange = vi.fn();
      renderWithTheme(
        <Collapsible trigger="Open" onOpenChange={onOpenChange}>
          <div data-testid="content">Content</div>
        </Collapsible>
      );
      const trigger = screen.getByRole('button');
      // Rapid clicks
      await userEvent.click(trigger);
      await userEvent.click(trigger);
      await userEvent.click(trigger);
      // Should have called onOpenChange for each click
      expect(onOpenChange).toHaveBeenCalledTimes(3);
    });
  });

  // ========== Animation Tests ==========
  describe('animations', () => {
    it('applies transition props to content', () => {
      const { container } = renderWithTheme(
        <Collapsible trigger="Open" open={true}>
          <div>Content</div>
        </Collapsible>
      );
      const content = container.querySelector('[role="region"]');
      expect(content).toHaveAttribute('style');
    });
  });
});
