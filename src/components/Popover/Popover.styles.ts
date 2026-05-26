import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';

export const PopoverWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const PopoverTrigger = styled.button`
  display: inline-flex;
  background: transparent;
  border: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
  padding: 0;
`;

const getPositionStyles = (placement: 'top' | 'bottom' | 'left' | 'right') => {
  switch (placement) {
    case 'top':
      return css`
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      `;
    case 'bottom':
      return css`
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
      `;
    case 'left':
      return css`
        top: 50%;
        right: calc(100% + 8px);
        transform: translateY(-50%);
      `;
    case 'right':
      return css`
        top: 50%;
        left: calc(100% + 8px);
        transform: translateY(-50%);
      `;
    default:
      return css``;
  }
};

export const PopoverContent = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => !['placement'].includes(prop),
})<{
  placement: 'top' | 'bottom' | 'left' | 'right';
}>`
  position: absolute;
  z-index: 1000;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 16px;
  min-width: 200px;
  max-width: 320px;
  outline: none;

  ${({ placement }) => getPositionStyles(placement)}
`;
