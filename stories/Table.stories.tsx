import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Table } from '../src/components/Table';
import { Tag } from '../src/components/Tag';

const meta: Meta<typeof Table> = {
  title: 'react-n-design/Table v1.2.0',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# Table v1.2.0

A powerful Table component with sticky headers, skeleton loading, responsive column hiding, 
and improved performance.

## Features
- **Performance**: React.memo wrapper, memoized columns and render functions
- **Sticky Headers**: Keep headers visible when scrolling
- **Skeleton Loading**: Animated loading placeholders
- **Responsive Columns**: Hide columns at different breakpoints
- **Row Click**: Support for row-level interaction
- **Animations**: Smooth hover transitions and sorting indicators
        `,
      },
    },
  },
};
export default meta;

interface UserData {
  id: number;
  name: string;
  age: number;
  email: string;
  city: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  joined: string;
}

const dataSource: UserData[] = [
  { id: 1, name: 'John Brown', age: 32, email: 'john@example.com', city: 'New York', department: 'Engineering', status: 'active', joined: '2023-01-15' },
  { id: 2, name: 'Jim Green', age: 42, email: 'jim@example.com', city: 'London', department: 'Design', status: 'inactive', joined: '2022-08-20' },
  { id: 3, name: 'Joe Black', age: 32, email: 'joe@example.com', city: 'Sydney', department: 'Marketing', status: 'pending', joined: '2023-05-10' },
  { id: 4, name: 'Jane Doe', age: 28, email: 'jane@example.com', city: 'Tokyo', department: 'Engineering', status: 'active', joined: '2023-03-01' },
  { id: 5, name: 'Mike Ross', age: 25, email: 'mike@example.com', city: 'New York', department: 'Sales', status: 'pending', joined: '2024-01-10' },
  { id: 6, name: 'Rachel Zane', age: 30, email: 'rachel@example.com', city: 'London', department: 'Legal', status: 'active', joined: '2022-11-15' },
  { id: 7, name: 'Harvey Specter', age: 45, email: 'harvey@example.com', city: 'New York', department: 'Legal', status: 'active', joined: '2020-06-01' },
  { id: 8, name: 'Louis Litt', age: 48, email: 'louis@example.com', city: 'New York', department: 'Finance', status: 'inactive', joined: '2021-09-12' },
  { id: 9, name: 'Donna Paulsen', age: 41, email: 'donna@example.com', city: 'New York', department: 'Admin', status: 'active', joined: '2019-03-20' },
  { id: 10, name: 'Jessica Pearson', age: 52, email: 'jessica@example.com', city: 'New York', department: 'Leadership', status: 'active', joined: '2018-01-05' },
  { id: 11, name: 'Katrina Bennett', age: 34, email: 'katrina@example.com', city: 'Boston', department: 'Legal', status: 'pending', joined: '2023-07-22' },
  { id: 12, name: 'Alex Williams', age: 38, email: 'alex@example.com', city: 'Chicago', department: 'Engineering', status: 'active', joined: '2022-04-18' },
];

const columns = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name' as const,
    sorter: (a: UserData, b: UserData) => a.name.localeCompare(b.name),
  },
  {
    key: 'age',
    title: 'Age',
    dataIndex: 'age' as const,
    sorter: (a: UserData, b: UserData) => a.age - b.age,
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email' as const,
  },
  {
    key: 'department',
    title: 'Department',
    dataIndex: 'department' as const,
    sorter: (a: UserData, b: UserData) => a.department.localeCompare(b.department),
  },
  {
    key: 'city',
    title: 'City',
    dataIndex: 'city' as const,
    sorter: (a: UserData, b: UserData) => a.city.localeCompare(b.city),
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status' as const,
    render: (status: UserData['status']) => {
      const color = { active: '#28a745', inactive: '#aaa', pending: '#faad14' }[status];
      return (
        <Tag color={color} size="small">
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
];

export const Default: StoryObj<typeof Table> = {
  args: {
    columns: columns.slice(0, 4), // Show fewer columns for default view
    dataSource: dataSource.slice(0, 6),
    pagination: false,
  },
};

export const WithSortingAndPagination: StoryObj<typeof Table> = {
  args: {
    columns,
    dataSource,
    pagination: { pageSize: 5 },
  },
};

export const Loading: StoryObj<typeof Table> = {
  args: {
    columns,
    dataSource: [],
    loading: true,
  },
  parameters: {
    docs: {
      description: { story: 'Shows the loading overlay with spinner.' },
    },
  },
};

export const SkeletonLoading: StoryObj<typeof Table> = {
  args: {
    columns,
    dataSource: [],
    skeletonLoading: true,
    skeletonRows: 5,
  },
  parameters: {
    docs: {
      description: { story: 'Shows animated skeleton placeholders while data loads.' },
    },
  },
};

export const EmptyState: StoryObj<typeof Table> = {
  args: {
    columns,
    dataSource: [],
    pagination: false,
  },
  parameters: {
    docs: {
      description: { story: 'Shows the default empty state with illustration.' },
    },
  },
};

export const EmptyStateCustom: StoryObj<typeof Table> = {
  args: {
    columns,
    dataSource: [],
    pagination: false,
    emptyTitle: 'No Users Found',
    emptyDescription: 'Try adjusting your search filters or add new users.',
  },
  parameters: {
    docs: {
      description: { story: 'Shows custom empty state text.' },
    },
  },
};

export const StickyHeader: StoryObj<typeof Table> = {
  args: {
    columns,
    dataSource,
    stickyHeader: true,
    pagination: false,
  },
  parameters: {
    docs: {
      description: { story: 'Headers stay visible while scrolling through data. Try scrolling in the table body.' },
    },
  },
};

export const ResponsiveColumnHiding: StoryObj<typeof Table> = {
  args: {
    columns,
    dataSource,
    pagination: false,
    stickyHeader: true,
    columnHiding: {
      sm: ['email', 'department', 'city'], // Hide on small screens
      md: ['department'], // Hide on medium screens
      lg: [], // Hide on large screens
    },
  },
  parameters: {
    docs: {
      description: { story: 'Columns are hidden at different breakpoints. Resize your browser to see the effect.' },
    },
  },
};

export const WithRowClick: StoryObj<typeof Table> = {
  render: () => {
    const [selectedRow, setSelectedRow] = useState<UserData | null>(null);
    return (
      <div>
        <Table
          columns={columns.slice(0, 4)}
          dataSource={dataSource.slice(0, 5)}
          pagination={false}
          onRowClick={(record) => setSelectedRow(record)}
          rowKey="id"
          className="clickable-rows"
        />
        {selectedRow && (
          <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <strong>Selected: </strong>{selectedRow.name} ({selectedRow.email})
          </div>
        )}
      </div>
    );
  },
};

export const FullFeatureDemo: StoryObj<typeof Table> = {
  args: {
    columns,
    dataSource,
    stickyHeader: true,
    pagination: { pageSize: 5 },
    columnHiding: {
      sm: ['email', 'department', 'city'],
      md: ['department'],
      lg: [],
    },
  },
  parameters: {
    docs: {
      description: { 
        story: 'Complete table with all v1.2.0 features: sticky header, responsive column hiding, sorting, and pagination.' 
      },
    },
  },
};

export const CustomStyle: StoryObj<typeof Table> = {
  args: {
    columns: columns.slice(0, 3),
    dataSource: dataSource.slice(0, 3),
    pagination: false,
    style: { margin: '20px', border: '2px solid #1890ff' },
    className: 'custom-styled-table',
  },
  parameters: {
    docs: {
      description: { story: 'Table with custom inline styles and className.' },
    },
  },
};

export const CustomEmptyState: StoryObj<typeof Table> = {
  args: {
    columns,
    dataSource: [],
    pagination: false,
    emptyState: (
      <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
        <h3>Custom Empty Content</h3>
        <p>This is a completely custom empty state component!</p>
        <button style={{ padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Add Data</button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: { story: 'Replace the default empty state with your own component.' },
    },
  },
};
