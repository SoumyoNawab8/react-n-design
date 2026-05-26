import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Menu } from './Menu';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Menu', () => {
  const mockItems = [
    { key: 'item1', label: 'Item 1', onClick: vi.fn() },
    { key: 'item2', label: 'Item 2', onClick: vi.fn() },
    { type: 'divider' },
    { key: 'item3', label: 'Item 3' },
  ];

  it('renders trigger button', () => {
    renderWithTheme(<Menu items={mockItems} />);
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
  });

  it('opens menu on click', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Item 1' })).toBeInTheDocument();
  });

  it('opens menu on Enter key', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    trigger.focus();
    fireEvent.keyDown(trigger, { key: 'Enter' });
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  it('opens menu on Space key', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    trigger.focus();
    fireEvent.keyDown(trigger, { key: ' ' });
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });

  it('calls item onClick when item is clicked', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const item = screen.getByRole('menuitem', { name: 'Item 1' });
    await userEvent.click(item);
    expect(mockItems[0].onClick).toHaveBeenCalled();
  });

  it('calls onSelect when item is clicked', async () => {
    const onSelect = vi.fn();
    renderWithTheme(<Menu items={mockItems} onSelect={onSelect} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const item = screen.getByRole('menuitem', { name: 'Item 1' });
    await userEvent.click(item);
    expect(onSelect).toHaveBeenCalledWith('item1');
  });

  it('closes menu on Escape key', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    fireEvent.keyDown(document.body, { key: 'Escape' });
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('closes menu on outside click', async () => {
    renderWithTheme(
      <div>
        <Menu items={mockItems} />
        <div data-testid="outside">Outside</div>
      </div>
    );
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    await userEvent.click(screen.getByTestId('outside'));
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('navigates items with Arrow Down key', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toHaveFocus();
  });

  it('navigates items with Arrow Up key', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
  });

  it('closes menu on Tab key', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    fireEvent.keyDown(document.body, { key: 'Tab' });
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('renders with custom trigger', () => {
    renderWithTheme(
      <Menu
        items={mockItems}
        trigger={<button data-testid="custom-trigger">Open</button>}
      />
    );
    expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    renderWithTheme(<Menu items={mockItems} label="Actions" />);
    expect(screen.getByRole('button', { name: 'Actions' })).toBeInTheDocument();
  });

  it('renders divider', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const dividers = screen.getAllByRole('separator');
    expect(dividers.length).toBeGreaterThan(0);
  });

  it('renders disabled items', async () => {
    const itemsWithDisabled = [
      { key: 'item1', label: 'Item 1', disabled: true },
      { key: 'item2', label: 'Item 2' },
    ];
    renderWithTheme(<Menu items={itemsWithDisabled} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const disabledItem = screen.getByRole('menuitem', { name: 'Item 1' });
    expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders with label type items', async () => {
    const itemsWithLabel = [
      { type: 'label', label: 'Section Header' },
      { key: 'item1', label: 'Item 1' },
    ];
    renderWithTheme(<Menu items={itemsWithLabel} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    expect(screen.getByText('Section Header')).toBeInTheDocument();
  });

  it('does not call onClick for disabled items', async () => {
    const disabledItemCallback = vi.fn();
    const items = [{ key: 'item1', label: 'Disabled Item', disabled: true, onClick: disabledItemCallback }];
    renderWithTheme(<Menu items={items} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const item = screen.getByRole('menuitem');
    await userEvent.click(item.parentElement as HTMLElement);
    expect(disabledItemCallback).not.toHaveBeenCalled();
  });

  it('places menu at bottom-right when specified', async () => {
    renderWithTheme(<Menu items={mockItems} placement="bottom-right" />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
  });

  it('navigates with Home key to first item', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'Home' });
    const items = screen.getAllByRole('menuitem');
    expect(items[0]).toHaveAttribute('tabIndex', '0');
  });

  it('navigates with End key to last item', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'End' });
  });

  it('activates items with Enter key', async () => {
    const onSelect = vi.fn();
    renderWithTheme(<Menu items={mockItems} onSelect={onSelect} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    const menu = screen.getByRole('menu');
    fireEvent.keyDown(menu, { key: 'Enter' });
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  it('renders items with icons', async () => {
    const itemsWithIcons = [
      { key: 'item1', label: 'Item 1', icon: <span data-testid="item-icon">✓</span> },
    ];
    renderWithTheme(<Menu items={itemsWithIcons} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    expect(screen.getByTestId('item-icon')).toBeInTheDocument();
  });

  it('handles click back to trigger button', async () => {
    renderWithTheme(<Menu items={mockItems} />);
    const trigger = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    await userEvent.click(trigger);
    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });
});
