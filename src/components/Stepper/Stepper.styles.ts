'use client';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { iconColor } from '../../styles/iconColor';
import type { StepperConnectorStyles } from './Stepper';

// Glassmorphism variant styles
const glassMorphism = css`
  background: ${({ theme }) => theme.colors.background}80;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid ${({ theme }) => theme.colors.border || `${theme.colors.shadowLight}40`};
`;

const glassItem = css`
  ${glassMorphism}
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

export const StepperWrapper = styled(motion.div)<{
  $orientation?: 'horizontal' | 'vertical';
  $variant?: 'default' | 'glass';
}>`
  display: flex;
  width: 100%;
  
  ${({ $orientation }) =>
    $orientation === 'vertical'
      ? css`
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
        `
      : css`
          flex-direction: row;
          justify-content: space-between;
        `}

  ${({ $variant }) => $variant === 'glass' && glassMorphism}

  padding: ${({ $variant }) => ($variant === 'glass' ? '16px' : '0')};
  border-radius: ${({ $variant }) => ($variant === 'glass' ? '16px' : '0')};
`;

export const StepperItem = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !['$isActive', '$isCompleted', '$isClickable', '$orientation', '$variant', '$iconOnly'].includes(prop),
})<{
  $isActive?: boolean;
  $isCompleted?: boolean;
  $isClickable?: boolean;
  $orientation?: 'horizontal' | 'vertical';
  $variant?: 'default' | 'glass';
  $iconOnly?: boolean;
}>`
  display: flex;
  position: relative;
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  
  ${({ $orientation, $iconOnly }) =>
    $orientation === 'horizontal'
      ? css`
          flex-direction: column;
          align-items: center;
          flex: 1;
          padding: ${$iconOnly ? '8px' : '0 8px'};
        `
      : css`
          flex-direction: row;
          align-items: flex-start;
          width: 100%;
          padding: 12px;
          gap: 16px;
        `}

  ${({ $isClickable, $isActive }) =>
    $isClickable &&
    css`
      &:hover {
        ${({ theme }) =>
          !$isActive &&
          css`
            opacity: 0.8;
          `}
      }
    `}

  /* Increased touch target for mobile */
  @media (hover: none) and (pointer: coarse) {
    min-height: 44px;
    min-width: 44px;
  }

  ${({ $variant }) => $variant === 'glass' && glassItem}
  ${({ $variant, $isActive }) =>
    $variant === 'glass' && $isActive ? 'border-color: var(--primary);' : ''}

  border-radius: ${({ $variant }) => ($variant === 'glass' ? '12px' : '0')};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const StepperCircle = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !['$isActive', '$isCompleted', '$orientation', '$variant', '$iconOnly'].includes(prop),
})<{
  $isActive?: boolean;
  $isCompleted?: boolean;
  $orientation?: 'horizontal' | 'vertical';
  $variant?: 'default' | 'glass';
  $iconOnly?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  z-index: 1;
  flex-shrink: 0;
  
  ${({ $iconOnly }) =>
    $iconOnly
      ? css`
          width: 44px;
          height: 44px;
          font-size: 18px;
          border-radius: 12px;
        `
      : css`
          width: 36px;
          height: 36px;
          font-size: 14px;
          border-radius: 50%;
        `}

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $isActive, $isCompleted, $variant, theme }) => {
    if ($isActive) {
      return css`
        background: ${theme.colors.primary};
        color: ${theme.colors.background};
        box-shadow: ${theme.shadows.soft};
        transform: scale(1.05);
      `;
    }
    if ($isCompleted) {
      return css`
        background: ${theme.colors.primary};
        color: ${theme.colors.background};
      `;
    }
    return css`
      background: ${$variant === 'glass' ? `${theme.colors.background}60` : theme.colors.background};
      color: ${theme.colors.text};
      box-shadow: ${theme.shadows.softInset};
    `;
  }}
  ${iconColor}

  /* Glass morphism variant additions */
  ${({ $variant, $isActive, theme }) =>
    $variant === 'glass' &&
    !$isActive &&
    css`
      backdrop-filter: blur(4px);
      border: 1px solid ${theme.colors.border || `${theme.colors.shadowLight}30`};
    `}

  /* Icon-only variant mobile optimization */
  @media (hover: none) and (pointer: coarse) {
    ${({ $iconOnly }) =>
      $iconOnly
        ? css`
            width: 48px;
            height: 48px;
            font-size: 20px;
          `
        : css`
            width: 40px;
            height: 40px;
          `}
  }
`;

export const StepperTitle = styled.span.withConfig({
  shouldForwardProp: (prop) => !['$isActive', '$variant'].includes(prop),
})<{
  $isActive?: boolean;
  $variant?: 'default' | 'glass';
}>`
  margin-top: 8px;
  font-size: 13px;
  font-weight: ${({ $isActive }) => ($isActive ? '600' : '400')};
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : theme.colors.text)};
  text-align: center;
  line-height: 1.3;
  transition: all 0.2s ease;
`;

export const StepperDescription = styled.span.withConfig({
  shouldForwardProp: (prop) => !['$variant'].includes(prop),
})<{
  $variant?: 'default' | 'glass';
}>`
  margin-top: 4px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.shadowLight};
  text-align: center;
  max-width: 120px;
  line-height: 1.3;
`;

export const StepperConnector = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !['$isCompleted', '$orientation', '$variant', '$connectorStyles'].includes(prop),
})<{
  $isCompleted?: boolean;
  $orientation?: 'horizontal' | 'vertical';
  $variant?: 'default' | 'glass';
  $connectorStyles?: StepperConnectorStyles;
}>`
  position: absolute;
  z-index: 0;
  background: ${({ theme, $connectorStyles }) =>
    $connectorStyles?.pendingColor || `${theme.colors.shadowDark}40`};
  overflow: hidden;

  ${({ $orientation, $connectorStyles }) =>
    $orientation === 'horizontal'
      ? css`
          top: 17px;
          left: calc(50% + 20px);
          right: calc(-50% + 20px);
          height: ${$connectorStyles?.height ?? 2}px;
        `
      : css`
          top: 40px;
          left: 28px;
          width: ${$connectorStyles?.height ?? 2}px;
          bottom: -16px;
        `}

  /* Animated progress line */
  &::before {
    content: '';
    position: absolute;
    ${({ $orientation }) =>
      $orientation === 'horizontal'
        ? css`
            top: 0;
            left: 0;
            height: 100%;
            width: var(--progress, '0%');
          `
        : css`
            top: 0;
            left: 0;
            width: 100%;
            height: var(--progress, '0%');
          `}
    background: ${({ theme, $connectorStyles }) =>
      $connectorStyles?.completedColor || theme.colors.primary};
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      height 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Glass variant adjustments */
  ${({ $variant }) =>
    $variant === 'glass' &&
    css`
      backdrop-filter: blur(2px);
    `}
`;

export const StepperContent = styled(motion.div)<{
  $orientation?: 'horizontal' | 'vertical';
}>`
  width: 100%;
  padding: ${({ $orientation }) => ($orientation === 'vertical' ? '16px 0 16px 16px' : '16px 0')};
`;

export const StepperActions = styled(motion.div)`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;

  /* Mobile optimization */
  @media (hover: none) and (pointer: coarse) {
    gap: 16px;
    margin-top: 24px;

    button {
      min-height: 48px;
      min-width: 48px;
      padding: 12px 24px;
    }
  }
`;
