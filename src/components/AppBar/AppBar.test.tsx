import { fireEvent, render, screen } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { ThemeContextProvider } from '../../context/ThemeContext';
import { AppBar } from './AppBar';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeContextProvider defaultTheme="light">{component}</ThemeContextProvider>);
};

describe('AppBar', () => {
  it('renders with title', () => {
    renderWithTheme(<AppBar title="Test App" />);
    expect(screen.getByText('Test App')).toBeInTheDocument();
  });

  it('renders menu button when onMenuClick is provided', () => {
    const onMenuClick = vi.fn();
    renderWithTheme(<AppBar title="Test App" onMenuClick={onMenuClick} />);

    const menuButton = screen.getByLabelText('Open navigation menu');
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  it('renders actions', () => {
    renderWithTheme(<AppBar title="Test App" actions={<button>Action</button>} />);
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('has aria role banner', () => {
    renderWithTheme(<AppBar title="Test App" />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('passes through HTML attributes', () => {
    renderWithTheme(<AppBar title="Test App" data-testid="appbar" />);
    expect(screen.getByTestId('appbar')).toBeInTheDocument();
  });
});
