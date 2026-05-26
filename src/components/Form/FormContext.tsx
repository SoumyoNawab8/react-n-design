'use client';
import { createContext, useContext } from 'react';

export type FormLayout = 'horizontal' | 'vertical' | 'inline';
export type LabelAlign = 'left' | 'right';

export interface ColSpan {
  span?: number;
  offset?: number;
}

export interface FormContextValue<T = any> {
  values: T;
  errors: Record<string, string[]> | Record<string, string>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  optimisticValues?: T;
  handleChange: (field: keyof T) => (value: any) => void;
  handleBlur: (field: keyof T) => () => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string | string[]) => void;
  handleSubmit: (e?: React.FormEvent) => void | Promise<void>;
  // Form layout properties
  layout?: FormLayout;
  labelCol?: ColSpan;
  wrapperCol?: ColSpan;
  colon?: boolean;
  labelAlign?: LabelAlign;
  requiredMark?: boolean;
  // Form instance
  form?: any;
  validating?: Record<string, boolean>;
  fieldEntities?: Map<string, any>;
  dispatch?: (action: any) => void;
  registerField?: (name: string, entity: any) => void;
  unregisterField?: (name: string) => void;
  getInitialValue?: (name: string) => any;
}

export const FormContext = createContext<FormContextValue<any> | null>(null);

export function useFormContext<T = any>(): FormContextValue<T> | null {
  return useContext(FormContext);
}

// Re-export types for compatibility
export type {
  FieldData,
  FieldEntity,
  FormAction,
  FormInstance,
  FormProps,
  ValidationRule,
} from './types';

export type ValidationRuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'date'
  | 'url'
  | 'email'
  | 'hex'
  | 'enum';

export interface ValidationRule {
  required?: boolean;
  message?: string;
  type?: ValidationRuleType;
  whitespace?: boolean;
  email?: boolean;
  url?: boolean;
  pattern?: RegExp;
  len?: number;
  min?: number;
  max?: number;
  enum?: any[];
  validator?: (rule: ValidationRule, value: any, callback: (error?: string) => void) => void;
}

export interface FieldEntity {
  name: string;
  rules?: ValidationRule[];
  initialValue?: any;
  validateTrigger?: string[] | string;
  onStoreChange?: () => void;
  valuePropName?: string;
  getValueFromEvent?: (...args: any[]) => any;
  trigger?: string;
}

export interface FieldData {
  name: string;
  value?: any;
  errors?: string[];
  touched?: boolean;
  validating?: boolean;
}

export type FormAction =
  | { type: 'SET_FIELD_VALUE'; payload: { name: string; value: any } }
  | { type: 'SET_FIELD_ERROR'; payload: { name: string; errors: string[] } }
  | { type: 'SET_FIELD_TOUCHED'; payload: { name: string; touched: boolean } }
  | { type: 'SET_FIELD_VALIDATING'; payload: { name: string; validating: boolean } }
  | { type: 'RESET_FIELDS'; payload?: { names: string[] } }
  | { type: 'CLEAR_ERRORS' };

export interface FormInstance<T = any> {
  getFieldsValue: () => T;
  getFieldValue: (name: string) => any;
  setFieldsValue: (values: Partial<T>) => void;
  setFieldValue: (name: string, value: any) => void;
  validateFields: (names?: string[]) => Promise<T>;
  resetFields: (names?: string[]) => void;
  getFieldError: (name: string) => string[];
  getFieldsError: () => Record<string, string[]>;
  isFieldsTouched: (names?: string[], allTouched?: boolean) => boolean;
  isFieldValidating: (name: string) => boolean;
  submit: () => void;
}

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  form?: FormInstance;
  initialValues?: Record<string, any>;
  onFinish?: (values: any) => void;
  onFinishFailed?: (errorInfo: any) => void;
  onValuesChange?: (changedValues: any, allValues: any) => void;
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
  layout?: FormLayout;
  labelCol?: ColSpan;
  wrapperCol?: ColSpan;
  colon?: boolean;
  labelAlign?: LabelAlign;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  scrollToFirstError?: boolean | ScrollIntoViewOptions;
  prefixCls?: string;
  requiredMark?: boolean;
  preserve?: boolean;
  autoComplete?: string;
  component?: string | React.ComponentType;
}

export interface FormItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  name?: string;
  rules?: ValidationRule[];
  label?: React.ReactNode;
  labelCol?: ColSpan;
  wrapperCol?: ColSpan;
  initialValue?: any;
  required?: boolean;
  validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating';
  help?: React.ReactNode;
  extra?: React.ReactNode;
  colon?: boolean;
  labelAlign?: LabelAlign;
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (...args: any[]) => any;
  normalize?: (value: any, prevValue: any, allValues: any) => any;
  shouldUpdate?: boolean | ((prevValues: any, nextValues: any) => boolean);
  dependencies?: string[];
  hidden?: boolean;
  tooltip?: React.ReactNode;
  preserve?: boolean;
  validateTrigger?: string | string[];
  noStyle?: boolean;
  render?: (props: {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
  }) => React.ReactNode;
}
