'use client';
import DOMPurify from 'dompurify';
import type React from 'react';
import { useMemo } from 'react';
import {
  MarkdownBlockquote,
  MarkdownCode,
  MarkdownCodeBlock,
  MarkdownEm,
  MarkdownHeading,
  MarkdownHr,
  MarkdownLink,
  MarkdownList,
  MarkdownListItem,
  MarkdownOrderedList,
  MarkdownParagraph,
  MarkdownRoot,
  MarkdownStrong,
  MarkdownTable,
  MarkdownTableBody,
  MarkdownTableCell,
  MarkdownTableHead,
  MarkdownTableHeaderCell,
  MarkdownTableRow,
} from './Markdown.styles';

export interface MarkdownProps {
  children: string;
  components?: Record<string, React.ComponentType<any>>;
}

interface ParsedNode {
  type: string;
  content?: string;
  level?: number;
  href?: string;
  title?: string;
  lang?: string;
  items?: string[];
  rows?: string[][];
  header?: string[];
}

const purify = (() => {
  if (typeof window === 'undefined') {
    return { sanitize: (text: string) => text } as unknown as typeof DOMPurify;
  }
  const dp = DOMPurify(window);
  dp.addHook('afterSanitizeAttributes', (node) => {
    if (node.tagName === 'A') {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });
  return dp;
})();

function _sanitizeMarkdown(text: string): string {
  return purify.sanitize(text, { ALLOW_DATA_ATTR: false });
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseMarkdown(md: string): ParsedNode[] {
  const lines = md.split('\n');
  const nodes: ParsedNode[] = [];
  let i = 0;

  const flushParagraph = (buffer: string[]) => {
    if (buffer.length > 0) {
      nodes.push({ type: 'paragraph', content: buffer.join('\n') });
      buffer.length = 0;
    }
  };

  const paragraphBuffer: string[] = [];

  while (i < lines.length) {
    const line = lines[i];

    // Horizontal rule
    if (/^(---|___|\*\*\*)\s*$/.test(line)) {
      flushParagraph(paragraphBuffer);
      nodes.push({ type: 'hr' });
      i++;
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph(paragraphBuffer);
      nodes.push({ type: 'heading', level: headingMatch[1].length, content: headingMatch[2] });
      i++;
      continue;
    }

    // Code block
    const codeBlockMatch = line.match(/^```(\w*)/);
    if (codeBlockMatch) {
      flushParagraph(paragraphBuffer);
      const lang = codeBlockMatch[1] || '';
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      nodes.push({ type: 'codeblock', lang, content: codeLines.join('\n') });
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      flushParagraph(paragraphBuffer);
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      nodes.push({ type: 'blockquote', content: quoteLines.join('\n') });
      continue;
    }

    // Unordered list
    if (/^(\s*)[-*+]\s+/.test(line)) {
      flushParagraph(paragraphBuffer);
      const items: string[] = [];
      while (i < lines.length && /^(\s*)[-*+]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^(\s*)[-*+]\s+/, ''));
        i++;
      }
      nodes.push({ type: 'ulist', items });
      continue;
    }

    // Ordered list
    if (/^(\s*)\d+\.\s+/.test(line)) {
      flushParagraph(paragraphBuffer);
      const items: string[] = [];
      while (i < lines.length && /^(\s*)\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^(\s*)\d+\.\s+/, ''));
        i++;
      }
      nodes.push({ type: 'olist', items });
      continue;
    }

    // Table
    if (
      line.includes('|') &&
      i + 1 < lines.length &&
      lines[i + 1].includes('|') &&
      /^\s*\|?\s*:?-+:?\s*\|/.test(lines[i + 1])
    ) {
      flushParagraph(paragraphBuffer);
      const header = line
        .split('|')
        .map((c) => c.trim())
        .filter(Boolean);
      i += 2; // skip header and separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(
          lines[i]
            .split('|')
            .map((c) => c.trim())
            .filter(Boolean)
        );
        i++;
      }
      nodes.push({ type: 'table', header, rows });
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      flushParagraph(paragraphBuffer);
      i++;
      continue;
    }

    paragraphBuffer.push(line);
    i++;
  }

  flushParagraph(paragraphBuffer);
  return nodes;
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const pushText = (t: string) => {
    if (t) parts.push(<span key={key++}>{escapeHtml(t)}</span>);
  };

  while (remaining.length > 0) {
    // Code inline
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      parts.push(<MarkdownCode key={key++}>{codeMatch[1]}</MarkdownCode>);
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Link
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(
        <MarkdownLink key={key++} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">
          {linkMatch[1]}
        </MarkdownLink>
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Bold + Italic
    const bimatch = remaining.match(/^(\*\*\*|___)(.+?)\1/);
    if (bimatch) {
      parts.push(
        <MarkdownStrong key={key++}>
          <MarkdownEm>{renderInline(bimatch[2])}</MarkdownEm>
        </MarkdownStrong>
      );
      remaining = remaining.slice(bimatch[0].length);
      continue;
    }

    // Bold
    const bmatch = remaining.match(/^(\*\*|__)(.+?)\1/);
    if (bmatch) {
      parts.push(<MarkdownStrong key={key++}>{renderInline(bmatch[2])}</MarkdownStrong>);
      remaining = remaining.slice(bmatch[0].length);
      continue;
    }

    // Italic
    const imatch = remaining.match(/^(\*|_)(.+?)\1/);
    if (imatch) {
      parts.push(<MarkdownEm key={key++}>{renderInline(imatch[2])}</MarkdownEm>);
      remaining = remaining.slice(imatch[0].length);
      continue;
    }

    // Strikethrough
    const smatch = remaining.match(/^~~(.+?)~~/);
    if (smatch) {
      parts.push(
        <s key={key++} style={{ textDecoration: 'line-through' }}>
          {renderInline(smatch[1])}
        </s>
      );
      remaining = remaining.slice(smatch[0].length);
      continue;
    }

    // Next char
    pushText(remaining[0]);
    remaining = remaining.slice(1);
  }

  return parts;
}

/**
 * A safe markdown renderer with custom component overrides.
 * Supports headings, paragraphs, lists, code blocks, tables,
 * links, emphasis, and inline code.
 */
export const Markdown = ({ children, components = {} }: MarkdownProps) => {
  const nodes = useMemo(() => parseMarkdown(children), [children]);

  const renderNode = (node: ParsedNode, index: number): React.ReactNode => {
    const key = `node-${index}`;

    switch (node.type) {
      case 'heading': {
        const H = components[`h${node.level}`] || MarkdownHeading;
        return (
          <H key={key} as={`h${node.level}` as any}>
            {renderInline(node.content || '')}
          </H>
        );
      }
      case 'paragraph': {
        const P = components.p || MarkdownParagraph;
        return <P key={key}>{renderInline(node.content || '')}</P>;
      }
      case 'codeblock': {
        const Pre = components.pre || MarkdownCodeBlock;
        return (
          <Pre key={key}>
            <code className={node.lang ? `language-${node.lang}` : undefined}>
              {escapeHtml(node.content || '')}
            </code>
          </Pre>
        );
      }
      case 'blockquote': {
        const Bq = components.blockquote || MarkdownBlockquote;
        return <Bq key={key}>{renderInline(node.content || '')}</Bq>;
      }
      case 'ulist': {
        const Ul = components.ul || MarkdownList;
        return (
          <Ul key={key} as="ul">
            {node.items?.map((item, i) => {
              const Li = components.li || MarkdownListItem;
              return <Li key={`${key}-li-${i}`}>{renderInline(item)}</Li>;
            })}
          </Ul>
        );
      }
      case 'olist': {
        const Ol = components.ol || MarkdownOrderedList;
        return (
          <Ol key={key}>
            {node.items?.map((item, i) => {
              const Li = components.li || MarkdownListItem;
              return <Li key={`${key}-li-${i}`}>{renderInline(item)}</Li>;
            })}
          </Ol>
        );
      }
      case 'hr': {
        const Hr = components.hr || MarkdownHr;
        return <Hr key={key} />;
      }
      case 'table': {
        const Table = components.table || MarkdownTable;
        const Thead = components.thead || MarkdownTableHead;
        const Tbody = components.tbody || MarkdownTableBody;
        const Tr = components.tr || MarkdownTableRow;
        const Th = components.th || MarkdownTableHeaderCell;
        const Td = components.td || MarkdownTableCell;
        return (
          <Table key={key}>
            <Thead>
              <Tr>
                {node.header?.map((h, hi) => (
                  <Th key={`${key}-th-${hi}`}>{renderInline(h)}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {node.rows?.map((row, ri) => (
                <Tr key={`${key}-tr-${ri}`}>
                  {row.map((cell, ci) => (
                    <Td key={`${key}-td-${ri}-${ci}`}>{renderInline(cell)}</Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        );
      }
      default:
        return null;
    }
  };

  return <MarkdownRoot>{nodes.map((node, i) => renderNode(node, i))}</MarkdownRoot>;
};
