'use client';
import React, { useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { motion } from '../../utils/lazyMotion';
import { ErrorMessage, FormFieldWrapper, StyledForm } from './Form.styles';
import type { FieldData, FieldEntity, FormAction } from './FormContext';
import {
  FormContext,
  type FormContextValue,
  type FormInstance,
  type FormLayout,
  type FormProps,
  type ValidationRule,
} from './FormContext';

// ============================================
// Utility Functions
// ============================================

function getPathValue<T = any>(obj: any, path: string): T {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    if (result === null || result === undefined) return undefined as T;
    result = result[key];
  }
  return result as T;
}

function setPathValue(obj: any, path: string, value: any): any {
  const keys = path.split('.');
  const result = { ...obj };
  let current = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = { ...current[key] };
    current = current[key];
  }
  current[keys[keys.length - 1]] = value;
  return result;
}

function deletePathValue(obj: any, path: string): any {
  const keys = path.split('.');
  const result = { ...obj };
  let current = result;
  for (let i = 0; i < keys.length - 1; i++) {
    if (current[keys[i]] === undefined) return result;
    current[keys[i]] = { ...current[keys[i]] };
    current = current[keys[i]];
  }
  delete current[keys[keys.length - 1]];
  return result;
}

// ============================================
// Validation Logic
// ============================================

async function validateRule(
  rule: ValidationRule,
  value: any,
  allValues: any
): Promise<string | undefined> {
  // Required check
  if (rule.required) {
    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === 'string' && (rule.whitespace ? value.trim() === '' : value === '')) ||
      (Array.isArray(value) && value.length === 0);
    if (isEmpty) {
      return rule.message || 'This field is required';
    }
  }

  // If empty and not required, skip other validations
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  // Type validation
  if (rule.type) {
    const valueType = typeof value;
    const typeValidators: Record<string, () => boolean> = {
      string: () => typeof value === 'string',
      number: () => typeof value === 'number' && !isNaN(value),
      boolean: () => typeof value === 'boolean',
      method: () => typeof value === 'function',
      regexp: () => value instanceof RegExp,
      integer: () => Number.isInteger(value),
      float: () => typeof value === 'number' && !Number.isInteger(value),
      array: () => Array.isArray(value),
      object: () => typeof value === 'object' && value !== null && !Array.isArray(value),
      date: () => value instanceof Date,
      url: () =>
        typeof value === 'string' &&
        /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})([/\w .-]*)*\/?$/.test(value),
      email: () => typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      hex: () => typeof value === 'string' && /^#[0-9A-Fa-f]{6}$/.test(value),
      enum: () => rule.enum?.includes(value) ?? true,
    };
    const validator = typeValidators[rule.type];
    if (validator && !validator()) {
      return rule.message || `This field should be of type ${rule.type}`;
    }
  }

  // Email validation shortcut
  if (rule.email && typeof value === 'string') {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return rule.message || 'Please enter a valid email';
    }
  }

  // URL validation shortcut
  if (rule.url && typeof value === 'string') {
    if (!/^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})([/\w .-]*)*\/?$/.test(value)) {
      return rule.message || 'Please enter a valid URL';
    }
  }

  // Pattern validation
  if (rule.pattern && typeof value === 'string') {
    if (!rule.pattern.test(value)) {
      return rule.message || 'Invalid format';
    }
  }

  // Length validation (for strings and arrays)
  if (rule.len !== undefined) {
    const length =
      typeof value === 'string' || Array.isArray(value) ? value.length : String(value).length;
    if (length !== rule.len) {
      return rule.message || `Length must be exactly ${rule.len}`;
    }
  }

  // Min validation
  if (rule.min !== undefined) {
    if (typeof value === 'number' && value < rule.min) {
      return rule.message || `Value must be at least ${rule.min}`;
    }
    if ((typeof value === 'string' || Array.isArray(value)) && value.length < rule.min) {
      return rule.message || `Minimum length is ${rule.min}`;
    }
  }

  // Max validation
  if (rule.max !== undefined) {
    if (typeof value === 'number' && value > rule.max) {
      return rule.message || `Value must be at most ${rule.max}`;
    }
    if ((typeof value === 'string' || Array.isArray(value)) && value.length > rule.max) {
      return rule.message || `Maximum length is ${rule.max}`;
    }
  }

  // Enum validation
  if (rule.enum && !rule.enum.includes(value)) {
    return rule.message || `Value must be one of: ${rule.enum.join(', ')}`;
  }

  // Custom validation
  if (rule.validator) {
    return new Promise((resolve) => {
      rule.validator(rule, value, (error) => {
        resolve(error);
      });
    });
  }

  return undefined;
}

async function validateField(
  value: any,
  rules: ValidationRule[],
  allValues: any
): Promise<string[]> {
  const errors: string[] = [];
  for (const rule of rules) {
    const error = await validateRule(rule, value, allValues);
    if (error) {
      errors.push(error);
      if (rule.validator) break; // Stop on first validation error for custom validators
    }
  }
  return errors;
}

// ============================================
// Form Hook (component-specific)
// ============================================

function useFormInternal<T extends Record<string, any> = any>(
  initialValues?: Partial<T>
): FormInstance<T> {
  const [, forceUpdate] = useState({});
  const formRef = useRef<FormInstance<T> | null>(null);

  if (!formRef.current) {
    const form = createForm<T>({
      initialValues: initialValues || {},
      onChange: () => forceUpdate({}),
    });
    formRef.current = form;
  }

  return formRef.current;
}

interface FormOptions<T> {
  initialValues: Partial<T>;
  onChange?: () => void;
}

function createForm<T extends Record<string, any> = any>(options: FormOptions<T>): FormInstance<T> {
  const { initialValues = {}, onChange } = options;

  let values = { ...initialValues } as T;
  let errors: Record<string, string[]> = {};
  const touched: Record<string, boolean> = {};
  const validating: Record<string, boolean> = {};
  const fieldEntities: Map<string, FieldEntity> = new Map();

  const notifyChange = () => {
    onChange?.();
    fieldEntities.forEach((entity) => {
      entity.onStoreChange?.();
    });
  };

  const form: FormInstance<T> = {
    getFieldsValue: () => values,

    getFieldValue: (name: string) => getPathValue(values, name),

    setFieldsValue: (newValues: Partial<T>) => {
      values = { ...values, ...newValues };
      notifyChange();
    },

    setFieldValue: (name: string, value: any) => {
      values = setPathValue(values, name, value);
      notifyChange();
    },

    validateFields: async (names?: string[]) => {
      const fieldNames = names || Array.from(fieldEntities.keys());
      const allErrors: Record<string, string[]> = {};
      let hasError = false;

      for (const name of fieldNames) {
        const entity = fieldEntities.get(name);
        if (entity?.rules && entity.rules.length > 0) {
          const value = getPathValue(values, name);
          const fieldErrors = await validateField(value, entity.rules, values);
          if (fieldErrors.length > 0) {
            allErrors[name] = fieldErrors;
            hasError = true;
          }
        }
      }

      if (hasError) {
        errors = allErrors;
        notifyChange();
        throw {
          values,
          errorFields: Object.entries(allErrors).map(([name, errors]) => ({ name, errors })),
        };
      }

      errors = {};
      notifyChange();
      return values;
    },

    resetFields: (names?: string[]) => {
      const fieldNames = names || Array.from(fieldEntities.keys());
      for (const name of fieldNames) {
        values = deletePathValue(values, name);
        delete errors[name];
        delete touched[name];
        delete validating[name];
      }
      notifyChange();
    },

    getFieldError: (name: string) => errors[name] || [],

    getFieldsError: () => errors,

    isFieldsTouched: (names?: string[], allTouched = false) => {
      const fieldNames = names || Array.from(fieldEntities.keys());
      if (fieldNames.length === 0) return false;

      if (allTouched) {
        return fieldNames.every((name) => touched[name]);
      }
      return fieldNames.some((name) => touched[name]);
    },

    isFieldValidating: (name: string) => validating[name] || false,

    submit: () => {},
  };

  return form;
}

// ============================================
// Form Component
// ============================================

export const InternalForm = React.forwardRef<HTMLFormElement, FormProps>(
  function InternalForm(props, ref) {
    const {
      form: formProp,
      children,
      initialValues = {},
      onFinish,
      onFinishFailed,
      onValuesChange,
      onFieldsChange,
      layout = 'horizontal',
      labelCol,
      wrapperCol,
      colon = true,
      labelAlign = 'right',
      disabled = false,
      size = 'middle',
      scrollToFirstError,
      prefixCls = 'n-form',
      requiredMark = true,
      preserve = true,
      autoComplete = 'off',
      component: Component = 'form',
      className,
      style,
      ...restProps
    } = props;

    // State
    const [values, setValues] = useState<any>({ ...initialValues });
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [validating, setValidating] = useState<Record<string, boolean>>({});
    const fieldEntities = useRef<Map<string, FieldEntity>>(new Map());
    const formRef = useRef<HTMLFormElement>(null);

    // Handle submit - defined BEFORE contextValue
    const handleSubmit = useCallback(
      async (e: React.FormEvent) => {
        e.preventDefault();

        try {
          const validatedValues = await formInstance.validateFields();
          onFinish?.(validatedValues);
        } catch (errorInfo) {
          onFinishFailed?.(errorInfo as any);

          if (scrollToFirstError) {
            const firstErrorName = (errorInfo as any).errorFields?.[0]?.name;
            if (firstErrorName && formRef.current) {
              const element = formRef.current.querySelector(`[name="${firstErrorName}"]`);
              element?.scrollIntoView(
                typeof scrollToFirstError === 'boolean'
                  ? { behavior: 'smooth', block: 'center' }
                  : scrollToFirstError
              );
            }
          }
        }
      },
      [onFinish, onFinishFailed, scrollToFirstError]
    );

    // Reducer
    const dispatch = useCallback(
      (action: FormAction) => {
        switch (action.type) {
          case 'SET_FIELD_VALUE': {
            const { name: fieldName, value: newValue } = action.payload;
            setValues((prev) => {
              if (JSON.stringify(prev[fieldName]) === JSON.stringify(newValue)) return prev;
              return { ...prev, [fieldName]: newValue };
            });
            break;
          }
          case 'SET_FIELD_ERROR': {
            const { name: errorName, errors: fieldErrors } = action.payload;
            setErrors((prev) => {
              if (JSON.stringify(prev[errorName]) === JSON.stringify(fieldErrors)) return prev;
              return { ...prev, [errorName]: fieldErrors };
            });
            break;
          }
          case 'SET_FIELD_TOUCHED': {
            const { name: touchName, touched: fieldTouched } = action.payload;
            setTouched((prev) => ({ ...prev, [touchName]: fieldTouched }));
            break;
          }
          case 'SET_FIELD_VALIDATING': {
            const { name: valName, validating: fieldValidating } = action.payload;
            setValidating((prev) => ({ ...prev, [valName]: fieldValidating }));
            break;
          }
          case 'RESET_FIELDS': {
            const resetNames = action.payload?.names;
            if (resetNames) {
              setValues((prev) => {
                const next = { ...prev };
                resetNames.forEach((name) => delete next[name]);
                return next;
              });
              setErrors((prev) => {
                const next = { ...prev };
                resetNames.forEach((name) => delete next[name]);
                return next;
              });
              setTouched((prev) => {
                const next = { ...prev };
                resetNames.forEach((name) => delete next[name]);
                return next;
              });
            } else {
              setValues({ ...initialValues });
              setErrors({});
              setTouched({});
              setValidating({});
            }
            break;
          }
          case 'CLEAR_ERRORS':
            setErrors({});
            break;
        }
      },
      [initialValues]
    );

    // Form instance
    const formInstance = useMemo<FormInstance>(() => {
      const instance: FormInstance = {
        getFieldsValue: () => values,
        getFieldValue: (name: string) => values[name],
        setFieldsValue: (newValues: any) => {
          Object.entries(newValues).forEach(([key, value]) => {
            dispatch({ type: 'SET_FIELD_VALUE', payload: { name: key, value } });
          });
          onValuesChange?.(newValues, { ...values, ...newValues });
        },
        setFieldValue: (name: string, value: any) => {
          dispatch({ type: 'SET_FIELD_VALUE', payload: { name, value } });
          onValuesChange?.({ [name]: value } as any, { ...values, [name]: value });
        },
        validateFields: async (names?: string[]) => {
          const fieldNames = names || Array.from(fieldEntities.current.keys());
          const allErrors: Record<string, string[]> = {};
          let hasError = false;

          for (const name of fieldNames) {
            const entity = fieldEntities.current.get(name);
            if (entity?.rules && entity.rules.length > 0) {
              dispatch({ type: 'SET_FIELD_VALIDATING', payload: { name, validating: true } });
              const fieldErrors = await validateField(values[name], entity.rules, values);
              dispatch({ type: 'SET_FIELD_VALIDATING', payload: { name, validating: false } });

              dispatch({ type: 'SET_FIELD_ERROR', payload: { name, errors: fieldErrors } });
              if (fieldErrors.length > 0) {
                allErrors[name] = fieldErrors;
                hasError = true;
              }
            }
          }

          if (hasError) {
            throw {
              values,
              errorFields: Object.entries(allErrors).map(([name, errs]) => ({
                name,
                errors: errs,
              })),
            };
          }

          return values;
        },
        resetFields: (names?: string[]) => {
          dispatch({ type: 'RESET_FIELDS', payload: names ? { names } : undefined });
        },
        getFieldError: (name: string) => errors[name] || [],
        getFieldsError: () => errors,
        isFieldsTouched: (names?: string[], allTouched = false) => {
          const fieldNames = names || Array.from(fieldEntities.current.keys());
          if (fieldNames.length === 0) return false;
          if (allTouched) {
            return fieldNames.every((name) => touched[name]);
          }
          return fieldNames.some((name) => touched[name]);
        },
        isFieldValidating: (name: string) => validating[name] || false,
        submit: () => {
          formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        },
      };
      return instance;
    }, [values, errors, touched, validating, dispatch, onValuesChange]);

    // Register/unregister fields
    const registerField = useCallback((name: string, entity: FieldEntity) => {
      fieldEntities.current.set(name, entity);
    }, []);

    const unregisterField = useCallback(
      (name: string) => {
        fieldEntities.current.delete(name);
        if (!preserve) {
          dispatch({ type: 'RESET_FIELDS', payload: { names: [name] } });
        }
      },
      [preserve, dispatch]
    );

    // Get initial value for field
    const getInitialValue = useCallback(
      (name: string) => {
        return initialValues?.[name];
      },
      [initialValues]
    );

    // Context value - now AFTER handleSubmit is defined
    const contextValue: FormContextValue = useMemo(
      () => ({
        form: formInstance,
        layout,
        fieldEntities: fieldEntities.current,
        values,
        errors,
        touched,
        validating,
        dispatch,
        registerField,
        unregisterField,
        getInitialValue,
        // Legacy properties
        optimisticValues: values,
        handleChange: (field: string) => (value: any) => {
          dispatch({ type: 'SET_FIELD_VALUE', payload: { name: field as string, value } });
        },
        handleBlur: (field: string) => () => {
          dispatch({
            type: 'SET_FIELD_TOUCHED',
            payload: { name: field as string, touched: true },
          });
        },
        setFieldError: (field: string, error: string | string[]) => {
          dispatch({
            type: 'SET_FIELD_ERROR',
            payload: { name: field as string, errors: Array.isArray(error) ? error : [error] },
          });
        },
        handleSubmit,
        isSubmitting: false,
        labelCol,
        wrapperCol,
        colon,
        labelAlign,
        requiredMark,
      }),
      [
        formInstance,
        layout,
        values,
        errors,
        touched,
        validating,
        dispatch,
        registerField,
        unregisterField,
        getInitialValue,
        handleSubmit,
        labelCol,
        wrapperCol,
        colon,
        labelAlign,
        requiredMark,
      ]
    );

    return (
      <FormContext.Provider value={contextValue}>
        <StyledForm
          ref={formRef}
          as={Component}
          onSubmit={handleSubmit}
          autoComplete={autoComplete}
          className={`${prefixCls} ${prefixCls}-${layout} ${className || ''}`}
          style={style}
          {...restProps}
        >
          {children}
        </StyledForm>
      </FormContext.Provider>
    );
  }
);

// Export Form wrapper
export const Form = InternalForm;
Form.displayName = 'Form';

// Export useForm hook
export { useFormInternal as useForm };
