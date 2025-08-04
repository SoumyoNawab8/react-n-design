// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import { glob } from 'glob';

export default defineConfig({
  plugins: [
    react(),
    dts({ insertTypesEntry: true }),
  ],
  build: {
    lib: {
      entry: {
        index: path.resolve(__dirname, 'src/index.ts'),
        // Automatically create an entry for each component
        ...Object.fromEntries(
          glob.sync('src/components/**/*.{ts,tsx}').map(file => [
            // This will create a file path like 'components/Button/index'
            path.relative(
              'src',
              file.slice(0, file.length - path.extname(file).length)
            ),
            // The value is the absolute path to the file
            path.resolve(__dirname, file)
          ])
        )
      },
      name: 'ReactNDesign',
      formats: ['es'], // ES modules are best for tree shaking
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components', 'framer-motion'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
          'framer-motion': 'motion',
        },
      },
    },
  },
});