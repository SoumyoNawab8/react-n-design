'use client';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  background: ${({ theme }) => theme.colors.background};
`;

export const CarouselTrack = styled(motion.div)`
  display: flex;
  width: 100%;
`;

export const CarouselSlide = styled.div`
  flex: 0 0 100%;
  min-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
`;

export const CarouselNavButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['position'].includes(prop),
})<{
  position: 'left' | 'right';
}>`
  position: absolute;
  top: 50%;
  ${({ position }) => position}: 12px;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: ${({ theme }) => `${theme.shadows.soft}, 0 0 0 2px ${theme.colors.primary}30`};
    color: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const CarouselDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 12px 0;
`;

export const CarouselDot = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{
  isActive?: boolean;
}>`
  width: ${({ isActive }) => (isActive ? '24px' : '8px')};
  height: 8px;
  border-radius: 4px;
  border: none;
  background: ${({ isActive, theme }) =>
    isActive ? theme.colors.primary : `${(theme as any).colors.shadowDark}60`};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const CarouselCounter = styled.span`
  position: absolute;
  bottom: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;
