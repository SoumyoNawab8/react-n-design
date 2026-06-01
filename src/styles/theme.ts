// The base theme structure, shared between light and dark modes
export const baseTheme = {
  borderRadius: '12px',
  dir: 'ltr' as const,
};

// Light Theme
export const lightTheme = {
  ...baseTheme,
  name: 'light',
  reducedMotion: false,
  colors: {
    primary: '#6d5dfc',
    background: '#e0e5ec',
    white: '#ffffff',
    text: '#555',
    textSecondary: '#888',
    border: '#d9d9d9',
    // Neomorphic shadow colors
    shadowDark: '#bec3c9',
    shadowLight: '#ffffff',
    // Component-specific colors
    hoverBg: '#d1d9e6',
    skeletonBg: '#dde1e7',
    knobBg: '#f0f2f5',
    cardBg: '#f0f2f5',
    // CopyButton states
    error: '#dc3545',
    success: '#28a745',
    // Menu v1.2.0
    danger: '#ff4d4f',
  },
  shadows: {
    soft: '7px 7px 14px #bec3c9, -7px -7px 14px #ffffff',
    softInset: 'inset 7px 7px 14px #bec3c9, inset -7px -7px 14px #ffffff',
    strong: '0 8px 30px rgba(0, 0, 0, 0.3)',
    innerGlow: 'inset 0 0 20px rgba(109, 93, 252, 0.08)',
  },
  mode: 'light',
};

// Dark Theme
export const darkTheme = {
  ...baseTheme,
  name: 'dark',
  reducedMotion: false,
  colors: {
    primary: '#7b6efc',
    background: '#0f172a',
    white: '#ffffff',
    text: '#d1d9e6',
    textSecondary: '#9ba3ad',
    border: '#444851',
    // Neomorphic shadow colors
    shadowDark: '#0c1425',
    shadowLight: '#1e293b',
    // Component-specific colors
    hoverBg: '#1e293b',
    skeletonBg: '#1e293b',
    knobBg: '#1e293b',
    cardBg: '#1e293b',
    // CopyButton states
    error: '#dc3545',
    success: '#28a745',
    // Menu v1.2.0
    danger: '#ff4d4f',
  },
  shadows: {
    soft: '7px 7px 14px #0c1425, -7px -7px 14px #1e293b',
    softInset: 'inset 7px 7px 14px #0c1425, inset -7px -7px 14px #1e293b',
    strong: '0 8px 30px rgba(0, 0, 0, 0.5)',
    innerGlow: 'inset 0 0 20px rgba(123, 110, 252, 0.1)',
  },
  mode: 'dark',
};

// Export a TypeScript type for our theme objects
export type Theme = typeof lightTheme;

/**
 * Maps theme object keys to CSS custom property names.
 * Useful for generating CSS variables from a theme object at runtime or build time.
 */
export const cssVariableMap: Record<string, string> = {
  'colors.primary': '--n-color-primary',
  'colors.background': '--n-color-background',
  'colors.white': '--n-color-surface',
  'colors.text': '--n-color-text',
  'colors.shadowDark': '--n-color-shadow-dark',
  'colors.shadowLight': '--n-color-shadow-light',
  'colors.hoverBg': '--n-color-hover-bg',
  'colors.skeletonBg': '--n-color-skeleton-bg',
  'colors.knobBg': '--n-color-knob-bg',
  'colors.cardBg': '--n-color-card-bg',
  'shadows.soft': '--n-shadow-soft',
  'shadows.softInset': '--n-shadow-soft-inset',
  'shadows.innerGlow': '--n-shadow-inner-glow',
  borderRadius: '--n-border-radius',
};

/**
 * Generates a CSS string that maps a theme object to CSS custom properties.
 * Useful for SSR or dynamic style injection.
 */
export function getThemeCSS(theme: Theme): string {
  const entries = Object.entries(cssVariableMap)
    .map(([path, varName]) => {
      const keys = path.split('.');
      let value: unknown = theme;
      for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
          value = (value as Record<string, unknown>)[key];
        } else {
          return null;
        }
      }
      if (typeof value !== 'string') return null;
      return `  ${varName}: ${value};`;
    })
    .filter((entry): entry is string => entry !== null);

  return `:root {\n${entries.join('\n')}\n}`;
}
