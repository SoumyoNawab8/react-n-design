'use client';
import type React from 'react';
import { StyledParagraph } from './Typography.styles';

export interface ParagraphProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  maxLines?: number;
}

/**
 * Block text paragraph with optional max-lines ellipsis clamping.
 */
export const Paragraph = ({
  children,
  size = 'medium',
  maxLines,
  ...rest
}: ParagraphProps & React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <StyledParagraph size={size} maxLines={maxLines} {...rest}>
      {children}
    </StyledParagraph>
  );
};
