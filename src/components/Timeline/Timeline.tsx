'use client';
import type React from 'react';
import {
  StyledTimeline,
  StyledTimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineDotContent,
  TimelineLabel,
} from './Timeline.styles';

export interface TimelineItem {
  /** Custom dot/icon content */
  dot?: React.ReactNode | string;
  /** Custom dot color */
  color?: string;
  /** Main content for the timeline item */
  children: React.ReactNode;
  /** Optional label/timestamp */
  label?: string;
  /** Override the mode position for this specific item */
  position?: 'left' | 'right';
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of timeline items */
  items: TimelineItem[];
  /** Layout mode for positioning items */
  mode?: 'left' | 'right' | 'alternate';
  /** Reverse the order of items */
  reverse?: boolean;
}

/**
 * A vertical timeline component with neomorphic styling.
 * Supports multiple layout modes and customizable items.
 *
 * @example
 * // Basic usage with left mode
 * <Timeline
 *   mode="left"
 *   items={[
 *     {
 *       label: '2024-01-01',
 *       children: <p>First milestone</p>,
 *       color: '#6d5dfc',
 *     },
 *     {
 *       label: '2024-02-15',
 *       children: <p>Second milestone</p>,
 *       dot: <FaIcon />,
 *     },
 *   ]}
 * />
 *
 * @example
 * // Alternate mode with custom
 * <Timeline
 *   mode="alternate"
 *   items={timelineData}
 *   reverse={true}
 * />
 */
export const Timeline = ({ items, mode = 'left', reverse = false, ...props }: TimelineProps) => {
  const displayItems = reverse ? [...items].reverse() : items;

  return (
    <StyledTimeline $mode={mode} $reverse={reverse} {...props}>
      <TimelineConnector $mode={mode} />
      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1;
        const itemPosition =
          mode === 'alternate' ? item.position || (index % 2 === 0 ? 'left' : 'right') : mode;

        return (
          <StyledTimelineItem
            // biome-ignore lint/suspicious/noArrayIndexKey: Timeline items are sequential and order is stable
            key={index}
            $mode={mode}
            $position={item.position}
            $isLast={isLast}
          >
            {mode !== 'alternate' && (
              <TimelineLabel $mode={mode} $position={item.position}>
                {item.label}
              </TimelineLabel>
            )}

            <TimelineDot $mode={mode} $position={item.position} $color={item.color}>
              {item.dot && <TimelineDotContent>{item.dot}</TimelineDotContent>}
            </TimelineDot>

            <TimelineContent $mode={mode} $position={item.position} $isLast={isLast}>
              {mode === 'alternate' && item.label && (
                <TimelineLabel $mode={mode} $position={itemPosition}>
                  {item.label}
                </TimelineLabel>
              )}
              {item.children}
            </TimelineContent>
          </StyledTimelineItem>
        );
      })}
    </StyledTimeline>
  );
};

export default Timeline;
