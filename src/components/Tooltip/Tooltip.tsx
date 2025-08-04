import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TooltipWrapper, TooltipContent } from './Tooltip.styles';

export interface TooltipProps {
  children: React.ReactElement;
  /**
   * The content to display inside the tooltip. Can be a string or any React node.
   */
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * How the tooltip is triggered.
   */
  trigger?: 'hover' | 'click' | 'focus';
  /**
   * Manually controls the visibility of the tooltip.
   */
  isOpen?: boolean;
  /**
   * Delay in milliseconds before showing the tooltip on hover.
   */
  mouseEnterDelay?: number;
  /**
   * Delay in milliseconds before hiding the tooltip on hover.
   */
  mouseLeaveDelay?: number;
  /**
   * If `false`, the pointer arrow will be hidden.
   */
  withArrow?: boolean;
}

/**
 * An advanced tooltip with multiple triggers, delays, and rich content support.
 */
export const Tooltip = ({
  children,
  content,
  position = 'top',
  trigger = 'hover',
  isOpen,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 200,
  withArrow = true,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const enterTimer = useRef<NodeJS.Timeout>();
  const leaveTimer = useRef<NodeJS.Timeout>();

  const isControlled = isOpen !== undefined;
  const visible = isControlled ? isOpen : isVisible;

  const showTooltip = () => {
    clearTimeout(leaveTimer.current);
    enterTimer.current = setTimeout(() => setIsVisible(true), mouseEnterDelay);
  };

  const hideTooltip = () => {
    clearTimeout(enterTimer.current);
    leaveTimer.current = setTimeout(() => setIsVisible(false), mouseLeaveDelay);
  };

  const toggleTooltip = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    return () => {
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
    };
  }, []);
  
  const triggerProps: React.HTMLAttributes<HTMLElement> = {};

  if (trigger === 'hover') {
    triggerProps.onMouseEnter = showTooltip;
    triggerProps.onMouseLeave = hideTooltip;
  } else if (trigger === 'click') {
    triggerProps.onClick = toggleTooltip;
  } else if (trigger === 'focus') {
    triggerProps.onFocus = showTooltip;
    triggerProps.onBlur = hideTooltip;
  }

  return (
    <TooltipWrapper>
      {React.cloneElement(children, triggerProps)}
      <AnimatePresence>
        {visible && (
          <TooltipContent
            position={position}
            withArrow={withArrow}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.1 } }}
          >
            {content}
          </TooltipContent>
        )}
      </AnimatePresence>
    </TooltipWrapper>
  );
};