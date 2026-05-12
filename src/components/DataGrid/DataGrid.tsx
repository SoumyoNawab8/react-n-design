'use client';
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { VariableSizeList as List, ListChildComponentProps } from 'react-window';
import { FaSort, FaSortUp, FaSortDown, FaFilter, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import {
  GridWrapper,
  GridHeaderContainer,
  GridHeaderRow,
  GridHeaderCell,
  ResizeHandle,
  SortIconWrapper,
  FilterButton,
  FilterPopover,
  FilterInput,
  GridBodyWrapper,
  GridRow,
  GridCellsRow,
  GridCell,
  ExpandIconWrapper,
  ExpandableContent,
  EmptyState,
  SkeletonRow,
  SkeletonCell,
  PaginationWrapper,
  PageSizeSelect,
  CheckboxWrapper,
} from './DataGrid.styles';
import { Button } from '../Button';

export interface DataGridColumn<T = any> {
  key: string;
  title: React.ReactNode;
  width?: number;
  sortable?: boolean;
  sorter?: (a: T, b: T) => number;
  filterable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

export interface DataGridPagination {
  pageSize?: number;
  pageSizeOptions?: number[];
  defaultCurrent?: number;
}

export interface DataGridRowSelection {
  selectedRowKeys?: string[];
  onChange?: (selectedRowKeys: string[]) => void;
}

export interface DataGridExpandable<T = any> {
  expandedRowRender?: (record: T) => React.ReactNode;
  defaultExpandedRowKeys?: string[];
  expandedRowKeys?: string[];
  onExpand?: (expanded: boolean, record: T) => void;
  rowExpandable?: (record: T) => boolean;
}

export interface DataGridProps<T = any> {
  columns: DataGridColumn<T>[];
  dataSource: T[];
  rowKey?: string | ((record: T) => string);
  loading?: boolean;
  pagination?: DataGridPagination | false;
  rowSelection?: DataGridRowSelection;
  expandable?: DataGridExpandable<T>;
  height?: number;
  rowHeight?: number;
  expandedRowHeight?: number;
  className?: string;
  style?: React.CSSProperties;
}

const getRowKey = <T,>(record: T, index: number, rowKeyProp?: string | ((record: T) => string)): string => {
  if (typeof rowKeyProp === 'function') return rowKeyProp(record);
  if (typeof rowKeyProp === 'string') return String((record as any)[rowKeyProp]);
  return String(index);
};

interface RowItemData {
  paginatedData: any[];
  displayColumns: DataGridColumn<any>[];
  columnWidths: Record<string, number>;
  rowKeyProp?: string | ((record: any) => string);
  expandedRowKeysSet: Set<string>;
  selectedRowKeysSet: Set<string>;
  expandable?: DataGridExpandable<any>;
  onToggleExpand: (key: string, record: any) => void;
  onToggleSelect: (key: string) => void;
  activeCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  totalWidth: number;
  rowHeight: number;
}

const InnerElementType = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  (props, ref) => <div ref={ref} {...props} role="rowgroup" />
);
InnerElementType.displayName = 'InnerElementType';

const Row: React.FC<ListChildComponentProps<RowItemData>> = ({ index, style, data }) => {
  const {
    paginatedData,
    displayColumns,
    columnWidths,
    rowKeyProp,
    expandedRowKeysSet,
    selectedRowKeysSet,
    expandable,
    onToggleExpand,
    onToggleSelect,
    activeCell,
    onCellClick,
    totalWidth,
    rowHeight,
  } = data;

  const record = paginatedData[index];
  if (!record) return null;
  const key = getRowKey(record, index, rowKeyProp);
  const isExpanded = expandedRowKeysSet.has(key);
  const isSelected = selectedRowKeysSet.has(key);

  return (
    <GridRow
      role="row"
      aria-rowindex={index + 2}
      aria-selected={isSelected}
      isSelected={isSelected}
      isExpanded={isExpanded}
      style={style}
    >
      <GridCellsRow style={{ width: totalWidth, minWidth: totalWidth, height: rowHeight }}>
        {displayColumns.map((col, colIndex) => {
          const isActive = activeCell?.row === index && activeCell?.col === colIndex;
          const cellWidth = columnWidths[col.key] ?? col.width ?? 150;

          if (col.key === '__expand__') {
            const canExpand = !expandable?.rowExpandable || expandable.rowExpandable(record);
            return (
              <GridCell
                key={col.key}
                role="gridcell"
                aria-colindex={colIndex + 1}
                width={cellWidth}
                isActive={isActive}
                tabIndex={isActive ? 0 : -1}
                data-grid-cell={`${index}-${colIndex}`}
                onClick={() => onCellClick(index, colIndex)}
                onFocus={() => onCellClick(index, colIndex)}
              >
                {canExpand && (
                  <ExpandIconWrapper
                    onClick={() => onToggleExpand(key, record)}
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? 'Collapse row' : 'Expand row'}
                  >
                    {isExpanded ? <FaChevronDown size={12} /> : <FaChevronRight size={12} />}
                  </ExpandIconWrapper>
                )}
              </GridCell>
            );
          }

          if (col.key === '__selection__') {
            return (
              <GridCell
                key={col.key}
                role="gridcell"
                aria-colindex={colIndex + 1}
                width={cellWidth}
                isActive={isActive}
                tabIndex={isActive ? 0 : -1}
                data-grid-cell={`${index}-${colIndex}`}
                onClick={() => onCellClick(index, colIndex)}
                onFocus={() => onCellClick(index, colIndex)}
              >
                <CheckboxWrapper>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(key)}
                    aria-label={`Select row ${key}`}
                    onClick={(e) => e.stopPropagation()}
                  />
                </CheckboxWrapper>
              </GridCell>
            );
          }

          const cellContent = col.render
            ? col.render((record as any)[col.key], record)
            : String((record as any)[col.key] ?? '');

          return (
            <GridCell
              key={col.key}
              role="gridcell"
              aria-colindex={colIndex + 1}
              width={cellWidth}
              isActive={isActive}
              tabIndex={isActive ? 0 : -1}
              data-grid-cell={`${index}-${colIndex}`}
              onClick={() => onCellClick(index, colIndex)}
              onFocus={() => onCellClick(index, colIndex)}
            >
              {col.render ? (
                cellContent
              ) : (
                <span style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>
                  {cellContent}
                </span>
              )}
            </GridCell>
          );
        })}
      </GridCellsRow>
      {isExpanded && expandable?.expandedRowRender && (
        <ExpandableContent role="region" aria-label={`Row ${key} details`}>
          {expandable.expandedRowRender(record)}
        </ExpandableContent>
      )}
    </GridRow>
  );
};

export const DataGrid = <T extends object>({
  columns,
  dataSource,
  rowKey,
  loading = false,
  pagination = { pageSize: 10, defaultCurrent: 1, pageSizeOptions: [10, 25, 50, 100] },
  rowSelection,
  expandable,
  height = 400,
  rowHeight = 48,
  expandedRowHeight = 200,
  className,
  style: propStyle,
}: DataGridProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; order: 'asc' | 'desc' | null }>({
    key: '',
    order: null,
  });
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [activeFilterCol, setActiveFilterCol] = useState<string | null>(null);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    columns.forEach((c) => {
      map[c.key] = c.width || 150;
    });
    if (rowSelection) map['__selection__'] = 48;
    if (expandable) map['__expand__'] = 48;
    return map;
  });
  const [currentPage, setCurrentPage] = useState(pagination ? pagination.defaultCurrent || 1 : 1);
  const [pageSize, setPageSize] = useState(pagination ? pagination.pageSize || 10 : 10);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>([]);
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<Set<string>>(
    new Set(expandable?.defaultExpandedRowKeys || [])
  );
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);

  const listRef = useRef<List>(null);
  const listOuterRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [bodyHeight, setBodyHeight] = useState(height);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBodyHeight(entry.contentRect.height);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const outer = listOuterRef.current;
    const header = headerRef.current;
    if (!outer || !header) return;
    const onScroll = () => {
      header.scrollLeft = outer.scrollLeft;
    };
    outer.addEventListener('scroll', onScroll);
    return () => outer.removeEventListener('scroll', onScroll);
  }, []);

  const handleHeaderScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (listOuterRef.current) {
      listOuterRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  }, []);

  const processedData = useMemo(() => {
    let data = [...dataSource];

    Object.entries(filters).forEach(([key, value]) => {
      if (!value) return;
      data = data.filter((row) => {
        const val = (row as any)[key];
        return String(val).toLowerCase().includes(value.toLowerCase());
      });
    });

    if (sortConfig.order && sortConfig.key) {
      const col = columns.find((c) => c.key === sortConfig.key);
      const sorter = col?.sorter;
      if (sorter) {
        data.sort((a, b) => {
          const res = sorter(a, b);
          return sortConfig.order === 'asc' ? res : -res;
        });
      } else if (col?.sortable) {
        data.sort((a, b) => {
          const av = String((a as any)[sortConfig.key]).localeCompare(String((b as any)[sortConfig.key]));
          return sortConfig.order === 'asc' ? av : -av;
        });
      }
    }

    return data;
  }, [dataSource, filters, sortConfig, columns]);

  const paginatedData = useMemo(() => {
    if (!pagination) return processedData;
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage, pageSize, pagination]);

  const totalPages = useMemo(() => {
    if (!pagination) return 1;
    return Math.max(1, Math.ceil(processedData.length / pageSize));
  }, [processedData, pageSize, pagination]);

  const selectedRowKeysSet = useMemo(() => {
    return new Set(rowSelection?.selectedRowKeys ?? internalSelectedKeys);
  }, [rowSelection?.selectedRowKeys, internalSelectedKeys]);

  const allSelected = useMemo(() => {
    if (paginatedData.length === 0) return false;
    return paginatedData.every((r, i) => selectedRowKeysSet.has(getRowKey(r, i, rowKey)));
  }, [paginatedData, selectedRowKeysSet, rowKey]);

  const toggleRowSelection = useCallback(
    (key: string) => {
      const next = new Set(selectedRowKeysSet);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      const arr = Array.from(next);
      if (rowSelection?.onChange) rowSelection.onChange(arr);
      else setInternalSelectedKeys(arr);
    },
    [selectedRowKeysSet, rowSelection]
  );

  const toggleAllSelection = useCallback(() => {
    const allKeys = paginatedData.map((r, i) => getRowKey(r, i, rowKey));
    const allSelectedNow = allKeys.every((k) => selectedRowKeysSet.has(k));
    const next = allSelectedNow ? [] : allKeys;
    if (rowSelection?.onChange) rowSelection.onChange(next);
    else setInternalSelectedKeys(next);
  }, [paginatedData, rowKey, selectedRowKeysSet, rowSelection]);

  const expandedRowKeysSet = useMemo(() => {
    if (expandable?.expandedRowKeys) return new Set(expandable.expandedRowKeys);
    return internalExpandedKeys;
  }, [expandable?.expandedRowKeys, internalExpandedKeys]);

  const toggleExpand = useCallback(
    (key: string, record: T) => {
      const next = new Set(expandedRowKeysSet);
      const isExpanded = next.has(key);
      if (isExpanded) next.delete(key);
      else next.add(key);
      if (expandable?.onExpand) expandable.onExpand(!isExpanded, record);
      if (expandable?.expandedRowKeys === undefined) setInternalExpandedKeys(next);
      listRef.current?.resetAfterIndex(0);
    },
    [expandedRowKeysSet, expandable]
  );

  const displayColumns = useMemo(() => {
    let cols: DataGridColumn<T>[] = [...columns];
    if (expandable) {
      cols = [{ key: '__expand__', title: '', width: 48 }, ...cols];
    }
    if (rowSelection) {
      cols = [{ key: '__selection__', title: '', width: 48 }, ...cols];
    }
    return cols;
  }, [columns, expandable, rowSelection]);

  const totalWidth = useMemo(() => {
    return displayColumns.reduce((sum, col) => sum + (columnWidths[col.key] ?? col.width ?? 150), 0);
  }, [displayColumns, columnWidths]);

  const handleSort = useCallback((col: DataGridColumn<T>) => {
    if (!col.sortable && !col.sorter) return;
    setSortConfig((prev) => {
      if (prev.key === col.key) {
        if (prev.order === 'asc') return { key: col.key, order: 'desc' };
        if (prev.order === 'desc') return { key: '', order: null };
        return { key: col.key, order: 'asc' };
      }
      return { key: col.key, order: 'asc' };
    });
    setActiveFilterCol(null);
  }, []);

  const toggleFilter = useCallback((colKey: string) => {
    setActiveFilterCol((prev) => (prev === colKey ? null : colKey));
  }, []);

  const handleResizeStart = useCallback(
    (colKey: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const startX = e.clientX;
      const startWidth = columnWidths[colKey] ?? 150;
      const onMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX;
        setColumnWidths((prev) => ({ ...prev, [colKey]: Math.max(50, startWidth + delta) }));
      };
      const onUp = () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
    },
    [columnWidths]
  );

  const getAriaSort = (colKey: string): 'ascending' | 'descending' | 'none' | undefined => {
    const col = columns.find((c) => c.key === colKey);
    if (!col?.sortable && !col?.sorter) return undefined;
    if (sortConfig.key !== colKey) return 'none';
    return sortConfig.order === 'asc' ? 'ascending' : 'descending';
  };

  const totalCols = displayColumns.length;

  const handleGridKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!activeCell) {
        if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End', 'Enter'].includes(e.key)) {
          e.preventDefault();
          setActiveCell({ row: 0, col: 0 });
          listRef.current?.scrollToItem(0, 'start');
          return;
        }
      }

      const { row, col } = activeCell!;
      let newRow = row;
      let newCol = col;

      switch (e.key) {
        case 'ArrowDown':
          newRow = Math.min(paginatedData.length - 1, row + 1);
          break;
        case 'ArrowUp':
          newRow = Math.max(0, row - 1);
          break;
        case 'ArrowRight':
          newCol = Math.min(totalCols - 1, col + 1);
          break;
        case 'ArrowLeft':
          newCol = Math.max(0, col - 1);
          break;
        case 'Home':
          newCol = 0;
          break;
        case 'End':
          newCol = totalCols - 1;
          break;
        case 'Enter': {
          const record = paginatedData[row];
          if (!record) return;
          const key = getRowKey(record, row, rowKey);
          const colDef = displayColumns[col];
          if (colDef.key === '__expand__') {
            toggleExpand(key, record);
          } else if (colDef.key === '__selection__') {
            toggleRowSelection(key);
          }
          return;
        }
        default:
          return;
      }

      e.preventDefault();
      setActiveCell({ row: newRow, col: newCol });
      listRef.current?.scrollToItem(newRow, 'smart');
    },
    [activeCell, paginatedData, totalCols, displayColumns, rowKey, toggleExpand, toggleRowSelection]
  );

  useEffect(() => {
    if (!activeCell) return;
    let rafId: number;
    const list = listRef.current;
    if (list) list.scrollToItem(activeCell.row, 'auto');
    rafId = requestAnimationFrame(() => {
      const el = document.querySelector(`[data-grid-cell="${activeCell.row}-${activeCell.col}"]`) as HTMLElement | null;
      el?.focus();
    });
    return () => cancelAnimationFrame(rafId);
  }, [activeCell]);

  const getItemSize = useCallback(
    (index: number) => {
      const record = paginatedData[index];
      const key = getRowKey(record, index, rowKey);
      return expandedRowKeysSet.has(key) ? rowHeight + expandedRowHeight : rowHeight;
    },
    [paginatedData, rowKey, expandedRowKeysSet, rowHeight, expandedRowHeight]
  );

  const itemData = useMemo(() => {
    return {
      paginatedData,
      displayColumns,
      columnWidths,
      rowKeyProp: rowKey,
      expandedRowKeysSet,
      selectedRowKeysSet,
      expandable,
      onToggleExpand: toggleExpand,
      onToggleSelect: toggleRowSelection,
      activeCell,
      onCellClick: (r: number, c: number) => setActiveCell({ row: r, col: c }),
      totalWidth,
      rowHeight,
    };
  }, [
    paginatedData,
    displayColumns,
    columnWidths,
    rowKey,
    expandedRowKeysSet,
    selectedRowKeysSet,
    expandable,
    toggleExpand,
    toggleRowSelection,
    activeCell,
    totalWidth,
    rowHeight,
  ]);

  return (
    <GridWrapper
      className={className}
      style={{ height, ...propStyle }}
      role="grid"
      aria-rowcount={paginatedData.length + 1}
      aria-colcount={displayColumns.length}
      tabIndex={0}
      onKeyDown={handleGridKeyDown}
    >
      <GridHeaderContainer ref={headerRef} onScroll={handleHeaderScroll}>
        <GridHeaderRow role="row" aria-rowindex={1} style={{ width: totalWidth, minWidth: totalWidth }}>
          {displayColumns.map((col, colIndex) => {
            const cellWidth = columnWidths[col.key] ?? col.width ?? 150;

            if (col.key === '__selection__') {
              return (
                <GridHeaderCell
                  key={col.key}
                  role="columnheader"
                  aria-colindex={colIndex + 1}
                  width={cellWidth}
                >
                  <CheckboxWrapper>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAllSelection}
                      aria-label="Select all rows"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </CheckboxWrapper>
                  <ResizeHandle onMouseDown={(e) => handleResizeStart(col.key, e)} />
                </GridHeaderCell>
              );
            }

            if (col.key === '__expand__') {
              return (
                <GridHeaderCell
                  key={col.key}
                  role="columnheader"
                  aria-colindex={colIndex + 1}
                  width={cellWidth}
                >
                  <ResizeHandle onMouseDown={(e) => handleResizeStart(col.key, e)} />
                </GridHeaderCell>
              );
            }

            const ariaSort = getAriaSort(col.key);
            return (
              <GridHeaderCell
                key={col.key}
                role="columnheader"
                aria-colindex={colIndex + 1}
                aria-sort={ariaSort}
                isSortable={!!(col.sortable || col.sorter)}
                isSorted={sortConfig.key === col.key}
                width={cellWidth}
                onClick={() => handleSort(col)}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {col.title}
                  {(col.sortable || col.sorter) && (
                    <SortIconWrapper>
                      {sortConfig.key === col.key && sortConfig.order === 'asc' ? (
                        <FaSortUp size={14} />
                      ) : sortConfig.key === col.key && sortConfig.order === 'desc' ? (
                        <FaSortDown size={14} />
                      ) : (
                        <FaSort size={14} />
                      )}
                    </SortIconWrapper>
                  )}
                  {col.filterable && (
                    <FilterButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFilter(col.key);
                      }}
                      aria-label={`Filter ${col.title}`}
                      aria-pressed={activeFilterCol === col.key}
                    >
                      <FaFilter size={12} />
                    </FilterButton>
                  )}
                </span>
                {activeFilterCol === col.key && (
                  <FilterPopover>
                    <FilterInput
                      autoFocus
                      value={filters[col.key] || ''}
                      onChange={(e) => setFilters((prev) => ({ ...prev, [col.key]: e.target.value }))}
                      placeholder={`Filter ${col.title}`}
                      onKeyDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </FilterPopover>
                )}
                <ResizeHandle onMouseDown={(e) => handleResizeStart(col.key, e)} />
              </GridHeaderCell>
            );
          })}
        </GridHeaderRow>
      </GridHeaderContainer>

      <GridBodyWrapper ref={bodyRef}>
        {loading ? (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} role="row">
                {displayColumns.map((_, j) => (
                  <SkeletonCell key={j} role="gridcell" />
                ))}
              </SkeletonRow>
            ))}
          </>
        ) : paginatedData.length === 0 ? (
          <EmptyState role="status" aria-live="polite">
            No data
          </EmptyState>
        ) : (
          bodyHeight > 0 && (
            <List
              height={bodyHeight}
              width={totalWidth}
              itemCount={paginatedData.length}
              itemSize={getItemSize}
              itemData={itemData}
              outerRef={listOuterRef}
              innerElementType={InnerElementType}
              ref={listRef}
            >
              {Row}
            </List>
          )
        )}
      </GridBodyWrapper>

      {pagination && (
        <PaginationWrapper role="navigation" aria-label="DataGrid pagination">
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
          <PageSizeSelect
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            aria-label="Page size"
          >
            {(pagination.pageSizeOptions || [10, 25, 50, 100]).map((s) => (
              <option key={s} value={s}>
                {s} / page
              </option>
            ))}
          </PageSizeSelect>
        </PaginationWrapper>
      )}
    </GridWrapper>
  );
};
