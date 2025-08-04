import styled, { css, keyframes } from 'styled-components';

// Sizing for default and circle shapes
const sizes = {
  small: { height: '36px', padding: '0 16px', fontSize: '14px', radius: '10px', circleSize: '36px' },
  medium: { 
    height: '48px', 
    padding: '0 24px', 
    fontSize: '16px', 
    radius: ({ theme }: { theme: any }) => theme.borderRadius, 
    circleSize: '48px' 
  },
  large: { height: '56px', padding: '0 32px', fontSize: '18px', radius: '16px', circleSize: '56px' },
};

// Keyframes for the spinner animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// A simple CSS spinner component
export const Spinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
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

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Space between icon and text */
`;

export const StyledButton = styled.button<{
  size: 'small' | 'medium' | 'large';
  variant: 'primary' | 'secondary' | 'text';
  shape: 'default' | 'circle';
  fullWidth: boolean;
  hasChildren: boolean;
}>`
  /* Reset and Core Styles */
  border: none;
  outline: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  /* Size Styles */
  height: ${({ size }) => sizes[size].height};
  font-size: ${({ size }) => sizes[size].fontSize};

  /* Shape Styles */
  ${({ shape, size }) =>
    shape === 'circle'
      ? css`
          width: ${sizes[size].circleSize};
          border-radius: 50%;
          padding: 0;
        `
      : css`
          padding: ${sizes[size].padding};
          border-radius: ${sizes[size].radius};
        `}

  /* Variant Styles */
  ${({ variant }) => {
    switch (variant) {
      case 'text':
        return css`
          background: transparent;
          box-shadow: none;
          color: ${({ theme }) => theme.colors.primary};
          &:hover:not(:disabled) {
            background: #e0e5ec50;
          }
          &:active:not(:disabled) {
            background: #e0e5ec80;
          }
        `;
      default: // primary & secondary
        return css`
          background: ${({ theme }) => theme.colors.background};
          box-shadow: ${({ theme }) => theme.shadows.soft};
          color: ${({ variant, theme }) => variant === 'primary' ? theme.colors.primary : theme.colors.text};

          &:hover:not(:disabled) {
            color: ${({ theme }) => theme.colors.primary};
          }

          &:active:not(:disabled) {
            box-shadow: ${({ theme }) => theme.shadows.softInset};
            color: ${({ theme }) => theme.colors.primary};
          }
        `;
    }
  }}

  /* Disabled State */
  &:disabled {
    cursor: not-allowed;
    color: #aaa;
    background: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) => theme.shadows.softInset};
    
    ${Spinner} {
      border-top-color: #aaa;
    }
  }
`;