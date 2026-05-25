'use client';
import styled, { css } from 'styled-components';

export const StyledDivider = styled.div.withConfig({
  shouldForwardProp: (prop) => !['orientation', 'type'].includes(prop),
})<{
  orientation?: 'horizontal' | 'vertical';
  type?: 'solid' | 'dashed' | 'dotted';
}>`
  background: ${({ theme }) => `${(theme as any).colors.shadowDark}40`};
  transition: background 0.2s ease;

  ${({ orientation, type }) =>
    orientation === 'vertical'
      ? css`
          display: inline-block;
          width: 1px;
          height: 100%;
          min-height: 1em;
          vertical-align: middle;
        `
      : css`
          display: block;
          width: 100%;
          height: 1px;
        `}

  ${({ type }) =>
    type === 'dashed'
      ? css`
          background: none;
          border-top: 1px dashed ${({ theme }) => `${(theme as any).colors.shadowDark}40`};
          height: 0;
        `
      : type === 'dotted'
        ? css`
          background: none;
          border-top: 1px dotted ${({ theme }) => `${(theme as any).colors.shadowDark}40`};
          height: 0;
        `
        : css``}
`;

export const DividerText = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  background: ${({ theme }) => theme.colors.background};
  white-space: nowrap;
`;

export const DividerWithText = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 16px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => `${(theme as any).colors.shadowDark}40`};
  }
`;
