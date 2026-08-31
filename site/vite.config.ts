import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/react-n-design/',
  plugins: [react()],
  resolve: {
    alias: {
      'react-n-design': path.resolve(__dirname, '../src/index.ts'),
    },
  },
  server: {
    fs: {
      allow: ['..', '../src'],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
