import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { KanbanBoard } from './KanbanBoard';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const defaultColumns = [
  {
    id: 'col-1',
    title: 'To Do',
    tasks: [
      { id: 't1', title: 'Task 1', description: 'Desc 1', tags: ['bug'] },
      { id: 't2', title: 'Task 2' },
    ],
  },
  {
    id: 'col-2',
    title: 'In Progress',
    tasks: [{ id: 't3', title: 'Task 3', tags: ['feature'] }],
  },
];

describe('KanbanBoard', () => {
  it('renders columns and tasks', () => {
    renderWithTheme(<KanbanBoard columns={defaultColumns} onChange={() => {}} />);
    expect(screen.getByText('To Do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getByText('Task 3')).toBeInTheDocument();
  });

  it('shows task counts in column headers', () => {
    renderWithTheme(<KanbanBoard columns={defaultColumns} onChange={() => {}} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('calls onChange when moving a task down', async () => {
    const handleChange = vi.fn();
    renderWithTheme(<KanbanBoard columns={defaultColumns} onChange={handleChange} />);
    const moveDownButton = screen.getByLabelText('Move Task 1 down');
    await userEvent.click(moveDownButton);
    expect(handleChange).toHaveBeenCalledTimes(1);
    const newColumns = handleChange.mock.calls[0][0];
    expect(newColumns[0].tasks[0].id).toBe('t2');
    expect(newColumns[0].tasks[1].id).toBe('t1');
  });

  it('calls onChange when moving a task up', async () => {
    const handleChange = vi.fn();
    renderWithTheme(<KanbanBoard columns={defaultColumns} onChange={handleChange} />);
    const moveUpButton = screen.getByLabelText('Move Task 2 up');
    await userEvent.click(moveUpButton);
    expect(handleChange).toHaveBeenCalledTimes(1);
    const newColumns = handleChange.mock.calls[0][0];
    expect(newColumns[0].tasks[0].id).toBe('t2');
    expect(newColumns[0].tasks[1].id).toBe('t1');
  });

  it('disables up button for first task', () => {
    renderWithTheme(<KanbanBoard columns={defaultColumns} onChange={() => {}} />);
    expect(screen.getByLabelText('Move Task 1 up')).toBeDisabled();
  });

  it('disables down button for last task', () => {
    renderWithTheme(<KanbanBoard columns={defaultColumns} onChange={() => {}} />);
    expect(screen.getByLabelText('Move Task 2 down')).toBeDisabled();
  });

  it('calls onChange when moving task to next column', async () => {
    const handleChange = vi.fn();
    renderWithTheme(<KanbanBoard columns={defaultColumns} onChange={handleChange} />);
    const moveNextButton = screen.getByLabelText('Move Task 1 to next column');
    await userEvent.click(moveNextButton);
    expect(handleChange).toHaveBeenCalledTimes(1);
    const newColumns = handleChange.mock.calls[0][0];
    expect(newColumns[0].tasks).toHaveLength(1);
    expect(newColumns[1].tasks).toHaveLength(2);
    expect(newColumns[1].tasks[1].id).toBe('t1');
  });

  it('wraps around when moving from last column', async () => {
    const handleChange = vi.fn();
    renderWithTheme(<KanbanBoard columns={defaultColumns} onChange={handleChange} />);
    const moveNextButton = screen.getByLabelText('Move Task 3 to next column');
    await userEvent.click(moveNextButton);
    const newColumns = handleChange.mock.calls[0][0];
    expect(newColumns[1].tasks).toHaveLength(0);
    expect(newColumns[0].tasks).toHaveLength(3);
    expect(newColumns[0].tasks[2].id).toBe('t3');
  });

  it('renders tags when provided', () => {
    renderWithTheme(<KanbanBoard columns={defaultColumns} onChange={() => {}} />);
    expect(screen.getByText('bug')).toBeInTheDocument();
    expect(screen.getByText('feature')).toBeInTheDocument();
  });

  it('renders descriptions when provided', () => {
    renderWithTheme(<KanbanBoard columns={defaultColumns} onChange={() => {}} />);
    expect(screen.getByText('Desc 1')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    const { container } = renderWithTheme(
      <KanbanBoard columns={defaultColumns} onChange={() => {}} className="my-board" />
    );
    expect(container.firstChild).toHaveClass('my-board');
  });

  it('is accessible', async () => {
    const { container } = renderWithTheme(
      <KanbanBoard columns={defaultColumns} onChange={() => {}} />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
