'use client';
import React, { memo, useMemo } from 'react';
import {
  CardBody,
  CardCover,
  CardFooter,
  CardHeader,
  LoadingOverlay,
  ShimmerEffect,
  Spinner,
  StyledCard,
  type ResponsiveSpacing,
} from './Card.styles';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  variant?: 'outset' | 'inset' | 'glass' | 'elevated';
  padding?: 'none' | 'small' | 'medium' | 'large' | ResponsiveSpacing;
  /**
   * Adds a subtle border for better contrast.
   */
  bordered?: boolean;
  /**
   * Adds hover and active effects. Useful when the whole card is clickable.
   */
  hoverable?: boolean;
  /**
   * If `true`, a loading spinner will be displayed over the card content.
   */
  loading?: boolean;
  /**
   * If `true`, shows a shimmer loading effect instead of spinner.
   */
  shimmer?: boolean;
  /**
   * Content to render at the top of the card, often an image.
   */
  cover?: React.ReactNode;
  /**
   * Aspect ratio for the cover image container.
   */
  coverAspectRatio?: '16/9' | '4/3' | '1/1';
  /**
   * Content to render in the header section, above the main children.
   */
  header?: React.ReactNode;
  /**
   * Content to render in the footer section, below the main children.
   */
  footer?: React.ReactNode;
  /**
   * Entrance animation for the card.
   */
  entrance?: 'none' | 'fade' | 'slide-up' | 'scale';
  /**
   * Custom className for additional styling.
   */
  className?: string;
  /**
   * Custom inline styles.
   */
  style?: React.CSSProperties;
}

/**
 * An advanced neomorphic container with support for covers, headers,
 * footers, loading states, and entrance animations.
 */
const CardComponent = ({
  children,
  as,
  variant = 'outset',
  padding = 'medium',
  bordered = false,
  hoverable = false,
  loading = false,
  shimmer = false,
  cover,
  coverAspectRatio,
  header,
  footer,
  entrance = 'none',
  className,
  style,
  ...props
}: CardProps) => {
  // Memoize the body content to prevent unnecessary re-renders
  const bodyContent = useMemo(() => {
    return (
      <>
        {loading && (
          <LoadingOverlay aria-hidden="true">
            <Spinner />
          </LoadingOverlay>
        )}
        {shimmer && !loading && (
          <ShimmerEffect aria-hidden="true" />
        )}
        {cover && <CardCover $aspectRatio={coverAspectRatio}>{cover}</CardCover>}
        <CardBody padding={padding}>
          {header && <CardHeader>{header}</CardHeader>}
          {children}
          {footer && <CardFooter>{footer}</CardFooter>}
        </CardBody>
      </>
    );
  }, [children, cover, coverAspectRatio, header, footer, loading, shimmer, padding]);

  return (
    <StyledCard
      as={as}
      variant={variant}
      bordered={bordered}
      hoverable={hoverable}
      isLoading={loading || shimmer}
      entrance={entrance}
      aria-busy={loading || shimmer}
      className={className}
      style={style}
      {...props}
    >
      {bodyContent}
    </StyledCard>
  );
};

// Export the memoized version for performance
export const Card = memo(CardComponent);

// Display name for debugging
Card.displayName = 'Card';
