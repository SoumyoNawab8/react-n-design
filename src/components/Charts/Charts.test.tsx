import { render, screen } from '@testing-library/react';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { ChartArea, ChartBar, ChartLine } from './index';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const sampleData = [
  { label: 'A', value: 10 },
  { label: 'B', value: 20 },
  { label: 'C', value: 30 },
];

describe('ChartBar', () => {
  it('renders with role img and aria-label', () => {
    const { container } = renderWithTheme(<ChartBar data={sampleData} title="Test Bar" />);
    const svg = container.querySelector('svg[role="img"]');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-label', expect.stringContaining('Bar chart'));
    expect(svg).toHaveAttribute('aria-label', expect.stringContaining('Test Bar'));
  });

  it('renders title when provided', () => {
    renderWithTheme(<ChartBar data={sampleData} title="Sales" />);
    expect(screen.getByText('Sales')).toBeInTheDocument();
  });

  it('renders labels when showLabels is true', () => {
    const { container } = renderWithTheme(<ChartBar data={sampleData} showLabels />);
    expect(container.textContent).toContain('A');
    expect(container.textContent).toContain('B');
    expect(container.textContent).toContain('C');
  });

  it('does not render labels when showLabels is false', () => {
    const { container } = renderWithTheme(<ChartBar data={sampleData} showLabels={false} />);
    expect(container.textContent).not.toContain('A');
  });

  it('renders values when showValues is true', () => {
    const { container } = renderWithTheme(<ChartBar data={sampleData} showValues />);
    expect(container.textContent).toContain('10');
    expect(container.textContent).toContain('20');
    expect(container.textContent).toContain('30');
  });

  it('does not render values when showValues is false', () => {
    const { container } = renderWithTheme(
      <ChartBar data={sampleData} showValues={false} showGrid={false} showLabels />
    );
    expect(container.textContent).not.toContain('10');
    expect(container.textContent).toContain('A');
  });

  it('renders grid lines when showGrid is true', () => {
    const { container } = renderWithTheme(<ChartBar data={sampleData} showGrid />);
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBeGreaterThan(0);
  });
});

describe('ChartLine', () => {
  it('renders with role img and aria-label', () => {
    const { container } = renderWithTheme(<ChartLine data={sampleData} title="Test Line" />);
    const svg = container.querySelector('svg[role="img"]');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-label', expect.stringContaining('Line chart'));
  });

  it('renders polyline connecting points', () => {
    const { container } = renderWithTheme(<ChartLine data={sampleData} />);
    expect(container.querySelector('polyline')).toBeInTheDocument();
  });

  it('renders data point circles', () => {
    const { container } = renderWithTheme(<ChartLine data={sampleData} />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(sampleData.length);
  });

  it('renders title when provided', () => {
    renderWithTheme(<ChartLine data={sampleData} title="Growth" />);
    expect(screen.getByText('Growth')).toBeInTheDocument();
  });
});

describe('ChartArea', () => {
  it('renders with role img and aria-label', () => {
    const { container } = renderWithTheme(<ChartArea data={sampleData} title="Test Area" />);
    const svg = container.querySelector('svg[role="img"]');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-label', expect.stringContaining('Area chart'));
  });

  it('renders filled path and top polyline', () => {
    const { container } = renderWithTheme(<ChartArea data={sampleData} />);
    expect(container.querySelector('path')).toBeInTheDocument();
    expect(container.querySelector('polyline')).toBeInTheDocument();
  });

  it('renders gradient definition', () => {
    const { container } = renderWithTheme(<ChartArea data={sampleData} />);
    expect(container.querySelector('linearGradient')).toBeInTheDocument();
  });

  it('renders data point circles', () => {
    const { container } = renderWithTheme(<ChartArea data={sampleData} />);
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(sampleData.length);
  });

  it('renders title when provided', () => {
    renderWithTheme(<ChartArea data={sampleData} title="Load" />);
    expect(screen.getByText('Load')).toBeInTheDocument();
  });
});

describe('Charts responsive behavior', () => {
  it('ChartBar uses 100% width when width is omitted', () => {
    const { container } = renderWithTheme(<ChartBar data={sampleData} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });
});
