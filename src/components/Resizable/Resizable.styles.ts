'use client';
import styled, { css } from 'styled-components';

const horizontalHandle = css`
  width: 8px;
  cursor: col-resize;
  background: ${({ theme }) => theme.colors.background};
  border-left: 1px solid ${({ theme }) => (theme as any).colors.shadowDark}30;
  border-right: 1px solid ${({ theme }) => (theme as any).colors.shadowDark}30;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 20px;
    background: ${({ theme }) => (theme as any).colors.shadowDark}40;
    border-radius: 1px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 20px;
    background: ${({ theme }) => (theme as any).colors.shadowDark}40;
    border-radius: 1px;
    margin-left: -3px;
  }
`;

const verticalHandle = css`
  height: 8px;
  cursor: row-resize;
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => (theme as any).colors.shadowDark}30;
  border-bottom: 1px solid ${({ theme }) => (theme as any).colors.shadowDark}30;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 2px;
    background: ${({ theme }) => (theme as any).colors.shadowDark}40;
    border-radius: 1px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 2px;
    background: ${({ theme }) => (theme as any).colors.shadowDark}40;
    border-radius: 1px;
    margin-top: -3px;
  }
`;

export const ResizableContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$direction',
})<{ $direction: 'horizontal' | 'vertical' }>`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  ${({ $direction }) =>
    $direction === 'horizontal'
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: column;
        `}
`;

export const ResizablePanel = styled.div`
  overflow: auto;
`;

export const ResizableHandle = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$direction', '$isDragging'].includes(prop),
})
<{
  $direction: 'horizontal' | 'vertical';
  $isDragging: boolean;
}>`
  flex-shrink: 0;
  position: relative;
  user-select: none;
  touch-action: none;
  transition: background-color 0.2s, opacity 0.2s;
  
  ${({ $direction }) =>
    $direction === 'horizontal' ? horizontalHandle : verticalHandle}
  
  ${({ $isDragging, theme }) =>
    $isDragging
      ? css`
          background: ${theme.colors.primary}20 !important;
          &::before,
          &::after {
            background: ${theme.colors.primary} !important;
          }
        `
      : css``}
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
    
    &::before,
    &::after {
      background: ${({ theme }) => (theme as any).colors.shadowDark}60;
    }
  }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  /* Create a larger invisible hit area */
  &::before {
    ${({ $direction }) =>
      $direction === 'horizontal'
        ? css`
            margin-left: 0;
            width: 20px;
            height: 100%;
            z-index: -1;
          `
        : css`
            margin-top: 0;
            width: 100%;
            height: 20px;
            z-index: -1;
          `}
  }
`
;