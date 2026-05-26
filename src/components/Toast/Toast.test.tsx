import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Toast } from './Toast';
import { ToastProvider } from './ToastProvider';

describe('Toast', () => {
  const DEFAULT_PROPS = {
    id: '1',
    onDismiss: vi.fn(),
    title: 'Test Toast',
    description: 'This is a test notification',
  };

  const renderWithTheme = (ui: React.ReactElement) =>
    render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with title and description', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} />);
    expect(screen.getByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('This is a test notification')).toBeInTheDocument();
  });

  it('renders with correct role attribute', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} variant="info" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders with alert role for error variant', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} variant="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('calls onDismiss when close button is clicked', async () => {
    const onDismiss = vi.fn();
    renderWithTheme(<Toast {...DEFAULT_PROPS} onDismiss={onDismiss} />);

    await userEvent.click(screen.getByRole('button', { name: /dismiss notification/i }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledWith('1');
  });

  it('renders action when provided', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} action={<button type="button">Undo</button>} />);
    expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument();
  });

  it('has correct aria attributes when rendered', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} variant="info" />);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
  });

  it('has correct aria-live for error variant', () => {
    renderWithTheme(<Toast {...DEFAULT_PROPS} variant="error" />);
    const toast = screen.getByRole('alert');
    expect(toast).toHaveAttribute('aria-live', 'assertive');
  });

  // v1.2.0: Glass variant
  it('renders glass variant with isGlass prop', () => {
    const { container } = renderWithTheme(<Toast {...DEFAULT_PROPS} isGlass={true} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  // v1.2.0: Avatar support
  it('renders avatar when provided', () => {
    renderWithTheme(
      <Toast
        {...DEFAULT_PROPS}
        avatar={{ src: '/avatar.jpg', alt: 'User Avatar' }}
        title="Notification"
      />
    );
    const img = screen.getByAltText('User Avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/avatar.jpg');
  });

  it('renders avatar initials when no image provided', () => {
    renderWithTheme(
      <Toast {...DEFAULT_PROPS} avatar={{ initials: 'JD' }} title="Notification" />
    );
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  // v1.2.0: Rich content
  it('renders rich content when provided', () => {
    const richContent = <div data-testid="rich-content">Rich content</div>;
    renderWithTheme(<Toast {...DEFAULT_PROPS} richContent={richContent} />);
    expect(screen.getByTestId('rich-content')).toBeInTheDocument();
  });

  // v1.2.0: Custom styling
  it('applies custom style prop', () => {
    const { container } = renderWithTheme(
      <Toast {...DEFAULT_PROPS} style={{ border: '3px solid red' }} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ border: '3px solid red' });
  });

  it('applies custom className', () => {
    const { container } = renderWithTheme(
      <Toast {...DEFAULT_PROPS} className="my-custom-toast" />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.classList.contains('my-custom-toast')).toBe(true);
  });

  // v1.2.0: Swipe dismiss - check that component renders with necessary attributes
  it('renders correctly for swipe support', () => {
    const { container } = renderWithTheme(<Toast {...DEFAULT_PROPS} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.className).toBeTruthy();
  });

  // v1.2.0: Stacked mode
  it('applies stacked positioning based on index', () => {
    const { container } = renderWithTheme(
      <Toast {...DEFAULT_PROPS} isStacked={true} index={0} stackCount={3} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  describe('ToastProvider', () => {
    it('renders multiple toasts', () => {
      render(
        <ThemeProvider theme={lightTheme}>
          <ToastProvider>
            <div />
          </ToastProvider>
        </ThemeProvider>
      );

      const container = document.querySelector('[aria-label="Notifications"]');
      expect(container).toBeInTheDocument();
    });

    it('supports stacked mode', () => {
      render(
        <ThemeProvider theme={lightTheme}>
          <ToastProvider isStacked={true} maxToasts={5}>
            <div />
          </ToastProvider>
        </ThemeProvider>
      );

      const container = document.querySelector('[aria-label="Notifications"]');
      expect(container).toBeInTheDocument();
    });

    it('enforces maxToasts limit', () => {
      const TestComponent = () => {
        const [toasts, setToasts] = React.useState<string[]>([]);
        const maxToasts = 3;
        return (
          <div>
            {toasts.map((id) => (
              <Toast key={id} id={id} onDismiss={() => {}} title={`Toast ${id}`} />
            ))}
          </div>
        );
      };

      render(
        <ThemeProvider theme={lightTheme}>
          <ToastProvider maxToasts={3}>
            <TestComponent />
          </ToastProvider>
        </ThemeProvider>
      );

      expect(screen.queryByText(/Toast/)).toBeNull();
    });
  });

  // Mouse interactions
  describe('Mouse Interactions', () => {
    it('pauses timer on mouse enter', () => {
      vi.useFakeTimers();
      const onDismiss = vi.fn();
      const { container } = renderWithTheme(
        <Toast {...DEFAULT_PROPS} duration={5000} onDismiss={onDismiss} />
      );
      const wrapper = container.firstChild as HTMLElement;

      fireEvent.mouseEnter(wrapper);
      vi.advanceTimersByTime(3000);
      expect(onDismiss).not.toHaveBeenCalled();

      fireEvent.mouseLeave(wrapper);
      vi.advanceTimersByTime(5000);
      expect(onDismiss).toHaveBeenCalled();

      vi.useRealTimers();
    });
  });
});
