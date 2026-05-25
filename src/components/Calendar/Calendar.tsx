'use client';
import type React from 'react';
import { useCallback, useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  CalendarDay,
  CalendarEventDot,
  CalendarGrid,
  CalendarHeader,
  CalendarHeaderButton,
  CalendarMonthYear,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWrapper,
} from './Calendar.styles';

export interface CalendarEvent {
  date: Date;
  color?: string;
}

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  events?: CalendarEvent[];
  disabledDate?: (date: Date) => boolean;
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isSameMonth(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getCalendarDays(viewDate: Date): Date[] {
  const start = startOfMonth(viewDate);
  const end = endOfMonth(viewDate);
  const startDayOfWeek = start.getDay();
  const days: Date[] = [];

  for (let i = startDayOfWeek; i > 0; i--) {
    days.push(addDays(start, -i));
  }
  for (let i = 0; i < end.getDate(); i++) {
    days.push(addDays(start, i));
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push(addDays(end, i));
  }
  return days;
}

/**
 * A month-view calendar with event dots, disabled-date support,
 * and accessible keyboard navigation.
 */
export const Calendar = ({ value, onChange, events = [], disabledDate }: CalendarProps) => {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState<Date>(() => (value ? new Date(value) : new Date()));

  const selectedDate = value ? new Date(value) : undefined;

  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate]);

  const eventMap = useMemo(() => {
    const map = new Map<string, string[]>();
    events.forEach((event) => {
      const key = `${event.date.getFullYear()}-${event.date.getMonth()}-${event.date.getDate()}`;
      const colors = map.get(key) || [];
      colors.push(event.color || '#6d5dfc');
      map.set(key, colors);
    });
    return map;
  }, [events]);

  const goToPrevMonth = useCallback(() => {
    setViewDate((prev) => addMonths(prev, -1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setViewDate((prev) => addMonths(prev, 1));
  }, []);

  const handleDayClick = useCallback(
    (date: Date) => {
      if (disabledDate?.(date)) return;
      onChange?.(date);
    },
    [onChange, disabledDate]
  );

  const handleDayKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, date: Date) => {
      let nextDate = new Date(date);
      let prevent = true;

      switch (e.key) {
        case 'ArrowLeft':
          nextDate = addDays(date, -1);
          break;
        case 'ArrowRight':
          nextDate = addDays(date, 1);
          break;
        case 'ArrowUp':
          nextDate = addDays(date, -7);
          break;
        case 'ArrowDown':
          nextDate = addDays(date, 7);
          break;
        case 'Home':
          nextDate = addDays(date, -date.getDay());
          break;
        case 'End':
          nextDate = addDays(date, 6 - date.getDay());
          break;
        case 'PageUp':
          nextDate = addMonths(date, -1);
          break;
        case 'PageDown':
          nextDate = addMonths(date, 1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleDayClick(date);
          return;
        default:
          prevent = false;
      }

      if (prevent) {
        e.preventDefault();
        setViewDate(nextDate);
      }
    },
    [handleDayClick]
  );

  return (
    <CalendarWrapper role="application" aria-label="Calendar">
      <CalendarHeader>
        <CalendarHeaderButton type="button" aria-label="Previous month" onClick={goToPrevMonth}>
          <FaChevronLeft />
        </CalendarHeaderButton>
        <CalendarMonthYear aria-live="polite">
          {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
        </CalendarMonthYear>
        <CalendarHeaderButton type="button" aria-label="Next month" onClick={goToNextMonth}>
          <FaChevronRight />
        </CalendarHeaderButton>
      </CalendarHeader>

      <CalendarWeekdays>
        {WEEKDAYS.map((wd) => (
          <CalendarWeekday key={wd} aria-label={wd}>
            {wd}
          </CalendarWeekday>
        ))}
      </CalendarWeekdays>

      <CalendarGrid>
        {calendarDays.map((day) => {
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
          const isToday = isSameDay(day, today);
          const isOtherMonth = !isSameMonth(day, viewDate);
          const isDisabled = disabledDate ? disabledDate(day) : false;
          const dayStr = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
          const dayEvents = eventMap.get(dayStr) || [];

          return (
            <CalendarDay
              key={dayStr}
              aria-pressed={isSelected}
              aria-disabled={isDisabled}
              aria-label={day.toDateString()}
              isSelected={isSelected}
              isToday={isToday}
              isOtherMonth={isOtherMonth}
              isDisabled={isDisabled}
              disabled={isDisabled}
              tabIndex={isSelected || (isToday && !selectedDate) ? 0 : -1}
              onClick={() => handleDayClick(day)}
              onKeyDown={(e) => handleDayKeyDown(e, day)}
            >
              {day.getDate()}
              {dayEvents.length > 0 && (
                <CalendarEventDot>
                  {dayEvents.map((color, i) => (
                    <span key={i} style={{ backgroundColor: color }} />
                  ))}
                </CalendarEventDot>
              )}
            </CalendarDay>
          );
        })}
      </CalendarGrid>
    </CalendarWrapper>
  );
};
