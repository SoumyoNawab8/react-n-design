import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  FaCheckCircle, FaInfoCircle, FaExclamationTriangle, FaTimesCircle, FaTimes
} from 'react-icons/fa';
import {
  AlertWrapper, AlertIcon, AlertContent, AlertMessage, AlertDescription, CloseIcon
} from './Alert.styles';

export interface AlertProps {
  /**
   * The main title or message of the alert.
   */
  message: React.ReactNode;
  /**
   * Optional longer description text below the message.
   */
  description?: React.ReactNode;
  /**
   * Defines the visual style and icon of the alert.
   */
  type?: 'success' | 'info' | 'warning' | 'error';
  /**
   * If `true`, a close icon will be displayed to dismiss the alert.
   */
  closable?: boolean;
  /**
   * Callback function executed when the close icon is clicked.
   */
  onClose?: () => void;
  /**
   * If `true`, an icon corresponding to the type will be shown.
   */
  showIcon?: boolean;
  /**
   * Allows overriding the default icon.
   */
  icon?: React.ReactNode;
}

const typeIcons = {
  success: <FaCheckCircle />,
  info: <FaInfoCircle />,
  warning: <FaExclamationTriangle />,
  error: <FaTimesCircle />,
};

/**
 * A component for displaying contextual feedback messages.
 */
export const Alert = ({
  message,
  description,
  type = 'info',
  closable,
  onClose,
  showIcon,
  icon,
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const alertIcon = icon || typeIcons[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <AlertWrapper
          alertType={type}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -300, transition: { duration: 0.3 } }}
          role="alert"
        >
          {showIcon && <AlertIcon>{alertIcon}</AlertIcon>}
          <AlertContent>
            <AlertMessage>{message}</AlertMessage>
            {description && <AlertDescription>{description}</AlertDescription>}
          </AlertContent>
          {closable && (
            <CloseIcon onClick={handleClose} aria-label="Close alert">
              <FaTimes />
            </CloseIcon>
          )}
        </AlertWrapper>
      )}
    </AnimatePresence>
  );
};