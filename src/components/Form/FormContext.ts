'use client';
import { createContext, useContext } from 'react';

// ============================================
// Validation Types
// ============================================

export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email';

export interface ValidationRule {
  /** Whether the field is required */
  required?: boolean;
  /** Error message for this rule */
  message?: string;
  /** Custom validation function */
  validator?: (rule: ValidationRule, value: unknown, callback: (error?: string) => void) => void;
  /** RegExp pattern for validation */
  pattern?: RegExp;
  /** Minimum length (for strings/arrays) or value (for numbers) */
  min?: number;
  /** Maximum length (for strings/arrays) or value (for numbers) */
  max?: number;
  /** Exact length for strings/arrays */
  len?: number;
  /** Type validation */
  type?: RuleType;
  /** Whitespace validation - treat whitespace-only strings as empty */
  whitespace?: boolean;
  /** Transform value before validation */
  transform?: (value: unknown) => unknown;
  /** Enum validation - value must be one of these */
  enum?: (string | number | boolean)[];
  /** Built-in validation types */
  email?: boolean;
  /** URL validation */
  url?: boolean;
  /** Trigger validation on change or blur */
  trigger?: 'change' | 'blur' | string | string[];
}

// ============================================
// Form Instance Types
// ============================================

export type FormLayout = 'horizontal' | 'vertical' | 'inline';

export interface FieldData {
  /** Field name (can be nested like 'user.name') */
  name: string;
  /** Field value */
  value: unknown;
  /** Whether field has been touched */
  touched?: boolean;
  /** Validation errors */
  errors?: string[];
  /** Whether field is validating */
  validating?: boolean;
}

export interface FieldChangePayload {
  name: string;
  value: unknown;
}

export interface FieldValidatePayload {
  name: string;
  errors: string[];
}

export type FormAction =
  | { type: 'SET_FIELD_VALUE'; payload: FieldChangePayload }
  | { type: 'SET_FIELD_ERROR'; payload: { name: string; errors: string[] } }
  | { type: 'SET_FIELD_TOUCHED'; payload: { name: string; touched: boolean } }
  | { type: 'SET_FIELD_VALIDATING'; payload: { name: string; validating: boolean } }
  | { type: 'RESET_FIELDS'; payload?: { names?: string[] } }
  | { type: 'CLEAR_ERRORS' };

export interface FormInstance<T = unknown> {
  /** Get all field values */
  getFieldsValue: () => T;
  /** Get specific field value(s) */
  getFieldValue: (name: string) => unknown;
  /** Set multiple field values */
  setFieldsValue: (values: Partial<T>) => void;
  /** Set specific field value */
  setFieldValue: (name: string, value: unknown) => void;
  /** Validate all fields or specific fields */
  validateFields: (names?: string[]) => Promise<T>;
  /** Reset fields to initial values */
  resetFields: (names?: string[]) => void;
  /** Get field errors */
  getFieldError: (name: string) => string[];
  /** Get all errors */
  getFieldsError: () => Record<string, string[]>;
  /** Check if form is valid */
  isFieldsTouched: (names?: string[], allTouched?: boolean) => boolean;
  /** Check if fields are validating */
  isFieldValidating: (name: string) => boolean;
  /** Submit the form */
  submit: () => void;
}

// ============================================
// Form Context Value
// ============================================

export interface FormContextValue<T = unknown> {
  /** Form instance with methods */
  form: FormInstance<T>;
  /** Current form layout */
  layout: FormLayout;
  /** Field registration map */
  fieldEntities: Map<string, FieldEntity>;
  /** Current field values */
  values: T;
  /** Field errors */
  errors: Record<string, string[]>;
  /** Touched fields */
  touched: Record<string, boolean>;
  /** Fields currently validating */
  validating: Record<string, boolean>;
  /** Dispatch function for form actions */
  dispatch: React.Dispatch<FormAction>;
  /** Register a field */
  registerField: (name: string, entity: FieldEntity) => void;
  /** Unregister a field */
  unregisterField: (name: string) => void;
  /** Get initial value for a field */
  getInitialValue: (name: string) => unknown;

  // Legacy properties for compatibility
  /** Optimistic values */
  optimisticValues?: T;
  /** Handle field change */
  handleChange: (field: string) => (value: unknown) => void;
  /** Handle field blur */
  handleBlur: (field: string) => () => void;
  /** Set field error */
  setFieldError: (field: string, error: string | string[]) => void;
  /** Handle form submit */
  handleSubmit: (e?: React.FormEvent) => void | Promise<void>;
  /** Current form is submitting */
  isSubmitting: boolean;
  /** Label column config */
  labelCol?: { span?: number; offset?: number };
  /** Wrapper column config */
  wrapperCol?: { span?: number; offset?: number };
  /** Show colon after label */
  colon?: boolean;
  /** Label alignment */
  labelAlign?: 'left' | 'right';
  /** Required mark */
  requiredMark?: boolean | 'optional';
  /** v1.2.0: Whether form uses compact layout */
  compact?: boolean;
  /** v1.2.0: Responsive breakpoint for layout changes */
  responsiveBreakpoint?: number;
  /** Whether form is disabled */
  disabled?: boolean;
}

export interface FieldEntity {
  name: string;
  rules?: ValidationRule[];
  initialValue?: unknown;
  validateTrigger?: string | string[];
  onStoreChange?: () => void;
  getFieldProps?: () => Record<string, unknown>;
}

// ============================================
// FormItem Types
// ============================================

export interface FormItemProps {
  /** Field name (required) */
  name?: string;
  /** Validation rules */
  rules?: ValidationRule[];
  /** Field label */
  label?: React.ReactNode;
  /** Label col span (for horizontal layout) */
  labelCol?: { span?: number; offset?: number };
  /** Wrapper col span */
  wrapperCol?: { span?: number; offset?: number };
  /** Initial value */
  initialValue?: unknown;
  /** Whether to show required indicator */
  required?: boolean;
  /** Custom validate status */
  validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating';
  /** Help text or error message */
  help?: React.ReactNode;
  /** Extra content after input */
  extra?: React.ReactNode;
  /** Whether to show colon after label */
  colon?: boolean;
  /** Label align */
  labelAlign?: 'left' | 'right';
  /** Custom className */
  className?: string;
  /** Custom prefix for className */
  prefixCls?: string;
  /** Style object */
  style?: React.CSSProperties;
  /** Children - can be input component or render function */
  children?: React.ReactNode;
  /** Value prop name for children (default: 'value') */
  valuePropName?: string;
  /** Trigger prop name for children (default: 'onChange') */
  trigger?: string;
  /** Get value from event */
  getValueFromEvent?: (...args: unknown[]) => unknown;
  /** Normalize value before storing */
  normalize?: (value: unknown, prevValue: unknown, allValues: unknown) => unknown;
  /** Should update callback */
  shouldUpdate?: boolean | ((prevValues: unknown, nextValues: unknown) => boolean);
  /** Dependencies - re-validate when these fields change */
  dependencies?: string[];
  /** Hidden field */
  hidden?: boolean;
  /** Tooltip for label */
  tooltip?: React.ReactNode;
  /** Whether to preserve value when field removed */
  preserve?: boolean;
  /** Validate trigger events */
  validateTrigger?: string | string[];
  /** No style wrapper */
  noStyle?: boolean;
  /** Render function as child */
  render?: (props: {
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
  }) => React.ReactNode;
  /** v1.2.0: Show validation icon indicator */
  showValidationIcon?: boolean;
  /** v1.2.0: Debounce duration for validation (ms) */
  debounceMs?: number;
  /** v1.2.0: Animate error messages */
  animateErrors?: boolean;
}

// ============================================
// Form Props
// ============================================

export interface FormProps<T = unknown>
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Form instance (optional - will be created if not provided) */
  form?: FormInstance<T>;
  /** Initial values */
  initialValues?: Partial<T>;
  /** Callback when form submit succeeds */
  onFinish?: (values: T) => void;
  /** Callback when form submit fails validation */
  onFinishFailed?: (errors: {
    values: T;
    errorFields: { name: string; errors: string[] }[];
  }) => void;
  /** Callback when any field value changes */
  onValuesChange?: (changedValues: Partial<T>, allValues: T) => void;
  /** Callback when any field errors change */
  onFieldsChange?: (changedFields: FieldData[], allFields: FieldData[]) => void;
  /** Form layout */
  layout?: FormLayout;
  /** Label col span for horizontal layout */
  labelCol?: { span?: number; offset?: number };
  /** Wrapper col span */
  wrapperCol?: { span?: number; offset?: number };
  /** Whether to show colon after label */
  colon?: boolean;
  /** Label align for horizontal layout */
  labelAlign?: 'left' | 'right';
  /** Disabled all fields */
  disabled?: boolean;
  /**
   * Disabled all fields
   */
  size?: 'small' | 'middle' | 'large';
  /**
   * Scroll to first error on submit
   */
  scrollToFirstError?:
    | boolean
    | { behavior?: ScrollBehavior; block?: ScrollLogicalPosition; inline?: ScrollLogicalPosition };
  /**
   * Custom className prefix
   */
  prefixCls?: string;
  /**
   * Required field mark - can be 'optional' to show optional label
   */
  requiredMark?: boolean | 'optional';
  /**
   * Preserve form values when unmount
   */
  preserve?: boolean;
  /**
   * Auto complete attribute
   */
  autoComplete?: string;
  /**
   * Component to render form as (default: 'form')
   */
  component?: React.ElementType;
  /**
   * v1.2.0: Compact layout variant
   */
  compact?: boolean;
  /**
   * v1.2.0: Responsive breakpoint for layout changes
   */
  responsiveBreakpoint?: number;
}

// ============================================
// Context Creation
// ============================================

export const FormContext = createContext<FormContextValue<unknown> | null>(null);

export function useFormContext<T = unknown>(): FormContextValue<T> | null {
  return useContext(FormContext) as FormContextValue<T> | null;
}

export function useFormInstance<T = unknown>(): FormInstance<T> | null {
  const ctx = useContext(FormContext);
  return (ctx?.form as FormInstance<T>) || null;
}

export default FormContext;
