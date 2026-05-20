import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { VirtualList } from './VirtualList';
import axe from 'axe-core';
import { vi } from 'vitest';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const ITEMS = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

const DEFAULT_PROPS = {
  items: ITEMS,
  itemHeight: 40,
  containerHeight: 200,
  overscan: 2,
  renderItem: (item: string) => <div>{item}</div>,
};

describe('VirtualList', () => {
  it('renders container with list role', () => {
    renderWithTheme(<VirtualList {...DEFAULT_PROPS} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders only visible items within viewport + overscan', () => {
    renderWithTheme(<VirtualList {...DEFAULT_PROPS} />);
    // startIndex = 0, visibleCount = ceil(200/40) = 5, endIndex = 0 + 5 + 2 = 7
    // renders indices 0..6
    expect(screen.getByText('Item 0')).toBeInTheDocument();
    expect(screen.getByText('Item 6')).toBeInTheDocument();
    expect(screen.queryByText('Item 7')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 100')).not.toBeInTheDocument();
  });

  it('applies aria-setsize and aria-posinset to listitems', () => {
    renderWithTheme(<VirtualList {...DEFAULT_PROPS} />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveAttribute('aria-setsize', '1000');
    expect(items[0]).toHaveAttribute('aria-posinset', '1');
  });

  it('calls onScroll with scrollTop', () => {
    const handleScroll = vi.fn();
    renderWithTheme(<VirtualList {...DEFAULT_PROPS} onScroll={handleScroll} />);
    const container = screen.getByRole('list');

    fireEvent.scroll(container, { target: { scrollTop: 120 } });
    expect(handleScroll).toHaveBeenCalledWith(120);
  });

  it('updates visible items after scroll', () => {
    renderWithTheme(<VirtualList {...DEFAULT_PROPS} />);
    const container = screen.getByRole('list');

    fireEvent.scroll(container, { target: { scrollTop: 400 } });
    // startIndex = floor(400/40) = 10, visibleCount = 5, endIndex = 10 + 5 + 2 = 17
    // renders indices 10..16
    expect(screen.getByText('Item 10')).toBeInTheDocument();
    expect(screen.getByText('Item 16')).toBeInTheDocument();
    expect(screen.queryByText('Item 0')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 17')).not.toBeInTheDocument();
  });

  it('renders sticky headers within visible range', () => {
    const stickyHeaders = [
      { index: 0, height: 40 },
      { index: 5, height: 40 },
    ];
    renderWithTheme(
      <VirtualList {...DEFAULT_PROPS} stickyHeaders={stickyHeaders} />
    );
    // indices 0..6 rendered; sticky headers at 0 and 5 are both visible
    expect(screen.getByText('Item 0')).toBeInTheDocument();
    expect(screen.getByText('Item 5')).toBeInTheDocument();
  });

  it('resets scroll position when items change', () => {
    const { rerender } = renderWithTheme(
      <VirtualList {...DEFAULT_PROPS} />
    );
    const container = screen.getByRole('list');

    fireEvent.scroll(container, { target: { scrollTop: 500 } });
    expect(container.scrollTop).toBe(500);

    const newItems = Array.from({ length: 50 }, (_, i) => `New ${i}`);
    rerender(
      <ThemeProvider theme={lightTheme}>
        <VirtualList {...DEFAULT_PROPS} items={newItems} />
      </ThemeProvider>
    );

    expect(screen.getByRole('list').scrollTop).toBe(0);
    expect(screen.getByText('New 0')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<VirtualList {...DEFAULT_PROPS} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
