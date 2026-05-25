import type { Meta, StoryObj } from '@storybook/react';
import { Tree, type TreeProps } from '../src/components/Tree';

const meta: Meta<typeof Tree> = {
  title: 'react-n-design/Tree',
  component: Tree,
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object' },
    defaultExpandedKeys: { control: 'object' },
    defaultSelectedKeys: { control: 'object' },
    onSelect: { action: 'selected' },
    onExpand: { action: 'expanded' },
  },
};
export default meta;

type Story = StoryObj<typeof Tree>;

const sampleData: TreeProps['data'] = [
  {
    key: '1',
    title: 'Fruits',
    children: [
      { key: '1-1', title: 'Apple' },
      { key: '1-2', title: 'Banana' },
      {
        key: '1-3',
        title: 'Citrus',
        children: [
          { key: '1-3-1', title: 'Orange' },
          { key: '1-3-2', title: 'Lemon' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: 'Vegetables',
    children: [
      { key: '2-1', title: 'Carrot' },
      { key: '2-2', title: 'Broccoli', disabled: true },
      { key: '2-3', title: 'Spinach' },
    ],
  },
  {
    key: '3',
    title: 'Dairy',
    children: [
      { key: '3-1', title: 'Milk' },
      { key: '3-2', title: 'Cheese' },
    ],
  },
];

export const Default: Story = {
  args: {
    data: sampleData,
    defaultExpandedKeys: ['1'],
  },
};

export const DefaultExpanded: Story = {
  args: {
    data: sampleData,
    defaultExpandedKeys: ['1', '1-3', '2'],
  },
};

export const DefaultSelected: Story = {
  args: {
    data: sampleData,
    defaultExpandedKeys: ['1'],
    defaultSelectedKeys: ['1-1'],
  },
};

export const DisabledNode: Story = {
  args: {
    data: sampleData,
    defaultExpandedKeys: ['2'],
    defaultSelectedKeys: [],
  },
};
