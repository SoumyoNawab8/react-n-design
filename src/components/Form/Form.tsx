'use client';
import type React from 'react';
import { StyledForm } from './Form.styles';
import { FormContext, type FormContextValue } from './FormContext';

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  form?: FormContextValue<any>;
}

export const Form = ({ children, onSubmit, form, ...props }: FormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
    form?.handleSubmit(e);
  };

  return (
    <FormContext.Provider value={form || null}>
      <StyledForm onSubmit={handleSubmit} {...props}>
        {children}
      </StyledForm>
    </FormContext.Provider>
  );
};
