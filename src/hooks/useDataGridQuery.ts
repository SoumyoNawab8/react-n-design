import {
  type UseInfiniteQueryOptions,
  type UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

export interface PaginationParams {
  page: number;
  pageSize: number;
  sortKey?: string;
  sortOrder?: 'asc' | 'desc' | null;
  filters?: Record<string, string>;
}

export interface UseDataGridQueryReturn<T> {
  data: T[];
  total: number;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
  };
  sortConfig: {
    key: string;
    order: 'asc' | 'desc' | null;
  };
  filters: Record<string, string>;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSort: (key: string, order: 'asc' | 'desc' | null) => void;
  setFilter: (key: string, value: string) => void;
  clearFilters: () => void;
  /** DataGrid-compatible props */
  dataSource: T[];
  loading: boolean;
  /** Infinite query helpers */
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

export interface UseDataGridQueryOptions {
  infinite?: boolean;
  initialPageSize?: number;
}

export function useDataGridQuery<T>(
  queryKey: string[],
  fetchFn: (params: PaginationParams) => Promise<{ data: T[]; total: number }>,
  options?: UseDataGridQueryOptions &
    Omit<UseQueryOptions<{ data: T[]; total: number }, Error>, 'queryKey' | 'queryFn'> &
    Omit<UseInfiniteQueryOptions<{ data: T[]; total: number }, Error>, 'queryKey' | 'queryFn'>
) {
  const { infinite = false, initialPageSize = 10, ...tanstackOptions } = options ?? {};

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortConfig, setSortConfig] = useState<{ key: string; order: 'asc' | 'desc' | null }>({
    key: '',
    order: null,
  });
  const [filters, setFilters] = useState<Record<string, string>>({});

  const params: PaginationParams = useMemo(
    () => ({
      page,
      pageSize,
      sortKey: sortConfig.key || undefined,
      sortOrder: sortConfig.order || undefined,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
    }),
    [page, pageSize, sortConfig, filters]
  );

  const queryResult = useQuery({
    queryKey: [...queryKey, params],
    queryFn: () => fetchFn(params),
    ...(tanstackOptions as Omit<
      UseQueryOptions<{ data: T[]; total: number }, Error>,
      'queryKey' | 'queryFn'
    >),
  });

  const infiniteQueryResult = useInfiniteQuery({
    queryKey: [...queryKey, params, 'infinite'],
    queryFn: ({ pageParam = 1 }) => fetchFn({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.max(1, Math.ceil(lastPage.total / pageSize));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    ...(tanstackOptions as Omit<
      UseInfiniteQueryOptions<{ data: T[]; total: number }, Error>,
      'queryKey' | 'queryFn'
    >),
  });

  const result = infinite ? infiniteQueryResult : queryResult;

  const data = useMemo(() => {
    if (infinite && 'pages' in result) {
      return result.pages.flatMap((page) => page.data);
    }
    if ('data' in result && result.data) {
      return result.data.data;
    }
    return [];
  }, [result, infinite]);

  const total = useMemo(() => {
    if (infinite && 'pages' in result && result.pages.length > 0) {
      return result.pages[0].total;
    }
    if ('data' in result && result.data) {
      return result.data.total;
    }
    return 0;
  }, [result, infinite]);

  const isLoading = 'isLoading' in result ? result.isLoading : false;
  const isFetching = 'isFetching' in result ? result.isFetching : false;
  const error = 'error' in result ? result.error : null;

  const setSort = useCallback((key: string, order: 'asc' | 'desc' | null) => {
    setSortConfig({ key, order });
    setPage(1);
  }, []);

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setPage(1);
  }, []);

  const handleSetPageSize = useCallback((size: number) => {
    setPageSize(size);
    setPage(1);
  }, []);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(total / pageSize));
  }, [total, pageSize]);

  return {
    data,
    total,
    isLoading,
    isFetching,
    error,
    pagination: {
      page,
      pageSize,
      totalPages,
    },
    sortConfig,
    filters,
    setPage,
    setPageSize: handleSetPageSize,
    setSort,
    setFilter,
    clearFilters,
    dataSource: data,
    loading: isLoading || isFetching,
    fetchNextPage: infinite ? (infiniteQueryResult.fetchNextPage as () => void) : () => {},
    hasNextPage: infinite ? (infiniteQueryResult.hasNextPage ?? false) : false,
    isFetchingNextPage: infinite ? (infiniteQueryResult.isFetchingNextPage ?? false) : false,
  } as UseDataGridQueryReturn<T>;
}
