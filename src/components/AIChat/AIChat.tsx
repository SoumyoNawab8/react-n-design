'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaPaperPlane, FaCopy, FaCheck, FaUser, FaRobot } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AIChatWrapper,
  AIChatMessages,
  AIChatMessageRow,
  AIChatMessageBubble,
  AIChatMessageMeta,
  AIChatMessageContent,
  AIChatMessageActions,
  AIChatMessageActionButton,
  AIChatInputArea,
  AIChatInputWrapper,
  AIChatInput,
  AIChatSendButton,
  AIChatTypingIndicator,
  AIChatTypingDot,
  AIChatEmptyState,
  AIChatScrollAnchor,
} from './AIChat.styles';
import { Markdown } from '../Markdown';

export interface AIChatMessage {
  role: 'user' | 'assistant';
  content: string;
  id?: string;
}

export interface AIChatProps {
  messages: AIChatMessage[];
  onSend: (message: string) => void;
  isLoading?: boolean;
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
  placeholder = 'Type a message...',
}: AIChatProps) => {
  const [inputValue, setInputValue] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageCount = useRef(messages.length);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input when messages are added
  useEffect(() => {
    if (messages.length > lastMessageCount.current && !isLoading) {
      inputRef.current?.focus();
    }
    lastMessageCount.current = messages.length;
  }, [messages.length, isLoading]);

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
    <AIChatWrapper>
      <AIChatMessages
        ref={messagesRef}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.length === 0 && !isLoading && (
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
                role="listitem"
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
                      msg.content
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

        {isLoading && (
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
            disabled={isLoading}
          />
          <AIChatSendButton
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            aria-label="Send message"
          >
            <FaPaperPlane />
          </AIChatSendButton>
        </AIChatInputWrapper>
      </AIChatInputArea>
    </AIChatWrapper>
  );
};
