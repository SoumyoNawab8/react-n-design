'use client';
import React from 'react';
import { StyledTitle } from './Typography.styles';

export interface TitleProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5;
  color?: string;
}

/**
 * Heading component with consistent sizing and theme-aware colors.
 */
export const Title = ({
  children,
  level = 1,
  color,
  ...rest
}: TitleProps & React.HTMLAttributes<HTMLHeadingElement>) => {
  const tag = `h${level}` as React.ElementType;

  return (
    <StyledTitle as={tag} level={level} color={color} {...rest}>
      {children}
    </StyledTitle>
  );
};
