'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import {
  MenuWrapper,
  MenuTrigger,
  MenuDropdown,
  MenuItem,
  MenuDivider,
  MenuLabel,
} from './Menu.styles';

export interface MenuItemDef {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface MenuProps {
  trigger?: React.ReactNode;
  label?: string;
  items: (MenuItemDef | { type: 'divider' } | { type: 'label'; label: string })[];
  onSelect?: (key: string) => void;
  placement?: 'bottom-left' | 'bottom-right';
}

const isItem = (
  item: any
): item is MenuItemDef => item && typeof item.key === 'string';
const isDivider = (item: any): item is { type: 'divider' } => item?.type === 'divider';
const isLabel = (item: any): item is { type: 'label'; label: string } => item?.type === 'label';

export const Menu = ({
  trigger,
  label = 'Menu',
  items,
  onSelect,
  placement = 'bottom-left',
}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const enabledItems = items.filter((item) => isItem(item) && !item.disabled);
  const enabledIndices = items
    .map((item, i) => (isItem(item) && !item.disabled ? i : -1))
    .filter((i) => i >= 0);

  const close = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, close]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          setIsOpen(true);
          setActiveIndex(enabledIndices[0] ?? -1);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => {
            const idx = enabledIndices.indexOf(prev);
            const next = enabledIndices[idx + 1] ?? enabledIndices[0];
            return next ?? -1;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => {
            const idx = enabledIndices.indexOf(prev);
            const next =
              idx > 0 ? enabledIndices[idx - 1] : enabledIndices[enabledIndices.length - 1];
            return next ?? -1;
          });
          break;
        case 'Enter':
        case ' ': {
          e.preventDefault();
          const item = items[activeIndex];
          if (isItem(item) && !item.disabled) {
            item.onClick?.();
            onSelect?.(item.key);
            close();
          }
          break;
        }
        case 'Escape':
          e.preventDefault();
          close();
          break;
        case 'Tab':
          close();
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(enabledIndices[0] ?? -1);
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(enabledIndices[enabledIndices.length - 1] ?? -1);
          break;
      }
    },
    [isOpen, items, enabledIndices, activeIndex, onSelect, close]
  );

  const handleItemClick = (item: MenuItemDef) => {
    if (item.disabled) return;
    item.onClick?.();
    onSelect?.(item.key);
    close();
  };

  return (
    <MenuWrapper ref={wrapperRef}>
      <MenuTrigger
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={label}
        type="button"
      >
        {trigger ?? (
          <>
            {label}
            <FaChevronDown size={12} />
          </>
        )}
      </MenuTrigger>
      <AnimatePresence>
        {isOpen && (
          <MenuDropdown
            role="menu"
            aria-label={label}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={
              placement === 'bottom-right'
                ? { left: 'auto', right: 0 }
                : undefined
            }
          >
            {items.map((item, index) => {
              if (isDivider(item)) {
                return <MenuDivider key={`divider-${index}`} role="separator" />;
              }
              if (isLabel(item)) {
                return (
                  <MenuLabel key={`label-${index}`} role="presentation">
                    {item.label}
                  </MenuLabel>
                );
              }
              if (isItem(item)) {
                const isActive = index === activeIndex;
                return (
                  <MenuItem
                    key={item.key}
                    role="menuitem"
                    aria-disabled={item.disabled}
                    disabled={item.disabled}
                    active={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => handleItemClick(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onKeyDown={handleKeyDown}
                  >
                    {item.icon}
                    {item.label}
                  </MenuItem>
                );
              }
              return null;
            })}
          </MenuDropdown>
        )}
      </AnimatePresence>
    </MenuWrapper>
  );
};
