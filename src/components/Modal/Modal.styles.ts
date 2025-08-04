import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

const sizes = {
  small: '400px',
  medium: '600px',
  large: '800px',
};

export const ModalWrapper = styled.div<{ position: 'center' | 'top' }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: ${({ position }) => (position === 'center' ? 'center' : 'flex-start')};
  padding-top: ${({ position }) => (position === 'top' ? '5vh' : '0')};
  z-index: 1000;
`;

export const ModalBackdrop = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* This generally works for both themes */
`;

export const ModalBody = styled.div`
  /* Add any specific body styling here */
`;

export const ModalContent = styled(motion.div)<{
  size: 'small' | 'medium' | 'large';
  fullScreen: boolean;
}>`
  position: relative;
  z-index: 1001;
  width: 90vw;
  max-width: ${({ size }) => sizes[size]};

  ${({ fullScreen }) =>
    fullScreen &&
    css`
      width: 100vw;
      height: 100vh;
      max-width: 100vw;
      border-radius: 0;
      & > div { /* Target the Card inside */
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
  padding: 0 4px;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ModalFooter = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;