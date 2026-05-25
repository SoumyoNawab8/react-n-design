import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Tabs } from './Tabs';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const items = [
  { key: '1', label: 'Tab 1', children: 'Content 1' },
  { key: '2', label: 'Tab 2', children: 'Content 2' },
  { key: '3', label: 'Tab 3', children: 'Content 3', disabled: true },
];

describe('Tabs', () => {
  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(<Tabs items={items} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /tab 1/i })).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('switches tabs on click', async () => {
    const onTabChange = vi.fn();
    renderWithTheme(<Tabs items={items} onTabChange={onTabChange} />);
    await userEvent.click(screen.getByRole('tab', { name: /tab 2/i }));
    await waitFor(() => {
      expect(screen.getByRole('tabpanel')).toHaveTextContent(/content 2/i);
    });
    expect(onTabChange).toHaveBeenCalledWith('2');
  });

  it('does not switch disabled tabs', async () => {
    renderWithTheme(<Tabs items={items} />);
    await userEvent.click(screen.getByRole('tab', { name: /tab 3/i }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/content 1/i);
  });
});
