const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    {
      file: 'dist/esm/index.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      preferBuiltins: false
    }),
    commonjs({
      include: ['node_modules/**']
    }),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: false,
      declarationMap: false,
      noEmitOnError: false, // Allow build to continue with warnings
      noImplicitAny: false,
      skipLibCheck: true
    })
  ],
  external: [
    'react',
    'react-dom',
    'styled-components',
    'framer-motion',
    'react-icons',
    'react-icons/fa'
  ]
};
