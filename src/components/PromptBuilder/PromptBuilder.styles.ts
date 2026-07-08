'use client';
import styled from 'styled-components';
import { iconColor } from '../../styles/iconColor';

export const PromptBuilderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  box-sizing: border-box;
`;

export const SystemPromptTextArea = styled.textarea`
  width: 100%;
  min-height: 72px;
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
    color: ${({ theme }) => theme.colors.shadowDark};
    opacity: 1;
  }

  &:focus {
    box-shadow: ${({ theme }) =>
      `${theme.shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40`};
  }
`;

export const ExamplesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ExampleItemContainer = styled.div<{ $role: 'user' | 'assistant' }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  background: ${({ theme, $role }) =>
    $role === 'user' ? theme.colors.cardBg : theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  border-left: 4px solid
    ${({ theme, $role }) => ($role === 'user' ? theme.colors.primary : '#1abc9c')};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  box-sizing: border-box;
`;

export const RoleBadge = styled.div<{ $role: 'user' | 'assistant' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ theme, $role }) =>
    $role === 'user' ? `${theme.colors.primary}15` : `#1abc9c15`};
  color: ${({ theme, $role }) =>
    $role === 'user' ? theme.colors.primary : '#1abc9c'};
`;

export const TextAreaContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const HighlightOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.5;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text};
  pointer-events: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.borderRadius};
  z-index: 0;
`;

export const StyledTextArea = styled.textarea`
  position: relative;
  width: 100%;
  min-height: 72px;
  resize: vertical;
  border: none;
  outline: none;
  background: transparent;
  color: transparent;
  caret-color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  padding: 14px 16px;
  font-size: 14px;
  line-height: 1.5;
  font-family: inherit;
  box-sizing: border-box;
  z-index: 1;
  transition: box-shadow 0.2s ease-in-out;
  overflow: auto;

  &::placeholder {
    color: ${({ theme }) => theme.colors.shadowDark};
    opacity: 1;
  }

  &::selection {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => `${theme.colors.primary}40`};
  }

  &:focus {
    box-shadow: ${({ theme }) =>
      `${theme.shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40`};
  }
`;

export const VariableHighlight = styled.span`
  color: #ff6b6b;
  font-weight: 600;
`;

export const ExampleActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: all 0.2s ease;
  ${iconColor}

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
    filter: brightness(1.05);
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

export const FooterActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 4px;
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: all 0.2s ease;
  ${iconColor}

  &:hover {
    filter: brightness(1.1);
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows.softInset};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
