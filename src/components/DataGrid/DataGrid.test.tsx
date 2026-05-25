import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { DataGrid } from './DataGrid';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

type TestRecord = {
  id: string;
  name: string;
  age: number;
  role: string;
};

const mockData: TestRecord[] = [
  { id: '1', name: 'Alice', age: 30, role: 'Engineer' },
  { id: '2', name: 'Bob', age: 25, role: 'Designer' },
  { id: '3', name: 'Charlie', age: 35, role: 'Manager' },
  { id: '4', name: 'Diana', age: 28, role: 'Engineer' },
  { id: '5', name: 'Eve', age: 32, role: 'Designer' },
  { id: '6', name: 'Frank', age: 40, role: 'Manager' },
];

const columns = [
  { key: 'name', title: 'Name', sortable: true },
  {
    key: 'age',
    title: 'Age',
    sortable: true,
    sorter: (a: TestRecord, b: TestRecord) => a.age - b.age,
  },
  { key: 'role', title: 'Role' },
];

// Mock ResizeObserver so bodyHeight stays positive in jsdom
const mockResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

beforeAll(() => {
  global.ResizeObserver = mockResizeObserver;
});

afterAll(() => {
  vi.restoreAllMocks();
});

describe('DataGrid', () => {
  it('renders column headers', () => {
    renderWithTheme(<DataGrid columns={columns} dataSource={mockData} rowKey="id" />);

    expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /age/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /role/i })).toBeInTheDocument();
  });

  it('renders data rows', () => {
    renderWithTheme(<DataGrid columns={columns} dataSource={mockData} rowKey="id" />);

    // In jsdom react-window still renders visible rows; use findAllByRole and assert count
    const rows = screen.getAllByRole('row');
    // Header row (aria-rowindex=1) + data rows
    expect(rows.length).toBeGreaterThan(1);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('sorts ascending on first header click, descending on second click', async () => {
    renderWithTheme(<DataGrid columns={columns} dataSource={mockData} rowKey="id" />);

    const nameHeader = screen.getByRole('columnheader', { name: /name/i });

    // First click -> asc
    await userEvent.click(nameHeader);
    expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');

    // Second click -> desc
    await userEvent.click(nameHeader);
    expect(nameHeader).toHaveAttribute('aria-sort', 'descending');

    // Third click -> none (cleared)
    await userEvent.click(nameHeader);
    expect(nameHeader).toHaveAttribute('aria-sort', 'none');
  });

  it('shows correct number of rows per page and paginates', async () => {
    renderWithTheme(
      <DataGrid
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        pagination={{ pageSize: 2, pageSizeOptions: [2, 4, 6] }}
      />
    );

    // Should show "Page 1 of 3"
    expect(screen.getByText(/page 1 of 3/i)).toBeInTheDocument();

    const nextBtn = screen.getByRole('button', { name: /next page/i });

    expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();
    expect(nextBtn).toBeEnabled();

    await userEvent.click(nextBtn);
    expect(screen.getByText(/page 2 of 3/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous page/i })).toBeEnabled();

    // Re-query next button before second click to avoid stale element
    const nextBtn2 = screen.getByRole('button', { name: /next page/i });
    await userEvent.click(nextBtn2);
    expect(screen.getByText(/page 3 of 3/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
  });

  it('allows row checkbox selection', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <DataGrid
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        rowSelection={{ onChange }}
        pagination={{ pageSize: 10 }}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    // First checkbox is "select all", the rest are per-row
    expect(checkboxes.length).toBeGreaterThan(1);

    const firstRowCheckbox = checkboxes[1];
    expect(firstRowCheckbox).not.toBeChecked();

    await userEvent.click(firstRowCheckbox);
    expect(firstRowCheckbox).toBeChecked();
    expect(onChange).toHaveBeenCalledWith(expect.arrayContaining(['1']));
  });

  it('shows empty state when no data', () => {
    renderWithTheme(<DataGrid columns={columns} dataSource={[]} rowKey="id" />);

    expect(screen.getByRole('status')).toHaveTextContent(/no data/i);
  });

  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(
      <DataGrid columns={columns} dataSource={mockData} rowKey="id" />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
