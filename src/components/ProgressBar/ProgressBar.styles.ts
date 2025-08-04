import styled, { css, keyframes } from 'styled-components';
import { Theme } from '../../styles/theme'; // We can import the Type for type safety

// 2. This helper function now receives the theme to get the primary color
const getStatusColor = (theme: Theme, status: 'normal' | 'success' | 'error') => {
  switch (status) {
    case 'success':
      return '#28a745';
    case 'error':
      return '#dc3545';
    case 'normal':
    default:
      return theme.colors.primary;
  }
};

const stripes = keyframes`
  from { background-position: 40px 0; }
  to { background-position: 0 0; }
`;

const indeterminate = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const sizes = {
  small: css`
    height: 10px;
  `,
  medium: css`
    height: 16px;
  `,
};

export const ProgressBarWrapper = styled.div<{ size: 'small' | 'medium' }>`
  position: relative;
  width: 100%;
  /* 3. Access theme from props */
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  overflow: hidden;

  ${({ size }) => sizes[size]};
`;

export const ProgressBarFill = styled.div<{
  status: 'normal' | 'success' | 'error';
  variant: 'default' | 'striped';
  isIndeterminate: boolean;
}>`
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  
  /* 4. Use the helper function to set the color */
  background-color: ${({ status, theme }) => getStatusColor(theme, status)};
  
  ${({ variant }) =>
    variant === 'striped' &&
    css`
      background-image: linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.15) 25%, transparent 25%,
        transparent 50%, rgba(255, 255, 255, 0.15) 50%,
        rgba(255, 255, 255, 0.15) 75%, transparent 75%,
        transparent
      );
      background-size: 40px 40px;
      animation: ${stripes} 2s linear infinite;
    `}

  ${({ isIndeterminate, status, theme }) =>
    isIndeterminate &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${getStatusColor(theme, status)};
        animation: ${indeterminate} 1.5s ease-in-out infinite;
      }
    `}
`;

export const ProgressLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  font-weight: 700;
  color: #fff; /* White text works well on all status colors */
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
`;