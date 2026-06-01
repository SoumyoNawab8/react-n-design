import styled from 'styled-components';

export const RichTextEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.softInset};
  overflow: hidden;
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}30;
  background: ${({ theme }) => theme.colors.background};
`;

export const FormatButton = styled.button`
  appearance: none;
  border: none;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.soft};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  min-width: 36px;
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.15s ease, transform 0.1s ease;

  &:hover:not(:disabled) {
    box-shadow: ${({ theme }) => theme.shadows.softInset};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const EditorArea = styled.div`
  min-height: 160px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 15px;
  line-height: 1.6;
  outline: none;
  box-shadow: inset 3px 3px 6px ${({ theme }) => theme.colors.shadowDark},
    inset -3px -3px 6px ${({ theme }) => theme.colors.shadowLight};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius} ${({ theme }) => theme.borderRadius};
  cursor: text;

  &:empty::before {
    content: attr(data-placeholder);
    color: ${({ theme }) => theme.colors.textSecondary};
    pointer-events: none;
    display: block;
  }

  &[contenteditable='false'] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  h1 {
    font-size: 1.6em;
    margin: 0.4em 0;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  h2 {
    font-size: 1.3em;
    margin: 0.4em 0;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    margin: 0.4em 0;
  }

  ul,
  ol {
    margin: 0.4em 0;
    padding-left: 1.4em;
  }

  li {
    margin: 0.2em 0;
  }

  u {
    text-decoration: underline;
  }
`;
