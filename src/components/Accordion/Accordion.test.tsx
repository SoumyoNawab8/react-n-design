import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { describe, expect, it, vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Accordion } from './Accordion';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const DEFAULT_ITEMS = [
  { key: '1', label: 'Section 1', children: 'Content 1' },
  { key: '2', label: 'Section 2', children: 'Content 2' },
  { key: '3', label: 'Section 3', children: 'Content 3' },
];

describe('Accordion - Rendering', () => {
  it('renders accordion headers', () => {
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  it('renders with data-testid', () => {
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} data-testid="test-accordion" />);
    expect(screen.getByTestId('test-accordion')).toBeInTheDocument();
  });

  it('headers are buttons', () => {
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(3);
  });
});

describe('Accordion - Interaction', () => {
  it('toggles panel content when header is clicked', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);

    // Initially collapsed - no content visible
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

    // Expand section 1
    await user.click(screen.getByText('Section 1'));
    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    // Collapse section 1
    await user.click(screen.getByText('Section 1'));
    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
  });

  it('closes previous panel when opening new one in single mode', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);

    await user.click(screen.getByText('Section 1'));
    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Section 2'));
    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  it('allows multiple panels open when allowMultiple is true', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} allowMultiple />);

    await user.click(screen.getByText('Section 1'));
    await user.click(screen.getByText('Section 2'));

    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });
  });

  it('allows closing all panels when allowMultiple is true', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} allowMultiple defaultActiveKey={['1', '2']} />);

    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.getByText('Content 2')).toBeInTheDocument();
    });

    await user.click(screen.getByText('Section 1'));
    await user.click(screen.getByText('Section 2'));

    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
    });
  });
});

describe('Accordion - Callbacks', () => {
  it('calls onChange when panel is toggled', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} onChange={onChange} />);

    await user.click(screen.getByText('Section 1'));
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('calls onChange with array when allowMultiple is true', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} onChange={onChange} allowMultiple />);

    await user.click(screen.getByText('Section 1'));
    expect(onChange).toHaveBeenLastCalledWith(['1']);

    await user.click(screen.getByText('Section 2'));
    expect(onChange).toHaveBeenLastCalledWith(['1', '2']);
  });

  it('calls onChange with empty string when collapsing last panel', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} onChange={onChange} defaultActiveKey="1" />);

    await user.click(screen.getByText('Section 1'));
    expect(onChange).toHaveBeenCalledWith('');
  });
});

describe('Accordion - Disabled Items', () => {
  const itemsWithDisabled = [
    { key: '1', label: 'Enabled', children: 'Content 1' },
    { key: '2', label: 'Disabled', children: 'Content 2', disabled: true },
  ];

  it('does not expand disabled items on click', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={itemsWithDisabled} />);

    const disabledHeader = screen.getByText('Disabled').closest('button');
    expect(disabledHeader).toBeDisabled();
    
    await user.click(disabledHeader!);
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });
});

describe('Accordion - Controlled Mode', () => {
  it('renders controlled value', () => {
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} activeKey="1" />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('renders controlled array value', () => {
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} activeKey={['1', '2']} allowMultiple />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 3')).not.toBeInTheDocument();
  });
});

describe('Accordion - Default Values', () => {
  it('starts with defaultActiveKey expanded', () => {
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} defaultActiveKey="1" />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('starts with expanded array when allowMultiple', () => {
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} defaultActiveKey={['1', '2']} allowMultiple />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });
});

describe('Accordion - Keyboard Navigation', () => {
  it('supports Enter key to toggle', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    
    const firstHeader = screen.getByText('Section 1').closest('button');
    firstHeader?.focus();
    
    await user.keyboard('{Enter}');
    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
  });

  it('supports Space key to toggle', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    
    const firstHeader = screen.getByText('Section 1').closest('button');
    firstHeader?.focus();
    
    await act(async () => {
      await user.keyboard(' ');
    });
    await waitFor(() => {
      expect(screen.getByText('Content 1')).toBeInTheDocument();
    });
  });

  it('moves focus with ArrowDown', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();
    
    await user.keyboard('{ArrowDown}');
    expect(buttons[1]).toHaveFocus();
  });

  it('moves focus with ArrowUp', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    
    const buttons = screen.getAllByRole('button');
    buttons[2].focus();
    
    await user.keyboard('{ArrowUp}');
    expect(buttons[1]).toHaveFocus();
  });

  it('moves focus to first item with Home', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    
    const buttons = screen.getAllByRole('button');
    buttons[2].focus();
    
    await user.keyboard('{Home}');
    expect(buttons[0]).toHaveFocus();
  });

  it('moves focus to last item with End', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();
    
    await user.keyboard('{End}');
    expect(buttons[2]).toHaveFocus();
  });

  it('skips disabled items during keyboard navigation', async () => {
    const itemsWithDisabled = [
      { key: '1', label: 'First', children: 'Content 1' },
      { key: '2', label: 'Disabled', children: 'Content 2', disabled: true },
      { key: '3', label: 'Third', children: 'Content 3' },
    ];
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={itemsWithDisabled} />);
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3); // All three buttons are in DOM
    expect(buttons[0]).toHaveTextContent(/first/i);
    expect(buttons[1]).toHaveTextContent(/disabled/i);
    expect(buttons[2]).toHaveTextContent(/third/i);
    
    // First button focuses correctly
    buttons[0].focus();
    expect(buttons[0]).toHaveFocus();
    
    // ArrowDown from first enabled should go to Third (index 2)
    await user.keyboard('{ArrowDown}');
    // Due to the way keyboard navigation works with disabled items,
    // the focus should move correctly
    expect(document.activeElement).toBe(buttons[2]);
    expect(buttons[2]).toHaveTextContent(/third/i);
  });
});

describe('Accordion - ARIA Attributes', () => {
  it('has correct aria-expanded on headers', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    
    const firstHeader = screen.getByText('Section 1').closest('button');
    expect(firstHeader).toHaveAttribute('aria-expanded', 'false');
    
    await user.click(firstHeader!);
    await waitFor(() => {
      expect(firstHeader).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('panels have correct aria-labelledby', () => {
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} defaultActiveKey="1" />);
    const panel = screen.getByRole('region');
    expect(panel).toHaveAttribute('aria-labelledby', 'accordion-header-1');
  });

  it('headers have aria-controls pointing to panel', () => {
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    const firstHeader = screen.getByText('Section 1').closest('button');
    expect(firstHeader).toHaveAttribute('aria-controls', 'accordion-panel-1');
  });

  it('disabled items have aria-disabled', () => {
    const itemsWithDisabled = [
      { key: '1', label: 'Enabled', children: 'Content 1' },
      { key: '2', label: 'Disabled', children: 'Content 2', disabled: true },
    ];
    renderWithTheme(<Accordion items={itemsWithDisabled} />);
    
    const enabledButton = screen.getByText('Enabled').closest('button');
    const disabledButton = screen.getByText('Disabled').closest('button');
    
    expect(enabledButton).toHaveAttribute('aria-disabled', 'false');
    expect(disabledButton).toHaveAttribute('aria-disabled', 'true');
  });
});

describe('Accordion - Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations with expanded panel', async () => {
    const { container } = renderWithTheme(
      <Accordion items={DEFAULT_ITEMS} defaultActiveKey="1" />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations with multiple expanded', async () => {
    const { container } = renderWithTheme(
      <Accordion items={DEFAULT_ITEMS} defaultActiveKey={['1', '2']} allowMultiple />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('has no accessibility violations with disabled items', async () => {
    const itemsWithDisabled = [
      { key: '1', label: 'Enabled', children: 'Content 1' },
      { key: '2', label: 'Disabled', children: 'Content 2', disabled: true },
    ];
    const { container } = renderWithTheme(<Accordion items={itemsWithDisabled} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});

describe('Accordion - Custom Icons', () => {
  it('renders with custom icon', async () => {
    const itemsWithIcons = [
      { 
        key: '1', 
        label: 'Custom Icon', 
        children: 'Content 1',
        icon: <span data-testid="custom-icon">→</span>
      },
    ];
    renderWithTheme(<Accordion items={itemsWithIcons} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });
});

describe('Accordion - Edge Cases', () => {
  it('handles empty items array', () => {
    renderWithTheme(<Accordion items={[]} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('handles single item', () => {
    renderWithTheme(
      <Accordion items={[{ key: '1', label: 'Only', children: 'Content' }]} />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('circular navigation wraps from last to first', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    
    const buttons = screen.getAllByRole('button');
    buttons[2].focus();
    
    await user.keyboard('{ArrowDown}');
    expect(buttons[0]).toHaveFocus();
  });

  it('circular navigation wraps from first to last', async () => {
    const user = userEvent.setup();
    renderWithTheme(<Accordion items={DEFAULT_ITEMS} />);
    
    const buttons = screen.getAllByRole('button');
    buttons[0].focus();
    
    await user.keyboard('{ArrowUp}');
    expect(buttons[2]).toHaveFocus();
  });
});
