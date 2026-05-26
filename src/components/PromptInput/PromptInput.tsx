'use client';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from '../../icons';
import {
  MentionMenu,
  MentionMenuItem,
  PromptInputFooter,
  PromptInputWrapper,
  SendButton,
  SlashMenu,
  SlashMenuItem,
  StyledTextArea,
  TextAreaWrapper,
  TokenCounter,
} from './PromptInput.styles';

export interface SlashCommand {
  command: string;
  description: string;
  icon?: React.ReactNode;
}

export interface MentionTarget {
  id: string;
  name: string;
  avatar?: string;
}

export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  maxTokens?: number;
  isLoading?: boolean;
  disabled?: boolean;
  slashCommands?: SlashCommand[];
  mentionTargets?: MentionTarget[];
  showTokenCount?: boolean;
  tokenCount?: number;
  tokenLabel?: string;
}

function countTokens(text: string): number {
  // Very rough approximation: ~4 chars per token on average
  return Math.ceil(text.length / 4);
}

function useAutoResize(ref: React.RefObject<HTMLTextAreaElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  });
}

export const PromptInput = ({
  value,
  onChange,
  onSend,
  placeholder = 'Ask anything...',
  maxLength,
  maxTokens,
  isLoading = false,
  disabled = false,
  slashCommands = [],
  mentionTargets = [],
  showTokenCount = false,
  tokenCount,
  tokenLabel = 'tokens',
}: PromptInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [slashQuery, setSlashQuery] = useState('');
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashIndex, setSlashIndex] = useState(0);

  const [mentionQuery, setMentionQuery] = useState('');
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [mentionIndex, setMentionIndex] = useState(0);

  useAutoResize(textareaRef);

  const currentTokens = tokenCount ?? (showTokenCount ? countTokens(value) : 0);
  const nearLimit = maxTokens ? currentTokens >= maxTokens * 0.9 : false;
  const atLimit = maxLength ? value.length >= maxLength : false;

  const filteredSlash = slashCommands.filter((cmd) =>
    slashQuery ? cmd.command.toLowerCase().startsWith(`/${slashQuery.toLowerCase()}`) : true
  );
  const filteredMentions = mentionTargets.filter((m) =>
    mentionQuery ? m.name.toLowerCase().includes(mentionQuery.toLowerCase()) : true
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (showSlashMenu && filteredSlash.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSlashIndex((prev) => (prev + 1) % filteredSlash.length);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSlashIndex((prev) => (prev - 1 + filteredSlash.length) % filteredSlash.length);
          return;
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          const cmd = filteredSlash[slashIndex];
          if (cmd) {
            const newValue = value.replace(/\/\w*$/, `${cmd.command} `);
            onChange(newValue);
            setShowSlashMenu(false);
            setSlashQuery('');
          }
          return;
        }
        if (e.key === 'Escape') {
          setShowSlashMenu(false);
          return;
        }
      }

      if (showMentionMenu && filteredMentions.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setMentionIndex((prev) => (prev + 1) % filteredMentions.length);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setMentionIndex((prev) => (prev - 1 + filteredMentions.length) % filteredMentions.length);
          return;
        }
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          const m = filteredMentions[mentionIndex];
          if (m) {
            const newValue = value.replace(/@\w*$/, `@${m.name} `);
            onChange(newValue);
            setShowMentionMenu(false);
            setMentionQuery('');
          }
          return;
        }
        if (e.key === 'Escape') {
          setShowMentionMenu(false);
          return;
        }
      }

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!isLoading && value.trim() && !atLimit) {
          onSend(value.trim());
          onChange('');
          setShowSlashMenu(false);
          setShowMentionMenu(false);
        }
      }
    },
    [
      value,
      showSlashMenu,
      filteredSlash,
      slashIndex,
      showMentionMenu,
      filteredMentions,
      mentionIndex,
      isLoading,
      atLimit,
      onChange,
      onSend,
    ]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value;
      onChange(text);

      // Slash command detection
      const slashMatch = text.match(/\/(\w*)$/);
      if (slashMatch && slashCommands.length > 0) {
        setSlashQuery(slashMatch[1]);
        setShowSlashMenu(true);
        setSlashIndex(0);
      } else {
        setShowSlashMenu(false);
        setSlashQuery('');
      }

      // Mention detection
      const mentionMatch = text.match(/@(\w*)$/);
      if (mentionMatch && mentionTargets.length > 0) {
        setMentionQuery(mentionMatch[1]);
        setShowMentionMenu(true);
        setMentionIndex(0);
      } else {
        setShowMentionMenu(false);
        setMentionQuery('');
      }
    },
    [onChange, slashCommands.length, mentionTargets.length]
  );

  const handleSendClick = useCallback(() => {
    if (!isLoading && value.trim() && !atLimit) {
      onSend(value.trim());
      onChange('');
      setShowSlashMenu(false);
      setShowMentionMenu(false);
    }
  }, [value, isLoading, atLimit, onSend, onChange]);

  return (
    <PromptInputWrapper>
      <TextAreaWrapper>
        {showSlashMenu && filteredSlash.length > 0 && (
          <SlashMenu role="listbox" aria-label="Slash commands">
            {filteredSlash.map((cmd, i) => (
              <SlashMenuItem
                key={cmd.command}
                role="option"
                aria-selected={i === slashIndex}
                isHighlighted={i === slashIndex}
                onClick={() => {
                  const newValue = value.replace(/\/\w*$/, `${cmd.command} `);
                  onChange(newValue);
                  setShowSlashMenu(false);
                }}
              >
                <span>{cmd.command}</span>
                <span>{cmd.description}</span>
              </SlashMenuItem>
            ))}
          </SlashMenu>
        )}

        {showMentionMenu && filteredMentions.length > 0 && (
          <MentionMenu role="listbox" aria-label="Mentions">
            {filteredMentions.map((m, i) => (
              <MentionMenuItem
                key={m.id}
                role="option"
                aria-selected={i === mentionIndex}
                isHighlighted={i === mentionIndex}
                onClick={() => {
                  const newValue = value.replace(/@\w*$/, `@${m.name} `);
                  onChange(newValue);
                  setShowMentionMenu(false);
                }}
              >
                <span>@{m.name}</span>
                <span>{m.id}</span>
              </MentionMenuItem>
            ))}
          </MentionMenu>
        )}

        <StyledTextArea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          aria-label="Prompt input"
          aria-describedby={nearLimit ? 'token-limit-warning' : undefined}
          rows={1}
        />
      </TextAreaWrapper>

      <PromptInputFooter>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {showTokenCount && (
            <TokenCounter nearLimit={nearLimit} id="token-counter">
              {currentTokens} {tokenLabel}
              {maxTokens ? ` / ${maxTokens}` : ''}
            </TokenCounter>
          )}
          {maxLength && (
            <TokenCounter nearLimit={nearLimit}>
              {value.length} / {maxLength}
            </TokenCounter>
          )}
        </div>

        <SendButton
          onClick={handleSendClick}
          disabled={!value.trim() || isLoading || atLimit}
          aria-label="Send prompt"
        >
          <FaPaperPlane />
          {isLoading ? 'Sending...' : 'Send'}
        </SendButton>
      </PromptInputFooter>
    </PromptInputWrapper>
  );
};
