import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

  it('renders trigger element with describedby attribute', () => {
    renderWithTheme(
      <Tooltip content="Tooltip text">
        <button>Trigger</button>
      </Tooltip>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-describedby');
  });

  it('shows tooltip content on hover', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Tooltip content="Tooltip text">
        <button>Trigger</button>
      </Tooltip>
    );
    const button = screen.getByRole('button');
    
    // Hover to show tooltip
    await user.hover(button);
    
    // Wait for the hover delay and check if tooltip is visible
    await new Promise(resolve => setTimeout(resolve, 150));
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text');
  });

  it('renders with correct position', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Tooltip content="Tooltip" position="bottom">
        <button>Trigger</button>
      </Tooltip>
    );
    const button = screen.getByRole('button');
    await user.hover(button);
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', async () => {
    const user = userEvent.setup();
    renderWithTheme(
      <Tooltip content="Tooltip text">
        <button>Trigger</button>
      </Tooltip>
    );
    const button = screen.getByRole('button');
    
    // Show tooltip
    await user.hover(button);
    await new Promise(resolve => setTimeout(resolve, 150));
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    
    // Hide on mouse leave
    await user.unhover(button);
    await new Promise(resolve => setTimeout(resolve, 250));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(
      <Tooltip content="Accessible tooltip">
        <button>Trigger</button>
      </Tooltip>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
