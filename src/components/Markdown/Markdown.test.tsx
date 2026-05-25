import { render, screen } from '@testing-library/react';
import axe from 'axe-core';
import type React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../styles/theme';
import { Markdown } from './Markdown';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);

describe('Markdown', () => {
  it('renders headings h1-h6 from markdown syntax', () => {
    const md = '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6';
    renderWithTheme(<Markdown>{md}</Markdown>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('H1');
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('H2');
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('H3');
    expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent('H4');
    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent('H5');
    expect(screen.getByRole('heading', { level: 6 })).toHaveTextContent('H6');
  });

  it('renders paragraphs from plain text', () => {
    const md = 'First paragraph.\n\nSecond paragraph.';
    const { container } = renderWithTheme(<Markdown>{md}</Markdown>);
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0]).toHaveTextContent('First paragraph.');
    expect(paragraphs[1]).toHaveTextContent('Second paragraph.');
  });

  it('renders unordered lists from - or * syntax', () => {
    const md = '- Item one\n- Item two\n* Item three';
    const { container } = renderWithTheme(<Markdown>{md}</Markdown>);
    const lists = container.querySelectorAll('ul');
    expect(lists).toHaveLength(1);
    const listItems = lists[0].querySelectorAll('li');
    expect(listItems).toHaveLength(3);
    expect(listItems[0]).toHaveTextContent('Item one');
    expect(listItems[1]).toHaveTextContent('Item two');
    expect(listItems[2]).toHaveTextContent('Item three');
  });

  it('renders ordered lists from 1. syntax', () => {
    const md = '1. First\n2. Second\n3. Third';
    const { container } = renderWithTheme(<Markdown>{md}</Markdown>);
    const ol = container.querySelector('ol');
    expect(ol).toBeInTheDocument();
    const items = ol?.querySelectorAll('li');
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent('First');
    expect(items[1]).toHaveTextContent('Second');
    expect(items[2]).toHaveTextContent('Third');
  });

  it('renders inline code with backticks', () => {
    const md = 'Use `console.log` for debugging.';
    const { container } = renderWithTheme(<Markdown>{md}</Markdown>);
    const code = container.querySelector('code');
    expect(code).toBeInTheDocument();
    expect(code).toHaveTextContent('console.log');
  });

  it('renders code blocks with triple backticks', () => {
    const md = '```js\nconst x = 1;\n```';
    const { container } = renderWithTheme(<Markdown>{md}</Markdown>);
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();
    const code = pre?.querySelector('code');
    expect(code).toBeInTheDocument();
    expect(code).toHaveAttribute('class', 'language-js');
    expect(code).toHaveTextContent('const x = 1;');
  });

  it('renders links with [text](url) and opens in new tab with rel="noopener noreferrer"', () => {
    const md = 'Visit [React](https://react.dev) today.';
    const { container } = renderWithTheme(<Markdown>{md}</Markdown>);
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://react.dev');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveTextContent('React');
  });

  it('XSS protection: <script>alert(1)</script> renders as escaped text, not executed', () => {
    const md = '<script>alert(1)</script>';
    const { container } = renderWithTheme(<Markdown>{md}</Markdown>);
    const script = container.querySelector('script');
    expect(script).not.toBeInTheDocument();
    // The escaped text should be visible inside a paragraph as literal escaped entities
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.textContent).toContain('&lt;script&gt;');
    expect(paragraph?.textContent).toContain('alert(1)');
    expect(paragraph?.textContent).toContain('&lt;/script&gt;');
  });

  it('XSS protection: <img src=x onerror=alert(1)> is sanitized', () => {
    const md = '<img src=x onerror=alert(1)>';
    const { container } = renderWithTheme(<Markdown>{md}</Markdown>);
    const img = container.querySelector('img');
    expect(img).not.toBeInTheDocument();
    const paragraph = container.querySelector('p');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.textContent).toContain('&lt;img');
  });

  it('passes axe-core accessibility audit', async () => {
    const md =
      '# Heading\n\nSome paragraph text with [a link](https://example.com).\n\n- List item 1\n- List item 2\n\n1. Ordered one\n2. Ordered two\n\n> A blockquote\n\n`inline code`\n\n```ts\nconst foo = 1;\n```';
    const { container } = renderWithTheme(<Markdown>{md}</Markdown>);
    const results = await axe.run(container);
    expect(results.violations).toHaveLength(0);
  });
});
