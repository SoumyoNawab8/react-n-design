'use client';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { VirtualListContainer, VirtualListContent, VirtualListItem } from './VirtualList.styles';

export interface StickyHeader {
  index: number;
  height: number;
}

export interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  containerHeight?: number;
  overscan?: number;
  stickyHeaders?: StickyHeader[];
  onScroll?: (scrollTop: number) => void;
}

/**
 * A high-performance virtual list that renders only visible items.
 * Supports sticky headers, overscan buffers, and neumorphic container styling.
 */
export const VirtualList = <T,>({
  items,
  itemHeight,
  renderItem,
  containerHeight = 400,
  overscan = 3,
  stickyHeaders,
  onScroll,
}: VirtualListProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(containerHeight / itemHeight);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));
  const endIndex = Math.min(startIndex + visibleCount + overscan, items.length);

  const sortedStickies = useMemo(() => {
    if (!stickyHeaders) return [];
    return [...stickyHeaders].sort((a, b) => a.index - b.index);
  }, [stickyHeaders]);

  const stickyTops = useMemo(() => {
    const map = new Map<number, number>();
    for (const sticky of sortedStickies) {
      const naturalTop = sticky.index * itemHeight;
      let top = Math.max(naturalTop, scrollTop);

      for (const prev of sortedStickies) {
        if (prev.index >= sticky.index) break;
        const prevTop = map.get(prev.index) ?? prev.index * itemHeight;
        top = Math.max(top, prevTop + prev.height);
      }

      const nextSticky = sortedStickies.find((s) => s.index > sticky.index);
      if (nextSticky) {
        top = Math.min(top, nextSticky.index * itemHeight - sticky.height);
      }

      map.set(sticky.index, top);
    }
    return map;
  }, [sortedStickies, scrollTop, itemHeight]);

  const visibleIndices = useMemo(() => {
    const set = new Set<number>();
    for (let i = startIndex; i < endIndex; i++) {
      set.add(i);
    }

    // Ensure sticky headers that are stuck or near the viewport are rendered
    for (const sticky of sortedStickies) {
      const top = stickyTops.get(sticky.index) ?? sticky.index * itemHeight;
      const isVisible = top < scrollTop + containerHeight && top + sticky.height > scrollTop;
      if (isVisible) {
        set.add(sticky.index);
      }
    }

    return Array.from(set).sort((a, b) => a - b);
  }, [startIndex, endIndex, sortedStickies, stickyTops, scrollTop, containerHeight, itemHeight]);

  const handleScroll = useCallback(() => {
    const currentScrollTop = containerRef.current?.scrollTop ?? 0;
    setScrollTop(currentScrollTop);
    onScroll?.(currentScrollTop);
  }, [onScroll]);

  // Reset scroll position when items change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    setScrollTop(0);
  }, []);

  return (
    <VirtualListContainer
      ref={containerRef}
      $height={containerHeight}
      onScroll={handleScroll}
      role="list"
      aria-label="Virtual list"
    >
      <VirtualListContent $totalHeight={totalHeight}>
        {visibleIndices.map((index) => {
          const sticky = sortedStickies.find((s) => s.index === index);
          const top = stickyTops.get(index) ?? index * itemHeight;
          const height = sticky ? sticky.height : itemHeight;

          return (
            <VirtualListItem
              key={index}
              $top={top}
              $height={height}
              $isSticky={!!sticky}
              role="listitem"
              aria-setsize={items.length}
              aria-posinset={index + 1}
            >
              {renderItem(items[index], index)}
            </VirtualListItem>
          );
        })}
      </VirtualListContent>
    </VirtualListContainer>
  );
};
