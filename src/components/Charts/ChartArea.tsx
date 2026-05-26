'use client';
import { useMemo, useState } from 'react';
import { ChartContainer, ChartSvg, ChartTitle, Tooltip } from './Charts.styles';
import { buildAriaLabel, type ChartProps, PADDING, useChartScales } from './types';

function escapeSvgText(text: string): string {
  return text.replace(/</g, '&lt;');
}

export function ChartArea({
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
  const { chartWidth, chartHeight, min, max, yScale, xScale } = useChartScales(
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

  const points = data.map((d, i) => ({
    x: xScale(i),
    y: yScale(d.value),
  }));

  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const first = points[0];
    const last = points[points.length - 1];
    const bottomY = PADDING.top + chartHeight;
    const commands = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`);
    return `${commands.join(' ')} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;
  }, [points, chartHeight]);

  const linePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  const gridLines = useMemo(() => {
    if (!showGrid) return [];
    const count = 5;
    return Array.from({ length: count + 1 }, (_, i) => {
      const y = PADDING.top + (i / count) * chartHeight;
      return (
        <line
          // biome-ignore lint/suspicious/noArrayIndexKey: static grid lines
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
          // biome-ignore lint/suspicious/noArrayIndexKey: static axis labels
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

  const ariaLabel = buildAriaLabel('Area', title, data);

  const gradientId = `area-gradient-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <ChartContainer width={width}>
      {title && <ChartTitle>{title}</ChartTitle>}
      <div style={{ position: 'relative' }}>
        <ChartSvg viewBox={`0 0 ${svgWidth} ${svgHeight}`} role="img" aria-label={ariaLabel}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          </defs>

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

            {/* Filled area */}
            <path d={areaPath} fill={`url(#${gradientId})`} pointerEvents="none" />

            {/* Top line */}
            <polyline
              points={linePoints}
              fill="none"
              stroke={color}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              pointerEvents="none"
            />

            {/* Data points and labels */}
            {data.map((d, i) => {
              const px = xScale(i);
              const py = yScale(d.value);
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: data points use sequential indexing
                <g key={`point-${i}`}>
                  <circle
                    cx={px}
                    cy={py}
                    r={5}
                    fill={color}
                    stroke={color}
                    strokeWidth={2}
                    fillOpacity={0.2}
                    style={{ cursor: 'pointer' }}
                    role="button"
                    tabIndex={0}
                    onMouseEnter={() =>
                      setTooltip({
                        x: px,
                        y: py,
                        label: d.label,
                        value: d.value,
                      })
                    }
                    onMouseLeave={() => setTooltip(null)}
                  />
                  {showValues && (
                    <text
                      x={px}
                      y={py - 12}
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
                      x={px}
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
