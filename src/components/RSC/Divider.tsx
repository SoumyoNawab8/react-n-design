import type React from 'react';
import styled, { css } from 'styled-components';

const StyledDivider = styled.div.withConfig({
  shouldForwardProp: (prop) => !['orientation', 'type'].includes(prop),
})<{
  orientation?: 'horizontal' | 'vertical';
  type?: 'solid' | 'dashed' | 'dotted';
}>`
  background: ${({ theme }) => `${theme.colors.shadowDark}40`};

  ${({ orientation: _orientation }) =>
    _orientation === 'vertical'
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
          border-top: 1px dashed ${({ theme }) => `${theme.colors.shadowDark}40`};
          height: 0;
        `
      : type === 'dotted'
        ? css`
          background: none;
          border-top: 1px dotted ${({ theme }) => `${theme.colors.shadowDark}40`};
          height: 0;
        `
        : css``}
`;

const DividerText = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  background: ${({ theme }) => theme.colors.background};
  white-space: nowrap;
`;

const DividerWithText = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 16px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => `${theme.colors.shadowDark}40`};
  }
`;

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  type?: 'solid' | 'dashed' | 'dotted';
  children?: React.ReactNode;
  role?: 'separator';
  'aria-orientation'?: 'horizontal' | 'vertical';
}

export const Divider = ({
  orientation = 'horizontal',
  type = 'solid',
  children,
  role = 'separator',
  'aria-orientation': ariaOrientation,
}: DividerProps) => {
  const computedOrientation = ariaOrientation || orientation;

  if (children) {
    return (
      <DividerWithText role={role} aria-orientation={computedOrientation}>
        <DividerText>{children}</DividerText>
      </DividerWithText>
    );
  }

  return (
    <StyledDivider
      role={role}
      aria-orientation={computedOrientation}
      orientation={orientation}
      type={type}
    />
  );
};
