'use client';
import type React from 'react';
import { useId } from 'react';
import {
  CheckboxBox,
  CheckboxContainer,
  CheckboxLabel,
  CheckIcon,
  IndeterminateIcon,
} from './Checkbox.styles';

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
}

export const Checkbox = ({
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  onChange,
  name,
  value,
}: CheckboxProps) => {
  const id = useId();
  const labelId = `${id}-label`;

  const ariaChecked = indeterminate ? 'mixed' : checked ? 'true' : 'false';

  const toggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <CheckboxContainer onClick={toggle} disabled={disabled}>
      <CheckboxBox
        role="checkbox"
        aria-checked={ariaChecked}
        aria-disabled={disabled}
        aria-labelledby={label ? labelId : undefined}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        data-checked={checked}
        data-indeterminate={indeterminate}
        data-name={name}
        data-value={value}
        disabled={disabled}
      >
        {indeterminate && <IndeterminateIcon />}
        {!indeterminate && checked && (
          <CheckIcon viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </CheckIcon>
        )}
      </CheckboxBox>
      {label && <CheckboxLabel id={labelId} disabled={disabled}>{label}</CheckboxLabel>}
    </CheckboxContainer>
  );
};
