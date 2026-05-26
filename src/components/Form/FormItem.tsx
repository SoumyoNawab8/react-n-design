'use client';
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

// Debounce hook for validation
function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args as unknown[]);
      }, delay);
    },
    [callback, delay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback as T;
}

// Custom hook for mobile detection
function useMobileDetect(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

// Memoized validation result computation
function useValidationResult(
  validateStatusProp: FormItemProps['validateStatus'],
  validating: boolean,
  touched: boolean,
  fieldErrors: string[]
) {
  return useMemo(() => {
    if (validateStatusProp) return validateStatusProp;
    if (validating) return 'validating';
    if (fieldErrors?.length > 0) return 'error';
    if (touched && !fieldErrors?.length) return 'success';
    return '';
  }, [validateStatusProp, validating, touched, fieldErrors]);
}

// Memoized required check
function useIsRequired(
  requiredProp: boolean | undefined,
  rules: FormItemProps['rules']
) {
  return useMemo(() => {
    if (requiredProp !== undefined) return requiredProp;
    return rules?.some((r) => r.required) || false;
  }, [requiredProp, rules]);
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
  validateTrigger = ['onChange', 'onBlur'],
  noStyle,
  render,
  // v1.2.0 new props
  showValidationIcon = true,
  debounceMs = 300,
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
    compact: formCompact,
  } = formContext || {};

  const fieldRef = useRef<FieldEntity>({ name: name || '' });
  const valueRef = useRef(initialValueProp ?? (name ? getInitialValue?.(name) : undefined));

  const [internalValue, setInternalValue] = useState(valueRef.current);
  const [internalTouched, setInternalTouched] = useState(false);
  const [internalValidating, setInternalValidating] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [shakeKey, setShakeKey] = useState(0);

  // Mobile detection
  const isMobile = useMobileDetect();
  const compact = layout === 'compact' || formCompact;

  const value = name ? (formValues?.[name] ?? internalValue) : internalValue;
  const touched = name ? (formTouched?.[name] ?? internalTouched) : internalTouched;
  const validating = name ? (formValidating?.[name] ?? internalValidating) : internalValidating;
  const fieldErrors = name ? (formErrors?.[name] ?? []) : errors;

  // Memoized validation status
  const validateStatus = useValidationResult(
    validateStatusProp,
    validating,
    touched,
    fieldErrors
  );

  // Memoized isRequired
  const isRequired = useIsRequired(requiredProp, rules);

  // Memoized validation rules
  const memoizedRules = useMemo(() => rules, [rules]);

  // Trigger shake animation on error
  useEffect(() => {
    if (validateStatus === 'error' && touched) {
      setShakeKey((prev) => prev + 1);
    }
  }, [validateStatus, touched]);

  // Validate function - memoized
  const validateFieldValueImpl = useCallback(
    async (fieldValue: unknown) => {
      if (memoizedRules.length === 0) return;
      
      if (name && formContext)
        dispatch?.({ type: 'SET_FIELD_VALIDATING', payload: { name, validating: true } });
      else setInternalValidating(true);

      const validatorErrors: string[] = [];
      for (const rule of memoizedRules) {
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
              typeof fieldValue === 'string' &&
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                fieldValue
              ),
            url: () =>
              typeof fieldValue === 'string' &&
              /^(https?:\/\/)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(:[0-9]+)?(\/[a-zA-Z0-9-._~%!$()&'"*+,;=:@//?#]*)?$/.test(
                fieldValue
              ),
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
    [name, formContext, dispatch, memoizedRules]
  );

  // Debounced validation
  const debouncedValidateField = useDebouncedCallback(
    validateFieldValueImpl,
    debounceMs
  );

  // Register field
  useEffect(() => {
    if (!name || !formContext) return;
    const entity: FieldEntity = {
      name,
      rules: memoizedRules,
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
    memoizedRules,
    registerField,
    getInitialValue,
  ]);

  useEffect(() => {
    if (name && formContext) {
      fieldRef.current = { ...fieldRef.current, rules: memoizedRules };
      registerField?.(name, fieldRef.current);
    }
  }, [name, memoizedRules, formContext, registerField]);

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
      if (triggers.includes('change') || triggers.includes('onChange')) {
        // Use debounced validation on input
        debouncedValidateField(newValue);
      }
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
      debouncedValidateField,
    ]
  );

  const handleBlur = useCallback(() => {
    if (name && formContext)
      dispatch?.({ type: 'SET_FIELD_TOUCHED', payload: { name, touched: true } });
    else setInternalTouched(true);
    const triggers = Array.isArray(validateTrigger)
      ? validateTrigger
      : [validateTrigger || 'onChange'];
    if (triggers.includes('blur') || triggers.includes('onBlur')) {
      // Immediate validation on blur
      validateFieldValueImpl(value);
    }
  }, [name, formContext, dispatch, value, validateTrigger, validateFieldValueImpl]);

  useEffect(() => {
    if (dependencies.length > 0 && name && formContext) {
      const hasDepChanged = dependencies.some((dep) => formValues?.[dep] !== undefined);
      if (hasDepChanged) debouncedValidateField(value);
    }
  }, [dependencies, name, formContext, formValues, value, debouncedValidateField]);

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
    if (!showValidationIcon) return null;
    if (validateStatus === 'error') return <FaExclamationCircle />;
    if (validateStatus === 'success') return <FaCheckCircle />;
    return null;
  }, [validateStatus, showValidationIcon]);

  const requiredMark =
    formRequiredMark === true && isRequired ? <RequiredMark> *</RequiredMark> : null;
  const helpContent = helpProp || (fieldErrors?.length > 0 ? fieldErrors[0] : null);

  if (noStyle) return <>{renderChild()}</>;

  return (
    <FormItemWrapper
      key={`form-item-${name}-${shakeKey}`}
      className={`${prefixCls} ${className || ''}`}
      style={{ ...style, display: hidden ? 'none' : undefined }}
      $layout={layout}
      $validateStatus={validateStatus}
      $shake={shakeKey > 0}
      $isMobile={isMobile}
    >
      <FormItemLabel
        $layout={layout}
        $labelAlign={effectiveLabelAlign}
        $labelCol={effectiveLabelCol}
        $isMobile={isMobile}
        $compact={compact}
        htmlFor={name ? getFieldId(name) : undefined}
      >
        {label}
        {requiredMark}
        {effectiveColon && label ? ':' : null}
      </FormItemLabel>
      <FormItemControl
        $layout={layout}
        $wrapperCol={effectiveWrapperCol}
        $isMobile={isMobile}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {renderChild()}
          {validationIcon && (
            <ValidationIcon
              $status={validateStatus}
              $shake={shakeKey > 0}
              $compact={compact}
            >
              {validationIcon}
            </ValidationIcon>
          )}
        </div>
        {helpContent && (
          <FormItemHelp
            $status={validateStatus}
            $isMobile={isMobile}
            id={name ? `${getFieldId(name)}-error` : undefined}
            role={validateStatus === 'error' ? 'alert' : undefined}
          >
            <FaExclamationCircle style={{ marginRight: 6, marginTop: 2, flexShrink: 0 }} />
            {helpContent}
          </FormItemHelp>
        )}
        {extra && <FormItemExtra $isMobile={isMobile}>{extra}</FormItemExtra>}
      </FormItemControl>
    </FormItemWrapper>
  );
};

export const FormItem = memo(InternalFormItem);
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
