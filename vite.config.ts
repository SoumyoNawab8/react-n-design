import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic' // Use classic to avoid jsx-runtime dependency
    }),
    dts({ 
      insertTypesEntry: true,
      rollupTypes: true,
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', 'stories/**/*'],
      outDir: 'dist'
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
      external: (id) => {
        // More comprehensive external check
        const externals = [
          'react',
          'react-dom',
          'react/jsx-runtime',
          'react/jsx-dev-runtime',
          'styled-components',
          'framer-motion'
        ];
        
        return externals.includes(id) || 
               id.startsWith('react-icons/') ||
               id.startsWith('react/') ||
               id.startsWith('react-dom/');
      },
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'ReactJSXRuntime',
          'styled-components': 'styled',
          'framer-motion': 'FramerMotion',
        },
        interop: 'auto', // Handle default exports properly
      },
    },
  },
});