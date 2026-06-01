import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';

const widthSizes = {
  small: '300px',
  medium: '400px',
  large: '600px',
  full: '100vw',
};

const heightSizes = {
  small: '300px',
  medium: '400px',
  large: '600px',
  full: '100vh',
};

export const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1100;
`;

export const DrawerBackdrop = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => prop !== 'variant',
})<{
  variant?: 'default' | 'glass';
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
        `}
`;

export const DrawerPanel = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['placement', 'size', 'variant'].includes(prop),
})<{
  placement: 'left' | 'right' | 'top' | 'bottom';
  size: 'small' | 'medium' | 'large' | 'full';
  variant?: 'default' | 'glass';
}>`
  position: fixed;
  z-index: 1101;
  ${({ variant, theme }) =>
    variant !== 'glass' &&
    css`
      background: ${theme.colors.background};
    `}
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  display: flex;
  flex-direction: column;

  /* Glass variant styles */
  ${({ variant }) =>
    variant === 'glass' &&
    css`
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);

      /* Dark mode support */
      @media (prefers-color-scheme: dark) {
        background: rgba(30, 30, 30, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    `}

  ${({ placement, size, theme }) => {
    const br = theme.borderRadius;
    let borderRadius = br;
    if (size === 'full') {
      borderRadius = '0';
    } else if (placement === 'left') {
      borderRadius = `0 ${br} ${br} 0`;
    } else if (placement === 'right') {
      borderRadius = `${br} 0 0 ${br}`;
    } else if (placement === 'top') {
      borderRadius = `0 0 ${br} ${br}`;
    } else if (placement === 'bottom') {
      borderRadius = `${br} ${br} 0 0`;
    }

    if (placement === 'left' || placement === 'right') {
      return css`
        top: 0;
        ${placement}: 0;
        width: ${widthSizes[size]};
        height: 100vh;
        max-width: 100vw;
        border-radius: ${borderRadius};
      `;
    }

    return css`
      left: 0;
      ${placement}: 0;
      height: ${heightSizes[size]};
      width: 100vw;
      max-height: 100vh;
      border-radius: ${borderRadius};
    `;
  }}
`;

export const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.shadowDark}40;
`;

export const DrawerTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

export const DrawerCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  padding: 0 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const DrawerBody = styled.div`
  padding: 24px;
  flex: 1;
  overflow-y: auto;
`;

export const DrawerFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.shadowDark}40;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;
