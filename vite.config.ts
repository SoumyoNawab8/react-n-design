import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic' // Ensure modern JSX transform
    }),
    dts({ 
      insertTypesEntry: true,
      rollupTypes: true // Bundle all types into a single file
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactNDesign',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      // Ensure peer dependencies are not bundled
      external: (id) => {
        return id === 'react' || 
               id === 'react-dom' || 
               id === 'react/jsx-runtime' ||
               id === 'styled-components' ||
               id === 'framer-motion' ||
               id.startsWith('react-icons/');
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          'styled-components': 'styled',
          'framer-motion': 'FramerMotion',
        },
      },
    },
  },
});