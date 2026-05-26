'use client';
import { useEffect, useRef, useState } from 'react';
import { FaBrain } from '../../icons';
import {
  AIThinkingActiveDot,
  AIThinkingElapsed,
  AIThinkingHeader,
  AIThinkingIcon,
  AIThinkingStep,
  AIThinkingStepNumber,
  AIThinkingSteps,
  AIThinkingStepText,
  AIThinkingTitle,
  AIThinkingToggle,
  AIThinkingWrapper,
} from './AIThinking.styles';

export interface ThinkingStep {
  text: string;
  id?: string;
}

export interface AIThinkingProps {
  steps: ThinkingStep[];
  isThinking?: boolean;
  title?: string;
  defaultExpanded?: boolean;
  showElapsed?: boolean;
  startTime?: number; // Date.now() timestamp
}

export const AIThinking = ({
  steps,
  isThinking = true,
  title = 'Thinking',
  defaultExpanded = true,
  showElapsed = true,
  startTime,
}: AIThinkingProps) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isThinking || !startTime) return;
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isThinking, startTime]);

  const formatElapsed = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AIThinkingWrapper role="region" aria-label="AI reasoning steps" aria-live="polite">
      <AIThinkingHeader onClick={() => setExpanded((e) => !e)}>
        <AIThinkingIcon aria-hidden="true">
          <FaBrain />
        </AIThinkingIcon>
        <AIThinkingTitle>{title}</AIThinkingTitle>
        {isThinking && <AIThinkingActiveDot aria-hidden="true" />}
        {showElapsed && startTime && (
          <AIThinkingElapsed aria-label={`Elapsed time: ${formatElapsed(elapsed)}`}>
            {formatElapsed(elapsed)}
          </AIThinkingElapsed>
        )}
        <AIThinkingToggle>{expanded ? 'Hide' : 'Show'}</AIThinkingToggle>
      </AIThinkingHeader>

      {expanded && (
        <AIThinkingSteps>
          {steps.map((step, index) => (
            <AIThinkingStep key={step.id || `step-${index}`}>
              <AIThinkingStepNumber aria-hidden="true">{index + 1}</AIThinkingStepNumber>
              <AIThinkingStepText>{step.text}</AIThinkingStepText>
            </AIThinkingStep>
          ))}
          {isThinking && steps.length === 0 && (
            <AIThinkingStep>
              <AIThinkingActiveDot style={{ marginTop: 6 }} />
              <AIThinkingStepText style={{ fontStyle: 'italic', opacity: 0.6 }}>
                Analyzing your request...
              </AIThinkingStepText>
            </AIThinkingStep>
          )}
        </AIThinkingSteps>
      )}
    </AIThinkingWrapper>
  );
};
