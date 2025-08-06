import styled, { css, keyframes } from 'styled-components';

// A more prominent shimmer animation
const shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

export const StyledSkeleton = styled.div<{
  variant: 'text' | 'rect' | 'circle';
  active: boolean;
}>`
  position: relative;
  overflow: hidden;
  /* 2. Use theme-aware background and shadow */
  background-color: ${({ theme }) => (theme as any).colors.skeletonBg};
  box-shadow: ${({ theme }) => (theme as any).shadows.softInset};

  ${({ variant, theme }) => {
    switch (variant) {
      case 'circle':
        return css`
          border-radius: 50%;
        `;
      case 'rect':
        return css`
          /* 3. Use theme-aware border-radius */
          border-radius: ${theme.borderRadius};
        `;
      case 'text':
      default:
        return css`
          height: 1em; /* Default height based on font size */
          border-radius: 4px;
        `;
    }
  }}

  /* The shimmer effect now works on both light and dark backgrounds */
  ${({ active }) =>
    active &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(255, 255, 255, 0.4),
          transparent
        );
        animation: ${shimmer} 1.5s infinite;
      }
    `}
`;