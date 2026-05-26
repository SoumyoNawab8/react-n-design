'use client';
import React, { useCallback, useId, useState } from 'react';
import { FaChevronDown } from '../../icons';
import { AnimatePresence } from '../../utils/lazyMotion';
import {
  CollapsibleChevron,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWrapper,
} from './Collapsible.styles';

export interface CollapsibleProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  unmountOnExit?: boolean;
}

/**
 * A neumorphic collapsible component with animated height transitions,
 * chevron rotation, and full accessibility support.
 */
export const Collapsible = ({
  trigger,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  unmountOnExit = false,
}: CollapsibleProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const uniqueId = useId();
  const contentId = `collapsible-content-${uniqueId}`;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const toggle = () => setOpen(!isOpen);

  const triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
  } = {
    onClick: toggle,
    'aria-expanded': isOpen,
    'aria-controls': contentId,
  };

  const triggerElement = React.isValidElement(trigger) ? (
    React.cloneElement(trigger as React.ReactElement, triggerProps)
  ) : (
    <CollapsibleTrigger type="button" {...triggerProps}>
      <span>{trigger}</span>
      <CollapsibleChevron isOpen={isOpen} animate={{ rotate: isOpen ? 180 : 0 }}>
        <FaChevronDown />
      </CollapsibleChevron>
    </CollapsibleTrigger>
  );

  return (
    <CollapsibleWrapper>
      {triggerElement}
      <AnimatePresence initial={false}>
        {(isOpen || !unmountOnExit) && (
          <CollapsibleContent
            id={contentId}
            isOpen={isOpen}
            aria-hidden={!isOpen}
            initial={unmountOnExit ? { height: 0, opacity: 0 } : false}
            animate={
              isOpen
                ? { height: 'auto', opacity: 1 }
                : unmountOnExit
                  ? { height: 0, opacity: 0 }
                  : { height: 0, opacity: 0 }
            }
            exit={unmountOnExit ? { height: 0, opacity: 0 } : undefined}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div>{children}</div>
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </CollapsibleWrapper>
  );
};
