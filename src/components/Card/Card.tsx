import React from 'react';
import { 
  StyledCard, CardCover, CardHeader, CardBody, CardFooter, LoadingOverlay, Spinner 
} from './Card.styles';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
  variant?: 'outset' | 'inset';
  padding?: 'none' | 'small' | 'medium' | 'large';
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
   * Content to render at the top of the card, often an image.
   */
  cover?: React.ReactNode;
  /**
   * Content to render in the header section, above the main children.
   */
  header?: React.ReactNode;
  /**
   * Content to render in the footer section, below the main children.
   */
  footer?: React.ReactNode;
}

/**
 * An advanced neomorphic container with support for covers, headers,
 * footers, and loading states.
 */
export const Card = ({
  children,
  as,
  variant = 'outset',
  padding = 'medium',
  bordered = false,
  hoverable = false,
  loading = false,
  cover,
  header,
  footer,
  ...props
}: CardProps) => {
  return (
    <StyledCard
      as={as}
      variant={variant}
      bordered={bordered}
      hoverable={hoverable}
      isLoading={loading}
      {...props}
    >
      {loading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
      {cover && <CardCover>{cover}</CardCover>}
      <CardBody padding={padding}>
        {header && <CardHeader>{header}</CardHeader>}
        {children}
        {footer && <CardFooter>{footer}</CardFooter>}
      </CardBody>
    </StyledCard>
  );
};