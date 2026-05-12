'use client';
import React from 'react';
import { StyledDivider, DividerWithText, DividerText } from './Divider.styles';

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
