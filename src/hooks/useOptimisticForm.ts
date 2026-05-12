import { useState, useCallback, useEffect } from 'react';
import { useForm, UseFormOptions, UseFormReturn } from './useForm';

/* ------------------------------------------------------------------ */
//  React 19 useOptimistic polyfill (shim)
/* ------------------------------------------------------------------ */

function useOptimistic<T>(
  state: T,
  updateFn?: (currentState: T, optimisticValue: Partial<T>) => T
): [T, (optimisticValue: Partial<T>) => void] {
  const [optimisticState, setOptimisticState] = useState<T>(state);

  useEffect(() => {
    setOptimisticState(state);
  }, [state]);

  const addOptimistic = useCallback(
    (value: Partial<T>) => {
      setOptimisticState((prev) => {
        if (updateFn) {
          return updateFn(prev, value);
        }
        return { ...prev, ...value } as T;
      });
    },
    [updateFn]
  );

  return [optimisticState, addOptimistic];
}

/* ------------------------------------------------------------------ */
//  useOptimisticForm
/* ------------------------------------------------------------------ */

export interface UseOptimisticFormReturn<T> extends UseFormReturn<T> {
  optimisticValues: T;
  setOptimisticValue: (field: keyof T, value: any) => void;
}

export function useOptimisticForm<T extends Record<string, any>>(
  options: UseFormOptions<T>
): UseOptimisticFormReturn<T> {
  const form = useForm<T>(options);

  const [optimisticValues, addOptimistic] = useOptimistic<T>(
    form.values,
    (currentState, optimisticValue) => ({ ...currentState, ...optimisticValue })
  );

  const setOptimisticValue = useCallback(
    (field: keyof T, value: any) => {
      addOptimistic({ [field]: value } as Partial<T>);
    },
    [addOptimistic]
  );

  return {
    ...form,
    optimisticValues,
    setOptimisticValue,
  };
}
