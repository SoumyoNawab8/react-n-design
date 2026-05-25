'use client';
import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ScrollAreaContent,
  ScrollAreaViewport,
  ScrollAreaWrapper,
  ScrollbarThumb,
  ScrollbarTrack,
} from './ScrollArea.styles';

export interface ScrollAreaProps {
  children: React.ReactNode;
  horizontal?: boolean;
  autoHide?: boolean;
  maxHeight?: string | number;
  className?: string;
}

export const ScrollArea = ({
  children,
  horizontal = false,
  autoHide = false,
  maxHeight,
  className,
}: ScrollAreaProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const [verticalThumb, setVerticalThumb] = useState({ height: 0, top: 0, visible: false });
  const [horizontalThumb, setHorizontalThumb] = useState({ width: 0, left: 0, visible: false });

  const updateThumbs = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const { scrollHeight, clientHeight, scrollWidth, clientWidth, scrollTop, scrollLeft } =
      viewport;

    if (scrollHeight > clientHeight && clientHeight > 0) {
      const trackHeight = clientHeight;
      const thumbHeight = Math.max((clientHeight / scrollHeight) * trackHeight, 20);
      const maxScrollTop = scrollHeight - clientHeight;
      const thumbTop =
        maxScrollTop > 0 ? (scrollTop / maxScrollTop) * (trackHeight - thumbHeight) : 0;
      setVerticalThumb({ height: thumbHeight, top: thumbTop, visible: true });
    } else {
      setVerticalThumb({ height: 0, top: 0, visible: false });
    }

    if (horizontal && scrollWidth > clientWidth && clientWidth > 0) {
      const trackWidth = clientWidth;
      const thumbWidth = Math.max((clientWidth / scrollWidth) * trackWidth, 20);
      const maxScrollLeft = scrollWidth - clientWidth;
      const thumbLeft =
        maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * (trackWidth - thumbWidth) : 0;
      setHorizontalThumb({ width: thumbWidth, left: thumbLeft, visible: true });
    } else {
      setHorizontalThumb({ width: 0, left: 0, visible: false });
    }
  }, [horizontal]);

  const handleScroll = useCallback(() => {
    updateThumbs();
  }, [updateThumbs]);

  useEffect(() => {
    updateThumbs();
  }, [updateThumbs]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      updateThumbs();
    });
    observer.observe(viewport);
    return () => {
      observer.disconnect();
    };
  }, [updateThumbs]);

  const verticalVisible = verticalThumb.visible && (!autoHide || isHovering);
  const horizontalVisible = horizontalThumb.visible && (!autoHide || isHovering);

  return (
    <ScrollAreaWrapper
      data-testid="scroll-area"
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ScrollAreaViewport
        ref={viewportRef}
        role="region"
        aria-label="Scrollable content"
        maxHeight={maxHeight}
        horizontal={horizontal}
        onScroll={handleScroll}
      >
        <ScrollAreaContent>{children}</ScrollAreaContent>
      </ScrollAreaViewport>

      {verticalThumb.visible && (
        <ScrollbarTrack data-scrollbar="vertical" orientation="vertical" visible={verticalVisible}>
          <ScrollbarThumb
            data-thumb="vertical"
            orientation="vertical"
            style={{
              height: verticalThumb.height,
              transform: `translateY(${verticalThumb.top}px)`,
            }}
          />
        </ScrollbarTrack>
      )}

      {horizontal && horizontalThumb.visible && (
        <ScrollbarTrack
          data-scrollbar="horizontal"
          orientation="horizontal"
          visible={horizontalVisible}
        >
          <ScrollbarThumb
            data-thumb="horizontal"
            orientation="horizontal"
            style={{
              width: horizontalThumb.width,
              transform: `translateX(${horizontalThumb.left}px)`,
            }}
          />
        </ScrollbarTrack>
      )}
    </ScrollAreaWrapper>
  );
};
