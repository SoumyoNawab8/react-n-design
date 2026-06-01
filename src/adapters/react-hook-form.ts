import React from 'react';

/**
 * Lightweight adapter to connect react-n-design form components to React Hook Form.
 *
 * Usage with Controller:
 * ```tsx
 * import { useForm, Controller } from 'react-hook-form';
 * import { Input } from 'react-n-design';
 * import { withReactHookForm } from 'react-n-design/adapters/react-hook-form';
 *
 * const RHFInput = withReactHookForm(Input);
 *
 * function MyForm() {
 *   const { control } = useForm();
 *   return (
 *     <Controller
 *       name="username"
 *       control={control}
 *       render={({ field, fieldState }) => (
 *         <RHFInput {...field} fieldState={fieldState} label="Username" />
 *       )}
 *     />
 *   );
 * }
 * ```
 *
 * The wrapper maps `fieldState.error` to the component's `error` prop,
 * so validation messages are displayed automatically.
 */
export function withReactHookForm(Component: React.ComponentType<any>) {
  return React.forwardRef<any, any>(function RHFAdapter(props, ref) {
    const { fieldState, ...componentProps } = props;

    // Map RHF fieldState.error to react-n-design error prop
    if (fieldState?.error) {
      const errorMessage =
        typeof fieldState.error === 'string'
          ? fieldState.error
          : fieldState.error.message || 'Invalid value';
      componentProps.error = errorMessage;
    }

    return React.createElement(Component, { ref, ...componentProps });
  });
}
