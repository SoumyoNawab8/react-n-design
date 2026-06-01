import type React from 'react';
import { GradientBorderInner, GradientBorderWrapper } from './GradientBorder.styles';

export interface GradientBorderProps {
  children: React.ReactNode;
  animated?: boolean;
  className?: string;
}

/**
 * GradientBorder component wraps children with an animated or static
 * conic-gradient border effect. Useful for highlighting premium CTAs,
 * "AI is thinking" states, or any content that needs extra visual emphasis.
 */
export const GradientBorder: React.FC<GradientBorderProps> = ({
  children,
  animated = false,
  className,
}) => {
  return (
    <GradientBorderWrapper animated={animated} className={className}>
      <GradientBorderInner>{children}</GradientBorderInner>
    </GradientBorderWrapper>
  );
};
