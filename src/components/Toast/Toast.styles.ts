import { motion } from 'framer-motion';
import styled, { css, keyframes } from 'styled-components';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

const getVariantColors = (theme: any, variant: ToastVariant) => {
  const isDark = theme.name === 'dark';
  switch (variant) {
    case 'success':
      return { main: '#28a745', bg: isDark ? '#1A3C2D' : '#E6F7F0' };
    case 'error':
      return { main: '#DC3545', bg: isDark ? '#502322' : '#FFF1F0' };
    case 'warning':
      return { main: '#FAAD14', bg: isDark ? '#4D411E' : '#FFFBE6' };
    case 'info':
      return { main: theme.colors.primary, bg: isDark ? '#1A2F6C' : '#E9F5FE' };
    case 'loading':
      return { main: theme.colors.primary, bg: isDark ? '#1A2F6C' : '#E9F5FE' };
    default:
      return { main: theme.colors.primary, bg: isDark ? '#1A2F6C' : '#E9F5FE' };
  }
};

const shrink = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const ToastContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['position'].includes(prop),
})<{ position: ToastPosition }>`
  position: fixed;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;

  ${({ position }) => {
    switch (position) {
      case 'top-right':
        return css`
          top: 24px;
          right: 24px;
          align-items: flex-end;
        `;
      case 'top-center':
        return css`
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          align-items: center;
        `;
      case 'top-left':
        return css`
          top: 24px;
          left: 24px;
          align-items: flex-start;
        `;
      case 'bottom-right':
        return css`
          bottom: 24px;
          right: 24px;
          align-items: flex-end;
        `;
      case 'bottom-center':
        return css`
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          align-items: center;
        `;
      case 'bottom-left':
        return css`
          bottom: 24px;
          left: 24px;
          align-items: flex-start;
        `;
    }
  }}
`;

export const ToastWrapper = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<{
  variant: ToastVariant;
}>`
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  width: 360px;
  max-width: calc(100vw - 48px);
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
  overflow: hidden;
  background: ${({ theme, variant }) => getVariantColors(theme, variant).bg};
  box-shadow: ${({ theme, variant }) => {
    const color = getVariantColors(theme, variant).main;
    return `7px 7px 14px ${color}25, -7px -7px 14px ${theme.colors.shadowLight}80`;
  }};
`;

export const ToastIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<{
  variant: ToastVariant;
}>`
  margin-right: 12px;
  font-size: 22px;
  margin-top: 2px;
  flex-shrink: 0;
  color: ${({ theme, variant }) => getVariantColors(theme, variant).main};

  & svg {
    display: block;
  }
`;

export const ToastContent = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

export const ToastTitle = styled.div`
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ToastDescription = styled.div`
  margin-top: 4px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.85;
`;

export const ToastAction = styled.div`
  margin-left: 12px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

export const ToastCloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #aaa;
  margin-left: 12px;
  font-size: 16px;
  flex-shrink: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ToastProgress = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant', 'duration'].includes(prop),
})<{
  variant: ToastVariant;
  duration: number;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
  background: ${({ theme, variant }) => getVariantColors(theme, variant).main};
  opacity: 0.6;
  animation: ${shrink} ${({ duration }) => duration}ms linear forwards;

  ${ToastWrapper}:hover & {
    animation-play-state: paused;
  }
`;

export const ToastSpinner = styled.div`
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: ${spin} 0.8s linear infinite;
`;
