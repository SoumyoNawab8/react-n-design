import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { Collapsible } from './Collapsible';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Collapsible', () => {
  it('renders trigger and hidden content when closed', () => {
    renderWithTheme(
      <Collapsible trigger="Open">
        <div>Hidden content</div>
      </Collapsible>
    );
    expect(screen.getByRole('button', { name: /open/i })).toBeInTheDocument();
    const content = screen.getByText(/hidden content/i).closest('[aria-hidden]');
    expect(content).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows content when trigger is clicked', async () => {
    renderWithTheme(
      <Collapsible trigger="Open">
        <div>Hidden content</div>
      </Collapsible>
    );
    const trigger = screen.getByRole('button', { name: /open/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const content = screen.getByText(/hidden content/i).closest('[aria-hidden]');
    expect(content).toHaveAttribute('aria-hidden', 'false');
  });

  it('hides content when trigger is clicked again', async () => {
    renderWithTheme(
      <Collapsible trigger="Open">
        <div>Hidden content</div>
      </Collapsible>
    );
    const trigger = screen.getByRole('button', { name: /open/i });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    const content = screen.getByText(/hidden content/i).closest('[aria-hidden]');
    expect(content).toHaveAttribute('aria-hidden', 'true');
  });

  it('respects defaultOpen prop', () => {
    renderWithTheme(
      <Collapsible trigger="Open" defaultOpen={true}>
        <div>Hidden content</div>
      </Collapsible>
    );
    const trigger = screen.getByRole('button', { name: /open/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const content = screen.getByText(/hidden content/i).closest('[aria-hidden]');
    expect(content).toHaveAttribute('aria-hidden', 'false');
  });

  it('unmountOnExit: content is removed from DOM when closed', async () => {
    renderWithTheme(
      <Collapsible trigger="Open" unmountOnExit={true}>
        <div data-testid="collapsible-content">Hidden content</div>
      </Collapsible>
    );
    const trigger = screen.getByRole('button', { name: /open/i });
    expect(screen.queryByTestId('collapsible-content')).not.toBeInTheDocument();
    await userEvent.click(trigger);
    expect(screen.getByTestId('collapsible-content')).toBeInTheDocument();
    await userEvent.click(trigger);
    expect(screen.queryByTestId('collapsible-content')).not.toBeInTheDocument();
  });

  it('trigger has aria-expanded and aria-controls', async () => {
    renderWithTheme(
      <Collapsible trigger="Open">
        <div>Hidden content</div>
      </Collapsible>
    );
    const trigger = screen.getByRole('button', { name: /open/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls');
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('content has aria-hidden when closed', () => {
    renderWithTheme(
      <Collapsible trigger="Open">
        <div>Hidden content</div>
      </Collapsible>
    );
    const content = screen.getByText(/hidden content/i).closest('[aria-hidden]');
    expect(content).toHaveAttribute('aria-hidden', 'true');
  });

  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(
      <Collapsible trigger="Open" defaultOpen={true}>
        <div>Hidden content</div>
      </Collapsible>
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('calls onOpenChange when toggled', async () => {
    const onOpenChange = vi.fn();
    renderWithTheme(
      <Collapsible trigger="Open" onOpenChange={onOpenChange}>
        <div>Hidden content</div>
      </Collapsible>
    );
    const trigger = screen.getByRole('button', { name: /open/i });
    await userEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(true);
    await userEvent.click(trigger);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
