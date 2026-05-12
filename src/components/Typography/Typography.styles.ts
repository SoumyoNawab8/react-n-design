'use client';
import styled, { css } from 'styled-components';

const textSizes = {
  small: 'var(--n-font-size-sm, 14px)',
  medium: 'var(--n-font-size-base, 16px)',
  large: 'var(--n-font-size-lg, 18px)',
};

const weights = {
  normal: 400,
  medium: 500,
  bold: 700,
};

export const StyledText = styled.span.withConfig({
  shouldForwardProp: (prop) =>
    !['size', 'weight', 'color', 'truncate', 'as'].includes(prop),
})<{
  size: 'small' | 'medium' | 'large';
  weight: 'normal' | 'medium' | 'bold';
  color?: string;
  truncate: boolean;
}>`
  font-size: ${({ size }) => textSizes[size]};
  font-weight: ${({ weight }) => weights[weight]};
  color: ${({ color, theme }) => color || theme.colors.text};
  line-height: 1.5;
  margin: 0;

  ${({ truncate }) =>
    truncate &&
    css`
      display: inline-block;
      max-width: 100%;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `}
`;

const headingSizes = {
  1: '2.5rem',
  2: '2rem',
  3: '1.5rem',
  4: '1.25rem',
  5: '1rem',
};

export const StyledTitle = styled.h1.withConfig({
  shouldForwardProp: (prop) => !['level', 'color'].includes(prop),
})<{
  level: 1 | 2 | 3 | 4 | 5;
  color?: string;
}>`
  font-size: ${({ level }) => headingSizes[level]};
  font-weight: 700;
  line-height: 1.25;
  color: ${({ color, theme }) => color || theme.colors.text};
  margin: 0 0 0.5em 0;
  letter-spacing: -0.01em;
`;

export const StyledParagraph = styled.p.withConfig({
  shouldForwardProp: (prop) => !['size', 'maxLines'].includes(prop),
})<{
  size: 'small' | 'medium' | 'large';
  maxLines?: number;
}>`
  font-size: ${({ size }) => textSizes[size]};
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
  margin: 0 0 1em 0;

  ${({ maxLines }) =>
    maxLines &&
    maxLines > 0 &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`;
