import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  ModalBackdrop, ModalContent, ModalWrapper, ModalHeader, ModalTitle,
  ModalCloseButton, ModalBody, ModalFooter
} from './Modal.styles';
import { Card } from '../Card';

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
          />
          <ModalContent
            size={size}
            fullScreen={fullScreen}
            initial={{ y: position === 'top' ? -50 : 0, scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: position === 'top' ? -50 : 0, scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Card padding="large">
              {title && (
                <ModalHeader>
                  <ModalTitle>{title}</ModalTitle>
                  <ModalCloseButton onClick={onClose}>&times;</ModalCloseButton>
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