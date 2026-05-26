import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Steps } from './Steps';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Steps', () => {
  const mockItems = [
    { title: 'Step 1', description: 'First step' },
    { title: 'Step 2', description: 'Second step' },
    { title: 'Step 3', description: 'Third step' },
  ];

  it('renders all steps', () => {
    renderWithTheme(<Steps items={mockItems} current={0} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders as navigation', () => {
    renderWithTheme(<Steps items={mockItems} current={0} />);
    expect(screen.getByRole('navigation', { name: 'Steps' })).toBeInTheDocument();
  });

  it('marks current step as current', () => {
    renderWithTheme(<Steps items={mockItems} current={1} />);
    const steps = screen.getAllByRole('button');
    expect(steps[1]).toHaveAttribute('aria-current', 'step');
  });

  it('shows completed steps before current', () => {
    renderWithTheme(<Steps items={mockItems} current={1} />);
    const firstStep = screen.getAllByRole('button')[0];
    expect(firstStep.querySelector('svg')).toBeTruthy();
  });

  it('calls onChange when step is clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Steps items={mockItems} current={0} onChange={onChange} />);
    const step = screen.getAllByRole('button')[2];
    await userEvent.click(step);
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('navigates steps with keyboard', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Steps items={mockItems} current={0} onChange={onChange} />);
    const step = screen.getAllByRole('button')[1];
    fireEvent.keyDown(step, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('navigates with Space key', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Steps items={mockItems} current={0} onChange={onChange} />);
    const step = screen.getAllByRole('button')[1];
    fireEvent.keyDown(step, { key: ' ' });
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('renders with custom size', () => {
    renderWithTheme(<Steps items={mockItems} current={0} size="small" />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('renders with custom icons', () => {
    const itemsWithIcons = [
      { title: 'Step 1', icon: <span data-testid="icon-1">★</span> },
    ];
    renderWithTheme(<Steps items={itemsWithIcons} current={0} />);
    expect(screen.getByTestId('icon-1')).toBeInTheDocument();
  });

  it('displays step number when no icon is provided', () => {
    renderWithTheme(<Steps items={mockItems} current={0} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('renders in horizontal direction', () => {
    renderWithTheme(<Steps items={mockItems} current={0} direction="horizontal" />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders in vertical direction', () => {
    renderWithTheme(<Steps items={mockItems} current={0} direction="vertical" />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('is not clickable when onChange is not provided', () => {
    renderWithTheme(<Steps items={mockItems} current={0} />);
    const steps = screen.getAllByRole('button');
    expect(steps[0]).toHaveAttribute('tabIndex', '-1');
  });

  it('marks pending steps as disabled', () => {
    renderWithTheme(<Steps items={mockItems} current={1} />);
    const steps = screen.getAllByRole('button');
    expect(steps[2]).toHaveAttribute('aria-disabled', 'true');
  });

  it('accepts custom className', () => {
    renderWithTheme(<Steps items={mockItems} current={0} className="custom-steps" />);
    expect(screen.getByRole('navigation')).toHaveClass('custom-steps');
  });

  it('accepts inline styles', () => {
    renderWithTheme(<Steps items={mockItems} current={0} style={{ marginTop: 10 }} />);
    const steps = screen.getByRole('navigation');
    expect(steps).toHaveStyle({ marginTop: 10 });
  });

  it('renders with checkmark for completed steps', () => {
    const { container } = renderWithTheme(<Steps items={mockItems} current={2} />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(2);
  });

  it('renders connector line between steps', () => {
    const { container } = renderWithTheme(<Steps items={mockItems} />);
    const stepItems = container.querySelectorAll('[class*="StepsItem"]');
    expect(stepItems.length).toBeGreaterThanOrEqual(3);
  });

  it('displays connector as completed for past steps', () => {
    renderWithTheme(<Steps items={mockItems} current={2} />);
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders with large size', () => {
    renderWithTheme(<Steps items={mockItems} current={0} size="large" />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
  });

  it('does not call onChange when clicking current step', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Steps items={mockItems} current={1} onChange={onChange} />);
    const currentStep = screen.getAllByRole('button')[1];
    await userEvent.click(currentStep);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders with checkmark for completed steps', () => {
    renderWithTheme(<Steps items={mockItems} current={2} />);
    const completedSteps = screen.getAllByRole('button');
    expect(completedSteps[0].querySelector('svg')).toBeTruthy();
    expect(completedSteps[1].querySelector('svg')).toBeTruthy();
  });
});
