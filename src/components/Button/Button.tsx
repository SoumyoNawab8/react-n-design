'use client';
import type React from 'react';
import { motion } from '../../utils/lazyMotion';
import { ButtonContent, ButtonIcon, Spinner, StyledButton } from './Button.styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  as?: React.ElementType;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'text';
  shape?: 'default' | 'circle';
  fullWidth?: boolean;
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  'aria-label'?: string;
}

/**
 * The ultimate neomorphic button, packed with features like icons,
 * loading states, multiple shapes, and variants.
 */
export const Button = ({
  children,
  as,
  size = 'medium',
  variant = 'primary',
  shape = 'default',
  fullWidth = false,
  disabled = false,
  loading = false,
  loadingText,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  const content = loading ? (
    <>
      <Spinner role="img" aria-label="Loading" />
      {loadingText && <span>{loadingText}</span>}
    </>
  ) : (
    <>
      {leftIcon && <ButtonIcon>{leftIcon}</ButtonIcon>}
      {children && <span>{children}</span>}
      {rightIcon && <ButtonIcon>{rightIcon}</ButtonIcon>}
    </>
  );

  return (
    <motion.div
      whileTap={isDisabled ? {} : { scale: 0.95 }}
      style={{ width: fullWidth ? '100%' : 'auto', display: 'inline-block' }}
    >
      <StyledButton
        as={as}
        size={size}
        variant={variant}
        shape={shape}
        fullWidth={fullWidth}
        disabled={isDisabled}
        hasChildren={!!children}
        aria-busy={loading}
        aria-disabled={isDisabled || undefined}
        {...props}
      >
        <ButtonContent>{content}</ButtonContent>
      </StyledButton>
    </motion.div>
  );
};
