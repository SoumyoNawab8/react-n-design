const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');

const config = (input, outputCjs, outputEsm, esmBanner) => ({
  input,
  output: [
    {
      file: outputCjs,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
      interop: 'auto'
    },
    {
      file: outputEsm,
      format: 'esm',
      sourcemap: true,
      banner: esmBanner
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
    'react-icons/fa',
    'react-window'
  ]
});

module.exports = [
  config('src/index.ts', 'dist/cjs/index.js', 'dist/esm/index.js', "'use client';"),
  config('src/rsc.ts', 'dist/cjs/rsc.js', 'dist/esm/rsc.js')
];
