'use client';
import type React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import {
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
  FaTimesCircle,
} from "../../icons";
import {
  ToastAction,
  ToastCloseButton,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastProgress,
  ToastSpinner,
  ToastTitle,
  type ToastVariant,
  ToastWrapper,
} from './Toast.styles';

export interface ToastProps {
  id: string;
  variant?: ToastVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  onDismiss: (id: string) => void;
  duration?: number;
}

const variantIcons: Record<ToastVariant, React.ReactNode> = {
  success: <FaCheck />,
  error: <FaTimesCircle />,
  warning: <FaExclamationTriangle />,
  info: <FaInfoCircle />,
  loading: <ToastSpinner />,
};

export const Toast = ({
  id,
  variant = 'info',
  title,
  description,
  action,
  onDismiss,
  duration = 5000,
}: ToastProps) => {
  const remainingRef = useRef(duration);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(
    (remaining: number) => {
      clearTimer();
      startTimeRef.current = Date.now();
      remainingRef.current = remaining;
      timerRef.current = setTimeout(() => onDismiss(id), remaining);
    },
    [clearTimer, id, onDismiss]
  );

  useEffect(() => {
    startTimer(duration);
    return () => clearTimer();
  }, [duration, startTimer, clearTimer]);

  const handleMouseEnter = () => {
    const elapsed = Date.now() - startTimeRef.current;
    remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    clearTimer();
  };

  const handleMouseLeave = () => {
    startTimer(remainingRef.current);
  };

  const handleDismiss = () => {
    clearTimer();
    onDismiss(id);
  };

  return (
    <ToastWrapper
      variant={variant}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
      aria-atomic="true"
      initial={{ opacity: 0, x: 120, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 120, scale: 0.9, transition: { duration: 0.25 } }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      layout
    >
      <ToastIcon variant={variant}>{variantIcons[variant]}</ToastIcon>
      <ToastContent>
        {title && <ToastTitle>{title}</ToastTitle>}
        {description && <ToastDescription>{description}</ToastDescription>}
      </ToastContent>
      {action && <ToastAction>{action}</ToastAction>}
      <ToastCloseButton onClick={handleDismiss} aria-label="Dismiss notification">
        <FaTimes />
      </ToastCloseButton>
      {duration > 0 && variant !== 'loading' && (
        <ToastProgress variant={variant} duration={duration} />
      )}
    </ToastWrapper>
  );
};
