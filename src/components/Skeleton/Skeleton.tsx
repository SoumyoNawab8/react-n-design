import React from 'react';
import { StyledSkeleton } from './Skeleton.styles';

export interface SkeletonProps {
  /**
   * If `true`, the skeleton placeholder will be shown. If `false`, the children will be rendered.
   */
  loading?: boolean;
  /**
   * The content to render once loading is complete.
   */
  children?: React.ReactNode;
  /**
   * The shape of the skeleton placeholder.
   */
  variant?: 'text' | 'rect' | 'circle';
  /**
   * The width of the placeholder. Accepts any valid CSS value.
   */
  width?: string | number;
  /**
   * The height of the placeholder. Accepts any valid CSS value.
   */
  height?: string | number;
  /**
   * If `true`, enables the shimmering animation.
   */
  active?: boolean;
}

/**
 * A component to display a placeholder preview of your content before the data has loaded.
 */
export const Skeleton = ({
  loading = true,
  children,
  variant = 'text',
  width,
  height,
  active = true,
}: SkeletonProps) => {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <StyledSkeleton
      variant={variant}
      active={active}
      style={{
        width: width,
        height: height,
      }}
    />
  );
};