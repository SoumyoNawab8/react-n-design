'use client';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FaCheck, FaCopy, FaPaperPlane, FaRobot, FaUser } from '../../icons';
import { AnimatePresence, motion } from '../../utils/lazyMotion';
import { Markdown } from '../Markdown';
import {
  AIChatEmptyState,
  AIChatInput,
  AIChatInputArea,
  AIChatInputWrapper,
  AIChatMessageActionButton,
  AIChatMessageActions,
  AIChatMessageBubble,
  AIChatMessageContent,
  AIChatMessageMeta,
  AIChatMessageRow,
  AIChatMessages,
  AIChatScrollAnchor,
  AIChatSendButton,
  AIChatTypingDot,
  AIChatTypingIndicator,
  AIChatWrapper,
} from './AIChat.styles';

declare global {
  interface Window {
    DOMPurify?: {
      sanitize: (text: string) => string;
    };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sanitizeUserContent(text: string): string {
  if (typeof window === 'undefined') return escapeHtml(text);
  if (typeof window.DOMPurify !== 'undefined') {
    return window.DOMPurify.sanitize(text);
  }
  return escapeHtml(text);
}

export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
}

export interface AIChatProps {
  messages: AIChatMessage[];
  onSend: (message: string) => void;
  isLoading?: boolean;
  isStreaming?: boolean;
  placeholder?: string;
}

/**
 * A full chat interface for AI conversations with streaming support,
 * markdown rendering, typing indicators, and accessible message actions.
 */
export const AIChat = ({
  messages,
  onSend,
  isLoading = false,
  isStreaming,
  placeholder = 'Type a message...',
}: AIChatProps) => {
  const streaming = isStreaming ?? isLoading;
  const [inputValue, setInputValue] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasScrolledRef = useRef(false);

  // Auto-scroll to bottom on first mount only, not on every message change
  useEffect(() => {
    if (messagesRef.current && !hasScrolledRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      hasScrolledRef.current = true;
    }
    // Focus input when streaming ends
    if (!streaming && inputRef.current) {
      inputRef.current.focus();
    }
  }, [streaming]);

  const handleSend = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInputValue('');
  }, [inputValue, onSend]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleCopy = useCallback((content: string, id: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  return (
    <AIChatWrapper role="region" aria-label="AI Chat">
      <AIChatMessages ref={messagesRef} role="log" aria-live="polite" aria-label="Chat messages">
        {messages.length === 0 && !streaming && (
          <AIChatEmptyState>
            <FaRobot aria-hidden="true" />
            <p>How can I help you today?</p>
          </AIChatEmptyState>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, index) => {
            const msgId = msg.id || `msg-${index}`;
            const isAssistant = msg.role === 'assistant';

            return (
              <AIChatMessageRow
                key={msgId}
                as={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                isAssistant={isAssistant}
              >
                <AIChatMessageBubble isAssistant={isAssistant}>
                  <AIChatMessageMeta isAssistant={isAssistant}>
                    {isAssistant ? <FaRobot aria-hidden="true" /> : <FaUser aria-hidden="true" />}
                    <span>{isAssistant ? 'Assistant' : 'You'}</span>
                  </AIChatMessageMeta>
                  <AIChatMessageContent>
                    {isAssistant ? (
                      <Markdown>{msg.content}</Markdown>
                    ) : (
                      <span
                        dangerouslySetInnerHTML={{ __html: sanitizeUserContent(msg.content) }}
                      />
                    )}
                  </AIChatMessageContent>
                  {isAssistant && (
                    <AIChatMessageActions>
                      <AIChatMessageActionButton
                        onClick={() => handleCopy(msg.content, msgId)}
                        aria-label={copiedId === msgId ? 'Copied' : 'Copy message'}
                        title={copiedId === msgId ? 'Copied!' : 'Copy'}
                      >
                        {copiedId === msgId ? <FaCheck /> : <FaCopy />}
                        <span>{copiedId === msgId ? 'Copied' : 'Copy'}</span>
                      </AIChatMessageActionButton>
                    </AIChatMessageActions>
                  )}
                </AIChatMessageBubble>
              </AIChatMessageRow>
            );
          })}
        </AnimatePresence>

        {streaming && (
          <AIChatMessageRow isAssistant={true} role="status">
            <AIChatMessageBubble isAssistant={true}>
              <AIChatMessageMeta isAssistant={true}>
                <FaRobot aria-hidden="true" />
                <span>Assistant</span>
              </AIChatMessageMeta>
              <AIChatTypingIndicator aria-label="Assistant is typing">
                <AIChatTypingDot delay={0} />
                <AIChatTypingDot delay={0.15} />
                <AIChatTypingDot delay={0.3} />
              </AIChatTypingIndicator>
            </AIChatMessageBubble>
          </AIChatMessageRow>
        )}

        <AIChatScrollAnchor />
      </AIChatMessages>

      <AIChatInputArea>
        <AIChatInputWrapper>
          <AIChatInput
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label="Message input"
            disabled={streaming}
          />
          <AIChatSendButton
            onClick={handleSend}
            disabled={!inputValue.trim() || streaming}
            aria-label="Send message"
          >
            <FaPaperPlane />
          </AIChatSendButton>
        </AIChatInputWrapper>
      </AIChatInputArea>
    </AIChatWrapper>
  );
};
