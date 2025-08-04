// The base theme structure, shared between light and dark modes
export const baseTheme = {
  borderRadius: '12px',
};

// Light Theme
export const lightTheme = {
  ...baseTheme,
   name: 'light', 
  colors: {
    primary: '#6d5dfc',
    background: '#e0e5ec',
    white: '#ffffff',
    text: '#555',
    // Neomorphic shadow colors
    shadowDark: '#bec3c9',
    shadowLight: '#ffffff',
    // Component-specific colors
    hoverBg: '#d1d9e6',      // For hover states in Select, Table, etc.
    skeletonBg: '#dde1e7',   // For the Skeleton component
    knobBg: '#f0f2f5',       // For the Switch component's knob
    cardBg: '#f0f2f5',       // For card-style Tabs
  },
  shadows: {
    soft: '7px 7px 14px #bec3c9, -7px -7px 14px #ffffff',
    softInset: 'inset 7px 7px 14px #bec3c9, inset -7px -7px 14px #ffffff',
  },
};

// Dark Theme
export const darkTheme = {
  ...baseTheme,
   name: 'dark',
  colors: {
    primary: '#7b6efc',
    background: '#2c2f34',
    white: '#ffffff',
    text: '#d1d9e6',
    // Neomorphic shadow colors
    shadowDark: '#25282c',
    shadowLight: '#33363c',
    // Component-specific colors
    hoverBg: '#3c4047',      // For hover states in Select, Table, etc.
    skeletonBg: '#3c4047',   // For the Skeleton component
    knobBg: '#3c4047',       // For the Switch component's knob
    cardBg: '#25282c',       // For card-style Tabs
  },
  shadows: {
    soft: '7px 7px 14px #25282c, -7px -7px 14px #33363c',
    softInset: 'inset 7px 7px 14px #25282c, inset -7px -7px 14px #33363c',
  },
};

// Export a TypeScript type for our theme objects
export type Theme = typeof lightTheme;