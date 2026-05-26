import { render, screen } from '@testing-library/react';
import type React from 'react';
import { describe, expect, it } from 'vitest';
import { ThemeContextProvider } from '../../context/ThemeContext';
import { Statistic } from './Statistic';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeContextProvider defaultTheme="light">{component}</ThemeContextProvider>);
};

describe('Statistic', () => {
  it('renders with title and value', () => {
    renderWithTheme(<Statistic title="Users" value={1000} />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('1000')).toBeInTheDocument();
  });

  it('renders with prefix', () => {
    renderWithTheme(<Statistic title="Revenue" value={50000} prefix="$" />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('50000')).toBeInTheDocument();
  });

  it('renders with suffix', () => {
    renderWithTheme(<Statistic title="Growth" value={15} suffix="%" />);
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
  });

  it('formats number with precision', () => {
    renderWithTheme(<Statistic title="Rate" value={Math.PI} precision={2} />);
    expect(screen.getByText('3.14')).toBeInTheDocument();
  });

  it('renders trend up indicator', () => {
    renderWithTheme(<Statistic title="Growth" value={10} trend="up" />);
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders trend down indicator', () => {
    renderWithTheme(<Statistic title="Decline" value={-5} trend="down" />);
    expect(screen.getByText('-5')).toBeInTheDocument();
  });

  it('accepts ReactNode as value', () => {
    renderWithTheme(<Statistic title="Custom" value={<span data-testid="custom">Custom</span>} />);
    expect(screen.getByTestId('custom')).toBeInTheDocument();
  });
});
