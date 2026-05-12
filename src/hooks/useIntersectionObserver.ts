import { useState, useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

/**
 * A hook that tracks whether an element is visible in the viewport
 * using the Intersection Observer API.
 *
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
 * return <div ref={ref}>{isVisible ? 'Visible' : 'Hidden'}</div>;
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): [React.RefObject<HTMLDivElement | null>, boolean, IntersectionObserverEntry | undefined] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    const observer = new IntersectionObserver(
      ([observedEntry]) => {
        setIsIntersecting(observedEntry.isIntersecting);
        setEntry(observedEntry);
      },
      { threshold: options.threshold, root: options.root, rootMargin: options.rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options.threshold, options.root, options.rootMargin]);

  return [ref, isIntersecting, entry];
}
