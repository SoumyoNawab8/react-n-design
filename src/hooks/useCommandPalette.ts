import { useState, useMemo, useCallback } from 'react';

function fuzzyMatch(text: string, query: string): boolean {
  if (!query) return true;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  let queryIndex = 0;
  for (let i = 0; i < lowerText.length; i++) {
    if (lowerText[i] === lowerQuery[queryIndex]) {
      queryIndex++;
      if (queryIndex === lowerQuery.length) {
        return true;
      }
    }
  }
  return queryIndex === lowerQuery.length;
}

function getItemText<T>(item: T, keys: string[]): string {
  if (typeof item === 'string') return item;
  const obj = item as any;
  for (const key of keys) {
    if (obj[key] != null) {
      return String(obj[key]);
    }
  }
  return String(item);
}

export interface UseCommandPaletteReturn<T> {
  filtered: T[];
  selectedIndex: number;
  query: string;
  setQuery: (q: string) => void;
  moveUp: () => void;
  moveDown: () => void;
  select: () => T | null;
}

export function useCommandPalette<T>(items: T[], keys: string[]): UseCommandPaletteReturn<T> {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((item) => fuzzyMatch(getItemText(item, keys), query));
  }, [items, keys, query]);

  const moveUp = useCallback(() => {
    setSelectedIndex((prev) => {
      if (filtered.length === 0) return 0;
      return prev <= 0 ? filtered.length - 1 : prev - 1;
    });
  }, [filtered.length]);

  const moveDown = useCallback(() => {
    setSelectedIndex((prev) => {
      if (filtered.length === 0) return 0;
      return prev >= filtered.length - 1 ? 0 : prev + 1;
    });
  }, [filtered.length]);

  const select = useCallback(() => {
    if (filtered.length === 0) return null;
    const index = Math.max(0, Math.min(selectedIndex, filtered.length - 1));
    return filtered[index];
  }, [filtered, selectedIndex]);

  return {
    filtered,
    selectedIndex,
    query,
    setQuery,
    moveUp,
    moveDown,
    select,
  };
}
