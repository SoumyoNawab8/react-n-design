'use client';
import styled, { css } from 'styled-components';

const getStatusColor = (status: string, theme: any): string => {
  const colors: Record<string, string> = {
    success: '#52c41a',
    error: '#ff4d4f',
    info: '#1890ff',
    warning: '#faad14',
    '403': '#faad14',
    '500': '#ff4d4f',
  };
  return colors[status] || theme?.colors?.text || '#555';
};

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
  text-align: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  max-width: 600px;
  margin: 0 auto;
`;

export const ResultIcon = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  font-size: 72px;
  margin-bottom: 24px;
  
  ${({ status, theme }) => {
    const colorValue = getStatusColor(status, theme);
    return css`
      color: ${colorValue};
    `;
  }}
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const ResultTitle = styled.h2`
  margin: 0 0 12px;
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

export const ResultSubtitle = styled.div`
  margin: 0 0 24px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.shadowDark};
  line-height: 1.5;
  max-width: 400px;
`;

export const ResultExtra = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;
