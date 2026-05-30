'use client';

import type React from 'react';
import type { HTMLAttributes, KeyboardEvent, ReactElement, ReactNode, Ref } from 'react';
import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { saveFocus, trapFocus } from '../../utils/focus';
import { AnimatePresence } from '../../utils/lazyMotion';
import { PopoverArrow, PopoverContent, PopoverTrigger, PopoverWrapper } from './Popover.styles';

export interface PopoverProps {
  /** The element that triggers the popover */
  trigger: ReactNode;
  /** Content displayed inside the popover */
  content: ReactNode;
  /** Initial open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Position relative to trigger: top, bottom, left, right, center */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  /** How the popover is triggered */
  triggerMode?: 'click' | 'hover' | 'focus';
  /** Delay before showing on hover (ms) */
  hoverDelay?: number;
  /** If true, renders popover in a portal (body) */
  portal?: boolean;
  /** Optional className for styling */
  className?: string;
  /** Optional ID for the popover */
  id?: string;
  /** Accessible label for the popover */
  'aria-label'?: string;
  /** ID of element describing the popover */
  'aria-describedby'?: string;
  /** If true, shows the arrow pointer */
  withArrow?: boolean;
  /** Minimum width of the popover */
  minWidth?: number | string;
  /** Maximum width of the popover */
  maxWidth?: number | string;
  /** Alignment for center placement */
  align?: 'start' | 'center' | 'end';
  /** Offset from trigger in pixels */
  offset?: number;
}

/**
 * An accessible popover component with portal-based rendering,
 * multiple trigger modes, focus trapping, and animation support.
 */
export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  placement = 'bottom',
  triggerMode = 'click',
  hoverDelay = 100,
  portal = true,
  className,
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  withArrow = true,
  minWidth,
  maxWidth,
  align = 'center',
  offset = 8,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<(() => void) | null>(null);
  const popoverId = useId();
  const contentId = id || `popover-content-${popoverId.replace(/:/g, '')}`;
  const triggerId = `popover-trigger-${popoverId.replace(/:/g, '')}`;

  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timers
  useEffect(() => {
    return () => {
      clearTimeout(enterTimer.current ?? undefined);
      clearTimeout(leaveTimer.current ?? undefined);
    };
  }, []);

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const openPopover = useCallback(() => {
    clearTimeout(leaveTimer.current ?? undefined);
    enterTimer.current = setTimeout(() => setOpen(true), hoverDelay);
  }, [hoverDelay, setOpen]);

  const closePopover = useCallback(() => {
    clearTimeout(enterTimer.current ?? undefined);
    leaveTimer.current = setTimeout(() => setOpen(false), 50);
  }, [setOpen]);

  const toggle = useCallback(() => {
    if (isOpen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isOpen, setOpen]);

  const hideInstant = useCallback(() => {
    clearTimeout(enterTimer.current ?? undefined);
    clearTimeout(leaveTimer.current ?? undefined);
    setOpen(false);
  }, [setOpen]);

  // Save/restore focus when open state changes
  useEffect(() => {
    if (isOpen) {
      restoreFocusRef.current = saveFocus();
      const timer = setTimeout(() => {
        const focusTarget = contentRef.current?.querySelector<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
      return undefined;
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen || triggerMode === 'hover') return;

    const handleClickOutside = (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      const triggerEl = triggerRef.current;
      const contentEl = contentRef.current;
      const portalEl = portalRef.current;

      // Check if click is outside both trigger and content
      const isOutsideTrigger = triggerEl && !triggerEl.contains(target);
      const isOutsideContent = contentEl && !contentEl.contains(target);
      const isOutsidePortal = portalEl && !portalEl.contains(target);

      // For portal mode, check if click is in portal wrapper
      const shouldClose = portal
        ? isOutsideTrigger && isOutsidePortal
        : isOutsideTrigger && isOutsideContent;

      if (shouldClose) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setOpen, triggerMode, portal]);

  // Escape to close and focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
        // Return focus to trigger
        triggerRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && contentRef.current) {
        trapFocus(contentRef.current, e);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setOpen]);

  // Build trigger props based on triggerMode
  const getTriggerProps = (): HTMLAttributes<HTMLButtonElement> => {
    const baseProps: HTMLAttributes<HTMLButtonElement> & {
      'aria-haspopup'?: string;
      'aria-expanded'?: boolean;
      'aria-controls'?: string;
      id?: string;
    } = {
      id: triggerId,
      'aria-haspopup': 'dialog',
      'aria-expanded': isOpen,
      'aria-controls': contentId,
    };

    if (triggerMode === 'click') {
      baseProps.onClick = toggle;
      baseProps.onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      };
    } else if (triggerMode === 'hover') {
      baseProps.onMouseEnter = openPopover;
      baseProps.onMouseLeave = closePopover;
      baseProps.onFocus = openPopover;
      baseProps.onBlur = closePopover;
      // Add keyboard support for hover mode
      baseProps.onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        } else if (e.key === 'Escape') {
          hideInstant();
        }
      };
    } else if (triggerMode === 'focus') {
      baseProps.onFocus = openPopover;
      baseProps.onBlur = closePopover;
      baseProps.onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Escape') {
          hideInstant();
        }
      };
    }

    return baseProps;
  };

  const triggerProps = getTriggerProps();

  // Render trigger element
  const renderTrigger = () => {
    if (isValidElement(trigger)) {
      return cloneElement(
        trigger as ReactElement<{
          ref?: Ref<HTMLButtonElement>;
        }>,
        {
          ...triggerProps,
          ref: triggerRef,
          // biome-ignore lint/suspicious/noExplicitAny: cloneElement props
        } as any
      );
    }
    return (
      <PopoverTrigger ref={triggerRef} {...triggerProps}>
        {trigger}
      </PopoverTrigger>
    );
  };

  // Animated popover content
  const popoverContent = (
    <PopoverContent
      ref={contentRef}
      id={contentId}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      placement={placement}
      align={align}
      minWidth={minWidth}
      maxWidth={maxWidth}
      offset={offset}
      className={className}
      tabIndex={-1}
      initial={{
        opacity: 0,
        scale: 0.95,
        y: placement === 'bottom' ? -8 : placement === 'top' ? 8 : 0,
        x: placement === 'right' ? -8 : placement === 'left' ? 8 : 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        x: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
        y: placement === 'bottom' ? -8 : placement === 'top' ? 8 : 0,
        x: placement === 'right' ? -8 : placement === 'left' ? 8 : 0,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {withArrow && placement !== 'center' && (
        <PopoverArrow placement={placement} align={align} offset={offset} />
      )}
      {content}
    </PopoverContent>
  );

  // Render in portal or inline
  const renderPopover = () => {
    if (!isOpen) return null;

    if (portal && typeof document !== 'undefined') {
      return createPortal(<AnimatePresence>{popoverContent}</AnimatePresence>, document.body);
    }

    return <AnimatePresence>{popoverContent}</AnimatePresence>;
  };

  return (
    <PopoverWrapper>
      {renderTrigger()}
      {renderPopover()}
    </PopoverWrapper>
  );
};

export default Popover;
