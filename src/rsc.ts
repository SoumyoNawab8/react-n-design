/**
 * Server-safe exports for RSC (React Server Components) environments.
 *
 * This file avoids any client-only APIs (document, window, localStorage, etc.)
 * so it can be safely imported in server components.
 */

export type { ResolvedThemeName, ThemeName } from './context/ThemeContext';
export type { Theme } from './styles/theme';
export { baseTheme, cssVariableMap, darkTheme, getThemeCSS, lightTheme } from './styles/theme';
export type { Tokens } from './styles/tokens';
export { generateThemeCSS, tokens } from './styles/tokens';
export { Badge, Divider, Skeleton } from './components/RSC';
export type { BadgeProps, DividerProps, SkeletonProps } from './components/RSC';
