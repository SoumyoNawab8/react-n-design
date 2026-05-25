'use client';
import type React from 'react';
import { AnimatePresence } from '../../utils/lazyMotion';
import { useCallback, useEffect, useRef } from 'react';
import { saveFocus, trapFocus } from '../../utils/focus';
import { Card } from '../Card';
import {
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalWrapper,
} from './Modal.styles';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  footer?: React.ReactNode;
  preventBackdropClick?: boolean;
  /**
   * Toggles the vertical alignment of the modal.
   */
  position?: 'center' | 'top';
  /**
   * If `true`, the modal will take up the entire viewport.
   */
  fullScreen?: boolean;
  /**
   * If `false`, the body scroll will not be locked when the modal is open.
   */
  lockScroll?: boolean;
}

/**
 * An advanced modal with positioning, fullscreen, and scroll-locking capabilities.
 */
export const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'medium',
  footer,
  preventBackdropClick = false,
  position = 'center',
  fullScreen = false,
  lockScroll = true,
}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<(() => void) | null>(null);
  const titleId = title ? `modal-title-${Math.random().toString(36).slice(2, 9)}` : undefined;

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
      // Focus the modal content or close button after it mounts
      const timer = setTimeout(() => {
        const focusTarget = contentRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusTarget?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      restoreFocusRef.current?.();
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (contentRef.current) {
        trapFocus(contentRef.current, e as unknown as KeyboardEvent);
      }
    },
    [onClose]
  );

  const handleBackdropClick = () => {
    if (!preventBackdropClick) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalWrapper position={position}>
          <ModalBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
          <ModalContent
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            size={size}
            fullScreen={fullScreen}
            initial={{ y: position === 'top' ? -50 : 0, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: position === 'top' ? -50 : 0, scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <Card padding="large">
              {title && (
                <ModalHeader>
                  <ModalTitle id={titleId}>{title}</ModalTitle>
                  <ModalCloseButton onClick={onClose} aria-label="Close modal">
                    &times;
                  </ModalCloseButton>
                </ModalHeader>
              )}
              <ModalBody>{children}</ModalBody>
              {footer && <ModalFooter>{footer}</ModalFooter>}
            </Card>
          </ModalContent>
        </ModalWrapper>
      )}
    </AnimatePresence>
  );
};
