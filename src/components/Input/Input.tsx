import React, { useState } from 'react';
import {
  InputGroupWrapper, InputAddon, InputInnerWrapper, InputPrefix, InputSuffix,
  StyledInput, ClearIcon, PasswordToggleIcon, InputContainer, StyledLabel, ErrorText
} from './Input.styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Example icons

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  error?: string;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
}

/**
 * An advanced neomorphic input with support for addons, icons,
 * password visibility toggle, and a clear button.
 */
export const Input = ({
  label,
  id,
  size = 'medium',
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
  ...props
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined);

  const handleClear = (e: React.MouseEvent<HTMLSpanElement>) => {
    const mockEvent = {
      ...e,
      target: { ...e.target, value: '' },
      currentTarget: { ...e.currentTarget, value: '' },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange?.(mockEvent);
  };
  
  const isPassword = type === 'password';
  const inputType = isPassword ? (isPasswordVisible ? 'text' : 'password') : type;

  const renderSuffix = () => {
    if (isPassword) {
      return <PasswordToggleIcon onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
      </PasswordToggleIcon>;
    }
    if (allowClear && value) {
      return <ClearIcon onClick={handleClear}>&times;</ClearIcon>;
    }
    return suffix ? <InputSuffix>{suffix}</InputSuffix> : null;
  };

  const inputElement = (
    <InputInnerWrapper size={size} hasError={!!error} disabled={disabled}>
      {prefix && <InputPrefix>{prefix}</InputPrefix>}
      <StyledInput
        id={inputId}
        type={inputType}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...props}
      />
      {renderSuffix()}
    </InputInnerWrapper>
  );

  return (
    <InputContainer fullWidth={fullWidth}>
      {label && <StyledLabel htmlFor={inputId}>{label}</StyledLabel>}
      {addonBefore || addonAfter ? (
        <InputGroupWrapper>
          {addonBefore && <InputAddon className="input-addon">{addonBefore}</InputAddon>}
          {inputElement}
          {addonAfter && <InputAddon className="input-addon">{addonAfter}</InputAddon>}
        </InputGroupWrapper>
      ) : (
        inputElement
      )}
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};