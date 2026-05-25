'use client';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

export const FileUploadRegion = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isDragOver', 'disabled', 'hasError'].includes(prop),
})<{
  isDragOver: boolean;
  disabled: boolean;
  hasError: boolean;
}>`
  position: relative;
  width: 100%;
  max-width: 480px;
  padding: 24px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => (theme as any).shadows.softInset};
  transition: box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
  border: 2px dashed transparent;

  ${({ isDragOver, theme }) =>
    isDragOver &&
    css`
      border-color: ${theme.colors.primary};
      box-shadow: ${(theme as any).shadows.softInset},
        0 0 0 3px ${theme.colors.primary}30;
    `}

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: #e53e3e;
    `}

  &:focus-within {
    outline: none;
    box-shadow: ${({ theme }) =>
      `${(theme as any).shadows.softInset}, 0 0 0 2px ${theme.colors.primary}40`};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
    `}
`;

export const FileUploadInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const FileUploadIcon = styled.div`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FileUploadText = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

export const FileUploadHint = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => (theme as any).colors.shadowDark};
`;

export const FileList = styled(motion.div)`
  margin-top: 16px;
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

export const FileItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;
`;

export const FileItemInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const FileItemName = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FileItemSize = styled.span`
  font-size: 11px;
  color: ${({ theme }) => (theme as any).colors.shadowDark};
`;

export const FileItemProgress = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => (theme as any).colors.shadowDark}40;
  border-radius: 999px;
  overflow: hidden;
`;

export const FileItemProgressBar = styled.div.withConfig({
  shouldForwardProp: (prop) => !['progress'].includes(prop),
})<{ progress: number }>`
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  transition: width 0.3s ease;
`;

export const FileItemRemove = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => (theme as any).colors.shadowDark};
  font-size: 14px;
  padding: 4px;
  border-radius: 50%;
  transition: color 0.15s ease, background 0.15s ease;
  flex-shrink: 0;

  &:hover {
    color: #e53e3e;
    background: #e53e3e15;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;

export const FileUploadError = styled.p`
  margin: 0;
  font-size: 12px;
  color: #e53e3e;
`;

export const FileUploadStatus = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;
