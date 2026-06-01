import styled from 'styled-components';

export const TerminalContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 13px;
  line-height: 1.5;
`;

export const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TerminalTitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TerminalWindowControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const TerminalWindowDot = styled.div<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: inset 0 0 0 0.5px rgba(0, 0, 0, 0.1);
`;

export const TerminalTitle = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  user-select: none;
`;

export const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.hoverBg};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const TerminalContent = styled.div<{ $maxHeight?: string }>`
  padding: 12px 16px;
  overflow-y: auto;
  max-height: ${({ $maxHeight }) => $maxHeight || '400px'};
  color: ${({ theme }) => theme.colors.text};
`;

export const TerminalLine = styled.div<{ $type?: 'command' | 'output' | 'error' | 'info' }>`
  display: flex;
  align-items: baseline;
  gap: 6px;
  padding: 2px 0;
  white-space: pre-wrap;
  word-break: break-word;

  ${({ $type, theme }) => {
    switch ($type) {
      case 'command':
        return `color: ${theme.colors.primary}; font-weight: 600;`;
      case 'error':
        return `color: ${theme.colors.error};`;
      case 'info':
        return `color: ${theme.colors.textSecondary}; font-style: italic;`;
      default:
        return `color: ${theme.colors.text};`;
    }
  }}
`;

export const TerminalLinePrefix = styled.span`
  user-select: none;
  opacity: 0.8;
`;

export const TerminalLineTimestamp = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 11px;
  user-select: none;
  flex-shrink: 0;
`;
