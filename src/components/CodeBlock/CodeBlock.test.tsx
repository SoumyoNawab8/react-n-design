import { act, fireEvent, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { CodeBlock } from './CodeBlock';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('CodeBlock', () => {
  it('renders code text inside a pre/code block', () => {
    const { container } = renderWithTheme(<CodeBlock code="const x = 1;" />);
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();
    expect(pre).toHaveTextContent('const x = 1;');
  });

  it('shows language label when language prop is provided', () => {
    renderWithTheme(<CodeBlock code="const x = 1;" language="typescript" />);
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('copy button exists and has accessible label', () => {
    renderWithTheme(<CodeBlock code="const x = 1;" />);
    const copyButton = screen.getByRole('button', {
      name: /copy code to clipboard/i,
    });
    expect(copyButton).toBeInTheDocument();
  });

  it('line numbers render when showLineNumbers={true}', () => {
    const code = 'line one\nline two\nline three';
    const { container } = renderWithTheme(<CodeBlock code={code} showLineNumbers />);
    const lineNumbers = container.querySelectorAll('[aria-hidden="true"]');
    expect(lineNumbers.length).toBeGreaterThanOrEqual(3);
    expect(lineNumbers[0]).toHaveTextContent('1');
    expect(lineNumbers[1]).toHaveTextContent('2');
    expect(lineNumbers[2]).toHaveTextContent('3');
  });

  it('syntax highlight placeholder exists (even if no highlighter library is integrated)', () => {
    const code = 'const x = 1;';
    const { container } = renderWithTheme(<CodeBlock code={code} language="javascript" />);
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();
    // The syntax highlighter wraps tokens in spans; verify at least one span exists inside pre
    const spans = pre?.querySelectorAll('span');
    expect(spans.length).toBeGreaterThan(0);
  });

  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(
      <CodeBlock code="const foo = 42;" language="js" showLineNumbers />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('copy button is keyboard accessible (Space/Enter)', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });

    renderWithTheme(<CodeBlock code="const x = 1;" />);
    const copyButton = screen.getByRole('button', {
      name: /copy code to clipboard/i,
    });

    // Enter key
    await act(async () => {
      fireEvent.keyDown(copyButton, { key: 'Enter', code: 'Enter' });
      await Promise.resolve();
    });
    expect(writeText).toHaveBeenCalledWith('const x = 1;');

    // Reset and test Space key
    writeText.mockClear();
    await act(async () => {
      fireEvent.keyDown(copyButton, { key: ' ', code: 'Space' });
      await Promise.resolve();
    });
    expect(writeText).toHaveBeenCalledWith('const x = 1;');
  });
});
