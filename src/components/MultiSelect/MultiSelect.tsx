'use client';
import { AnimatePresence } from 'framer-motion';
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import {
  MultiSelectDropdown,
  MultiSelectEmpty,
  MultiSelectInput,
  MultiSelectInputGroup,
  MultiSelectOption,
  MultiSelectTag,
  MultiSelectTags,
  MultiSelectWrapper,
} from './MultiSelect.styles';

export interface MultiSelectProps {
  options: string[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  maxHeight?: number;
}

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

export const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  maxHeight,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value! : internalValue;

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const filteredOptions = useMemo(() => {
    if (!inputValue.trim()) return options.filter((o) => !currentValue.includes(o));
    return options.filter(
      (o) => o.toLowerCase().includes(inputValue.toLowerCase()) && !currentValue.includes(o)
    );
  }, [options, inputValue, currentValue]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, []);

  const handleSelect = (option: string) => {
    if (disabled) return;
    const newValue = [...currentValue, option];
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleRemove = (option: string) => {
    if (disabled) return;
    const newValue = currentValue.filter((v) => v !== option);
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
    inputRef.current?.focus();
  };

  const handleRemoveLast = () => {
    if (disabled) return;
    if (!inputValue && currentValue.length > 0) {
      const newValue = currentValue.slice(0, -1);
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    setInputValue(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (isOpen && filteredOptions[highlightedIndex]) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (filteredOptions.length > 0) {
          setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (filteredOptions.length > 0) {
          setHighlightedIndex(
            (prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length
          );
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      case 'Backspace':
        if (!inputValue) {
          e.preventDefault();
          handleRemoveLast();
        }
        break;
    }
  };

  const handleFocus = () => {
    if (!disabled && !isOpen) {
      setIsOpen(true);
    }
  };

  const listboxId = 'multiselect-listbox';

  return (
    <MultiSelectWrapper ref={wrapperRef}>
      <MultiSelectInputGroup
        disabled={disabled}
        isOpen={isOpen}
        onClick={() => {
          if (!disabled) inputRef.current?.focus();
        }}
      >
        <MultiSelectTags>
          {currentValue.map((v) => (
            <MultiSelectTag key={v}>
              {v}
              <button
                type="button"
                aria-label={`Remove ${v}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(v);
                }}
                onMouseDown={(e) => e.preventDefault()}
                disabled={disabled}
              >
                <FaTimes />
              </button>
            </MultiSelectTag>
          ))}
        </MultiSelectTags>
        <MultiSelectInput
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={handleFocus}
          disabled={disabled}
          placeholder={currentValue.length === 0 ? placeholder : ''}
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-activedescendant={
            isOpen && filteredOptions[highlightedIndex]
              ? `${listboxId}-option-${filteredOptions[highlightedIndex]}`
              : undefined
          }
          aria-autocomplete="list"
          autoComplete="off"
        />
      </MultiSelectInputGroup>
      <AnimatePresence>
        {isOpen && (
          <MultiSelectDropdown
            id={listboxId}
            role="listbox"
            aria-multiselectable="true"
            maxHeight={maxHeight}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {filteredOptions.length === 0 ? (
              <MultiSelectEmpty>No results found</MultiSelectEmpty>
            ) : (
              filteredOptions.map((option, index) => {
                const optionId = `${listboxId}-option-${option}`;
                const isHighlighted = index === highlightedIndex;
                return (
                  <MultiSelectOption
                    key={optionId}
                    id={optionId}
                    role="option"
                    aria-selected={false}
                    isHighlighted={isHighlighted}
                    isSelected={false}
                    onClick={() => handleSelect(option)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {option}
                  </MultiSelectOption>
                );
              })
            )}
          </MultiSelectDropdown>
        )}
      </AnimatePresence>
    </MultiSelectWrapper>
  );
};
