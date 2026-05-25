import styled, { css } from 'styled-components';

export const IconContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size'].includes(prop),
})<{
  variant: 'default' | 'circle' | 'square';
  size: number;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ variant, size, theme }) =>
    variant !== 'default' &&
    css`
      width: ${size * 1.8}px;
      height: ${size * 1.8}px;
      background: ${theme.colors.background};
      box-shadow: 7px 7px 14px ${theme.colors.shadowDark}, -7px -7px 14px ${theme.colors.shadowLight};
      border-radius: ${variant === 'circle' ? '50%' : theme.borderRadius};
    `}
`;

export const StyledIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => !['size', 'color'].includes(prop),
})<{
  size: number;
  color?: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ size }) => size}px;
  color: ${({ color, theme }) => color || theme.colors.text};
  line-height: 1;

  svg {
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
  }
`;
