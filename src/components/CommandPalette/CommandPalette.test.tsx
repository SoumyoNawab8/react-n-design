import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { CommandPalette } from './CommandPalette';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const items = [
  { id: 'home', label: 'Go to Home', shortcut: '⌘H', onSelect: vi.fn() },
  { id: 'settings', label: 'Open Settings', shortcut: '⌘,', onSelect: vi.fn() },
  { id: 'search', label: 'Search files', shortcut: '⌘F', onSelect: vi.fn() },
  { id: 'theme', label: 'Toggle theme', shortcut: '⌘T', onSelect: vi.fn() },
];

const CommandPaletteWithTrigger = (
  props: Omit<React.ComponentProps<typeof CommandPalette>, 'open' | 'onClose'>
) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Open palette</button>
      <CommandPalette open={open} onClose={() => setOpen(false)} {...props} />
    </>
  );
};

describe('CommandPalette', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('1. renders closed by default (no visible dialog)', () => {
    renderWithTheme(<CommandPalette open={false} onClose={vi.fn()} items={items} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('2. opens when open prop is true or when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CommandPaletteWithTrigger items={items} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Open via trigger click
    await user.click(screen.getByRole('button', { name: /open palette/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('3. closes on Escape key', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithTheme(<CommandPalette open={true} onClose={onClose} items={items} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('4. closes on click outside the palette', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    renderWithTheme(<CommandPalette open={true} onClose={onClose} items={items} />);

    const overlay = screen.getByRole('dialog').parentElement;
    expect(overlay).toBeInTheDocument();

    if (!overlay) throw new Error('overlay not found');
    await user.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('5. filters results when typing in the search input', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CommandPalette open={true} onClose={vi.fn()} items={items} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'sett');

    await waitFor(() => {
      expect(screen.getByRole('option', { name: /open settings/i })).toBeInTheDocument();
    });

    expect(screen.queryByRole('option', { name: /go to home/i })).not.toBeInTheDocument();
  });

  it('6. shows "no results" message when search yields nothing', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CommandPalette open={true} onClose={vi.fn()} items={items} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'zzzzz');

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });

    expect(screen.queryAllByRole('option')).toHaveLength(0);
  });

  it('7. keyboard: ArrowDown navigates through results, ArrowUp cycles back', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CommandPalette open={true} onClose={vi.fn()} items={items} />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);
    expect(options[0]).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    });

    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getAllByRole('option')[2]).toHaveAttribute('aria-selected', 'true');
    });

    await user.keyboard('{ArrowUp}');
    await waitFor(() => {
      expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    });

    // cycle back to last from first
    await user.keyboard('{ArrowUp}');
    await user.keyboard('{ArrowUp}');
    await waitFor(() => {
      expect(screen.getAllByRole('option')[3]).toHaveAttribute('aria-selected', 'true');
    });
  });

  it('8. keyboard: Enter selects the highlighted result and calls onSelect', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const customItems = [
      { id: 'a', label: 'Item A', onSelect: vi.fn() },
      { id: 'b', label: 'Item B', onSelect: vi.fn() },
    ];
    renderWithTheme(<CommandPalette open={true} onClose={onClose} items={customItems} />);

    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');
    });

    await user.keyboard('{Enter}');
    expect(customItems[1].onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('9. keyboard: Tab traps focus inside the palette when open', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CommandPalette open={true} onClose={vi.fn()} items={items} />);

    const input = screen.getByRole('textbox');
    expect(document.activeElement).toBe(input);

    await user.keyboard('{Tab}');
    // Focus should remain inside the palette (on the input, since it's the only focusable element)
    expect(document.activeElement).toBe(input);

    await user.keyboard('{Shift>}{Tab}{/Shift}');
    expect(document.activeElement).toBe(input);
  });

  it('10. focus is on the search input when palette opens', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CommandPaletteWithTrigger items={items} />);

    await user.click(screen.getByRole('button', { name: /open palette/i }));

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveFocus();
    });
  });

  it('11. focus returns to trigger element when palette closes', async () => {
    const user = userEvent.setup();
    renderWithTheme(<CommandPaletteWithTrigger items={items} />);

    const trigger = screen.getByRole('button', { name: /open palette/i });
    await user.click(trigger);
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it('12. passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(
      <CommandPalette open={true} onClose={vi.fn()} items={items} />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
