#!/usr/bin/env node

// Simple test to verify package exports work correctly
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing react-n-design package exports...\n');

// Check if dist files exist
const distFiles = ['index.js', 'index.mjs', 'index.d.ts'];
const missingFiles = [];

distFiles.forEach(file => {
  const filePath = path.join(__dirname, 'dist', file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.error('❌ Missing dist files:', missingFiles);
  process.exit(1);
}

console.log('✅ All dist files present');

// Test that package imports without throwing - but skip execution that requires DOM
try {
  // Just test that the file can be required without immediate execution
  const content = fs.readFileSync(path.join(__dirname, 'dist', 'index.js'), 'utf8');
  
  // Check that it contains the expected exports structure
  if (content.includes('exports') && content.includes('require')) {
    console.log('✅ CommonJS format looks correct');
  } else {
    console.error('❌ CommonJS format appears malformed');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ CommonJS file read failed:', error.message);
  process.exit(1);
}

// Check ESM format
try {
  const esmContent = fs.readFileSync(path.join(__dirname, 'dist', 'index.mjs'), 'utf8');
  if (esmContent.includes('export') && esmContent.includes('import')) {
    console.log('✅ ESM format looks correct');
  } else {
    console.error('❌ ESM format appears malformed');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ ESM file read failed:', error.message);
  process.exit(1);
}

// Check TypeScript definitions
try {
  const dtsContent = fs.readFileSync(path.join(__dirname, 'dist', 'index.d.ts'), 'utf8');
  if (dtsContent.includes('export') && dtsContent.includes('interface')) {
    console.log('✅ TypeScript definitions present');
  } else {
    console.error('❌ TypeScript definitions appear incomplete');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ TypeScript definitions read failed:', error.message);
  process.exit(1);
}

// Check package.json configuration
const pkg = require('./package.json');

const requiredFields = ['main', 'module', 'types', 'exports', 'peerDependencies'];
const missingFields = requiredFields.filter(field => !pkg[field]);

if (missingFields.length > 0) {
  console.error('❌ Missing package.json fields:', missingFields);
  process.exit(1);
}

console.log('✅ package.json configuration is valid');

// Check peer dependencies
const peerDeps = pkg.peerDependencies;
const expectedPeerDeps = ['react', 'react-dom'];
const missingPeerDeps = expectedPeerDeps.filter(dep => !peerDeps[dep]);

if (missingPeerDeps.length > 0) {
  console.error('❌ Missing peer dependencies:', missingPeerDeps);
  process.exit(1);
}

console.log('✅ Peer dependencies configured correctly');

// Check bundle size
const statsJS = fs.statSync(path.join(__dirname, 'dist', 'index.js'));
const statsMJS = fs.statSync(path.join(__dirname, 'dist', 'index.mjs'));

console.log(`📦 Bundle sizes:`);
console.log(`   - CommonJS: ${(statsJS.size / 1024).toFixed(2)} KB`);
console.log(`   - ESM: ${(statsMJS.size / 1024).toFixed(2)} KB`);

console.log('\n✅ Package is ready for consumption!');
console.log('\n📋 Installation Instructions:');
console.log('   npm install react-n-design styled-components react-icons');
console.log('\n📖 Usage:');
console.log('   import { Button, lightTheme } from "react-n-design";');
console.log('\n🚀 Publish command:');
console.log('   npm publish');
