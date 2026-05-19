'use client';
import styled, { css, keyframes } from 'styled-components';

const typingBounce = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-4px); }
`;

export const AIChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 720px;
  height: 100%;
  min-height: 400px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  box-sizing: border-box;
`;

export const AIChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  scroll-behavior: smooth;
`;

export const AIChatMessageRow = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isAssistant'].includes(prop),
})
<{ isAssistant: boolean }>`
  display: flex;
  flex-direction: ${({ isAssistant }) => (isAssistant ? 'row' : 'row-reverse')};
  align-items: flex-start;
  gap: 12px;
`;

export const AIChatMessageBubble = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isAssistant'].includes(prop),
})
<{ isAssistant: boolean }>`
  max-width: 80%;
  padding: 14px 18px;
  border-radius: ${({ isAssistant }) =>
    isAssistant ? '0 16px 16px 16px' : '16px 0 16px 16px'};
  background: ${({ isAssistant, theme }) =>
    isAssistant ? (theme as any).colors.cardBg : theme.colors.primary};
  color: ${({ isAssistant, theme }) => (isAssistant ? theme.colors.text : '#ffffff')};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  box-sizing: border-box;

  a {
    color: ${({ isAssistant, theme }) =>
      isAssistant ? theme.colors.primary : '#ffffff'};
    text-decoration: underline;
  }

  code {
    background: ${({ isAssistant, theme }) =>
      isAssistant ? (theme as any).colors.hoverBg : '#ffffff30'};
    color: ${({ isAssistant, theme }) =>
      isAssistant ? theme.colors.primary : '#ffffff'};
  }

  pre {
    background: ${({ isAssistant, theme }) =>
      isAssistant ? theme.colors.cardBg : '#ffffff15'};
  }
`;

export const AIChatMessageMeta = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isAssistant'].includes(prop),
})
<{ isAssistant: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
  opacity: 0.75;
  color: inherit;

  svg {
    font-size: 14px;
  }
`;

export const AIChatMessageContent = styled.div`
  font-size: 14px;
  line-height: 1.6;
  word-break: break-word;

  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
`;

export const AIChatMessageActions = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

export const AIChatMessageActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  opacity: 0.7;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    background: ${({ theme }) => (theme as any).colors.hoverBg}40;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  & > span {
    font-size: 11px;
  }
`;

export const AIChatInputArea = styled.div`
  padding: 12px 20px 20px;
  background: ${({ theme }) => theme.colors.background};
`;

export const AIChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  padding: 4px 4px 4px 16px;
  transition: box-shadow 0.2s ease-in-out;

  &:focus-within {
    box-shadow: ${({ theme }) =>
      `${(theme as any).shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40`};
  }
`;

export const AIChatInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  min-height: 40px;

  &::placeholder {
    color: ${({ theme }) => (theme as any).colors.shadowDark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const AIChatSendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    filter: brightness(1.1);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const AIChatTypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
`;

export const AIChatTypingDot = styled.span.withConfig({
  shouldForwardProp: (prop) => !['delay'].includes(prop),
})
<{ delay: number }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.6;
  animation: ${typingBounce} 1s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay}s;
`;

export const AIChatEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px 20px;
  color: ${({ theme }) => (theme as any).colors.shadowDark};
  text-align: center;

  svg {
    font-size: 32px;
    opacity: 0.5;
  }

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const AIChatScrollAnchor = styled.div`
  height: 1px;
  flex-shrink: 0;
`;
