import React, { useState, useRef, useEffect } from 'react';
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  useClickOutside(wrapperRef, () => setIsOpen(false));

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

  const renderValue = () => {
    if (mode === 'multiple') {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      if (currentArray.length === 0) return <SelectPlaceholder>{placeholder}</SelectPlaceholder>;
      return (
        <MultiSelectValueWrapper>
          {currentArray.map(v => (
            <Tag key={v} size="small" variant="primary" onClose={(e) => {
              e.stopPropagation(); // Prevent dropdown from opening on tag close
              handleSelect({ value: v, label: ''});
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
        size={size}
        isOpen={isOpen}
        hasError={error}
        disabled={disabled || loading}
        isMulti={mode === 'multiple'}
        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
      >
        {renderValue()}
        <SelectIcons>
          {loading && <Spinner />}
          {isClearable && !loading && !disabled && (
            <ClearButton onClick={handleClear}><FaTimes /></ClearButton>
          )}
          <SelectChevron isOpen={isOpen}><FaChevronDown /></SelectChevron>
        </SelectIcons>
      </SelectTrigger>
      <AnimatePresence>
        {isOpen && (
          <SelectDropdown
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {options.map(option => (
              <SelectOption
                key={option.value}
                isActive={mode === 'multiple'
                  ? (currentValue as any[])?.includes(option.value)
                  : currentValue === option.value
                }
                disabled={option.disabled}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </SelectOption>
            ))}
          </SelectDropdown>
        )}
      </AnimatePresence>
    </SelectWrapper>
  );
};