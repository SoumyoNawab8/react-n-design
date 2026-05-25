'use client';
import { useMemo, useState } from 'react';
import { ChartContainer, ChartSvg, ChartTitle, Tooltip } from './Charts.styles';
import { buildAriaLabel, type ChartProps, PADDING, useChartScales } from './types';

function escapeSvgText(text: string): string {
  return text.replace(/</g, '&lt;');
}

export function ChartBar({
  data,
  width,
  height = 240,
  color = '#6d5dfc',
  title,
  showGrid = true,
  showLabels = true,
  showValues = true,
}: ChartProps) {
  const svgWidth = width ?? 400;
  const svgHeight = height;
  const { chartWidth, chartHeight, min, max, yScale, xScaleBar } = useChartScales(
    data,
    svgWidth,
    svgHeight
  );

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    label: string;
    value: number;
  } | null>(null);

  const slotWidth = chartWidth / data.length;
  const barWidth = slotWidth * 0.6;

  const gridLines = useMemo(() => {
    if (!showGrid) return [];
    const count = 5;
    return Array.from({ length: count + 1 }, (_, i) => {
      const y = PADDING.top + (i / count) * chartHeight;
      return (
        <line
          key={`grid-${i}`}
          x1={PADDING.left}
          y1={y}
          x2={PADDING.left + chartWidth}
          y2={y}
          stroke="currentColor"
          strokeOpacity={0.1}
          strokeWidth={1}
        />
      );
    });
  }, [showGrid, chartHeight, chartWidth]);

  const yAxisLabels = useMemo(() => {
    if (!showGrid) return [];
    const count = 5;
    return Array.from({ length: count + 1 }, (_, i) => {
      const value = max - (i / count) * (max - min);
      const y = PADDING.top + (i / count) * chartHeight;
      return (
        <text
          key={`y-label-${i}`}
          x={PADDING.left - 8}
          y={y + 4}
          textAnchor="end"
          fontSize={10}
          fill="currentColor"
          fillOpacity={0.6}
        >
          {Math.round(value)}
        </text>
      );
    });
  }, [showGrid, chartHeight, min, max]);

  const ariaLabel = buildAriaLabel('Bar', title, data);

  return (
    <ChartContainer width={width}>
      {title && <ChartTitle>{title}</ChartTitle>}
      <div style={{ position: 'relative' }}>
        <ChartSvg viewBox={`0 0 ${svgWidth} ${svgHeight}`} role="img" aria-label={ariaLabel}>
          <g color={color}>
            {gridLines}
            {yAxisLabels}

            {/* X axis baseline */}
            <line
              x1={PADDING.left}
              y1={PADDING.top + chartHeight}
              x2={PADDING.left + chartWidth}
              y2={PADDING.top + chartHeight}
              stroke="currentColor"
              strokeOpacity={0.2}
              strokeWidth={1}
            />

            {/* Bars */}
            {data.map((d, i) => {
              const x = xScaleBar(i) + (slotWidth - barWidth) / 2;
              const y = yScale(d.value);
              const barHeight = PADDING.top + chartHeight - y;
              const rx = Math.min(barWidth / 2, 6);

              return (
                <g key={`bar-${i}`}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={Math.max(0, barHeight)}
                    rx={rx}
                    ry={rx}
                    fill={color}
                    fillOpacity={0.85}
                    stroke={color}
                    strokeWidth={1}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() =>
                      setTooltip({
                        x: x + barWidth / 2,
                        y,
                        label: d.label,
                        value: d.value,
                      })
                    }
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {showValues && (
                    <text
                      x={x + barWidth / 2}
                      y={y - 6}
                      textAnchor="middle"
                      fontSize={10}
                      fontWeight={600}
                      fill="currentColor"
                      fillOpacity={0.8}
                      pointerEvents="none"
                    >
                      {d.value}
                    </text>
                  )}
                  {showLabels && (
                    <text
                      x={x + barWidth / 2}
                      y={PADDING.top + chartHeight + 14}
                      textAnchor="middle"
                      fontSize={10}
                      fill="currentColor"
                      fillOpacity={0.6}
                      pointerEvents="none"
                    >
                      {escapeSvgText(d.label)}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </ChartSvg>

        {tooltip && (
          <Tooltip
            style={{
              left: `${(tooltip.x / svgWidth) * 100}%`,
              top: `${(tooltip.y / svgHeight) * 100}%`,
            }}
          >
            {escapeSvgText(tooltip.label)}: {tooltip.value}
          </Tooltip>
        )}
      </div>
    </ChartContainer>
  );
}
