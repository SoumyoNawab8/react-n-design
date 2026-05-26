'use client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
  FaTimesCircle,
} from '../../icons';
import {
  ToastAction,
  ToastAvatar,
  ToastCloseButton,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastMeta,
  ToastProgress,
  ToastRichContent as StyledToastRichContent,
  ToastSpinner,
  ToastTitle,
  type ToastVariant,
  ToastWrapper,
} from './Toast.styles';

export interface ToastAvatarData {
  src?: string;
  alt?: string;
  initials?: string;
}

export interface RichContentData {
  component: React.ReactNode;
}

export interface ToastProps {
  id: string;
  variant?: ToastVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  onDismiss: (id: string) => void;
  duration?: number;
  style?: CSSProperties;
  className?: string;
  isGlass?: boolean;
  isStacked?: boolean;
  index?: number;
  stackCount?: number;
  avatar?: ToastAvatarData;
  richContent?: React.ReactNode;
  meta?: React.ReactNode;
}

const DEFAULT_ICONS: Record<ToastVariant, React.ReactNode> = {
  success: <FaCheck />,
  error: <FaTimesCircle />,
  warning: <FaExclamationTriangle />,
  info: <FaInfoCircle />,
  loading: <ToastSpinner />,
};

// Memoized Toast component for performance
export const Toast = React.memo(
  ({
    id,
    variant = 'info',
    title,
    description,
    action,
    onDismiss,
    duration = 5000,
    style,
    className,
    isGlass = false,
    isStacked = false,
    index = 0,
    stackCount = 1,
    avatar,
    richContent,
    meta,
  }: ToastProps) => {
    const remainingRef = useRef(duration);
    const startTimeRef = useRef(Date.now());
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const dismissHandlerRef = useRef(() => onDismiss(id));
    
    // Swipe state
    const [isDragging, setIsDragging] = useState(false);
    const [swipeX, setSwipeX] = useState(0);
    const startXRef = useRef(0);
    const currentXRef = useRef(0);
    const isMobile = useRef(false);
    const rafRef = useRef<number | null>(null);

    // Memoized dismiss handler
    const memoizedDismiss = useMemo(() => () => {
      dismissHandlerRef.current();
    }, []);

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
        timerRef.current = setTimeout(memoizedDismiss, remaining);
      },
      [clearTimer, memoizedDismiss]
    );

    useEffect(() => {
      startTimer(duration);
      return () => clearTimer();
    }, [duration, startTimer, clearTimer]);

    // Check if mobile device
    useEffect(() => {
      isMobile.current = window.matchMedia('(max-width: 640px)').matches || 'ontouchstart' in window;
    }, []);

    // Use requestAnimationFrame for position updates
    const updateSwipePosition = useCallback((x: number) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        setSwipeX(x);
      });
    }, []);

    // Touch swipe handlers for mobile
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      if (!isMobile.current) return;
      startXRef.current = e.touches[0].clientX;
      currentXRef.current = e.touches[0].clientX;
      setIsDragging(true);
      clearTimer();
    }, [clearTimer]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
      if (!isDragging || !isMobile.current) return;
      currentXRef.current = e.touches[0].clientX;
      const diff = currentXRef.current - startXRef.current;
      updateSwipePosition(diff);
    }, [isDragging, updateSwipePosition]);

    const handleTouchEnd = useCallback(() => {
      if (!isMobile.current) return;
      setIsDragging(false);
      const diff = currentXRef.current - startXRef.current;
      const threshold = 80;
      
      if (Math.abs(diff) > threshold) {
        // Dismiss with swipe animation
        if (wrapperRef.current) {
          wrapperRef.current.style.setProperty('--swipe-x', `${diff}px`);
          wrapperRef.current.style.setProperty('--swipe-opacity', `${1 - Math.abs(diff) / 300}`);
          wrapperRef.current.classList.add('swipe-out');
        }
        setTimeout(memoizedDismiss, 200);
      } else {
        // Snap back
        updateSwipePosition(0);
        startTimer(remainingRef.current);
      }
    }, [startTimer, memoizedDismiss, updateSwipePosition]);

    const handleMouseEnter = useCallback(() => {
      const elapsed = Date.now() - startTimeRef.current;
      remainingRef.current = Math.max(0, remainingRef.current - elapsed);
      clearTimer();
    }, [clearTimer]);

    const handleMouseLeave = useCallback(() => {
      startTimer(remainingRef.current);
    }, [startTimer]);

    const handleDismiss = useCallback(() => {
      clearTimer();
      memoizedDismiss();
    }, [clearTimer, memoizedDismiss]);

    // Stagger offset for multiple toasts
    const staggerDelay = useMemo(() => index * 0.05, [index]);

    // Animation values with spring physics
    const initial = { opacity: 0, x: 120, scale: 0.9 };
    const animate = { 
      opacity: 1, 
      x: swipeX, 
      scale: 1,
    };
    const exit = { opacity: 0, x: 120, scale: 0.9, transition: { duration: 0.25 } };

    return (
      <ToastWrapper
        ref={wrapperRef}
        variant={variant}
        role={variant === 'error' ? 'alert' : 'status'}
        aria-live={variant === 'error' ? 'assertive' : 'polite'}
        aria-atomic="true"
        style={{
          ...style,
          transform: `translateX(${swipeX}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
        className={className}
        isGlass={isGlass}
        isStacked={isStacked}
        index={index}
        stackCount={stackCount}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
          delay: staggerDelay,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        layout
      >
        {avatar ? (
          <ToastAvatar>
            {avatar.src ? (
              <img src={avatar.src} alt={avatar.alt || ''} />
            ) : (
              <div className="avatar-placeholder">{avatar.initials}</div>
            )}
          </ToastAvatar>
        ) : (
          <ToastIcon variant={variant} isGlass={isGlass}>{DEFAULT_ICONS[variant]}</ToastIcon>
        )}
        <ToastContent>
          {title && <ToastTitle>{title}</ToastTitle>}
          {description && <ToastDescription>{description}</ToastDescription>}
          {meta && <ToastMeta>{meta}</ToastMeta>}
          {richContent && <StyledToastRichContent>{richContent}</StyledToastRichContent>}
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
  }
);

// Display name for debugging
Toast.displayName = 'Toast';

// Export default icons for customization
export { DEFAULT_ICONS as ToastIcons };
