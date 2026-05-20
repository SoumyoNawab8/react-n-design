export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartProps {
  data: ChartDataPoint[];
  width?: number;
  height?: number;
  color?: string;
  title?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
}

export const PADDING = { top: 20, right: 20, bottom: 40, left: 48 };

export function useChartScales(
  data: ChartDataPoint[],
  width: number,
  height: number
) {
  const chartWidth = Math.max(0, width - PADDING.left - PADDING.right);
  const chartHeight = Math.max(0, height - PADDING.top - PADDING.bottom);

  const values = data.map((d) => d.value);
  let min = Math.min(...values);
  let max = Math.max(...values);

  if (min === max) {
    min = Math.max(0, min - 1);
    max = max + 1;
  }

  const range = max - min || 1;

  const yScale = (v: number) =>
    PADDING.top + chartHeight - ((v - min) / range) * chartHeight;

  const xScale = (i: number) =>
    PADDING.left +
    (data.length > 1 ? (i / (data.length - 1)) * chartWidth : chartWidth / 2);

  const xScaleBar = (i: number) => {
    const slotWidth = chartWidth / data.length;
    return PADDING.left + i * slotWidth;
  };

  return { chartWidth, chartHeight, min, max, range, yScale, xScale, xScaleBar };
}

export function buildAriaLabel(
  chartType: string,
  title: string | undefined,
  data: ChartDataPoint[]
): string {
  const items = data.map((d) => `${d.label}: ${d.value}`).join(', ');
  return `${chartType} chart${title ? ` titled "${title}"` : ''} showing ${items}`;
}
