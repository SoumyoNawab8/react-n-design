import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';

export type ModalSize = 'small' | 'medium' | 'large';

const sizes: Record<ModalSize, string> = {
  small: '400px',
  medium: '600px',
  large: '800px',
};

export const ModalWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['position', 'isBottomSheet'].includes(prop),
})<{
  position: 'center' | 'top';
  isBottomSheet?: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: ${({ position, isBottomSheet }) =>
    isBottomSheet ? 'flex-end' : position === 'center' ? 'center' : 'flex-start'};
  padding-top: ${({ position, isBottomSheet }) =>
    isBottomSheet ? '0' : position === 'top' ? '5vh' : '0'};
  z-index: 1100;
  
  /* For bottom sheet on mobile, push content to bottom */
  ${({ isBottomSheet }) =>
    isBottomSheet &&
    css`
      padding: 0;
      align-items: flex-end;
    `}
`;

export const ModalBackdrop = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['variant', 'isBottomSheet'].includes(prop),
})<{
  variant?: 'default' | 'glass';
  isBottomSheet?: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  ${({ variant }) =>
    variant === 'glass'
      ? css`
          background: rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        `
      : css`
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
        `}

  /* Smooth transition for blur effect */
  transition: backdrop-filter 0.3s ease;
`;

export const ModalBody = styled.div`
  /* Add any specific body styling here */
`;

export const ModalContent = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !['size', 'fullScreen', 'variant', 'isBottomSheet'].includes(prop),
})<{
  size: ModalSize;
  fullScreen: boolean;
  variant?: 'default' | 'glass';
  isBottomSheet?: boolean;
}>`
  position: relative;
  z-index: 1101;
  width: ${({ isBottomSheet }) => (isBottomSheet ? '100%' : '90vw')};
  max-width: ${({ size, isBottomSheet }) => (isBottomSheet ? 'none' : sizes[size])};

  /* Bottom-sheet styles for mobile */
  ${({ isBottomSheet, variant }) =>
    isBottomSheet &&
    css`
      width: 100%;
      max-width: none;
      margin: 0;
      border-radius: 16px 16px 0 0;

      & > div {
        border-radius: 16px 16px 0 0;
        padding-bottom: env(safe-area-inset-bottom, 20px);

        ${variant === 'glass' &&
        css`
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        `}
      }

      @media (prefers-color-scheme: dark) {
        & > div {
          ${variant === 'glass' &&
          css`
            background: rgba(30, 30, 30, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.1);
          `}
        }
      }
    `}

  /* Full-screen styles */
  ${({ fullScreen }) =>
    fullScreen &&
    css`
      width: 100vw;
      height: 100vh;
      max-width: 100vw;
      border-radius: 0;
      
      & > div {
        /* Target the Card inside */
        height: 100%;
        border-radius: 0;
        display: flex;
        flex-direction: column;
      }
      
      & ${ModalBody} {
        flex-grow: 1;
        overflow-y: auto;
      }
    `}
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  /* 2. Access theme from props */
  color: ${({ theme }) => theme.colors.text};
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  /* 3. Access theme from props */
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0 8px;
  min-width: 36px;
  border-radius: 4px;
  transition: background-color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const ModalFooter = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const BottomSheetHandle = styled.div`
  width: 40px;
  height: 4px;
  background: ${({ theme }) => theme.colors.border || '#ccc'};
  border-radius: 2px;
  margin: 8px auto 16px;
  opacity: 0.5;
`;
