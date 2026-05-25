'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from '../../utils/lazyMotion';
import {
  TourOverlay,
  TourSpotlight,
  TourCard,
  TourArrow,
  TourButtons,
} from './Tour.styles';

export interface TourStep {
  target: string;
  title: string;
  description: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TourProps {
  steps: TourStep[];
  open: boolean;
  onClose: () => void;
  onFinish?: () => void;
}

export const Tour: React.FC<TourProps> = ({
  steps,
  open,
  onClose,
  onFinish,
}) => {
  const [current, setCurrent] = useState(0);

  const handleNext = useCallback(() => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    } else {
      onFinish?.();
      onClose();
    }
  }, [current, steps.length, onFinish, onClose]);

  const handlePrev = useCallback(() => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  }, [current]);

  const handleSkip = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!open || steps.length === 0) return null;

  const step = steps[current];
  const targetElement = typeof window !== 'undefined' 
    ? document.querySelector(step.target) 
    : null;

  const getPosition = () => {
    if (!targetElement) return { top: '50%', left: '50%' };
    const rect = targetElement.getBoundingClientRect();
    const placement = step.placement || 'bottom';
    
    const positions = {
      top: { top: rect.top - 20, left: rect.left + rect.width / 2 },
      bottom: { top: rect.bottom + 20, left: rect.left + rect.width / 2 },
      left: { top: rect.top + rect.height / 2, left: rect.left - 20 },
      right: { top: rect.top + rect.height / 2, left: rect.right + 20 },
    };
    
    return positions[placement];
  };

  const pos = getPosition();

  return (
    <TourOverlay
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <TourSpotlight
        style={targetElement ? {
          position: 'absolute',
          top: (targetElement.getBoundingClientRect().top - 8) + 'px',
          left: (targetElement.getBoundingClientRect().left - 8) + 'px',
          width: (targetElement.getBoundingClientRect().width + 16) + 'px',
          height: (targetElement.getBoundingClientRect().height + 16) + 'px',
        } : {}}
      />
      <TourCard
        as={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          position: 'absolute',
          top: `${pos.top}px`,
          left: `${pos.left}px`,
          transform: 'translate(-50%, -50%)',
        }}
        role="dialog"
        aria-modal="true"
        aria-live="polite"
      >
        <TourArrow $placement={step.placement || 'bottom'} />
        <h3>{step.title}</h3>
        <p>{step.description}</p>
        
        <TourButtons>
          <button onClick={handleSkip}>Skip</button>
          {current > 0 && <button onClick={handlePrev}>Previous</button>}
          <button onClick={handleNext} className="primary">
            {current === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </TourButtons>
        
        <div className="indicators">
          {steps.map((_, idx) => (
            <span key={idx} className={idx === current ? 'active' : ''} />
          ))}
        </div>
      </TourCard>
    </TourOverlay>
  );
};
