import { act, render, screen } from '@testing-library/react';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { StreamingText } from './StreamingText';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('StreamingText', () => {
  it('renders and is accessible', async () => {
    const { container } = renderWithTheme(
      <StreamingText text="Hello world" speed={1000} />
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('streams text character by character', () => {
    vi.useFakeTimers();
    const { container } = renderWithTheme(<StreamingText text="Hello" speed={30} />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveTextContent('');
    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(wrapper).toHaveTextContent('H');
    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(wrapper).toHaveTextContent('He');
    act(() => {
      vi.advanceTimersByTime(90);
    });
    expect(wrapper).toHaveTextContent('Hello');
    vi.useRealTimers();
  });

  it('calls onComplete when streaming finishes', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    renderWithTheme(<StreamingText text="Hi" speed={30} onComplete={onComplete} />);
    expect(onComplete).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });

  it('shows cursor during streaming', () => {
    vi.useFakeTimers();
    const { container } = renderWithTheme(<StreamingText text="Hi" speed={30} />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(60);
    });
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('resets when text prop changes', () => {
    vi.useFakeTimers();
    const { rerender, container } = renderWithTheme(
      <StreamingText text="Hello" speed={30} />
    );
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(container.firstChild).toHaveTextContent('Hello');

    rerender(
      <ThemeProvider theme={lightTheme}>
        <StreamingText text="World" speed={30} />
      </ThemeProvider>
    );

    expect(container.firstChild).not.toHaveTextContent('Hello');
    expect(container.firstChild).toHaveTextContent('');

    act(() => {
      vi.advanceTimersByTime(30);
    });
    expect(container.firstChild).toHaveTextContent('W');
    vi.useRealTimers();
  });

  it('calls onComplete immediately for empty text', () => {
    const onComplete = vi.fn();
    renderWithTheme(<StreamingText text="" speed={30} onComplete={onComplete} />);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('renders markdown when renderMarkdown is true and streaming is complete', () => {
    vi.useFakeTimers();
    const { container } = renderWithTheme(
      <StreamingText text="# Hello" speed={30} renderMarkdown />
    );
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(container.querySelector('h1')).toBeInTheDocument();
    expect(container.querySelector('h1')).toHaveTextContent('Hello');
    vi.useRealTimers();
  });
});
