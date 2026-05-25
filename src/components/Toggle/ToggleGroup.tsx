'use client';
import React, { useCallback, useRef } from 'react';
import type { ToggleProps } from './Toggle';
import { ToggleGroupContainer } from './Toggle.styles';

export interface ToggleGroupProps {
  type: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children: React.ReactElement<ToggleProps>[];
}

export const ToggleGroup = ({ type, value, onValueChange, children }: ToggleGroupProps) => {
  const groupRef = useRef<HTMLDivElement>(null);

  const isPressed = useCallback(
    (childValue: string | undefined) => {
      if (!childValue) return false;
      if (type === 'single') {
        return value === childValue;
      }
      return Array.isArray(value) && value.includes(childValue);
    },
    [type, value]
  );

  const handleTogglePress = useCallback(
    (childValue: string | undefined, pressed: boolean) => {
      if (!childValue) return;
      if (type === 'single') {
        onValueChange?.(pressed ? childValue : '');
      } else {
        const current = Array.isArray(value) ? [...value] : [];
        if (pressed) {
          if (!current.includes(childValue)) {
            onValueChange?.([...current, childValue]);
          }
        } else {
          onValueChange?.(current.filter((v) => v !== childValue));
        }
      }
    },
    [type, value, onValueChange]
  );

  const getToggleButtons = useCallback(() => {
    if (!groupRef.current) return [];
    return Array.from(groupRef.current.querySelectorAll('button[data-value]'));
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const buttons = getToggleButtons();
      const focusedIndex = buttons.indexOf(document.activeElement);
      if (focusedIndex === -1) return;

      let nextIndex = focusedIndex;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        nextIndex = focusedIndex + 1;
        if (nextIndex >= buttons.length) nextIndex = 0;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        nextIndex = focusedIndex - 1;
        if (nextIndex < 0) nextIndex = buttons.length - 1;
      } else if (event.key === 'Home') {
        event.preventDefault();
        nextIndex = 0;
      } else if (event.key === 'End') {
        event.preventDefault();
        nextIndex = buttons.length - 1;
      }

      if (nextIndex !== focusedIndex && buttons[nextIndex]) {
        (buttons[nextIndex] as HTMLElement).focus();
      }
    },
    [getToggleButtons]
  );

  return (
    <ToggleGroupContainer ref={groupRef} role="group" onKeyDown={handleKeyDown}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        const childValue = child.props.value;
        return React.cloneElement(child, {
          pressed: isPressed(childValue),
          onPressedChange: (pressed: boolean) => {
            handleTogglePress(childValue, pressed);
            child.props.onPressedChange?.(pressed);
          },
        });
      })}
    </ToggleGroupContainer>
  );
};
