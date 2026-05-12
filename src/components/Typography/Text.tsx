'use client';
import React from 'react';
import { StyledText } from './Typography.styles';

export interface TextProps {
  children: React.ReactNode;
  as?: 'span' | 'p' | 'div' | 'label';
  size?: 'small' | 'medium' | 'large';
  weight?: 'normal' | 'medium' | 'bold';
  color?: string;
  truncate?: boolean;
}

/**
 * Base text component for inline and block text with size, weight, and color control.
 */
export const Text = ({
  children,
  as = 'span',
  size = 'medium',
  weight = 'normal',
  color,
  truncate = false,
  ...rest
}: TextProps & React.HTMLAttributes<HTMLElement>) => {
  return (
    <StyledText as={as} size={size} weight={weight} color={color} truncate={truncate} {...rest}>
      {children}
    </StyledText>
  );
};
