'use client';
import React, { createContext, useState, useContext, useMemo, useEffect, useCallback } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';
import { injectCSSVariables } from '../styles/tokens';

export type ThemeName = 'light' | 'dark' | 'system';
export type ResolvedThemeName = 'light' | 'dark';

const STORAGE_KEY = 'react-n-design-theme';

interface ThemeContextType {
  theme: ThemeName;
  resolvedTheme: ResolvedThemeName;
  toggleTheme: () => void;
  setTheme: (name: ThemeName) => void;
  themes: ThemeName[];
  isSystem: boolean;
}

// Create a context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  resolvedTheme: 'light',
  toggleTheme: () => {},
  setTheme: () => {},
  themes: ['light', 'dark', 'system'],
  isSystem: false,
});

/**
 * Hook that listens to the system color scheme preference.
 * Returns the resolved system theme ('light' | 'dark').
 */
export function useSystemTheme(): ResolvedThemeName {
  const [systemTheme, setSystemTheme] = useState<ResolvedThemeName>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return systemTheme;
}

// Create a custom hook for using the context (legacy API)
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  return {
    theme: ctx.resolvedTheme,
    toggleTheme: ctx.toggleTheme,
  };
};

// Modern useTheme hook with full feature set
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  return {
    theme: ctx.theme,
    setTheme: ctx.setTheme,
    themes: ctx.themes,
    isSystem: ctx.isSystem,
    resolvedTheme: ctx.resolvedTheme,
  };
};

// Create the provider component
export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useSystemTheme();

  const [theme, setThemeState] = useState<ThemeName>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
      if (stored && (stored === 'light' || stored === 'dark' || stored === 'system')) {
        return stored;
      }
    } catch {
      // localStorage may be unavailable (e.g. private mode)
    }
    return 'light';
  });

  const resolvedTheme: ResolvedThemeName = useMemo(() => {
    if (theme === 'system') return systemTheme;
    return theme;
  }, [theme, systemTheme]);

  const currentTheme = useMemo(
    () => (resolvedTheme === 'light' ? lightTheme : darkTheme),
    [resolvedTheme]
  );

  const isSystem = theme === 'system';

  const setTheme = useCallback((name: ThemeName) => {
    setThemeState(name);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, name);
      } catch {
        // ignore localStorage errors
      }
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState(prev => {
      const resolved = prev === 'system' ? systemTheme : prev;
      const next = resolved === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          // ignore localStorage errors
        }
      }
      return next;
    });
  }, [systemTheme]);

  // Inject CSS variables into <html> and set data-theme attribute
  useEffect(() => {
    if (typeof document === 'undefined') return;
    injectCSSVariables(resolvedTheme);
    document.documentElement.setAttribute('data-theme', resolvedTheme);
  }, [resolvedTheme]);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      toggleTheme,
      setTheme,
      themes: ['light', 'dark', 'system'] as ThemeName[],
      isSystem,
    }),
    [theme, resolvedTheme, toggleTheme, setTheme, isSystem]
  );

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={currentTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Also export with the old name for backwards compatibility
export const AppThemeProvider = ThemeContextProvider;
