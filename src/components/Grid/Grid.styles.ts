'use client';
import styled, { css } from 'styled-components';

export const StyledGrid = styled.div.withConfig({
  shouldForwardProp: (prop) => !['columns', 'gap', 'minChildWidth'].includes(prop),
})<{
  columns: number | string;
  gap: number;
  minChildWidth?: number;
}>`
  display: grid;
  gap: ${({ gap }) => gap}px;

  ${({ columns, minChildWidth }) =>
    minChildWidth && minChildWidth > 0
      ? css`
          grid-template-columns: repeat(auto-fit, minmax(${minChildWidth}px, 1fr));
        `
      : css`
          grid-template-columns: ${
            typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns
          };
        `}
`;
