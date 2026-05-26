'use client';
import styled from 'styled-components';

export const PromptInputWrapper = styled.div`
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

export const TextAreaWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  min-height: 56px;
  max-height: 200px;
  resize: none;
  border: none;
  outline: none;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  font-family: inherit;
  box-sizing: border-box;
  transition: box-shadow 0.2s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.colors.shadowDark};
  }

  &:focus {
    box-shadow: ${({ theme }) => `${theme.shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40`};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const PromptInputFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const TokenCounter = styled.div.withConfig({
  shouldForwardProp: (prop) => !['nearLimit'].includes(prop),
})<{ nearLimit?: boolean }>`
  font-size: 12px;
  font-weight: 500;
  color: ${({ nearLimit }) => (nearLimit ? '#e53e3e' : '#6d5dfc')};
`;

export const SendButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.softInset};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const SlashMenu = styled.ul`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 8px 0;
  margin: 0;
  list-style: none;
  z-index: 100;
  box-sizing: border-box;
`;

export const SlashMenuItem = styled.li.withConfig({
  shouldForwardProp: (prop) => !['isHighlighted'].includes(prop),
})<{ isHighlighted?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  font-size: 13px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ isHighlighted, theme }) =>
    isHighlighted ? theme.colors.hoverBg : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
  }

  & > span:first-child {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }

  & > span:last-child {
    opacity: 0.6;
    font-size: 12px;
  }
`;

export const MentionMenu = styled(SlashMenu)``;
export const MentionMenuItem = styled(SlashMenuItem)``;
