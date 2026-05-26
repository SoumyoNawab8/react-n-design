import { useEffect, useState } from 'react';

/**
 * Hook that returns true if the current viewport is mobile-sized.
 * Uses a media query to detect mobile devices (max-width: 768px).
 *
 * @example
 * const isMobile = useIsMobile();
 * return isMobile ? <MobileView /> : <DesktopView />;
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 768px)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(max-width: 768px)');
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, []);

  return isMobile;
}
