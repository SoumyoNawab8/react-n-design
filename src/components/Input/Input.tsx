'use client';
import type React from 'react';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from '../../icons';
import {
  ClearIcon,
  ErrorText,
  InputAddon,
  InputContainer,
  InputGroupWrapper,
  InputInnerWrapper,
  InputPrefix,
  InputSuffix,
  PasswordToggleIcon,
  StyledInput,
  StyledLabel,
} from './Input.styles';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  label?: string;
  inputSize?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  error?: string;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  required?: boolean;
}

/**
 * An advanced neomorphic input with support for addons, icons,
 * password visibility toggle, and a clear button.
 */
export const Input = ({
  label,
  id,
  inputSize = 'medium',
  fullWidth = false,
  error = '',
  disabled = false,
  type,
  value,
  onChange,
  addonBefore,
  addonAfter,
  prefix,
  suffix,
  allowClear,
  required = false,
  ...props
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const errorId = inputId ? `${inputId}-error` : undefined;

  const handleClear = (e: React.MouseEvent<HTMLSpanElement>) => {
    const mockEvent = {
      ...e,
      target: { ...e.target, value: '' },
      currentTarget: { ...e.currentTarget, value: '' },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange?.(mockEvent);
  };

  const handlePasswordToggleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  const handleClearKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClear(e as unknown as React.MouseEvent<HTMLSpanElement>);
    }
  };

  const isPassword = type === 'password';
  const inputType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type;

  const renderSuffix = () => {
    if (isPassword) {
      return (
        <PasswordToggleIcon
          role="button"
          tabIndex={0}
          aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          aria-pressed={isPasswordVisible}
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          onKeyDown={handlePasswordToggleKeyDown}
        >
          {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
        </PasswordToggleIcon>
      );
    }
    if (allowClear && value) {
      return (
        <ClearIcon
          role="button"
          tabIndex={0}
          aria-label="Clear input"
          onClick={handleClear}
          onKeyDown={handleClearKeyDown}
        >
          &times;
        </ClearIcon>
      );
    }
    return suffix ? <InputSuffix>{suffix}</InputSuffix> : null;
  };

  const inputElement = (
    <InputInnerWrapper
      className="input-inner"
      size={inputSize}
      hasError={!!error}
      disabled={disabled}
    >
      {prefix && <InputPrefix>{prefix}</InputPrefix>}
      <StyledInput
        id={inputId}
        type={inputType}
        disabled={disabled}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        aria-required={required}
        {...props}
      />
      {renderSuffix()}
    </InputInnerWrapper>
  );

  return (
    <InputContainer fullWidth={fullWidth}>
      {label && (
        <StyledLabel htmlFor={inputId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </StyledLabel>
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
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </InputContainer>
  );
};
