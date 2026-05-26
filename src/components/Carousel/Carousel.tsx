'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from '../../icons';
import {
  CarouselCounter,
  CarouselDot,
  CarouselDots,
  CarouselNavButton,
  CarouselSlide,
  CarouselTrack,
  CarouselViewport,
  CarouselWrapper,
  ProgressBar,
  ProgressFill,
  SlideContent,
  SlideDescription,
  SlideImage,
  SlidePlaceholder,
  SlideTitle,
} from './Carousel.styles';

export interface CarouselSlideItem {
  id: string | number;
  image?: string;
  title?: string;
  description?: string;
  content?: React.ReactNode;
}

export interface CarouselProps {
  /** Array of slide items or React nodes */
  items?: CarouselSlideItem[];
  /** Legacy: React node children (deprecated, use items instead) */
  children?: React.ReactNode[];
  /** Enable autoplay */
  autoPlay?: boolean;
  /** Autoplay interval in ms */
  autoPlayInterval?: number;
  /** Show dot navigation */
  showDots?: boolean;
  /** Show navigation arrows */
  showNav?: boolean;
  /** Show slide counter */
  showCounter?: boolean;
  /** Enable infinite loop */
  loop?: boolean;
  /** Show thumbnail previews */
  showThumbnails?: boolean;
  /** Enable swipe gestures */
  enableSwipe?: boolean;
  /** Callback when slide changes */
  onChange?: (index: number) => void;
  /** Callback when slide is clicked */
  onSlideClick?: (item: CarouselSlideItem, index: number) => void;
  /** Custom height */
  height?: string | number;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showNav = true,
  showCounter = false,
  showThumbnails = false,
  loop = false,
  enableSwipe = true,
  onChange,
  onSlideClick,
  height,
}) => {
  const slides = useMemo(() => {
    if (items) return items;
    if (children) {
      return React.Children.toArray(children).map((child, i) => ({
        id: i,
        content: child,
      }));
    }
    return [];
  }, [items, children]);

  const total = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const minSwipeDistance = 50;

  const goTo = useCallback(
    (index: number) => {
      let next = index;
      if (loop) {
        next = ((index % total) + total) % total;
      } else {
        next = Math.max(0, Math.min(total - 1, index));
      }
      setCurrentIndex(next);
      onChange?.(next);
    },
    [total, loop, onChange]
  );

  const goNext = useCallback(() => {
    if (loop || currentIndex < total - 1) {
      goTo(currentIndex + 1);
    } else {
      goTo(0);
    }
  }, [currentIndex, total, loop, goTo]);

  const goPrev = useCallback(() => {
    if (loop || currentIndex > 0) {
      goTo(currentIndex - 1);
    } else {
      goTo(total - 1);
    }
  }, [currentIndex, total, loop, goTo]);

  // Keyboard navigation
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
        case ' ':
          e.preventDefault();
          setIsPlaying((prev) => !prev);
          break;
      }
    },
    [goNext, goPrev, goTo, total]
  );

  // Touch handlers for swipe
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && enableSwipe) {
      goNext();
    } else if (isRightSwipe && enableSwipe) {
      goPrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, enableSwipe, goNext, goPrev]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying || total <= 1) return;

    timerRef.current = setInterval(goNext, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, autoPlayInterval, goNext, total]);

  const canGoPrev = loop || currentIndex > 0;
  const canGoNext = loop || currentIndex < total - 1;
  const translateX = -currentIndex * 100;

  if (total === 0) {
    return (
      <CarouselWrapper>
        <CarouselViewport>
          <SlidePlaceholder>No slides to display</SlidePlaceholder>
        </CarouselViewport>
      </CarouselWrapper>
    );
  }

  return (
    <CarouselWrapper
      ref={containerRef}
      role="region"
      aria-label="Image Carousel"
      style={height ? { height } : undefined}
    >
      <CarouselViewport
        onKeyDown={handleKeyDown}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        tabIndex={0}
        onMouseEnter={() => {
          if (timerRef.current) clearInterval(timerRef.current);
        }}
        onMouseLeave={() => {
          if (isPlaying && total > 1) {
            timerRef.current = setInterval(goNext, autoPlayInterval);
          }
        }}
      >
        {autoPlay && (
          <ProgressBar>
            <ProgressFill $duration={autoPlayInterval} $isPlaying={isPlaying} key={currentIndex} />
          </ProgressBar>
        )}

        <CarouselTrack $translateX={translateX} style={{ width: `${total * 100}%` }}>
          {slides.map((slide, index) => (
            <CarouselSlide
              key={slide.id}
              $isActive={index === currentIndex}
              onClick={() => onSlideClick?.(slide, index)}
              style={{ cursor: onSlideClick ? 'pointer' : 'default' }}
            >
              {slide.content ? (
                slide.content
              ) : (
                <>
                  <SlideImage $src={slide.image} />
                  {(slide.title || slide.description) && (
                    <SlideContent>
                      {slide.title && <SlideTitle>{slide.title}</SlideTitle>}
                      {slide.description && (
                        <SlideDescription>{slide.description}</SlideDescription>
                      )}
                    </SlideContent>
                  )}
                </>
              )}
            </CarouselSlide>
          ))}
        </CarouselTrack>

        {showNav && total > 1 && (
          <>
            <CarouselNavButton
              $position="left"
              onClick={goPrev}
              disabled={!canGoPrev && !loop}
              aria-label="Previous slide"
            >
              <FaChevronLeft size={18} />
            </CarouselNavButton>
            <CarouselNavButton
              $position="right"
              onClick={goNext}
              disabled={!canGoNext && !loop}
              aria-label="Next slide"
            >
              <FaChevronRight size={18} />
            </CarouselNavButton>
          </>
        )}

        {showCounter && total > 1 && (
          <CarouselCounter aria-live="polite" aria-atomic="true">
            <span>{currentIndex + 1}</span> / {total}
          </CarouselCounter>
        )}
      </CarouselViewport>

      {showDots && total > 1 && (
        <CarouselDots role="tablist" aria-label="Carousel slides">
          {slides.map((slide, i) => (
            <CarouselDot
              key={slide.id}
              $isActive={i === currentIndex}
              $hasImage={showThumbnails && !!slide.image}
              role="tab"
              aria-selected={i === currentIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
            >
              {showThumbnails && slide.image && <img src={slide.image} alt="" />}
            </CarouselDot>
          ))}
        </CarouselDots>
      )}
    </CarouselWrapper>
  );
};
