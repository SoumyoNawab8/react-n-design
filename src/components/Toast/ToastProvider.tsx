'use client';
import type React from 'react';
import { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { AnimatePresence } from '../../utils/lazyMotion';
import { Toast, type ToastProps } from './Toast';
import { ToastContainer, type ToastPosition } from './Toast.styles';

export interface ToastOptions {
  id?: string;
  variant?: ToastProps['variant'];
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
  style?: React.CSSProperties;
  className?: string;
  isGlass?: boolean;
  avatar?: {
    src?: string;
    alt?: string;
    initials?: string;
  };
  richContent?: React.ReactNode;
  meta?: React.ReactNode;
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
  isStacked?: boolean;
}

export const ToastProvider = ({
  children,
  position = 'top-right',
  maxToasts = 5,
  isStacked = false,
}: ToastProviderProps) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });
  const [isExpanded, setIsExpanded] = useState(false);

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
    setIsExpanded(false);
  }, []);

  const handleStackClick = useCallback(() => {
    if (isStacked && state.toasts.length > 1) {
      setIsExpanded((prev) => !prev);
    }
  }, [isStacked, state.toasts.length]);

  const visibleToasts = state.toasts.slice(-maxToasts);
  const stackCount = visibleToasts.length;
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
        onClick={isStacked && !isExpanded ? handleStackClick : undefined}
        style={{
          cursor: isStacked && stackCount > 1 && !isExpanded ? 'pointer' : 'default',
        }}
      >
        <AnimatePresence mode={isStacked ? 'popLayout' : 'sync'}>
          {isStacked && !isExpanded && stackCount > 0 ? (
            // Stacked mode: only show first 3 with depth effect
            <>
              {orderedToasts.slice(0, 3).map((toast, index) => (
                <Toast
                  key={toast.id}
                  id={toast.id}
                  variant={toast.variant}
                  title={toast.title}
                  description={toast.description}
                  action={toast.action}
                  duration={toast.duration}
                  style={toast.style}
                  className={toast.className}
                  isGlass={toast.isGlass}
                  isStacked={true}
                  index={index}
                  stackCount={stackCount}
                  avatar={toast.avatar}
                  richContent={toast.richContent}
                  meta={toast.meta}
                  onDismiss={removeToast}
                />
              ))}
              {stackCount > 3 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    zIndex: 1,
                  }}
                >
                  +{stackCount - 3} more
                </div>
              )}
            </>
          ) : (
            // Normal mode: show all toasts
            orderedToasts.map((toast, index) => (
              <Toast
                key={toast.id}
                id={toast.id}
                variant={toast.variant}
                title={toast.title}
                description={toast.description}
                action={toast.action}
                duration={toast.duration}
                style={toast.style}
                className={toast.className}
                isGlass={toast.isGlass}
                isStacked={isStacked}
                index={index}
                stackCount={stackCount}
                avatar={toast.avatar}
                richContent={toast.richContent}
                meta={toast.meta}
                onDismiss={removeToast}
              />
            ))
          )}
        </AnimatePresence>
      </ToastContainer>
    </ToastContext.Provider>
  );
};
