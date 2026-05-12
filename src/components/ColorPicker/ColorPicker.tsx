'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ColorPickerWrapper,
  ColorPreview,
  ColorInputGroup,
  ColorLabel,
  ColorHexInput,
  ColorSliderGroup,
  ColorSliderRow,
  ColorSliderLabel,
  ColorSliderTrack,
  ColorSliderFill,
  ColorSliderInput,
  ColorSliderValue,
  ColorSwatches,
  ColorSwatch,
} from './ColorPicker.styles';

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  showInput?: boolean;
}

const defaultPresets = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#78716c',
  '#374151',
  '#111827',
  '#ffffff',
];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const bigint = parseInt(clean, 16);
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r, g, b };
  }
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function isValidHex(hex: string): boolean {
  return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex);
}

function normalizeHex(hex: string): string {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  return '#' + clean.toLowerCase();
}

export const ColorPicker = ({
  value,
  onChange,
  presets = defaultPresets,
  showInput = true,
}: ColorPickerProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState('#6d5dfc');
  const currentValue = isControlled ? normalizeHex(value!) : internalValue;

  const [rgb, setRgb] = useState(() => hexToRgb(currentValue));
  const [hexInput, setHexInput] = useState(currentValue);
  const swatchRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sync from external value prop (controlled mode)
  useEffect(() => {
    if (isControlled && value) {
      const normalized = normalizeHex(value);
      setRgb(hexToRgb(normalized));
      setHexInput(normalized);
    }
  }, [value, isControlled]);

  const updateColor = useCallback(
    (newRgb: { r: number; g: number; b: number }) => {
      const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      setRgb(newRgb);
      setHexInput(hex);
      if (!isControlled) setInternalValue(hex);
      onChange?.(hex);
    },
    [isControlled, onChange]
  );

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexInput(val);
    if (isValidHex(val)) {
      const hex = normalizeHex(val);
      setRgb(hexToRgb(hex));
      if (!isControlled) setInternalValue(hex);
      onChange?.(hex);
    }
  };

  const handleHexBlur = () => {
    if (isValidHex(hexInput)) {
      setHexInput(normalizeHex(hexInput));
    } else {
      // Revert to current valid color on blur if input is invalid
      setHexInput(currentValue);
    }
  };

  const handleSliderChange = (channel: 'r' | 'g' | 'b', val: number) => {
    const newRgb = { ...rgb, [channel]: val };
    updateColor(newRgb);
  };

  const handleSwatchClick = (hex: string) => {
    updateColor(hexToRgb(hex));
  };

  const handleSwatchKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const cols = 5; // approximate number of columns for arrow navigation
    let nextIndex = index;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSwatchClick(presets[index]);
        break;
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = (index + 1) % presets.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = (index - 1 + presets.length) % presets.length;
        break;
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (index + cols) % presets.length;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = (index - cols + presets.length) % presets.length;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = presets.length - 1;
        break;
    }

    if (nextIndex !== index) {
      swatchRefs.current[nextIndex]?.focus();
    }
  };

  const sliders: { channel: 'r' | 'g' | 'b'; label: string }[] = [
    { channel: 'r', label: 'R' },
    { channel: 'g', label: 'G' },
    { channel: 'b', label: 'B' },
  ];

  return (
    <ColorPickerWrapper>
      <ColorPreview color={currentValue} aria-label={`Selected color ${currentValue}`} />

      {showInput && (
        <ColorInputGroup>
          <ColorLabel htmlFor="color-picker-hex">Hex</ColorLabel>
          <ColorHexInput
            id="color-picker-hex"
            type="text"
            value={hexInput}
            onChange={handleHexChange}
            onBlur={handleHexBlur}
            maxLength={7}
            aria-label="Hex color value"
          />
        </ColorInputGroup>
      )}

      <ColorSliderGroup role="group" aria-label="RGB sliders">
        {sliders.map(({ channel, label }) => {
          const val = rgb[channel];
          const percent = (val / 255) * 100;
          return (
            <ColorSliderRow key={channel}>
              <ColorSliderLabel>{label}</ColorSliderLabel>
              <ColorSliderTrack>
                <ColorSliderFill progress={percent} />
                <ColorSliderInput
                  type="range"
                  min={0}
                  max={255}
                  value={val}
                  onChange={(e) =>
                    handleSliderChange(channel, Number(e.target.value))
                  }
                  aria-label={`${label} value`}
                />
              </ColorSliderTrack>
              <ColorSliderValue>{val}</ColorSliderValue>
            </ColorSliderRow>
          );
        })}
      </ColorSliderGroup>

      <ColorInputGroup>
        <ColorLabel>Presets</ColorLabel>
        <ColorSwatches role="group" aria-label="Color presets">
          {presets.map((preset, index) => {
            const normalized = normalizeHex(preset);
            const isSelected = currentValue === normalized;
            return (
              <ColorSwatch
                key={normalized}
                ref={(el) => {
                  swatchRefs.current[index] = el;
                }}
                color={normalized}
                isSelected={isSelected}
                type="button"
                aria-label={`Select color ${normalized}`}
                aria-pressed={isSelected}
                onClick={() => handleSwatchClick(normalized)}
                onKeyDown={(e) => handleSwatchKeyDown(e, index)}
              />
            );
          })}
        </ColorSwatches>
      </ColorInputGroup>
    </ColorPickerWrapper>
  );
};
