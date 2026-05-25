'use client';
import type React from 'react';

export interface SkipToContentProps {
  /**
   * The id of the main content container to skip to.
   * @default 'main-content'
   */
  targetId?: string;
  /**
   * The visible text of the skip link.
   * @default 'Skip to main content'
   */
  label?: string;
}

/**
 * Provides a keyboard-focusable "skip to content" link for screen-reader
 * and keyboard users, allowing them to bypass repetitive navigation.
 */
export const SkipToContent = ({
  targetId = 'main-content',
  label = 'Skip to main content',
}: SkipToContentProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.setAttribute('tabIndex', '-1');
      target.focus();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: '-40px',
        left: 0,
        background: '#000',
        color: '#fff',
        padding: '8px 16px',
        textDecoration: 'none',
        zIndex: 10000,
        transition: 'top 0.3s',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = '0';
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-40px';
      }}
    >
      {label}
    </a>
  );
};
