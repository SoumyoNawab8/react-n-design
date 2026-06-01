'use client';
import styled, { css } from 'styled-components';

export const HeatmapCalendarWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  font-family: inherit;
`;

export const HeatmapMonthLabels = styled.div`
  position: relative;
  height: 16px;
  margin-bottom: 4px;
  margin-left: 32px;
`;

export const HeatmapMonthLabel = styled.span`
  position: absolute;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`;

export const HeatmapWeekdayLabels = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 112px; /* 7 * 14 + 6 * 2 approx */
  margin-right: 8px;
`;

export const HeatmapWeekdayLabel = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1;
`;

export const HeatmapGrid = styled.div`
  display: flex;
  gap: 2px;
`;

export const HeatmapColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const HeatmapCellWrapper = styled.div`
  position: relative;
  width: 12px;
  height: 12px;

  &:hover [data-heatmap-tooltip] {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(-4px);
  }
`;

export const HeatmapTooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%) translateY(0);
  padding: 6px 10px;
  background: ${({ theme }) => theme.colors.cardBg};
  color: ${({ theme }) => theme.colors.text};
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
  border-radius: 6px;
  box-shadow: ${({ theme }) => theme.shadows.soft};
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, transform 0.15s ease;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.cardBg} transparent transparent transparent;
  }
`;

export const HeatmapCell = styled.div.withConfig({
  shouldForwardProp: (prop) => !['intensity', 'isInYear'].includes(prop),
})<{
  intensity: number;
  isInYear: boolean;
}>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  box-sizing: border-box;
  transition: opacity 0.2s ease;

  ${({ isInYear, intensity, theme }) => {
    if (!isInYear) {
      return css`
        background-color: transparent;
        pointer-events: none;
      `;
    }

    switch (intensity) {
      case 0:
        return css`
          background-color: ${theme.colors.hoverBg};
        `;
      case 1:
        return css`
          background-color: ${theme.colors.primary}20;
        `;
      case 2:
        return css`
          background-color: ${theme.colors.primary}40;
        `;
      case 3:
        return css`
          background-color: ${theme.colors.primary}70;
        `;
      case 4:
        return css`
          background-color: ${theme.colors.primary};
        `;
      default:
        return css`
          background-color: ${theme.colors.hoverBg};
        `;
    }
  }}

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
