import type { Meta, StoryObj } from '@storybook/react';
import { Table } from '../src/components/Table';
import { Tag } from '../src/components/Tag';

const meta: Meta<typeof Table> = {
  title: 'react-n-design/Table',
  component: Table,
  tags: ['autodocs'],
};
export default meta;

interface UserData {
  id: number;
  name: string;
  age: number;
  city: string;
  status: 'active' | 'inactive' | 'pending';
}

const dataSource: UserData[] = [
  { id: 1, name: 'John Brown', age: 32, city: 'New York', status: 'active' },
  { id: 2, name: 'Jim Green', age: 42, city: 'London', status: 'inactive' },
  { id: 3, name: 'Joe Black', age: 32, city: 'Sydney', status: 'pending' },
  { id: 4, name: 'Jane Doe', age: 28, city: 'Tokyo', status: 'active' },
  { id: 5, name: 'Mike Ross', age: 25, city: 'New York', status: 'pending' },
  // ... add more data to test pagination
  { id: 6, name: 'Rachel Zane', age: 30, city: 'London', status: 'active' },
  { id: 7, name: 'Harvey Specter', age: 45, city: 'New York', status: 'active' },
  { id: 8, name: 'Louis Litt', age: 48, city: 'New York', status: 'inactive' },
  { id: 9, name: 'Donna Paulsen', age: 41, city: 'New York', status: 'active' },
  { id: 10, name: 'Jessica Pearson', age: 52, city: 'New York', status: 'active' },
  { id: 11, name: 'Katrina Bennett', age: 34, city: 'New York', status: 'pending' },
];

const columns = [
  { key: 'name', title: 'Name', dataIndex: 'name', sorter: (a: UserData, b: UserData) => a.name.localeCompare(b.name) },
  { key: 'age', title: 'Age', dataIndex: 'age', sorter: (a: UserData, b: UserData) => a.age - b.age },
  { key: 'city', title: 'City', dataIndex: 'city', sorter: (a: UserData, b: UserData) => a.city.localeCompare(b.city) },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (status: UserData['status']) => {
      const color = { active: '#28a745', inactive: '#aaa', pending: '#faad14' }[status];
      return <Tag color={color} size="small">{status.toUpperCase()}</Tag>;
    },
  },
];

export const Default: StoryObj<typeof Table> = {
  args: {
    columns: columns,
    dataSource: dataSource,
    pagination: false,
  },
};

export const WithSortingAndPagination: StoryObj<typeof Table> = {
  args: {
    columns: columns,
    dataSource: dataSource,
    pagination: { pageSize: 5 },
  },
};

export const Loading: StoryObj<typeof Table> = {
  args: {
    columns: columns,
    dataSource: [],
    loading: true,
  },
};