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

export const useToast = () => {
  const { addToast, removeToast, dismissAll } = useToastContext();

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = addToast(options);
      return () => removeToast(id);
    },
    [addToast, removeToast]
  );

  const success = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
      return toast({ ...options, title: message, variant: 'success' });
    },
    [toast]
  );

  const error = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
      return toast({ ...options, title: message, variant: 'error' });
    },
    [toast]
  );

  const warning = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
      return toast({ ...options, title: message, variant: 'warning' });
    },
    [toast]
  );

  const info = useCallback(
    (message: React.ReactNode, options?: Omit<ToastOptions, 'title' | 'variant'>) => {
      return toast({ ...options, title: message, variant: 'info' });
    },
    [toast]
  );

  const promise = useCallback(
    async <T>(promise: Promise<T>, messages: PromiseMessages): Promise<T> => {
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

  return { toast, success, error, warning, info, promise, dismiss, dismissAll };
};
