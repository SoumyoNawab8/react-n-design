'use client';
import type React from 'react';
import { useCallback, useState } from 'react';
import { Check, Copy } from '../../icons';
import { Tooltip } from '../Tooltip';
import { StyledCopyButton, SuccessIcon, sizes } from './CopyButton.styles';

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /**
   * The text to copy to clipboard. If not provided, will attempt to copy
   * from the target element or current selection.
   */
  text?: string;
  /**
   * The target element to copy text from (useful for auto-detect).
   */
  targetRef?: React.RefObject<HTMLElement>;
  /**
   * Size variant of the button.
   * @default 'medium'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Tooltip text shown when hovering over the button before copying.
   * @default 'Copy to clipboard'
   */
  tooltipLabel?: string;
  /**
   * Tooltip text shown after successful copy.
   * @default 'Copied!'
   */
  successTooltipLabel?: string;
  /**
   * Duration in milliseconds to show the success state.
   * @default 2000
   */
  successDuration?: number;
  /**
   * Custom icon to show before copying.
   */
  copyIcon?: React.ReactNode;
  /**
   * Custom icon to show after successful copy.
   */
  successIcon?: React.ReactNode;
  /**
   * Called when copy operation succeeds.
   */
  onCopySuccess?: (text: string) => void;
  /**
   * Called when copy operation fails.
   */
  onCopyError?: (error: Error) => void;
  /**
   * ARIA label for the button.
   * @default 'Copy to clipboard'
   */
  'aria-label'?: string;
}

/**
 * A utility button that copies text to the clipboard.
 * Features icon toggle, tooltip feedback, and graceful fallback for older browsers.
 */
export const CopyButton = ({
  text,
  targetRef,
  size = 'md',
  tooltipLabel = 'Copy to clipboard',
  successTooltipLabel = 'Copied!',
  successDuration = 2000,
  copyIcon,
  successIcon,
  onCopySuccess,
  onCopyError,
  disabled,
  onClick,
  'aria-label': ariaLabel = 'Copy to clipboard',
  ...props
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isError, setIsError] = useState(false);

  const getTextToCopy = useCallback((): string | undefined => {
    if (text) return text;
    if (targetRef?.current) return targetRef.current.textContent || '';
    if (typeof window !== 'undefined') {
      const selection = window.getSelection()?.toString();
      if (selection) return selection;
    }
    return undefined;
  }, [text, targetRef]);

  const fallbackCopyText = useCallback((textToCopy: string): boolean => {
    try {
      // Create a temporary textarea to copy text from
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);

      return successful;
    } catch {
      return false;
    }
  }, []);

  const handleCopy = useCallback(async () => {
    const textToCopy = getTextToCopy();

    if (!textToCopy) {
      setIsError(true);
      setTimeout(() => setIsError(false), successDuration);
      return;
    }

    try {
      let success = false;

      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        success = true;
      } else {
        // Fallback for older browsers or non-secure contexts
        success = fallbackCopyText(textToCopy);
      }

      if (success) {
        setIsCopied(true);
        onCopySuccess?.(textToCopy);
        setTimeout(() => setIsCopied(false), successDuration);
      } else {
        throw new Error('Failed to copy text');
      }
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to copy text');
      setIsError(true);
      onCopyError?.(err);
      setTimeout(() => setIsError(false), successDuration);
    }
  }, [getTextToCopy, fallbackCopyText, onCopySuccess, onCopyError, successDuration]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      handleCopy();
      onClick?.(e);
    },
    [handleCopy, onClick]
  );

  const currentTooltipLabel = isError
    ? 'Failed to copy'
    : isCopied
      ? successTooltipLabel
      : tooltipLabel;

  const iconSize = sizes[size].iconSize;

  const defaultCopyIcon = <Copy size={iconSize} aria-hidden="true" />;
  const defaultSuccessIcon = (
    <SuccessIcon $size={size}>
      <Check size={iconSize} aria-hidden="true" />
    </SuccessIcon>
  );

  return (
    <Tooltip content={currentTooltipLabel} position="top">
      <StyledCopyButton
        size={size}
        $isCopied={isCopied}
        $isError={isError}
        disabled={disabled}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-live="polite"
        data-testid="copy-button"
        {...props}
      >
        {isCopied ? (successIcon ?? defaultSuccessIcon) : (copyIcon ?? defaultCopyIcon)}
      </StyledCopyButton>
    </Tooltip>
  );
};
