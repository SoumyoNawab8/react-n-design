'use client';
import styled, { css, keyframes } from 'styled-components';

// Progress animation for autoplay indicator
const progress = keyframes`
  from { width: 0%; }
  to { width: 100%; }
`;

// Pulse animation for active dot
const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius || '16px'};
  background: ${({ theme }) => theme.colors?.background || '#e0e5ec'};
  box-shadow: ${({ theme }) => theme.shadows?.soft || '8px 8px 16px #b8b9be, -8px -8px 16px #ffffff'};
`;

export const CarouselViewport = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  cursor: grab;
  
  &:active {
    cursor: grabbing;
  }

  @media (max-width: 768px) {
    height: 280px;
  }
`;

export const CarouselTrack = styled.div<{ $translateX: number }>`
  display: flex;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${(props) => props.$translateX}%);
`;

export const CarouselSlide = styled.div<{ $isActive: boolean }>`
  flex: 0 0 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.$isActive ? 1 : 0.6)};
  transform: ${(props) => (props.$isActive ? 'scale(1)' : 'scale(0.95)')};
  transition: opacity 0.4s ease, transform 0.4s ease;
`;

export const SlideImage = styled.div<{ $src?: string }>`
  width: 100%;
  height: 100%;
  background-image: ${(props) => (props.$src ? `url(${props.$src})` : 'none')};
  background-size: cover;
  background-position: center;
  background-color: ${({ theme }) => theme.colors?.background || '#e0e5ec'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SlideContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  color: white;
  text-align: left;

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

export const SlideTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const SlideDescription = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Neomorphic navigation buttons
export const CarouselNavButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$position'].includes(prop),
})<{
  $position: 'left' | 'right';
}>`
  position: absolute;
  top: 50%;
  ${(props) => props.$position}: 20px;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors?.background || '#e0e5ec'};
  box-shadow: ${({ theme }) => theme.shadows?.soft || '6px 6px 12px #b8b9be, -6px -6px 12px #ffffff'};
  color: ${({ theme }) => theme.colors?.text || '#555'};
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    box-shadow: ${({ theme }) =>
      `${theme.shadows?.soft || '6px 6px 12px #b8b9be, -6px -6px 12px #ffffff'}, inset 0 0 0 2px ${theme.colors?.primary || '#6d5dfc'}40`};
    color: ${({ theme }) => theme.colors?.primary || '#6d5dfc'};
    transform: translateY(-50%) scale(1.05);
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows?.softInset || 'inset 4px 4px 8px #b8b9be, inset -4px -4px 8px #ffffff'};
    transform: translateY(-50%) scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.primary || '#6d5dfc'};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: ${({ theme }) => theme.shadows?.softInset || 'inset 4px 4px 8px #b8b9be, inset -4px -4px 8px #ffffff'};
    
    &:hover {
      transform: translateY(-50%);
      color: ${({ theme }) => theme.colors?.text || '#555'};
    }
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    ${(props) => props.$position}: 12px;
  }
`;

// Modern dots with neomorphic style
export const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: ${({ theme }) => theme.colors?.background || '#e0e5ec'};
`;

export const CarouselDot = styled.button.withConfig({
  shouldForwardProp: (prop) => !['$isActive', '$hasImage'].includes(prop),
})<{
  $isActive?: boolean;
  $hasImage?: boolean;
}>`
  ${(props) =>
    props.$hasImage
      ? css`
    width: 48px;
    height: 36px;
    border-radius: 6px;
    overflow: hidden;
    border: 2px solid ${props.$isActive ? props.theme.colors?.primary || '#6d5dfc' : 'transparent'};
    opacity: ${props.$isActive ? 1 : 0.6};
    transform: ${props.$isActive ? 'scale(1.1)' : 'scale(1)'};
    transition: all 0.3s ease;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    &:hover {
      opacity: 1;
      transform: scale(1.05);
    }
  `
      : css`
    width: ${props.$isActive ? '32px' : '12px'};
    height: 12px;
    border-radius: 6px;
    border: none;
    background: ${
      props.$isActive
        ? props.theme.colors?.primary || '#6d5dfc'
        : `${props.theme.colors?.shadowDark || '#b8b9be'}60`
    };
    box-shadow: ${
      props.$isActive ? '0 4px 8px rgba(109, 95, 252, 0.4)' : 'inset 2px 2px 4px rgba(0,0,0,0.1)'
    };
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%);
      opacity: ${props.$isActive ? 1 : 0};
      transition: opacity 0.3s ease;
    }

    &:hover {
      background: ${props.theme.colors?.primary || '#6d5dfc'}80;
      transform: scale(1.1);
    }

    ${
      props.$isActive &&
      css`
      animation: ${pulse} 2s ease-in-out infinite;
    `
    }
  `}
`;

// Progress bar for autoplay
export const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const ProgressFill = styled.div<{ $duration: number; $isPlaying: boolean }>`
  height: 100%;
  background: ${({ theme }) => theme.colors?.primary || '#6d5dfc'};
  width: 0%;
  ${(props) =>
    props.$isPlaying &&
    css`
    animation: ${progress} ${props.$duration}ms linear;
  `}
`;

// Counter badge
export const CarouselCounter = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors?.background || '#e0e5ec'};
  box-shadow: ${({ theme }) => theme.shadows?.soft || '4px 4px 8px #b8b9be, -4px -4px 8px #ffffff'};
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || '#555'};
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 4px;

  span {
    color: ${({ theme }) => theme.colors?.primary || '#6d5dfc'};
  }
`;

// Swipe indicator
export const SwipeHint = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 12px 24px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 14px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    animation: swipeHint 1.5s ease-in-out infinite;
  }
  
  @keyframes swipeHint {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(5px); }
  }
`;

// Slide placeholder for empty state
export const SlidePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors?.background || '#e0e5ec'};
  box-shadow: ${({ theme }) => theme.shadows?.softInset || 'inset 4px 4px 8px #b8b9be, inset -4px -4px 8px #ffffff'};
  font-size: 18px;
  color: ${({ theme }) => `${theme.colors?.shadowDark || '#b8b9be'}80`};
`;
