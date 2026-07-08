'use client';
// src/index.ts
// This is the main entry point for your library package
export * from './components';
export * from './context';
export * from './hooks';
export * from './icons';
export * from './styles/theme';
export * from './styles/tokens';
export * from './utils';

import type { Theme } from './styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
