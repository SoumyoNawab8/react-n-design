'use client';
import styled, { css } from 'styled-components';

const sizeMap = {
  small: { width: '32px', fontSize: '14px' },
  medium: { width: '40px', fontSize: '16px' },
  large: { width: '56px', fontSize: '24px' },
  xlarge: { width: '80px', fontSize: '32px' },
};

export const AvatarWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size', 'shape'].includes(prop),
})<{
  size: 'small' | 'medium' | 'large' | 'xlarge';
  shape: 'circle' | 'square' | 'rounded';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  user-select: none;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;

  width: ${({ size }) => sizeMap[size].width};
  height: ${({ size }) => sizeMap[size].width};
  font-size: ${({ size }) => sizeMap[size].fontSize};

  ${({ shape, theme }) => {
    switch (shape) {
      case 'square':
        return css`border-radius: ${theme.borderRadius};`;
      case 'rounded':
        return css`border-radius: 20%;`;
      case 'circle':
      default:
        return css`border-radius: 50%;`;
    }
  }}
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarFallback = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const AvatarGroupWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  & ${AvatarWrapper} {
    border: 2px solid ${({ theme }) => theme.colors.background};
    margin-left: -8px;
  }

  & ${AvatarWrapper}:first-child {
    margin-left: 0;
  }
`;

export const AvatarGroupOverflow = styled.div.withConfig({
  shouldForwardProp: (prop) => !['size'].includes(prop),
})<{ size: 'small' | 'medium' | 'large' | 'xlarge' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => sizeMap[size].width};
  height: ${({ size }) => sizeMap[size].width};
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ size }) => sizeMap[size].fontSize};
  font-weight: 600;
  margin-left: -8px;
  border: 2px solid ${({ theme }) => theme.colors.background};
`;
