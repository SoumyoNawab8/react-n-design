import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Segmented } from './Segmented';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Segmented', () => {
  const mockOptions = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
  ];

  it('renders all options', () => {
    renderWithTheme(<Segmented options={mockOptions} value="day" onChange={() => {}} />);
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Week')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
  });

  it('renders as tablist', () => {
    renderWithTheme(<Segmented options={mockOptions} value="day" onChange={() => {}} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders options as tabs', () => {
    renderWithTheme(<Segmented options={mockOptions} value="day" onChange={() => {}} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('marks current value as selected', () => {
    renderWithTheme(<Segmented options={mockOptions} value="week" onChange={() => {}} />);
    const selectedTab = screen.getByRole('tab', { selected: true });
    expect(selectedTab).toHaveTextContent('Week');
  });

  it('calls onChange when option clicked', async () => {
    const onChange = vi.fn();
    renderWithTheme(<Segmented options={mockOptions} value="day" onChange={onChange} />);
    const weekTab = screen.getByText('Week');
    await userEvent.click(weekTab);
    expect(onChange).toHaveBeenCalledWith('week');
  });

  it('renders disabled options', () => {
    const optionsWithDisabled = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week', disabled: true },
    ];
    renderWithTheme(<Segmented options={optionsWithDisabled} value="day" onChange={() => {}} />);
    const disabledTab = screen.getByRole('tab', { name: 'Week' });
    expect(disabledTab).toBeDisabled();
    expect(disabledTab).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onChange for disabled option', async () => {
    const onChange = vi.fn();
    const optionsWithDisabled = [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week', disabled: true },
    ];
    renderWithTheme(<Segmented options={optionsWithDisabled} value="day" onChange={onChange} />);
    const disabledTab = screen.getByText('Week');
    await userEvent.click(disabledTab);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders in small size', () => {
    renderWithTheme(
      <Segmented options={mockOptions} value="day" onChange={() => {}} size="small" />
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders in medium size', () => {
    renderWithTheme(
      <Segmented options={mockOptions} value="day" onChange={() => {}} size="medium" />
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders in large size', () => {
    renderWithTheme(
      <Segmented options={mockOptions} value="day" onChange={() => {}} size="large" />
    );
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders in block mode', () => {
    renderWithTheme(<Segmented options={mockOptions} value="day" onChange={() => {}} block />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders with complex labels', () => {
    const optionsWithComplexLabels = [
      { value: '1', label: <span data-testid="label-1">Option 1</span> },
      { value: '2', label: <span data-testid="label-2">Option 2</span> },
    ];
    renderWithTheme(<Segmented options={optionsWithComplexLabels} value="1" onChange={() => {}} />);
    expect(screen.getByTestId('label-1')).toBeInTheDocument();
    expect(screen.getByTestId('label-2')).toBeInTheDocument();
  });

  it('each tab has aria-selected attribute', () => {
    renderWithTheme(<Segmented options={mockOptions} value="day" onChange={() => {}} />);
    const tabs = screen.getAllByRole('tab');
    tabs.forEach((tab) => {
      expect(tab).toHaveAttribute('aria-selected');
    });
  });

  it('updates selected tab when value changes', () => {
    const { rerender } = render(
      <ThemeProvider theme={lightTheme}>
        <Segmented options={mockOptions} value="day" onChange={() => {}} />
      </ThemeProvider>
    );
    let selectedTab = screen.getByRole('tab', { selected: true });
    expect(selectedTab).toHaveTextContent('Day');

    rerender(
      <ThemeProvider theme={lightTheme}>
        <Segmented options={mockOptions} value="month" onChange={() => {}} />
      </ThemeProvider>
    );
    selectedTab = screen.getByRole('tab', { selected: true });
    expect(selectedTab).toHaveTextContent('Month');
  });

  it('renders with custom option values', () => {
    const optionsWithCustomValues = [
      { value: 'option-a', label: 'Option A' },
      { value: 'option-b', label: 'Option B' },
    ];
    renderWithTheme(
      <Segmented options={optionsWithCustomValues} value="option-a" onChange={() => {}} />
    );
    expect(screen.getByText('Option A')).toBeInTheDocument();
    expect(screen.getByText('Option B')).toBeInTheDocument();
  });

  it('calls onChange with correct value', async () => {
    const onChange = vi.fn();
    const options = [
      { value: 'v1', label: 'Value 1' },
      { value: 'v2', label: 'Value 2' },
    ];
    renderWithTheme(<Segmented options={options} value="v1" onChange={onChange} />);
    const tab = screen.getByText('Value 2');
    await userEvent.click(tab);
    expect(onChange).toHaveBeenCalledWith('v2');
  });

  it('renders with only one active tab', () => {
    renderWithTheme(<Segmented options={mockOptions} value="week" onChange={() => {}} />);
    const selectedTabs = screen.getAllByRole('tab', { selected: true });
    expect(selectedTabs).toHaveLength(1);
  });
});
