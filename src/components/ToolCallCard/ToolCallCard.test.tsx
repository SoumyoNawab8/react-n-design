import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { ToolCallCard } from './ToolCallCard';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('ToolCallCard', () => {
  it('renders the tool name', () => {
    renderWithTheme(<ToolCallCard toolName="Search" status="loading" />);
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('shows loading spinner when status is loading', () => {
    const { container } = renderWithTheme(
      <ToolCallCard toolName="Calculator" status="loading" />
    );
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('shows check icon when status is success', () => {
    renderWithTheme(<ToolCallCard toolName="API" status="success" />);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('shows error icon and message when status is error', () => {
    renderWithTheme(
      <ToolCallCard
        toolName="Database"
        status="error"
        errorMessage="Connection timeout"
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Connection timeout');
    expect(screen.getByText('Connection timeout')).toBeInTheDocument();
  });

  it('renders args in all states', () => {
    renderWithTheme(
      <ToolCallCard
        toolName="Search"
        status="loading"
        args={{ query: 'react components', limit: 10 }}
      />
    );
    expect(screen.getByText(/query/i)).toBeInTheDocument();
    expect(screen.getByText(/limit/i)).toBeInTheDocument();
  });

  it('renders result in success state', () => {
    renderWithTheme(
      <ToolCallCard
        toolName="Calculator"
        status="success"
        result="42"
      />
    );
    expect(screen.getByText('Result')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders duration when provided', () => {
    renderWithTheme(
      <ToolCallCard toolName="API" status="loading" durationMs={1250} />
    );
    expect(screen.getByLabelText(/duration: 1\.3s/i)).toBeInTheDocument();
  });

  it('renders custom toolIcon when provided', () => {
    renderWithTheme(
      <ToolCallCard toolName="Custom" status="loading" toolIcon={<span data-testid="custom-icon">🔧</span>} />
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('toggles args collapse in success state', async () => {
    renderWithTheme(
      <ToolCallCard
        toolName="Search"
        status="success"
        args={{ q: 'test' }}
      />
    );

    const toggle = screen.getByRole('button', { name: /expand arguments/i });
    expect(toggle).toBeInTheDocument();

    await userEvent.click(toggle);
    expect(screen.getByRole('button', { name: /collapse arguments/i })).toBeInTheDocument();
    expect(screen.getByText(/"q"/)).toBeInTheDocument();
  });

  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(
      <ToolCallCard
        toolName="Accessible Tool"
        status="success"
        args={{ key: 'value' }}
        result="Done"
      />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('passes accessibility audit in error state', async () => {
    const { container } = renderWithTheme(
      <ToolCallCard
        toolName="Error Tool"
        status="error"
        errorMessage="Something went wrong"
        args={{ key: 'value' }}
      />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('passes accessibility audit in loading state', async () => {
    const { container } = renderWithTheme(
      <ToolCallCard
        toolName="Loading Tool"
        status="loading"
        durationMs={500}
        args={{ key: 'value' }}
      />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
