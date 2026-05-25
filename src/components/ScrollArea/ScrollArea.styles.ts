import styled, { css } from 'styled-components';

export const ScrollAreaWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ScrollAreaViewport = styled.div.withConfig({
  shouldForwardProp: (prop) => !['maxHeight', 'horizontal'].includes(prop),
})<{ maxHeight?: string | number; horizontal?: boolean }>`
  overflow-y: auto;
  overflow-x: ${({ horizontal }) => (horizontal ? 'auto' : 'hidden')};
  max-height: ${({ maxHeight }) =>
    maxHeight !== undefined
      ? typeof maxHeight === 'number'
        ? `${maxHeight}px`
        : maxHeight
      : '100%'};
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  border-radius: ${({ theme }) => (theme as any).borderRadius || '12px'};
`;

export const ScrollAreaContent = styled.div`
  min-width: 100%;
`;

export const ScrollbarTrack = styled.div.withConfig({
  shouldForwardProp: (prop) => !['orientation', 'visible'].includes(prop),
})<{ orientation: 'vertical' | 'horizontal'; visible: boolean }>`
  position: absolute;
  border-radius: 9999px;
  background: ${({ theme }) => `${(theme as any).colors.shadowDark}30`};
  transition: opacity 0.3s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: none;

  ${({ orientation }) =>
    orientation === 'vertical'
      ? css`
          top: 4px;
          right: 4px;
          bottom: 4px;
          width: 6px;
        `
      : css`
          left: 4px;
          right: 4px;
          bottom: 4px;
          height: 6px;
        `}
`;

export const ScrollbarThumb = styled.div.withConfig({
  shouldForwardProp: (prop) => !['orientation'].includes(prop),
})<{ orientation: 'vertical' | 'horizontal' }>`
  position: absolute;
  border-radius: 9999px;
  background: ${({ theme }) => `${(theme as any).colors.primary}80`};
  cursor: pointer;
  pointer-events: auto;
  transition: background 0.2s ease;

  ${({ orientation }) =>
    orientation === 'vertical'
      ? css`
          width: 100%;
          min-height: 20px;
        `
      : css`
          height: 100%;
          min-width: 20px;
        `}

  &:hover {
    background: ${({ theme }) => (theme as any).colors.primary};
  }
`;
