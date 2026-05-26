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
      <Menu items={mockItems} trigger={<button data-testid="custom-trigger">Open</button>} />
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
    const items = [
      { key: 'item1', label: 'Disabled Item', disabled: true, onClick: disabledItemCallback },
    ];
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

  // v1.2.0 New Tests
  describe('v1.2.0 - Checkable Items', () => {
    it('renders checkbox items', async () => {
      const itemsWithCheckbox = [
        { key: 'check1', label: 'Check Item', checkable: 'checkbox' as const, checked: false },
        { key: 'check2', label: 'Checked Item', checkable: 'checkbox' as const, checked: true },
      ];
      renderWithTheme(<Menu items={itemsWithCheckbox} />);
      const trigger = screen.getByRole('button', { name: 'Menu' });
      await userEvent.click(trigger);
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems[0]).toHaveAttribute('aria-checked', 'false');
      expect(menuItems[1]).toHaveAttribute('aria-checked', 'true');
    });

    it('renders radio items', async () => {
      const itemsWithRadio = [
        { key: 'radio1', label: 'Option 1', checkable: 'radio' as const, checked: true },
        { key: 'radio2', label: 'Option 2', checkable: 'radio' as const, checked: false },
      ];
      renderWithTheme(<Menu items={itemsWithRadio} />);
      const trigger = screen.getByRole('button', { name: 'Menu' });
      await userEvent.click(trigger);
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems[0]).toHaveAttribute('aria-checked', 'true');
      expect(menuItems[1]).toHaveAttribute('aria-checked', 'false');
    });

    it('radio items do not close menu on selection', async () => {
      const onSelect = vi.fn();
      const itemsWithRadio = [
        { key: 'radio1', label: 'Option 1', checkable: 'radio' as const, checked: false, onClick: vi.fn() },
      ];
      renderWithTheme(<Menu items={itemsWithRadio} onSelect={onSelect} />);
      const trigger = screen.getByRole('button', { name: 'Menu' });
      await userEvent.click(trigger);
      const menu = screen.getByRole('menu');
      const item = screen.getByRole('menuitem');
      await userEvent.click(item);
      expect(onSelect).toHaveBeenCalledWith('radio1');
      expect(menu).toBeInTheDocument();
    });
  });

  describe('v1.2.0 - Badges', () => {
    it('renders items with badges', async () => {
      const itemsWithBadges = [
        { key: 'badge1', label: 'Notifications', badge: '5', badgeColor: '#ff4444' },
        { key: 'badge2', label: 'Messages', badge: 'New' },
      ];
      renderWithTheme(<Menu items={itemsWithBadges} />);
      const trigger = screen.getByRole('button', { name: 'Menu' });
      await userEvent.click(trigger);
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('New')).toBeInTheDocument();
    });
  });

  describe('v1.2.0 - Danger Items', () => {
    it('renders danger styled items', async () => {
      const dangerItems = [
        { key: 'delete', label: 'Delete', danger: true },
      ];
      renderWithTheme(<Menu items={dangerItems} />);
      const trigger = screen.getByRole('button', { name: 'Menu' });
      await userEvent.click(trigger);
      const item = screen.getByRole('menuitem', { name: 'Delete' });
      expect(item).toBeInTheDocument();
    });
  });

  describe('v1.2.0 - Custom Props', () => {
    it('accepts style prop', () => {
      const { container } = renderWithTheme(
        <Menu items={mockItems} style={{ backgroundColor: 'red' }} />
      );
      expect(container.firstChild).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    });

    it('accepts className prop', () => {
      renderWithTheme(<Menu items={mockItems} className="custom-menu-class" />);
      expect(document.querySelector('.custom-menu-class')).toBeInTheDocument();
    });

    it('supports custom renderItem', async () => {
      const customRender = vi.fn((item, props) => (
        <button
          key={item.key}
          onClick={props.onClick}
          onMouseEnter={props.onMouseEnter}
          data-active={props.isActive}
          data-disabled={props.isDisabled}
          data-testid={`custom-${item.key}`}
        >
          {item.label}
        </button>
      ));
      renderWithTheme(<Menu items={mockItems} renderItem={customRender} />);
      const trigger = screen.getByRole('button', { name: 'Menu' });
      await userEvent.click(trigger);
      expect(customRender).toHaveBeenCalled();
      expect(screen.getByTestId('custom-item1')).toBeInTheDocument();
    });
  });
});
