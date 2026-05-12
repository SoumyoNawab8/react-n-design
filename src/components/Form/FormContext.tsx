'use client';
import { createContext, useContext } from 'react';

export interface FormContextValue<T = any> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  optimisticValues?: T;
  handleChange: (field: keyof T) => (value: any) => void;
  handleBlur: (field: keyof T) => () => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string) => void;
  handleSubmit: (e?: React.FormEvent) => void | Promise<void>;
}

export const FormContext = createContext<FormContextValue<any> | null>(null);

export function useFormContext<T = any>(): FormContextValue<T> | null {
  return useContext(FormContext);
}
