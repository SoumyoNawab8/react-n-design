'use client';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyledForm } from './Form.styles';
import type {
  FieldEntity,
  FormAction,
  FormInstance,
  FormProps,
  ValidationRule,
} from './FormContext';
import { FormContext, type FormContextValue } from './FormContext';

function validateRuleSync(
  rule: ValidationRule,
  value: unknown,
  _allValues: unknown
): string | undefined {
  if (rule.required) {
    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === 'string' && (rule.whitespace ? value.trim() === '' : value === '')) ||
      (Array.isArray(value) && value.length === 0);
    if (isEmpty) return rule.message || 'This field is required';
  }
  if (value === undefined || value === null || value === '') return undefined;
  if (rule.type) {
    const validators: Record<string, () => boolean> = {
      string: () => typeof value === 'string',
      number: () => typeof value === 'number' && !Number.isNaN(value),
      boolean: () => typeof value === 'boolean',
      email: () =>
        typeof value === 'string' && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value),
      url: () =>
        typeof value === 'string' &&
        /^(https?:\/\/)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(:[0-9]+)?(\/[a-zA-Z0-9-._~%!$()&'"*+,;=:@/\/?#]*)?$/.test(value),
    };
    if (validators[rule.type] && !validators[rule.type]()) {
      return rule.message || `Invalid ${rule.type}`;
    }
  }
  if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
    return rule.message || 'Invalid format';
  }
  if (rule.len !== undefined) {
    const len =
      typeof value === 'string' || Array.isArray(value) ? value.length : String(value).length;
    if (len !== rule.len) return rule.message || `Length must be exactly ${rule.len}`;
  }
  if (rule.min !== undefined) {
    if (typeof value === 'number' && value < rule.min)
      return rule.message || `Minimum value is ${rule.min}`;
    const len =
      typeof value === 'string' || Array.isArray(value) ? value.length : String(value).length;
    if (len < rule.min) return rule.message || `Minimum length is ${rule.min}`;
  }
  if (rule.max !== undefined) {
    if (typeof value === 'number' && value > rule.max)
      return rule.message || `Maximum value is ${rule.max}`;
    const len =
      typeof value === 'string' || Array.isArray(value) ? value.length : String(value).length;
    if (len > rule.max) return rule.message || `Maximum length is ${rule.max}`;
  }
  return undefined;
}

async function validateField(
  value: unknown,
  rules: ValidationRule[],
  allValues: unknown
): Promise<string[]> {
  const errors: string[] = [];
  for (const rule of rules) {
    let error: string | undefined;
    if (rule.validator) {
      error = await new Promise((resolve) => rule.validator(rule, value, (err) => resolve(err)));
    } else {
      error = validateRuleSync(rule, value, allValues);
    }
    if (error) {
      errors.push(error);
      if (rule.validator) break;
    }
  }
  return errors;
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(function Form(props, _ref) {
  const {
    children,
    initialValues = {},
    onFinish,
    onFinishFailed,
    onValuesChange,
    layout = 'horizontal',
    labelCol,
    wrapperCol,
    colon = true,
    labelAlign = 'right',
    disabled = false,
    size = 'middle',
    scrollToFirstError,
    requiredMark = true,
    autoComplete = 'off',
    component: Component = 'form',
    className,
    style,
    ...restProps
  } = props;

  const [values, setValues] = useState<Record<string, unknown>>({ ...initialValues });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [validating, setValidating] = useState<Record<string, boolean>>({});
  const fieldEntities = useRef<Map<string, FieldEntity>>(new Map());
  const formRef = useRef<HTMLFormElement>(null);
  const [, forceUpdate] = useState({});

  const dispatch = useCallback(
    (action: FormAction) => {
      switch (action.type) {
        case 'SET_FIELD_VALUE':
          setValues((prev) => ({ ...prev, [action.payload.name]: action.payload.value }));
          forceUpdate({});
          break;
        case 'SET_FIELD_ERROR':
          setErrors((prev) => ({ ...prev, [action.payload.name]: action.payload.errors }));
          break;
        case 'SET_FIELD_TOUCHED':
          setTouched((prev) => ({ ...prev, [action.payload.name]: action.payload.touched }));
          break;
        case 'SET_FIELD_VALIDATING':
          setValidating((prev) => ({ ...prev, [action.payload.name]: action.payload.validating }));
          break;
        case 'RESET_FIELDS':
          if (action.payload?.names) {
            setValues((prev) => {
              const next = { ...prev };
              action.payload.names.forEach((n: string) => delete next[n]);
              return next;
            });
            setErrors((prev) => {
              const next = { ...prev };
              action.payload.names.forEach((n: string) => delete next[n]);
              return next;
            });
            setTouched((prev) => {
              const next = { ...prev };
              action.payload.names.forEach((n: string) => delete next[n]);
              return next;
            });
          } else {
            setValues({ ...initialValues });
            setErrors({});
            setTouched({});
            setValidating({});
          }
          break;
        case 'CLEAR_ERRORS':
          setErrors({});
          break;
      }
    },
    [initialValues]
  );

  const formInstance = useMemo<FormInstance>(
    () => ({
      getFieldsValue: () => values,
      getFieldValue: (name: string) => values[name],
      setFieldsValue: (newValues: Record<string, unknown>) => {
        Object.entries(newValues).forEach(([key, value]) =>
          dispatch({ type: 'SET_FIELD_VALUE', payload: { name: key, value } })
        );
        onValuesChange?.(
          newValues as Record<string, unknown>,
          { ...values, ...newValues } as Record<string, unknown>
        );
      },
      setFieldValue: (name: string, value: unknown) => {
        dispatch({ type: 'SET_FIELD_VALUE', payload: { name, value } });
        onValuesChange?.({ [name]: value }, { ...values, [name]: value });
      },
      validateFields: async (names?: string[]) => {
        const fieldNames = names || Array.from(fieldEntities.current.keys());
        const allErrors: Record<string, string[]> = {};
        let hasError = false;
        for (const name of fieldNames) {
          const entity = fieldEntities.current.get(name);
          if (entity?.rules?.length) {
            dispatch({ type: 'SET_FIELD_VALIDATING', payload: { name, validating: true } });
            const fieldErrors = await validateField(values[name], entity.rules, values);
            dispatch({ type: 'SET_FIELD_VALIDATING', payload: { name, validating: false } });
            dispatch({ type: 'SET_FIELD_ERROR', payload: { name, errors: fieldErrors } });
            if (fieldErrors.length) {
              allErrors[name] = fieldErrors;
              hasError = true;
            }
          }
        }
        if (hasError)
          throw {
            values,
            errorFields: Object.entries(allErrors).map(([name, errors]) => ({ name, errors })),
          };
        return values;
      },
      resetFields: (names?: string[]) =>
        dispatch({ type: 'RESET_FIELDS', payload: names ? { names } : undefined }),
      getFieldError: (name: string) => errors[name] || [],
      getFieldsError: () => errors,
      isFieldsTouched: (names?: string[], allTouched = false) => {
        const fieldNames = names || Array.from(fieldEntities.current.keys());
        if (!fieldNames.length) return false;
        return allTouched
          ? fieldNames.every((name) => touched[name])
          : fieldNames.some((name) => touched[name]);
      },
      isFieldValidating: (name: string) => validating[name] || false,
      submit: () => {},
    }),
    [values, errors, touched, validating, onValuesChange, dispatch]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        onFinish?.(await formInstance.validateFields());
      } catch (errorInfo) {
        onFinishFailed?.(
          errorInfo as {
            values: Record<string, unknown>;
            errorFields: { name: string; errors: string[] }[];
          }
        );
        if (scrollToFirstError && formRef.current) {
          const firstErrorName = (errorInfo as { errorFields: { name: string }[] }).errorFields?.[0]
            ?.name;
          if (firstErrorName)
            formRef.current
              .querySelector(`[name="${firstErrorName}"]`)
              ?.scrollIntoView(
                typeof scrollToFirstError === 'boolean'
                  ? { behavior: 'smooth', block: 'center' }
                  : scrollToFirstError
              );
        }
      }
    },
    [formInstance, onFinish, onFinishFailed, scrollToFirstError]
  );

  const contextValue = useMemo<FormContextValue>(
    () => ({
      form: formInstance,
      layout,
      fieldEntities: fieldEntities.current,
      values,
      errors,
      touched,
      validating,
      dispatch,
      registerField: (name: string, entity: FieldEntity) => {
        fieldEntities.current.set(name, entity);
        forceUpdate({});
      },
      unregisterField: (name: string) => {
        fieldEntities.current.delete(name);
        forceUpdate({});
      },
      getInitialValue: (name: string) => initialValues[name],
      optimisticValues: values,
      handleChange: (field) => (value) =>
        dispatch({ type: 'SET_FIELD_VALUE', payload: { name: field as string, value } }),
      handleBlur: (field) => () =>
        dispatch({ type: 'SET_FIELD_TOUCHED', payload: { name: field as string, touched: true } }),
      setFieldError: (field, error) =>
        dispatch({
          type: 'SET_FIELD_ERROR',
          payload: { name: field as string, errors: Array.isArray(error) ? error : [error] },
        }),
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
      handleSubmit,
      labelCol,
      wrapperCol,
      colon,
      labelAlign,
      requiredMark,
      initialValues,
    ]
  );

  return (
    <FormContext.Provider value={contextValue}>
      <StyledForm
        ref={formRef}
        as={Component}
        onSubmit={handleSubmit}
        autoComplete={autoComplete}
        className={className}
        style={style}
        data-layout={layout}
        data-size={size}
        data-disabled={disabled}
        {...restProps}
      >
        {children}
      </StyledForm>
    </FormContext.Provider>
  );
});

Form.displayName = 'Form';

export const InternalForm = Form;
export default Form;
