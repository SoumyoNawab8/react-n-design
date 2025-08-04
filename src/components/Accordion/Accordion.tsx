import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  AccordionWrapper,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionChevron,
  AccordionLabel,
} from './Accordion.styles';
import { FaChevronRight } from 'react-icons/fa';

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
    Array.isArray(defaultActiveKey)
      ? defaultActiveKey
      : defaultActiveKey ? [defaultActiveKey] : []
  );

  const isControlled = controlledActiveKey !== undefined;
  const activeKeys = isControlled
    ? Array.isArray(controlledActiveKey) ? controlledActiveKey : [controlledActiveKey]
    : internalActiveKeys;

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

  return (
    <AccordionWrapper bordered={bordered}>
      {items.map((item, index) => {
        const isActive = activeKeys.includes(item.key);
        return (
          <AccordionItem key={item.key} isLast={index === items.length - 1}>
            <AccordionHeader
              isActive={isActive}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleHeaderClick(item.key)}
            >
              <AccordionLabel>{item.label}</AccordionLabel>
              <AccordionChevron animate={{ rotate: isActive ? 90 : 0 }}>
                <FaChevronRight />
              </AccordionChevron>
            </AccordionHeader>
            <AnimatePresence initial={false}>
              {isActive && (
                <AccordionPanel
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