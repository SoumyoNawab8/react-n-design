'use client';
import styled from 'styled-components';

export const CodeBlockWrapper = styled.div`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  overflow: hidden;
  box-sizing: border-box;
`;

export const CodeBlockHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: ${({ theme }) => (theme as any).colors.hoverBg}20;
  border-bottom: 1px solid ${({ theme }) => (theme as any).colors.shadowDark}20;
`;

export const CodeBlockLanguage = styled.span.withConfig({
  shouldForwardProp: (prop) => !['color'].includes(prop),
})<{ color?: string }>`
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ color, theme }) => color || theme.colors.primary};
`;

export const CodeBlockCopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => (theme as any).colors.hoverBg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  & > span {
    font-size: 12px;
  }
`;

export const CodeBlockContent = styled.div`
  padding: 12px 16px;
  overflow-x: auto;
`;

export const CodeBlockPre = styled.pre`
  margin: 0;
  font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  white-space: pre;
`;

export const CodeBlockLine = styled.div`
  display: flex;
  align-items: center;
  min-height: 1.6em;
`;

export const CodeBlockLineNumber = styled.span`
  display: inline-block;
  width: 2.5em;
  text-align: right;
  margin-right: 12px;
  color: ${({ theme }) => (theme as any).colors.shadowDark};
  opacity: 0.6;
  font-size: 12px;
  flex-shrink: 0;
  user-select: none;
`;

export const CodeBlockLineContent = styled.span`
  flex: 1;
`;
