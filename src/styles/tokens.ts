/**
 * TypeScript tokens mirror for JS usage.
 */

export const tokens = {
  space: {
    1: 'var(--n-space-1)',
    2: 'var(--n-space-2)',
    3: 'var(--n-space-3)',
    4: 'var(--n-space-4)',
    5: 'var(--n-space-5)',
    6: 'var(--n-space-6)',
    7: 'var(--n-space-7)',
    8: 'var(--n-space-8)',
    9: 'var(--n-space-9)',
    10: 'var(--n-space-10)',
    11: 'var(--n-space-11)',
    12: 'var(--n-space-12)',
  },
  colors: {
    primary: 'var(--n-color-primary)',
    background: 'var(--n-color-background)',
    surface: 'var(--n-color-surface)',
    text: 'var(--n-color-text)',
    textInverse: 'var(--n-color-text-inverse)',
    shadowDark: 'var(--n-color-shadow-dark)',
    shadowLight: 'var(--n-color-shadow-light)',
    hoverBg: 'var(--n-color-hover-bg)',
    skeletonBg: 'var(--n-color-skeleton-bg)',
    knobBg: 'var(--n-color-knob-bg)',
    cardBg: 'var(--n-color-card-bg)',
  },
  shadows: {
    soft: 'var(--n-shadow-soft)',
    softInset: 'var(--n-shadow-soft-inset)',
  },
  borderRadius: 'var(--n-border-radius)',
  fontSize: {
    sm: 'var(--n-font-size-sm)',
    base: 'var(--n-font-size-base)',
    lg: 'var(--n-font-size-lg)',
    xl: 'var(--n-font-size-xl)',
  },
} as const;

export type Tokens = typeof tokens;

/**
 * Injects CSS custom properties into the document's `<html>` element.
 * This is useful for runtime theme switching without reloading stylesheets.
 */
export function injectCSSVariables(theme: 'light' | 'dark'): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (theme === 'light') {
    root.style.setProperty('--n-color-primary', '#6d5dfc');
    root.style.setProperty('--n-color-background', '#e0e5ec');
    root.style.setProperty('--n-color-surface', '#ffffff');
    root.style.setProperty('--n-color-text', '#555555');
    root.style.setProperty('--n-color-text-inverse', '#ffffff');
    root.style.setProperty('--n-color-shadow-dark', '#bec3c9');
    root.style.setProperty('--n-color-shadow-light', '#ffffff');
    root.style.setProperty('--n-color-hover-bg', '#d1d9e6');
    root.style.setProperty('--n-color-skeleton-bg', '#dde1e7');
    root.style.setProperty('--n-color-knob-bg', '#f0f2f5');
    root.style.setProperty('--n-color-card-bg', '#f0f2f5');
    root.style.setProperty('--n-shadow-soft', '7px 7px 14px #bec3c9, -7px -7px 14px #ffffff');
    root.style.setProperty('--n-shadow-soft-inset', 'inset 7px 7px 14px #bec3c9, inset -7px -7px 14px #ffffff');
  } else {
    root.style.setProperty('--n-color-primary', '#7b6efc');
    root.style.setProperty('--n-color-background', '#2c2f34');
    root.style.setProperty('--n-color-surface', '#ffffff');
    root.style.setProperty('--n-color-text', '#d1d9e6');
    root.style.setProperty('--n-color-text-inverse', '#ffffff');
    root.style.setProperty('--n-color-shadow-dark', '#25282c');
    root.style.setProperty('--n-color-shadow-light', '#33363c');
    root.style.setProperty('--n-color-hover-bg', '#3c4047');
    root.style.setProperty('--n-color-skeleton-bg', '#3c4047');
    root.style.setProperty('--n-color-knob-bg', '#3c4047');
    root.style.setProperty('--n-color-card-bg', '#25282c');
    root.style.setProperty('--n-shadow-soft', '7px 7px 14px #25282c, -7px -7px 14px #33363c');
    root.style.setProperty('--n-shadow-soft-inset', 'inset 7px 7px 14px #25282c, inset -7px -7px 14px #33363c');
  }
}

/**
 * Generates a CSS string that sets the CSS custom properties for a given theme.
 * Useful for SSR or for injecting a `<style>` tag dynamically.
 */
export function generateThemeCSS(theme: 'light' | 'dark'): string {
  if (theme === 'light') {
    return `
:root {
  --n-color-primary: #6d5dfc;
  --n-color-background: #e0e5ec;
  --n-color-surface: #ffffff;
  --n-color-text: #555555;
  --n-color-text-inverse: #ffffff;
  --n-color-shadow-dark: #bec3c9;
  --n-color-shadow-light: #ffffff;
  --n-color-hover-bg: #d1d9e6;
  --n-color-skeleton-bg: #dde1e7;
  --n-color-knob-bg: #f0f2f5;
  --n-color-card-bg: #f0f2f5;
  --n-shadow-soft: 7px 7px 14px #bec3c9, -7px -7px 14px #ffffff;
  --n-shadow-soft-inset: inset 7px 7px 14px #bec3c9, inset -7px -7px 14px #ffffff;
}
    `.trim();
  }

  return `
[data-theme="dark"] {
  --n-color-primary: #7b6efc;
  --n-color-background: #2c2f34;
  --n-color-surface: #ffffff;
  --n-color-text: #d1d9e6;
  --n-color-text-inverse: #ffffff;
  --n-color-shadow-dark: #25282c;
  --n-color-shadow-light: #33363c;
  --n-color-hover-bg: #3c4047;
  --n-color-skeleton-bg: #3c4047;
  --n-color-knob-bg: #3c4047;
  --n-color-card-bg: #25282c;
  --n-shadow-soft: 7px 7px 14px #25282c, -7px -7px 14px #33363c;
  --n-shadow-soft-inset: inset 7px 7px 14px #25282c, inset -7px -7px 14px #33363c;
}
  `.trim();
}
