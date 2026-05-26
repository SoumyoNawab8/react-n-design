'use client';
import type React from 'react';
import { useMemo, useState } from 'react';
import { FaArrowDown, FaArrowUp } from '../../icons';
import { Button } from '../Button';
import {
  LoadingOverlay,
  PaginationWrapper,
  SortIcon,
  Spinner,
  StyledTable,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableWrapper,
} from './Table.styles';

interface Column<T> {
  key: string;
  title: React.ReactNode;
  dataIndex: keyof T;
  render?: (value: any, record: T) => React.ReactNode;
  sorter?: (a: T, b: T) => number;
}

export interface TableProps<T> {
  /**
   * Array of column configurations.
   */
  columns: Column<T>[];
  /**
   * The data to be displayed in the table.
   */
  dataSource: T[];
  /**
   * Set to `true` to show a loading spinner over the table.
   */
  loading?: boolean;
  /**
   * Configuration for pagination. Set to `false` to disable.
   */
  pagination?: { pageSize?: number; defaultCurrent?: number } | false;
}

type SortOrder = 'ascend' | 'descend' | null;

/**
 * A powerful component for displaying data in rows and columns
 * with support for sorting and pagination.
 */
export const Table = <T extends object>({
  columns,
  dataSource,
  loading = false,
  pagination = { pageSize: 10, defaultCurrent: 1 },
}: TableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; order: SortOrder }>({
    key: '',
    order: null,
  });
  const [currentPage, setCurrentPage] = useState(pagination ? pagination.defaultCurrent || 1 : 1);

  const handleSort = (key: string, sorter?: (a: T, b: T) => number) => {
    if (!sorter) return;
    const newOrder = sortConfig.key === key && sortConfig.order === 'ascend' ? 'descend' : 'ascend';
    setSortConfig({ key, order: newOrder });
  };

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
      const startIndex = (currentPage - 1) * pagination.pageSize!;
      const endIndex = startIndex + pagination.pageSize!;
      return sortedData.slice(startIndex, endIndex);
    }

    return sortedData;
  }, [dataSource, sortConfig, currentPage, pagination, columns]);

  const totalPages = pagination ? Math.ceil(dataSource.length / pagination.pageSize!) : 1;

  return (
    <TableWrapper aria-busy={loading}>
      {loading && (
        <LoadingOverlay aria-hidden="true">
          <Spinner />
        </LoadingOverlay>
      )}
      <StyledTable>
        <TableHeader>
          <tr>
            {columns.map((col) => {
              const isSorted = sortConfig.key === col.key;
              const ariaSort = col.sorter
                ? isSorted
                  ? sortConfig.order === 'ascend'
                    ? 'ascending'
                    : 'descending'
                  : 'none'
                : undefined;
              return (
                <TableHeaderCell
                  key={col.key}
                  scope="col"
                  aria-sort={ariaSort}
                  isSortable={!!col.sorter}
                  onClick={() => handleSort(col.key, col.sorter)}
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
        <tbody>
          {processedData.map((record, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: Table rows use index when no unique ID exists
            <TableRow key={index}>
              {columns.map((col) => (
                <TableCell key={col.key}>
                  {col.render
                    ? col.render(record[col.dataIndex], record)
                    : (record[col.dataIndex] as React.ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      {pagination && totalPages > 1 && (
        <PaginationWrapper role="navigation" aria-label="Table pagination">
          <Button
            size="small"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Previous
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            size="small"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </Button>
        </PaginationWrapper>
      )}
    </TableWrapper>
  );
};
