import styled, { css, keyframes } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const GradientBorderWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'animated',
})<{
  animated?: boolean;
}>`
  position: relative;
  z-index: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  padding: 2px;

  &::before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: conic-gradient(
      from 0deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.primary}88,
      ${({ theme }) => theme.colors.primary}44,
      ${({ theme }) => theme.colors.primary}88,
      ${({ theme }) => theme.colors.primary}
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  ${({ animated }) =>
    animated &&
    css`
      &::before {
        animation: ${rotate} 4s linear infinite;
      }
    `}

  /* Fallback for browsers that don't support mask-composite: exclude */
  @supports not (mask-composite: exclude) {
    padding: 0;
    border: 2px solid ${({ theme }) => theme.colors.primary};

    &::before {
      display: none;
    }
  }
`;

export const GradientBorderInner = styled.div`
  position: relative;
  z-index: 1;
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: calc(${({ theme }) => theme.borderRadius} - 2px);
  height: 100%;
`;
