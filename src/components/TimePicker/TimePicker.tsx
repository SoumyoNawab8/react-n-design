'use client';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaClock, FaTimes } from '../../icons';
import { AnimatePresence, motion } from '../../utils/lazyMotion';
import { VisuallyHidden } from '../VisuallyHidden';
import {
  TimePickerAmPmButton,
  TimePickerClearButton,
  TimePickerClockIcon,
  TimePickerColumn,
  TimePickerColumns,
  TimePickerDisplayText,
  TimePickerInput,
  TimePickerInputGroup,
  TimePickerOption,
  TimePickerPanel,
  TimePickerSection,
  TimePickerSectionLabel,
  TimePickerWrapper,
} from './TimePicker.styles';

// ─── Time Utilities ───────────────────────────────────────────────────────────

type TimeFormat = '12h' | '24h';
type MinuteInterval = 1 | 5 | 10 | 15 | 30 | 60;

interface TimeValue {
  hours: number;
  minutes: number;
}

function parseTime(value: string | TimeValue | null | undefined): TimeValue | null {
  if (!value) return null;

  if (typeof value === 'object' && 'hours' in value && 'minutes' in value) {
    return value as TimeValue;
  }

  if (typeof value === 'string') {
    // Try 24h format first: "14:30"
    let match = value.match(/^([0-2]?\d):([0-5]\d)$/);
    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        return { hours, minutes };
      }
    }

    // Try 12h format: "2:30 PM"
    match = value.match(/^(0?[1-9]|1[0-2]):([0-5]\d)\s*(AM|PM|am|pm)$/i);
    if (match) {
      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      return { hours, minutes };
    }
  }

  return null;
}

function formatTime(
  time: TimeValue | null,
  format: TimeFormat,
  withSeconds = false
): string {
  if (!time) return '';

  const { hours, minutes } = time;

  if (format === '24h') {
    const h = hours.toString().padStart(2, '0');
    const m = minutes.toString().padStart(2, '0');
    return withSeconds ? `${h}:${m}:00` : `${h}:${m}`;
  }

  // 12h format
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  const m = minutes.toString().padStart(2, '0');
  return withSeconds ? `${displayHours}:${m}:00 ${ampm}` : `${displayHours}:${m} ${ampm}`;
}

function isSameTime(t1: TimeValue | null, t2: TimeValue | null): boolean {
  if (!t1 || !t2) return false;
  return t1.hours === t2.hours && t1.minutes === t2.minutes;
}

function isTimeDisabled(
  time: TimeValue,
  disabledTimes?: Array<{ hours: number; minutes: number }>,
  minTime?: TimeValue,
  maxTime?: TimeValue
): boolean {
  if (disabledTimes?.some((t) => t.hours === time.hours && t.minutes === time.minutes)) {
    return true;
  }
  if (minTime) {
    if (time.hours < minTime.hours) return true;
    if (time.hours === minTime.hours && time.minutes < minTime.minutes) return true;
  }
  if (maxTime) {
    if (time.hours > maxTime.hours) return true;
    if (time.hours === maxTime.hours && time.minutes > maxTime.minutes) return true;
  }
  return false;
}

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

export interface TimePickerProps {
  /** Time value as string "14:30" or TimeValue object { hours: 14, minutes: 30 } */
  value?: string | TimeValue | null;
  defaultValue?: string | TimeValue | null;
  onChange?: (value: TimeValue | null) => void;
  /** 12-hour or 24-hour format */
  format?: TimeFormat;
  /** Minute interval: 1, 5, 10, 15, 30, or 60 */
  minuteInterval?: MinuteInterval;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Disable the picker */
  disabled?: boolean;
  /** Label for accessibility */
  label?: string;
  /** HTML id for the input */
  id?: string;
  /** Full width input */
  fullWidth?: boolean;
  /** Minimum selectable time */
  minTime?: TimeValue;
  /** Maximum selectable time */
  maxTime?: TimeValue;
  /** Array of disabled times */
  disabledTimes?: Array<{ hours: number; minutes: number }>;
  /** Clear button shown when value exists */
  allowClear?: boolean;
  /** Size of the input */
  size?: 'small' | 'medium' | 'large';
  /** Error state for form validation */
  error?: boolean;
  /** Optional help text */
  helpText?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────────

export const TimePicker = ({
  value,
  defaultValue,
  onChange,
  format = '24h',
  minuteInterval = 15,
  placeholder = 'Select time',
  disabled = false,
  label,
  id,
  fullWidth = false,
  minTime,
  maxTime,
  disabledTimes,
  allowClear = true,
  size = 'medium',
  error = false,
  helpText,
}: TimePickerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hoursRef = useRef<HTMLDivElement>(null);
  const minutesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Normalize controlled/uncontrolled state
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<TimeValue | null>(() =>
    parseTime(defaultValue)
  );
  const currentValue = isControlled ? parseTime(value) : internalValue;

  // UI state
  const [isOpen, setIsOpen] = useState(false);
  const [liveText, setLiveText] = useState('');

  // Generate hour options based on format
  const hoursOptions = useMemo(() => {
    const hours: number[] = [];
    const start = format === '24h' ? 0 : 1;
    const end = format === '24h' ? 23 : 12;
    for (let i = start; i <= end; i++) {
      hours.push(i);
    }
    return hours;
  }, [format]);

  // Generate minute options based on interval
  const minutesOptions = useMemo(() => {
    const minutes: number[] = [];
    for (let i = 0; i < 60; i += minuteInterval) {
      minutes.push(i);
    }
    return minutes;
  }, [minuteInterval]);

  // Determine AM/PM for current value
  const currentAmPm = useMemo(() => {
    if (!currentValue) return 'AM';
    return currentValue.hours >= 12 ? 'PM' : 'AM';
  }, [currentValue]);

  // Get display hours for 12h format
  const getDisplayHours = useCallback(
    (hours: number) => {
      if (format === '24h') return hours;
      if (hours === 0) return 12;
      return hours > 12 ? hours - 12 : hours;
    },
    [format]
  );

  // Get actual hours from display value and AM/PM
  const getActualHours = useCallback(
    (displayHours: number, ampm: 'AM' | 'PM') => {
      if (format === '24h') return displayHours;
      if (ampm === 'PM' && displayHours !== 12) return displayHours + 12;
      if (ampm === 'AM' && displayHours === 12) return 0;
      return displayHours;
    },
    [format]
  );

  // Scroll to selected option when panel opens
  useEffect(() => {
    if (!isOpen || !currentValue) return;
    const timer = setTimeout(() => {
      if (hoursRef.current) {
        const hour = format === '24h' ? currentValue.hours : getDisplayHours(currentValue.hours);
        const hourBtn = hoursRef.current.querySelector<HTMLButtonElement>(`[data-hour="${hour}"]`);
        hourBtn?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
      if (minutesRef.current) {
        const minuteBtn = minutesRef.current.querySelector<HTMLButtonElement>(
          `[data-minute="${currentValue.minutes}"]`
        );
        minuteBtn?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [isOpen, currentValue, format, getDisplayHours]);

  // Click outside to close
  useClickOutside(wrapperRef, () => {
    if (isOpen) setIsOpen(false);
  });

  // Handle time selection
  const handleTimeSelect = useCallback(
    (hours: number, minutes: number) => {
      const newValue: TimeValue = { hours, minutes };

      if (isTimeDisabled(newValue, disabledTimes, minTime, maxTime)) {
        return;
      }

      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
      setLiveText(`Selected time ${formatTime(newValue, format)}`);
    },
    [format, isControlled, onChange, disabledTimes, minTime, maxTime]
  );

  // Handle hour selection
  const handleHourSelect = useCallback(
    (displayHour: number) => {
      const hours = getActualHours(displayHour, currentAmPm as 'AM' | 'PM');
      const minutes = currentValue?.minutes ?? 0;
      handleTimeSelect(hours, minutes);
    },
    [currentAmPm, currentValue?.minutes, getActualHours, handleTimeSelect]
  );

  // Handle minute selection
  const handleMinuteSelect = useCallback(
    (minutes: number) => {
      const hours = currentValue?.hours ?? (format === '24h' ? 0 : currentAmPm === 'PM' ? 12 : 0);
      handleTimeSelect(hours, minutes);
    },
    [currentValue?.hours, currentAmPm, format, handleTimeSelect]
  );

  // Toggle AM/PM
  const toggleAmPm = useCallback(() => {
    if (!currentValue || format === '24h') return;
    const newHours = currentValue.hours >= 12 ? currentValue.hours - 12 : currentValue.hours + 12;
    handleTimeSelect(newHours, currentValue.minutes);
  }, [currentValue, format, handleTimeSelect]);

  // Clear selection
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue(null);
      onChange?.(null);
      inputRef.current?.focus();
    },
    [isControlled, onChange]
  );

  // Display value
  const displayValue = useMemo(() => {
    return formatTime(currentValue, format);
  }, [currentValue, format]);

  // Keyboard navigation
  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
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
        case 'Tab':
          if (isOpen) {
            setIsOpen(false);
          }
          break;
      }
    },
    [disabled, isOpen]
  );

  const handlePanelKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
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
    },
    []
  );

  const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const panelId = inputId ? `${inputId}-panel` : 'timepicker-panel';

  return (
    <TimePickerWrapper ref={wrapperRef} fullWidth={fullWidth} size={size}>
      {label && <label htmlFor={inputId}>{label}</label>}
      <TimePickerInputGroup
        open={isOpen}
        disabled={disabled}
        error={error}
        size={size}
        onClick={() => {
          if (!disabled) setIsOpen((prev) => !prev);
        }}
        role="combobox"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={isOpen ? panelId : undefined}
        aria-label={label || 'Time picker'}
      >
        <TimePickerClockIcon disabled={disabled}>
          <FaClock />
        </TimePickerClockIcon>
        <TimePickerInput
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
        {currentValue && !disabled && allowClear && (
          <TimePickerClearButton
            type="button"
            aria-label="Clear time"
            onClick={handleClear}
            tabIndex={0}
          >
            <FaTimes />
          </TimePickerClearButton>
        )}
      </TimePickerInputGroup>

      {helpText && (
        <div style={{ fontSize: '12px', color: error ? '#e53e3e' : 'inherit', marginTop: '4px' }}>
          {helpText}
        </div>
      )}

      <VisuallyHidden>
        <div aria-live="polite" aria-atomic="true">
          {liveText}
        </div>
      </VisuallyHidden>

      <AnimatePresence>
        {isOpen && (
          <TimePickerPanel
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Time selection"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onKeyDown={handlePanelKeyDown}
          >
            {currentValue && (
              <TimePickerDisplayText>
                Selected: {formatTime(currentValue, format)}
              </TimePickerDisplayText>
            )}

            <TimePickerColumns>
              {/* Hours Column */}
              <TimePickerSection>
                <TimePickerSectionLabel>Hour</TimePickerSectionLabel>
                <TimePickerColumn ref={hoursRef}>
                  {hoursOptions.map((hour) => {
                    const actualHours = getActualHours(hour, currentAmPm as 'AM' | 'PM');
                    const timeValue: TimeValue = {
                      hours: actualHours,
                      minutes: currentValue?.minutes ?? 0,
                    };
                    const isDisabled = isTimeDisabled(
                      timeValue,
                      disabledTimes,
                      minTime,
                      maxTime
                    );
                    const isSelected = currentValue
                      ? getDisplayHours(currentValue.hours) === hour
                      : false;

                    return (
                      <TimePickerOption
                        key={hour}
                        data-hour={hour}
                        isSelected={isSelected}
                        disabled={isDisabled}
                        onClick={() => handleHourSelect(hour)}
                        aria-label={`${hour} ${format === '12h' ? '' : 'hours'}`}
                        tabIndex={isSelected ? 0 : -1}
                      >
                        {hour.toString().padStart(2, '0')}
                      </TimePickerOption>
                    );
                  })}
                </TimePickerColumn>
              </TimePickerSection>

              {/* Minutes Column */}
              <TimePickerSection>
                <TimePickerSectionLabel>Minute</TimePickerSectionLabel>
                <TimePickerColumn ref={minutesRef}>
                  {minutesOptions.map((minute) => {
                    const timeValue: TimeValue = {
                      hours: currentValue?.hours ?? 0,
                      minutes: minute,
                    };
                    const isDisabled = isTimeDisabled(
                      timeValue,
                      disabledTimes,
                      minTime,
                      maxTime
                    );
                    const isSelected = currentValue?.minutes === minute;

                    return (
                      <TimePickerOption
                        key={minute}
                        data-minute={minute}
                        isSelected={isSelected}
                        disabled={isDisabled}
                        onClick={() => handleMinuteSelect(minute)}
                        aria-label={`${minute} minutes`}
                        tabIndex={isSelected ? 0 : -1}
                      >
                        {minute.toString().padStart(2, '0')}
                      </TimePickerOption>
                    );
                  })}
                </TimePickerColumn>
              </TimePickerSection>

              {/* AM/PM Toggle for 12h format */}
              {format === '12h' && (
                <TimePickerSection>
                  <TimePickerSectionLabel>AM/PM</TimePickerSectionLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <TimePickerAmPmButton
                      isSelected={currentAmPm === 'AM'}
                      onClick={() => {
                        if (currentAmPm !== 'AM' && currentValue) {
                          toggleAmPm();
                        }
                      }}
                      aria-label="AM - Ante Meridiem"
                      aria-pressed={currentAmPm === 'AM'}
                    >
                      AM
                    </TimePickerAmPmButton>
                    <TimePickerAmPmButton
                      isSelected={currentAmPm === 'PM'}
                      onClick={() => {
                        if (currentAmPm !== 'PM' && currentValue) {
                          toggleAmPm();
                        }
                      }}
                      aria-label="PM - Post Meridiem"
                      aria-pressed={currentAmPm === 'PM'}
                    >
                      PM
                    </TimePickerAmPmButton>
                  </div>
                </TimePickerSection>
              )}
            </TimePickerColumns>
          </TimePickerPanel>
        )}
      </AnimatePresence>
    </TimePickerWrapper>
  );
};

// ─── Utility Exports ────────────────────────────────────────────────────────────

export { formatTime, parseTime };
export type { TimeValue, TimeFormat, MinuteInterval };
