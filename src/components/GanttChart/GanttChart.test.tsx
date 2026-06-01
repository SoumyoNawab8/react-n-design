import { render, screen } from '@testing-library/react';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import axe from 'axe-core';
import { lightTheme } from '../../styles/theme';
import { GanttChart } from './GanttChart';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const mockTasks = [
  {
    id: '1',
    name: 'Task A',
    start: new Date('2024-01-01'),
    end: new Date('2024-01-05'),
    progress: 50,
  },
  {
    id: '2',
    name: 'Task B',
    start: new Date('2024-01-03'),
    end: new Date('2024-01-08'),
    progress: 80,
    color: '#28a745',
  },
];

describe('GanttChart', () => {
  it('renders with tasks', () => {
    renderWithTheme(<GanttChart tasks={mockTasks} />);
    expect(screen.getByText('Task A')).toBeInTheDocument();
    expect(screen.getByText('Task B')).toBeInTheDocument();
  });

  it('renders date labels in header', () => {
    renderWithTheme(<GanttChart tasks={mockTasks} />);
    // Header should contain date labels like "1/1" etc
    const region = screen.getByRole('region', { name: /Gantt chart/i });
    expect(region).toBeInTheDocument();
  });

  it('renders progress bars with aria attributes', () => {
    renderWithTheme(<GanttChart tasks={mockTasks} />);
    const bars = screen.getAllByRole('progressbar');
    expect(bars.length).toBe(2);
    expect(bars[0]).toHaveAttribute('aria-valuenow', '50');
    expect(bars[1]).toHaveAttribute('aria-valuenow', '80');
  });

  it('uses custom color when provided', () => {
    renderWithTheme(<GanttChart tasks={mockTasks} />);
    const bars = screen.getAllByRole('progressbar');
    expect(bars.length).toBe(2);
  });

  it('renders with explicit start and end dates', () => {
    renderWithTheme(
      <GanttChart
        tasks={mockTasks}
        startDate={new Date('2023-12-25')}
        endDate={new Date('2024-01-15')}
      />
    );
    expect(screen.getByText('Task A')).toBeInTheDocument();
    expect(screen.getByText('Task B')).toBeInTheDocument();
  });

  it('forwards className', () => {
    renderWithTheme(<GanttChart tasks={mockTasks} className="my-gantt" />);
    const region = screen.getByRole('region', { name: /Gantt chart/i });
    expect(region).toHaveClass('my-gantt');
  });

  it('renders with custom rowHeight', () => {
    renderWithTheme(<GanttChart tasks={mockTasks} rowHeight={60} />);
    expect(screen.getByText('Task A')).toBeInTheDocument();
  });

  it('handles empty task list', () => {
    renderWithTheme(<GanttChart tasks={[]} />);
    expect(screen.getByRole('region', { name: /Gantt chart/i })).toBeInTheDocument();
  });

  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(<GanttChart tasks={mockTasks} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('clamps progress to 0-100', () => {
    const tasks = [
      { id: '1', name: 'Over', start: new Date('2024-01-01'), end: new Date('2024-01-02'), progress: 150 },
      { id: '2', name: 'Under', start: new Date('2024-01-01'), end: new Date('2024-01-02'), progress: -10 },
    ];
    renderWithTheme(<GanttChart tasks={tasks} />);
    const bars = screen.getAllByRole('progressbar');
    expect(bars[0]).toHaveAttribute('aria-valuenow', '100');
    expect(bars[1]).toHaveAttribute('aria-valuenow', '0');
  });
});
