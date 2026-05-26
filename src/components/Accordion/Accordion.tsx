'use client';
import type React from 'react';
import { useCallback, useRef, useState } from 'react';
import { FaChevronRight } from '../../icons';
import { AnimatePresence } from '../../utils/lazyMotion';
import {
  AccordionChevron,
  AccordionHeader,
  AccordionItem,
  AccordionLabel,
  AccordionPanel,
  AccordionWrapper,
} from './Accordion.styles';

export interface AccordionItemProps<T = string> {
  /**
   * Unique identifier for the accordion item
   */
  key: T;
  /**
   * The label displayed in the header
   */
  label: React.ReactNode;
  /**
   * The content displayed when the panel is expanded
   */
  children: React.ReactNode;
  /**
   * If `true`, the item cannot be expanded
   */
  disabled?: boolean;
  /**
   * Optional custom icon to replace the default chevron
   */
  icon?: React.ReactNode;
}

export interface AccordionProps<T = string> {
  /**
   * An array of accordion items to be rendered.
   */
  items: AccordionItemProps<T>[];
  /**
   * The key(s) of the initially active panel(s).
   */
  defaultActiveKey?: T | T[];
  /**
   * The key(s) of the currently active panel(s). If provided, the component is controlled.
   */
  activeKey?: T | T[];
  /**
   * Callback executed when the active panel(s) change.
   */
  onChange?: (key: T | T[]) => void;
  /**
   * If `true`, multiple panels can be open at once.
   * @default false
   */
  allowMultiple?: boolean;
  /**
   * If `false`, the borders between items will be hidden.
   * @default true
   */
  bordered?: boolean;
  /**
   * The custom class name for the wrapper
   */
  className?: string;
  /**
   * Optional data-testid for testing purposes
   */
  'data-testid'?: string;
}

/**
 * A vertically stacked set of interactive headers used to reveal or hide content.
 * Supports single or multiple panel expansion, keyboard navigation, and ARIA attributes.
 * 
 * @example
 * ```tsx
 * <Accordion
 *   items={[
 *     { key: '1', label: 'Section 1', children: 'Content 1' },
 *     { key: '2', label: 'Section 2', children: 'Content 2' },
 *   ]}
 * />
 * ```
 */
export const Accordion = <T extends string | number = string>({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  allowMultiple = false,
  bordered = true,
  className,
  'data-testid': dataTestId,
}: AccordionProps<T>) => {
  const [internalActiveKeys, setInternalActiveKeys] = useState<T[]>(() => {
    if (defaultActiveKey === undefined) return [];
    const keys = Array.isArray(defaultActiveKey) ? defaultActiveKey : [defaultActiveKey];
    return keys as T[];
  });

  const isControlled = controlledActiveKey !== undefined;
  const activeKeys = isControlled
    ? Array.isArray(controlledActiveKey)
      ? controlledActiveKey
      : [controlledActiveKey]
    : internalActiveKeys;

  const activeKeysSet = new Set(activeKeys);
  const headerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleHeaderClick = useCallback(
    (key: T) => {
      if (items.find(item => item.key === key)?.disabled) {
        return;
      }

      let newActiveKeys: T[];
      if (allowMultiple) {
        newActiveKeys = activeKeysSet.has(key)
          ? activeKeys.filter((k) => k !== key)
          : [...activeKeys, key];
      } else {
        newActiveKeys = activeKeysSet.has(key) ? [] : [key];
      }

      if (!isControlled) {
        setInternalActiveKeys(newActiveKeys);
      }
      onChange?.(allowMultiple ? newActiveKeys : newActiveKeys[0] as T || ('' as T));
    },
    [allowMultiple, activeKeys, activeKeysSet, isControlled, onChange, items]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const headers = headerRefs.current.filter(Boolean) as HTMLButtonElement[];
      const enabledIndices = items
        .map((item, idx) => ({ item, idx }))
        .filter(({ item }) => !item.disabled)
        .map(({ idx }) => idx);
      
      const currentIndexInEnabled = enabledIndices.indexOf(index);
      let nextIndex: number;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = (currentIndexInEnabled + 1) % enabledIndices.length;
          headers[enabledIndices[nextIndex]]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = (currentIndexInEnabled - 1 + enabledIndices.length) % enabledIndices.length;
          headers[enabledIndices[nextIndex]]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          if (enabledIndices.length > 0) {
            headers[enabledIndices[0]]?.focus();
          }
          break;
        case 'End':
          e.preventDefault();
          if (enabledIndices.length > 0) {
            headers[enabledIndices[enabledIndices.length - 1]]?.focus();
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleHeaderClick(items[index].key);
          break;
      }
    },
    [items, handleHeaderClick]
  );

  return (
    <AccordionWrapper bordered={bordered} className={className} data-testid={dataTestId}>
      {items.map((item, index) => {
        const isActive = activeKeysSet.has(item.key);
        const panelId = `accordion-panel-${item.key}`;
        const headerId = `accordion-header-${item.key}`;
        return (
          <AccordionItem key={String(item.key)} isLast={index === items.length - 1}>
            <AccordionHeader
              ref={(el) => {
                headerRefs.current[index] = el;
              }}
              id={headerId}
              isActive={isActive}
              disabled={item.disabled}
              onClick={() => handleHeaderClick(item.key)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isActive}
              aria-disabled={item.disabled || false}
              aria-controls={panelId}
              data-testid={`accordion-header-${item.key}`}
            >
              <AccordionLabel>{item.label}</AccordionLabel>
              <AccordionChevron 
                animate={{ rotate: isActive ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              >
                {item.icon || <FaChevronRight />}
              </AccordionChevron>
            </AccordionHeader>
            <AnimatePresence initial={false}>
              {isActive && (
                <AccordionPanel
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  data-testid={`accordion-panel-${item.key}`}
                >
                  <div>{item.children}</div>
                </AccordionPanel>
              )}
            </AnimatePresence>
          </AccordionItem>
        );
      })}
    </AccordionWrapper>
  );
};

// Type guard for checking if a value is a valid key
export const isValidKey = <T,>(value: unknown): value is T => {
  return typeof value === 'string' || typeof value === 'number';
};

export default Accordion;
