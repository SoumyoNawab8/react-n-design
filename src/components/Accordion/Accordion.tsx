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

export interface AccordionItemProps {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  /**
   * An array of accordion items to be rendered.
   */
  items: AccordionItemProps[];
  /**
   * The key(s) of the initially active panel(s).
   */
  defaultActiveKey?: string | string[];
  /**
   * The key(s) of the currently active panel(s). If provided, the component is controlled.
   */
  activeKey?: string | string[];
  /**
   * Callback executed when the active panel(s) change.
   */
  onChange?: (key: string | string[]) => void;
  /**
   * If `true`, multiple panels can be open at once.
   */
  allowMultiple?: boolean;
  /**
   * If `false`, the borders between items will be hidden.
   */
  bordered?: boolean;
}

/**
 * A vertically stacked set of interactive headers used to reveal or hide content.
 */
export const Accordion = ({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  allowMultiple = false,
  bordered = true,
}: AccordionProps) => {
  const [internalActiveKeys, setInternalActiveKeys] = useState<string[]>(
    Array.isArray(defaultActiveKey) ? defaultActiveKey : defaultActiveKey ? [defaultActiveKey] : []
  );

  const isControlled = controlledActiveKey !== undefined;
  const activeKeys = isControlled
    ? Array.isArray(controlledActiveKey)
      ? controlledActiveKey
      : [controlledActiveKey]
    : internalActiveKeys;

  const headerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleHeaderClick = (key: string) => {
    let newActiveKeys: string[];
    if (allowMultiple) {
      newActiveKeys = activeKeys.includes(key)
        ? activeKeys.filter((k) => k !== key)
        : [...activeKeys, key];
    } else {
      newActiveKeys = activeKeys.includes(key) ? [] : [key];
    }

    if (!isControlled) {
      setInternalActiveKeys(newActiveKeys);
    }
    onChange?.(allowMultiple ? newActiveKeys : newActiveKeys[0] || '');
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const headers = headerRefs.current.filter(Boolean) as HTMLButtonElement[];
      let nextIndex = index;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = (index + 1) % headers.length;
          headers[nextIndex]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = (index - 1 + headers.length) % headers.length;
          headers[nextIndex]?.focus();
          break;
        case 'Home':
          e.preventDefault();
          headers[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          headers[headers.length - 1]?.focus();
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
    <AccordionWrapper bordered={bordered}>
      {items.map((item, index) => {
        const isActive = activeKeys.includes(item.key);
        const panelId = `accordion-panel-${item.key}`;
        const headerId = `accordion-header-${item.key}`;
        return (
          <AccordionItem key={item.key} isLast={index === items.length - 1}>
            <AccordionHeader
              ref={(el) => {
                headerRefs.current[index] = el;
              }}
              id={headerId}
              isActive={isActive}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleHeaderClick(item.key)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              aria-expanded={isActive}
              aria-disabled={item.disabled}
              aria-controls={panelId}
            >
              <AccordionLabel>{item.label}</AccordionLabel>
              <AccordionChevron animate={{ rotate: isActive ? 90 : 0 }}>
                <FaChevronRight />
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
