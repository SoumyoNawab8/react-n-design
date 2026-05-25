'use client';
import { AnimatePresence } from 'framer-motion';
import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { Toast, type ToastProps } from './Toast';
import { ToastContainer, type ToastPosition } from './Toast.styles';

export interface ToastOptions {
  id?: string;
  variant?: ToastProps['variant'];
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
}

interface ToastState {
  toasts: (ToastOptions & { id: string })[];
}

type ToastAction =
  | { type: 'ADD_TOAST'; toast: ToastOptions & { id: string } }
  | { type: 'REMOVE_TOAST'; id: string }
  | { type: 'DISMISS_ALL' };

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case 'ADD_TOAST':
      return { ...state, toasts: [...state.toasts, action.toast] };
    case 'REMOVE_TOAST':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.id) };
    case 'DISMISS_ALL':
      return { ...state, toasts: [] };
    default:
      return state;
  }
};

interface ToastContextType {
  addToast: (options: ToastOptions) => string;
  removeToast: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return ctx;
};

export interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export const ToastProvider = ({
  children,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const addToast = useCallback((options: ToastOptions) => {
    const id = options.id || Math.random().toString(36).slice(2, 9);
    dispatch({ type: 'ADD_TOAST', toast: { ...options, id } });
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_TOAST', id });
  }, []);

  const dismissAll = useCallback(() => {
    dispatch({ type: 'DISMISS_ALL' });
  }, []);

  const visibleToasts = state.toasts.slice(-maxToasts);
  const orderedToasts = position.startsWith('top') ? [...visibleToasts].reverse() : visibleToasts;

  const value = useMemo(
    () => ({ addToast, removeToast, dismissAll }),
    [addToast, removeToast, dismissAll]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        position={position}
        aria-live="polite"
        aria-atomic="false"
        aria-label="Notifications"
      >
        <AnimatePresence>
          {orderedToasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id}
              variant={toast.variant}
              title={toast.title}
              description={toast.description}
              action={toast.action}
              duration={toast.duration}
              onDismiss={removeToast}
            />
          ))}
        </AnimatePresence>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
