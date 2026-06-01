'use client';

import { useMemo } from 'react';
import {
  GanttBar,
  GanttBarProgress,
  GanttChartContainer,
  GanttChartWrapper,
  GanttGridLine,
  GanttLabelCell,
  GanttLabelColumn,
  GanttTimelineArea,
  GanttTimelineHeader,
  GanttTimelineRow,
  GanttTimelineRows,
  TimeLabel,
} from './GanttChart.styles';

export interface GanttTask {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress?: number; // 0-100
  color?: string;
}

export interface GanttChartProps {
  tasks: GanttTask[];
  startDate?: Date;
  endDate?: Date;
  rowHeight?: number; // px, default 40
  className?: string;
}

const DAY_MS = 86400000;

function clampDate(date: Date, min: Date, max: Date) {
  return new Date(Math.max(min.getTime(), Math.min(max.getTime(), date.getTime())));
}

function getDayDiff(a: Date, b: Date) {
  return (b.getTime() - a.getTime()) / DAY_MS;
}

function formatDateLabel(date: Date) {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

/**
 * A simple project timeline / Gantt chart with neomorphic styling.
 */
export const GanttChart = ({
  tasks,
  startDate: propStartDate,
  endDate: propEndDate,
  rowHeight = 40,
  className,
}: GanttChartProps) => {
  const { start, end, totalDays } = useMemo(() => {
    if (propStartDate && propEndDate) {
      return {
        start: propStartDate,
        end: propEndDate,
        totalDays: getDayDiff(propStartDate, propEndDate),
      };
    }
    const taskStarts = tasks.map((t) => t.start.getTime());
    const taskEnds = tasks.map((t) => t.end.getTime());
    const minTime = taskStarts.length ? Math.min(...taskStarts) : Date.now();
    const maxTime = taskEnds.length ? Math.max(...taskEnds) : Date.now();
    const s = propStartDate || new Date(minTime);
    const e = propEndDate || new Date(maxTime);
    // Add padding days on both ends for visual breathing room
    const paddedStart = new Date(s.getTime() - DAY_MS);
    const paddedEnd = new Date(e.getTime() + DAY_MS);
    return {
      start: paddedStart,
      end: paddedEnd,
      totalDays: getDayDiff(paddedStart, paddedEnd),
    };
  }, [tasks, propStartDate, propEndDate]);

  const days = useMemo(() => {
    const arr: Date[] = [];
    const current = new Date(start);
    current.setHours(0, 0, 0, 0);
    const endTime = end.getTime();
    while (current.getTime() <= endTime) {
      arr.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return arr;
  }, [start, end]);

  const pxPerDay = useMemo(() => {
    // Minimum spacing so labels are readable
    return Math.max(40, 600 / (totalDays || 1));
  }, [totalDays]);

  const timelineWidth = Math.max(totalDays * pxPerDay, 0);

  const getBarMetrics = (task: GanttTask) => {
    const taskStart = clampDate(task.start, start, end);
    const taskEnd = clampDate(task.end, start, end);
    const offsetDays = getDayDiff(start, taskStart);
    const durationDays = getDayDiff(taskStart, taskEnd);
    const left = offsetDays * pxPerDay;
    const width = durationDays * pxPerDay;
    return { left, width };
  };

  return (
    <GanttChartWrapper className={className} role="region" aria-label="Gantt chart">
      <GanttChartContainer>
        {/* Left label column */}
        <GanttLabelColumn>
          <GanttTimelineHeader style={{ height: rowHeight }} />
          {tasks.map((task) => (
            <GanttLabelCell key={task.id} style={{ height: rowHeight }}>
              <span>{task.name}</span>
            </GanttLabelCell>
          ))}
        </GanttLabelColumn>

        {/* Right timeline area */}
        <GanttTimelineArea>
          <div style={{ width: timelineWidth, position: 'relative' }}>
            {/* Date header */}
            <GanttTimelineHeader>
              {days.map((day, i) => (
                <TimeLabel key={i} style={{ left: i * pxPerDay, width: pxPerDay }}>
                  {formatDateLabel(day)}
                </TimeLabel>
              ))}
            </GanttTimelineHeader>

            {/* Grid lines and bars */}
            <GanttTimelineRows>
              {tasks.map((task) => {
                const { left, width } = getBarMetrics(task);
                const progress = Math.min(100, Math.max(0, task.progress ?? 0));
                return (
                  <GanttTimelineRow key={task.id} style={{ height: rowHeight }}>
                    {/* Background grid lines */}
                    {days.map((_, i) => (
                      <GanttGridLine
                        key={i}
                        style={{ left: i * pxPerDay, width: pxPerDay }}
                        $isWeekend={days[i].getDay() === 0 || days[i].getDay() === 6}
                      />
                    ))}
                    {/* Task bar */}
                    <GanttBar
                      style={{ left, width: Math.max(width, 2) }}
                      $color={task.color}
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={Math.round(progress)}
                      aria-label={`${task.name} progress`}
                    >
                      <GanttBarProgress
                        style={{ width: `${progress}%` }}
                        $color={task.color}
                      />
                    </GanttBar>
                  </GanttTimelineRow>
                );
              })}
            </GanttTimelineRows>
          </div>
        </GanttTimelineArea>
      </GanttChartContainer>
    </GanttChartWrapper>
  );
};

export default GanttChart;
