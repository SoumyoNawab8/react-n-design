'use client';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FaChevronRight } from '../../icons';
import { useReducedMotion } from '../../context/ThemeContext';
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
   * The visual variant of the accordion.
   * - 'default': Standard bordered accordion
   * - 'glass': Glass morphism style with backdrop blur
   * - 'minimal': Minimal borderless style
   * @default 'default'
   */
  variant?: 'default' | 'glass' | 'minimal';
  /**
   * If `true`, the accordion takes full width on mobile devices.
   * @default false
   */
  fullWidthMobile?: boolean;
  /**
   * If `true`, enables staggered entrance animations for items.
   * @default false
   */
  stagger?: boolean;
  /**
   * The delay between staggered animations in seconds.
   * @default 0.05
   */
  staggerDelay?: number;
  /**
   * The custom class name for the wrapper
   */
  className?: string;
  /**
   * Optional inline styles for the wrapper
   */
  style?: React.CSSProperties;
  /**
   * Optional data-testid for testing purposes
   */
  'data-testid'?: string;
}

// Spring configuration for smooth animations
const SPRING_CONFIG = { type: 'spring' as const, stiffness: 400, damping: 30 };

/**
 * A vertically stacked set of interactive headers used to reveal or hide content.
 * Supports single or multiple panel expansion, keyboard navigation, and ARIA attributes.
 * Features spring physics animations, stagger effects, glass morphism variant, and reduced motion support.
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
export const Accordion = React.memo(<T extends string | number = string>({
  items,
  defaultActiveKey,
  activeKey: controlledActiveKey,
  onChange,
  allowMultiple = false,
  bordered = true,
  variant = 'default',
  fullWidthMobile = false,
  stagger = false,
  staggerDelay = 0.05,
  className,
  style,
  'data-testid': dataTestId,
}: AccordionProps<T>) => {
  const prefersReducedMotion = useReducedMotion();
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

  const activeKeysSet = useMemo(() => new Set(activeKeys), [activeKeys]);
  const headerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleHeaderClick = useCallback(
    (key: T) => {
      if (items.find((item) => item.key === key)?.disabled) {
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
      onChange?.(allowMultiple ? newActiveKeys : (newActiveKeys[0] as T) || ('' as T));
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

  // Calculate stagger delay for each item
  const getStaggerTransition = useCallback(
    (index: number) => {
      if (!stagger || prefersReducedMotion) {
        return prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' as const };
      }
      return {
        ...SPRING_CONFIG,
        delay: index * staggerDelay,
      };
    },
    [stagger, staggerDelay, prefersReducedMotion]
  );

  // Get panel transition based on reduced motion preference
  const getPanelTransition = useCallback(() => {
    if (prefersReducedMotion) {
      return { duration: 0 };
    }
    return SPRING_CONFIG;
  }, [prefersReducedMotion]);

  return (
    <AccordionWrapper
      variant={variant}
      bordered={bordered}
      fullWidthMobile={fullWidthMobile}
      className={className}
      style={style}
      data-testid={dataTestId}
    >
      {items.map((item, index) => {
        const isActive = activeKeysSet.has(item.key);
        const panelId = `accordion-panel-${item.key}`;
        const headerId = `accordion-header-${item.key}`;
        const itemTransition = getStaggerTransition(index);

        return (
          <AccordionItem
            key={String(item.key)}
            isLast={index === items.length - 1}
            variant={variant}
            custom={index}
            initial={stagger ? { opacity: 0, y: -10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={itemTransition}
          >
            <AccordionHeader
              ref={(el) => {
                headerRefs.current[index] = el;
              }}
              id={headerId}
              disabled={item.disabled || false}
              isActive={isActive}
              variant={variant}
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
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
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
                  transition={getPanelTransition()}
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
});

Accordion.displayName = 'Accordion';

// Type guard for checking if a value is a valid key
export const isValidKey = <T,>(value: unknown): value is T => {
  return typeof value === 'string' || typeof value === 'number';
};

export default Accordion;
