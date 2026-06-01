'use client';
import styled, { css } from 'styled-components';

export const DiffViewerContainer = styled.div`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

export const DiffViewerHeader = styled.div`
  display: flex;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors.cardBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}40;
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const DiffColumnHeader = styled.div`
  flex: 1;
  text-align: center;
`;

export const DiffColumn = styled.div`
  flex: 1;
  overflow-x: auto;
`;

export const DiffLine = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'removed' | 'added' | 'same' }>`
  display: flex;
  align-items: center;
  min-height: 24px;
  padding: 2px 0;
  white-space: pre;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}20;

  ${({ status }) => {
    switch (status) {
      case 'removed':
        return css`
          background: #dc354515;
          color: #dc3545;
        `;
      case 'added':
        return css`
          background: #28a74515;
          color: #28a745;
        `;
      case 'same':
      default:
        return css`
          background: transparent;
        `;
    }
  }}
`;

export const DiffLineNumber = styled.span`
  display: inline-block;
  width: 40px;
  text-align: right;
  padding-right: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  user-select: none;
  flex-shrink: 0;
  font-size: 12px;
`;

export const DiffLineContent = styled.span`
  flex: 1;
  white-space: pre;
  overflow-x: auto;
`;

export const DiffUnifiedContainer = styled(DiffViewerContainer)``;
