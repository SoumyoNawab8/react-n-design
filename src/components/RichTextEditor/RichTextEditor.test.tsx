import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import axe from 'axe-core';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { RichTextEditor } from './RichTextEditor';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('RichTextEditor', () => {
  it('renders the editor and toolbar buttons', () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={() => {}} />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Bold/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Italic/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Underline/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Heading 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Heading 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Paragraph/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Bullet list/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Numbered list/i })).toBeInTheDocument();
  });

  it('shows placeholder when empty', () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={() => {}} placeholder="Type here..." />
    );
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveAttribute('data-placeholder', 'Type here...');
  });

  it('calls onChange when content changes', async () => {
    const onChange = vi.fn();
    renderWithTheme(
      <RichTextEditor value="" onChange={onChange} />
    );
    const editor = screen.getByRole('textbox');
    await userEvent.click(editor);
    await userEvent.type(editor, 'Hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('disables editor and buttons when disabled is true', () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={() => {}} disabled />
    );
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveAttribute('contenteditable', 'false');

    const buttons = screen.getAllByRole('button');
    buttons.forEach((btn) => {
      expect(btn).toBeDisabled();
    });
  });

  it('forwards className', () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={() => {}} className="my-editor" />
    );
    const wrapper = document.querySelector('.my-editor');
    expect(wrapper).toBeInTheDocument();
  });

  it('passes axe-core accessibility audit', async () => {
    const { container } = renderWithTheme(
      <RichTextEditor value="Hello world" onChange={() => {}} />
    );
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('syncs external value prop', () => {
    const { rerender } = renderWithTheme(
      <RichTextEditor value="Initial" onChange={() => {}} />
    );
    const editor = screen.getByRole('textbox');
    expect(editor).toHaveTextContent('Initial');

    rerender(
      <ThemeProvider theme={lightTheme}>
        <RichTextEditor value="Updated" onChange={() => {}} />
      </ThemeProvider>
    );
    expect(editor).toHaveTextContent('Updated');
  });

  it('renders toolbar with correct aria-label', () => {
    renderWithTheme(
      <RichTextEditor value="" onChange={() => {}} />
    );
    const toolbar = screen.getByRole('toolbar');
    expect(toolbar).toHaveAttribute('aria-label', 'Text formatting');
  });
});
