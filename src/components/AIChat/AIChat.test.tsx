import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { vi } from 'vitest';
import { lightTheme } from '../../styles/theme';
import { AIChat } from './AIChat';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

const sampleMessages = [
  { role: 'user' as const, content: 'Hello', id: '1' },
  { role: 'assistant' as const, content: 'Hi there!', id: '2' },
];

describe('AIChat', () => {
  it('renders with role and aria-label for the chat container', () => {
    renderWithTheme(<AIChat messages={[]} onSend={vi.fn()} />);
    const container = screen.getByRole('region', { name: /ai chat/i });
    expect(container).toBeInTheDocument();
  });

  it('renders a list of messages passed via props', () => {
    const { container } = renderWithTheme(<AIChat messages={sampleMessages} onSend={vi.fn()} />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(container.textContent).toContain('Hi there!');
  });

  it('shows assistant messages differently from user messages (visual distinction)', () => {
    renderWithTheme(<AIChat messages={sampleMessages} onSend={vi.fn()} />);
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('Assistant')).toBeInTheDocument();
  });

  it('shows streaming dots animation when isStreaming={true}', () => {
    renderWithTheme(<AIChat messages={sampleMessages} onSend={vi.fn()} isStreaming={true} />);
    expect(screen.getByLabelText(/assistant is typing/i)).toBeInTheDocument();
  });

  it('calls onSend when user presses Enter in the input field', async () => {
    const onSend = vi.fn();
    renderWithTheme(<AIChat messages={[]} onSend={onSend} />);
    const input = screen.getByRole('textbox', { name: /message input/i });
    await userEvent.type(input, 'Test message{enter}');
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend).toHaveBeenCalledWith('Test message');
  });

  it('calls onSend when user clicks the send button', async () => {
    const onSend = vi.fn();
    renderWithTheme(<AIChat messages={[]} onSend={onSend} />);
    const input = screen.getByRole('textbox', { name: /message input/i });
    await userEvent.type(input, 'Click send');
    const button = screen.getByRole('button', { name: /send message/i });
    await userEvent.click(button);
    expect(onSend).toHaveBeenCalledTimes(1);
    expect(onSend).toHaveBeenCalledWith('Click send');
  });

  it('clears input after sending a message', async () => {
    const onSend = vi.fn();
    renderWithTheme(<AIChat messages={[]} onSend={onSend} />);
    const input = screen.getByRole('textbox', { name: /message input/i });
    await userEvent.type(input, 'Clear me{enter}');
    expect(input).toHaveValue('');
  });

  it('input field is disabled when isStreaming={true}', () => {
    renderWithTheme(<AIChat messages={[]} onSend={vi.fn()} isStreaming={true} />);
    expect(screen.getByRole('textbox', { name: /message input/i })).toBeDisabled();
  });

  it('send button is disabled when input is empty', () => {
    renderWithTheme(<AIChat messages={[]} onSend={vi.fn()} />);
    expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
  });

  it('auto-scrolls to bottom when new messages arrive', () => {
    const onSend = vi.fn();
    const { rerender } = renderWithTheme(<AIChat messages={[]} onSend={onSend} />);

    const messagesContainer = screen.getByLabelText(/chat messages/i);
    Object.defineProperty(messagesContainer, 'scrollHeight', {
      configurable: true,
      value: 500,
    });

    rerender(
      <ThemeProvider theme={lightTheme}>
        <AIChat messages={sampleMessages} onSend={onSend} />
      </ThemeProvider>
    );

    expect(messagesContainer.scrollTop).toBe(500);
  });

  it('keyboard navigation: Tab cycles through interactive elements', async () => {
    renderWithTheme(
      <AIChat messages={[{ role: 'assistant', content: 'Copy me', id: '1' }]} onSend={vi.fn()} />
    );

    const input = screen.getByRole('textbox', { name: /message input/i });
    const sendButton = screen.getByRole('button', { name: /send message/i });

    // Type something to enable the send button; input stays focused
    await userEvent.type(input, 'hello');
    expect(document.activeElement).toBe(input);

    // Tab forward from input goes to send button
    await userEvent.tab();
    expect(document.activeElement).toBe(sendButton);

    // Shift+Tab from send button goes back to input
    await userEvent.tab({ shift: true });
    expect(document.activeElement).toBe(input);

    // Shift+Tab from input goes to copy button (previous in DOM order)
    await userEvent.tab({ shift: true });
    expect(document.activeElement).toHaveAttribute('aria-label', 'Copy message');
  });

  it('passes axe-core accessibility audit on the full component', async () => {
    const { container } = renderWithTheme(<AIChat messages={sampleMessages} onSend={vi.fn()} />);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });

  it('sanitizes user content with escapeHtml so scripts do not execute', () => {
    const malicious = '<script>alert(1)</script><b>safe</b>';
    const { container } = renderWithTheme(
      <AIChat messages={[{ role: 'user', content: malicious, id: 'x' }]} onSend={vi.fn()} />
    );

    const html = container.innerHTML;
    expect(html).not.toContain('<script>');
    expect(html).toContain('alert(1)');
    expect(screen.getByText(/safe/)).toBeInTheDocument();
  });
});
