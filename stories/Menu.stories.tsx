import type { Meta, StoryObj } from '@storybook/react';
import { FaCopy, FaEdit, FaShare, FaTrash } from 'react-icons/fa';
import { Menu } from '../src/components/Menu';

const meta: Meta<typeof Menu> = {
  title: 'react-n-design/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placement: { control: 'radio', options: ['bottom-left', 'bottom-right'] },
  },
};
export default meta;
type Story = StoryObj<typeof Menu>;

const sampleItems = [
  { key: 'edit', label: 'Edit', icon: <FaEdit size={14} />, onClick: () => console.log('edit') },
  { key: 'copy', label: 'Copy', icon: <FaCopy size={14} />, onClick: () => console.log('copy') },
  { type: 'divider' as const },
  {
    key: 'share',
    label: 'Share',
    icon: <FaShare size={14} />,
    onClick: () => console.log('share'),
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: <FaTrash size={14} />,
    danger: true,
    onClick: () => console.log('delete'),
  },
];

export const Default: Story = {
  args: {
    label: 'Actions',
    items: sampleItems,
    onSelect: (key: string) => alert(`Selected: ${key}`),
  },
};

export const CustomTrigger: Story = {
  args: {
    trigger: <button>Open Menu</button>,
    items: sampleItems,
  },
};

export const WithLabels: Story = {
  args: {
    label: 'Options',
    items: [
      { type: 'label' as const, label: 'Content' },
      { key: 'new', label: 'New File', onClick: () => {} },
      { key: 'open', label: 'Open Folder', onClick: () => {} },
      { type: 'divider' as const },
      { type: 'label' as const, label: 'Preferences' },
      { key: 'settings', label: 'Settings', onClick: () => {} },
    ],
  },
};

export const BottomRight: Story = {
  args: {
    label: 'Actions',
    placement: 'bottom-right',
    items: sampleItems,
  },
};
