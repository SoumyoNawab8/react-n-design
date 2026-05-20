import styled from 'styled-components';

export const ChartContainer = styled.div<{ width?: number }>`
  position: relative;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 16px;
  box-sizing: border-box;
`;

export const ChartTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ChartSvg = styled.svg`
  display: block;
  width: 100%;
  height: 100%;
`;

export const Tooltip = styled.div`
  position: absolute;
  pointer-events: none;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  transform: translate(-50%, -120%);
  transition: opacity 0.15s ease;
  z-index: 10;
`;
