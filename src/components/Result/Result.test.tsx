import { render, screen } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it } from 'vitest';
import { ThemeContextProvider } from '../../context/ThemeContext';
import { Result } from './Result';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeContextProvider defaultTheme="light">{component}</ThemeContextProvider>);
};

describe('Result', () => {
  it('renders with title', () => {
    renderWithTheme(<Result title="Success!" status="success" />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('renders with subtitle', () => {
    renderWithTheme(
      <Result title="Operation Complete" subTitle="Your action was successful" status="success" />
    );
    expect(screen.getByText('Your action was successful')).toBeInTheDocument();
  });

  it('renders with extra content', () => {
    renderWithTheme(<Result title="Not Found" status="404" extra={<button>Go Home</button>} />);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('has role status', () => {
    renderWithTheme(<Result title="Info" status="info" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders all status types', () => {
    const statuses: Array<'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'> = [
      'success',
      'error',
      'info',
      'warning',
      '404',
      '403',
      '500',
    ];

    statuses.forEach((status) => {
      const { unmount } = renderWithTheme(<Result title={status} status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
      unmount();
    });
  });
});
