'use client';

import type React from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import { FaArrowDown, FaArrowUp, FaInbox } from '../../icons';
import { Button } from '../Button';
import {
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
  LoadingOverlay,
  PaginationInfo,
  PaginationWrapper,
  SkeletonCell,
  SkeletonLine,
  SkeletonRow,
  SortIcon,
  Spinner,
  StyledTable,
  TableCell,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableRowClickable,
  TableWrapper,
} from './Table.styles';

// --- Types ---
interface ColumnHidingConfig {
  sm?: string[];
  md?: string[];
  lg?: string[];
}

/** Column definition for the Table */
export interface Column<T> {
  /** Unique key for the column */
  key: string;
  /** Title to display in the header */
  title: React.ReactNode;
  /** Data property key to access the value */
  dataIndex: keyof T | 'id';
  /** Custom render function for cells */
  render?: (value: any, record: T) => React.ReactNode;
  /** Sorter function for sorting */
  sorter?: (a: T, b: T) => number;
}

/** Props for the Table component */
export interface TableProps<T> {
  /** Array of column configurations */
  columns: Column<T>[];
  /** The data to be displayed in the table */
  dataSource: T[];
  /** Set to `true` to show a loading spinner over the table */
  loading?: boolean;
  /** Show skeleton loading state */
  skeletonLoading?: boolean;
  /** Number of skeleton rows to show */
  skeletonRows?: number;
  /** Configuration for pagination. Set to `false` to disable */
  pagination?: { pageSize?: number; defaultCurrent?: number } | false;
  /** Enable sticky header */
  stickyHeader?: boolean;
  /** Responsive column hiding configuration */
  columnHiding?: ColumnHidingConfig;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Additional CSS class names */
  className?: string;
  /** Custom empty state component (replaces default) */
  emptyState?: React.ReactNode;
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Row click handler */
  onRowClick?: (record: T, index: number) => void;
  /** Unique row identifier property */
  rowKey?: keyof T | 'id';
  /** ID for accessibility */
  id?: string;
  /** ARIA label */
  'aria-label'?: string;
}

type SortOrder = 'ascend' | 'descend' | null;

/**
 * A powerful Table component for displaying data in rows and columns
 * with support for sorting, pagination, sticky headers, skeleton loading,
 * and responsive column hiding.
 * 
 * @version 1.2.0
 */
const TableComponent = <T extends object>({
  columns,
  dataSource,
  loading = false,
  skeletonLoading = false,
  skeletonRows = 5,
  pagination = { pageSize: 10, defaultCurrent: 1 },
  stickyHeader = false,
  columnHiding,
  style,
  className,
  emptyState,
  emptyTitle = 'No Data',
  emptyDescription = 'There are no records to display at this time.',
  onRowClick,
  rowKey = 'id',
  id,
  'aria-label': ariaLabel,
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; order: SortOrder }>({
    key: '',
    order: null,
  });
  const [currentPage, setCurrentPage] = useState(pagination ? pagination.defaultCurrent || 1 : 1);

  // Memoize handleSort function
  const handleSort = useCallback(
    (key: string, sorter?: (a: T, b: T) => number) => {
      if (!sorter) return;
      setSortConfig((prev) => {
        const newOrder = prev.key === key && prev.order === 'ascend' ? 'descend' : 'ascend';
        return { key, order: newOrder };
      });
    },
    []
  );

  // Create a stable columns key for useMemo comparison
  const columnsKey = useMemo(
    () => columns.map((col) => `${col.key}-${!!col.sorter}`).join('|'),
    [columns]
  );

  // Get unique row ID
  const getRowId = useCallback(
    (record: T, index: number) => {
      if (record != null && typeof record === 'object') {
        // Check for common ID patterns
        const recordObj = record as Record<string, unknown>;
        if (rowKey && rowKey !== 'id' && rowKey in recordObj) {
          return String((recordObj[rowKey as string] ?? index));
        }
        if ('id' in recordObj) {
          return String(recordObj.id ?? index);
        }
        if ('key' in recordObj) {
          return String(recordObj.key ?? index);
        }
      }
      return String(index);
    },
    [rowKey]
  );

  // Memoized processed data
  const processedData = useMemo(() => {
    const sortedData = [...dataSource];
    const sorterColumn = columns.find((c) => c.key === sortConfig.key);

    if (sortConfig.order && sorterColumn?.sorter) {
      sortedData.sort((a, b) => {
        const result = sorterColumn.sorter?.(a, b);
        if (result === undefined) return 0;
        return sortConfig.order === 'ascend' ? result : -result;
      });
    }

    if (pagination) {
      const pageSize = pagination.pageSize || 10;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return sortedData.slice(startIndex, endIndex);
    }

    return sortedData;
    // Use columnsKey for stable comparison instead of columns array reference
  }, [dataSource, sortConfig.key, sortConfig.order, sortConfig, currentPage, pagination, columnsKey]);

  // Memoize column render functions
  const columnRenderers = useMemo(
    () =>
      columns.map((col) => ({
        ...col,
        renderCell: (record: T) => {
          const value = col.dataIndex === 'id' ? undefined : record[col.dataIndex as keyof T];
          return col.render ? col.render(value, record) : (value as React.ReactNode);
        },
      })),
    [columns]
  );

  // Check if a column should be hidden
  const isColumnHidden = useCallback(
    (columnKey: string, breakpoint: 'sm' | 'md' | 'lg') => {
      const hidden = columnHiding?.[breakpoint];
      return hidden?.includes(columnKey) ?? false;
    },
    [columnHiding]
  );

  // Memoize handleRowClick
  const handleRowClick = useCallback(
    (record: T, index: number) => {
      if (onRowClick) {
        onRowClick(record, index);
      }
    },
    [onRowClick]
  );

  const totalPages = pagination ? Math.ceil(dataSource.length / pagination.pageSize!) : 1;
  const hasData = dataSource.length > 0;
  const showSkeleton = skeletonLoading && !loading;
  const showEmpty = !loading && !skeletonLoading && !hasData && !emptyState;
  const RowComponent = onRowClick ? TableRowClickable : TableRow;

  return (
    <TableContainer className="nd-table-container">
      <TableWrapper
        id={id}
        className={`nd-table-wrapper ${className || ''}`}
        style={style}
        $stickyHeader={stickyHeader}
        aria-busy={loading || skeletonLoading}
        aria-label={ariaLabel}
      >
        {loading && (
          <LoadingOverlay aria-hidden="true" data-testid="loading-overlay">
            <Spinner />
          </LoadingOverlay>
        )}

        {showEmpty && !emptyState && (
          <EmptyStateContainer data-testid="empty-state">
            <EmptyStateIcon>
              <FaInbox />
            </EmptyStateIcon>
            <EmptyStateTitle>{emptyTitle}</EmptyStateTitle>
            <EmptyStateDescription>{emptyDescription}</EmptyStateDescription>
          </EmptyStateContainer>
        )}

        {!showEmpty && hasData === false && emptyState}

        {(!showEmpty || hasData) && (
          <StyledTable role="table">
            <TableHeader $stickyHeader={stickyHeader}>
              <tr role="row">
                {columns.map((col) => {
                  const isSorted = sortConfig.key === col.key;
                  const ariaSort = col.sorter
                    ? isSorted
                      ? sortConfig.order === 'ascend'
                        ? 'ascending'
                        : 'descending'
                      : 'none'
                    : undefined;
                  const isSortable = !!col.sorter;

                  return (
                    <TableHeaderCell
                      key={col.key}
                      role="columnheader"
                      scope="col"
                      aria-sort={ariaSort}
                      isSortable={isSortable}
                      $hiddenSm={isColumnHidden(col.key, 'sm')}
                      $hiddenMd={isColumnHidden(col.key, 'md')}
                      $hiddenLg={isColumnHidden(col.key, 'lg')}
                      onClick={() => handleSort(col.key, col.sorter)}
                      data-column={col.key}
                    >
                      {col.title}
                      {col.sorter && (
                        <SortIcon isActive={isSorted} isAscending={sortConfig.order === 'ascend'}>
                          <FaArrowUp />
                          <FaArrowDown />
                        </SortIcon>
                      )}
                    </TableHeaderCell>
                  );
                })}
              </tr>
            </TableHeader>
            <tbody role="rowgroup">
              {/* Skeleton loading state */}
              {showSkeleton &&
                Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                  <SkeletonRow key={`skeleton-${rowIndex}`}>
                    {columns.map((col, colIndex) => (
                      <SkeletonCell
                        key={`skeleton-${rowIndex}-${col.key}`}
                        $hiddenSm={isColumnHidden(col.key, 'sm')}
                        $hiddenMd={isColumnHidden(col.key, 'md')}
                        $hiddenLg={isColumnHidden(col.key, 'lg')}
                      >
                        <SkeletonLine
                          $width={`${60 + ((colIndex + rowIndex * 17) % 40)}%`}
                        />
                      </SkeletonCell>
                    ))}
                  </SkeletonRow>
                ))}

              {/* Actual data rows */}
              {!showSkeleton &&
                processedData.map((record, index) => {
                  const rowId = getRowId(record, index);
                  return (
                    <RowComponent
                      key={rowId}
                      role="row"
                      onClick={onRowClick ? () => handleRowClick(record, index) : undefined}
                    >
                      {columnRenderers.map((col) => (
                        <TableCell
                          key={`${rowId}-${col.key}`}
                          role="cell"
                          $hiddenSm={isColumnHidden(col.key, 'sm')}
                          $hiddenMd={isColumnHidden(col.key, 'md')}
                          $hiddenLg={isColumnHidden(col.key, 'lg')}
                          data-column={col.key}
                        >
                          {col.renderCell(record)}
                        </TableCell>
                      ))}
                    </RowComponent>
                  );
                })}
            </tbody>
          </StyledTable>
        )}

        {pagination && totalPages > 1 && (
          <PaginationWrapper role="navigation" aria-label="Table pagination">
            <Button
              size="small"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1 || loading}
              aria-label="Previous page"
            >
              Previous
            </Button>
            <PaginationInfo>
              Page {currentPage} of {totalPages}
            </PaginationInfo>
            <Button
              size="small"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || loading}
              aria-label="Next page"
            >
              Next
            </Button>
          </PaginationWrapper>
        )}
      </TableWrapper>
    </TableContainer>
  );
};

// Export memoized version
export const Table = memo(TableComponent) as typeof TableComponent;

// Type-safe default export
export default Table;
