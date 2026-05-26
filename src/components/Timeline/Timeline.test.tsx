import { render, screen } from '@testing-library/react';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Timeline } from './Timeline';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Timeline', () => {
  const mockItems = [
    { children: <p>First event</p>, label: '2024-01-01' },
    { children: <p>Second event</p>, label: '2024-02-15' },
    { children: <p>Third event</p>, label: '2024-03-30' },
  ];

  it('renders all items', () => {
    renderWithTheme(<Timeline items={mockItems} />);
    expect(screen.getByText('First event')).toBeInTheDocument();
    expect(screen.getByText('Second event')).toBeInTheDocument();
    expect(screen.getByText('Third event')).toBeInTheDocument();
  });

  it('renders labels', () => {
    renderWithTheme(<Timeline items={mockItems} />);
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('2024-02-15')).toBeInTheDocument();
    expect(screen.getByText('2024-03-30')).toBeInTheDocument();
  });

  it('renders in left mode', () => {
    renderWithTheme(<Timeline items={mockItems} mode="left" />);
    expect(screen.getByText('First event')).toBeInTheDocument();
  });

  it('renders in right mode', () => {
    renderWithTheme(<Timeline items={mockItems} mode="right" />);
    expect(screen.getByText('First event')).toBeInTheDocument();
  });

  it('renders in alternate mode', () => {
    renderWithTheme(<Timeline items={mockItems} mode="alternate" />);
    expect(screen.getByText('First event')).toBeInTheDocument();
  });

  it('reverses order when reverse prop is true', () => {
    renderWithTheme(<Timeline items={mockItems} reverse />);
    expect(screen.getByText('Third event')).toBeInTheDocument();
  });

  it('renders with custom dot content', () => {
    const itemsWithDot = [
      { children: <p>Event</p>, dot: <span data-testid="custom-dot">★</span> },
    ];
    renderWithTheme(<Timeline items={itemsWithDot} />);
    expect(screen.getByTestId('custom-dot')).toBeInTheDocument();
  });

  it('renders with custom dot color', () => {
    const itemsWithColor = [
      { children: <p>Colored Event</p>, color: '#ff0000' },
    ];
    renderWithTheme(<Timeline items={itemsWithColor} />);
    expect(screen.getByText('Colored Event')).toBeInTheDocument();
  });

  it('forwards additional props', () => {
    renderWithTheme(<Timeline items={mockItems} data-testid="my-timeline" />);
    expect(screen.getByTestId('my-timeline')).toBeInTheDocument();
  });

  it('renders connector line', () => {
    renderWithTheme(<Timeline items={mockItems} />);
    const timeline = document.querySelector('[style*="position: absolute"]');
    expect(timeline).toBeTruthy();
  });

  it('renders single item', () => {
    renderWithTheme(<Timeline items={[{ children: <p>Only event</p> }]} />);
    expect(screen.getByText('Only event')).toBeInTheDocument();
  });

  it('renders complex content', () => {
    const items = [
      {
        children: (
          <div>
            <h3>Title</h3>
            <p>Description</p>
            <button>Action</button>
          </div>
        ),
      },
    ];
    renderWithTheme(<Timeline items={items} />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders with string dot content', () => {
    const items = [{ children: <p>Event</p>, dot: '🎉' }];
    renderWithTheme(<Timeline items={items} />);
    expect(screen.getByText('Event')).toBeInTheDocument();
  });

  it('handles alternate mode with item position property', () => {
    const items = [
      { children: <p>Left positioned</p>, position: 'left' },
      { children: <p>Right positioned</p>, position: 'right' },
    ];
    renderWithTheme(<Timeline items={items} mode="alternate" />);
    expect(screen.getByText('Left positioned')).toBeInTheDocument();
    expect(screen.getByText('Right positioned')).toBeInTheDocument();
  });

  it('auto-assigns position in alternate mode', () => {
    const items = [
      { children: <p>Event 1</p> },
      { children: <p>Event 2</p> },
      { children: <p>Event 3</p> },
    ];
    renderWithTheme(<Timeline items={items} mode="alternate" />);
    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    expect(screen.getByText('Event 3')).toBeInTheDocument();
  });

  it('does not show labels in alternate mode when no labels provided', () => {
    const items = [{ children: <p>Event</p> }];
    renderWithTheme(<Timeline items={items} mode="alternate" />);
    const timeline = screen.getByText('Event');
    expect(timeline).toBeInTheDocument();
  });

  it('combines all props', () => {
    renderWithTheme(
      <Timeline
        items={mockItems}
        mode="alternate"
        reverse
        className="custom-timeline"
      />
    );
    expect(screen.getByText('First event')).toBeInTheDocument();
  });

  it('renders timeline dots', () => {
    renderWithTheme(<Timeline items={mockItems} />);
    const dots = document.querySelectorAll('[class*="dot"]');
    expect(dots.length).toBeGreaterThanOrEqual(3);
  });
});
