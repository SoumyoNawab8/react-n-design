import styled, { css, keyframes } from 'styled-components';
import { motion } from '../../utils/lazyMotion';
import { iconColor } from '../../styles/iconColor';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

export interface ToastStyleProps {
  variant?: ToastVariant;
  isGlass?: boolean;
  isStacked?: boolean;
  index?: number;
  stackCount?: number;
}

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

const swipeOut = keyframes`
  from {
    transform: translateX(var(--swipe-x, 0));
    opacity: var(--swipe-opacity, 1);
  }
  to {
    transform: translateX(100%);
    opacity: 0;
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
          @media (max-width: 640px) {
            top: 16px;
            right: 16px;
            left: 16px;
            align-items: stretch;
          }
        `;
      case 'top-center':
        return css`
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          align-items: center;
          @media (max-width: 640px) {
            top: 16px;
            left: 16px;
            right: 16px;
            transform: none;
            align-items: stretch;
          }
        `;
      case 'top-left':
        return css`
          top: 24px;
          left: 24px;
          align-items: flex-start;
          @media (max-width: 640px) {
            top: 16px;
            left: 16px;
            right: 16px;
            align-items: stretch;
          }
        `;
      case 'bottom-right':
        return css`
          bottom: 24px;
          right: 24px;
          align-items: flex-end;
          @media (max-width: 640px) {
            bottom: 16px;
            right: 16px;
            left: 16px;
            align-items: stretch;
          }
        `;
      case 'bottom-center':
        return css`
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          align-items: center;
          @media (max-width: 640px) {
            bottom: 16px;
            left: 16px;
            right: 16px;
            transform: none;
            align-items: stretch;
          }
        `;
      case 'bottom-left':
        return css`
          bottom: 24px;
          left: 24px;
          align-items: flex-start;
          @media (max-width: 640px) {
            bottom: 16px;
            left: 16px;
            right: 16px;
            align-items: stretch;
          }
        `;
    }
  }}
`;

export const ToastWrapper = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => ![ 'variant', 'isGlass', 'isStacked', 'index', 'stackCount'].includes(prop),
})<
  Required<Pick<ToastStyleProps, 'variant' | 'isGlass' | 'isStacked' | 'index' | 'stackCount'>>
>`
  pointer-events: auto;
  display: flex;
  align-items: flex-start;
  width: 360px;
  max-width: calc(100vw - 48px);
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
  overflow: hidden;
  touch-action: pan-y;
  user-select: none;
  
  @media (max-width: 640px) {
    width: 100%;
    max-width: 100%;
  }

  background: ${({ theme, variant, isGlass }) => {
    if (isGlass) {
      return 'rgba(255, 255, 255, 0.08)';
    }
    return getVariantColors(theme, variant).bg;
  }};
  
  box-shadow: ${({ theme, variant, isGlass }) => {
    if (isGlass) {
      return '0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.18)';
    }
    const color = getVariantColors(theme, variant).main;
    return `7px 7px 14px ${color}25, -7px -7px 14px ${theme.colors.shadowLight}80`;
  }};
  
  backdrop-filter: ${({ isGlass }) =>
    isGlass ? 'blur(12px) saturate(180%)' : 'none'};
  -webkit-backdrop-filter: ${({ isGlass }) =>
    isGlass ? 'blur(12px) saturate(180%)' : 'none'};
  border: ${({ isGlass, theme }) =>
    isGlass ? `1px solid rgba(255, 255, 255, 0.18)` : 'none'};

  ${({ isStacked, index , stackCount }) => {
    if (!isStacked || index === undefined || stackCount === undefined) return '';
    
    // Stack design - toasts scale and recede into depth
    const offset = index * -20;
    const scale = 1 - index * 0.05;
    const opacity = 1 - index * 0.15;
    const zIndex = stackCount - index;
    
    return css`
      position: absolute;
      top: ${offset}px;
      transform: scale(${Math.max(scale, 0.85)}) translateZ(0);
      opacity: ${Math.max(opacity, 0.4)};
      z-index: ${zIndex};
      pointer-events: ${index === 0 ? 'auto' : 'none'};
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &.expanded {
        position: relative;
        top: 0;
        transform: none;
        opacity: 1;
        z-index: auto;
        pointer-events: auto;
      }
    `;
  }}

  &.swipe-out {
    animation: ${swipeOut} 0.2s ease-out forwards;
  }

  &:hover {
    cursor: ${({ isStacked, index }) => (isStacked && index !== 0 ? 'pointer' : 'default')};
  }
`;

export const ToastIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant', 'isGlass'].includes(prop),
})<{ variant: ToastVariant; isGlass?: boolean }>`
  margin-right: 12px;
  font-size: 22px;
  margin-top: 2px;
  flex-shrink: 0;
  color: ${({ theme, variant, isGlass }) => {
    const mainColor = getVariantColors(theme, variant).main;
    return isGlass ? mainColor : mainColor;
  }};
  ${iconColor}

  & svg {
    display: block;
  }
`;

export const ToastAvatar = styled.div`
  margin-right: 12px;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  
  img, .avatar-placeholder {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
    font-size: 14px;
    font-weight: 600;
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

export const ToastRichContent = styled.div`
  margin-top: 8px;
`;

export const ToastMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
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
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-left: 12px;
  font-size: 16px;
  flex-shrink: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${iconColor}

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
  border: 2px solid ${({ theme }) => `${theme.colors.textSecondary}40`};
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: ${spin} 0.8s linear infinite;
`;

export const ToastSwipeIndicator = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
  
  &.left {
    left: 0;
    background: ${({ theme }) => theme.colors.primary};
  }
  
  &.right {
    right: 0;
    background: ${({ theme }) => theme.colors.error};
  }
`;
