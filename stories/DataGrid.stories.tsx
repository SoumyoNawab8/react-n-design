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
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'glass'],
    },
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
  department: string;
  phone: string;
  lastLogin: string;
}

const columns = [
  { key: 'name', title: 'Name', sortable: true, width: 180 },
  { key: 'email', title: 'Email', sortable: true, width: 220 },
  { key: 'role', title: 'Role', sortable: true, width: 140 },
  { key: 'department', title: 'Department', sortable: true, width: 150 },
  { key: 'status', title: 'Status', sortable: true, width: 120 },
  { key: 'lastLogin', title: 'Last Login', sortable: true, width: 150 },
];

const columnsWithPinning = [
  { key: 'name', title: 'Name', sortable: true, width: 180, pinned: 'left' as const },
  { key: 'email', title: 'Email', sortable: true, width: 220 },
  { key: 'role', title: 'Role', sortable: true, width: 140 },
  { key: 'department', title: 'Department', sortable: true, width: 150 },
  { key: 'status', title: 'Status', sortable: true, width: 120, pinned: 'right' as const },
];

function generateData(count: number): User[] {
  const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'];
  const roles = ['Admin', 'Editor', 'Viewer'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % 3],
    status: i % 3 === 0 ? 'inactive' : 'active',
    department: departments[i % 5],
    phone: `+1-555-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
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
          <p>
            <strong>Department:</strong> {record.department}
          </p>
          <p>
            <strong>Phone:</strong> {record.phone}
          </p>
          <p>
            <strong>Last Login:</strong> {record.lastLogin}
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

export const LoadingWithSkeleton: Story = {
  name: 'Loading (Skeleton Shimmer)',
  args: {
    columns,
    dataSource: [],
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state now shows shimmer effect on skeleton cells',
      },
    },
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

// ===== v1.2.0 NEW STORIES =====

export const MinimalVariant: Story = {
  args: {
    columns,
    dataSource: generateData(30),
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
    variant: 'minimal',
    pagination: { pageSize: 10 },
  },
};

export const GlassVariant: Story = {
  args: {
    columns,
    dataSource: generateData(30),
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
    variant: 'glass',
    pagination: { pageSize: 10 },
  },
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        { name: 'gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      ],
    },
  },
};

export const ColumnPinning: Story = {
  args: {
    columns: columnsWithPinning,
    dataSource: generateData(30),
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
    pagination: { pageSize: 10 },
  },
  parameters: {
    docs: {
      description: {
        story: 'Name column is pinned left, Status column is pinned right. Try scrolling horizontally to see the pinning effect.',
      },
    },
  },
};

export const WithCustomToolbar: Story = {
  render: (args) => {
    const [refreshKey, setRefreshKey] = useState(0);
    return (
      <div>
        <DataGrid 
          {...args} 
          toolbar={
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <strong>Custom Toolbar:</strong>
              <button onClick={() => setRefreshKey(k => k + 1)}>Refresh {refreshKey}</button>
              <button>Export</button>
            </div>
          }
        />
      </div>
    );
  },
  args: {
    columns,
    dataSource: generateData(30),
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
    pagination: { pageSize: 10 },
  },
};

export const ColumnVisibilityResponsive: Story = {
  name: 'Column Visibility (Responsive)',
  args: {
    columns,
    dataSource: generateData(30),
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
    pagination: { pageSize: 10 },
    columnVisibility: {
      sm: ['name', 'status'],
      md: ['name', 'role', 'status'],
      lg: ['name', 'email', 'role', 'department', 'status', 'lastLogin'],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Resize browser to see columns hide/show responsively: sm = <640px (name, status only), md = 640-1024px (adds role), lg = >1024px (all columns)',
      },
    },
  },
};

export const MobileOptimized: Story = {
  name: 'Mobile Optimized (Viewport)',
  args: {
    columns,
    dataSource: generateData(30),
    rowKey: 'id',
    height: 400,
    rowHeight: 48,
    pagination: { pageSize: 10 },
    columnVisibility: {
      sm: ['name', 'status'],
      md: ['name', 'role', 'status'],
      lg: undefined,
    },
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'This story is best viewed in mobile viewport. Touch scrolling is enabled for horizontal scroll.',
      },
    },
  },
};

export const AllFeatures: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div>
        <p>Selected: {selected.length} rows</p>
        <DataGrid 
          {...args} 
          rowSelection={{ selectedRowKeys: selected, onChange: setSelected }}
          toolbar={
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <strong>Full Feature Demo</strong>
              <span style={{ opacity: 0.6 }}>- Try sorting, filtering, expanding, resizing columns</span>
            </div>
          }
        />
      </div>
    );
  },
  args: {
    columns: columns.map(c => ({ ...c, filterable: true, sortable: true })),
    dataSource: generateData(100),
    rowKey: 'id',
    height: 500,
    rowHeight: 48,
    variant: 'default',
    pagination: { pageSize: 25, pageSizeOptions: [10, 25, 50, 100] },
    expandable: {
      expandedRowRender: (record: User) => (
        <div style={{ padding: '16px' }}>
          <p><strong>Full Details for:</strong> {record.name}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <p><strong>ID:</strong> {record.id}</p>
            <p><strong>Email:</strong> {record.email}</p>
            <p><strong>Role:</strong> {record.role}</p>
            <p><strong>Department:</strong> {record.department}</p>
            <p><strong>Status:</strong> {record.status}</p>
            <p><strong>Last Login:</strong> {record.lastLogin}</p>
          </div>
        </div>
      ),
    },
  },
};

export const PerformanceTest: Story = {
  name: 'Performance Test (10k rows)',
  args: {
    columns: columns,
    dataSource: generateData(10000),
    rowKey: 'id',
    height: 600,
    rowHeight: 48,
    pagination: false,
  },
  parameters: {
    docs: {
      description: {
        story: '10,000 rows with React.memo optimization and virtualization. Scroll smoothly through all rows.',
      },
    },
  },
};
