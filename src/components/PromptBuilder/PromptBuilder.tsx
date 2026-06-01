'use client';
import React, { useCallback, useRef } from 'react';
import {
  FaArrowDown,
  FaArrowUp,
  FaPlus,
  FaRobot,
  FaTrash,
  FaUser,
} from '../../icons';
import { AnimatePresence, motion } from '../../utils/lazyMotion';
import {
  AddButton,
  ExampleActions,
  ExampleItemContainer,
  ExamplesList,
  FooterActions,
  HighlightOverlay,
  IconButton,
  PromptBuilderWrapper,
  RoleBadge,
  StyledTextArea,
  SystemPromptTextArea,
  TextAreaContainer,
  VariableHighlight,
} from './PromptBuilder.styles';

export interface PromptExample {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface PromptBuilderProps {
  systemPrompt?: string;
  examples: PromptExample[];
  onChange: (examples: PromptExample[], systemPrompt: string) => void;
  variables?: string[];
  className?: string;
}

const VARIABLE_PATTERN = /^\{\{[^}]+\}\}$/;

const renderHighlightedText = (text: string): React.ReactNode[] => {
  if (!text) return [];
  const parts = text.split(/(\{\{[^}]+\}\})/g);
  return parts.map((part, i) => {
    if (VARIABLE_PATTERN.test(part)) {
      return <VariableHighlight key={i}>{part}</VariableHighlight>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

interface HighlightTextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  'aria-label'?: string;
  rows?: number;
}

const HighlightTextArea: React.FC<HighlightTextAreaProps> = ({
  value,
  onChange,
  ...props
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const syncScroll = useCallback(() => {
    if (overlayRef.current && textareaRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
      overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  return (
    <TextAreaContainer>
      <HighlightOverlay ref={overlayRef} aria-hidden="true">
        {renderHighlightedText(value)}
      </HighlightOverlay>
      <StyledTextArea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        onScroll={syncScroll}
        spellCheck={false}
        autoComplete="off"
        {...props}
      />
    </TextAreaContainer>
  );
};

export const PromptBuilder = ({
  systemPrompt = '',
  examples,
  onChange,
  variables: _variables,
  className,
}: PromptBuilderProps) => {
  const handleSystemPromptChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(examples, e.target.value);
    },
    [examples, onChange]
  );

  const handleExampleChange = useCallback(
    (id: string, content: string) => {
      const newExamples = examples.map((ex) =>
        ex.id === id ? { ...ex, content } : ex
      );
      onChange(newExamples, systemPrompt);
    },
    [examples, systemPrompt, onChange]
  );

  const handleDelete = useCallback(
    (id: string) => {
      const newExamples = examples.filter((ex) => ex.id !== id);
      onChange(newExamples, systemPrompt);
    },
    [examples, systemPrompt, onChange]
  );

  const handleMove = useCallback(
    (index: number, direction: -1 | 1) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= examples.length) return;
      const newExamples = [...examples];
      [newExamples[index], newExamples[newIndex]] = [
        newExamples[newIndex],
        newExamples[index],
      ];
      onChange(newExamples, systemPrompt);
    },
    [examples, systemPrompt, onChange]
  );

  const handleAddExample = useCallback(() => {
    const newExample: PromptExample = {
      id: `example-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      role: 'user',
      content: '',
    };
    onChange([...examples, newExample], systemPrompt);
  }, [examples, systemPrompt, onChange]);

  const handleAddTurn = useCallback(() => {
    const lastRole =
      examples.length > 0 ? examples[examples.length - 1].role : 'assistant';
    const newRole = lastRole === 'user' ? 'assistant' : 'user';
    const newExample: PromptExample = {
      id: `example-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      role: newRole,
      content: '',
    };
    onChange([...examples, newExample], systemPrompt);
  }, [examples, systemPrompt, onChange]);

  return (
    <PromptBuilderWrapper className={className}>
      <SystemPromptTextArea
        value={systemPrompt}
        onChange={handleSystemPromptChange}
        placeholder="Enter system prompt..."
        aria-label="System prompt"
        rows={3}
      />

      <ExamplesList role="list" aria-label="Prompt examples">
        <AnimatePresence initial={false}>
          {examples.map((example, index) => (
            <motion.div
              key={example.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              role="listitem"
              data-testid={`example-${example.id}`}
            >
              <ExampleItemContainer $role={example.role}>
                <RoleBadge $role={example.role}>
                  {example.role === 'user' ? (
                    <FaUser size={12} aria-hidden="true" />
                  ) : (
                    <FaRobot size={12} aria-hidden="true" />
                  )}
                  {example.role === 'user' ? 'User' : 'Assistant'}
                </RoleBadge>

                <HighlightTextArea
                  value={example.content}
                  onChange={(e) =>
                    handleExampleChange(example.id, e.target.value)
                  }
                  placeholder="Enter message content..."
                  aria-label={`${example.role === 'user' ? 'User' : 'Assistant'} message content`}
                  rows={3}
                />

                <ExampleActions>
                  <IconButton
                    onClick={() => handleMove(index, -1)}
                    disabled={index === 0}
                    aria-label="Move example up"
                    title="Move up"
                  >
                    <FaArrowUp size={14} aria-hidden="true" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleMove(index, 1)}
                    disabled={index === examples.length - 1}
                    aria-label="Move example down"
                    title="Move down"
                  >
                    <FaArrowDown size={14} aria-hidden="true" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(example.id)}
                    aria-label="Delete example"
                    title="Delete"
                  >
                    <FaTrash size={14} aria-hidden="true" />
                  </IconButton>
                </ExampleActions>
              </ExampleItemContainer>
            </motion.div>
          ))}
        </AnimatePresence>
      </ExamplesList>

      <FooterActions>
        <AddButton onClick={handleAddExample} aria-label="Add example">
          <FaPlus size={14} aria-hidden="true" />
          Add Example
        </AddButton>
        <AddButton onClick={handleAddTurn} aria-label="Add turn">
          <FaPlus size={14} aria-hidden="true" />
          Add Turn
        </AddButton>
      </FooterActions>
    </PromptBuilderWrapper>
  );
};
