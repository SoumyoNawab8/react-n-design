import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Drawer } from './Drawer';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Drawer', () => {
  it('does not render when isOpen is false', () => {
    renderWithTheme(
      <Drawer isOpen={false} onClose={vi.fn()}>
        <div data-testid="drawer-content">Content</div>
      </Drawer>
    );
    expect(screen.queryByTestId('drawer-content')).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={vi.fn()}>
        <div data-testid="drawer-content">Content</div>
      </Drawer>
    );
    expect(screen.getByTestId('drawer-content')).toBeInTheDocument();
  });

  it('renders with title and close button', () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={vi.fn()} title="Test Title">
        <div data-testid="drawer-content">Content</div>
      </Drawer>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close drawer/i })).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    renderWithTheme(
      <Drawer isOpen={true} onClose={onClose} title="Test">
        Content
      </Drawer>
    );

    await userEvent.click(screen.getByRole('button', { name: /close drawer/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders footer when provided', () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={vi.fn()} footer={<button type="button">Action</button>}>
        Content
      </Drawer>
    );
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument();
  });

  it('has correct aria attributes on dialog', () => {
    renderWithTheme(
      <Drawer isOpen={true} onClose={vi.fn()} title="Test Title">
        Content
      </Drawer>
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <Drawer isOpen={true} onClose={vi.fn()} title="Test">
        Content
      </Drawer>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
