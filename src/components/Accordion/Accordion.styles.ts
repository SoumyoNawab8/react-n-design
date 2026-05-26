import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';

export interface AccordionWrapperProps {
  bordered: boolean;
  variant: 'default' | 'glass' | 'minimal';
  fullWidthMobile: boolean;
}

export const AccordionWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['bordered', 'variant', 'fullWidthMobile'].includes(prop),
})<AccordionWrapperProps>`
  border-radius: ${({ theme, variant }) =>
    variant === 'glass' ? '16px' : theme.borderRadius || '8px'};
  box-shadow: ${({ theme, variant }) => {
    if (variant === 'glass') {
      return '0 8px 32px rgba(0, 0, 0, 0.1)';
    }
    if (variant === 'minimal') {
      return 'none';
    }
    return theme.shadows?.soft || '0 2px 8px rgba(0,0,0,0.1)';
  }};
  background: ${({ theme, variant }) => {
    if (variant === 'glass') {
      return 'rgba(255, 255, 255, 0.7)';
    }
    return theme.colors?.background || '#fff';
  }};
  backdrop-filter: ${({ variant }) => (variant === 'glass' ? 'blur(12px)' : 'none')};
  -webkit-backdrop-filter: ${({ variant }) => (variant === 'glass' ? 'blur(12px)' : 'none')};
  overflow: hidden;
  max-width: 100%;
  border: ${({ bordered, theme, variant }) => {
    if (!bordered || variant === 'minimal') return 'none';
    if (variant === 'glass') {
      return '1px solid rgba(255, 255, 255, 0.3)';
    }
    return `1px solid ${theme.colors?.shadowDark ? `${theme.colors.shadowDark}40` : '#ddd'}`;
  }};

  /* Mobile optimizations */
  @media (max-width: 768px) {
    ${({ fullWidthMobile }) =>
      fullWidthMobile &&
      css`
        border-radius: 0;
        margin-left: -16px;
        margin-right: -16px;
        width: calc(100% + 32px);
        max-width: none;
      `}
  }
`;

export interface AccordionItemProps {
  isLast: boolean;
  variant?: 'default' | 'glass' | 'minimal';
}

export const AccordionItem = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['isLast', 'variant'].includes(prop),
})<AccordionItemProps>`
  ${({ isLast, theme, variant }) =>
    !isLast &&
    css`
      border-bottom: ${() => {
        if (variant === 'minimal') return `1px solid ${theme.colors?.border || '#eee'}`;
        if (variant === 'glass') {
          return '1px solid rgba(255, 255, 255, 0.2)';
        }
        return `1px solid ${theme.colors?.shadowDark ? `${theme.colors.shadowDark}40` : '#ddd'}`;
      }};
    `}
`;

export interface AccordionHeaderProps {
  isActive: boolean;
  variant?: 'default' | 'glass' | 'minimal';
  disabled?: boolean;
}

export const AccordionHeader = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'variant'].includes(prop),
})<AccordionHeaderProps>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background: ${({ isActive, theme, variant }) => {
    if (isActive) {
      if (variant === 'glass') {
        return 'rgba(255, 255, 255, 0.5)';
      }
      return theme.colors?.hoverBg || 'rgba(0,0,0,0.05)';
    }
    return 'transparent';
  }};
  border: none;
  font-size: 16px;
  font-weight: 600;
  text-align: left;
  transition: all 0.2s ease;
  color: ${({ isActive, theme, disabled, variant }) => {
    if (disabled) return theme.colors?.shadowDark || '#999';
    if (isActive) {
      if (variant === 'glass') {
        return theme.colors?.primary || '#1890ff';
      }
      return theme.colors?.primary || '#1890ff';
    }
    return theme.colors?.text || '#333';
  }};

  /* Ensure 44px minimum touch target on mobile */
  @media (pointer: coarse) {
    min-height: 44px;
    padding: 12px 16px;
  }

  /* Hover states - only on non-touch devices */
  @media (hover: hover) {
    &:hover:not(:disabled) {
      background-color: ${({ theme, variant }) => {
        if (variant === 'glass') {
          return 'rgba(255, 255, 255, 0.4)';
        }
        return theme.colors?.hoverBg || 'rgba(0,0,0,0.05)';
      }};
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.primary || '#1890ff'};
    outline-offset: -2px;
    position: relative;
    z-index: 1;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors?.shadowDark || '#999'};
    cursor: not-allowed;
    opacity: 0.6;
  }

  &[aria-disabled="true"] {
    color: ${({ theme }) => theme.colors?.shadowDark || '#999'};
    cursor: not-allowed;
    opacity: 0.6;
    pointer-events: none;
  }

  /* Glass variant specific styling */
  ${({ variant }) =>
    variant === 'glass' &&
    css`
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    `}
`;

export const AccordionLabel = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AccordionChevron = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-left: 16px;
  flex-shrink: 0;

  /* Larger touch target on mobile */
  @media (pointer: coarse) {
    min-width: 44px;
    min-height: 44px;
    margin-right: -8px;
  }

  svg {
    display: block;
  }
`;

export const AccordionPanel = styled(motion.div)`
  overflow: hidden;
  background: ${({ theme }) => theme.colors?.background || 'transparent'};

  /* Inner div provides padding */
  & > div {
    padding: 4px 20px 20px 20px;
    color: ${({ theme }) => theme.colors?.text || '#333'};
    line-height: 1.5;

    /* Adjusted padding on mobile */
    @media (pointer: coarse) {
      padding: 4px 16px 16px 16px;
    }
  }
`;
