'use client';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  SliderError,
  SliderFill,
  SliderLabel,
  SliderMark,
  SliderMarks,
  SliderThumb,
  SliderTrack,
  SliderValue,
  SliderWrapper,
} from './Slider.styles';

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  onChangeComplete?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  disabled?: boolean;
  vertical?: boolean;
  fullWidth?: boolean;
  marks?: { value: number; label: string }[];
  error?: string;
  id?: string;
}

export const Slider = ({
  value,
  defaultValue = 0,
  onChange,
  onChangeComplete,
  min = 0,
  max = 100,
  step = 1,
  label,
  disabled = false,
  vertical = false,
  fullWidth = false,
  marks,
  error,
  id,
}: SliderProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value! : internalValue;
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : 'slider');

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const snap = (v: number) => Math.round(v / step) * step;

  const percent = useMemo(() => {
    const clamped = clamp(currentValue);
    return ((clamped - min) / (max - min)) * 100;
  }, [currentValue, min, max, clamp]);

  const getValueFromPosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!trackRef.current) return currentValue;
      const rect = trackRef.current.getBoundingClientRect();
      let ratio: number;
      if (vertical) {
        ratio = 1 - (clientY - rect.top) / rect.height;
      } else {
        ratio = (clientX - rect.left) / rect.width;
      }
      const raw = min + ratio * (max - min);
      return clamp(snap(raw));
    },
    [vertical, min, max, currentValue, clamp, snap]
  );

  const updateValue = useCallback(
    (newValue: number) => {
      const clamped = clamp(newValue);
      if (!isControlled) setInternalValue(clamped);
      onChange?.(clamped);
    },
    [isControlled, onChange, clamp]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      isDragging.current = true;
      const newValue = getValueFromPosition(e.clientX, e.clientY);
      updateValue(newValue);
    },
    [disabled, getValueFromPosition, updateValue]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      isDragging.current = true;
      const touch = e.touches[0];
      const newValue = getValueFromPosition(touch.clientX, touch.clientY);
      updateValue(newValue);
    },
    [disabled, getValueFromPosition, updateValue]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const newValue = getValueFromPosition(e.clientX, e.clientY);
      updateValue(newValue);
    },
    [getValueFromPosition, updateValue]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current) return;
      const touch = e.touches[0];
      const newValue = getValueFromPosition(touch.clientX, touch.clientY);
      updateValue(newValue);
    },
    [getValueFromPosition, updateValue]
  );

  const handleEnd = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      onChangeComplete?.(clamp(currentValue));
    }
  }, [currentValue, onChangeComplete, clamp]);

  useEffect(() => {
    if (!isDragging.current) return;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleEnd);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [handleMouseMove, handleTouchMove, handleEnd]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    let newValue = currentValue;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault();
        newValue = clamp(snap(currentValue + step));
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault();
        newValue = clamp(snap(currentValue - step));
        break;
      case 'Home':
        e.preventDefault();
        newValue = min;
        break;
      case 'End':
        e.preventDefault();
        newValue = max;
        break;
      case 'PageUp':
        e.preventDefault();
        newValue = clamp(snap(currentValue + step * 10));
        break;
      case 'PageDown':
        e.preventDefault();
        newValue = clamp(snap(currentValue - step * 10));
        break;
      default:
        return;
    }
    updateValue(newValue);
    onChangeComplete?.(newValue);
  };

  return (
    <SliderWrapper fullWidth={fullWidth} vertical={vertical}>
      {label && (
        <SliderLabel htmlFor={inputId}>
          {label}
          <SliderValue>{currentValue}</SliderValue>
        </SliderLabel>
      )}
      <SliderTrack
        ref={trackRef}
        vertical={vertical}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={clamp(currentValue)}
        aria-valuetext={`${clamp(currentValue)}`}
        aria-disabled={disabled}
        aria-invalid={!!error}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        id={inputId}
      >
        <SliderFill
          vertical={vertical}
          style={{ '--fill-percent': `${percent}%` } as React.CSSProperties}
        />
        <SliderThumb
          vertical={vertical}
          style={{ '--thumb-percent': `${percent}%` } as React.CSSProperties}
        />
      </SliderTrack>
      {marks && marks.length > 0 && (
        <SliderMarks vertical={vertical}>
          {marks.map((mark) => (
            <SliderMark key={mark.value}>{mark.label}</SliderMark>
          ))}
        </SliderMarks>
      )}
      {error && <SliderError>{error}</SliderError>}
    </SliderWrapper>
  );
};
