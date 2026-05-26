'use client';
import type React from 'react';
import { useCallback, useState } from 'react';
import { FaCheck } from '../../icons';
import { Button } from '../Button';
import {
  StepperActions,
  StepperCircle,
  StepperContent,
  StepperDescription,
  StepperItem,
  StepperTitle,
  StepperWrapper,
} from './Stepper.styles';

export interface StepItem {
  title: string;
  description?: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface StepperProps {
  steps: StepItem[];
  activeStep?: number;
  defaultActiveStep?: number;
  onChange?: (step: number) => void;
  onComplete?: () => void;
  allowClickBack?: boolean;
  orientation?: 'horizontal' | 'vertical';
}

export const Stepper = ({
  steps,
  activeStep,
  defaultActiveStep = 0,
  onChange,
  onComplete,
  allowClickBack = true,
  orientation = 'horizontal',
}: StepperProps) => {
  const isControlled = activeStep !== undefined;
  const [internalStep, setInternalStep] = useState(defaultActiveStep);
  const currentStep = isControlled ? activeStep! : internalStep;
  const totalSteps = steps.length;

  const goToStep = useCallback(
    (step: number) => {
      if (step < 0 || step >= totalSteps) return;
      if (steps[step]?.disabled) return;
      if (!isControlled) setInternalStep(step);
      onChange?.(step);
    },
    [isControlled, onChange, totalSteps, steps]
  );

  const handleNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      goToStep(currentStep + 1);
    } else {
      onComplete?.();
    }
  }, [currentStep, totalSteps, goToStep, onComplete]);

  const handleBack = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const handleStepClick = useCallback(
    (index: number) => {
      if (!allowClickBack) return;
      if (index <= currentStep) {
        goToStep(index);
      }
    },
    [allowClickBack, currentStep, goToStep]
  );

  const isLastStep = currentStep === totalSteps - 1;
  const currentItem = steps[currentStep];

  return (
    <div role="region" aria-label="Stepper">
      <StepperWrapper role="tablist" aria-orientation={orientation}>
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;
          const isClickable = allowClickBack && index <= currentStep && !step.disabled;

          return (
            <StepperItem
              // biome-ignore lint/suspicious/noArrayIndexKey: Step order is sequential and stable
              key={index}
              isActive={isActive}
              isCompleted={isCompleted}
              isClickable={isClickable}
              role="tab"
              aria-selected={isActive}
              aria-disabled={step.disabled || (!isClickable && !isActive)}
              tabIndex={isActive ? 0 : -1}
              onClick={() => handleStepClick(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleStepClick(index);
                }
              }}
            >
              <StepperCircle isActive={isActive} isCompleted={isCompleted}>
                {isCompleted ? <FaCheck size={14} /> : index + 1}
              </StepperCircle>
              <StepperTitle isActive={isActive}>{step.title}</StepperTitle>
              {step.description && <StepperDescription>{step.description}</StepperDescription>}
            </StepperItem>
          );
        })}
      </StepperWrapper>

      {currentItem?.content && (
        <StepperContent role="tabpanel" aria-label={`Step ${currentStep + 1}`}>
          {currentItem.content}
        </StepperContent>
      )}

      <StepperActions>
        {currentStep > 0 && (
          <Button variant="secondary" onClick={handleBack}>
            Back
          </Button>
        )}
        <Button onClick={handleNext}>{isLastStep ? 'Finish' : 'Next'}</Button>
      </StepperActions>
    </div>
  );
};
