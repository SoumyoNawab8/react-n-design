'use client';
import type React from 'react';
import { DividerText, DividerWithText, StyledDivider } from './Divider.styles';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
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
  ...props
}: DividerProps) => {
  const computedOrientation = ariaOrientation || orientation;

  if (children) {
    return (
      <DividerWithText role={role} aria-orientation={computedOrientation} {...props}>
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
      {...props}
    />
  );
};
