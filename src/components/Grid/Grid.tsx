'use client';
import type React from 'react';
import { StyledGrid } from './Grid.styles';

export interface GridProps {
  children: React.ReactNode;
  columns?: number | string;
  gap?: number;
  minChildWidth?: number;
}

/**
 * CSS Grid layout primitive with responsive auto-fit support.
 */
export const Grid = ({
  children,
  columns = 3,
  gap = 16,
  minChildWidth,
  ...rest
}: GridProps & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <StyledGrid columns={columns} gap={gap} minChildWidth={minChildWidth} {...rest}>
      {children}
    </StyledGrid>
  );
};
