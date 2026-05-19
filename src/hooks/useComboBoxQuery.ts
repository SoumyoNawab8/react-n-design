import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from './useDebounce';

export interface ComboBoxQueryOptionType {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface UseComboBoxQueryReturn<T> {
  options: ComboBoxQueryOptionType[];
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  query: string;
  setQuery: (q: string) => void;
  /** Direct ComboBox-compatible props */
  comboBoxOptions: ComboBoxQueryOptionType[];
  comboBoxLoading: boolean;
  comboBoxOnSearch: (query: string) => void;
}

function defaultToOptions<T>(items: T[]): ComboBoxQueryOptionType[] {
  return items.map((item, index) => {
    if (typeof item === 'string') {
      return { value: item, label: item };
    }
    if (item && typeof item === 'object') {
      const obj = item as any;
      return {
        value: String(obj.value ?? obj.id ?? obj.key ?? index),
        label: String(obj.label ?? obj.name ?? obj.title ?? obj.value ?? obj.id ?? obj.key ?? index),
        disabled: obj.disabled,
      };
    }
    return { value: String(index), label: String(item) };
  });
}

export function useComboBoxQuery<T>(
  queryKey: string[],
  searchFn: (query: string) => Promise<T[]>,
  debounceMs: number = 300
): UseComboBoxQueryReturn<T> {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, debounceMs);

  const result = useQuery({
    queryKey: [...queryKey, debouncedQuery],
    queryFn: () => searchFn(debouncedQuery),
    enabled: debouncedQuery.trim().length > 0,
    staleTime: 60 * 1000,
  });

  const options = result.data ? defaultToOptions(result.data) : [];

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
  }, []);

  return {
    options,
    isLoading: result.isLoading,
    isFetching: result.isFetching,
    error: result.error,
    query,
    setQuery,
    comboBoxOptions: options,
    comboBoxLoading: result.isLoading || result.isFetching,
    comboBoxOnSearch: handleSearch,
  };
}
