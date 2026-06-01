'use client';
import type React from 'react';
import { useMemo } from 'react';
import {
  HeatmapCalendarWrapper,
  HeatmapGrid,
  HeatmapMonthLabels,
  HeatmapMonthLabel,
  HeatmapWeekdayLabels,
  HeatmapWeekdayLabel,
  HeatmapCell,
  HeatmapColumn,
  HeatmapCellWrapper,
  HeatmapTooltip,
} from './HeatmapCalendar.styles';

export interface HeatmapDay {
  date: string; // ISO date string, e.g. "2026-05-15"
  count: number;
}

export interface HeatmapCalendarProps {
  data: HeatmapDay[];
  year?: number;
  startWeekOnMonday?: boolean;
  className?: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAY_LABELS = ['Mon', 'Wed', 'Fri'];

function getYearDays(year: number, startWeekOnMonday: boolean): Date[] {
  const days: Date[] = [];
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);

  // Find the first Sunday or Monday before/on Jan 1 to align weeks
  const firstDay = startWeekOnMonday ? 1 : 0;
  const startDayOfWeek = start.getDay();
  let offset = startDayOfWeek - firstDay;
  if (offset < 0) offset += 7;

  const current = new Date(start);
  current.setDate(current.getDate() - offset);

  while (current <= end || days.length % 7 !== 0) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return days;
}

function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getIntensity(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export const HeatmapCalendar = ({
  data,
  year = new Date().getFullYear(),
  startWeekOnMonday = true,
  className,
}: HeatmapCalendarProps) => {
  const dataMap = useMemo(() => {
    const map = new Map<string, number>();
    data.forEach((d) => {
      map.set(d.date, d.count);
    });
    return map;
  }, [data]);

  const days = useMemo(() => getYearDays(year, startWeekOnMonday), [year, startWeekOnMonday]);

  const monthPositions = useMemo(() => {
    const positions: { label: string; col: number }[] = [];
    let lastMonth = -1;
    days.forEach((day, index) => {
      const col = Math.floor(index / 7);
      if (day.getFullYear() === year && day.getMonth() !== lastMonth) {
        lastMonth = day.getMonth();
        positions.push({ label: MONTHS[lastMonth], col });
      }
    });
    return positions;
  }, [days, year]);

  // Build a 7 x n grid
  const columns = useMemo(() => {
    const cols: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      cols.push(days.slice(i, i + 7));
    }
    return cols;
  }, [days]);

  return (
    <HeatmapCalendarWrapper className={className}>
      <HeatmapMonthLabels>
        {monthPositions.map((mp) => (
          <HeatmapMonthLabel key={`${mp.label}-${mp.col}`} style={{ left: `${mp.col * 14}px` }}>
            {mp.label}
          </HeatmapMonthLabel>
        ))}
      </HeatmapMonthLabels>
      <div style={{ display: 'flex' }}>
        <HeatmapWeekdayLabels>
          {WEEKDAY_LABELS.map((label, i) => (
            <HeatmapWeekdayLabel key={label}>{label}</HeatmapWeekdayLabel>
          ))}
        </HeatmapWeekdayLabels>
        <HeatmapGrid role="img" aria-label={`Contribution calendar for ${year}`}>
          {columns.map((col, colIndex) => (
            <HeatmapColumn key={colIndex}>
              {col.map((day, rowIndex) => {
                const dateKey = formatDateKey(day);
                const count = dataMap.get(dateKey) ?? 0;
                const isInYear = day.getFullYear() === year;
                const intensity = isInYear ? getIntensity(count) : -1;

                return (
                  <HeatmapCellWrapper key={dateKey}>
                    <HeatmapCell
                      intensity={intensity}
                      isInYear={isInYear}
                    />
                    {isInYear && (
                      <HeatmapTooltip data-heatmap-tooltip>
                        {dateKey}: {count} contributions
                      </HeatmapTooltip>
                    )}
                  </HeatmapCellWrapper>
                );
              })}
            </HeatmapColumn>
          ))}
        </HeatmapGrid>
      </div>
    </HeatmapCalendarWrapper>
  );
};
