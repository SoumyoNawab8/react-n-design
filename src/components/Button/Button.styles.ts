import styled, { css, keyframes } from 'styled-components';

// Sizing for default and circle shapes - updated with minimum touch targets
const sizes = {
  small: {
    height: '44px', // increased for touch target
    padding: '0 16px',
    fontSize: '14px',
    circleSize: '44px', // increased for touch target
    mobileHeight: '44px',
  },
  medium: {
    height: '48px',
    padding: '0 24px',
    fontSize: '16px',
    circleSize: '48px',
    mobileHeight: '48px',
  },
  large: {
    height: '56px',
    padding: '0 32px',
    fontSize: '18px',
    circleSize: '56px',
    mobileHeight: '58px',
  },
};

// Keyframes for the spinner animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Ripple animation keyframes
const ripple = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

// A simple CSS spinner component
export const Spinner = styled.div`
  border: 2px solid ${({ theme }) => `${theme.colors.shadowDark}40`};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 1em;
  height: 1em;
  animation: ${spin} 0.8s linear infinite;
`;

export const ButtonIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

// Ripple effect component
export const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ${ripple} 600ms linear;
  background-color: ${({ theme }) => `${theme.colors.primary}30`};
  width: 20px;
  height: 20px;
  margin-left: -10px;
  margin-top: -10px;
  pointer-events: none;
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  position: relative;
  z-index: 1;
`;

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !['size', 'variant', 'shape', 'fullWidth', 'hasChildren', 'glassMorphism', 'gradient'].includes(prop),
})<{
  size: 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary' | 'text' | 'danger' | 'success' | 'ghost';
  shape: 'default' | 'circle';
  fullWidth: boolean;
  hasChildren: boolean;
  glassMorphism?: boolean;
  gradient?: boolean;
}>`
  /* Reset and Core Styles */
  border: none;
  outline: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  position: relative;
  overflow: hidden;

  /* Size Styles - minimum 44px touch target */
  height: ${({ size }) => sizes[size].height};
  min-height: 44px;
  min-width: 44px;
  font-size: ${({ size }) => sizes[size].fontSize};

  /* Shape Styles */
  ${({ shape, size, theme }) =>
    shape === 'circle'
      ? css`
          width: ${sizes[size].circleSize};
          border-radius: 50%;
          padding: 0;
        `
      : css`
          padding: ${sizes[size].padding};
          border-radius: ${theme.borderRadius};
        `}

  /* Glass Morphism Styles */
  ${({ glassMorphism, theme }) =>
    glassMorphism
      ? css`
          background: ${theme.colors.cardBg}80;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid ${theme.colors.white}20;
        `
      : ''}

  /* Gradient Styles */
  ${({ gradient, theme }) =>
    gradient
      ? css`
          background: linear-gradient(
            135deg,
            ${theme.colors.background} 0%,
            ${theme.colors.cardBg} 100%
          );
        `
      : ''}

  /* Variant Styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'text':
        return css`
          background: transparent;
          box-shadow: none;
          color: ${theme.colors.primary};
          &:hover:not(:disabled) {
            background: ${theme.colors.hoverBg}50;
            transform: translateY(-1px);
          }
          &:active:not(:disabled) {
            background: ${theme.colors.hoverBg}80;
            transform: translateY(0);
          }
        `;
      case 'danger':
        return css`
          background: ${theme.colors.background};
          box-shadow: ${theme.shadows.soft};
          color: ${theme.colors.error};
          
          &:hover:not(:disabled) {
            color: ${theme.colors.error};
            background: ${theme.colors.hoverBg};
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            box-shadow: ${theme.shadows.softInset};
            color: ${theme.colors.error};
            transform: translateY(0);
          }
        `;
      case 'success':
        return css`
          background: ${theme.colors.background};
          box-shadow: ${theme.shadows.soft};
          color: ${theme.colors.success};
          
          &:hover:not(:disabled) {
            color: ${theme.colors.success};
            background: ${theme.colors.hoverBg};
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            box-shadow: ${theme.shadows.softInset};
            color: ${theme.colors.success};
            transform: translateY(0);
          }
        `;
      case 'ghost':
        return css`
          background: transparent;
          box-shadow: none;
          color: ${theme.colors.text};
          border: 1px solid transparent;
          
          &:hover:not(:disabled) {
            background: ${theme.colors.hoverBg}30;
            border-color: ${theme.colors.border};
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            background: ${theme.colors.hoverBg}50;
            transform: translateY(0);
          }
        `;
      default: // primary & secondary
        return css`
          background: ${theme.colors.background};
          box-shadow: ${theme.shadows.soft};
          color: ${variant === 'primary' ? theme.colors.primary : theme.colors.text};

          &:hover:not(:disabled) {
            color: ${theme.colors.primary};
            transform: translateY(-1px);
          }

          &:active:not(:disabled) {
            box-shadow: ${theme.shadows.softInset};
            color: ${theme.colors.primary};
            transform: translateY(0);
          }
        `;
    }
  }}

  /* Disabled State */
  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.shadowDark};
    background: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) => theme.shadows.softInset};
    transform: none !important;
    opacity: 0.7;
    
    ${Spinner} {
      border-top-color: #aaa;
    }
  }

  /* Focus visible styles for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Responsive adjustments */
  @media (max-width: 640px) {
    /* Ensure touch targets are accessible on mobile */
    min-height: 44px;
    min-width: 44px;
  }

  /* Prefers-reduced-motion support */
  @media (prefers-reduced-motion: reduce) {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }

  /* Smooth transitions for hover effects */
  transition: all 0.2s ease-in-out;
`;
