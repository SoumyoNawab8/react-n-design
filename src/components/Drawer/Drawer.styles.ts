import { motion } from '../../utils/lazyMotion';
import styled, { css } from 'styled-components';

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

export const DrawerBackdrop = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const DrawerPanel = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['placement', 'size'].includes(prop),
})<{
  placement: 'left' | 'right' | 'top' | 'bottom';
  size: 'small' | 'medium' | 'large' | 'full';
}>`
  position: fixed;
  z-index: 1101;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  display: flex;
  flex-direction: column;

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
  border-bottom: 1px solid ${({ theme }) => (theme as any).colors.shadowDark}40;
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
  border-top: 1px solid ${({ theme }) => (theme as any).colors.shadowDark}40;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;
