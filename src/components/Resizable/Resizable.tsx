'use client';
import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  ResizableContainer,
  ResizablePanel,
  ResizableHandle,
} from './Resizable.styles';

interface DragStartData {
  startPos: number;
  startSize: number;
}

export interface ResizableProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Direction of the resizable panels.
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * Default size of the first panel (in pixels or percentage).
   * Can be number (px) or string (e.g., '50%', '300px').
   * @default '50%'
   */
  defaultSize?: number | string;
  /**
   * Minimum size of the first panel in pixels.
   * @default 100
   */
  minSize?: number;
  /**
   * Maximum size of the first panel in pixels.
   * @default Infinity
   */
  maxSize?: number;
  /**
   * Children to render in the panels (should be exactly 2 elements).
   */
  children: [React.ReactNode, React.ReactNode];
  /**
   * Callback when size changes.
   */
  onSizeChange?: (size: number) => void;
}

/**
 * A resizable panel component with draggable splitter.
 * Allows users to resize two panels by dragging the divider.
 */
export const Resizable = ({
  direction = 'horizontal',
  defaultSize = '50%',
  minSize = 100,
  maxSize = Infinity,
  children,
  onSizeChange,
  ...props
}: ResizableProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [size, setSize] = useState<number | string>(defaultSize);
  const dragStartDataRef = useRef<DragStartData | null>(null);

  const parseSize = useCallback((sizeValue: number | string, container: HTMLDivElement): number => {
    if (typeof sizeValue === 'number') return sizeValue;
    if (sizeValue.endsWith('%')) {
      const total = direction === 'horizontal' 
        ? container.clientWidth 
        : container.clientHeight;
      return (parseFloat(sizeValue) / 100) * total;
    }
    return parseFloat(sizeValue);
  }, [direction]);

  const currentSize = useCallback((container: HTMLDivElement): number => {
    return parseSize(size, container);
  }, [size, parseSize]);

  const clampSize = useCallback((newSize: number, container: HTMLDivElement | null): number => {
    if (!container) return minSize;
    
    const total = direction === 'horizontal' 
      ? container.clientWidth 
      : container.clientHeight;
    
    const effectiveMax = maxSize === Infinity ? total - minSize : maxSize;
    return Math.max(minSize, Math.min(newSize, effectiveMax));
  }, [direction, minSize, maxSize]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    
    if (!containerRef.current) return;
    
    const startPos = direction === 'horizontal' ? e.clientX : e.clientY;
    dragStartDataRef.current = {
      startPos,
      startSize: currentSize(containerRef.current),
    };
  }, [direction, currentSize]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragStartDataRef.current || !containerRef.current) return;

    const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
    const delta = currentPos - dragStartDataRef.current.startPos;
    const newSize = clampSize(dragStartDataRef.current.startSize + delta, containerRef.current);
    
    setSize(newSize);
    onSizeChange?.(newSize);
  }, [direction, clampSize, onSizeChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragStartDataRef.current = null;
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = direction === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp, direction]);

  const getPanelStyle = (): React.CSSProperties => {
    if (typeof size === 'number') {
      return direction === 'horizontal' 
        ? { width: size, flex: 'none' }
        : { height: size, flex: 'none' };
    }
    if (size.endsWith('%')) {
      return { flex: `0 0 ${size}` };
    }
    return direction === 'horizontal'
      ? { width: size, flex: 'none' }
      : { height: size, flex: 'none' };
  };

  const [firstChild, secondChild] = children;

  return (
    <ResizableContainer
      ref={containerRef}
      $direction={direction}
      {...props}
    >
      <ResizablePanel style={getPanelStyle()}>
        {firstChild}
      </ResizablePanel>
      
      <ResizableHandle
        $direction={direction}
        $isDragging={isDragging}
        onMouseDown={handleMouseDown}
        role="separator"
        aria-orientation={direction}
        aria-label="Resize panel"
      />
      <ResizablePanel style={{ flex: 1, overflow: 'hidden' }}>
        {secondChild}
      </ResizablePanel>
    </ResizableContainer>
  );
};