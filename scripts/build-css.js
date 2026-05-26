const fs = require('node:fs');
const path = require('node:path');

const distStyles = path.join(__dirname, '..', 'dist', 'styles');
fs.mkdirSync(distStyles, { recursive: true });

const files = ['tokens.css', 'print.css', 'touch.css'];
for (const file of files) {
  fs.copyFileSync(path.join(__dirname, '..', 'src', 'styles', file), path.join(distStyles, file));
}
console.log('CSS files copied to dist/styles');
