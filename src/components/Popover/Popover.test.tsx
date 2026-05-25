import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Popover } from './Popover';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Popover', () => {
  it('renders trigger element', () => {
    renderWithTheme(
      <Popover trigger="Open popover">
        <div>Popover content</div>
      </Popover>
    );
    expect(screen.getByRole('button', { name: /open popover/i })).toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    renderWithTheme(
      <Popover trigger="Open popover">
        <div>Popover content</div>
      </Popover>
    );
    await userEvent.click(screen.getByRole('button', { name: /open popover/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/popover content/i)).toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    renderWithTheme(
      <Popover trigger="Open popover">
        <div>Popover content</div>
      </Popover>
    );
    await userEvent.click(screen.getByRole('button', { name: /open popover/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes on click outside the popover', async () => {
    renderWithTheme(
      <>
        <Popover trigger="Open popover">
          <div>Popover content</div>
        </Popover>
        <div data-testid="outside">Outside</div>
      </>
    );
    await userEvent.click(screen.getByRole('button', { name: /open popover/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('outside'));
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('focus is trapped inside the popover when open', async () => {
    renderWithTheme(
      <>
        <button type="button">Outside button</button>
        <Popover trigger="Open popover">
          <button type="button">Inside button</button>
        </Popover>
      </>
    );
    await userEvent.click(screen.getByRole('button', { name: /open popover/i }));
    const dialog = screen.getByRole('dialog');
    const insideButton = screen.getByRole('button', { name: /inside button/i });
    const outsideButton = screen.getByRole('button', { name: /outside button/i });

    insideButton.focus();
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    document.dispatchEvent(tabEvent);

    // Focus should not have moved to the outside button
    expect(document.activeElement).not.toBe(outsideButton);
    expect(dialog).toContainElement(document.activeElement);
  });

  it('focus returns to trigger when closed', async () => {
    renderWithTheme(
      <Popover trigger="Open popover">
        <div>Popover content</div>
      </Popover>
    );
    const trigger = screen.getByRole('button', { name: /open popover/i });
    await userEvent.click(trigger);
    await userEvent.keyboard('{Escape}');
    await waitFor(() => {
      expect(document.activeElement).toBe(trigger);
    });
  });

  it('renders children inside the popover', async () => {
    renderWithTheme(
      <Popover trigger="Open popover">
        <div data-testid="popover-child">Unique child content</div>
      </Popover>
    );
    await userEvent.click(screen.getByRole('button', { name: /open popover/i }));
    expect(screen.getByTestId('popover-child')).toBeInTheDocument();
  });

  it('has role="dialog" and appropriate ARIA', async () => {
    renderWithTheme(
      <Popover trigger="Open popover">
        <div>Popover content</div>
      </Popover>
    );
    await userEvent.click(screen.getByRole('button', { name: /open popover/i }));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(
      <Popover trigger="Open popover">
        <div>Popover content</div>
      </Popover>
    );
    await userEvent.click(screen.getByRole('button', { name: /open popover/i }));
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('respects controlled open state', async () => {
    const onOpenChange = vi.fn();
    renderWithTheme(
      <Popover trigger={<button type="button">Open popover</button>} open={true} onOpenChange={onOpenChange}>
        <div>Popover content</div>
      </Popover>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('respects defaultOpen prop', () => {
    renderWithTheme(
      <Popover trigger={<button type="button">Open popover</button>} defaultOpen={true}>
        <div>Popover content</div>
      </Popover>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
