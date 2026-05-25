import { useEffect, useState } from 'react';

/**
 * A hook that tracks whether a CSS media query currently matches.
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)');
 * const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', listener);
    setMatches(mql.matches);
    return () => mql.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
