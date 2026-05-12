'use client';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  CarouselWrapper,
  CarouselTrack,
  CarouselSlide,
  CarouselNavButton,
  CarouselDots,
  CarouselDot,
  CarouselCounter,
} from './Carousel.styles';

export interface CarouselProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showNav?: boolean;
  showCounter?: boolean;
  loop?: boolean;
  onChange?: (index: number) => void;
}

export const Carousel = ({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showNav = true,
  showCounter = false,
  loop = false,
  onChange,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = React.Children.count(children);

  const goTo = useCallback(
    (index: number) => {
      let next = index;
      if (loop) {
        next = ((index % total) + total) % total;
      } else {
        next = Math.max(0, Math.min(total - 1, index));
      }
      setDirection(next > currentIndex ? 1 : -1);
      setCurrentIndex(next);
      onChange?.(next);
    },
    [currentIndex, total, loop, onChange]
  );

  const goNext = useCallback(() => {
    goTo(currentIndex + 1);
  }, [currentIndex, goTo]);

  const goPrev = useCallback(() => {
    goTo(currentIndex - 1);
  }, [currentIndex, goTo]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goPrev();
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(total - 1);
          break;
      }
    },
    [goNext, goPrev, goTo, total]
  );

  useEffect(() => {
    if (!autoPlay || total <= 1) return;
    timerRef.current = setInterval(goNext, autoPlayInterval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, autoPlayInterval, goNext, total]);

  const variants = {
    enter: (d: number) => ({
      x: d > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (d: number) => ({
      x: d > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const canGoPrev = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < total - 1;

  const slides = React.Children.toArray(children);

  return (
    <CarouselWrapper
      role="region"
      aria-label="Carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        if (timerRef.current) clearInterval(timerRef.current);
      }}
      onMouseLeave={() => {
        if (autoPlay && total > 1) {
          timerRef.current = setInterval(goNext, autoPlayInterval);
        }
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', minHeight: '120px' }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <CarouselSlide
            key={currentIndex}
            as={motion.div}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${currentIndex + 1} of ${total}`}
          >
            {slides[currentIndex]}
          </CarouselSlide>
        </AnimatePresence>
      </div>

      {showNav && total > 1 && (
        <>
          <CarouselNavButton
            position="left"
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Previous slide"
          >
            <FaChevronLeft size={16} />
          </CarouselNavButton>
          <CarouselNavButton
            position="right"
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Next slide"
          >
            <FaChevronRight size={16} />
          </CarouselNavButton>
        </>
      )}

      {showDots && total > 1 && (
        <CarouselDots role="tablist" aria-label="Carousel slides">
          {slides.map((_, i) => (
            <CarouselDot
              key={i}
              isActive={i === currentIndex}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
            />
          ))}
        </CarouselDots>
      )}

      {showCounter && total > 1 && (
        <CarouselCounter aria-live="polite" aria-atomic="true">
          {currentIndex + 1} / {total}
        </CarouselCounter>
      )}
    </CarouselWrapper>
  );
};
