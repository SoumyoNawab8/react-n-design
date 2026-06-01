import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { HeatmapCalendar } from './HeatmapCalendar';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('HeatmapCalendar', () => {
  const sampleData = [
    { date: '2026-01-01', count: 0 },
    { date: '2026-01-02', count: 1 },
    { date: '2026-01-03', count: 3 },
    { date: '2026-01-04', count: 7 },
    { date: '2026-01-05', count: 12 },
  ];

  it('renders the calendar grid and is accessible', async () => {
    const { container } = renderWithTheme(
      <HeatmapCalendar data={sampleData} year={2026} />
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('renders tooltips showing date and count on cells', () => {
    renderWithTheme(<HeatmapCalendar data={sampleData} year={2026} />);
    const tooltip = screen.getByText('2026-01-01: 0 contributions');
    expect(tooltip).toBeInTheDocument();
  });

  it('renders month labels', () => {
    renderWithTheme(<HeatmapCalendar data={sampleData} year={2026} />);
    expect(screen.getByText('Jan')).toBeInTheDocument();
  });

  it('renders weekday labels', () => {
    renderWithTheme(<HeatmapCalendar data={sampleData} year={2026} />);
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    renderWithTheme(
      <HeatmapCalendar data={sampleData} year={2026} className="my-heatmap" />
    );
    const wrapper = screen.getByRole('img').parentElement?.parentElement;
    expect(wrapper).toHaveClass('my-heatmap');
  });

  it('renders with startWeekOnMonday false', () => {
    renderWithTheme(
      <HeatmapCalendar data={sampleData} year={2026} startWeekOnMonday={false} />
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('uses current year when year prop is omitted', () => {
    renderWithTheme(<HeatmapCalendar data={[]} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
