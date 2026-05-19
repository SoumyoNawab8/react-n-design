import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Table } from './Table';
import axe from 'axe-core';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

interface DataType {
  name: string;
  age: number;
}

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name' as const },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age' as const,
    sorter: (a: DataType, b: DataType) => a.age - b.age,
  },
];

const dataSource: DataType[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
];

describe('Table', () => {
  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(<Table columns={columns} dataSource={dataSource} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText(/alice/i)).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('sorts data when header is clicked', async () => {
    renderWithTheme(<Table columns={columns} dataSource={dataSource} />);
    const ageHeader = screen.getByRole('columnheader', { name: /age/i });
    await userEvent.click(ageHeader);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent(/bob/i);
  });
});
