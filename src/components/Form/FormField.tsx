'use client';
import React from 'react';
import { Input } from '../Input';
import { useFormContext } from './FormContext';

export interface FormFieldProps {
  name: string;
  label?: string;
  children?: React.ReactElement;
}

export const FormField = ({ name, label, children }: FormFieldProps) => {
  const ctx = useFormContext();

  if (!ctx) {
    if (children) {
      return children;
    }
    return <Input name={name} label={label} />;
  }

  const fieldName = String(name);
  const value = ctx.optimisticValues?.[fieldName] ?? ctx.values[fieldName];
  const error = ctx.errors[fieldName];
  const touched = ctx.touched[fieldName];
  const showError = !!error && !!touched;

  const id = `form-field-${fieldName}`;
  const errorId = showError ? `${id}-error` : undefined;

  const handleChange = (val: any) => {
    ctx.handleChange(fieldName)(val);
  };

  const handleBlur = () => {
    ctx.handleBlur(fieldName)();
  };

  if (children) {
    return React.cloneElement(children, {
      id: (children.props as any).id || id,
      name: fieldName,
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      error: showError ? error : undefined,
      'aria-invalid': showError ? true : undefined,
      'aria-describedby': errorId,
      label: (children.props as any).label !== undefined ? (children.props as any).label : label,
    } as any);
  }

  return (
    <Input
      id={id}
      name={fieldName}
      label={label}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      error={showError ? (Array.isArray(error) ? error[0] : error) : undefined}
      aria-invalid={showError ? true : undefined}
      aria-describedby={errorId}
      fullWidth
    />
  );
};
