import styled, { css, keyframes } from 'styled-components';

// --- Re-usable Spinner ---
const spin = keyframes`to { transform: rotate(360deg); }`;
export const Spinner = styled.div`
  border: 3px solid rgba(0, 0, 0, 0.2);
  /* 2. Access theme from props */
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
  /* 3. Use theme color for background with alpha transparency */
  background: ${({ theme }) => theme.colors.background}b3; /* b3 is ~70% opacity */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: ${({ theme }) => theme.borderRadius};
`;
// --- End Spinner ---

const paddings = {
  none: '0px',
  small: '16px',
  medium: '24px',
  large: '32px',
};

export const CardCover = styled.div`
  width: 100%;
  img {
    display: block;
    width: 100%;
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 16px;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const CardBody = styled.div<{ padding: 'none' | 'small' | 'medium' | 'large' }>`
  padding: ${({ padding }) => paddings[padding]};
`;

export const CardFooter = styled.div`
  margin-top: 16px;
  /* 4. Use a theme color for borders */
  border-top: 1px solid ${({ theme }) => theme.colors.shadowDark}40; /* 40 is ~25% opacity */
  padding-top: 16px;
`;

export const StyledCard = styled.div<{
  variant: 'outset' | 'inset';
  bordered: boolean;
  hoverable: boolean;
  isLoading: boolean;
}>`
  position: relative;
  /* 5. Access all theme values from props */
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ variant, theme }) =>
    variant === 'inset' ? theme.shadows.softInset : theme.shadows.soft};
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  ${({ bordered, theme }) =>
    bordered &&
    css`
      border: 1px solid ${theme.colors.shadowDark}40;
    `}

  ${({ hoverable }) =>
    hoverable &&
    css`
      cursor: pointer;
      &:hover {
        transform: translateY(-4px);
        /* 6. Make hover shadow theme-aware */
        box-shadow: 10px 10px 20px ${({ theme }) => theme.colors.shadowDark}, -10px -10px 20px ${({ theme }) => theme.colors.shadowLight};
      }
    `}
  
  ${({ isLoading }) =>
    isLoading &&
    css`
      & > *:not(${LoadingOverlay}) {
        filter: blur(4px);
      }
    `}
`;