'use client';
import type React from 'react';
import { useState } from 'react';
import {
  PaginationContainer,
  PaginationItem,
  PaginationEllipsis,
  PaginationButton,
} from './Pagination.styles';
import { FaChevronLeft, FaChevronRight } from '../../icons';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Current active page number (1-based).
   */
  currentPage: number;
  /**
   * Total number of pages.
   */
  totalPages: number;
  /**
   * Callback fired when a page is selected.
   */
  onChange: (page: number) => void;
  /**
   * Number of sibling pages to show on each side of current page.
   * @default 1
   */
  siblingCount?: number;
  /**
   * Whether to show previous/next buttons.
   * @default true
   */
  showPrevNext?: boolean;
  /**
   * Whether the pagination is disabled.
   * @default false
   */
  disabled?: boolean;
}

/**
 * A pagination component with page numbers, prev/next buttons, and ellipsis support.
 * Renders responsive page navigation with neomorphic styling.
 */
export const Pagination = ({
  currentPage,
  totalPages,
  onChange,
  siblingCount = 1,
  showPrevNext = true,
  disabled = false,
  ...props
}: PaginationProps) => {
  const handlePageChange = (page: number) => {
    if (disabled || page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    onChange(page);
  };

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 5;
    
    if (totalNumbers >= totalPages) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + siblingCount * 2;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, -1, totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + siblingCount * 2;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, -1, ...rightRange];
    }

    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [1, -1, ...middleRange, -1, totalPages];
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer role="navigation" aria-label="Pagination" {...props}>
      {showPrevNext && (
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={disabled || currentPage === 1}
          aria-label="Previous page"
        >
          <FaChevronLeft />
        </PaginationButton>
      )}

      {pageNumbers.map((pageNumber, index) => {
        if (pageNumber === -1) {
          return (
            <PaginationEllipsis
              key={`ellipsis-${index}`}
              aria-hidden="true"
            >
              ⋯
            </PaginationEllipsis>
          );
        }

        const isActive = pageNumber === currentPage;

        return (
          <PaginationItem
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            $isActive={isActive}
            disabled={disabled}
            aria-label={`Page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </PaginationItem>
        );
      })}

      {showPrevNext && (
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={disabled || currentPage === totalPages}
          aria-label="Next page"
        >
          <FaChevronRight />
        </PaginationButton>
      )}
    </PaginationContainer>
  );
};