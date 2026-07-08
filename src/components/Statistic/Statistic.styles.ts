'use client';
import styled from 'styled-components';
import { iconColor } from '../../styles/iconColor';

export const StatisticContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatisticTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.shadowDark};
  line-height: 1.4;
`;

export const StatisticValue = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
`;

export const StatisticPrefix = styled.span`
  font-size: 0.75em;
  color: ${({ theme }) => theme.colors.shadowDark};
`;

export const StatisticSuffix = styled.span`
  font-size: 0.75em;
  color: ${({ theme }) => theme.colors.shadowDark};
`;

export const TrendIndicator = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'trend',
})<{ trend: 'up' | 'down' }>`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  font-size: 0.5em;
  color: ${({ trend }) => (trend === 'up' ? '#52c41a' : '#ff4d4f')};
  ${iconColor}

  svg {
    width: 1.2em;
    height: 1.2em;
  }
`;
