'use client';
import styled, { css } from 'styled-components';

const positionStyles = {
  static: css``,
  sticky: css`
    position: sticky;
    top: 0;
    z-index: 100;
  `,
  fixed: css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  `,
};

export const StyledAppBar = styled.header.withConfig({
  shouldForwardProp: (prop) => !['elevated', 'position'].includes(prop),
})<{
  elevated: boolean;
  position: 'static' | 'sticky' | 'fixed';
}>`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  ${({ position }) => positionStyles[position]}
  
  ${({ elevated, theme }) =>
    elevated
      ? css`
          box-shadow: ${theme.shadows.soft};
        `
      : css`
          border-bottom: 1px solid ${(theme as any).colors.shadowDark}30;
        `}
`;

export const AppBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 24px;
  min-height: 64px;
  max-width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 12px 16px;
    min-height: 56px;
  }
`;

export const MenuButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const AppBarTitle = styled.h1`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const AppBarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  flex-shrink: 0;
`;