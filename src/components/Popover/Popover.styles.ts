import styled, { css } from 'styled-components';
import { motion } from '../../utils/lazyMotion';

export const PopoverWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

export const PopoverTrigger = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  font: inherit;
  color: inherit;
  padding: 0;
  margin: 0;
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors?.primary || '#1890ff'};
    outline-offset: 2px;
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.primary || '#1890ff'};
    outline-offset: 2px;
  }
`;

export const PopoverPortalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;

const getPositionStyles = (
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center',
  align: 'start' | 'center' | 'end',
  offset: number
) => {
  const offsetPx = `${offset}px`;

  // For portal mode, we use fixed positioning relative to viewport
  // For inline, we use absolute positioning
  const positionBase = css`
    position: absolute;
  `;

  switch (placement) {
    case 'top':
      return css`
        ${positionBase}
        bottom: calc(100% + ${offsetPx});
        left: 50%;
        transform: translateX(-50%);
      `;
    case 'bottom':
      return css`
        ${positionBase}
        top: calc(100% + ${offsetPx});
        left: 50%;
        transform: translateX(-50%);
      `;
    case 'left':
      return css`
        ${positionBase}
        top: 50%;
        right: calc(100% + ${offsetPx});
        transform: translateY(-50%);
      `;
    case 'right':
      return css`
        ${positionBase}
        top: 50%;
        left: calc(100% + ${offsetPx});
        transform: translateY(-50%);
      `;
    case 'center': {
      const alignStyles = {
        start: css`
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        `,
        center: css`
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `,
        end: css`
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        `,
      };
      return css`
        ${positionBase}
        ${alignStyles[align]}
      `;
    }
    default:
      return css``;
  }
};

const getArrowStyles = (
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center',
  _align: 'start' | 'center' | 'end',
  _offset: number
) => {
  const _bg = css`${({ theme }) => theme.colors?.background || '#fff'}`;
  const _shadow = css`${({ theme }) => theme.colors?.shadowLight || 'rgba(0,0,0,0.1)'}`;

  switch (placement) {
    case 'top':
      return css`
        bottom: -6px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        border-bottom: 1px solid ${({ theme }) => theme.colors?.border || '#d9d9d9'};
        border-right: 1px solid ${({ theme }) => theme.colors?.border || '#d9d9d9'};
      `;
    case 'bottom':
      return css`
        top: -6px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        border-top: 1px solid ${({ theme }) => theme.colors?.border || '#d9d9d9'};
        border-left: 1px solid ${({ theme }) => theme.colors?.border || '#d9d9d9'};
      `;
    case 'left':
      return css`
        top: 50%;
        right: -6px;
        transform: translateY(-50%) rotate(45deg);
        border-top: 1px solid ${({ theme }) => theme.colors?.border || '#d9d9d9'};
        border-right: 1px solid ${({ theme }) => theme.colors?.border || '#d9d9d9'};
      `;
    case 'right':
      return css`
        top: 50%;
        left: -6px;
        transform: translateY(-50%) rotate(45deg);
        border-bottom: 1px solid ${({ theme }) => theme.colors?.border || '#d9d9d9'};
        border-left: 1px solid ${({ theme }) => theme.colors?.border || '#d9d9d9'};
      `;
    case 'center':
      // No arrow for center placement
      return css`
        display: none;
      `;
    default:
      return css``;
  }
};

export const PopoverContent = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !['placement', 'align', 'minWidth', 'maxWidth', 'offset'].includes(prop),
})<{
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  align: 'start' | 'center' | 'end';
  minWidth?: number | string;
  maxWidth?: number | string;
  offset: number;
}>`
  z-index: 1001;
  background: ${({ theme }) => theme.colors?.background || '#fff'};
  color: ${({ theme }) => theme.colors?.text || '#262626'};
  border-radius: ${({ theme }) => theme.borderRadius || '6px'};
  box-shadow: ${({ theme }) => theme.shadows?.soft || '0 4px 12px rgba(0, 0, 0, 0.15)'};
  padding: 12px 16px;
  min-width: ${({ minWidth }) =>
    typeof minWidth === 'number' ? `${minWidth}px` : minWidth || '200px'};
  max-width: ${({ maxWidth }) =>
    typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth || '320px'};
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors?.border || '#d9d9d9'};
  
  ${({ placement, align, offset }) => getPositionStyles(placement, align, offset)}
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors?.primary || '#1890ff'};
    outline-offset: 2px;
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.primary || '#1890ff'};
    outline-offset: 2px;
  }
`;

export const PopoverArrow = styled.div.withConfig({
  shouldForwardProp: (prop) => !['placement', 'align', 'offset'].includes(prop),
})<{
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  align: 'start' | 'center' | 'end';
  offset: number;
}>`
  position: absolute;
  width: 10px;
  height: 10px;
  background: ${({ theme }) => theme.colors?.background || '#fff'};
  
  ${({ placement, align, offset }) => getArrowStyles(placement, align, offset)}
`;
