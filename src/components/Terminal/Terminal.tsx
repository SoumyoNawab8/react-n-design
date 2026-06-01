'use client';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Copy } from '../../icons';
import {
  CopyButton,
  TerminalContainer,
  TerminalContent,
  TerminalHeader,
  TerminalLine,
  TerminalLinePrefix,
  TerminalLineTimestamp,
  TerminalTitle,
  TerminalTitleBar,
  TerminalWindowControls,
  TerminalWindowDot,
} from './Terminal.styles';

export type TerminalLineType = 'command' | 'output' | 'error' | 'info';

export interface TerminalLine {
  content: string;
  type?: TerminalLineType;
  timestamp?: string;
}

export interface TerminalProps {
  lines: TerminalLine[];
  title?: string;
  showTimestamps?: boolean;
  maxHeight?: string;
  autoScroll?: boolean;
  className?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  lines,
  title = 'Terminal',
  showTimestamps = false,
  maxHeight,
  autoScroll = true,
  className,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (autoScroll && contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, autoScroll]);

  const handleCopy = useCallback(async () => {
    const text = lines.map((line) => line.content).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [lines]);

  return (
    <TerminalContainer className={className} role="region" aria-label={title} data-testid="terminal">
      <TerminalHeader>
        <TerminalTitleBar>
          <TerminalWindowControls aria-hidden="true">
            <TerminalWindowDot $color="#ff5f56" />
            <TerminalWindowDot $color="#ffbd2e" />
            <TerminalWindowDot $color="#27c93f" />
          </TerminalWindowControls>
          <TerminalTitle>{title}</TerminalTitle>
        </TerminalTitleBar>
        <CopyButton
          onClick={handleCopy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy terminal output'}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          <Copy size={14} aria-hidden="true" />
          {copied && <span>Copied!</span>}
        </CopyButton>
      </TerminalHeader>
      <TerminalContent ref={contentRef} $maxHeight={maxHeight} data-testid="terminal-content">
        {lines.map((line, index) => (
          <TerminalLine key={index} $type={line.type ?? 'output'}>
            {line.type === 'command' && <TerminalLinePrefix>$ </TerminalLinePrefix>}
            {showTimestamps && line.timestamp && (
              <TerminalLineTimestamp>{line.timestamp}</TerminalLineTimestamp>
            )}
            <span>{line.content}</span>
          </TerminalLine>
        ))}
      </TerminalContent>
    </TerminalContainer>
  );
};
