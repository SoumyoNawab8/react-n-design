import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Modal } from './Modal';
import axe from 'axe-core';
import { vi } from 'vitest';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Modal', () => {
  it('renders when open and is accessible', async () => {
    const onClose = vi.fn();
    const { container } = renderWithTheme(
      <Modal isOpen onClose={onClose} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('does not render when closed', () => {
    const onClose = vi.fn();
    renderWithTheme(
      <Modal isOpen={false} onClose={onClose}>
        Hidden content
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    renderWithTheme(
      <Modal isOpen onClose={onClose} title="Closeable">
        Content
      </Modal>
    );
    await userEvent.click(screen.getByRole('button', { name: /close modal/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
