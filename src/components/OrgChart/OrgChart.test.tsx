import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { OrgChart } from './OrgChart';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const sampleRoot = {
  id: '1',
  label: 'CEO',
  role: 'Chief Executive Officer',
  children: [
    {
      id: '2',
      label: 'CTO',
      role: 'Chief Technology Officer',
      children: [
        { id: '4', label: 'Dev Lead' },
        { id: '5', label: 'Designer' },
      ],
    },
    {
      id: '3',
      label: 'CFO',
      role: 'Chief Financial Officer',
    },
  ],
};

describe('OrgChart', () => {
  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(<OrgChart root={sampleRoot} />);
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('CTO')).toBeInTheDocument();
    expect(screen.getByText('CFO')).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders root node label and role', () => {
    renderWithTheme(<OrgChart root={sampleRoot} />);
    expect(screen.getByText('CEO')).toBeInTheDocument();
    expect(screen.getByText('Chief Executive Officer')).toBeInTheDocument();
  });

  it('renders children nodes', () => {
    renderWithTheme(<OrgChart root={sampleRoot} />);
    expect(screen.getByText('CTO')).toBeInTheDocument();
    expect(screen.getByText('CFO')).toBeInTheDocument();
  });

  it('renders grandchildren nodes', () => {
    renderWithTheme(<OrgChart root={sampleRoot} />);
    expect(screen.getByText('Dev Lead')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  it('calls onNodeClick when a node is clicked', async () => {
    const handleClick = vi.fn();
    renderWithTheme(<OrgChart root={sampleRoot} onNodeClick={handleClick} />);
    await userEvent.click(screen.getByText('CTO'));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(expect.objectContaining({ id: '2', label: 'CTO' }));
  });

  it('calls onNodeClick when Enter is pressed', async () => {
    const handleClick = vi.fn();
    renderWithTheme(<OrgChart root={sampleRoot} onNodeClick={handleClick} />);
    const node = screen.getByText('CFO').closest('button');
    if (node) {
      node.focus();
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalled();
    }
  });

  it('calls onNodeClick when Space is pressed', async () => {
    const handleClick = vi.fn();
    renderWithTheme(<OrgChart root={sampleRoot} onNodeClick={handleClick} />);
    const node = screen.getByText('CFO').closest('button');
    if (node) {
      node.focus();
      await userEvent.keyboard(' ');
      expect(handleClick).toHaveBeenCalled();
    }
  });

  it('renders avatar when provided', () => {
    const rootWithAvatar = {
      id: '1',
      label: 'User',
      avatar: 'https://example.com/avatar.png',
    };
    renderWithTheme(<OrgChart root={rootWithAvatar} />);
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });

  it('renders placeholder avatar when no avatar is provided', () => {
    renderWithTheme(<OrgChart root={{ id: '1', label: 'Alice' }} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('forwards className', () => {
    renderWithTheme(<OrgChart root={sampleRoot} className="my-org" />);
    expect(screen.getByTestId('org-chart')).toHaveClass('my-org');
  });

  it('renders nodes as buttons for keyboard navigation', () => {
    renderWithTheme(<OrgChart root={sampleRoot} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('has aria-label on node buttons', () => {
    renderWithTheme(<OrgChart root={sampleRoot} />);
    expect(screen.getByLabelText(/CEO/)).toBeInTheDocument();
  });
});
