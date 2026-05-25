import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DataGrid } from '../src/components/DataGrid';

const meta: Meta<typeof DataGrid> = {
  title: 'react-n-design/DataGrid',
  component: DataGrid,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    height: { control: 'number' },
    rowHeight: { control: 'number' },
  },
};
export default meta;

type Story = StoryObj<typeof DataGrid>;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const columns = [
  { key: 'name', title: 'Name', sortable: true, width: 180 },
  { key: 'email', title: 'Email', sortable: true, width: 220 },
  { key: 'role', title: 'Role', sortable: true, width: 140 },
  { key: 'status', title: 'Status', sortable: true, width: 120 },
];

function generateData(count: number): User[] {
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editor', 'Viewer'][i % 3],
    status: i % 3 === 0 ? 'inactive' : 'active',
  }));
}

export const Default: Story = {
  args: {
    columns,
    dataSource: generateData(50),
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
    pagination: { pageSize: 10, pageSizeOptions: [10, 25, 50] },
  },
};

export const Virtualized: Story = {
  args: {
    columns,
    dataSource: generateData(10000),
    rowKey: 'id',
    height: 500,
    rowHeight: 48,
    pagination: false,
  },
};

export const Sortable: Story = {
  args: {
    columns: columns.map((c) => ({ ...c, sortable: true })),
    dataSource: generateData(100),
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
  },
};

export const Selectable: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div>
        <p>Selected: {selected.length} rows</p>
        <DataGrid {...args} rowSelection={{ selectedRowKeys: selected, onChange: setSelected }} />
      </div>
    );
  },
  args: {
    columns,
    dataSource: generateData(50),
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
  },
};

export const Expandable: Story = {
  args: {
    columns,
    dataSource: generateData(20),
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
    expandable: {
      expandedRowRender: (record: User) => (
        <div style={{ padding: '16px' }}>
          <p>
            <strong>ID:</strong> {record.id}
          </p>
          <p>
            <strong>Email:</strong> {record.email}
          </p>
          <p>
            <strong>Role:</strong> {record.role}
          </p>
        </div>
      ),
    },
  },
};

export const Loading: Story = {
  args: {
    columns,
    dataSource: [],
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    columns,
    dataSource: [],
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
  },
};
