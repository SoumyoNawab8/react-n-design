import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { TooltipProps } from './Tooltip';

const getPositionStyles = (position: TooltipProps['position']) => {
  switch (position) {
    case 'bottom':
      return css`
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        &::after {
          bottom: 100%; left: 50%; margin-left: -5px;
          border-color: transparent transparent #333 transparent;
        }
      `;
    case 'left':
      return css`
        top: 50%;
        right: calc(100% + 8px);
        transform: translateY(-50%);
        &::after {
          top: 50%; left: 100%; margin-top: -5px;
          border-color: transparent transparent transparent #333;
        }
      `;
    case 'right':
      return css`
        top: 50%;
        left: calc(100% + 8px);
        transform: translateY(-50%);
        &::after {
          top: 50%; right: 100%; margin-top: -5px;
          border-color: transparent #333 transparent transparent;
        }
      `;
    case 'top':
    default:
      return css`
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        &::after {
          top: 100%; left: 50%; margin-left: -5px;
          border-color: #333 transparent transparent transparent;
        }
      `;
  }
};


export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const TooltipContent = styled(motion.div)<{
  position: 'top' | 'bottom' | 'left' | 'right';
  withArrow: boolean;
}>`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  
  &::after {
    content: '';
    position: absolute;
    border-width: 5px;
    border-style: solid;
    display: ${({ withArrow }) => (withArrow ? 'block' : 'none')};
  }

  ${({ position }) => getPositionStyles(position)};
`;