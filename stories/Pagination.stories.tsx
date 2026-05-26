import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from '../src/components/Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'react-n-design/Pagination',
  component: Pagination,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

const PaginationDemo = (args: any) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  return <Pagination {...args} currentPage={currentPage} onChange={setCurrentPage} />;
};

export const Default: Story = {
  render: PaginationDemo,
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const MiddlePage: Story = {
  render: PaginationDemo,
  args: {
    currentPage: 5,
    totalPages: 10,
  },
};

export const ManyPages: Story = {
  render: PaginationDemo,
  args: {
    currentPage: 7,
    totalPages: 25,
  },
};

export const FewPages: Story = {
  render: PaginationDemo,
  args: {
    currentPage: 2,
    totalPages: 3,
  },
};

export const CustomSiblingCount: Story = {
  render: PaginationDemo,
  args: {
    currentPage: 10,
    totalPages: 25,
    siblingCount: 2,
  },
};

export const Disabled: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    disabled: true,
    onChange: () => {},
  },
};

export const WithoutNavigationButtons: Story = {
  render: PaginationDemo,
  args: {
    currentPage: 5,
    totalPages: 10,
    showPrevNext: false,
  },
};
