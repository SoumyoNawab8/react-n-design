'use client';
import React, { useCallback, useId, useRef, useState } from 'react';
import { FaChevronDown } from '../../icons';
import { AnimatePresence } from '../../utils/lazyMotion';
import {
  CollapsibleChevron,
  CollapsibleContent,
  CollapsibleContentWrapper,
  CollapsibleTrigger,
  CollapsibleWrapper,
} from './Collapsible.styles';

export interface CollapsibleProps {
  /**
   * The trigger element or text for the collapsible.
   * Can be a string, React node, or a custom element.
   */
  trigger: React.ReactNode;
  /**
   * The content to be shown/hidden.
   */
  children: React.ReactNode;
  /**
   * Whether the collapsible is open by default (uncontrolled mode).
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Controlled open state. When provided, the component becomes controlled.
   */
  open?: boolean;
  /**
   * Callback fired when the open state changes.
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * If `true`, the content will be unmounted when collapsed.
   * @default false
   */
  unmountOnExit?: boolean;
  /**
   * If `true`, the trigger will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Optional custom class name for the wrapper.
   */
  className?: string;
  /**
   * Optional data-testid for testing.
   */
  'data-testid'?: string;
  /**
   * Custom icon to replace the default chevron.
   */
  icon?: React.ReactNode;
}

/**
 * A neumorphic collapsible component with smooth animations and full accessibility.
 *
 * Features:
 * - Smooth height/opacity transitions using framer-motion
 * - Chevron rotation animation
 * - Full keyboard support (Enter/Space to toggle)
 * - ARIA attributes for screen readers
 * - Controlled and uncontrolled modes
 * - Custom trigger support
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Collapsible trigger="Click to expand">
 *   <p>Hidden content</p>
 * </Collapsible>
 *
 * // Controlled with custom trigger
 * <Collapsible
 *   trigger={<Button>Expand</Button>}
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * >
 *   <p>Controlled content</p>
 * </Collapsible>
 * ```
 */
export const Collapsible = ({
  trigger,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  unmountOnExit = false,
  disabled = false,
  className,
  'data-testid': dataTestId,
  icon,
}: CollapsibleProps) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const uniqueId = useId();
  const contentId = `collapsible-content-${uniqueId}`;
  const triggerId = `collapsible-trigger-${uniqueId}`;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange, disabled]
  );

  const toggle = useCallback(() => {
    if (disabled) return;
    setOpen(!isOpen);
  }, [isOpen, setOpen, disabled]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    },
    [toggle, disabled]
  );

  const triggerProps: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    'aria-expanded': boolean;
    'aria-controls': string;
    'aria-disabled'?: boolean;
    id: string;
  } = {
    onClick: toggle,
    onKeyDown: handleKeyDown,
    'aria-expanded': isOpen,
    'aria-controls': contentId,
    'aria-disabled': disabled,
    id: triggerId,
    disabled,
    tabIndex: disabled ? -1 : 0,
  };

  const isCustomTrigger = React.isValidElement(trigger);

  const triggerElement = isCustomTrigger ? (
    React.cloneElement(trigger as React.ReactElement, {
      ...triggerProps,
      // Merge onClick if custom trigger has its own
      onClick: (e: React.MouseEvent) => {
        (trigger as React.ReactElement).props.onClick?.(e);
        if (!disabled) {
          toggle();
        }
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        (trigger as React.ReactElement).props.onKeyDown?.(e);
        handleKeyDown(e);
      },
    })
  ) : (
    <CollapsibleTrigger
      ref={triggerRef}
      type="button"
      {...triggerProps}
      data-testid={dataTestId ? `${dataTestId}-trigger` : undefined}
    >
      <span>{trigger}</span>
      <CollapsibleChevron
        isOpen={isOpen}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {icon || <FaChevronDown />}
      </CollapsibleChevron>
    </CollapsibleTrigger>
  );

  return (
    <CollapsibleWrapper className={className} data-testid={dataTestId}>
      {triggerElement}
      <AnimatePresence initial={false}>
        {(isOpen || !unmountOnExit) && (
          <CollapsibleContent
            id={contentId}
            role="region"
            aria-labelledby={triggerId}
            aria-hidden={!isOpen}
            initial={unmountOnExit ? 'collapsed' : false}
            animate={isOpen ? 'open' : 'collapsed'}
            exit={unmountOnExit ? 'collapsed' : undefined}
            variants={{
              open: {
                height: 'auto',
                opacity: 1,
              },
              collapsed: {
                height: 0,
                opacity: 0,
              },
            }}
            transition={{
              height: { duration: 0.3, ease: 'easeInOut' },
              opacity: { duration: 0.2, ease: 'easeInOut' },
            }}
            data-testid={dataTestId ? `${dataTestId}-content` : undefined}
          >
            <CollapsibleContentWrapper>{children}</CollapsibleContentWrapper>
          </CollapsibleContent>
        )}
      </AnimatePresence>
    </CollapsibleWrapper>
  );
};
