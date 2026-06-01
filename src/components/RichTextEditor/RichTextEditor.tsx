'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
  EditorArea,
  FormatButton,
  RichTextEditorWrapper,
  Toolbar,
} from './RichTextEditor.styles';

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

type FormatCommand =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'formatBlock'
  | 'insertUnorderedList'
  | 'insertOrderedList';

/**
 * A basic neomorphic rich text editor with formatting toolbar.
 */
export const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync external value into the contentEditable on mount/value change
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (el.innerHTML !== value) {
      el.innerHTML = value;
    }
  }, [value]);

  const execFormat = useCallback(
    (command: FormatCommand, valueArg?: string) => {
      if (disabled) return;
      document.execCommand(command, false, valueArg);
      // Refocus editor after command
      editorRef.current?.focus();
      // Sync content
      const html = editorRef.current?.innerHTML ?? '';
      onChange(html);
    },
    [disabled, onChange]
  );

  const handleInput = useCallback(() => {
    const html = editorRef.current?.innerHTML ?? '';
    onChange(html);
  }, [onChange]);

  const handleBold = () => execFormat('bold');
  const handleItalic = () => execFormat('italic');
  const handleUnderline = () => execFormat('underline');
  const handleH1 = () => execFormat('formatBlock', '<h1>');
  const handleH2 = () => execFormat('formatBlock', '<h2>');
  const handleParagraph = () => execFormat('formatBlock', '<p>');
  const handleBulletList = () => execFormat('insertUnorderedList');
  const handleNumberedList = () => execFormat('insertOrderedList');

  return (
    <RichTextEditorWrapper className={className}>
      <Toolbar role="toolbar" aria-label="Text formatting">
        <FormatButton
          type="button"
          onClick={handleBold}
          disabled={disabled}
          aria-label="Bold"
          title="Bold"
        >
          <b>B</b>
        </FormatButton>
        <FormatButton
          type="button"
          onClick={handleItalic}
          disabled={disabled}
          aria-label="Italic"
          title="Italic"
        >
          <i>I</i>
        </FormatButton>
        <FormatButton
          type="button"
          onClick={handleUnderline}
          disabled={disabled}
          aria-label="Underline"
          title="Underline"
        >
          <u>U</u>
        </FormatButton>
        <FormatButton
          type="button"
          onClick={handleH1}
          disabled={disabled}
          aria-label="Heading 1"
          title="Heading 1"
        >
          H1
        </FormatButton>
        <FormatButton
          type="button"
          onClick={handleH2}
          disabled={disabled}
          aria-label="Heading 2"
          title="Heading 2"
        >
          H2
        </FormatButton>
        <FormatButton
          type="button"
          onClick={handleParagraph}
          disabled={disabled}
          aria-label="Paragraph"
          title="Paragraph"
        >
          P
        </FormatButton>
        <FormatButton
          type="button"
          onClick={handleBulletList}
          disabled={disabled}
          aria-label="Bullet list"
          title="Bullet list"
        >
          • List
        </FormatButton>
        <FormatButton
          type="button"
          onClick={handleNumberedList}
          disabled={disabled}
          aria-label="Numbered list"
          title="Numbered list"
        >
          1. List
        </FormatButton>
      </Toolbar>

      <EditorArea
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        role="textbox"
        aria-multiline="true"
        aria-label="Rich text editor"
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </RichTextEditorWrapper>
  );
};

export default RichTextEditor;
