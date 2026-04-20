// src/index.ts
// This is the main entry point for your library package
export * from './components';
export * from './styles/theme';
export * from './context';

import type { Theme } from './styles/theme';
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}