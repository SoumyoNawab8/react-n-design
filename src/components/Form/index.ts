'use client';

export type { ErrorMessageProps } from './ErrorMessage';
export * from './ErrorMessage';
// Form components
export { Form, InternalForm } from './Form';
// Types
export type {
  FieldChangePayload,
  FieldData,
  FieldEntity,
  FieldValidatePayload,
  FormAction,
  FormContextValue,
  FormInstance,
  FormItemProps,
  FormLayout,
  FormProps,
  RuleType,
  ValidationRule,
} from './FormContext';
export {
  FormContext,
  useFormContext,
  useFormInstance,
} from './FormContext';
export type { FormFieldProps } from './FormField';
// Legacy components (for backward compatibility)
export * from './FormField';
export { FormItem, FormItemDeps } from './FormItem';
