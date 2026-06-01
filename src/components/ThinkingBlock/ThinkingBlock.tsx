'use client';
import { useCallback, useId, useState } from 'react';
import { FaBrain, FaChevronDown } from '../../icons';
import { AnimatePresence, motion } from '../../utils/lazyMotion';
import {
  ThinkingBlockChevron,
  ThinkingBlockContent,
  ThinkingBlockHeader,
  ThinkingBlockIcon,
  ThinkingBlockIndicator,
  ThinkingBlockIndicatorDot,
  ThinkingBlockIndicatorText,
  ThinkingBlockStep,
  ThinkingBlockStepNumber,
  ThinkingBlockSteps,
  ThinkingBlockStepText,
  ThinkingBlockTimestamp,
  ThinkingBlockTitle,
  ThinkingBlockWrapper,
} from './ThinkingBlock.styles';

export interface ThinkingStep {
  id?: string;
  text: string;
  timestamp?: number; // Date.now()
}

export interface ThinkingBlockProps {
  steps: ThinkingStep[];
  isThinking?: boolean;
  title?: string;
  defaultExpanded?: boolean;
  showTimestamps?: boolean;
  onToggle?: (expanded: boolean) => void;
  className?: string;
}

export const ThinkingBlock = ({
  steps,
  isThinking = false,
  title = 'Thinking',
  defaultExpanded = true,
  showTimestamps = false,
  onToggle,
  className,
}: ThinkingBlockProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const uniqueId = useId();
  const contentId = `thinking-block-content-${uniqueId}`;
  const triggerId = `thinking-block-trigger-${uniqueId}`;

  const toggle = useCallback(() => {
    const next = !expanded;
    setExpanded(next);
    onToggle?.(next);
  }, [expanded, onToggle]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <ThinkingBlockWrapper
      role="region"
      aria-label="AI reasoning steps"
      aria-live="polite"
      className={className}
    >
      <ThinkingBlockHeader
        id={triggerId}
        role="button"
        aria-expanded={expanded}
        aria-controls={contentId}
        tabIndex={0}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        <ThinkingBlockIcon aria-hidden="true">
          <FaBrain />
        </ThinkingBlockIcon>
        <ThinkingBlockTitle>{title}</ThinkingBlockTitle>
        {isThinking && (
          <ThinkingBlockIndicatorDot aria-hidden="true" />
        )}
        <ThinkingBlockChevron
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <FaChevronDown />
        </ThinkingBlockChevron>
      </ThinkingBlockHeader>

      <AnimatePresence initial={false}>
        {expanded && (
          <ThinkingBlockContent
            id={contentId}
            role="region"
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: 'easeInOut' },
              opacity: { duration: 0.2, ease: 'easeInOut' },
            }}
          >
            <ThinkingBlockSteps>
              {steps.map((step, index) => (
                <ThinkingBlockStep
                  key={step.id || `step-${index}`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: 'easeOut',
                  }}
                >
                  <ThinkingBlockStepNumber aria-hidden="true">
                    {index + 1}
                  </ThinkingBlockStepNumber>
                  <ThinkingBlockStepText>
                    {step.text}
                    {showTimestamps && step.timestamp && (
                      <ThinkingBlockTimestamp>
                        {formatTimestamp(step.timestamp)}
                      </ThinkingBlockTimestamp>
                    )}
                  </ThinkingBlockStepText>
                </ThinkingBlockStep>
              ))}

              {isThinking && steps.length === 0 && (
                <ThinkingBlockStep>
                  <ThinkingBlockIndicatorDot aria-hidden="true" />
                  <ThinkingBlockStepText
                    style={{ fontStyle: 'italic', opacity: 0.6 }}
                  >
                    Analyzing your request...
                  </ThinkingBlockStepText>
                </ThinkingBlockStep>
              )}
            </ThinkingBlockSteps>

            {isThinking && steps.length > 0 && (
              <ThinkingBlockIndicator
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <ThinkingBlockIndicatorDot aria-hidden="true" />
                <ThinkingBlockIndicatorText>Thinking...</ThinkingBlockIndicatorText>
              </ThinkingBlockIndicator>
            )}
          </ThinkingBlockContent>
        )}
      </AnimatePresence>
    </ThinkingBlockWrapper>
  );
};
