'use client';
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { saveFocus, trapFocus } from '../../utils/focus';
import { AnimatePresence } from '../../utils/lazyMotion';
import { PopoverContent, PopoverTrigger, PopoverWrapper } from './Popover.styles';

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * A neumorphic popover component with focus trapping, click-outside close,
 * escape-to-close, and animated open/close transitions.
 */
export const Popover = ({
  trigger,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom',
}: PopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<(() => void) | null>(null);
  const popoverId = useId();
  const contentId = `popover-content-${popoverId}`;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const toggle = useCallback(() => setOpen(!isOpen), [isOpen, setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  // Save/restore focus
  useEffect(() => {
    if (isOpen) {
      restoreFocusRef.current = saveFocus();
      const timer = setTimeout(() => {
        const focusTarget = contentRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusTarget) {
          focusTarget.focus();
        } else {
          contentRef.current?.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      restoreFocusRef.current?.();
    }
  }, [isOpen]);

  // Click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        close();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, close]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        close();
        return;
      }
      if (e.key === 'Tab' && contentRef.current) {
        trapFocus(contentRef.current, e);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  const triggerProps: React.HTMLAttributes<HTMLElement> & {
    'aria-haspopup'?: string;
    'aria-expanded'?: boolean;
    'aria-controls'?: string;
  } = {
    onClick: toggle,
    'aria-haspopup': 'dialog',
    'aria-expanded': isOpen,
    'aria-controls': contentId,
  };

  const triggerElement = React.isValidElement(trigger) ? (
    React.cloneElement(trigger as React.ReactElement, triggerProps)
  ) : (
    <PopoverTrigger as="button" type="button" {...triggerProps}>
      {trigger}
    </PopoverTrigger>
  );

  return (
    <PopoverWrapper ref={wrapperRef}>
      {triggerElement}
      <AnimatePresence>
        {isOpen && (
          <PopoverContent
            ref={contentRef}
            id={contentId}
            role="dialog"
            aria-modal="true"
            aria-label="Popover"
            placement={placement}
            tabIndex={-1}
            initial={{
              opacity: 0,
              scale: 0.95,
              y: placement === 'bottom' ? -8 : placement === 'top' ? 8 : 0,
            }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: placement === 'bottom' ? -8 : placement === 'top' ? 8 : 0,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {children}
          </PopoverContent>
        )}
      </AnimatePresence>
    </PopoverWrapper>
  );
};
