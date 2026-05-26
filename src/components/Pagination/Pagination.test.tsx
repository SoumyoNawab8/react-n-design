import { fireEvent, render, screen } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeContextProvider } from '../../context/ThemeContext';
import { Pagination } from './Pagination';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeContextProvider defaultTheme="light">{component}</ThemeContextProvider>);
};

describe('Pagination', () => {
  it('renders pagination with page numbers', () => {
    renderWithTheme(<Pagination currentPage={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByLabelText('Page 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 5')).toBeInTheDocument();
  });

  it('calls onChange when page is clicked', () => {
    const onChange = vi.fn();
    renderWithTheme(<Pagination currentPage={1} totalPages={5} onChange={onChange} />);

    fireEvent.click(screen.getByLabelText('Page 3'));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not call onChange when clicking current page', () => {
    const onChange = vi.fn();
    renderWithTheme(<Pagination currentPage={2} totalPages={5} onChange={onChange} />);

    fireEvent.click(screen.getByLabelText('Page 2'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows ellipsis when there are many pages', () => {
    renderWithTheme(<Pagination currentPage={5} totalPages={10} onChange={vi.fn()} />);

    // Check for ellipsis indicators (we render text "⋯")
    const container = screen.getByRole('navigation');
    expect(container.textContent).toContain('⋯');
  });

  it('has previous and next buttons', () => {
    renderWithTheme(<Pagination currentPage={3} totalPages={5} onChange={vi.fn()} />);

    expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    renderWithTheme(<Pagination currentPage={1} totalPages={5} onChange={vi.fn()} />);

    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    renderWithTheme(<Pagination currentPage={5} totalPages={5} onChange={vi.fn()} />);

    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('sets aria-current on active page', () => {
    renderWithTheme(<Pagination currentPage={2} totalPages={5} onChange={vi.fn()} />);

    expect(screen.getByLabelText('Page 2')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByLabelText('Page 3')).not.toHaveAttribute('aria-current');
  });

  it('respects siblingCount for showing sibling pages', () => {
    renderWithTheme(
      <Pagination currentPage={5} totalPages={10} onChange={vi.fn()} siblingCount={2} />
    );

    // Should show pages around current page with siblingCount of 2
    expect(screen.getByLabelText('Page 3')).toBeInTheDocument();
    expect(screen.getByLabelText('Page 7')).toBeInTheDocument();
  });

  it('does not show prev/next buttons when showPrevNext is false', () => {
    renderWithTheme(
      <Pagination currentPage={3} totalPages={5} onChange={vi.fn()} showPrevNext={false} />
    );

    expect(screen.queryByLabelText('Previous page')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Next page')).not.toBeInTheDocument();
  });

  it('disables all buttons when disabled prop is true', () => {
    renderWithTheme(<Pagination currentPage={3} totalPages={5} onChange={vi.fn()} disabled />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('has proper accessibility - navigation role', () => {
    renderWithTheme(<Pagination currentPage={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('has accessible aria-label', () => {
    renderWithTheme(<Pagination currentPage={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByLabelText('Pagination')).toBeInTheDocument();
  });
});
