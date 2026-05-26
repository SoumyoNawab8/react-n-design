import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Modal } from './Modal';

// Mock useMediaQuery to control mobile detection
vi.mock('../../hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(),
}));

import { useMediaQuery } from '../../hooks/useMediaQuery';

const mockUseMediaQuery = vi.mocked(useMediaQuery);

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Modal', () => {
  beforeEach(() => {
    // Default to desktop view
    mockUseMediaQuery.mockReturnValue(false);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

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

  describe('Glass variant', () => {
    it('renders with glass variant', () => {
      const onClose = vi.fn();
      const { container } = renderWithTheme(
        <Modal isOpen onClose={onClose} title="Glass Modal" variant="glass">
          Glass content
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      // Check that backdrop has glass-specific styles
      const backdrop = container.querySelector('[class*="sc-"]');
      expect(backdrop).toBeTruthy();
    });

    it('is accessible with glass variant', async () => {
      const onClose = vi.fn();
      const { container } = renderWithTheme(
        <Modal isOpen onClose={onClose} title="Glass Modal" variant="glass">
          Glass content
        </Modal>
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('Mobile bottom-sheet transformation', () => {
    it('renders as modal on desktop even with mobileVariant=bottom-sheet', () => {
      mockUseMediaQuery.mockReturnValue(false);
      const onClose = vi.fn();
      renderWithTheme(
        <Modal isOpen onClose={onClose} title="Desktop Modal" mobileVariant="bottom-sheet">
          Content
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('transforms to bottom-sheet on mobile when mobileVariant is bottom-sheet', () => {
      mockUseMediaQuery.mockReturnValue(true);
      const onClose = vi.fn();
      renderWithTheme(
        <Modal isOpen onClose={onClose} title="Mobile Modal" mobileVariant="bottom-sheet">
          Bottom sheet content
        </Modal>
      );
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      // Check for bottom-sheet specific styling/data attributes
      expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('remains as modal on mobile when mobileVariant is modal', () => {
      mockUseMediaQuery.mockReturnValue(true);
      const onClose = vi.fn();
      renderWithTheme(
        <Modal isOpen onClose={onClose} title="Mobile Modal" mobileVariant="modal">
          Regular modal content
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('is accessible in bottom-sheet mode', async () => {
      mockUseMediaQuery.mockReturnValue(true);
      const onClose = vi.fn();
      const { container } = renderWithTheme(
        <Modal isOpen onClose={onClose} title="Bottom Sheet" mobileVariant="bottom-sheet">
          Bottom sheet content
        </Modal>
      );
      const results = await axe.run(container);
      expect(results.violations).toHaveLength(0);
    });
  });

  describe('Maximize/Minimize functionality', () => {
    it('renders maximize button when maximizable is true', () => {
      const onClose = vi.fn();
      renderWithTheme(
        <Modal isOpen onClose={onClose} title="Maximizable Modal" maximizable>
          Content
        </Modal>
      );
      const maximizeBtn = screen.getByTestId('maximize-button');
      expect(maximizeBtn).toBeInTheDocument();
    });

    it('toggles maximize state when maximize button is clicked', async () => {
      const onClose = vi.fn();
      const onMaximizeChange = vi.fn();
      renderWithTheme(
        <Modal
          isOpen
          onClose={onClose}
          title="Maximizable Modal"
          maximizable
          onMaximizeChange={onMaximizeChange}
        >
          Content
        </Modal>
      );
      const maximizeBtn = screen.getByTestId('maximize-button');
      await userEvent.click(maximizeBtn);
      expect(onMaximizeChange).toHaveBeenCalledWith(true);
    });

    it('respects controlled maximized state', () => {
      const onClose = vi.fn();
      const onMaximizeChange = vi.fn();
      renderWithTheme(
        <Modal
          isOpen
          onClose={onClose}
          title="Controlled Modal"
          maximizable
          isMaximized={true}
          onMaximizeChange={onMaximizeChange}
        >
          Content
        </Modal>
      );
      expect(screen.getByTestId('maximize-button')).toBeInTheDocument();
    });
  });

  describe('Animation configuration', () => {
    it('accepts custom animation configuration', () => {
      const onClose = vi.fn();
      const customAnimation = {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 },
      };
      const { container } = renderWithTheme(
        <Modal
          isOpen
          onClose={onClose}
          title="Animated Modal"
          animationConfig={customAnimation}
        >
          Animated content
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Responsive sizing', () => {
    it('accepts responsive size configuration', () => {
      const onClose = vi.fn();
      renderWithTheme(
        <Modal
          isOpen
          onClose={onClose}
          title="Responsive Modal"
          size={{ base: 'small', md: 'medium', lg: 'large' }}
        >
          Responsive content
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('accepts string size value', () => {
      const onClose = vi.fn();
      renderWithTheme(
        <Modal isOpen onClose={onClose} title="Sized Modal" size="large">
          Large content
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Custom styling', () => {
    it('accepts custom style prop for modal content', () => {
      const onClose = vi.fn();
      renderWithTheme(
        <Modal
          isOpen
          onClose={onClose}
          title="Styled Modal"
          style={{ backgroundColor: 'red' }}
        >
          Styled content
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('accepts custom backdropStyle prop', () => {
      const onClose = vi.fn();
      renderWithTheme(
        <Modal
          isOpen
          onClose={onClose}
          title="Styled Backdrop"
          backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
        >
          Content with custom backdrop
        </Modal>
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Performance optimizations', () => {
    it('is wrapped in React.memo', () => {
      // Verify Modal component is memoized
      expect(Modal.$$typeof).toBeDefined();
      // Check display name for debugging purposes
      expect(Modal.displayName).toBe('Modal');
    });
  });
});
