import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CommandPalette } from '../src/components/CommandPalette';

const meta: Meta<typeof CommandPalette> = {
  title: 'AI / CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A Cmd+K spotlight-style command palette with fuzzy search, keyboard navigation, and accessible focus management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: { control: 'boolean' },
    items: { control: 'object' },
    placeholder: { control: 'text' },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const demoItems = [
  { id: 'home', label: 'Go to Home', shortcut: '⌘H', onSelect: () => alert('Home selected') },
  {
    id: 'settings',
    label: 'Open Settings',
    shortcut: '⌘,',
    onSelect: () => alert('Settings selected'),
  },
  { id: 'search', label: 'Search files', shortcut: '⌘F', onSelect: () => alert('Search selected') },
  { id: 'theme', label: 'Toggle theme', shortcut: '⌘T', onSelect: () => alert('Theme toggled') },
  { id: 'logout', label: 'Log out', shortcut: '⌘⇧Q', onSelect: () => alert('Logged out') },
];

export const Default: Story = {
  args: {
    open: true,
    items: demoItems,
    placeholder: 'Search commands...',
    onClose: () => {},
  },
};

export const NoResults: Story = {
  args: {
    open: true,
    items: [],
    placeholder: 'Search commands...',
    onClose: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('');

    const items = [
      {
        id: 'home',
        label: 'Go to Home',
        shortcut: '⌘H',
        onSelect: () => {
          setSelected('Home');
          setOpen(false);
        },
      },
      {
        id: 'settings',
        label: 'Open Settings',
        shortcut: '⌘,',
        onSelect: () => {
          setSelected('Settings');
          setOpen(false);
        },
      },
      {
        id: 'theme',
        label: 'Toggle Theme',
        shortcut: '⌘T',
        onSelect: () => {
          setSelected('Theme toggled');
          setOpen(false);
        },
      },
      {
        id: 'help',
        label: 'Help Center',
        shortcut: '?',
        onSelect: () => {
          setSelected('Help');
          setOpen(false);
        },
      },
    ];

    return (
      <div style={{ padding: 40 }}>
        <button onClick={() => setOpen(true)}>Open Command Palette (or press Cmd+K)</button>
        {selected && (
          <p style={{ marginTop: 20 }}>
            Last selected: <strong>{selected}</strong>
          </p>
        )}
        <CommandPalette
          open={open}
          onClose={() => setOpen(false)}
          items={items}
          placeholder="Search commands..."
        />
      </div>
    );
  },
};
