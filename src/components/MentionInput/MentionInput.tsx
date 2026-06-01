'use client';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  MentionDropdown,
  MentionDropdownItem,
  MentionInputContainer,
  MentionInputWrapper,
  MentionOverlay,
  MentionPill,
  MentionTextarea,
} from './MentionInput.styles';

export interface MentionOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface MentionInputProps {
  value: string;
  onChange: (value: string) => void;
  options: MentionOption[];
  placeholder?: string;
  className?: string;
}

export const MentionInput = ({
  value,
  onChange,
  options,
  placeholder,
  className,
}: MentionInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastHandledKeyRef = useRef<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Detect mention query when value or cursor position changes
  const detectMention = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const pos = textarea.selectionStart;
    const textBeforeCursor = value.slice(0, pos);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);

    if (mentionMatch && options.length > 0) {
      setQuery(mentionMatch[1]);
      setShowDropdown(true);
      setHighlightedIndex(0);
    } else {
      setShowDropdown(false);
      setQuery('');
    }
  }, [value, options.length]);

  useEffect(() => {
    detectMention();
  }, [detectMention]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  const insertMention = useCallback(
    (option: MentionOption) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const pos = textarea.selectionStart;
      const textBeforeCursor = value.slice(0, pos);
      const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
      if (!mentionMatch) return;

      const beforeMention = value.slice(0, pos - mentionMatch[0].length);
      const afterCursor = value.slice(pos);
      const separator = afterCursor.startsWith(' ') ? '' : ' ';
      const newValue = `${beforeMention}@${option.label}${separator}${afterCursor}`;

      onChange(newValue);
      setShowDropdown(false);
      setQuery('');

      // Restore focus and place cursor after inserted mention
      requestAnimationFrame(() => {
        textarea.focus();
        const newCursorPos = beforeMention.length + option.label.length + 2;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      });
    },
    [value, onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    lastHandledKeyRef.current = e.key;
    if (!showDropdown || filteredOptions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filteredOptions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(
          (prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length
        );
        break;
      case 'Enter':
      case 'Tab':
        e.preventDefault();
        insertMention(filteredOptions[highlightedIndex]);
        break;
      case 'Escape':
        e.preventDefault();
        setShowDropdown(false);
        break;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleScroll = () => {
    if (textareaRef.current && overlayRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleClick = () => {
    detectMention();
  };

  const handleKeyUp = () => {
    const nonDetectKeys = ['Escape', 'Enter', 'Tab', 'ArrowDown', 'ArrowUp'];
    if (lastHandledKeyRef.current && !nonDetectKeys.includes(lastHandledKeyRef.current)) {
      detectMention();
    }
    lastHandledKeyRef.current = null;
  };

  // Render overlay text with styled mention pills
  const renderOverlay = (text: string): React.ReactNode[] => {
    if (!options.length) return [<span key="0">{text}</span>];

    const sortedLabels = [...options]
      .map((o) => o.label)
      .sort((a, b) => b.length - a.length)
      .map((label) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    const pattern = new RegExp(`@(${sortedLabels.join('|')})(?=\\s|$|[^a-zA-Z0-9])`, 'g');

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    // biome-ignore lint/suspicious/noAssignInExpressions: intentional regex loop
    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        elements.push(<span key={lastIndex}>{text.slice(lastIndex, match.index)}</span>);
      }
      elements.push(<MentionPill key={match.index}>{match[0]}</MentionPill>);
      lastIndex = pattern.lastIndex;
    }

    if (lastIndex < text.length) {
      elements.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }

    return elements.length > 0 ? elements : [<span key="0">{text}</span>];
  };

  return (
    <MentionInputWrapper className={className}>
      <MentionInputContainer>
        <MentionOverlay ref={overlayRef} aria-hidden="true">
          {renderOverlay(value)}
        </MentionOverlay>
        <MentionTextarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onClick={handleClick}
          onScroll={handleScroll}
          placeholder={placeholder}
          rows={3}
          aria-label="Mention input"
        />
        {showDropdown && filteredOptions.length > 0 && (
          <MentionDropdown id="mention-dropdown" role="listbox" aria-label="Mention options">
            {filteredOptions.map((opt, i) => (
              <MentionDropdownItem
                key={opt.id}
                role="option"
                aria-selected={i === highlightedIndex}
                isHighlighted={i === highlightedIndex}
                onClick={() => insertMention(opt)}
                onMouseEnter={() => setHighlightedIndex(i)}
              >
                {opt.icon && <span>{opt.icon}</span>}
                <span>@{opt.label}</span>
              </MentionDropdownItem>
            ))}
          </MentionDropdown>
        )}
      </MentionInputContainer>
    </MentionInputWrapper>
  );
};
