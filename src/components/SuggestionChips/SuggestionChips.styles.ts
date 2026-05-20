'use client';
import styled, { css } from 'styled-components';

export const SuggestionChipsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 16px;
  box-sizing: border-box;
  gap: 12px;
`;

export const SuggestionChipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SuggestionChipItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => (theme as any).colors.cardBg};
  box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  outline: none;
  transition: box-shadow 0.2s ease;

  &:focus-visible {
    box-shadow: ${({ theme }) =>
      `${(theme as any).shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40`};
  }
`;

export const SuggestionChipTypeIndicator = styled.div.withConfig({
  shouldForwardProp: (prop) => !['chipType'].includes(prop),
})<{ chipType?: 'insert' | 'replace' | 'delete' }>`
  width: 3px;
  height: 16px;
  border-radius: 2px;
  background: ${({ chipType, theme }) => {
    if (chipType === 'insert') return theme.colors.primary;
    if (chipType === 'replace') return '#f59e0b';
    if (chipType === 'delete') return '#ef4444';
    return 'transparent';
  }};
  flex-shrink: 0;
`;

export const SuggestionChipText = styled.span`
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
  word-break: break-word;
`;

export const SuggestionChipActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const SuggestionChipButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<{ variant: 'accept' | 'reject' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  ${({ variant, theme }) =>
    variant === 'accept'
      ? css`
          background: ${theme.colors.primary};
          color: #ffffff;
          &:hover:not(:disabled) {
            filter: brightness(1.1);
          }
        `
      : css`
          background: ${(theme as any).colors.hoverBg};
          color: ${theme.colors.text};
          &:hover:not(:disabled) {
            filter: brightness(0.95);
          }
        `}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const SuggestionChipsFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => `${(theme as any).colors.shadowDark}20`};
`;

export const SuggestionChipsFooterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<{ variant: 'accept' | 'reject' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${({ theme }) => theme.shadows.soft};

  ${({ variant, theme }) =>
    variant === 'accept'
      ? css`
          background: ${theme.colors.primary};
          color: #ffffff;
          &:hover:not(:disabled) {
            filter: brightness(1.1);
          }
        `
      : css`
          background: ${(theme as any).colors.hoverBg};
          color: ${theme.colors.text};
          &:hover:not(:disabled) {
            filter: brightness(0.95);
          }
        `}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
