'use client';
import React, { useCallback, useState } from 'react';
import { FaUser } from '../../icons';
import {
  AvatarFallback,
  AvatarGroupOverflow,
  AvatarGroupWrapper,
  AvatarImage,
  AvatarWrapper,
} from './Avatar.styles';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  shape?: 'circle' | 'square' | 'rounded';
}

export const Avatar = ({
  src,
  alt = '',
  initials,
  icon,
  size = 'medium',
  shape = 'circle',
}: AvatarProps) => {
  const [imgError, setImgError] = useState(false);

  const handleError = useCallback(() => {
    setImgError(true);
  }, []);

  const showImage = src && !imgError;
  const showInitials = !showImage && initials;
  const showIcon = !showImage && !showInitials;

  return (
    <AvatarWrapper size={size} shape={shape} role="img" aria-label={alt || initials || 'Avatar'}>
      {showImage && <AvatarImage src={src} alt={alt} onError={handleError} loading="lazy" />}
      {showInitials && <AvatarFallback aria-hidden="true">{initials}</AvatarFallback>}
      {showIcon && <AvatarFallback aria-hidden="true">{icon || <FaUser />}</AvatarFallback>}
    </AvatarWrapper>
  );
};

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

export const AvatarGroup = ({ children, max, size = 'medium' }: AvatarGroupProps) => {
  const allChildren = React.Children.toArray(children);
  const visibleChildren = max ? allChildren.slice(0, max) : allChildren;
  const overflowCount = max ? allChildren.length - max : 0;

  return (
    <AvatarGroupWrapper role="group" aria-label="Avatar group">
      {visibleChildren.map((child, index) =>
        React.cloneElement(child as React.ReactElement, { size, key: index })
      )}
      {overflowCount > 0 && (
        <AvatarGroupOverflow size={size} aria-label={`${overflowCount} more`}>
          +{overflowCount}
        </AvatarGroupOverflow>
      )}
    </AvatarGroupWrapper>
  );
};
