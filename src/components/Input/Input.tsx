'use client';
import type React from 'react';
import { forwardRef, memo, useCallback, useEffect, useId, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from '../../icons';
import { useReducedMotion } from '../../context/ThemeContext';
import { motion } from '../../utils/lazyMotion';
import {
  CharacterCounter,
  ClearIcon,
  ErrorText,
  FloatingLabel,
  FooterWrapper,
  InputAddon,
  InputContainer,
  InputGroupWrapper,
  InputInnerWrapper,
  InputPrefix,
  InputSuffix,
  PasswordToggleIcon,
  StyledInput,
  StyledLabel,
  HelperText,
} from './Input.styles';

export type InputSize = 'small' | 'medium' | 'large';

export interface ResponsiveSizeConfig {
  sm: InputSize;
  md: InputSize;
  lg: InputSize;
}

/**
 * Input props interface with all v1.2.0 features:
 * - Floating labels
 * - Character counting
 * - Responsive sizing
 * - Custom styling support
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  inputSize?: InputSize | ResponsiveSizeConfig;
  fullWidth?: boolean | { sm: boolean; md: boolean; lg: boolean };
  error?: string;
  helperText?: string;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  clearIcon?: React.ReactNode;
  required?: boolean;
  floatingLabel?: boolean;
  characterCount?: boolean;
  maxLength?: number;
  glassMorphism?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Get size based on current breakpoint for responsive sizing
 */
const useResponsiveSize = (size: InputSize | ResponsiveSizeConfig): InputSize => {
  const [currentSize, setCurrentSize] = useState<InputSize>(
    typeof size === 'string' ? size : size.md
  );

  useEffect(() => {
    if (typeof size === 'string') return;

    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCurrentSize(size.sm);
      } else if (width < 1024) {
        setCurrentSize(size.md);
      } else {
        setCurrentSize(size.lg);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [size]);

  return typeof size === 'string' ? size : currentSize;
};

/**
 * Get fullWidth based on current breakpoint
 */
const useResponsiveFullWidth = (
  fullWidth: boolean | { sm: boolean; md: boolean; lg: boolean }
): boolean => {
  const [isFullWidth, setIsFullWidth] = useState<boolean>(
    typeof fullWidth === 'boolean' ? fullWidth : fullWidth.md
  );

  useEffect(() => {
    if (typeof fullWidth === 'boolean') return;

    const updateFullWidth = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setIsFullWidth(fullWidth.sm);
      } else if (width < 1024) {
        setIsFullWidth(fullWidth.md);
      } else {
        setIsFullWidth(fullWidth.lg);
      }
    };

    updateFullWidth();
    window.addEventListener('resize', updateFullWidth);
    return () => window.removeEventListener('resize', updateFullWidth);
  }, [fullWidth]);

  return typeof fullWidth === 'boolean' ? fullWidth : isFullWidth;
};

/**
 * An advanced neomorphic input with support for:
 * - Addons, icons, password toggle
 * - Clear button with custom icons
 * - Floating labels with animations
 * - Character counting
 * - Responsive sizing
 * - Glass morphism variant
 * - Spring animations for focus and labels
 *
 * v1.2.0 - Performance optimized with React.memo and useCallback
 */
const InputComponent: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      inputSize: sizeProp = 'medium',
      fullWidth: fullWidthProp = false,
      error = '',
      helperText = '',
      disabled = false,
      type,
      value,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      addonBefore,
      addonAfter,
      prefix,
      suffix,
      allowClear,
      clearIcon,
      required = false,
      floatingLabel = false,
      characterCount = false,
      maxLength,
      glassMorphism = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || (label ? generatedId : undefined);
    const errorId = inputId ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;
    const counterId = `${inputId}-counter`;
    const inputRef = useRef<HTMLInputElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(props.defaultValue || '');

    // Handle controlled/uncontrolled value
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const displayValue = currentValue ?? '';
    const hasValue = String(displayValue).length > 0;
    const shouldFloatLabel = floatingLabel && (hasValue || isFocused);

    // Responsive sizing
    const size = useResponsiveSize(sizeProp);
    const fullWidth = useResponsiveFullWidth(fullWidthProp);

    // Forward ref to inner input
    useImperativeHandle(ref, () => inputRef.current!);

    /**
     * Memoized handlers for performance
     */

    // Optimized clear handler - avoids expensive event spreading
    const handleClear = useCallback(
      (e: React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isControlled) {
          setInternalValue('');
        }

        // Create minimal change event
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;

        if (nativeInputValueSetter && inputRef.current) {
          nativeInputValueSetter.call(inputRef.current, '');
          const event = new Event('input', { bubbles: true });
          inputRef.current.dispatchEvent(event);
        }

        // Standard React synthetic event
        const synthEvent = {
          target: { value: '' },
          currentTarget: { value: '' },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        onChange?.(synthEvent);
        inputRef.current?.focus();
      },
      [isControlled, onChange]
    );

    // Memoized focus handler
    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    // Memoized blur handler
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    // Memoized key down handler
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Enter on clear button simulates clear
        if ((e.key === 'Enter' || e.key === ' ') && e.currentTarget === inputRef.current) {
          if (allowClear && hasValue) {
            handleClear(e as unknown as React.KeyboardEvent<HTMLSpanElement>);
            return;
          }
        }
        onKeyDown?.(e);
      },
      [onKeyDown, allowClear, hasValue, handleClear]
    );

    // Password toggle handler
    const handlePasswordToggle = useCallback(() => {
      setIsPasswordVisible((prev) => !prev);
    }, []);

    const handlePasswordToggleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePasswordToggle();
        }
      },
      [handlePasswordToggle]
    );

    const handleClearKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClear(e);
        }
      },
      [handleClear]
    );

    const isPassword = type === 'password';
    const inputType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type;

    // Character count calculations
    const charCount = String(displayValue).length;
    const nearLimit = maxLength ? charCount >= maxLength * 0.9 : false;
    const atLimit = maxLength ? charCount >= maxLength : false;

    // Spring animation config for focus ring
    const springConfig = useMemo(
      () => ({
        stiffness: prefersReducedMotion ? 1000 : 400,
        damping: prefersReducedMotion ? 100 : 25,
      }),
      [prefersReducedMotion]
    );

    // Memoized renderSuffix to prevent recreation
    const renderSuffix = useMemo(() => {
      if (isPassword) {
        return (
          <PasswordToggleIcon
            role="button"
            tabIndex={0}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            aria-pressed={isPasswordVisible}
            onClick={handlePasswordToggle}
            onKeyDown={handlePasswordToggleKeyDown}
          >
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggleIcon>
        );
      }
      if (allowClear && hasValue) {
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={springConfig}
          >
            <ClearIcon
              role="button"
              tabIndex={0}
              aria-label="Clear input"
              onClick={handleClear}
              onKeyDown={handleClearKeyDown}
              size={size}
            >
              {clearIcon || <span aria-hidden="true">&times;</span>}
            </ClearIcon>
          </motion.div>
        );
      }
      return suffix ? <InputSuffix>{suffix}</InputSuffix> : null;
    }, [
      isPassword,
      isPasswordVisible,
      allowClear,
      hasValue,
      clearIcon,
      suffix,
      handlePasswordToggle,
      handlePasswordToggleKeyDown,
      handleClear,
      handleClearKeyDown,
      size,
      springConfig,
    ]);

    // Build aria-describedby attribute
    const describedByIds =
      [helperId, errorId, characterCount ? counterId : undefined].filter(Boolean).join(' ') ||
      undefined;

    const inputElement = (
      <InputInnerWrapper
        className="input-inner"
        data-testid="input-inner"
        size={size}
        hasError={!!error}
        disabled={disabled}
        isFocused={isFocused}
        glassMorphism={glassMorphism}
      >
        {prefix && <InputPrefix>{prefix}</InputPrefix>}
        <StyledInput
          ref={inputRef}
          id={inputId}
          type={inputType}
          disabled={disabled}
          value={displayValue}
          onChange={(e) => {
            if (!isControlled) {
              setInternalValue(e.target.value);
            }
            onChange?.(e);
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-invalid={!!error}
          aria-describedby={describedByIds}
          aria-required={required}
          maxLength={maxLength}
          {...props}
        />
        {renderSuffix}
      </InputInnerWrapper>
    );

    // Show character counter
    const showCharCounter = characterCount && (maxLength || hasValue);

    return (
      <InputContainer
        fullWidth={fullWidth}
        className={className}
        style={style}
        hasFloatingLabel={floatingLabel && !!label}
      >
        {label && !floatingLabel && (
          <StyledLabel htmlFor={inputId}>
            {label}
            {required && <span aria-hidden="true"> *</span>}
          </StyledLabel>
        )}
        {label && floatingLabel && (
          <FloatingLabel
            htmlFor={inputId}
            size={size}
            isFloating={shouldFloatLabel}
            hasValue={hasValue}
            htmlTag="label"
            transition={prefersReducedMotion ? { duration: 0 } : { ...springConfig }}
            animate={{
              y: shouldFloatLabel ? 0 : size === 'small' ? 8 : size === 'large' ? 14 : 11,
              scale: shouldFloatLabel ? 0.85 : 1,
              color: error
                ? '#e53e3e'
                : isFocused
                ? 'var(--colors-primary)'
                : 'var(--colors-text)',
            }}
          >
            {label}
            {required && <span aria-hidden="true"> *</span>}
          </FloatingLabel>
        )}
        {addonBefore || addonAfter ? (
          <InputGroupWrapper>
            {addonBefore && <InputAddon className="input-addon">{addonBefore}</InputAddon>}
            {inputElement}
            {addonAfter && <InputAddon className="input-addon">{addonAfter}</InputAddon>}
          </InputGroupWrapper>
        ) : (
          inputElement
        )}
        {(error || helperText || showCharCounter) && (
          <FooterWrapper>
            <div style={{ flex: 1 }}>
              {error && <ErrorText id={errorId}>{error}</ErrorText>}
              {!error && helperText && <HelperText id={helperId}>{helperText}</HelperText>}
            </div>
            {showCharCounter && (
              <CharacterCounter
                id={counterId}
                nearLimit={nearLimit}
                atLimit={atLimit}
                role="status"
                aria-live="polite"
                aria-label={`${charCount}${maxLength ? ` of ${maxLength}` : ''} characters used`}
              >
                {charCount}
                {maxLength && ` / ${maxLength}`}
              </CharacterCounter>
            )}
          </FooterWrapper>
        )}
      </InputContainer>
    );
  }
);

// Display name for debugging
InputComponent.displayName = 'Input';

// Memoize the entire component for performance
export const Input = memo(InputComponent);
