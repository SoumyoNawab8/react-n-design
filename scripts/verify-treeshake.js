const fs = require('node:fs');
const path = require('node:path');
const { rollup } = require('rollup');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');

const ESM_BUNDLE = path.resolve(__dirname, '../dist/esm/index.js');

async function main() {
  if (!fs.existsSync(ESM_BUNDLE)) {
    console.error('❌ ESM bundle not found at', ESM_BUNDLE);
    console.error('   Run npm run build first.');
    process.exit(1);
  }

  // Simulate a consumer app that imports only Button from the built ESM bundle.
  const consumerInput = path.resolve(__dirname, 'treeshake-consumer.js');
  fs.writeFileSync(
    consumerInput,
    `import { Button } from '${ESM_BUNDLE.replace(/\\/g, '/')}';\nconsole.log(Button);\n`
  );

  try {
    const bundle = await rollup({
      input: consumerInput,
      plugins: [
        resolve.default({ browser: true, preferBuiltins: false }),
        commonjs.default({ include: ['node_modules/**'] }),
      ],
      external: [
        'react',
        'react-dom',
        'styled-components',
        'framer-motion',
        'react-icons',
        'react-window',
      ],
    });

    const { output } = await bundle.generate({ format: 'esm' });
    const code = output[0].code;

    fs.unlinkSync(consumerInput);

    // Components that should be tree-shaken away when only Button is imported.
    const UNUSED_COMPONENTS = [
      'ChartBar',
      'AIChat',
      'CommandPalette',
      'CodeBlock',
      'Markdown',
      'Calendar',
      'VirtualList',
      'DataGrid',
      'Carousel',
      'Tree',
    ];

    let violations = 0;
    for (const name of UNUSED_COMPONENTS) {
      const regex = new RegExp(`\\b${name}\\b`);
      if (regex.test(code)) {
        console.error(`❌ Tree-shaking failed: ${name} is still present in consumer bundle`);
        violations++;
      } else {
        console.log(`✅ ${name} successfully tree-shaken`);
      }
    }

    if (violations > 0) {
      console.error(`\n⚠️  ${violations} unused component(s) could not be tree-shaken.`);
      process.exit(1);
    } else {
      console.log('\n✅ All unused components were tree-shaken. Bundle is tree-shakeable.');
    }
  } catch (err) {
    fs.unlinkSync(consumerInput);
    console.error('❌ Error during tree-shaking verification:', err.message);
    process.exit(1);
  }
}

main();
