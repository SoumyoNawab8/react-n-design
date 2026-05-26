'use client';
import type React from 'react';
import { FaCheck } from '../../icons';
import {
  StepsConnector,
  StepsIcon,
  StepsItem,
  StepsItemContent,
  StepsItemDescription,
  StepsItemIcon,
  StepsItemTitle,
  StepsWrapper,
} from './Steps.styles';

export interface StepsItemData {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StepsProps {
  /** Array of step items */
  items: StepsItemData[];
  /** Current active step index */
  current?: number;
  /** Direction of the steps: horizontal or vertical */
  direction?: 'horizontal' | 'vertical';
  /** Size of the step indicators */
  size?: 'small' | 'default' | 'large';
  /** Callback when a step is clicked (enables navigation) */
  onChange?: (current: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

/**
 * Steps component - A multi-step wizard component with visual step indicators,
 * connectors between steps, and optional click navigation.
 *
 * @example
 * <Steps
 *   items={[
 *     { title: 'Account', description: 'Create your account', icon: <FaUser /> },
 *     { title: 'Profile', description: 'Set up your profile', icon: <FaIdCard /> },
 *     { title: 'Confirm', description: 'Review and confirm', icon: <FaCheckCircle /> },
 *   ]}
 *   current={1}
 *   direction="horizontal"
 *   size="default"
 *   onChange={(step) => console.log('Step:', step)}
 * />
 */
export const Steps = ({
  items,
  current = 0,
  direction = 'horizontal',
  size = 'default',
  onChange,
  className,
  style,
}: StepsProps) => {
  const isClickable = !!onChange;

  const handleStepClick = (index: number) => {
    if (isClickable && index !== current) {
      onChange(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (!isClickable) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleStepClick(index);
    }
  };

  return (
    <StepsWrapper
      direction={direction}
      size={size}
      role="navigation"
      aria-label="Steps"
      className={className}
      style={style}
    >
      {items.map((item, index) => {
        const isActive = index === current;
        const isCompleted = index < current;
        const isPending = index > current;

        return (
          <StepsItem
            // biome-ignore lint/suspicious/noArrayIndexKey: Step order is sequential and stable
            key={index}
            direction={direction}
            size={size}
            isActive={isActive}
            isCompleted={isCompleted}
            isClickable={isClickable}
            onClick={() => handleStepClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : -1}
            aria-current={isActive ? 'step' : undefined}
            aria-disabled={isPending}
          >
            {/* Step Dot/Icon */}
            <StepsItemIcon
              direction={direction}
              size={size}
              isActive={isActive}
              isCompleted={isCompleted}
            >
              {isCompleted ? (
                <StepsIcon size={size}>
                  <FaCheck />
                </StepsIcon>
              ) : item.icon ? (
                <StepsIcon size={size}>{item.icon}</StepsIcon>
              ) : (
                <span>{index + 1}</span>
              )}
            </StepsItemIcon>

            {/* Connector line */}
            {index < items.length - 1 && (
              <StepsConnector
                direction={direction}
                size={size}
                isCompleted={isCompleted}
                aria-hidden="true"
              />
            )}

            {/* Step Content (Title/Description) */}
            <StepsItemContent direction={direction}>
              <StepsItemTitle isActive={isActive} isCompleted={isCompleted}>
                {item.title}
              </StepsItemTitle>
              {item.description && (
                <StepsItemDescription isActive={isActive} isCompleted={isCompleted}>
                  {item.description}
                </StepsItemDescription>
              )}
            </StepsItemContent>
          </StepsItem>
        );
      })}
    </StepsWrapper>
  );
};
