'use client';
import type React from 'react';
import { useState } from 'react';
import {
  RatingContainer,
  RatingItem,
  RatingStar,
} from './Rating.styles';
import { FaStar, FaRegStar, FaStarHalf } from '../../icons';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * Current rating value.
   * Supports integers and half values (e.g., 3.5).
   */
  value: number;
  /**
   * Maximum rating value.
   * @default 5
   */
  max?: number;
  /**
   * Rating precision (allows 0.5 for half stars, or 1 for whole stars).
   * @default 1
   */
  precision?: 0.5 | 1;
  /**
   * Whether the rating is read-only.
   * @default false
   */
  readOnly?: boolean;
  /**
   * Callback fired when the rating changes.
   */
  onChange?: (value: number) => void;
  /**
   * Size of the rating stars.
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Custom accessible label.
   * @default 'Rating'
   */
  label?: string;
}

/**
 * A star rating component with 0.5 precision support and read-only mode.
 * Supports accessibility via keyboard navigation.
 */
export const Rating = ({
  value,
  max = 5,
  precision = 1,
  readOnly = false,
  onChange,
  size = 'medium',
  label = 'Rating',
  ...props
}: RatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const clampedValue = Math.min(Math.max(value, 0), max);
  const displayValue = hoverValue ?? clampedValue;

  const handleStarClick = (starIndex: number, isHalf: boolean) => {
    if (readOnly) return;
    
    const newValue = isHalf && precision === 0.5 
      ? starIndex + 0.5 
      : starIndex + 1;
    
    onChange?.(newValue);
  };

  const handleMouseMove = (event: React.MouseEvent, starIndex: number) => {
    if (readOnly) return;
    
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const isHalf = precision === 0.5 && x < rect.width / 2;
    
    setHoverValue(isHalf ? starIndex + 0.5 : starIndex + 1);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent, starIndex: number) => {
    if (readOnly) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleStarClick(starIndex, false);
    }
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const displayStarValue = displayValue;
    
    let starType: 'full' | 'half' | 'empty' = 'empty';
    if (displayStarValue >= starValue) {
      starType = 'full';
    } else if (displayStarValue >= starValue - 0.5) {
      starType = 'half';
    }

    return (
      <RatingItem
        key={index}
        onClick={(e) => handleStarClick(index, false)}
        onMouseMove={(e) => handleMouseMove(e, index)}
        onMouseLeave={handleMouseLeave}
        onKeyDown={(e) => handleKeyDown(e, index)}
        $isReadOnly={readOnly}
        tabIndex={readOnly ? -1 : 0}
        role="button"
        aria-label={`Rate ${starValue} out of ${max}`}
      >
        {starType === 'full' && (
          <RatingStar $isFilled $size={size}>
            <FaStar />
          </RatingStar>
        )}
        {starType === 'half' && precision === 0.5 && (
          <RatingStar $isFilled $isHalf $size={size}>
            <FaStarHalf />
          </RatingStar>
        )}
        {(starType === 'empty' || (starType === 'half' && precision === 1)) && (
          <RatingStar $isFilled={false} $size={size}>
            <FaRegStar />
          </RatingStar>
        )}
      </RatingItem>
    );
  };

  return (
    <RatingContainer
      role="img"
      aria-label={`${label}: ${clampedValue} out of ${max}`}
      {...props}
    >
      {Array.from({ length: max }, (_, i) => renderStar(i))}
    </RatingContainer>
  );
};