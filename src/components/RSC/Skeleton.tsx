import type React from 'react';
import styled, { css } from 'styled-components';

const StyledSkeleton = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<{
  variant: 'text' | 'rect' | 'circle';
}>`
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.skeletonBg};
  box-shadow: ${({ theme }) => theme.shadows.softInset};

  ${({ variant, theme }) => {
    switch (variant) {
      case 'circle':
        return css`
          border-radius: 50%;
        `;
      case 'rect':
        return css`
          border-radius: ${theme.borderRadius};
        `;
      default:
        return css`
          height: 1em;
          border-radius: 4px;
        `;
    }
  }}
`;

export interface SkeletonProps {
  loading?: boolean;
  children?: React.ReactNode;
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({
  loading = true,
  children,
  variant = 'text',
  width,
  height,
}: SkeletonProps) => {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <StyledSkeleton
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading content"
      variant={variant}
      style={{
        width: width,
        height: height,
      }}
    />
  );
};
