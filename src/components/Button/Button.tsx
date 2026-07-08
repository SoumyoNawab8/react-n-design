'use client';
import type React from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from '../../utils/lazyMotion';
import { useReducedMotion } from '../../context/ThemeContext';
import {
  ButtonContent,
  ButtonIcon,
  Ripple,
  Spinner,
  StyledButton,
} from './Button.styles';

type Size = 'small' | 'medium' | 'large';
type Variant = 'primary' | 'secondary' | 'text' | 'danger' | 'success' | 'ghost';
type Shape = 'default' | 'circle';

interface ResponsiveSizeConfig {
  sm: Size;
  md: Size;
  lg: Size;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  as?: React.ElementType;
  size?: Size | ResponsiveSizeConfig;
  variant?: Variant;
  shape?: Shape;
  fullWidth?: boolean | { sm: boolean; md: boolean; lg: boolean };
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  'aria-label'?: string;
  glassMorphism?: boolean;
  gradient?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Get size based on current breakpoint for responsive sizing
 */
const useResponsiveSize = (
  size: Size | ResponsiveSizeConfig
): Size => {
  const [currentSize, setCurrentSize] = useState<Size>(
    typeof size === 'string' ? size : size.md
  );

  useEffect(() => {
    if (typeof size === 'string') return;

    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCurrentSize(size.sm);
      } else if (width < 1024) {
        setCurrentSize(size.md);
      } else {
        setCurrentSize(size.lg);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [size]);

  return typeof size === 'string' ? size : currentSize;
};

/**
 * The ultimate neomorphic button, packed with features like icons,
 * loading states, multiple shapes, variants, glass morphism, and more.
 * v1.2.0 - Now with memoization, spring animations, and enhanced customization
 */
const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  as,
  size: sizeProp = 'medium',
  variant = 'primary',
  shape = 'default',
  fullWidth: fullWidthProp = false,
  disabled = false,
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  glassMorphism = false,
  gradient = false,
  className,
  style,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const prefersReducedMotion = useReducedMotion();

  const size = useResponsiveSize(sizeProp);
  const resolvedFullWidth = useMemo(() => {
    if (typeof fullWidthProp === 'boolean') return fullWidthProp;
    const width = window.innerWidth;
    if (width < 640) return fullWidthProp.sm;
    if (width < 1024) return fullWidthProp.md;
    return fullWidthProp.lg;
  }, [fullWidthProp]);

  const isDisabled = disabled || loading;

  // Memoized click handler with ripple effect
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!prefersReducedMotion && !isDisabled) {
        const rect = buttonRef.current?.getBoundingClientRect();
        if (rect) {
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const id = Date.now() + Math.random();
          setRipples((prev) => [...prev, { x, y, id }]);
          setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
          }, 600);
        }
      }
      onClick?.(event);
    },
    [onClick, isDisabled, prefersReducedMotion]
  );

  // Memoized key down handler
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as unknown as React.MouseEvent<HTMLButtonElement>);
      }
    },
    [onClick]
  );

  // Spring animation config
  const springConfig = useMemo(
    () => ({
      stiffness: prefersReducedMotion ? 1000 : 400,
      damping: prefersReducedMotion ? 100 : 25,
    }),
    [prefersReducedMotion]
  );

  // Memoized whileTap config to prevent recreation on each render
  const whileTapConfig = useMemo(
    () => (isDisabled || prefersReducedMotion ? {} : { scale: 0.95 }),
    [isDisabled, prefersReducedMotion]
  );

  // Memoized whileHover config for subtle lift
  const whileHoverConfig = useMemo(
    () => (isDisabled || prefersReducedMotion ? {} : { y: -1 }),
    [isDisabled, prefersReducedMotion]
  );

  // Memoized content to prevent unnecessary re-renders
  const content = useMemo(() => {
    if (loading) {
      return (
        <>
          <Spinner role="img" aria-label="Loading" />
          {loadingText && <span>{loadingText}</span>}
        </>
      );
    }
    return (
      <>
        {leftIcon && <ButtonIcon>{leftIcon}</ButtonIcon>}
        {children && <span>{children}</span>}
        {rightIcon && <ButtonIcon>{rightIcon}</ButtonIcon>}
      </>
    );
  }, [loading, loadingText, leftIcon, children, rightIcon]);

  return (
    <motion.div
      whileTap={whileTapConfig}
      whileHover={whileHoverConfig}
      transition={springConfig}
      style={{ width: resolvedFullWidth ? '100%' : 'auto', display: 'inline-block' }}
    >
      <StyledButton
        ref={buttonRef}
        as={as}
        size={size}
        variant={variant}
        shape={shape}
        fullWidth={resolvedFullWidth}
        disabled={isDisabled}
        hasChildren={!!children}
        glassMorphism={glassMorphism}
        gradient={gradient}
        aria-busy={loading}
        aria-disabled={isDisabled || undefined}
        className={className}
        style={style}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <ButtonContent>
          {ripples.map((ripple) => (
            <Ripple
              key={ripple.id}
              style={{
                left: ripple.x,
                top: ripple.y,
              }}
            />
          ))}
          {content}
        </ButtonContent>
      </StyledButton>
    </motion.div>
  );
};

// Display name for debugging
ButtonComponent.displayName = 'Button';

// Memoize the entire component for performance
export const Button = memo(ButtonComponent);
