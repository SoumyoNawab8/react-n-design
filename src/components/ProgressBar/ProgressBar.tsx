import React from 'react';
import { ProgressBarWrapper, ProgressBarFill, ProgressLabel } from './ProgressBar.styles';

export interface ProgressBarProps {
  value: number;
  size?: 'small' | 'medium';
  showLabel?: boolean;
  /**
   * Sets the visual style of the progress bar.
   */
  variant?: 'default' | 'striped';
  /**
   * Sets the color of the bar based on status.
   */
  status?: 'normal' | 'success' | 'error';
  /**
   * For when progress is unknown. Overrides `value`.
   */
  indeterminate?: boolean;
}

/**
 * An advanced progress bar with status, striped, and indeterminate variants.
 */
export const ProgressBar = ({
  value,
  size = 'medium',
  showLabel = false,
  variant = 'default',
  status = 'normal',
  indeterminate = false,
}: ProgressBarProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <ProgressBarWrapper size={size}>
      <ProgressBarFill
        style={{ width: indeterminate ? '100%' : `${clampedValue}%` }}
        status={status}
        variant={variant}
        isIndeterminate={indeterminate}
      />
      {showLabel && !indeterminate && <ProgressLabel>{`${Math.round(clampedValue)}%`}</ProgressLabel>}
    </ProgressBarWrapper>
  );
};