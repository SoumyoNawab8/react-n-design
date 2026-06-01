'use client';
import { useEffect, useState } from 'react';
import { Markdown } from '../Markdown';
import { StreamingTextCursor, StreamingTextWrapper } from './StreamingText.styles';

export interface StreamingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  renderMarkdown?: boolean;
  className?: string;
}

export const StreamingText = ({
  text,
  speed = 30,
  onComplete,
  renderMarkdown = false,
  className,
}: StreamingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);

    if (text.length === 0) {
      setIsComplete(true);
      onComplete?.();
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
      }
      if (index >= text.length) {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  const content =
    isComplete && renderMarkdown ? (
      <Markdown>{text}</Markdown>
    ) : (
      <>{displayedText}</>
    );

  return (
    <StreamingTextWrapper
      className={className}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {content}
      {!isComplete && <StreamingTextCursor aria-hidden="true" />}
    </StreamingTextWrapper>
  );
};
