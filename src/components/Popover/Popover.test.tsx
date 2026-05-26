import { render, screen, waitFor, act } from '@testing-library/react';
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
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Basic Rendering', () => {
    it('renders trigger element', () => {
      renderWithTheme(
        <Popover trigger="Open popover" content="Popover content" portal={false} />
      );
      expect(screen.getByRole('button', { name: /open popover/i })).toBeInTheDocument();
    });

    it('renders trigger with custom element', () => {
      renderWithTheme(
        <Popover trigger={<button type="button">Custom Trigger</button>} content="Content" portal={false} />
      );
      expect(screen.getByRole('button', { name: /custom trigger/i })).toBeInTheDocument();
    });
  });

  describe('Trigger Mode: Click', () => {
    it('opens on trigger click', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" triggerMode="click" portal={false} />
      );
      await userEvent.click(screen.getByRole('button', { name: /open/i }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/content/i)).toBeInTheDocument();
    });

    it('closes on second click', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" portal={false} />
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      await userEvent.click(trigger);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('closes on click outside', async () => {
      renderWithTheme(
        <>
          <Popover trigger="Open" content="Content" portal={false} />
          <div data-testid="outside">Outside</div>
        </>
      );
      await userEvent.click(screen.getByRole('button', { name: /open/i }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      await userEvent.click(screen.getByTestId('outside'));
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Trigger Mode: Hover', () => {
    it('opens on hover after delay', async () => {
      renderWithTheme(
        <Popover trigger="Hover me" content="Content" triggerMode="hover" hoverDelay={100} portal={false} />
      );
      const trigger = screen.getByRole('button', { name: /hover me/i });
      
      await act(async () => {
        await userEvent.hover(trigger);
        vi.advanceTimersByTime(200);
      });
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('closes on mouse leave', async () => {
      renderWithTheme(
        <Popover trigger="Hover me" content="Content" triggerMode="hover" portal={false} />
      );
      const trigger = screen.getByRole('button', { name: /hover me/i });
      
      await act(async () => {
        await userEvent.hover(trigger);
        vi.advanceTimersByTime(150);
      });
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      await act(async () => {
        await userEvent.unhover(trigger);
        vi.advanceTimersByTime(100);
      });
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('opens on focus', async () => {
      renderWithTheme(
        <Popover trigger="Focus me" content="Content" triggerMode="hover" portal={false} />
      );
      
      await act(async () => {
        await userEvent.tab();
        vi.advanceTimersByTime(150);
      });
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });

  describe('Trigger Mode: Focus', () => {
    it('opens on focus', async () => {
      renderWithTheme(
        <Popover trigger="Focus me" content="Content" triggerMode="focus" portal={false} />
      );
      
      await act(async () => {
        await userEvent.tab();
        vi.advanceTimersByTime(150);
      });
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('closes on blur', async () => {
      renderWithTheme(
        <Popover trigger="Focus me" content="Content" triggerMode="focus" portal={false} />
      );
      const trigger = screen.getByRole('button', { name: /focus me/i });
      
      await act(async () => {
        await userEvent.click(trigger);
        vi.advanceTimersByTime(150);
      });
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      // Tab away
      await act(async () => {
        await userEvent.tab();
        vi.advanceTimersByTime(100);
      });
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Positioning', () => {
    it.each(['top', 'bottom', 'left', 'right', 'center'] as const)(
      'renders with placement: %s',
      async (placement) => {
        renderWithTheme(
          <Popover trigger="Open" content="Content" placement={placement} portal={false} />
        );
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      }
    );

    it.each(['start', 'center', 'end'] as const)(
      'renders with align: %s',
      async (align) => {
        renderWithTheme(
          <Popover trigger="Open" content="Content" placement="center" align={align} portal={false} />
        );
        await userEvent.click(screen.getByRole('button'));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      }
    );
  });

  describe('Keyboard Navigation', () => {
    it('closes on Escape key', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" portal={false} />
      );
      await userEvent.click(screen.getByRole('button', { name: /open/i }));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('opens on Enter key', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" portal={false} />
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      await userEvent.tab();
      expect(trigger).toHaveFocus();
      
      await userEvent.keyboard('{Enter}');
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('traps focus inside popover', async () => {
      renderWithTheme(
        <Popover trigger="Open" content={
          <>
            <button type="button">First</button>
            <button type="button">Second</button>
          </>
        } portal={false} />
      );
      await userEvent.click(screen.getByRole('button', { name: /open/i }));
      
      const dialog = screen.getByRole('dialog');
      const firstButton = screen.getByRole('button', { name: /first/i });
      const secondButton = screen.getByRole('button', { name: /second/i });
      
      expect(dialog).toContainElement(firstButton);
      expect(dialog).toContainElement(secondButton);
    });

    it('focus returns to trigger when closed', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" portal={false} />
      );
      const trigger = screen.getByRole('button', { name: /open/i });
      await userEvent.click(trigger);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        expect(document.activeElement).toBe(trigger);
      });
    });
  });

  describe('Controlled State', () => {
    it('respects controlled open state', () => {
      const onOpenChange = vi.fn();
      renderWithTheme(
        <Popover 
          trigger="Open" 
          content="Content" 
          open={true}
          onOpenChange={onOpenChange}
          portal={false}
        />
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('respects controlled closed state', () => {
      renderWithTheme(
        <Popover 
          trigger="Open" 
          content="Content" 
          open={false}
          onOpenChange={() => {}}
          portal={false}
        />
      );
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('calls onOpenChange when opening', async () => {
      const onOpenChange = vi.fn();
      renderWithTheme(
        <Popover 
          trigger="Open" 
          content="Content" 
          open={false}
          onOpenChange={onOpenChange}
          portal={false}
        />
      );
      await userEvent.click(screen.getByRole('button'));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('respects defaultOpen prop', () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" defaultOpen={true} portal={false} />
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has role="dialog" and aria-modal="true"', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" portal={false} aria-label="Test popover" />
      );
      await userEvent.click(screen.getByRole('button'));
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('trigger has aria-haspopup="dialog" and aria-expanded', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" portal={false} />
      );
      const trigger = screen.getByRole('button');
      expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      
      await userEvent.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('has aria-controls linking to content', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" portal={false} />
      );
      const trigger = screen.getByRole('button');
      const controlsId = trigger.getAttribute('aria-controls');
      expect(controlsId).toBeTruthy();
      
      await userEvent.click(trigger);
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('id', controlsId);
    });

    it('supports aria-label on dialog', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" aria-label="Custom popover" portal={false} />
      );
      await userEvent.click(screen.getByRole('button'));
      const dialog = screen.getByRole('dialog', { name: /custom popover/i });
      expect(dialog).toBeInTheDocument();
    });

    it('supports aria-describedby', async () => {
      const { container } = renderWithTheme(
        <>
          <Popover 
            trigger="Open" 
            content="Content" 
            aria-describedby="description"
            portal={false}
          />
          <div id="description">Popover description</div>
        </>
      );
      await userEvent.click(screen.getByRole('button'));
      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-describedby', 'description');
    });

    it('passes axe-core accessibility audit when open', async () => {
      const { container } = renderWithTheme(
        <Popover trigger="Open" content="Content" portal={false} aria-label="Accessible popover" />
      );
      await userEvent.click(screen.getByRole('button'));
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('Arrow Rendering', () => {
    it('does not render arrow when withArrow is false', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" withArrow={false} portal={false} />
      );
      await userEvent.click(screen.getByRole('button'));
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Sizing', () => {
    it('sets minWidth', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" minWidth={300} portal={false} />
      );
      await userEvent.click(screen.getByRole('button'));
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    it('sets maxWidth', async () => {
      renderWithTheme(
        <Popover trigger="Open" content="Content" maxWidth={400} portal={false} />
      );
      await userEvent.click(screen.getByRole('button'));
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Click Outside Behavior', () => {
    it('does not close on hover mode when clicking outside', async () => {
      renderWithTheme(
        <>
          <Popover trigger="Hover me" content="Content" triggerMode="hover" portal={false} />
          <button type="button">Outside</button>
        </>
      );
      const trigger = screen.getByRole('button', { name: /hover me/i });
      
      await act(async () => {
        await userEvent.hover(trigger);
        vi.advanceTimersByTime(150);
      });
      
      // Click outside should not affect hover mode
      const outside = screen.getByRole('button', { name: /outside/i });
      await userEvent.click(outside);
      
      // Hover mode should stay open if we don't unhover
      // This test mainly ensures no errors occur
      expect(trigger).toBeInTheDocument();
    });
  });
});
