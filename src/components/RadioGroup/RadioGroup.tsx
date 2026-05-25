'use client';
import type React from 'react';
import { useCallback, useId } from 'react';
import {
  RadioCircle,
  RadioGroupContainer,
  RadioInnerDot,
  RadioItem,
  RadioLabel,
} from './RadioGroup.styles';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup = ({
  options,
  value,
  onChange,
  name,
  orientation = 'vertical',
}: RadioGroupProps) => {
  const id = useId();

  const enabledOptions = options.filter((o) => !o.disabled);

  const currentIndex = enabledOptions.findIndex((o) => o.value === value);

  const selectValue = useCallback(
    (val: string) => {
      if (onChange && val !== value) {
        onChange(val);
      }
    },
    [onChange, value]
  );

  const focusOption = (targetIndex: number) => {
    const targetId = `${id}-radio-${enabledOptions[targetIndex]?.value}`;
    const el = document.getElementById(targetId);
    el?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, option: RadioOption, _index: number) => {
    if (option.disabled) return;

    let nextIndex = -1;

    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % enabledOptions.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        e.preventDefault();
        nextIndex = (currentIndex - 1 + enabledOptions.length) % enabledOptions.length;
        break;
      case ' ':
        e.preventDefault();
        selectValue(option.value);
        return;
      default:
        return;
    }

    if (nextIndex >= 0 && enabledOptions[nextIndex]) {
      selectValue(enabledOptions[nextIndex].value);
      focusOption(nextIndex);
    }
  };

  return (
    <RadioGroupContainer role="radiogroup" aria-orientation={orientation} orientation={orientation}>
      {options.map((option, index) => {
        const isSelected = option.value === value;
        const isDisabled = !!option.disabled;
        const enabledIndex = enabledOptions.findIndex((o) => o.value === option.value);
        const isFocused = enabledIndex === currentIndex;

        return (
          <RadioItem
            key={option.value}
            id={`${id}-radio-${option.value}`}
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            tabIndex={isFocused ? 0 : -1}
            data-name={name}
            disabled={isDisabled}
            selected={isSelected}
            onClick={() => {
              if (!isDisabled) {
                selectValue(option.value);
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, option, index)}
          >
            <RadioCircle selected={isSelected} disabled={isDisabled}>
              {isSelected && <RadioInnerDot />}
            </RadioCircle>
            <RadioLabel disabled={isDisabled}>{option.label}</RadioLabel>
          </RadioItem>
        );
      })}
    </RadioGroupContainer>
  );
};
