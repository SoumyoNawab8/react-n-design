'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import {
  SelectWrapper, SelectTrigger, SelectValue, SelectPlaceholder, SelectIcons,
  SelectChevron, SelectDropdown, SelectOption, Spinner, ClearButton, MultiSelectValueWrapper
} from './Select.styles';
import { Tag } from '../Tag';

export interface SelectOptionProps {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOptionProps[];
  placeholder?: string;
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (value: any) => void;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  mode?: 'single' | 'multiple';
  size?: 'small' | 'medium' | 'large';
  error?: boolean;
}

// Custom hook to detect clicks outside an element
const useClickOutside = (ref: React.RefObject<any>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
};

/**
 * An advanced dropdown component for selecting values from a list.
 */
export const Select = ({
  options,
  placeholder,
  value,
  defaultValue,
  onChange,
  disabled = false,
  loading = false,
  allowClear = false,
  mode = 'single',
  size = 'medium',
  error = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const listboxId = `select-listbox-${wrapperRef.current ? wrapperRef.current.id || 'select' : 'select'}`;
  const triggerId = `${listboxId}-trigger`;

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const isSelected = useCallback((option: SelectOptionProps) => {
    if (mode === 'multiple') {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      return currentArray.includes(option.value);
    }
    return currentValue === option.value;
  }, [currentValue, mode]);

  const handleSelect = (option: SelectOptionProps) => {
    if (option.disabled) return;

    let newValue: any;
    if (mode === 'multiple') {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      if (currentArray.includes(option.value)) {
        newValue = currentArray.filter(v => v !== option.value);
      } else {
        newValue = [...currentArray, option.value];
      }
    } else {
      newValue = option.value;
      setIsOpen(false);
    }

    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = mode === 'multiple' ? [] : undefined;
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const getLabelForValue = (val: string | number) => options.find(o => o.value === val)?.label;

  const enabledOptions = options.filter(o => !o.disabled);
  const enabledIndexOf = (option: SelectOptionProps) => enabledOptions.findIndex(o => o.value === option.value);

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled || loading) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (enabledOptions[highlightedIndex]) {
          handleSelect(enabledOptions[highlightedIndex]);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        setHighlightedIndex(prev => (prev + 1) % enabledOptions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        setHighlightedIndex(prev => (prev - 1 + enabledOptions.length) % enabledOptions.length);
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      case 'Home':
        e.preventDefault();
        setHighlightedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setHighlightedIndex(enabledOptions.length - 1);
        break;
    }
  };

  const renderValue = () => {
    if (mode === 'multiple') {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      if (currentArray.length === 0) return <SelectPlaceholder>{placeholder}</SelectPlaceholder>;
      return (
        <MultiSelectValueWrapper>
          {currentArray.map(v => (
            <Tag key={v} size="small" variant="primary" onClose={(e) => {
              e.stopPropagation();
              handleSelect({ value: v, label: '' });
            }}>
              {getLabelForValue(v)}
            </Tag>
          ))}
        </MultiSelectValueWrapper>
      );
    }

    const selectedOption = options.find(o => o.value === currentValue);
    if (!selectedOption) return <SelectPlaceholder>{placeholder}</SelectPlaceholder>;
    return <SelectValue>{selectedOption.label}</SelectValue>;
  };

  const isClearable = allowClear && currentValue && (Array.isArray(currentValue) ? currentValue.length > 0 : true);

  return (
    <SelectWrapper ref={wrapperRef}>
      <SelectTrigger
        ref={triggerRef}
        id={triggerId}
        size={size}
        isOpen={isOpen}
        hasError={error}
        disabled={disabled || loading}
        isMulti={mode === 'multiple'}
        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={isOpen ? `${listboxId}-option-${enabledOptions[highlightedIndex]?.value}` : undefined}
        aria-disabled={disabled || loading}
        aria-invalid={error}
        tabIndex={disabled ? -1 : 0}
      >
        {renderValue()}
        <SelectIcons>
          {loading && <Spinner />}
          {isClearable && !loading && !disabled && (
            <ClearButton
              role="button"
              tabIndex={0}
              aria-label="Clear selection"
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClear(e as unknown as React.MouseEvent);
                }
              }}
            >
              <FaTimes />
            </ClearButton>
          )}
          <SelectChevron isOpen={isOpen}><FaChevronDown /></SelectChevron>
        </SelectIcons>
      </SelectTrigger>
      <AnimatePresence>
        {isOpen && (
          <SelectDropdown
            id={listboxId}
            role="listbox"
            aria-multiselectable={mode === 'multiple'}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {options.map(option => {
              const optionId = `${listboxId}-option-${option.value}`;
              const active = isSelected(option);
              const highlighted = enabledOptions[highlightedIndex]?.value === option.value;
              return (
                <SelectOption
                  key={option.value}
                  id={optionId}
                  role="option"
                  aria-selected={active}
                  aria-disabled={option.disabled}
                  isActive={active}
                  disabled={option.disabled}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => {
                    if (!option.disabled) {
                      const idx = enabledIndexOf(option);
                      if (idx >= 0) setHighlightedIndex(idx);
                    }
                  }}
                  style={highlighted && !option.disabled ? { outline: '2px solid currentColor', outlineOffset: '-2px' } : undefined}
                >
                  {option.label}
                </SelectOption>
              );
            })}
          </SelectDropdown>
        )}
      </AnimatePresence>
    </SelectWrapper>
  );
};
