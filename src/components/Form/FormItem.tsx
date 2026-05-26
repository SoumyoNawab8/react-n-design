'use client';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle } from '../../icons';
import {
  FormItemControl,
  FormItemExtra,
  FormItemHelp,
  FormItemLabel,
  FormItemWrapper,
  RequiredMark,
  ValidationIcon,
} from './Form.styles';
import type { FieldEntity, FormItemProps } from './FormContext';
import { FormContext } from './FormContext';

function getValueFromEvent(...args: unknown[]): unknown {
  const e = args[0] as { target?: { value?: unknown; checked?: unknown } } | undefined;
  if (e && typeof e === 'object' && 'target' in e) {
    const { target } = e;
    if ('value' in target) return target.value;
    if ('checked' in target) return target.checked;
  }
  return e;
}

function getFieldId(name: string, formName?: string): string {
  return formName ? `${formName}_${name}` : `n-form-field-${name}`;
}

const InternalFormItem: React.FC<FormItemProps> = ({
  name,
  rules = [],
  label,
  labelCol,
  wrapperCol,
  initialValue: initialValueProp,
  required: requiredProp,
  validateStatus: validateStatusProp,
  help: helpProp,
  extra,
  colon: colonProp,
  labelAlign,
  className,
  prefixCls = 'n-form-item',
  style,
  children,
  valuePropName = 'value',
  trigger = 'onChange',
  getValueFromEvent: customGetValueFromEvent,
  normalize,
  dependencies = [],
  hidden,
  preserve = true,
  validateTrigger,
  noStyle,
  render,
}) => {
  const formContext = useContext(FormContext);
  const {
    form,
    layout = 'horizontal',
    labelCol: formLabelCol,
    wrapperCol: formWrapperCol,
    colon: formColon = true,
    labelAlign: formLabelAlign = 'right',
    requiredMark: formRequiredMark = true,
    dispatch,
    values: formValues,
    errors: formErrors,
    touched: formTouched,
    validating: formValidating,
    registerField,
    unregisterField,
    getInitialValue,
  } = formContext || {};

  const fieldRef = useRef<FieldEntity>({ name: name || '' });
  const valueRef = useRef(initialValueProp ?? (name ? getInitialValue?.(name) : undefined));

  const [internalValue, setInternalValue] = useState(valueRef.current);
  const [internalTouched, setInternalTouched] = useState(false);
  const [internalValidating, setInternalValidating] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const value = name ? (formValues?.[name] ?? internalValue) : internalValue;
  const touched = name ? (formTouched?.[name] ?? internalTouched) : internalTouched;
  const validating = name ? (formValidating?.[name] ?? internalValidating) : internalValidating;
  const fieldErrors = name ? (formErrors?.[name] ?? []) : errors;

  const isRequired = useMemo(
    () => (requiredProp !== undefined ? requiredProp : rules.some((r) => r.required)),
    [requiredProp, rules]
  );
  const validateStatus = useMemo(() => {
    if (validateStatusProp) return validateStatusProp;
    if (validating) return 'validating';
    if (fieldErrors?.length > 0) return 'error';
    if (touched && !fieldErrors?.length) return 'success';
    return '';
  }, [validateStatusProp, validating, fieldErrors, touched]);

  // Validate function - defined BEFORE callbacks that use it
  const validateFieldValue = useCallback(
    async (fieldValue: unknown) => {
      if (rules.length === 0) return;
      if (name && formContext)
        dispatch?.({ type: 'SET_FIELD_VALIDATING', payload: { name, validating: true } });
      else setInternalValidating(true);

      const validatorErrors: string[] = [];
      for (const rule of rules) {
        if (rule.required) {
          const isEmpty =
            fieldValue === undefined ||
            fieldValue === null ||
            (typeof fieldValue === 'string' &&
              (rule.whitespace ? fieldValue.trim() === '' : fieldValue === '')) ||
            (Array.isArray(fieldValue) && fieldValue.length === 0);
          if (isEmpty) {
            validatorErrors.push(rule.message || 'This field is required');
            continue;
          }
        }
        if (fieldValue === undefined || fieldValue === null || fieldValue === '') continue;
        if (rule.pattern && typeof fieldValue === 'string' && !rule.pattern.test(fieldValue)) {
          validatorErrors.push(rule.message || 'Invalid format');
          continue;
        }
        if (rule.len !== undefined) {
          const len =
            typeof fieldValue === 'string' || Array.isArray(fieldValue)
              ? fieldValue.length
              : String(fieldValue).length;
          if (len !== rule.len) {
            validatorErrors.push(rule.message || `Length must be exactly ${rule.len}`);
            continue;
          }
        }
        if (rule.min !== undefined) {
          if (typeof fieldValue === 'number' && fieldValue < rule.min) {
            validatorErrors.push(rule.message || `Minimum value is ${rule.min}`);
            continue;
          }
          const len =
            typeof fieldValue === 'string' || Array.isArray(fieldValue)
              ? fieldValue.length
              : String(fieldValue).length;
          if (len < rule.min) {
            validatorErrors.push(rule.message || `Minimum length is ${rule.min}`);
            continue;
          }
        }
        if (rule.max !== undefined) {
          if (typeof fieldValue === 'number' && fieldValue > rule.max) {
            validatorErrors.push(rule.message || `Maximum value is ${rule.max}`);
            continue;
          }
          const len =
            typeof fieldValue === 'string' || Array.isArray(fieldValue)
              ? fieldValue.length
              : String(fieldValue).length;
          if (len > rule.max) {
            validatorErrors.push(rule.message || `Maximum length is ${rule.max}`);
            continue;
          }
        }
        if (rule.type) {
          const validators: Record<string, () => boolean> = {
            email: () =>
              typeof fieldValue === 'string' && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(fieldValue),
            url: () =>
              typeof fieldValue === 'string' &&
              /^(https?:\/\/)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(:[0-9]+)?(\/[a-zA-Z0-9-._~%!$()&'"*+,;=:@/\/?#]*)?$/.test(fieldValue),
            number: () => typeof fieldValue === 'number' && !Number.isNaN(fieldValue),
          };
          const validator = validators[rule.type];
          if (validator && !validator()) {
            validatorErrors.push(rule.message || `Invalid ${rule.type}`);
            continue;
          }
        }
        if (rule.validator) {
          try {
            await new Promise<void>((resolve, reject) => {
              rule.validator(rule, fieldValue, (error) => {
                if (error) reject(error);
                else resolve();
              });
            });
          } catch (error) {
            validatorErrors.push(String(error));
          }
        }
      }

      if (name && formContext) {
        dispatch?.({ type: 'SET_FIELD_VALIDATING', payload: { name, validating: false } });
        dispatch?.({ type: 'SET_FIELD_ERROR', payload: { name, errors: validatorErrors } });
      } else {
        setInternalValidating(false);
        setErrors(validatorErrors);
      }
    },
    [name, formContext, dispatch, rules]
  );

  // Register field
  useEffect(() => {
    if (!name || !formContext) return;
    const entity: FieldEntity = {
      name,
      rules,
      initialValue: initialValueProp ?? getInitialValue?.(name),
      validateTrigger: validateTrigger || ['onChange', 'onBlur'],
      onStoreChange: () => {},
    };
    registerField?.(name, entity);
    fieldRef.current = entity;
    return () => {
      unregisterField?.(name);
    };
  }, [
    name,
    formContext,
    unregisterField,
    initialValueProp,
    validateTrigger,
    rules,
    registerField,
    getInitialValue,
  ]);

  useEffect(() => {
    if (name && formContext) {
      fieldRef.current = { ...fieldRef.current, rules };
      registerField?.(name, fieldRef.current);
    }
  }, [name, rules, formContext, registerField]);

  // Handlers
  const handleChange = useCallback(
    (event: unknown) => {
      const valueFromEvent = customGetValueFromEvent || getValueFromEvent;
      let newValue = valueFromEvent(...(Array.isArray(event) ? event : [event]));
      if (normalize) newValue = normalize(newValue, value, formValues);
      if (name && formContext) form?.setFieldValue(name, newValue);
      else setInternalValue(newValue);

      const triggers = Array.isArray(validateTrigger)
        ? validateTrigger
        : [validateTrigger || 'onChange'];
      if (triggers.includes('change') || triggers.includes('onChange'))
        validateFieldValue(newValue);
    },
    [
      name,
      form,
      formContext,
      value,
      formValues,
      normalize,
      customGetValueFromEvent,
      validateTrigger,
      validateFieldValue,
    ]
  );

  const handleBlur = useCallback(() => {
    if (name && formContext)
      dispatch?.({ type: 'SET_FIELD_TOUCHED', payload: { name, touched: true } });
    else setInternalTouched(true);
    const triggers = Array.isArray(validateTrigger)
      ? validateTrigger
      : [validateTrigger || 'onChange'];
    if (triggers.includes('blur') || triggers.includes('onBlur')) validateFieldValue(value);
  }, [name, formContext, dispatch, value, validateTrigger, validateFieldValue]);

  useEffect(() => {
    if (dependencies.length > 0 && name && formContext) {
      const hasDepChanged = dependencies.some((dep) => formValues?.[dep] !== undefined);
      if (hasDepChanged) validateFieldValue(value);
    }
  }, [dependencies, name, formContext, formValues, value, validateFieldValue]);

  const renderChild = () => {
    if (render) return render({ value, onChange: handleChange, onBlur: handleBlur });
    if (!React.isValidElement(children)) return children;
    const id = name ? getFieldId(name) : undefined;
    const errorId = fieldErrors?.length > 0 ? `${id}-error` : undefined;
    // biome-ignore lint/suspicious/noExplicitAny: dynamic child properties
    const clonedProps = {
      id: (children.props as { id?: string }).id || id,
      [valuePropName]: value,
      [trigger]: handleChange,
      onBlur: handleBlur,
      'aria-describedby': errorId,
      disabled: (children.props as { disabled?: boolean }).disabled || formContext?.disabled,
    };
    const shouldInjectProps =
      valuePropName in children.props ||
      ['input', 'select', 'textarea'].includes(String(children.type).toLowerCase());
    if (shouldInjectProps) return React.cloneElement(children, clonedProps);
    return children;
  };

  const effectiveLabelCol = labelCol ?? formLabelCol;
  const effectiveWrapperCol = wrapperCol ?? formWrapperCol;
  const effectiveColon = colonProp ?? formColon;
  const effectiveLabelAlign = labelAlign ?? formLabelAlign ?? 'right';

  const validationIcon = useMemo(() => {
    if (validateStatus === 'error') return <FaExclamationCircle />;
    if (validateStatus === 'success') return <FaCheckCircle />;
    return null;
  }, [validateStatus]);

  const requiredMark =
    formRequiredMark === true && isRequired ? <RequiredMark> *</RequiredMark> : null;
  const helpContent = helpProp || (fieldErrors?.length > 0 ? fieldErrors[0] : null);

  if (noStyle) return <>{renderChild()}</>;

  return (
    <FormItemWrapper
      className={`${prefixCls} ${className || ''}`}
      style={{ ...style, display: hidden ? 'none' : undefined }}
      $layout={layout}
      $validateStatus={validateStatus}
    >
      <FormItemLabel
        $layout={layout}
        $labelAlign={effectiveLabelAlign}
        $labelCol={effectiveLabelCol}
        htmlFor={name ? getFieldId(name) : undefined}
      >
        {label}
        {requiredMark}
        {effectiveColon && label ? ':' : null}
      </FormItemLabel>
      <FormItemControl $layout={layout} $wrapperCol={effectiveWrapperCol}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {renderChild()}
          {validationIcon && (
            <ValidationIcon $status={validateStatus}>{validationIcon}</ValidationIcon>
          )}
        </div>
        {helpContent && (
          <FormItemHelp
            $status={validateStatus}
            id={name ? `${getFieldId(name)}-error` : undefined}
            role={validateStatus === 'error' ? 'alert' : undefined}
          >
            <FaExclamationCircle style={{ marginRight: 6 }} />
            {helpContent}
          </FormItemHelp>
        )}
        {extra && <FormItemExtra>{extra}</FormItemExtra>}
      </FormItemControl>
    </FormItemWrapper>
  );
};

export const FormItem = InternalFormItem;
FormItem.displayName = 'FormItem';

export const FormItemDeps: React.FC<{
  names: string[];
  children: (values: Record<string, any>) => React.ReactNode;
}> = ({ names, children }) => {
  const form = useContext(FormContext);
  const values = names.reduce(
    (acc, name) => {
      acc[name] = form?.form?.getFieldValue(name);
      return acc;
    },
    {} as Record<string, any>
  );
  return <>{children(values)}</>;
};
