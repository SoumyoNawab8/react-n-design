'use client';
import styled, { css, keyframes } from 'styled-components';
import { motion } from '../../utils/lazyMotion';
import { iconColor } from '../../styles/iconColor';

const sizes = {
  small: { height: '36px', fontSize: '14px', padding: '6px 12px', minHeight: '36px' },
  medium: { height: '48px', fontSize: '16px', padding: '8px 16px', minHeight: '48px' },
  large: { height: '56px', fontSize: '18px', padding: '10px 20px', minHeight: '56px' },
};

const variants = {
  default: css`
    box-shadow: ${({ theme }) => theme.shadows.softInset};
  `,
  filled: css`
    box-shadow: none;
  `,
  outlined: css`
    box-shadow: none;
    border: 2px solid ${({ theme }) => theme.colors.border};
  `,
};

// Chip animations
const chipExit = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.8);
  }
`;

export const SelectWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth?: boolean }>`
  position: relative;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '100%')};
  max-width: ${({ fullWidth }) => (fullWidth ? 'none' : '300px')};
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    max-width: ${({ fullWidth }) => (fullWidth ? 'none' : '100%')};
  }
`;

// Chip container for multi-select
export const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex-grow: 1;
  align-items: center;
`;

export const ChipItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isExiting' && prop !== 'size',
})<{ isExiting?: boolean; size: string }>`
  display: flex;
  align-items: center;
  animation: ${({ isExiting }) =>
    isExiting
      ? css`
          ${chipExit} 0.2s ease-out forwards
        `
      : 'none'};
  opacity: ${({ isExiting }) => (isExiting ? 0 : 1)};
  transition: opacity 0.2s ease-out, transform 0.2s ease-out;
`;

export const SelectTrigger = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['size', 'variant', 'isOpen', 'hasError', 'disabled', 'isMulti', 'fullWidth'].includes(prop),
})<{
  size: 'small' | 'medium' | 'large';
  variant: 'default' | 'filled' | 'outlined';
  isOpen: boolean;
  hasError: boolean;
  disabled: boolean;
  isMulti: boolean;
  fullWidth: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '100%')};
  cursor: pointer;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: all 0.2s ease-in-out;
  min-height: ${({ size }) => sizes[size].minHeight};
  height: ${({ isMulti }) => (isMulti ? 'auto' : sizes.medium.minHeight)};
  padding: ${({ size }) => sizes[size].padding};
  font-size: ${({ size }) => sizes[size].fontSize};

  box-sizing: border-box;

  ${({ variant }) => variants[variant]}

  ${({ isMulti }) =>
    isMulti &&
    css`
      align-items: flex-start;
      padding-top: 8px;
      padding-bottom: 8px;
    `}

  ${({ isOpen, hasError, theme }) =>
    (isOpen || hasError) &&
    css`
      box-shadow: ${theme.shadows.softInset}, 0 0 0 2px ${hasError ? '#e53e3e' : theme.colors.primary}40;
    `}

  ${({ disabled, theme }) =>
    disabled &&
    css`
      cursor: not-allowed;
      background-color: ${theme.colors.hoverBg};
      opacity: 0.6;
    `}

  /* Touch-friendly for mobile */
  @media (max-width: 768px) {
    min-height: ${({ size }) => sizes[size].minHeight};
    ${({ isMulti }) =>
      isMulti &&
      css`
        min-height: ${sizes.medium.minHeight};
      `}
  }
`;

export const SelectValue = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;

export const SelectPlaceholder = styled(SelectValue)`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const SelectIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  ${iconColor}
`;

export const SelectChevron = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  color: ${({ theme }) => theme.colors.text};
  ${iconColor}
`;

export const ClearButton = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
  ${iconColor}

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Search input inside dropdown or trigger for multi-select
export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#e2e8f0'};
`;

export const SearchIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  flex-shrink: 0;
  ${iconColor}
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  padding: 4px 0;
  font-size: inherit;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  min-width: 60px;
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  /* Touch-friendly for mobile */
  @media (max-width: 768px) {
    font-size: 16px; /* Prevents zoom on iOS */
  }
`;

// Virtual list wrapper
export const VirtualListWrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  overflow: hidden;
`;

export const SelectDropdown = styled(motion.div)<{ size?: 'small' | 'medium' | 'large' }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  z-index: 800;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  max-height: ${({ size }) =>
    size === 'small' ? '200px' : size === 'large' ? '300px' : '250px'};

  /* Touch-friendly for mobile - full screen dropdown */
  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-height: 60vh;
    border-radius: 16px 16px 0 0;
    z-index: 9999;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  }
`;

// Option transition
export const SelectOption = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'disabled'].includes(prop),
})<{ isActive: boolean; disabled?: boolean }>`
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease-out;
  margin: 2px 0;
  font-size: inherit;

  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.colors.disabledText};
      cursor: not-allowed;
      background: ${theme.colors.hoverBg};
      opacity: 0.7;
    `}

  ${({ isActive, theme }) =>
    isActive &&
    css`
      font-weight: 600;
      color: ${theme.colors.primary};
      background: ${theme.colors.primary}10;
    `}

  ${({ disabled, theme }) =>
    !disabled &&
    css`
      &:hover {
        background: ${theme.colors.hoverBg};
        transform: translateX(2px);
      }

      &:active {
        transform: translateX(0);
      }
    `}

  /* Touch-friendly for mobile */
  @media (max-width: 768px) {
    padding: 14px 16px;
    min-height: 44px;
    font-size: 16px;
  }
`;

// Empty state
export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 16px;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const EmptyStateIcon = styled.div`
  font-size: 32px;
  opacity: 0.5;
`;

export const EmptyStateText = styled.div`
  font-size: 14px;
  text-align: center;
`;

// Loading spinner
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  border: 2px solid ${({ theme }) => `${theme.colors.textSecondary}40`};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: ${spin} 0.8s linear infinite;
`;

// Group header
export const GroupHeader = styled.div`
  padding: 8px 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Mobile overlay backdrop
export const MobileBackdrop = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9998;
  }
`;
