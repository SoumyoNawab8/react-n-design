'use client';
import type React from 'react';
import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { saveFocus, trapFocus } from '../../utils/focus';
import { AnimatePresence } from '../../utils/lazyMotion';
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

export type ModalSize = 'small' | 'medium' | 'large';

export interface Responsive<T> {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
}

export interface AnimationConfig {
  initial?: { y?: number | string; x?: number | string; scale?: number; opacity?: number };
  animate?: { y?: number | string; x?: number | string; scale?: number; opacity?: number };
  exit?: { y?: number | string; x?: number | string; scale?: number; opacity?: number };
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  'aria-label'?: string;
  size?: ModalSize | Responsive<ModalSize>;
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
  /**
   * Variant style: 'default' (default) or 'glass' (with backdrop blur)
   */
  variant?: 'default' | 'glass';
  /**
   * Mobile variant: 'modal' (default) or 'bottom-sheet' (slides up from bottom)
   */
  mobileVariant?: 'modal' | 'bottom-sheet';
  /**
   * Custom animation configuration
   */
  animationConfig?: AnimationConfig;
  /**
   * Custom styles for modal content
   */
  style?: React.CSSProperties;
  /**
   * Custom styles for backdrop
   */
  backdropStyle?: React.CSSProperties;
  /**
   * If `true`, the modal supports maximized/minimized state (for complex modals)
   */
  maximizable?: boolean;
  /**
   * Initial maximized state
   */
  defaultMaximized?: boolean;
  /**
   * Controlled maximized state
   */
  isMaximized?: boolean;
  /**
   * Callback when maximized state changes
   */
  onMaximizeChange?: (isMaximized: boolean) => void;
}

// Spring animation configuration
const DEFAULT_SPRING = { type: 'spring' as const, stiffness: 300, damping: 30 };

// Default desktop animation
const defaultDesktopAnimation: AnimationConfig = {
  initial: { y: 0, scale: 0.9, opacity: 0 },
  animate: { y: 0, scale: 1, opacity: 1 },
  exit: { y: 0, scale: 0.9, opacity: 0 },
};

// Default bottom-sheet animation (slide up from bottom)
const defaultBottomSheetAnimation: AnimationConfig = {
  initial: { y: '100%', scale: 1, opacity: 1 },
  animate: { y: 0, scale: 1, opacity: 1 },
  exit: { y: '100%', scale: 1, opacity: 1 },
};

/**
 * Get resolved size from potential responsive config
 */
const getResponsiveSize = (
  size: ModalSize | Responsive<ModalSize>,
  isMobile: boolean
): ModalSize => {
  if (typeof size === 'string') return size;
  // If responsive object, prioritize based on screen size
  // For mobile/isMobile, we'd use base or sm, otherwise fallback chain
  if (isMobile) {
    return size.sm || size.base || 'medium';
  }
  return size.base || 'medium';
};

/**
 * An advanced modal with positioning, fullscreen, scroll-locking, glass variant,
 * and responsive bottom-sheet support for mobile devices.
 */
const ModalComponent = ({
  isOpen,
  onClose,
  children,
  title,
  'aria-label': ariaLabel,
  size = 'medium',
  footer,
  preventBackdropClick = false,
  position = 'center',
  fullScreen = false,
  lockScroll = true,
  variant = 'default',
  mobileVariant = 'modal',
  animationConfig,
  style,
  backdropStyle,
  maximizable = false,
  defaultMaximized = false,
  isMaximized: controlledMaximized,
  onMaximizeChange,
}: ModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<(() => void) | null>(null);
  const reactId = useId();
  const titleId = title ? `modal-title-${reactId.replace(/:/g, '')}` : undefined;

  // Internal maximization state
  const [internalMaximized, setInternalMaximized] = useState(defaultMaximized);
  const isMaximized = controlledMaximized ?? internalMaximized;

  // Check if on mobile
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Determine if we should render as bottom-sheet
  const isBottomSheet = isMobile && mobileVariant === 'bottom-sheet';

  // Memoize resolved size
  const resolvedSize = useMemo(() => getResponsiveSize(size, isMobile), [size, isMobile]);

  // Handle maximize toggle
  const handleMaximizeToggle = useCallback(() => {
    const newState = !isMaximized;
    if (controlledMaximized === undefined) {
      setInternalMaximized(newState);
    }
    onMaximizeChange?.(newState);
  }, [isMaximized, controlledMaximized, onMaximizeChange]);

  // Memoized backdrop click handler
  const handleBackdropClick = useCallback(() => {
    if (!preventBackdropClick) {
      onClose();
    }
  }, [preventBackdropClick, onClose]);

  // Body scroll lock
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

  // Focus management with requestAnimationFrame instead of setTimeout
  useEffect(() => {
    if (!isOpen) {
      restoreFocusRef.current?.();
      return;
    }

    restoreFocusRef.current = saveFocus();
    // Use requestAnimationFrame for smoother focus management
    let rafId: number;
    const focusWhenReady = () => {
      rafId = requestAnimationFrame(() => {
        const focusTarget = contentRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusTarget?.focus();
      });
    };
    focusWhenReady();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
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

  // Compute animation values based on position, mobile/bottom-sheet state, and custom config
  const animationValues = useMemo(() => {
    if (animationConfig) {
      return {
        initial: { opacity: 0, ...animationConfig.initial },
        animate: { opacity: 1, ...animationConfig.animate },
        exit: { opacity: 0, ...animationConfig.exit },
      };
    }

    if (isBottomSheet) {
      return {
        initial: {
          y: defaultBottomSheetAnimation.initial?.y ?? '100%',
          scale: defaultBottomSheetAnimation.initial?.scale ?? 1,
          opacity: defaultBottomSheetAnimation.initial?.opacity ?? 1,
        },
        animate: {
          y: defaultBottomSheetAnimation.animate?.y ?? 0,
          scale: defaultBottomSheetAnimation.animate?.scale ?? 1,
          opacity: defaultBottomSheetAnimation.animate?.opacity ?? 1,
        },
        exit: {
          y: defaultBottomSheetAnimation.exit?.y ?? '100%',
          scale: defaultBottomSheetAnimation.exit?.scale ?? 1,
          opacity: defaultBottomSheetAnimation.exit?.opacity ?? 1,
        },
      };
    }

    // Desktop modal animation
    const positionOffset: number = position === 'top' ? -50 : 0;
    const initialY = defaultDesktopAnimation.initial?.y ?? 0;
    const exitY = defaultDesktopAnimation.exit?.y ?? 0;
    
    return {
      initial: {
        y: positionOffset + (typeof initialY === 'number' ? initialY : 0),
        scale: defaultDesktopAnimation.initial?.scale ?? 0.9,
        opacity: defaultDesktopAnimation.initial?.opacity ?? 0,
      },
      animate: {
        y: typeof defaultDesktopAnimation.animate?.y === 'number' ? defaultDesktopAnimation.animate.y : 0,
        scale: defaultDesktopAnimation.animate?.scale ?? 1,
        opacity: defaultDesktopAnimation.animate?.opacity ?? 1,
      },
      exit: {
        y: positionOffset + (typeof exitY === 'number' ? exitY : 0),
        scale: defaultDesktopAnimation.exit?.scale ?? 0.9,
        opacity: defaultDesktopAnimation.exit?.opacity ?? 0,
      },
    };
  }, [animationConfig, isBottomSheet, position]);

  // Compute effective fullScreen
  const effectiveFullScreen = fullScreen || (isMobile && isBottomSheet && isMaximized) || isMaximized;

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalWrapper position={isBottomSheet ? 'center' : position} isBottomSheet={isBottomSheet}>
          <ModalBackdrop
            variant={variant}
            isBottomSheet={isBottomSheet}
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{
              opacity: 1,
              backdropFilter: variant === 'glass' ? 'blur(8px)' : 'blur(0px)',
            }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={DEFAULT_SPRING}
            onClick={handleBackdropClick}
            aria-hidden="true"
            style={backdropStyle}
          />
          <ModalContent
            ref={contentRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? titleId : undefined}
            aria-label={ariaLabel}
            size={resolvedSize}
            fullScreen={effectiveFullScreen}
            variant={variant}
            isBottomSheet={isBottomSheet}
            initial={animationValues.initial}
            animate={animationValues.animate}
            exit={animationValues.exit}
            transition={DEFAULT_SPRING}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            style={style}
          >
            <Card
              padding="large"
              variant={variant === 'glass' ? 'glass' : undefined}
              style={{ height: effectiveFullScreen ? '100%' : undefined }}
            >
              {title && (
                <ModalHeader>
                  <ModalTitle id={titleId}>{title}</ModalTitle>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {maximizable && (
                      <ModalCloseButton
                        onClick={handleMaximizeToggle}
                        aria-label={isMaximized ? 'Minimize modal' : 'Maximize modal'}
                        data-testid="maximize-button"
                      >
                        {isMaximized ? '⛶' : '□'}
                      </ModalCloseButton>
                    )}
                    <ModalCloseButton onClick={onClose} aria-label="Close modal">
                      ×
                    </ModalCloseButton>
                  </div>
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

/**
 * Modal component - A versatile modaldialog with support for:
 * - Different variants (modal, glass)
 * - Responsive sizing
 * - Mobile bottom-sheet transformation
 * - Spring animations
 * - Maximize/minimize state
 * - Custom animation configuration
 * - React.memo for performance optimization
 */
export const Modal = memo(ModalComponent);

// Display name for debugging
Modal.displayName = 'Modal';
