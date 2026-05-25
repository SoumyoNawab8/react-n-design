'use client';
import { AnimatePresence } from 'framer-motion';
import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { saveFocus, trapFocus } from '../../utils/focus';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerTitle,
  DrawerWrapper,
} from './Drawer.styles';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'small' | 'medium' | 'large' | 'full';
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  preventBackdropClick?: boolean;
  lockScroll?: boolean;
}

const getAnimationProps = (placement: 'left' | 'right' | 'top' | 'bottom') => {
  switch (placement) {
    case 'left':
      return { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } };
    case 'right':
      return { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } };
    case 'top':
      return { initial: { y: '-100%' }, animate: { y: 0 }, exit: { y: '-100%' } };
    case 'bottom':
      return { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } };
  }
};

/**
 * A sliding drawer / slide-over panel with neomorphic styling.
 * Supports focus trapping, scroll locking, escape-to-close, and compound subcomponents.
 */
export const Drawer = ({
  isOpen,
  onClose,
  placement = 'right',
  size = 'medium',
  children,
  title,
  footer,
  preventBackdropClick = false,
  lockScroll = true,
}: DrawerProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<(() => void) | null>(null);
  const titleId = title ? `drawer-title-${Math.random().toString(36).slice(2, 9)}` : undefined;

  useEffect(() => {
    if (isOpen && lockScroll) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (lockScroll) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, lockScroll]);

  useEffect(() => {
    if (isOpen) {
      restoreFocusRef.current = saveFocus();
      const timer = setTimeout(() => {
        const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length > 0) {
          focusable[0].focus();
        } else {
          panelRef.current?.focus();
        }
      }, 50);
      return () => {
        clearTimeout(timer);
      };
    } else {
      restoreFocusRef.current?.();
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && panelRef.current) {
        trapFocus(panelRef.current, e);
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = () => {
    if (!preventBackdropClick) {
      onClose();
    }
  };

  const animation = getAnimationProps(placement);

  return (
    <AnimatePresence>
      {isOpen && (
        <DrawerWrapper>
          <DrawerBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
          <DrawerPanel
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            placement={placement}
            size={size}
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {title && (
              <DrawerHeader>
                <DrawerTitle id={titleId}>{title}</DrawerTitle>
                <DrawerCloseButton onClick={onClose} aria-label="Close drawer">
                  &times;
                </DrawerCloseButton>
              </DrawerHeader>
            )}
            {title || footer ? <DrawerBody>{children}</DrawerBody> : children}
            {footer && <DrawerFooter>{footer}</DrawerFooter>}
          </DrawerPanel>
        </DrawerWrapper>
      )}
    </AnimatePresence>
  );
};

Drawer.Header = DrawerHeader;
Drawer.Body = DrawerBody;
Drawer.Footer = DrawerFooter;
Drawer.CloseButton = DrawerCloseButton;
