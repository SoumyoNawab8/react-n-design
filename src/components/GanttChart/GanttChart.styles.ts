import styled, { css } from 'styled-components';

export const GanttChartWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  padding: 16px;
`;

export const GanttChartContainer = styled.div`
  display: flex;
  min-width: 0;
`;

export const GanttLabelColumn = styled.div`
  flex: 0 0 180px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 2;
  background: ${({ theme }) => theme.colors.background};
`;

export const GanttLabelCell = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}30;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const GanttTimelineArea = styled.div`
  flex: 1 1 auto;
  overflow-x: auto;
  position: relative;
`;

export const GanttTimelineHeader = styled.div`
  position: relative;
  height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
`;

export const TimeLabel = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-right: 1px solid ${({ theme }) => theme.colors.border}30;
  box-sizing: border-box;
`;

export const GanttTimelineRows = styled.div`
  position: relative;
`;

export const GanttTimelineRow = styled.div`
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}30;
`;

export const GanttGridLine = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$isWeekend',
})<{ $isWeekend: boolean }>`
  position: absolute;
  top: 0;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.border}20;
  box-sizing: border-box;

  ${({ $isWeekend, theme }) =>
    $isWeekend &&
    css`
      background-color: ${theme.colors.cardBg}60;
    `}
`;

export const GanttBar = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$color',
})<{ $color?: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 24px;
  border-radius: 8px;
  background-color: ${({ $color, theme }) => $color || theme.colors.primary};
  opacity: 0.85;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

export const GanttBarProgress = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== '$color',
})<{ $color?: string }>`
  height: 100%;
  background-color: ${({ $color, theme }) =>
    $color
      ? 'rgba(0,0,0,0.25)'
      : 'rgba(0,0,0,0.2)'};
  border-radius: 8px 0 0 8px;
`;
