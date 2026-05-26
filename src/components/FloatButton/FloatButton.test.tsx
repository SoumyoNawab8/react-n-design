import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { FloatButton, type FloatButtonMenuItem } from './FloatButton';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('FloatButton', () => {
  beforeEach(() => {
    // Clean up body between tests
    document.body.innerHTML = '';
  });

  it('renders with icon and is accessible', async () => {
    const { container } = renderWithTheme(<FloatButton icon={<span data-testid="icon">+</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    renderWithTheme(<FloatButton icon={<span>+</span>} onClick={handleClick} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders at different positions', () => {
    const positions = ['bottom-right', 'bottom-left', 'top-right', 'top-left'] as const;

    for (const position of positions) {
      const { unmount } = renderWithTheme(
        <FloatButton icon={<span data-testid={`icon-${position}`}>+</span>} position={position} />
      );
      expect(screen.getByTestId(`icon-${position}`)).toBeInTheDocument();
      unmount();
    }
  });

  it('renders with tooltip text', () => {
    renderWithTheme(<FloatButton icon={<span>+</span>} tooltip="Add item" />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Add item');
  });

  it('has default aria-label when no tooltip provided', () => {
    renderWithTheme(<FloatButton icon={<span>+</span>} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Floating action button');
  });

  it('opens menu when menu items provided', async () => {
    const menuItemClick = vi.fn();
    const menu: FloatButtonMenuItem[] = [
      { icon: <span>1</span>, label: 'Item 1', onClick: menuItemClick },
      { icon: <span>2</span>, label: 'Item 2', onClick: vi.fn() },
    ];

    renderWithTheme(<FloatButton icon={<span>Menu</span>} menu={menu} />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /item 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /item 2/i })).toBeInTheDocument();
  });

  it('calls menu item onClick when clicked', async () => {
    const menuItemClick = vi.fn();
    const menu: FloatButtonMenuItem[] = [
      { icon: <span>Icon</span>, label: 'Action', onClick: menuItemClick },
    ];

    renderWithTheme(<FloatButton icon={<span>Menu</span>} menu={menu} />);

    const mainButton = screen.getByRole('button', { name: /floating action button/i });
    await userEvent.click(mainButton);

    const menuButton = screen.getByRole('button', { name: /^action$/i });
    await userEvent.click(menuButton);

    expect(menuItemClick).toHaveBeenCalledTimes(1);
  });

  it('disables menu item when disabled prop is true', async () => {
    const menuItemClick = vi.fn();
    const menu: FloatButtonMenuItem[] = [
      { icon: <span>Icon</span>, label: 'Disabled', onClick: menuItemClick, disabled: true },
      { icon: <span>Icon</span>, label: 'Enabled', onClick: vi.fn() },
    ];

    renderWithTheme(<FloatButton icon={<span>Menu</span>} menu={menu} />);

    const mainButton = screen.getByRole('button');
    await userEvent.click(mainButton);

    const disabledButton = screen.getByRole('button', { name: /^disabled$/i });
    expect(disabledButton).toBeDisabled();

    await userEvent.click(disabledButton);
    expect(menuItemClick).not.toHaveBeenCalled();
  });

  it('closes menu when clicking outside', async () => {
    const menu: FloatButtonMenuItem[] = [
      { icon: <span>Icon</span>, label: 'Item', onClick: vi.fn() },
    ];

    renderWithTheme(
      <div data-testid="wrapper">
        <FloatButton icon={<span>Menu</span>} menu={menu} />
      </div>
    );

    const mainButton = screen.getByRole('button');
    await userEvent.click(mainButton);
    expect(screen.getByRole('button', { name: /^item$/i })).toBeInTheDocument();

    // Click on the wrapper, which is outside the float button content
    await userEvent.click(screen.getByTestId('wrapper'));

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /^item$/i })).not.toBeInTheDocument();
    });
  });

  it('closes menu after clicking menu item', async () => {
    const menu: FloatButtonMenuItem[] = [
      { icon: <span>Icon</span>, label: 'Item', onClick: vi.fn() },
    ];

    renderWithTheme(<FloatButton icon={<span>Menu</span>} menu={menu} />);

    const mainButton = screen.getByRole('button');
    await userEvent.click(mainButton);

    const menuButton = screen.getByRole('button', { name: /^item$/i });
    await userEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /^item$/i })).not.toBeInTheDocument();
    });
  });

  it('toggles menu open and closed', async () => {
    const menu: FloatButtonMenuItem[] = [
      { icon: <span>Icon</span>, label: 'Item', onClick: vi.fn() },
    ];

    renderWithTheme(<FloatButton icon={<span>Menu</span>} menu={menu} />);

    const button = screen.getByRole('button');

    // Open menu
    await userEvent.click(button);
    expect(screen.getByRole('button', { name: /^item$/i })).toBeInTheDocument();

    // Close menu by clicking again
    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /^item$/i })).not.toBeInTheDocument();
    });
  });

  it('renders with complex icon', () => {
    renderWithTheme(
      <FloatButton
        icon={
          // biome-ignore lint/a11y/noSvgWithoutTitle: icon used for testing only
          <svg data-testid="svg-icon" viewBox="0 0 24 24">
            <path d="M12 4v16m8-8H4" />
          </svg>
        }
      />
    );
    expect(screen.getByTestId('svg-icon')).toBeInTheDocument();
  });

  it('renders multiple menu items', async () => {
    const menu: FloatButtonMenuItem[] = [
      { icon: <span>1</span>, label: 'First', onClick: vi.fn() },
      { icon: <span>2</span>, label: 'Second', onClick: vi.fn() },
      { icon: <span>3</span>, label: 'Third', onClick: vi.fn() },
    ];

    renderWithTheme(<FloatButton icon={<span>Menu</span>} menu={menu} />);

    const mainButton = screen.getByRole('button');
    await userEvent.click(mainButton);

    expect(screen.getByRole('button', { name: /^first$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^second$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^third$/i })).toBeInTheDocument();
  });
});
