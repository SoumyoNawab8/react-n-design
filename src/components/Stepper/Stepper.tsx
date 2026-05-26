'use client';
import { motion, useSpring, useTransform } from 'framer-motion';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { FaCheck } from '../../icons';
import { Button } from '../Button';
import {
  StepperActions,
  StepperCircle,
  StepperConnector,
  StepperContent,
  StepperDescription,
  StepperItem,
  StepperTitle,
  StepperWrapper,
} from './Stepper.styles';

// Types
export interface StepItem {
  title: string;
  description?: string;
  content?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface StepperConnectorStyles {
  completedColor?: string;
  pendingColor?: string;
  height?: number;
  gap?: number;
}

export interface StepperProps {
  steps: StepItem[];
  activeStep?: number;
  defaultActiveStep?: number;
  onChange?: (step: number) => void;
  onComplete?: () => void;
  allowClickBack?: boolean;
  orientation?: 'horizontal' | 'vertical';
  orientationBreakpoint?: number;
  variant?: 'default' | 'glass';
  iconOnly?: boolean;
  showConnectors?: boolean;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  style?: React.CSSProperties;
  className?: string;
  connectorStyles?: StepperConnectorStyles;
}

// Animation variants
const itemVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.95 },
};

const contentVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const Stepper: React.FC<StepperProps> = memo(
  ({
    steps,
    activeStep,
    defaultActiveStep = 0,
    onChange,
    onComplete,
    allowClickBack = true,
    orientation = 'horizontal',
    orientationBreakpoint = 640, // Default mobile breakpoint
    variant = 'default',
    iconOnly = false,
    showConnectors = true,
    springConfig = { stiffness: 300, damping: 30, mass: 1 },
    style,
    className,
    connectorStyles,
  }) => {
    const isControlled = activeStep !== undefined;
    const [internalStep, setInternalStep] = useState(defaultActiveStep);
    const currentStep = isControlled ? activeStep! : internalStep;
    const totalSteps = steps.length;
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Handle responsive orientation
    React.useEffect(() => {
      if (orientation !== 'horizontal' || !containerRef.current) return;

      const checkMobile = () => {
        const width = containerRef.current?.offsetWidth || window.innerWidth;
        setIsMobile(width < orientationBreakpoint);
      };

      checkMobile();
      const resizeObserver = new ResizeObserver(checkMobile);
      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      return () => resizeObserver.disconnect();
    }, [orientation, orientationBreakpoint]);

    const effectiveOrientation = useMemo(() => {
      if (orientation === 'horizontal' && isMobile) return 'vertical';
      return orientation;
    }, [orientation, isMobile]);

    // Memoized step calculations
    const stepCalculations = useMemo(() => {
      return steps.map((_, index) => ({
        isActive: index === currentStep,
        isCompleted: index < currentStep,
        isPending: index > currentStep,
        isClickable: allowClickBack && index <= currentStep && !steps[index]?.disabled,
        progress: Math.min(Math.max((currentStep - index) * 100, 0), 100),
      }));
    }, [steps, currentStep, allowClickBack]);

    // Spring animation for progress
    const springProgress = useSpring(currentStep, {
      stiffness: springConfig.stiffness ?? 300,
      damping: springConfig.damping ?? 30,
      mass: springConfig.mass ?? 1,
    });

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
        const calc = stepCalculations[index];
        if (!calc.isClickable) return;
        goToStep(index);
      },
      [stepCalculations, goToStep]
    );

    const isLastStep = currentStep === totalSteps - 1;
    const currentItem = steps[currentStep];

    return (
      <div
        ref={containerRef}
        role="region"
        aria-label="Stepper"
        style={style}
        className={className}
      >
        <StepperWrapper
          role="tablist"
          aria-orientation={effectiveOrientation}
          $orientation={effectiveOrientation}
          $variant={variant}
        >
          {steps.map((step, index) => {
            const calc = stepCalculations[index];

            return (
              <StepperItem
                key={index}
                $isActive={calc.isActive}
                $isCompleted={calc.isCompleted}
                $isClickable={calc.isClickable}
                $orientation={effectiveOrientation}
                $variant={variant}
                $iconOnly={iconOnly}
                role="tab"
                aria-selected={calc.isActive}
                aria-disabled={step.disabled || (!calc.isClickable && !calc.isActive)}
                tabIndex={calc.isActive ? 0 : -1}
                onClick={() => !iconOnly && handleStepClick(index)}
                onKeyDown={(e) => {
                  if (iconOnly) return;
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStepClick(index);
                  }
                }}
                initial="initial"
                animate="animate"
                whileHover={calc.isClickable ? 'hover' : undefined}
                whileTap={calc.isClickable ? 'tap' : undefined}
                variants={itemVariants}
                transition={{
                  type: 'spring',
                  stiffness: springConfig.stiffness,
                  damping: springConfig.damping,
                  delay: index * 0.05,
                }}
              >
                <StepperCircle
                  $isActive={calc.isActive}
                  $isCompleted={calc.isCompleted}
                  $orientation={effectiveOrientation}
                  $variant={variant}
                  $iconOnly={iconOnly}
                >
                  {step.icon ? (
                    <motion.div
                      initial={false}
                      animate={{ scale: calc.isActive ? 1.1 : 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {step.icon}
                    </motion.div>
                  ) : calc.isCompleted ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 20,
                        delay: 0.1,
                      }}
                    >
                      <FaCheck size={iconOnly ? 18 : 14} />
                    </motion.div>
                  ) : (
                    <motion.span
                      key={index + 1}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {!iconOnly && index + 1}
                    </motion.span>
                  )}
                </StepperCircle>

                {!iconOnly && (
                  <>
                    <StepperTitle $isActive={calc.isActive} $variant={variant}>
                      {step.title}
                    </StepperTitle>
                    {step.description && (
                      <StepperDescription $variant={variant}>
                        {step.description}
                      </StepperDescription>
                    )}
                  </>
                )}

                {showConnectors && index < totalSteps - 1 && (
                  <StepperConnector
                    $isCompleted={calc.isCompleted}
                    $orientation={effectiveOrientation}
                    $variant={variant}
                    $connectorStyles={connectorStyles}
                    style={{
                      ['--progress' as string]: calc.isCompleted
                        ? '100%'
                        : `${calc.progress}%`,
                    }}
                  />
                )}
              </StepperItem>
            );
          })}
        </StepperWrapper>

        {currentItem?.content && (
          <motion.div
            key={currentStep}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contentVariants}
            transition={{
              type: 'spring',
              stiffness: springConfig.stiffness,
              damping: springConfig.damping,
            }}
          >
            <StepperContent
              role="tabpanel"
              aria-label={`Step ${currentStep + 1}`}
              $orientation={effectiveOrientation}
            >
              {currentItem.content}
            </StepperContent>
          </motion.div>
        )}

        <StepperActions>
          {currentStep > 0 && (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button onClick={handleNext} variant={isLastStep ? 'primary' : 'primary'}>
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </StepperActions>
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';
