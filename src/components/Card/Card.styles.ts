import styled, { css, keyframes } from 'styled-components';

// --- Entrance Animations ---
export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const slideUp = keyframes`
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
`;

export const scaleIn = keyframes`
  from { 
    opacity: 0;
    transform: scale(0.95);
  }
  to { 
    opacity: 1;
    transform: scale(1);
  }
`;

// --- Shimmer Effect ---
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// --- Spinner Animation ---
const spin = keyframes`to { transform: rotate(360deg); }`;

export const Spinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.background}b3;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

// --- Shimmer Effect for Loading State ---
export const ShimmerEffect = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.skeletonBg} 25%,
    ${({ theme }) => theme.colors.background} 50%,
    ${({ theme }) => theme.colors.skeletonBg} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  z-index: 5;
  border-radius: ${({ theme }) => theme.borderRadius};
`;
// --- End Loading Effects ---

// Spacing values for padding
const paddings = {
  none: '0px',
  small: '16px',
  medium: '24px',
  large: '32px',
};

// Responsive padding helper types
type SpacingKey = 'none' | 'small' | 'medium' | 'large';
type ResponsiveSpacing = SpacingKey | { xs?: SpacingKey; sm?: SpacingKey; md?: SpacingKey; lg?: SpacingKey; xl?: SpacingKey };

// Helper to resolve padding value
const resolvePadding = (padding: ResponsiveSpacing): string => {
  if (typeof padding === 'string') {
    return paddings[padding];
  }
  return paddings.medium; // Default fallback
};

export const CardCover = styled.div<{ $aspectRatio?: '16/9' | '4/3' | '1/1' }>`
  width: 100%;
  overflow: hidden;
  border-radius: ${({ theme }) => `${theme.borderRadius} ${theme.borderRadius} 0 0`};
  position: relative;
  
  ${({ $aspectRatio }) =>
    $aspectRatio &&
    css`
      aspect-ratio: ${$aspectRatio};
      
      & > img,
      & > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `}
  
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 16px;
  font-size: 1.25rem;
  font-weight: 600;
`;

// CardBody with responsive padding support
export const CardBody = styled.div.withConfig({
  shouldForwardProp: (prop) => !['padding'].includes(prop),
})<{ padding: ResponsiveSpacing }>`
  padding: ${({ padding }) => resolvePadding(padding)};
  
  /* Responsive padding breakpoints */
  ${({ padding }) =>
    typeof padding === 'object' &&
    padding.xs &&
    css`
      @media (min-width: 0px) {
        padding: ${paddings[padding.xs]};
      }
    `}
  
  ${({ padding }) =>
    typeof padding === 'object' &&
    padding.sm &&
    css`
      @media (min-width: 576px) {
        padding: ${paddings[padding.sm]};
      }
    `}
  
  ${({ padding }) =>
    typeof padding === 'object' &&
    padding.md &&
    css`
      @media (min-width: 768px) {
        padding: ${paddings[padding.md]};
      }
    `}
  
  ${({ padding }) =>
    typeof padding === 'object' &&
    padding.lg &&
    css`
      @media (min-width: 992px) {
        padding: ${paddings[padding.lg]};
      }
    `}
  
  ${({ padding }) =>
    typeof padding === 'object' &&
    padding.xl &&
    css`
      @media (min-width: 1200px) {
        padding: ${paddings[padding.xl]};
      }
    `}
`;

export const CardFooter = styled.div`
  margin-top: 16px;
  border-top: 1px solid ${({ theme }) => `${theme.colors.shadowDark}40`};
  padding-top: 16px;
`;

// Entrance animation helper
const getEntranceAnimation = (entrance: 'none' | 'fade' | 'slide-up' | 'scale') => {
  switch (entrance) {
    case 'fade':
      return css`animation: ${fadeIn} 0.4s ease-out;`;
    case 'slide-up':
      return css`animation: ${slideUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);`;
    case 'scale':
      return css`animation: ${scaleIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1);`;
    default:
      return '';
  }
};

export const StyledCard = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['variant', 'bordered', 'hoverable', 'isLoading', 'entrance'].includes(prop),
})<{
  variant: 'outset' | 'inset' | 'glass' | 'elevated';
  bordered: boolean;
  hoverable: boolean;
  isLoading: boolean;
  entrance: 'none' | 'fade' | 'slide-up' | 'scale';
}>`
  position: relative;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  
  /* Entrance animation */
  ${({ entrance }) => entrance !== 'none' && getEntranceAnimation(entrance)}
  
  /* Variant styles */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'glass':
        return css`
          background: ${({ theme }) => `${theme.colors.cardBg}80`};
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid ${({ theme }) => `${theme.colors.shadowLight}40`};
          box-shadow: ${theme.shadows.soft};
        `;
      case 'elevated':
        return css`
          background: ${theme.colors.cardBg};
          box-shadow: 
            14px 14px 28px ${theme.colors.shadowDark},
            -14px -14px 28px ${theme.colors.shadowLight};
        `;
      case 'inset':
        return css`
          background: ${theme.colors.background};
          box-shadow: ${theme.shadows.softInset};
        `;
      default:
        return css`
          background: ${theme.colors.cardBg};
          box-shadow: ${theme.shadows.soft};
        `;
    }
  }}
  
  /* Border */
  ${({ bordered, theme }) =>
    bordered &&
    css`
      border: 1px solid ${theme.colors.shadowDark}40;
    `}
  
  /* Hoverable with spring physics transition */
  ${({ hoverable, theme }) =>
    hoverable &&
    css`
      cursor: pointer;
      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                  box-shadow 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      
      &:hover {
        transform: translateY(-6px) scale(1.01);
        box-shadow: 
          14px 14px 28px ${theme.colors.shadowDark},
          -14px -14px 28px ${theme.colors.shadowLight};
      }
      
      &:active {
        transform: translateY(-3px) scale(0.99);
        transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
      }
    `}
  
  /* Loading state blur */
  ${({ isLoading }) =>
    isLoading &&
    css`
      & > *:not(${LoadingOverlay}):not(${ShimmerEffect}) {
        filter: blur(4px);
      }
    `}
`;

// Export padding type for use in Card.tsx
export type { ResponsiveSpacing };
