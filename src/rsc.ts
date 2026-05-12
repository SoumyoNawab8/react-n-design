/**
 * Server-safe exports for RSC (React Server Components) environments.
 *
 * This file avoids any client-only APIs (document, window, localStorage, etc.)
 * so it can be safely imported in server components.
 */

export type { ThemeName, ResolvedThemeName } from './context/ThemeContext';
export { lightTheme, darkTheme, baseTheme, cssVariableMap, getThemeCSS } from './styles/theme';
export type { Theme } from './styles/theme';
export { tokens, generateThemeCSS } from './styles/tokens';
export type { Tokens } from './styles/tokens';
