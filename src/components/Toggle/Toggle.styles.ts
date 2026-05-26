import styled, { css } from 'styled-components';

export const ToggleButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['pressed'].includes(prop),
})<{ pressed: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius || '12px'};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;

  ${({ pressed, theme }) =>
    pressed
      ? css`
          box-shadow: ${theme.shadows.softInset};
          color: ${theme.colors.primary};
        `
      : css`
          box-shadow: ${theme.shadows.soft};
          &:hover {
            background: ${theme.colors.hoverBg};
          }
          &:active {
            box-shadow: ${theme.shadows.softInset};
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: ${({ theme }) => theme.shadows.soft};
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const ToggleGroupContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
`;
