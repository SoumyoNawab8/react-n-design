'use client';
import styled, { css } from 'styled-components';
import { iconColor } from '../../styles/iconColor';

export const BadgeWrapper = styled.span.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size', 'dot'].includes(prop),
})<{
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size: 'small' | 'medium';
  dot?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  white-space: nowrap;
  border-radius: ${({ dot }) => (dot ? '50%' : '9999px')};
  transition: all 0.2s ease-in-out;

  ${({ size, dot }) =>
    size === 'small'
      ? css`
          padding: ${dot ? '0' : '2px 8px'};
          font-size: 10px;
          min-width: ${dot ? '8px' : '18px'};
          height: ${dot ? '8px' : '18px'};
        `
      : css`
          padding: ${dot ? '0' : '4px 12px'};
          font-size: 12px;
          min-width: ${dot ? '10px' : '22px'};
          height: ${dot ? '10px' : '22px'};
        `}

  ${({ variant, theme }) => {
    switch (variant) {
      case 'success':
        return css`background: #28a745; color: ${theme.colors.background};`;
      case 'warning':
        return css`background: #FAAD14; color: ${theme.colors.background};`;
      case 'error':
        return css`background: #DC3545; color: ${theme.colors.background};`;
      case 'secondary':
        return css`background: ${theme.colors.hoverBg}; color: ${theme.colors.text};`;
      default:
        return css`background: ${theme.colors.primary}; color: ${theme.colors.background};`;
    }
  }}

  ${iconColor}
`;

export const BadgeContainer = styled.span`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
`;

export const BadgePositioned = styled(BadgeWrapper)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  z-index: 1;
`;
