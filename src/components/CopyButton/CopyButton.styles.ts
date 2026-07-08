'use client';
import styled, { css, keyframes } from 'styled-components';
import { iconColor } from '../../styles/iconColor';

const iconSizes = {
  sm: '16px',
  md: '20px',
  lg: '24px',
};

const buttonSizes = {
  sm: {
    width: '32px',
    height: '32px',
    iconSize: iconSizes.sm,
  },
  md: {
    width: '40px',
    height: '40px',
    iconSize: iconSizes.md,
  },
  lg: {
    width: '48px',
    height: '48px',
    iconSize: iconSizes.lg,
  },
};

export const sizes = buttonSizes;

// Success state animation
export const successPulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const StyledCopyButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['size', '$isCopied', '$isError'].includes(prop),
})<{
  size: 'sm' | 'md' | 'lg';
  $isCopied: boolean;
  $isError: boolean;
}>`
  /* Reset and Core Styles */
  border: none;
  outline: none;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  /* Size Styles */
  width: ${({ size }) => buttonSizes[size].width};
  height: ${({ size }) => buttonSizes[size].height};

  /* Icon Color */
  color: ${({ theme, $isCopied, $isError }) => {
    if ($isError) return theme.colors.error || '#dc3545';
    if ($isCopied) return theme.colors.success || '#28a745';
    return theme.colors.text;
  }};

  /* Hover State */
  &:hover:not(:disabled) {
    color: ${({ theme, $isCopied, $isError }) => {
      if ($isError) return theme.colors.error || '#dc3545';
      if ($isCopied) return theme.colors.success || '#28a745';
      return theme.colors.primary;
    }};
  }

  /* Active State */
  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.softInset};
  }

  /* Disabled State */
  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.disabledText};
    opacity: 0.6;
  }

  /* Focus visible styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Animated success state */
  ${({ $isCopied }) =>
    $isCopied &&
    css`
      animation: ${successPulse} 0.3s ease-in-out;
    `}
`;

export const CopyButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${iconColor}
`;

export const SuccessIcon = styled.span<{
  $size: 'sm' | 'md' | 'lg';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  ${iconColor}
`;
