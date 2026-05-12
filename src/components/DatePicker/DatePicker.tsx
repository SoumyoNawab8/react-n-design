'use client';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { VisuallyHidden } from '../VisuallyHidden';
import {
  DatePickerWrapper,
  DatePickerInputGroup,
  DatePickerInput,
  DatePickerCalendarIcon,
  DatePickerClearButton,
  DatePickerPanel,
  DatePickerHeader,
  DatePickerHeaderButton,
  DatePickerMonthYear,
  DatePickerSelect,
  DatePickerWeekdays,
  DatePickerWeekday,
  DatePickerGrid,
  DatePickerDay,
  DatePickerFooter,
  DatePickerTodayButton,
  DatePickerRangeText,
} from './DatePicker.styles';

// ─── Date Utilities ───────────────────────────────────────────────────────────

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

function formatDate(date: Date | null, fmt: string): string {
  if (!date) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return fmt
    .replace('yyyy', String(year))
    .replace('MM', month)
    .replace('dd', day);
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

function addYears(date: Date, years: number): Date {
  return new Date(date.getFullYear() + years, date.getMonth(), 1);
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

function isBefore(d1: Date, d2: Date): boolean {
  const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return t1 < t2;
}

function isAfter(d1: Date, d2: Date): boolean {
  const t1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime();
  const t2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime();
  return t1 > t2;
}

function isBetween(date: Date, start: Date, end: Date): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const s = Math.min(
    new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime(),
    new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
  );
  const e = Math.max(
    new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime(),
    new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime()
  );
  return d > s && d < e;
}

function clampDate(date: Date, min?: Date, max?: Date): Date {
  let d = new Date(date);
  if (min && isBefore(d, min)) d = new Date(min);
  if (max && isAfter(d, max)) d = new Date(max);
  return d;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// ─── Hooks ────────────────────────────────────────────────────────────────────

const useClickOutside = (ref: React.RefObject<HTMLElement | null>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DatePickerProps {
  mode?: 'single' | 'range';
  value?: Date | [Date, Date] | null;
  defaultValue?: Date | [Date, Date] | null;
  onChange?: (date: Date | [Date, Date] | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDate?: (date: Date) => boolean;
  placeholder?: string;
  disabled?: boolean;
  format?: string;
  label?: string;
  id?: string;
  fullWidth?: boolean;
}

// ─── Component ──────────────────────────────────────────────────────────────────

export const DatePicker = ({
  mode = 'single',
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  disabledDate,
  placeholder = 'Select date',
  disabled = false,
  format = 'yyyy-MM-dd',
  label,
  id,
  fullWidth = false,
}: DatePickerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldFocusDayRef = useRef(false);

  // Normalize controlled / uncontrolled state
  const isControlled = value !== undefined;

  const normalizeSingle = (v: Date | [Date, Date] | null | undefined): Date | null => {
    if (!v) return null;
    if (Array.isArray(v)) return v[0] ?? null;
    return v;
  };

  const normalizeRange = (v: Date | [Date, Date] | null | undefined): [Date, Date] | null => {
    if (!v) return null;
    if (Array.isArray(v) && v.length === 2) return [v[0], v[1]];
    return null;
  };

  const [internalValue, setInternalValue] = useState<Date | [Date, Date] | null>(defaultValue ?? null);
  const currentValue = isControlled ? value : internalValue;

  const selectedDate = mode === 'single' ? normalizeSingle(currentValue) : null;
  const selectedRange = mode === 'range' ? normalizeRange(currentValue) : null;

  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(() => {
    const seed = selectedDate ?? selectedRange?.[0] ?? new Date();
    return clampDate(seed, minDate, maxDate);
  });
  const [focusedDate, setFocusedDate] = useState<Date>(() => {
    return selectedDate ?? selectedRange?.[0] ?? new Date();
  });
  const [hoverDate, setHoverDate] = useState<Date | null>(null);
  const [liveText, setLiveText] = useState('');

  // Range draft state
  const [rangeDraft, setRangeDraft] = useState<[Date, Date] | null>(null);

  useEffect(() => {
    if (mode === 'range') {
      setRangeDraft(selectedRange);
    } else {
      setRangeDraft(null);
    }
  }, [mode, selectedRange]);

  // Keep viewDate and focusedDate in sync when value changes externally
  useEffect(() => {
    if (mode === 'single' && selectedDate) {
      setViewDate((prev) =>
        isSameMonth(prev, selectedDate) ? prev : clampDate(selectedDate, minDate, maxDate)
      );
      setFocusedDate(selectedDate);
    } else if (mode === 'range' && selectedRange) {
      const seed = selectedRange[0];
      setViewDate((prev) => (isSameMonth(prev, seed) ? prev : clampDate(seed, minDate, maxDate)));
      setFocusedDate(seed);
    }
  }, [selectedDate, selectedRange, mode, minDate, maxDate]);

  // Announce month changes
  useEffect(() => {
    setLiveText(`${MONTHS[viewDate.getMonth()]} ${viewDate.getFullYear()}`);
  }, [viewDate.getMonth(), viewDate.getFullYear()]);

  // Focus the focusedDate button when it changes programmatically
  useEffect(() => {
    if (!shouldFocusDayRef.current || !panelRef.current) return;
    shouldFocusDayRef.current = false;
    const dayStr = `${focusedDate.getFullYear()}-${focusedDate.getMonth()}-${focusedDate.getDate()}`;
    const btn = panelRef.current.querySelector<HTMLButtonElement>(`[data-day="${dayStr}"]`);
    if (btn && document.activeElement !== btn) {
      btn.focus();
    }
  }, [focusedDate, viewDate]);

  // Focus management when panel opens
  useEffect(() => {
    if (!isOpen) return;
    const target = selectedDate ?? selectedRange?.[0] ?? new Date();
    const clamped = clampDate(target, minDate, maxDate);
    setFocusedDate(clamped);
    const timer = setTimeout(() => {
      const dayStr = `${clamped.getFullYear()}-${clamped.getMonth()}-${clamped.getDate()}`;
      const btn = panelRef.current?.querySelector<HTMLButtonElement>(`[data-day="${dayStr}"]`);
      if (btn && document.activeElement !== btn) {
        btn.focus();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Click outside to close
  useClickOutside(wrapperRef, () => {
    if (isOpen) setIsOpen(false);
  });

  // Calendar data
  const calendarDays = useMemo(() => getCalendarDays(viewDate), [viewDate]);

  const isDateDisabled = useCallback(
    (date: Date) => {
      if (minDate && isBefore(date, minDate)) return true;
      if (maxDate && isAfter(date, maxDate)) return true;
      if (disabledDate?.(date)) return true;
      return false;
    },
    [minDate, maxDate, disabledDate]
  );

  const canGoPrevMonth = useMemo(() => {
    if (!minDate) return true;
    const prev = addMonths(viewDate, -1);
    return !isBefore(endOfMonth(prev), minDate);
  }, [viewDate, minDate]);

  const canGoNextMonth = useMemo(() => {
    if (!maxDate) return true;
    const next = addMonths(viewDate, 1);
    return !isAfter(startOfMonth(next), maxDate);
  }, [viewDate, maxDate]);

  // Navigation
  const goToPrevMonth = useCallback(() => {
    setViewDate((prev) => clampDate(addMonths(prev, -1), minDate, maxDate));
  }, [minDate, maxDate]);

  const goToNextMonth = useCallback(() => {
    setViewDate((prev) => clampDate(addMonths(prev, 1), minDate, maxDate));
  }, [minDate, maxDate]);

  const goToToday = useCallback(() => {
    const today = new Date();
    setViewDate(clampDate(today, minDate, maxDate));
    setFocusedDate(clampDate(today, minDate, maxDate));
    shouldFocusDayRef.current = true;
  }, [minDate, maxDate]);

  // Selection
  const handleDayClick = useCallback(
    (date: Date) => {
      if (isDateDisabled(date)) return;

      if (mode === 'single') {
        const newValue = date;
        if (!isControlled) setInternalValue(newValue);
        onChange?.(newValue);
        setIsOpen(false);
        inputRef.current?.focus();
        return;
      }

      // Range mode
      if (!rangeDraft || (rangeDraft[0] && rangeDraft[1] && !isSameDay(rangeDraft[0], rangeDraft[1]))) {
        const newDraft: [Date, Date] = [date, date];
        setRangeDraft(newDraft);
        if (!isControlled) setInternalValue(newDraft);
        onChange?.(newDraft);
      } else {
        const start = rangeDraft[0];
        const end = date;
        const newDraft: [Date, Date] = isBefore(end, start) ? [end, start] : [start, end];
        setRangeDraft(newDraft);
        if (!isControlled) setInternalValue(newDraft);
        onChange?.(newDraft);
      }
    },
    [mode, isControlled, onChange, isDateDisabled, rangeDraft]
  );

  // Keyboard navigation
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
          if (e.shiftKey) {
            nextDate = addYears(date, -1);
          } else {
            nextDate = addMonths(date, -1);
          }
          break;
        case 'PageDown':
          if (e.shiftKey) {
            nextDate = addYears(date, 1);
          } else {
            nextDate = addMonths(date, 1);
          }
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleDayClick(date);
          return;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          inputRef.current?.focus();
          return;
        case 'Tab':
          prevent = false;
          break;
        default:
          prevent = false;
      }

      if (prevent) {
        e.preventDefault();
        const clamped = clampDate(nextDate, minDate, maxDate);
        setFocusedDate(clamped);
        if (!isSameMonth(clamped, viewDate)) {
          setViewDate(clamped);
        }
        shouldFocusDayRef.current = true;
      }
    },
    [viewDate, minDate, maxDate, handleDayClick]
  );

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;
    switch (e.key) {
      case 'Enter':
      case 'ArrowDown':
        e.preventDefault();
        setIsOpen(true);
        break;
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        break;
    }
  };

  // Header keyboard handlers
  const handleHeaderKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // Focus trap inside panel
  const handlePanelKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = Array.from(
      panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]):not([tabindex="-1"]), select:not([disabled]), [tabindex="0"]'
      )
    ).filter((el) => el.offsetParent !== null);

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }, []);

  // Display value
  const displayValue = useMemo(() => {
    if (mode === 'single') {
      return formatDate(selectedDate, format);
    }
    const range = selectedRange ?? rangeDraft;
    if (!range) return '';
    const start = formatDate(range[0], format);
    const end = formatDate(range[1], format);
    return start === end ? start : `${start} ~ ${end}`;
  }, [mode, selectedDate, selectedRange, rangeDraft, format]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isControlled) setInternalValue(null);
    setRangeDraft(null);
    onChange?.(null);
    inputRef.current?.focus();
  };

  const handleClearKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isControlled) setInternalValue(null);
      setRangeDraft(null);
      onChange?.(null);
      inputRef.current?.focus();
    }
  };

  // Generate year options
  const yearOptions = useMemo(() => {
    const currentYear = viewDate.getFullYear();
    const startYear = Math.max(1900, minDate?.getFullYear() ?? currentYear - 50);
    const endYear = Math.min(2100, maxDate?.getFullYear() ?? currentYear + 50);
    const years: number[] = [];
    for (let y = startYear; y <= endYear; y++) {
      years.push(y);
    }
    return years;
  }, [viewDate, minDate, maxDate]);

  // Determine range state for a given day
  const getRangeState = useCallback(
    (day: Date) => {
      const range = selectedRange ?? rangeDraft;
      if (!range || mode !== 'range') {
        return {
          isRangeStart: false,
          isRangeEnd: false,
          isInRange: false,
        };
      }
      const start = range[0];
      const end = range[1];

      let previewStart = start;
      let previewEnd = end;

      if (hoverDate && isSameDay(start, end)) {
        previewStart = isBefore(hoverDate, start) ? hoverDate : start;
        previewEnd = isBefore(hoverDate, start) ? start : hoverDate;
      }

      const isStart = isSameDay(day, previewStart);
      const isEnd = isSameDay(day, previewEnd);
      const inRange = isBetween(day, previewStart, previewEnd);

      return {
        isRangeStart: isStart,
        isRangeEnd: isEnd,
        isInRange: inRange,
      };
    },
    [selectedRange, rangeDraft, mode, hoverDate]
  );

  const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const panelId = inputId ? `${inputId}-panel` : 'datepicker-panel';

  const today = new Date();

  return (
    <DatePickerWrapper ref={wrapperRef} fullWidth={fullWidth}>
      {label && (
        <label htmlFor={inputId}>
          {label}
        </label>
      )}
      <DatePickerInputGroup
        open={isOpen}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setIsOpen((prev) => !prev);
        }}
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        aria-label={label || 'Date picker'}
      >
        <DatePickerCalendarIcon disabled={disabled}>
          <FaCalendarAlt />
        </DatePickerCalendarIcon>
        <DatePickerInput
          ref={inputRef}
          id={inputId}
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly
          aria-readonly="true"
          onKeyDown={handleInputKeyDown}
          tabIndex={disabled ? -1 : 0}
        />
        {(selectedDate || selectedRange || rangeDraft) && !disabled && (
          <DatePickerClearButton
            type="button"
            aria-label="Clear date"
            onClick={handleClear}
            onKeyDown={handleClearKeyDown}
            tabIndex={0}
          >
            <FaTimes />
          </DatePickerClearButton>
        )}
      </DatePickerInputGroup>

      <VisuallyHidden>
        <div aria-live="polite" aria-atomic="true">
          {liveText}
        </div>
      </VisuallyHidden>

      <AnimatePresence>
        {isOpen && (
          <DatePickerPanel
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Calendar"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onKeyDown={handlePanelKeyDown}
          >
            <DatePickerHeader>
              <DatePickerHeaderButton
                type="button"
                aria-label="Previous month"
                disabled={!canGoPrevMonth}
                onClick={goToPrevMonth}
                onKeyDown={(e) => handleHeaderKeyDown(e, goToPrevMonth)}
                tabIndex={0}
              >
                <FaChevronLeft />
              </DatePickerHeaderButton>

              <DatePickerMonthYear>
                <DatePickerSelect
                  aria-label="Select month"
                  value={viewDate.getMonth()}
                  onChange={(e) => {
                    const month = parseInt(e.target.value, 10);
                    const next = new Date(viewDate.getFullYear(), month, 1);
                    setViewDate(clampDate(next, minDate, maxDate));
                  }}
                >
                  {MONTHS.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </DatePickerSelect>
                <DatePickerSelect
                  aria-label="Select year"
                  value={viewDate.getFullYear()}
                  onChange={(e) => {
                    const year = parseInt(e.target.value, 10);
                    const next = new Date(year, viewDate.getMonth(), 1);
                    setViewDate(clampDate(next, minDate, maxDate));
                  }}
                >
                  {yearOptions.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </DatePickerSelect>
              </DatePickerMonthYear>

              <DatePickerHeaderButton
                type="button"
                aria-label="Next month"
                disabled={!canGoNextMonth}
                onClick={goToNextMonth}
                onKeyDown={(e) => handleHeaderKeyDown(e, goToNextMonth)}
                tabIndex={0}
              >
                <FaChevronRight />
              </DatePickerHeaderButton>
            </DatePickerHeader>

            <DatePickerWeekdays>
              {WEEKDAYS.map((wd) => (
                <DatePickerWeekday key={wd} aria-label={wd}>
                  {wd}
                </DatePickerWeekday>
              ))}
            </DatePickerWeekdays>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewDate.getFullYear()}-${viewDate.getMonth()}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.15 }}
              >
                <DatePickerGrid>
                  {calendarDays.map((day) => {
                    const isSelected =
                      mode === 'single'
                        ? selectedDate
                          ? isSameDay(day, selectedDate)
                          : false
                        : false;

                    const rangeState = getRangeState(day);
                    const isDisabled = isDateDisabled(day);
                    const isTodayDay = isSameDay(day, today);
                    const isOtherMonth = !isSameMonth(day, viewDate);
                    const isFocused = isSameDay(day, focusedDate);
                    const dayStr = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;

                    return (
                      <DatePickerDay
                        key={dayStr}
                        data-day={dayStr}
                        aria-selected={isSelected || rangeState.isRangeStart || rangeState.isRangeEnd}
                        aria-disabled={isDisabled}
                        aria-label={day.toDateString()}
                        tabIndex={isFocused ? 0 : -1}
                        isSelected={isSelected}
                        isRangeStart={rangeState.isRangeStart}
                        isRangeEnd={rangeState.isRangeEnd}
                        isInRange={rangeState.isInRange}
                        isToday={isTodayDay}
                        isOtherMonth={isOtherMonth}
                        isDisabled={isDisabled}
                        disabled={isDisabled}
                        onClick={() => handleDayClick(day)}
                        onMouseEnter={() => {
                          if (mode === 'range') setHoverDate(day);
                        }}
                        onMouseLeave={() => setHoverDate(null)}
                        onKeyDown={(e) => handleDayKeyDown(e, day)}
                      >
                        {day.getDate()}
                      </DatePickerDay>
                    );
                  })}
                </DatePickerGrid>
              </motion.div>
            </AnimatePresence>

            <DatePickerFooter>
              <DatePickerTodayButton
                type="button"
                onClick={goToToday}
                onKeyDown={(e) => handleHeaderKeyDown(e, goToToday)}
              >
                Today
              </DatePickerTodayButton>
              {mode === 'range' && selectedRange && (
                <DatePickerRangeText>
                  {formatDate(selectedRange[0], format)} ~ {formatDate(selectedRange[1], format)}
                </DatePickerRangeText>
              )}
            </DatePickerFooter>
          </DatePickerPanel>
        )}
      </AnimatePresence>
    </DatePickerWrapper>
  );
};
