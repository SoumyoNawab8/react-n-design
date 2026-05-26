'use client';
import type React from 'react';
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  CharacterCounter,
  ErrorText,
  FooterWrapper,
  HelperText,
  StyledLabel,
  StyledTextArea,
  TextAreaContainer,
  TextAreaWrapper,
} from './TextArea.styles';

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  inputSize?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
  minRows?: number;
  maxRows?: number;
  autoResize?: boolean;
  required?: boolean;
}

export interface TextAreaRef {
  focus: () => void;
  blur: () => void;
  select: () => void;
  setSelectionRange: (
    start: number,
    end: number,
    direction?: 'forward' | 'backward' | 'none'
  ) => void;
  textarea: HTMLTextAreaElement | null;
}

/**
 * A multi-line text input component with auto-resize, character counting,
 * and full accessibility support. Follows neomorphic design patterns.
 */
export const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
  (
    {
      label,
      id,
      inputSize = 'medium',
      fullWidth = false,
      error = '',
      helperText = '',
      disabled = false,
      readOnly = false,
      maxLength,
      showCount = false,
      minRows = 3,
      maxRows = 10,
      autoResize = false,
      required = false,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      onKeyDown,
      rows,
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const generatedId = useId();
    const textareaId = id || generatedId;
    const errorId = error ? `${textareaId}-error` : undefined;
    const helperId = helperText ? `${textareaId}-helper` : undefined;
    const counterId = `${textareaId}-counter`;
    const [isFocused, setIsFocused] = useState(false);
    const [internalValue, setInternalValue] = useState(defaultValue || '');

    // Determine if component is controlled
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const displayValue = currentValue ?? '';

    // Expose imperative methods
    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
      blur: () => textareaRef.current?.blur(),
      select: () => textareaRef.current?.select(),
      setSelectionRange: (
        start: number,
        end: number,
        direction?: 'forward' | 'backward' | 'none'
      ) => {
        textareaRef.current?.setSelectionRange(start, end, direction);
      },
      textarea: textareaRef.current,
    }));

    // Auto-resize logic
    const adjustHeight = useCallback(() => {
      const el = textareaRef.current;
      if (!el || !autoResize) return;

      // Save scroll position
      const scrollTop = el.scrollTop;

      // Reset height to auto to get the natural scrollHeight
      el.style.height = 'auto';

      // Calculate line height
      const lineHeight = parseInt(getComputedStyle(el).lineHeight, 10) || 24;
      const borderHeight =
        parseInt(getComputedStyle(el).borderTopWidth, 10) +
          parseInt(getComputedStyle(el).borderBottomWidth, 10) || 0;

      // Calculate min and max heights
      const minHeight = minRows * lineHeight + borderHeight;
      const maxHeight = maxRows * lineHeight + borderHeight;

      // Set height based on content, clamped to min/max
      const newHeight = Math.max(minHeight, Math.min(el.scrollHeight, maxHeight));
      el.style.height = `${newHeight}px`;
      el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';

      // Restore scroll position
      el.scrollTop = scrollTop;
    }, [autoResize, minRows, maxRows]);

    // Apply auto-resize when value changes
    useEffect(() => {
      adjustHeight();
    }, [adjustHeight]);

    // Initial height adjustment
    useEffect(() => {
      adjustHeight();
    }, [adjustHeight]);

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        onFocus?.(e);
      },
      [onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isControlled) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [isControlled, onChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // Tab + Enter to submit (common pattern)
        if (e.key === 'Enter' && e.ctrlKey) {
          // Allow default behavior (new line) or custom handling
          const form = textareaRef.current?.form;
          if (form) {
            form.requestSubmit();
          }
        }
        onKeyDown?.(e);
      },
      [onKeyDown]
    );

    const charCount = typeof displayValue === 'string' ? displayValue.length : 0;
    const nearLimit = maxLength ? charCount >= maxLength * 0.9 : false;
    const atLimit = maxLength ? charCount >= maxLength : false;

    // Build aria-describedby attribute
    const describedByIds =
      [helperId, errorId, showCount ? counterId : undefined].filter(Boolean).join(' ') || undefined;

    return (
      <TextAreaContainer fullWidth={fullWidth}>
        {label && (
          <StyledLabel htmlFor={textareaId}>
            {label}
            {required && <span aria-hidden="true"> *</span>}
          </StyledLabel>
        )}
        <TextAreaWrapper
          size={inputSize}
          hasError={!!error}
          disabled={disabled}
          readOnly={readOnly}
          isFocused={isFocused}
        >
          <StyledTextArea
            ref={textareaRef}
            id={textareaId}
            disabled={disabled}
            readOnly={readOnly}
            rows={autoResize ? minRows : rows}
            value={displayValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-describedby={describedByIds}
            aria-required={required}
            aria-multiline="true"
            {...props}
          />
        </TextAreaWrapper>
        {(error || helperText || (showCount && maxLength)) && (
          <FooterWrapper>
            <div style={{ flex: 1 }}>
              {error && <ErrorText id={errorId}>{error}</ErrorText>}
              {!error && helperText && <HelperText id={helperId}>{helperText}</HelperText>}
            </div>
            {showCount && maxLength && (
              <CharacterCounter
                id={counterId}
                nearLimit={nearLimit}
                atLimit={atLimit}
                role="status"
                aria-live="polite"
                aria-label={`${charCount} of ${maxLength} characters used`}
              >
                {charCount} / {maxLength}
              </CharacterCounter>
            )}
            {showCount && !maxLength && (
              <CharacterCounter
                id={counterId}
                nearLimit={false}
                atLimit={false}
                role="status"
                aria-live="polite"
              >
                {charCount}
              </CharacterCounter>
            )}
          </FooterWrapper>
        )}
      </TextAreaContainer>
    );
  }
);

TextArea.displayName = 'TextArea';
