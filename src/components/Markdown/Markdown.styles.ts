'use client';
import styled from 'styled-components';

export const MarkdownRoot = styled.div`
  font-size: 15px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

export const MarkdownHeading = styled.h1`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 24px 0 12px;
  line-height: 1.3;
`;

export const MarkdownParagraph = styled.p`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const MarkdownLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const MarkdownCode = styled.code`
  background: ${({ theme }) => theme.colors.hoverBg};
  color: ${({ theme }) => theme.colors.primary};
  padding: 2px 6px;
  border-radius: 6px;
  font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', monospace;
  font-size: 0.9em;
`;

export const MarkdownCodeBlock = styled.pre`
  background: ${({ theme }) => theme.colors.cardBg};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  padding: 16px;
  overflow-x: auto;
  margin: 0 0 16px;
  font-family: 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;

  & code {
    background: transparent;
    padding: 0;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const MarkdownBlockquote = styled.blockquote`
  margin: 0 0 16px;
  padding: 8px 16px;
  border-left: 4px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.hoverBg}30;
  border-radius: 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius} 0;
  color: ${({ theme }) => theme.colors.text};
  font-style: italic;
`;

export const MarkdownList = styled.ul`
  margin: 0 0 16px;
  padding-left: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

export const MarkdownOrderedList = styled.ol`
  margin: 0 0 16px;
  padding-left: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

export const MarkdownListItem = styled.li`
  margin-bottom: 4px;
`;

export const MarkdownHr = styled.hr`
  border: none;
  height: 2px;
  background: ${({ theme }) => theme.colors.shadowDark}40;
  margin: 20px 0;
  border-radius: 1px;
`;

export const MarkdownStrong = styled.strong`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const MarkdownEm = styled.em`
  font-style: italic;
  color: ${({ theme }) => theme.colors.text};
`;

export const MarkdownTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0 0 16px;
  font-size: 14px;
`;

export const MarkdownTableHead = styled.thead`
  background: ${({ theme }) => theme.colors.hoverBg};
`;

export const MarkdownTableBody = styled.tbody``;

export const MarkdownTableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.shadowDark}30;

  &:last-child {
    border-bottom: none;
  }
`;

export const MarkdownTableCell = styled.td`
  padding: 8px 12px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
`;

export const MarkdownTableHeaderCell = styled.th`
  padding: 8px 12px;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;
