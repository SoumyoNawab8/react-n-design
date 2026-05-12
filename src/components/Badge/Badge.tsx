'use client';
import React from 'react';
import { BadgeWrapper, BadgeContainer, BadgePositioned } from './Badge.styles';

export interface BadgeProps {
  children?: React.ReactNode;
  count?: number | string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'small' | 'medium';
  dot?: boolean;
  showZero?: boolean;
  overflowCount?: number;
}

export const Badge = ({
  children,
  count,
  variant = 'primary',
  size = 'medium',
  dot = false,
  showZero = false,
  overflowCount = 99,
}: BadgeProps) => {
  const displayCount =
    typeof count === 'number' && count > overflowCount ? `${overflowCount}+` : count;

  const showBadge = dot || (count !== undefined && (count !== 0 || showZero));

  if (!children) {
    return (
      <BadgeWrapper variant={variant} size={size} dot={dot}>
        {dot ? null : displayCount}
      </BadgeWrapper>
    );
  }

  return (
    <BadgeContainer>
      {children}
      {showBadge && (
        <BadgePositioned variant={variant} size={size} dot={dot}>
          {dot ? null : displayCount}
        </BadgePositioned>
      )}
    </BadgeContainer>
  );
};
