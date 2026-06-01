'use client';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeList as List, type ListChildComponentProps } from 'react-window';
import { FaChevronDown, FaSearch, FaTimes } from '../../icons';
import { useIsMobile } from '../../hooks/useIsMobile';
import type { Responsive } from '../../styles/responsive';
import { AnimatePresence } from '../../utils/lazyMotion';
import { Tag } from '../Tag';
import {
  ChipContainer,
  ChipItem,
  ClearButton,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SelectChevron,
  SelectDropdown,
  SelectIcons,
  SelectOption,
  SelectPlaceholder,
  SelectTrigger,
  SelectValue,
  SelectWrapper,
  Spinner,
  VirtualListWrapper,
} from './Select.styles';

export type SelectSize = 'small' | 'medium' | 'large';
export type SelectVariant = 'default' | 'filled' | 'outlined';

export interface SelectOptionGroup {
  label: React.ReactNode;
  options: SelectOptionProps[];
}

export interface SelectOptionProps {
  value: string | number;
  label: React.ReactNode;
  disabled?: boolean;
  group?: string;
}

export interface SelectProps {
  options: SelectOptionProps[] | SelectOptionGroup[];
  placeholder?: string;
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  onChange?: (value: any) => void;
  disabled?: boolean;
  loading?: boolean;
  allowClear?: boolean;
  mode?: 'single' | 'multiple';
  size?: SelectSize | Responsive<SelectSize>;
  variant?: SelectVariant | Responsive<SelectVariant>;
  error?: boolean;
  searchable?: boolean;
  showSearch?: boolean; // Whether to show search input (for multiple mode)
  fullWidth?: boolean | Responsive<boolean>;
  className?: string;
  style?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  dropdownClassName?: string;
  maxDropdownHeight?: number;
  itemHeight?: number;
  virtualThreshold?: number;
  emptyContent?: React.ReactNode;
  loadingContent?: React.ReactNode;
  'aria-label'?: string;
}

// Memoized click outside hook
const useClickOutside = (ref: React.RefObject<HTMLElement | null>, handler: () => void) => {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handlerRef.current();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref]);
};

// Get the actual size value accounting for responsive breakpoints
const getResponsiveSize = (size: SelectSize | Responsive<SelectSize>, isMobile: boolean): SelectSize => {
  if (typeof size === 'string') return size;
  if (size.mobile !== undefined && isMobile) return size.mobile;
  if (size.tablet !== undefined) return size.tablet;
  return size.desktop ?? 'medium';
};

// Get the actual fullWidth value accounting for responsive breakpoints
const getResponsiveFullWidth = (fullWidth: boolean | Responsive<boolean>, isMobile: boolean): boolean => {
  if (typeof fullWidth === 'boolean') return fullWidth;
  if (fullWidth.mobile !== undefined && isMobile) return fullWidth.mobile;
  if (fullWidth.tablet !== undefined) return fullWidth.tablet;
  return fullWidth.desktop ?? false;
};

// Flatten grouped options or return regular options
const flattenOptions = (options: SelectOptionProps[] | SelectOptionGroup[]): SelectOptionProps[] => {
  const result: SelectOptionProps[] = [];
  for (const option of options) {
    if ('options' in option && Array.isArray(option.options)) {
      result.push(...option.options);
    } else {
      result.push(option as SelectOptionProps);
    }
  }
  return result;
};

// Get groups from options
const getGroups = (options: SelectOptionProps[] | SelectOptionGroup[]): SelectOptionGroup[] => {
  const groups: SelectOptionGroup[] = [];
  for (const option of options) {
    if ('options' in option && Array.isArray(option.options)) {
      groups.push(option);
    }
  }
  return groups.length > 0 ? groups : [];
};

// Virtual list item renderer
interface VirtualItemData {
  options: SelectOptionProps[];
  enabledOptions: SelectOptionProps[];
  currentValue: string | number | (string | number)[] | undefined;
  mode: 'single' | 'multiple';
  searchQuery: string;
  highlightedIndex: number;
  listboxId: string;
  onSelect: (option: SelectOptionProps) => void;
  onMouseEnter: (index: number) => void;
  isSelected: (option: SelectOptionProps) => boolean;
  enabledIndexOf: (option: SelectOptionProps) => number;
}

const VirtualOptionItem = memo(({ index, style, data }: ListChildComponentProps<VirtualItemData>) => {
  const {
    options,
    enabledOptions,
    listboxId,
    onSelect,
    onMouseEnter,
    isSelected,
    enabledIndexOf,
    highlightedIndex,
  } = data;

  const option = options[index];
  if (!option) return null;

  const optionId = `${listboxId}-option-${option.value}`;
  const active = isSelected(option);
  const highlighted = enabledOptions[highlightedIndex]?.value === option.value;
  const optionEnabledIndex = enabledIndexOf(option);

  return (
    <div style={style}>
      <SelectOption
        id={optionId}
        role="option"
        aria-selected={active}
        aria-disabled={option.disabled}
        isActive={active}
        disabled={option.disabled}
        onClick={() => onSelect(option)}
        onMouseEnter={() => {
          if (!option.disabled && optionEnabledIndex >= 0) {
            onMouseEnter(optionEnabledIndex);
          }
        }}
        style={
          highlighted && !option.disabled
            ? { outline: '2px solid currentColor', outlineOffset: '-2px' }
            : undefined
        }
      >
        {option.label}
      </SelectOption>
    </div>
  );
});

VirtualOptionItem.displayName = 'VirtualOptionItem';

// Group header component
const GroupHeader = memo(({ label }: { label: React.ReactNode }) => (
  <div style={{ padding: '8px 12px', fontWeight: 600, color: 'var(--colors-shadowDark)', fontSize: '12px' }}>
    {label}
  </div>
));

GroupHeader.displayName = 'GroupHeader';

/**
 * An advanced dropdown component with virtualization, multi-select chips,
 * searchable dropdown, responsive sizing, and spring physics animations.
 */
const SelectBase = ({
  options: rawOptions,
  placeholder = 'Select...',
  value,
  defaultValue,
  onChange,
  disabled = false,
  loading = false,
  allowClear = false,
  mode = 'single',
  size = 'medium',
  variant = 'default',
  error = false,
  searchable = false,
  showSearch = false,
  fullWidth = false,
  className,
  style,
  dropdownStyle,
  dropdownClassName,
  maxDropdownHeight = 250,
  itemHeight = 44,
  virtualThreshold = 50,
  emptyContent,
  loadingContent,
  'aria-label': ariaLabel,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [exitingChips, setExitingChips] = useState<Set<string | number>>(new Set());
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<List>(null);
  const isMobile = useIsMobile();

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Resolve responsive props
  const resolvedSize = useMemo(() => getResponsiveSize(size, isMobile), [size, isMobile]);
  const resolvedVariant = useMemo(() => {
    if (typeof variant === 'string') return variant;
    if (variant.mobile !== undefined && isMobile) return variant.mobile;
    if (variant.tablet !== undefined) return variant.tablet;
    return variant.desktop ?? 'default';
  }, [variant, isMobile]);
  const resolvedFullWidth = useMemo(() => getResponsiveFullWidth(fullWidth, isMobile), [fullWidth, isMobile]);

  const listboxId = `select-listbox-${Math.random().toString(36).substr(2, 9)}`;
  const triggerId = `${listboxId}-trigger`;

  // Flatten options for rendering
  const allOptions = useMemo(() => flattenOptions(rawOptions), [rawOptions]);
  const groups = useMemo(() => getGroups(rawOptions), [rawOptions]);
  const hasGroups = groups.length > 0;

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return allOptions;
    return allOptions.filter((option) => {
      const labelText = typeof option.label === 'string' ? option.label : '';
      return labelText.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [allOptions, searchQuery]);

  // Get enabled options for keyboard navigation
  const enabledOptions = useMemo(() => filteredOptions.filter((o) => !o.disabled), [filteredOptions]);

  const enabledIndexOf = useCallback(
    (option: SelectOptionProps) => enabledOptions.findIndex((o) => o.value === option.value),
    [enabledOptions]
  );

  const isSelected = useCallback(
    (option: SelectOptionProps) => {
      if (mode === 'multiple') {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        return currentArray.includes(option.value);
      }
      return currentValue === option.value;
    },
    [currentValue, mode]
  );

  useClickOutside(wrapperRef, () => setIsOpen(false));

  // Reset highlighted index when search changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && (searchable || showSearch)) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen, searchable, showSearch]);

  // Scroll to highlighted item in virtual list
  useEffect(() => {
    if (isOpen && listRef.current && allOptions.length > virtualThreshold) {
      listRef.current.scrollToItem(highlightedIndex, 'smart');
    }
  }, [highlightedIndex, isOpen, allOptions.length, virtualThreshold]);

  const handleSelect = useCallback(
    (option: SelectOptionProps) => {
      if (option.disabled) return;

      let newValue: any;
      if (mode === 'multiple') {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        if (currentArray.includes(option.value)) {
          // Animate chip removal
          setExitingChips((prev) => new Set([...prev, option.value]));
          setTimeout(() => {
            setExitingChips((prev) => {
              const next = new Set(prev);
              next.delete(option.value);
              return next;
            });
            const filteredValue = currentArray.filter((v) => v !== option.value);
            if (!isControlled) setInternalValue(filteredValue);
            onChange?.(filteredValue);
          }, 200);
          return;
        }
        newValue = [...currentArray, option.value];
      } else {
        newValue = option.value;
        setIsOpen(false);
      }

      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    },
    [currentValue, mode, isControlled, onChange]
  );

  const handleChipRemove = useCallback(
    (valueToRemove: string | number) => {
      // Animate chip removal
      setExitingChips((prev) => new Set([...prev, valueToRemove]));
      setTimeout(() => {
        setExitingChips((prev) => {
          const next = new Set(prev);
          next.delete(valueToRemove);
          return next;
        });
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        const newValue = currentArray.filter((v) => v !== valueToRemove);
        if (!isControlled) setInternalValue(newValue);
        onChange?.(newValue);
      }, 200);
    },
    [currentValue, isControlled, onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const newValue = mode === 'multiple' ? [] : undefined;
      if (!isControlled) setInternalValue(newValue);
      onChange?.(newValue);
    },
    [mode, isControlled, onChange]
  );

  const getLabelForValue = useCallback(
    (val: string | number) => allOptions.find((o) => o.value === val)?.label,
    [allOptions]
  );

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
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
          setHighlightedIndex((prev) => (prev + 1) % enabledOptions.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          }
          setHighlightedIndex((prev) => (prev - 1 + enabledOptions.length) % enabledOptions.length);
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
    },
    [disabled, loading, isOpen, enabledOptions, highlightedIndex, handleSelect]
  );

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setHighlightedIndex(0);
  }, []);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setSearchQuery('');
        triggerRef.current?.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % enabledOptions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + enabledOptions.length) % enabledOptions.length);
      } else if (e.key === 'Enter' && enabledOptions[highlightedIndex]) {
        handleSelect(enabledOptions[highlightedIndex]);
      }
    },
    [enabledOptions, highlightedIndex, handleSelect]
  );

  // Memoized value renderer
  const renderValue = useMemo(() => {
    if (mode === 'multiple') {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      if (currentArray.length === 0 && !showSearch) {
        return <SelectPlaceholder>{placeholder}</SelectPlaceholder>;
      }
      return (
        <ChipContainer>
          {currentArray.map((v) => {
            const isExiting = exitingChips.has(v);
            return (
              <ChipItem
                key={v}
                isExiting={isExiting}
                size={resolvedSize}
              >
                <Tag
                  size="small"
                  variant="primary"
                  onClose={(e) => {
                    e.stopPropagation();
                    handleChipRemove(v);
                  }}
                >
                  {getLabelForValue(v)}
                </Tag>
              </ChipItem>
            );
          })}
          {showSearch && (
            <SearchInput
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder={currentArray.length === 0 ? placeholder : ''}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </ChipContainer>
      );
    }

    const selectedOption = allOptions.find((o) => o.value === currentValue);
    if (!selectedOption) return <SelectPlaceholder>{placeholder}</SelectPlaceholder>;
    return <SelectValue>{selectedOption.label}</SelectValue>;
  }, [
    mode,
    currentValue,
    showSearch,
    placeholder,
    exitingChips,
    resolvedSize,
    handleChipRemove,
    getLabelForValue,
    allOptions,
    searchQuery,
    handleSearchChange,
    handleSearchKeyDown,
  ]);

  const isClearable =
    allowClear && currentValue && (Array.isArray(currentValue) ? currentValue.length > 0 : true);

  // Virtual list item data
  const virtualItemData: VirtualItemData = useMemo(
    () => ({
      options: allOptions,
      enabledOptions,
      currentValue,
      mode,
      searchQuery,
      highlightedIndex,
      listboxId,
      onSelect: handleSelect,
      onMouseEnter: setHighlightedIndex,
      isSelected,
      enabledIndexOf,
    }),
    [
      allOptions,
      enabledOptions,
      currentValue,
      mode,
      searchQuery,
      highlightedIndex,
      listboxId,
      handleSelect,
      isSelected,
      enabledIndexOf,
    ]
  );

  // Determine if we should use virtual list
  const useVirtualList = allOptions.length > virtualThreshold;

  // Empty state
  const renderEmptyState = () => {
    if (emptyContent) return <div style={{ padding: '16px' }}>{emptyContent}</div>;
    return (
      <EmptyState>
        <EmptyStateIcon>🔍</EmptyStateIcon>
        <EmptyStateText>
          {searchQuery ? `No results for "${searchQuery}"` : 'No options available'}
        </EmptyStateText>
      </EmptyState>
    );
  };

  // Loading state
  const renderLoadingState = () => {
    if (loadingContent) return <div style={{ padding: '16px' }}>{loadingContent}</div>;
    return (
      <EmptyState>
        <Spinner />
        <EmptyStateText>Loading...</EmptyStateText>
      </EmptyState>
    );
  };

  // Render grouped options
  const renderGroupedOptions = () => {
    let itemIndex = 0;
    return (
      <>
        {groups.map((group, groupIdx) => (
          <React.Fragment key={groupIdx}>
            <GroupHeader label={group.label} />
            {group.options
              .filter((option) => {
                if (!searchQuery.trim()) return true;
                const labelText = typeof option.label === 'string' ? option.label : '';
                return labelText.toLowerCase().includes(searchQuery.toLowerCase());
              })
              .map((option) => {
                const optionId = `${listboxId}-option-${option.value}`;
                const active = isSelected(option);
                const highlighted = enabledOptions[highlightedIndex]?.value === option.value;
                const optionEnabledIndex = enabledIndexOf(option);
                const currentItemIndex = itemIndex++;

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
                      if (!option.disabled && optionEnabledIndex >= 0) {
                        setHighlightedIndex(optionEnabledIndex);
                      }
                    }}
                    style={
                      highlighted && !option.disabled
                        ? { outline: '2px solid currentColor', outlineOffset: '-2px' }
                        : undefined
                    }
                  >
                    {option.label}
                  </SelectOption>
                );
              })}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <SelectWrapper ref={wrapperRef} className={className} style={style} fullWidth={resolvedFullWidth}>
      <SelectTrigger
        ref={triggerRef}
        id={triggerId}
        size={resolvedSize}
        variant={resolvedVariant}
        isOpen={isOpen}
        hasError={error}
        disabled={disabled || loading}
        isMulti={mode === 'multiple'}
        fullWidth={resolvedFullWidth}
        onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
        onKeyDown={handleTriggerKeyDown}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={
          isOpen && enabledOptions[highlightedIndex]
            ? `${listboxId}-option-${enabledOptions[highlightedIndex]?.value}`
            : undefined
        }
        aria-disabled={disabled || loading}
        aria-invalid={error}
        aria-label={ariaLabel}
        tabIndex={disabled ? -1 : 0}
      >
        {renderValue}
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
          <SelectChevron isOpen={isOpen}>
            <FaChevronDown />
          </SelectChevron>
        </SelectIcons>
      </SelectTrigger>
      <AnimatePresence>
        {isOpen && (
          <SelectDropdown
            id={listboxId}
            className={dropdownClassName}
            role="listbox"
            aria-multiselectable={mode === 'multiple'}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: 0.2,
            }}
            style={dropdownStyle}
            size={resolvedSize}
          >
            {loading ? (
              renderLoadingState()
            ) : (
              <>
                {searchable && mode === 'single' && (
                  <SearchContainer>
                    <SearchIcon>
                      <FaSearch />
                    </SearchIcon>
                    <SearchInput
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchKeyDown}
                      placeholder="Search..."
                      onClick={(e) => e.stopPropagation()}
                    />
                  </SearchContainer>
                )}
                
                {filteredOptions.length === 0 ? (
                  renderEmptyState()
                ) : useVirtualList && !hasGroups ? (
                  <VirtualListWrapper height={maxDropdownHeight}>
                    <List
                      ref={listRef}
                      height={maxDropdownHeight}
                      itemCount={allOptions.length}
                      itemSize={itemHeight}
                      itemData={virtualItemData}
                      width="100%"
                    >
                      {VirtualOptionItem}
                    </List>
                  </VirtualListWrapper>
                ) : hasGroups ? (
                  <div style={{ maxHeight: maxDropdownHeight, overflowY: 'auto' }}>
                    {renderGroupedOptions()}
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const optionId = `${listboxId}-option-${option.value}`;
                    const active = isSelected(option);
                    const highlighted = enabledOptions[highlightedIndex]?.value === option.value;
                    const optionEnabledIndex = enabledIndexOf(option);
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
                          if (!option.disabled && optionEnabledIndex >= 0) {
                            setHighlightedIndex(optionEnabledIndex);
                          }
                        }}
                        style={
                          highlighted && !option.disabled
                            ? { outline: '2px solid currentColor', outlineOffset: '-2px' }
                            : undefined
                        }
                      >
                        {option.label}
                      </SelectOption>
                    );
                  })
                )}
              </>
            )}
          </SelectDropdown>
        )}
      </AnimatePresence>
    </SelectWrapper>
  );
};

SelectBase.displayName = 'Select';

// Export memoized version for performance
export const Select = memo(SelectBase);

export default Select;
