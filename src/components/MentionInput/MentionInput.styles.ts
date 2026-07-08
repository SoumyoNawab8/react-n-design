'use client';
import styled from 'styled-components';

export const MentionInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const MentionInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const MentionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  color: transparent;
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.5;
  font-family: inherit;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const MentionPill = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary}20;
  color: transparent;
  padding: 2px 6px;
  border-radius: 999px;
  font-weight: 500;
  margin: 0 1px;
`;

export const MentionTextarea = styled.textarea`
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 80px;
  resize: vertical;
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
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  &:focus {
    box-shadow: ${({ theme }) => `${theme.shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40`};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const MentionDropdown = styled.ul`
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

export const MentionDropdownItem = styled.li.withConfig({
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

  & > span:last-child {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
