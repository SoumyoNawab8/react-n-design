'use client';
import React from 'react';
import { StyledStack } from './Stack.styles';

export interface StackProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: number;
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
}

/**
 * Flexbox layout primitive for consistent spacing and alignment.
 */
export const Stack = ({
  children,
  direction = 'column',
  gap = 12,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  ...rest
}: StackProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <StyledStack
      direction={direction}
      gap={gap}
      align={align}
      justify={justify}
      wrap={wrap}
      {...rest}
    >
      {children}
    </StyledStack>
  );
};
