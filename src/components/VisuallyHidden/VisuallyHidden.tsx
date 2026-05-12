'use client';
import React from 'react';

export interface VisuallyHiddenProps {
  children: React.ReactNode;
}

/**
 * Hides content visually while keeping it accessible to assistive technologies.
 * Useful for adding context for screen-reader users without affecting the layout.
 */
export const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
  return (
    <span
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      {children}
    </span>
  );
};
