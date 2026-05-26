import React, { useCallback } from 'react';
import type { ToastVariant } from './Toast.styles';
import { type ToastOptions, useToastContext } from './ToastProvider';

export type PromiseMessage = React.ReactNode | Omit<ToastOptions, 'variant'>;

export interface PromiseMessages {
  loading: PromiseMessage;
  success: PromiseMessage | ((data: any) => PromiseMessage);
  error: PromiseMessage | ((err: any) => PromiseMessage);
}

const normalizeMessage = (
  msg: PromiseMessage,
  variant: ToastVariant,
  defaultDuration?: number
): ToastOptions => {
  if (
    typeof msg === 'string' ||
    typeof msg === 'number' ||
    typeof msg === 'boolean' ||
    React.isValidElement(msg)
  ) {
    return { title: msg as React.ReactNode, variant, duration: defaultDuration };
  }
  const opts = msg as ToastOptions;
  return {
    ...opts,
    variant,
    duration: opts.duration ?? defaultDuration,
  };
};

export interface UseToastReturn {
  /**
   * Show a generic toast with full options
   */
  toast: (options: ToastOptions) => () => void;
  /**
   * Show a success toast
   */
  success: (
    message: React.ReactNode,
    options?: Omit<ToastOptions, 'title' | 'variant'>
  ) => string;
  /**
   * Show an error toast
   */
  error: (
    message: React.ReactNode,
    options?: Omit<ToastOptions, 'title' | 'variant'>
  ) => string;
  /**
   * Show a warning toast
   */
  warning: (
    message: React.ReactNode,
    options?: Omit<ToastOptions, 'title' | 'variant'>
  ) => string;
  /**
   * Show an info toast
   */
  info: (
    message: React.ReactNode,
    options?: Omit<ToastOptions, 'title' | 'variant'>
  ) => string;
  /**
   * Show a glass morphism toast
   */
  glass: (options: ToastOptions) => string;
  /**
   * Show a toast with avatar (for user notifications)
   */
  user: (
    message: React.ReactNode,
    avatar: { src?: string; alt?: string; initials?: string },
    options?: Omit<ToastOptions, 'title' | 'variant' | 'avatar'>
  ) => string;
  /**
   * Show a toast with custom icon
   */
  custom: (
    message: React.ReactNode,
    icon: React.ReactNode,
    options?: Omit<ToastOptions, 'title' | 'variant'>
  ) => string;
  /**
   * Show a promise-based toast
   */
  promise: <T>(promise: Promise<T>, messages: PromiseMessages) => Promise<T>;
  /**
   * Dismiss a specific toast by id
   */
  dismiss: (id: string) => void;
  /**
   * Dismiss all toasts
   */
  dismissAll: () => void;
}

export const useToast = (): UseToastReturn => {
  const { addToast, removeToast, dismissAll: contextDismissAll } = useToastContext();

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = addToast(options);
      return () => removeToast(id);
    },
    [addToast, removeToast]
  );

  const success = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
      return addToast({ ...options, title: message, variant: 'success' });
    },
    [addToast]
  );

  const error = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
      return addToast({ ...options, title: message, variant: 'error' });
    },
    [addToast]
  );

  const warning = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
      return addToast({ ...options, title: message, variant: 'warning' });
    },
    [addToast]
  );

  const info = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
      return addToast({ ...options, title: message, variant: 'info' });
    },
    [addToast]
  );

  // Glass morphology variant
  const glass = useCallback(
    (options: ToastOptions) => {
      return addToast({
        ...options,
        isGlass: true,
        variant: options.variant || 'info',
      });
    },
    [addToast]
  );

  // User notification with avatar
  const user = useCallback(
    (
      message: React.ReactNode,
      avatar: { src?: string; alt?: string; initials?: string },
      options?: Omit<ToastOptions, 'title' | 'variant' | 'avatar'>
    ) => {
      return addToast({
        ...options,
        title: message,
        variant: 'info',
        avatar,
      });
    },
    [addToast]
  );

  // Custom icon toast (shows custom icon instead of variant default)
  const custom = useCallback(
    (message: React.ReactNode, icon: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
      // Store icon in a way we can access it - we'll use richContent for this
      return addToast({
        ...options,
        title: message,
        variant: 'info',
        richContent: icon,
      });
    },
    [addToast]
  );

  const promiseFn = useCallback(
    async <T, >(promise: Promise<T>, messages: PromiseMessages): Promise<T> => {
      const loadingOpt = normalizeMessage(messages.loading, 'loading', 0);
      const id = addToast(loadingOpt);

      try {
        const data = await promise;
        const successMsg =
          typeof messages.success === 'function' ? messages.success(data) : messages.success;
        const successOpt = normalizeMessage(successMsg, 'success', 5000);
        removeToast(id);
        addToast(successOpt);
        return data;
      } catch (err) {
        const errorMsg =
          typeof messages.error === 'function' ? messages.error(err) : messages.error;
        const errorOpt = normalizeMessage(errorMsg, 'error', 5000);
        removeToast(id);
        addToast(errorOpt);
        throw err;
      }
    },
    [addToast, removeToast]
  );

  const dismiss = useCallback(
    (id: string) => {
      removeToast(id);
    },
    [removeToast]
  );

  const dismissAll = useCallback(() => {
    contextDismissAll();
  }, [contextDismissAll]);

  return {
    toast,
    success,
    error,
    warning,
    info,
    glass,
    user,
    custom,
    promise: promiseFn,
    dismiss,
    dismissAll,
  };
};
