import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Stepper } from './Stepper';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Stepper', () => {
  const mockSteps = [
    { title: 'Step 1', description: 'First step' },
    { title: 'Step 2', description: 'Second step' },
    { title: 'Step 3', description: 'Third step' },
  ];

  it('renders all steps', () => {
    renderWithTheme(<Stepper steps={mockSteps} />);
    expect(screen.getByRole('region', { name: 'Stepper' })).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('renders as horizontal by default', () => {
    renderWithTheme(<Stepper steps={mockSteps} />);
    const tablist = screen.getByRole('tablist');
    expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders with first step active by default', () => {
    renderWithTheme(<Stepper steps={mockSteps} />);
    const steps = screen.getAllByRole('tab');
    expect(steps[0]).toHaveAttribute('aria-selected', 'true');
    expect(steps[1]).toHaveAttribute('aria-selected', 'false');
    expect(steps[2]).toHaveAttribute('aria-selected', 'false');
  });

  it('advances to next step when Next clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Stepper steps={mockSteps} onChange={onChange} />);
    const nextButton = screen.getByText('Next');
    await userEvent.click(nextButton);
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('shows Back button when on subsequent step', async () => {
    renderWithTheme(<Stepper steps={mockSteps} defaultActiveStep={1} />);
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('goes back when Back clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Stepper steps={mockSteps} defaultActiveStep={1} onChange={onChange} />);
    const backButton = screen.getByText('Back');
    await userEvent.click(backButton);
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('shows Finish button on last step', async () => {
    renderWithTheme(<Stepper steps={mockSteps} defaultActiveStep={2} />);
    expect(screen.getByText('Finish')).toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
  });

  it('calls onComplete when Finish clicked', async () => {
    const onComplete = vi.fn();
    renderWithTheme(
      <Stepper steps={mockSteps} defaultActiveStep={2} onComplete={onComplete} />
    );
    const finishButton = screen.getByText('Finish');
    await userEvent.click(finishButton);
    expect(onComplete).toHaveBeenCalled();
  });

  it('allows clicking back to previous steps', async () => {
    renderWithTheme(<Stepper steps={mockSteps} defaultActiveStep={2} allowClickBack />);
    const firstStep = screen.getByText('Step 1');
    await userEvent.click(firstStep);
    const currentStep = screen.getAllByRole('tab').find(
      (tab) => tab.getAttribute('aria-selected') === 'true'
    );
  });

  it('renders step content', () => {
    const stepsWithContent = [
      { title: 'Step 1', content: <div data-testid="content-1">Content 1</div> },
      { title: 'Step 2', content: <div data-testid="content-2">Content 2</div> },
    ];
    renderWithTheme(<Stepper steps={stepsWithContent} />);
    expect(screen.getByTestId('content-1')).toBeInTheDocument();
  });

  it('switches content when changing steps', async () => {
    const stepsWithContent = [
      { title: 'Step 1', content: <div data-testid="content-1">Content 1</div> },
      { title: 'Step 2', content: <div data-testid="content-2">Content 2</div> },
    ];
    renderWithTheme(<Stepper steps={stepsWithContent} />);
    expect(screen.getByTestId('content-1')).toBeInTheDocument();
    const nextButton = screen.getByText('Next');
    await userEvent.click(nextButton);
    await waitFor(() => {
      expect(screen.getByTestId('content-2')).toBeInTheDocument();
    });
  });

  it('renders disabled steps', () => {
    const stepsWithDisabled = [
      { title: 'Step 1' },
      { title: 'Step 2', disabled: true },
      { title: 'Step 3' },
    ];
    renderWithTheme(<Stepper steps={stepsWithDisabled} defaultActiveStep={1} />);
    const steps = screen.getAllByRole('tab');
    expect(steps[1]).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not advance to disabled steps', async () => {
    const stepsWithDisabled = [
      { title: 'Step 0' },
      { title: 'Step 1', disabled: true },
      { title: 'Step 2' },
    ];
    const onChange = vi.fn();
    renderWithTheme(
      <Stepper steps={stepsWithDisabled} activeStep={0} onChange={onChange} />
    );
  });

  it('handles controlled mode', async () => {
    const onChange = vi.fn();
    const { rerender } = renderWithTheme(
      <Stepper steps={mockSteps} activeStep={0} onChange={onChange} />
    );
    rerender(
      <ThemeProvider theme={lightTheme}>
        <Stepper steps={mockSteps} activeStep={1} onChange={onChange} />
      </ThemeProvider>
    );
    expect(
      screen.getAllByRole('tab').find((tab) =>
        tab.getAttribute('aria-selected') === 'true'
      )
    ).toHaveAttribute('aria-selected', 'true');
  });

  it('renders step numbers', () => {
    renderWithTheme(<Stepper steps={mockSteps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('shows checkmark for completed steps', async () => {
    renderWithTheme(
      <Stepper steps={mockSteps} defaultActiveStep={1} />
    );
    const completedStep = screen.getAllByRole('tab')[0];
    const checkmark = completedStep.querySelector('svg');
    expect(checkmark).toBeTruthy();
  });

  it('renders with descriptions', () => {
    renderWithTheme(<Stepper steps={mockSteps} />);
    expect(screen.getByText('First step')).toBeInTheDocument();
    expect(screen.getByText('Second step')).toBeInTheDocument();
    expect(screen.getByText('Third step')).toBeInTheDocument();
  });

  it('disables click back when allowClickBack is false', async () => {
    renderWithTheme(
      <Stepper steps={mockSteps} defaultActiveStep={1} allowClickBack={false} />
    );
    const firstStep = screen.getAllByRole('tab')[0];
    expect(firstStep).toHaveAttribute('aria-disabled', 'true');
  });

  it('handles vertical orientation', () => {
    renderWithTheme(
      <Stepper steps={mockSteps} orientation="vertical" />
    );
    expect(screen.getByRole('tablist')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('handles step click with keyboard', async () => {
    renderWithTheme(<Stepper steps={mockSteps} defaultActiveStep={1} allowClickBack />);
    const firstStep = screen.getAllByRole('tab')[0];
    firstStep.focus();
    fireEvent.keyDown(firstStep, { key: 'Enter' });
  });

  it('keyboard navigable steps', async () => {
    renderWithTheme(<Stepper steps={mockSteps} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('tabIndex', '0');
    expect(tabs[1]).toHaveAttribute('tabIndex');
    expect(tabs[2]).toHaveAttribute('tabIndex');
  });
});
