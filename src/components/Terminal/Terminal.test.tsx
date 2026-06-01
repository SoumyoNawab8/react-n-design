import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Terminal } from './Terminal';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Terminal', () => {
  it('renders and is accessible', async () => {
    const lines = [{ content: 'hello world', type: 'output' as const }];
    const { container } = renderWithTheme(<Terminal lines={lines} />);
    expect(screen.getByText('hello world')).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders title', () => {
    renderWithTheme(<Terminal lines={[]} title="My Shell" />);
    expect(screen.getByText('My Shell')).toBeInTheDocument();
  });

  it('renders command lines with $ prefix', () => {
    renderWithTheme(<Terminal lines={[{ content: 'npm install', type: 'command' }]} />);
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('npm install')).toBeInTheDocument();
  });

  it('renders error lines', () => {
    renderWithTheme(<Terminal lines={[{ content: 'Error!', type: 'error' }]} />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it('renders info lines', () => {
    renderWithTheme(<Terminal lines={[{ content: 'Info text', type: 'info' }]} />);
    expect(screen.getByText('Info text')).toBeInTheDocument();
  });

  it('shows timestamps when showTimestamps is true', () => {
    renderWithTheme(
      <Terminal lines={[{ content: 'test', timestamp: '10:00:00' }]} showTimestamps />
    );
    expect(screen.getByText('10:00:00')).toBeInTheDocument();
  });

  it('does not show timestamps by default', () => {
    renderWithTheme(<Terminal lines={[{ content: 'test', timestamp: '10:00:00' }]} />);
    expect(screen.queryByText('10:00:00')).not.toBeInTheDocument();
  });

  it('calls copy to clipboard when copy button is clicked', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    renderWithTheme(<Terminal lines={[{ content: 'line1' }, { content: 'line2' }]} />);
    const copyButton = screen.getByRole('button', { name: /copy terminal output/i });
    await userEvent.click(copyButton);
    expect(writeText).toHaveBeenCalledWith('line1\nline2');
  });

  it('applies maxHeight to content area', () => {
    renderWithTheme(<Terminal lines={[]} maxHeight="200px" />);
    const content = screen.getByTestId('terminal-content');
    expect(content).toHaveStyle({ maxHeight: '200px' });
  });

  it('forwards className', () => {
    renderWithTheme(<Terminal lines={[]} className="my-terminal" />);
    expect(screen.getByTestId('terminal')).toHaveClass('my-terminal');
  });
});
