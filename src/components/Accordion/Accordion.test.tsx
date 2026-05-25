import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Accordion } from './Accordion';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const DEFAULT_ITEMS = [
  { key: '1', label: 'Section 1', children: 'Content 1' },
  { key: '2', label: 'Section 2', children: 'Content 2' },
];

describe('Accordion', () => {
  it('renders accordion items with buttons', () => {
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    expect(screen.getByRole('button', { name: /section 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /section 2/i })).toBeInTheDocument();
  });

  it('toggles panel content when header is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);

    const section1Button = screen.getByRole('button', { name: /section 1/i });
    
    // Initially collapsed
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

    // Expand
    await user.click(section1Button);
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    // Collapse
    await user.click(section1Button);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('allows multiple panels open when allowMultiple is true', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} allowMultiple />);

    await user.click(screen.getByRole('button', { name: /section 1/i }));
    await user.click(screen.getByRole('button', { name: /section 2/i }));

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('calls onChange when panel is toggled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} onChange={onChange} />);

    await user.click(screen.getByRole('button', { name: /section 1/i }));
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
