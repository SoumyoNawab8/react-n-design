'use client';
import type React from 'react';
import { useCallback, useState } from 'react';
import { ToggleButton } from './Toggle.styles';

export interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  value?: string;
}

export const Toggle = ({
  pressed: pressedProp,
  defaultPressed = false,
  onPressedChange,
  disabled = false,
  children,
  value,
  ...props
}: ToggleProps) => {
  const isControlled = pressedProp !== undefined;
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const pressed = isControlled ? pressedProp : internalPressed;

  const toggle = useCallback(() => {
    if (disabled) return;
    const nextPressed = !pressed;
    if (!isControlled) {
      setInternalPressed(nextPressed);
    }
    onPressedChange?.(nextPressed);
  }, [disabled, pressed, isControlled, onPressedChange]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  return (
    <ToggleButton
      type="button"
      role="button"
      aria-pressed={pressed}
      disabled={disabled}
      pressed={pressed}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      data-value={value}
      {...props}
    >
      {children}
    </ToggleButton>
  );
};
