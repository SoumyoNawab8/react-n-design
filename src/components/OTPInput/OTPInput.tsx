'use client';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { OTPDigitInput, OTPInputContainer } from './OTPInput.styles';

export interface OTPInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export const OTPInput = ({
  length = 6,
  value = '',
  onChange,
  onComplete,
  disabled = false,
  error = false,
  className,
}: OTPInputProps) => {
  const [digits, setDigits] = useState<string[]>(() => {
    const arr = value.split('').slice(0, length);
    while (arr.length < length) arr.push('');
    return arr;
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const hasInteractedRef = useRef(false);

  // Sync with external value prop
  useEffect(() => {
    const arr = value.split('').slice(0, length);
    while (arr.length < length) arr.push('');
    setDigits(arr);
  }, [value, length]);

  const focusInput = useCallback(
    (index: number) => {
      if (index >= 0 && index < length) {
        const el = inputRefs.current[index];
        if (el) {
          el.focus();
          el.select();
        }
      }
    },
    [length]
  );

  const updateDigits = useCallback(
    (newDigits: string[]) => {
      setDigits(newDigits);
      const combined = newDigits.join('');
      onChange?.(combined);

      const isComplete = newDigits.every((d) => d !== '');
      if (isComplete && hasInteractedRef.current) {
        onComplete?.(combined);
      }
    },
    [onChange, onComplete]
  );

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    if (val === '') return;

    const lastChar = val.slice(-1);
    if (!/^\d$/.test(lastChar)) return;

    hasInteractedRef.current = true;
    const newDigits = [...digits];
    newDigits[index] = lastChar;
    updateDigits(newDigits);

    // Auto-advance to next input
    if (index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (digits[index] !== '') {
        hasInteractedRef.current = true;
        const newDigits = [...digits];
        newDigits[index] = '';
        updateDigits(newDigits);
      } else if (index > 0) {
        hasInteractedRef.current = true;
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        updateDigits(newDigits);
        focusInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (index > 0) focusInput(index - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (index < length - 1) focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    hasInteractedRef.current = true;
    const pastedData = e.clipboardData.getData('text');
    const numericChars = pastedData
      .replace(/\D/g, '')
      .split('')
      .slice(0, length);

    const newDigits = [...digits];
    numericChars.forEach((char, i) => {
      if (i < length) newDigits[i] = char;
    });

    updateDigits(newDigits);

    const nextEmpty = newDigits.findIndex((d) => d === '');
    if (nextEmpty !== -1) {
      focusInput(nextEmpty);
    } else {
      focusInput(length - 1);
    }
  };

  return (
    <OTPInputContainer
      className={className}
      role="group"
      aria-label="One-time password input"
    >
      {digits.map((digit, index) => (
        <OTPDigitInput
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          error={error}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => inputRefs.current[index]?.select()}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={error}
          data-testid={`otp-input-${index}`}
        />
      ))}
    </OTPInputContainer>
  );
};

export const PinInput = OTPInput;
