import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FaCopy, FaEdit, FaShare, FaTrash, FaCheck, FaBell, FaCog, FaUser, FaEnvelope } from 'react-icons/fa';
import { Menu } from '../src/components/Menu';

const meta: Meta<typeof Menu> = {
  title: 'react-n-design/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placement: { control: 'radio', options: ['bottom-left', 'bottom-right'] },
    mobileDrawer: { control: 'boolean' },
    mobileFullscreen: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Menu>;

const sampleItems = [
  { key: 'edit', label: 'Edit', icon: <FaEdit size={16} />, onClick: () => console.log('edit') },
  { key: 'copy', label: 'Copy', icon: <FaCopy size={16} />, onClick: () => console.log('copy') },
  { type: 'divider' as const },
  {
    key: 'share',
    label: 'Share',
    icon: <FaShare size={16} />,
    onClick: () => console.log('share'),
  },
  {
    key: 'delete',
    label: 'Delete',
    icon: <FaTrash size={16} />,
    danger: true,
    onClick: () => console.log('delete'),
  },
];

// Template for checkbox menu
const CheckboxMenuTemplate = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'show-preview': true,
    'auto-save': false,
    'dark-mode': true,
  });

  const items = [
    { type: 'label' as const, label: 'Display' },
    {
      key: 'show-preview',
      label: 'Show Preview',
      checkable: 'checkbox' as const,
      checked: checkedItems['show-preview'],
      onClick: () => setCheckedItems(p => ({ ...p, 'show-preview': !p['show-preview'] })),
    },
    {
      key: 'auto-save',
      label: 'Auto Save',
      checkable: 'checkbox' as const,
      checked: checkedItems['auto-save'],
      onClick: () => setCheckedItems(p => ({ ...p, 'auto-save': !p['auto-save'] })),
    },
    {
      key: 'dark-mode',
      label: 'Dark Mode',
      checkable: 'checkbox' as const,
      checked: checkedItems['dark-mode'],
      onClick: () => setCheckedItems(p => ({ ...p, 'dark-mode': !p['dark-mode'] })),
    },
  ];

  return <Menu label="Preferences" items={items} />;
};

// Template for radio menu
const RadioMenuTemplate = () => {
  const [selectedSize, setSelectedSize] = useState('medium');

  const items = [
    { type: 'label' as const, label: 'Text Size' },
    { key: 'small', label: 'Small', checkable: 'radio' as const, checked: selectedSize === 'small', onClick: () => setSelectedSize('small') },
    { key: 'medium', label: 'Medium', checkable: 'radio' as const, checked: selectedSize === 'medium', onClick: () => setSelectedSize('medium') },
    { key: 'large', label: 'Large', checkable: 'radio' as const, checked: selectedSize === 'large', onClick: () => setSelectedSize('large') },
  ];

  return <Menu label="Text Size" items={items} />;
};

// Template for menu with badges
const BadgeMenuTemplate = () => {
  const items = [
    { key: 'notifications', label: 'Notifications', icon: <FaBell size={16} />, badge: '12', badgeColor: '#ff4757' },
    { key: 'messages', label: 'Messages', icon: <FaEnvelope size={16} />, badge: 'New', badgeColor: '#2ed573' },
    { type: 'divider' as const },
    { key: 'profile', label: 'Profile', icon: <FaUser size={16} /> },
    { key: 'settings', label: 'Settings', icon: <FaCog size={16} />, badge: '3' },
  ];

  return <Menu label="Account" items={items} />;
};

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

export const WithCheckboxes: Story = {
  render: CheckboxMenuTemplate,
};

export const WithRadios: Story = {
  render: RadioMenuTemplate,
};

export const WithBadges: Story = {
  render: BadgeMenuTemplate,
};

export const WithDangerItems: Story = {
  args: {
    label: 'Actions',
    items: [
      { key: 'edit', label: 'Edit', icon: <FaEdit size={16} /> },
      { key: 'duplicate', label: 'Duplicate', icon: <FaCopy size={16} /> },
      { type: 'divider' as const },
      { key: 'archive', label: 'Archive' },
      {
        key: 'delete',
        label: 'Delete Permanently',
        icon: <FaTrash size={16} />,
        danger: true,
        onClick: () => console.log('delete'),
      },
    ],
  },
};

export const MobileDrawer: Story = {
  args: {
    label: 'Mobile Menu',
    mobileDrawer: true,
    mobileFullscreen: false,
    items: [
      { key: 'home', label: 'Home', icon: <FaUser size={20} /> },
      { key: 'profile', label: 'Profile', icon: <FaUser size={20} /> },
      { key: 'notifications', label: 'Notifications', icon: <FaBell size={20} />, badge: '5' },
      { key: 'settings', label: 'Settings', icon: <FaCog size={20} /> },
      { type: 'divider' as const },
      { key: 'logout', label: 'Logout', danger: true },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const MobileFullscreen: Story = {
  args: {
    label: 'Fullscreen Menu',
    mobileDrawer: true,
    mobileFullscreen: true,
    items: [
      { type: 'label' as const, label: 'Navigation' },
      { key: 'home', label: 'Home', icon: <FaUser size={24} /> },
      { key: 'explore', label: 'Explore', icon: <FaBell size={24} /> },
      { key: 'notifications', label: 'Notifications', icon: <FaBell size={24} />, badge: '12', badgeColor: '#ff4757' },
      { type: 'divider' as const },
      { type: 'label' as const, label: 'Account' },
      { key: 'profile', label: 'Profile', icon: <FaUser size={24} /> },
      { key: 'settings', label: 'Settings', icon: <FaCog size={24} /> },
    ],
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const CustomItemRenderer: Story = {
  args: {
    label: 'Custom Render',
    items: sampleItems,
    renderItem: (item, props) => (
      <button
        key={item.key}
        onClick={props.onClick}
        onMouseEnter={props.onMouseEnter}
        data-testid={`custom-${item.key}`}
        style={{
          padding: '16px 20px',
          border: 'none',
          background: props.isActive ? '#e6f7ff' : 'transparent',
          cursor: props.isDisabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          width: '100%',
          textAlign: 'left',
          fontSize: '14px',
          color: item.danger ? '#ff4d4f' : 'inherit',
          opacity: props.isDisabled ? 0.5 : 1,
          borderRadius: '4px',
          margin: '4px 0',
        }}
      >
        {item.icon}
        <span style={{ flex: 1 }}>{item.label}</span>
        {item.badge && (
          <span
            style={{
              background: item.badgeColor || '#1890ff',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            {item.badge}
          </span>
        )}
      </button>
    ),
  },
};

export const FullFeatured: Story = {
  render: () => {
    const [views, setViews] = useState({ list: true, grid: false, cards: false });
    const [options, setOptions] = useState({ showHidden: false, expandAll: true });

    const items = [
      { type: 'label' as const, label: 'View Options' },
      {
        key: 'list-view',
        label: 'List View',
        icon: <FaCheck size={14} />,
        checkable: 'radio' as const,
        checked: views.list,
        onClick: () => setViews({ list: true, grid: false, cards: false }),
      },
      {
        key: 'grid-view',
        label: 'Grid View',
        icon: <FaCopy size={14} />,
        checkable: 'radio' as const,
        checked: views.grid,
        onClick: () => setViews({ list: false, grid: true, cards: false }),
      },
      {
        key: 'cards-view',
        label: 'Cards',
        icon: <FaShare size={14} />,
        checkable: 'radio' as const,
        checked: views.cards,
        onClick: () => setViews({ list: false, grid: false, cards: true }),
      },
      { type: 'divider' as const },
      { type: 'label' as const, label: 'Display Settings' },
      {
        key: 'show-hidden',
        label: 'Show Hidden Files',
        checkable: 'checkbox' as const,
        checked: options.showHidden,
        onClick: () => setOptions(p => ({ ...p, showHidden: !p.showHidden })),
      },
      {
        key: 'expand-all',
        label: 'Expand All Folders',
        checkable: 'checkbox' as const,
        checked: options.expandAll,
        onClick: () => setOptions(p => ({ ...p, expandAll: !p.expandAll })),
      },
      { type: 'divider' as const },
      { key: 'notifications', label: 'Notifications', badge: '3', badgeColor: '#ff4757' },
      { key: 'help', label: 'Help & Support', badge: '?' },
    ];

    return <Menu label="View" items={items} />;
  },
};
