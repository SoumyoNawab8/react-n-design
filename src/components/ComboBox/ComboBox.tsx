'use client';
import { AnimatePresence } from 'framer-motion';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import {
  ComboBoxChevron,
  ComboBoxClearButton,
  ComboBoxDropdown,
  ComboBoxEmpty,
  ComboBoxInput,
  ComboBoxInputGroup,
  ComboBoxOption,
  ComboBoxSpinner,
  ComboBoxTag,
  ComboBoxTags,
  ComboBoxWrapper,
} from './ComboBox.styles';

export interface ComboBoxOptionType {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboBoxProps {
  options: ComboBoxOptionType[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  allowCreate?: boolean;
  createLabel?: (query: string) => string;
  mode?: 'single' | 'multiple';
  size?: 'small' | 'medium' | 'large';
  error?: string;
  filterOption?: (input: string, option: ComboBoxOptionType) => boolean;
  label?: string;
  id?: string;
}

const defaultFilter = (input: string, option: ComboBoxOptionType) =>
  option.label.toLowerCase().includes(input.toLowerCase());

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

export const ComboBox = ({
  options,
  value,
  defaultValue,
  onChange,
  onSearch,
  placeholder = 'Select...',
  disabled = false,
  loading = false,
  allowClear = false,
  allowCreate = false,
  createLabel = (q) => `Create "${q}"`,
  mode = 'single',
  size = 'medium',
  error,
  filterOption = defaultFilter,
  label,
  id,
}: ComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(defaultValue);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const listboxId = inputId ? `${inputId}-listbox` : 'combobox-listbox';
  const errorId = error ? `${inputId || 'combobox'}-error` : undefined;

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const filteredOptions = useMemo(() => {
    if (!inputValue) return options;
    const filtered = options.filter((o) => filterOption(inputValue, o));
    if (
      allowCreate &&
      inputValue.trim() &&
      !options.some((o) => o.value === inputValue.trim() || o.label === inputValue.trim())
    ) {
      filtered.push({
        value: inputValue.trim(),
        label: createLabel(inputValue.trim()),
        disabled: false,
      });
    }
    return filtered;
  }, [options, inputValue, filterOption, allowCreate, createLabel]);

  const enabledOptions = filteredOptions.filter((o) => !o.disabled);

  useEffect(() => {
    setHighlightedIndex(0);
  }, []);

  const isSelected = useCallback(
    (option: ComboBoxOptionType) => {
      if (mode === 'multiple') {
        const arr = Array.isArray(currentValue) ? currentValue : [];
        return arr.includes(option.value);
      }
      return currentValue === option.value;
    },
    [currentValue, mode]
  );

  const getLabelForValue = (val: string) => options.find((o) => o.value === val)?.label || val;

  const handleSelect = (option: ComboBoxOptionType) => {
    if (option.disabled) return;

    let newValue: string | string[];
    if (mode === 'multiple') {
      const arr = Array.isArray(currentValue) ? [...currentValue] : [];
      if (arr.includes(option.value)) {
        newValue = arr.filter((v) => v !== option.value);
      } else {
        newValue = [...arr, option.value];
      }
      setInputValue('');
      inputRef.current?.focus();
    } else {
      newValue = option.value;
      setInputValue(option.label);
      setIsOpen(false);
    }

    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    const newValue = mode === 'multiple' ? [] : '';
    setInputValue('');
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onSearch?.(val);
    if (!isOpen) setIsOpen(true);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || loading) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (isOpen && enabledOptions[highlightedIndex]) {
          handleSelect(enabledOptions[highlightedIndex]);
        } else {
          setIsOpen(true);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => (prev + 1) % enabledOptions.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setHighlightedIndex((prev) => (prev - 1 + enabledOptions.length) % enabledOptions.length);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(0);
        }
        break;
      case 'End':
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(enabledOptions.length - 1);
        }
        break;
      case 'Tab':
        if (isOpen) {
          setIsOpen(false);
        }
        break;
      case 'Backspace':
        if (
          mode === 'multiple' &&
          !inputValue &&
          Array.isArray(currentValue) &&
          currentValue.length > 0
        ) {
          const newValue = currentValue.slice(0, -1);
          if (!isControlled) setInternalValue(newValue);
          onChange?.(newValue);
        }
        break;
    }
  };

  const handleFocus = () => {
    if (!disabled && !loading) {
      setIsOpen(true);
    }
  };

  const handleRemoveTag = (val: string) => {
    if (mode === 'multiple' && Array.isArray(currentValue)) {
      const newValue = currentValue.filter((v) => v !== val);
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    }
  };

  const renderTags = () => {
    if (mode !== 'multiple') return null;
    const arr = Array.isArray(currentValue) ? currentValue : [];
    return (
      <ComboBoxTags>
        {arr.map((v) => (
          <ComboBoxTag key={v}>
            {getLabelForValue(v)}
            <button
              type="button"
              aria-label={`Remove ${getLabelForValue(v)}`}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveTag(v);
              }}
              onMouseDown={(e) => e.preventDefault()}
            >
              <FaTimes />
            </button>
          </ComboBoxTag>
        ))}
      </ComboBoxTags>
    );
  };

  const isClearable =
    allowClear &&
    !disabled &&
    !loading &&
    (Array.isArray(currentValue) ? currentValue.length > 0 : !!currentValue);

  return (
    <ComboBoxWrapper ref={wrapperRef} fullWidth>
      {label && <label htmlFor={inputId}>{label}</label>}
      <ComboBoxInputGroup
        size={size}
        hasError={!!error}
        disabled={disabled || loading}
        isMulti={mode === 'multiple'}
      >
        {renderTags()}
        <ComboBoxInput
          ref={inputRef}
          id={inputId}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={handleFocus}
          disabled={disabled || loading}
          placeholder={
            mode === 'multiple' && Array.isArray(currentValue) && currentValue.length > 0
              ? ''
              : placeholder
          }
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-activedescendant={
            isOpen && enabledOptions[highlightedIndex]
              ? `${listboxId}-option-${enabledOptions[highlightedIndex].value}`
              : undefined
          }
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          aria-autocomplete="list"
          autoComplete="off"
        />
        <div className="combobox-icons">
          {loading && <ComboBoxSpinner />}
          {isClearable && (
            <ComboBoxClearButton
              type="button"
              aria-label="Clear selection"
              onClick={handleClear}
              onMouseDown={(e) => e.preventDefault()}
            >
              <FaTimes />
            </ComboBoxClearButton>
          )}
          <ComboBoxChevron isOpen={isOpen}>
            <FaChevronDown />
          </ComboBoxChevron>
        </div>
      </ComboBoxInputGroup>
      <AnimatePresence>
        {isOpen && (
          <ComboBoxDropdown
            id={listboxId}
            role="listbox"
            aria-multiselectable={mode === 'multiple'}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {filteredOptions.length === 0 ? (
              <ComboBoxEmpty>No results found</ComboBoxEmpty>
            ) : (
              filteredOptions.map((option, _index) => {
                const optionId = `${listboxId}-option-${option.value}`;
                const active = isSelected(option);
                const highlighted = enabledOptions[highlightedIndex]?.value === option.value;
                return (
                  <ComboBoxOption
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
                        const idx = enabledOptions.findIndex((o) => o.value === option.value);
                        if (idx >= 0) setHighlightedIndex(idx);
                      }
                    }}
                    style={
                      highlighted && !option.disabled
                        ? { outline: '2px solid currentColor', outlineOffset: '-2px' }
                        : undefined
                    }
                  >
                    {option.label}
                  </ComboBoxOption>
                );
              })
            )}
          </ComboBoxDropdown>
        )}
      </AnimatePresence>
      {error && (
        <span id={errorId} className="combobox-error">
          {error}
        </span>
      )}
    </ComboBoxWrapper>
  );
};
