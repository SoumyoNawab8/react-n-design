'use client';
import styled, { css, keyframes } from 'styled-components';
import { iconColor } from '../../styles/iconColor';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const pulseBorder = keyframes`
  0%, 100% { border-color: ${({ theme }) => `${theme.colors.primary}40`}; }
  50% { border-color: ${({ theme }) => `${theme.colors.primary}80`}; }
`;

const statusColors: Record<string, { border: string; iconBg: string }> = {
  loading: {
    border: '#6d5dfc',
    iconBg: '#6d5dfc20',
  },
  success: {
    border: '#28a745',
    iconBg: '#28a74520',
  },
  error: {
    border: '#dc3545',
    iconBg: '#dc354520',
  },
};

export const StyledToolCallCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.cardBg};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;

  ${({ status }) => {
    const color = statusColors[status]?.border || 'transparent';
    if (status === 'loading') {
      return css`
        border: 1px solid ${color}40;
        animation: ${pulseBorder} 2s ease-in-out infinite;
      `;
    }
    if (status === 'success') {
      return css`
        border-left: 3px solid ${color};
      `;
    }
    if (status === 'error') {
      return css`
        border-left: 3px solid ${color};
      `;
    }
    return css`
      border: 1px solid ${({ theme }) => `${theme.colors.shadowDark}40`};
    `;
  }}
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ToolIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  font-size: 14px;
  flex-shrink: 0;
  ${iconColor}

  ${({ status }) => {
    const bg = statusColors[status]?.iconBg || '#00000010';
    const color = statusColors[status]?.border || '#555';
    return css`
      background: ${bg};
      color: ${color};
    `;
  }}

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ToolName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

export const ToolStatusBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  border-radius: 999px;
  flex-shrink: 0;

  ${({ status }) => {
    const color = statusColors[status]?.border || '#555';
    return css`
      background: ${color}15;
      color: ${color};
    `;
  }}
`;

export const DurationBadge = styled.span`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => `${theme.colors.shadowDark}20`};
  padding: 2px 8px;
  border-radius: 999px;
  flex-shrink: 0;
  font-variant-numeric: tabular-nums;
`;

export const StatusIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  font-size: 14px;
  ${iconColor}

  ${({ status }) => {
    if (status === 'loading') {
      return css`
        animation: ${spin} 1s linear infinite;
      `;
    }
    return '';
  }}

  ${({ status }) => {
    const color = statusColors[status]?.border || '#555';
    return css`
      color: ${color};
    `;
  }}

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ArgsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  pre {
    margin: 0;
    padding: 10px 12px;
    background: ${({ theme }) => `${theme.colors.shadowDark}15`};
    border-radius: 8px;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 12px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textSecondary};
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-word;
    border: 1px solid ${({ theme }) => `${theme.colors.shadowDark}20`};
  }
`;

export const ArgsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const ArgsToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 2px 6px;
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.15s ease;
  ${iconColor}

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  svg {
    width: 12px;
    height: 12px;
  }
`;

export const ResultBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  background: ${({ theme }) => `${statusColors.success.border}08`};
  border: 1px solid ${({ theme }) => `${statusColors.success.border}20`};
  border-radius: 8px;

  > span:first-child {
    font-size: 12px;
    font-weight: 600;
    color: ${statusColors.success.border};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p,
  div {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  background: ${({ theme }) => `${statusColors.error.border}08`};
  border: 1px solid ${({ theme }) => `${statusColors.error.border}20`};
  border-radius: 8px;

  > span:first-child {
    font-size: 12px;
    font-weight: 600;
    color: ${statusColors.error.border};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  p {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
  }
`;
