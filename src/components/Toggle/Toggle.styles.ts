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
  border-radius: ${({ theme }) => (theme as any).borderRadius || '12px'};
  background: ${({ theme }) => (theme as any).colors.background};
  color: ${({ theme }) => (theme as any).colors.text};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;

  ${({ pressed, theme }) =>
    pressed
      ? css`
          box-shadow: ${(theme as any).shadows.softInset};
          color: ${(theme as any).colors.primary};
        `
      : css`
          box-shadow: ${(theme as any).shadows.soft};
          &:hover {
            background: ${(theme as any).colors.hoverBg};
          }
          &:active {
            box-shadow: ${(theme as any).shadows.softInset};
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    box-shadow: ${({ theme }) => (theme as any).shadows.soft};
    color: ${({ theme }) => (theme as any).colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => (theme as any).colors.primary};
    outline-offset: 2px;
  }
`;

export const ToggleGroupContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px;
`;
