'use client';
import React, { memo, useMemo, useState } from 'react';
import {
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaCog,
  FaExclamationTriangle,
  FaSpinner,
} from '../../icons';
import { AnimatePresence, motion } from '../../utils/lazyMotion';
import {
  ArgsBlock,
  ArgsHeader,
  ArgsToggle,
  CardHeader,
  DurationBadge,
  ErrorMessage,
  ResultBlock,
  StatusIcon,
  StyledToolCallCard,
  ToolIcon,
  ToolName,
  ToolStatusBadge,
} from './ToolCallCard.styles';

export type ToolStatus = 'loading' | 'success' | 'error';

export interface ToolCallCardProps extends React.HTMLAttributes<HTMLDivElement> {
  toolName: string;
  toolIcon?: React.ReactNode;
  status: ToolStatus;
  args?: Record<string, unknown>;
  result?: string | React.ReactNode;
  errorMessage?: string;
  durationMs?: number;
  className?: string;
}

const statusConfig: Record<
  ToolStatus,
  { icon: React.ReactNode; label: string; badgeColor: string }
> = {
  loading: {
    icon: <FaSpinner />,
    label: 'Loading',
    badgeColor: '#6d5dfc',
  },
  success: {
    icon: <FaCheck />,
    label: 'Success',
    badgeColor: '#28a745',
  },
  error: {
    icon: <FaExclamationTriangle />,
    label: 'Error',
    badgeColor: '#dc3545',
  },
};

const formatDuration = (ms: number): string => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
};

const formatArgs = (args: Record<string, unknown> | undefined): string => {
  if (!args || Object.keys(args).length === 0) return '{}';
  return JSON.stringify(args, null, 2);
};

const ToolCallCardComponent = ({
  toolName,
  toolIcon,
  status,
  args,
  result,
  errorMessage,
  durationMs,
  className,
  ...props
}: ToolCallCardProps) => {
  const [argsExpanded, setArgsExpanded] = useState(status !== 'success');
  const config = statusConfig[status];

  const argsContent = useMemo(() => formatArgs(args), [args]);
  const hasArgs = args && Object.keys(args).length > 0;

  return (
    <StyledToolCallCard
      status={status}
      role="region"
      aria-label={`Tool call: ${toolName}`}
      aria-live="polite"
      className={className}
      {...props}
    >
      <CardHeader>
        <ToolIcon status={status} aria-hidden="true">
          {toolIcon || <FaCog />}
        </ToolIcon>
        <ToolName>{toolName}</ToolName>
        <ToolStatusBadge status={status}>{config.label}</ToolStatusBadge>
        {durationMs !== undefined && (
          <DurationBadge aria-label={`Duration: ${formatDuration(durationMs)}`}>
            {formatDuration(durationMs)}
          </DurationBadge>
        )}
        <StatusIcon status={status} aria-hidden="true">
          {config.icon}
        </StatusIcon>
      </CardHeader>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={status}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {hasArgs && (
            <ArgsBlock>
              {status === 'success' ? (
                <>
                  <ArgsHeader>
                    <span>Arguments</span>
                    <ArgsToggle
                      onClick={() => setArgsExpanded((e) => !e)}
                      aria-expanded={argsExpanded}
                      aria-label={argsExpanded ? 'Collapse arguments' : 'Expand arguments'}
                    >
                      <span aria-hidden="true">{argsExpanded ? <FaChevronUp /> : <FaChevronDown />}</span>
                      {argsExpanded ? 'Hide' : 'Show'}
                    </ArgsToggle>
                  </ArgsHeader>
                  <div
                    style={{
                      overflow: 'hidden',
                      maxHeight: argsExpanded ? 500 : 0,
                      opacity: argsExpanded ? 1 : 0,
                      transition: 'max-height 0.2s ease, opacity 0.2s ease',
                    }}
                  >
                    <pre>{argsContent}</pre>
                  </div>
                </>
              ) : (
                <pre>{argsContent}</pre>
              )}
            </ArgsBlock>
          )}

          {status === 'success' && result !== undefined && (
            <ResultBlock>
              <span>Result</span>
              {typeof result === 'string' ? <p>{result}</p> : <div>{result}</div>}
            </ResultBlock>
          )}

          {status === 'error' && errorMessage && (
            <ErrorMessage role="alert">
              <span>Error</span>
              <p>{errorMessage}</p>
            </ErrorMessage>
          )}
        </motion.div>
      </AnimatePresence>
    </StyledToolCallCard>
  );
};

export const ToolCallCard = memo(ToolCallCardComponent);
ToolCallCard.displayName = 'ToolCallCard';
