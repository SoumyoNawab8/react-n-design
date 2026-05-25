'use client';
import styled, { css } from 'styled-components';

const sizes = {
  small: '16px',
  medium: '24px',
  large: '32px',
};

export const RatingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

export const RatingItem = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== '$isReadOnly',
})<{ $isReadOnly: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $isReadOnly }) => ($isReadOnly ? 'default' : 'pointer')};
  transition: transform 0.15s ease-in-out;
  
  ${({ $isReadOnly }) =>
    !$isReadOnly && css`
      &:hover {
        transform: scale(1.1);
      }
      
      &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.colors.primary};
        outline-offset: 2px;
        border-radius: 2px;
      }
      
      &:active {
        transform: scale(0.95);
      }
    `}
`;

export const RatingStar = styled.span.withConfig({
  shouldForwardProp: (prop) => !['$isFilled', '$isHalf', '$size'].includes(prop),
})
<{
  $isFilled: boolean;
  $isHalf?: boolean;
  $size: 'small' | 'medium' | 'large';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => sizes[$size]};
  height: ${({ $size }) => sizes[$size]};
  color: ${({ $isFilled, theme }) =>
    $isFilled ? '#ffc107' : (theme as any).colors.shadowDark};
  transition: color 0.2s ease-in-out;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;