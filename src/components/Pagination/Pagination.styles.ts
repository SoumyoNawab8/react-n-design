'use client';
import styled, { css } from 'styled-components';

export const PaginationContainer = styled.nav`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

const baseButtonStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  user-select: none;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.softInset};
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: ${({ theme }) => theme.shadows.softInset};
    color: ${({ theme }) => theme.colors.disabledText};
    transform: none;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const PaginationItem = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$isActive',
})<{ $isActive: boolean }>`
  ${baseButtonStyles}

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          color: ${theme.colors.primary};
          box-shadow: ${theme.shadows.softInset};
          font-weight: 600;
        `
      : css``}
`;

export const PaginationButton = styled.button`
  ${baseButtonStyles}
  padding: 0;
  width: 40px;
`;

export const PaginationEllipsis = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.shadowDark};
  font-size: 14px;
  font-weight: 500;
  user-select: none;
  cursor: default;
`;
