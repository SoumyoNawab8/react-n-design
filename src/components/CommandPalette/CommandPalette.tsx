'use client';
import { AnimatePresence } from 'framer-motion';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { saveFocus, trapFocus } from '../../utils/focus';
import {
  CommandPaletteEmpty,
  CommandPaletteInput,
  CommandPaletteInputWrapper,
  CommandPaletteItem,
  CommandPaletteItemLabel,
  CommandPaletteItemShortcut,
  CommandPaletteList,
  CommandPaletteOverlay,
  CommandPaletteWrapper,
} from './CommandPalette.styles';

export interface CommandPaletteItemDef {
  id: string;
  label: string;
  shortcut?: string;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandPaletteItemDef[];
  placeholder?: string;
}

function fuzzyMatch(query: string, text: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

/**
 * A Cmd+K spotlight-style command palette with fuzzy search,
 * keyboard navigation, and accessible focus management.
 */
export const CommandPalette = ({
  open,
  onClose,
  items,
  placeholder = 'Search commands...',
}: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<(() => void) | null>(null);
  const itemRefs = useRef<HTMLLIElement[]>([]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((item) => fuzzyMatch(query, item.label));
  }, [query, items]);

  // Reset state when opening
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      restoreFocusRef.current = saveFocus();
      inputRef.current?.focus();
    } else {
      restoreFocusRef.current?.();
    }
  }, [open]);

  // Clamp selected index when filtered items change
  useEffect(() => {
    setSelectedIndex((prev) => {
      if (filteredItems.length === 0) return 0;
      return Math.min(prev, filteredItems.length - 1);
    });
  }, [filteredItems.length]);

  // Scroll selected item into view
  useEffect(() => {
    const item = itemRefs.current[selectedIndex];
    if (item && typeof item.scrollIntoView === 'function') {
      item.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Global Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!open) {
          // We can't open it from here because we don't have an onOpen prop.
          // Consumers should handle their own Cmd+K toggle.
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const handleSelect = useCallback(
    (index: number) => {
      const item = filteredItems[index];
      if (item) {
        item.onSelect();
        onClose();
      }
    },
    [filteredItems, onClose]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          if (filteredItems.length === 0) return 0;
          return (prev + 1) % filteredItems.length;
        });
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          if (filteredItems.length === 0) return 0;
          return (prev - 1 + filteredItems.length) % filteredItems.length;
        });
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        handleSelect(selectedIndex);
        return;
      }

      // Focus trap
      if (wrapperRef.current) {
        trapFocus(wrapperRef.current, e as unknown as KeyboardEvent);
      }
    },
    [filteredItems.length, onClose, handleSelect, selectedIndex]
  );

  const handleItemClick = useCallback(
    (index: number) => {
      handleSelect(index);
    },
    [handleSelect]
  );

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <CommandPaletteOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={handleBackdropClick}
        >
          <CommandPaletteWrapper
            ref={wrapperRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            <CommandPaletteInputWrapper>
              <FaSearch aria-hidden="true" />
              <CommandPaletteInput
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                aria-label="Search commands"
                aria-autocomplete="list"
                aria-controls="command-palette-list"
                aria-activedescendant={
                  filteredItems.length > 0
                    ? `command-item-${filteredItems[selectedIndex]?.id}`
                    : undefined
                }
              />
            </CommandPaletteInputWrapper>

            <CommandPaletteList
              ref={listRef}
              id="command-palette-list"
              role="listbox"
              aria-label="Command results"
            >
              {filteredItems.length === 0 ? (
                <CommandPaletteEmpty role="status">No results found</CommandPaletteEmpty>
              ) : (
                filteredItems.map((item, index) => (
                  <CommandPaletteItem
                    key={item.id}
                    ref={(el) => {
                      if (el) itemRefs.current[index] = el;
                    }}
                    id={`command-item-${item.id}`}
                    role="option"
                    aria-selected={index === selectedIndex}
                    isSelected={index === selectedIndex}
                    onClick={() => handleItemClick(index)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <CommandPaletteItemLabel>{item.label}</CommandPaletteItemLabel>
                    {item.shortcut && (
                      <CommandPaletteItemShortcut>{item.shortcut}</CommandPaletteItemShortcut>
                    )}
                  </CommandPaletteItem>
                ))
              )}
            </CommandPaletteList>
          </CommandPaletteWrapper>
        </CommandPaletteOverlay>
      )}
    </AnimatePresence>
  );
};
