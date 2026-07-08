#!/usr/bin/env node

/**
 * react-n-design CLI
 * A CLI tool for installing react-n-design components into your project.
 *
 * Usage:
 *   npx react-n-design add <ComponentName>     - Install a single component
 *   npx react-n-design add <Comp1> <Comp2>     - Install multiple components
 *   npx react-n-design list                    - List available components
 *   npx react-n-design --help                  - Show help
 */

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const { execSync } = require('node:child_process');

// Configuration
const PACKAGE_NAME = 'react-n-design';
const COMPONENTS_DIR = 'src/components';
const TARGET_DIR = 'components/react-n-design';
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/SoumyoNawab8/react-n-design/main';

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// Available components (cached list - will be fetched from GitHub or local)
const _availableComponents = [];

// Helper functions
const log = (msg) => console.log(msg);
const success = (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`);
const error = (msg) => console.error(`${colors.red}✗${colors.reset} ${msg}`);
const warn = (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`);
const info = (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`);
const bold = (msg) => `${colors.bright}${msg}${colors.reset}`;

// Show help message
function showHelp() {
  log(`
${bold('react-n-design CLI')}

${bold('Usage:')}
  npx react-n-design ${colors.cyan}<command>${colors.reset} [options]

${bold('Commands:')}
  ${colors.cyan}init${colors.reset}                Scaffold theme config, CSS variables, and ThemeProvider
  ${colors.cyan}add <component>${colors.reset}     Add a component to your project
  ${colors.cyan}add <c1> <c2>${colors.reset}       Add multiple components
  ${colors.cyan}list${colors.reset}                List all available components
  ${colors.cyan}--help, -h${colors.reset}            Show this help message
  ${colors.cyan}--version, -v${colors.reset}         Show version

${bold('Examples:')}
  npx react-n-design init
  npx react-n-design add Button
  npx react-n-design add Button Card Modal
  npx react-n-design list

${bold('Components are installed to:')}
  ./components/react-n-design/
`);
}

// Show version
function showVersion() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    log(`${PACKAGE_NAME} v${packageJson.version}`);
  } catch {
    log(`${PACKAGE_NAME} CLI`);
  }
}

// Fetch file from GitHub
function fetchFile(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          // Follow redirect
          fetchFile(res.headers.location).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

// Get list of available components
async function getAvailableComponents() {
  // Try to get from local node_modules first
  const localComponentsPath = path.join(__dirname, '..', COMPONENTS_DIR);

  if (fs.existsSync(localComponentsPath)) {
    try {
      const entries = fs.readdirSync(localComponentsPath, { withFileTypes: true });
      return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();
    } catch (_e) {
      // Fall through to static list
    }
  }

  // Static list as fallback (based on src/components/index.ts)
  return [
    'Accordion',
    'AIChat',
    'AIThinking',
    'Alert',
    'Avatar',
    'Badge',
    'Breadcrumbs',
    'Button',
    'Calendar',
    'Card',
    'Carousel',
    'Charts',
    'Checkbox',
    'CodeBlock',
    'Collapsible',
    'ColorPicker',
    'ComboBox',
    'CommandPalette',
    'DataGrid',
    'DatePicker',
    'Divider',
    'Drawer',
    'FileUpload',
    'Form',
    'Grid',
    'Icon',
    'Input',
    'Markdown',
    'Menu',
    'Modal',
    'MultiSelect',
    'Popover',
    'ProgressBar',
    'PromptInput',
    'RadioGroup',
    'ScrollArea',
    'Select',
    'Skeleton',
    'SkipToContent',
    'Slider',
    'Stack',
    'Stepper',
    'SuggestionChips',
    'Switch',
    'Table',
    'Tabs',
    'Tag',
    'Toast',
    'Toggle',
    'Tooltip',
    'Tree',
    'Typography',
    'VirtualList',
    'VisuallyHidden',
  ];
}

// List available components
async function listComponents() {
  log(`\n${bold('Available Components:')}\n`);

  const components = await getAvailableComponents();
  const cols = 4;
  const colWidth = 20;

  for (let i = 0; i < components.length; i += cols) {
    const row = components.slice(i, i + cols);
    const formatted = row.map((c) => c.padEnd(colWidth)).join('');
    log(`  ${formatted}`);
  }

  log(
    `\n${colors.dim}Use ${colors.reset}npx react-n-design add <ComponentName>${colors.dim} to install${colors.reset}\n`
  );
}

// Check if component is installed from local package
function getComponentFromLocal(componentName) {
  const localPath = path.join(__dirname, '..', COMPONENTS_DIR, componentName);

  if (!fs.existsSync(localPath)) {
    return null;
  }

  const files = {};

  // Read all files in the component directory
  try {
    const entries = fs.readdirSync(localPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        const filePath = path.join(localPath, entry.name);
        files[entry.name] = fs.readFileSync(filePath, 'utf8');
      }
    }
  } catch (_e) {
    return null;
  }

  return files;
}

// Check and fix imports in component code
function _fixImports(content, _componentName) {
  // When a component is copied into the consumer's project, relative imports that
  // escape its own directory stop resolving. Rewrite imports targeting other
  // internal package modules (../ComponentName, ../../context, ../../utils, etc.)
  // to the package entry so they resolve through the installed dependency.
  // Same-directory imports (e.g. ./ComponentName.styles) are preserved.
  return content
    .replace(/from\s+(['"])(\.\.\/[^'"]+)\1/g, 'from $1react-n-design$1')
    .replace(/require\s*\(\s*(['"])(\.\.\/[^'"]+)\1\s*\)/g, 'require($1react-n-design$1)');
}

// Create component in target directory
function installComponent(componentName, files) {
  const targetPath = path.join(process.cwd(), TARGET_DIR, componentName);

  // Create target directory
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  // Write each file (fixing relative imports to package imports)
  for (const [fileName, content] of Object.entries(files)) {
    const filePath = path.join(targetPath, fileName);
    const fixedContent = _fixImports(content, componentName);
    fs.writeFileSync(filePath, fixedContent, 'utf8');
  }

  return targetPath;
}

// Install a single component
async function installSingleComponent(componentName) {
  // Validate component name (PascalCase)
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
    error(`Invalid component name: ${componentName}`);
    info('Component names must be PascalCase (e.g., Button, Modal, DataGrid)');
    return false;
  }

  const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let spinnerIdx = 0;

  process.stdout.write(`  ${spinner[0]} Installing ${bold(componentName)}...`);

  const spinnerInterval = setInterval(() => {
    spinnerIdx = (spinnerIdx + 1) % spinner.length;
    process.stdout.write(`\r  ${spinner[spinnerIdx]} Installing ${bold(componentName)}...`);
  }, 80);

  try {
    // Try to get from local package first
    let files = getComponentFromLocal(componentName);

    // If not found locally, try to fetch from GitHub
    if (!files) {
      clearInterval(spinnerInterval);
      process.stdout.write(
        `\r  ${colors.yellow}⚠${colors.reset} Component not found locally, checking GitHub...`
      );

      try {
        const baseUrl = `${GITHUB_RAW_URL}/${COMPONENTS_DIR}/${componentName}`;
        files = {};

        // Try to fetch main files
        const possibleFiles = [
          `${componentName}.tsx`,
          `${componentName}.ts`,
          'index.ts',
          `${componentName}.styles.tsx`,
          `${componentName}.styles.ts`,
        ];

        for (const file of possibleFiles) {
          try {
            const content = await fetchFile(`${baseUrl}/${file}`);
            files[file] = content;
          } catch {
            // File might not exist, continue
          }
        }

        if (Object.keys(files).length === 0) {
          throw new Error('Component not found on GitHub');
        }
      } catch (_e) {
        clearInterval(spinnerInterval);
        process.stdout.write('\r                                          \r');
        error(`Component "${componentName}" not found`);
        info(
          `Run ${colors.cyan}npx react-n-design list${colors.reset} to see available components`
        );
        return false;
      }
    }

    clearInterval(spinnerInterval);
    process.stdout.write('\r                                          \r');

    // Install the component
    const targetPath = installComponent(componentName, files);

    success(`Installed ${componentName}`);
    log(`  ${colors.dim}→${colors.reset} ${path.relative(process.cwd(), targetPath)}`);

    // Detect dependencies
    const deps = detectDependencies(files);
    if (deps.size > 0) {
      log(`  ${colors.dim}Dependencies:${colors.reset} ${Array.from(deps).join(', ')}`);
    }

    return true;
  } catch (e) {
    clearInterval(spinnerInterval);
    process.stdout.write('\r                                          \r');
    error(`Failed to install ${componentName}: ${e.message}`);
    return false;
  }
}

// Detect component dependencies
function detectDependencies(files) {
  const deps = new Set();

  for (const content of Object.values(files)) {
    // Check for framer-motion
    if (content.includes("from 'framer-motion'") || content.includes('from "framer-motion"')) {
      deps.add('framer-motion');
    }
    // Check for react-icons
    if (content.includes("from 'react-icons") || content.includes('from "react-icons')) {
      deps.add('react-icons');
    }
    // Check for styled-components
    if (
      content.includes("from 'styled-components'") ||
      content.includes('from "styled-components"')
    ) {
      deps.add('styled-components');
    }
  }

  return deps;
}

// Install dependencies if needed
function installDependencies(components) {
  const allDeps = new Set();

  for (const componentName of components) {
    const targetPath = path.join(process.cwd(), TARGET_DIR, componentName);
    if (fs.existsSync(targetPath)) {
      try {
        const files = fs.readdirSync(targetPath);
        const fileContents = {};
        for (const file of files) {
          const content = fs.readFileSync(path.join(targetPath, file), 'utf8');
          fileContents[file] = content;
        }
        const deps = detectDependencies(fileContents);
        deps.forEach((d) => allDeps.add(d));
      } catch (_e) {
        // Ignore
      }
    }
  }

  if (allDeps.size > 0) {
    log(`\n${bold('Peer dependencies required:')}`);
    log(`  ${Array.from(allDeps).join(', ')}`);

    // Check if package.json exists and suggest install
    if (fs.existsSync(path.join(process.cwd(), 'package.json'))) {
      log(
        `\nInstall with: ${colors.cyan}npm install ${Array.from(allDeps).join(' ')}${colors.reset}\n`
      );
    }
  }
}

// Detect project type
function detectProjectType() {
  const cwd = process.cwd();

  const hasNext = fs.existsSync(path.join(cwd, 'next.config.js')) ||
    fs.existsSync(path.join(cwd, 'next.config.ts')) ||
    fs.existsSync(path.join(cwd, 'next.config.mjs'));
  if (hasNext) return 'Next.js';

  const hasVite = fs.existsSync(path.join(cwd, 'vite.config.js')) ||
    fs.existsSync(path.join(cwd, 'vite.config.ts'));
  if (hasVite) return 'Vite';

  try {
    const pkgPath = path.join(cwd, 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps['react-scripts']) return 'Create React App';
    }
  } catch {
    // ignore
  }

  return 'React';
}

// Check if file exists and warn
function checkOverwrite(filePath) {
  if (fs.existsSync(filePath)) {
    warn(`Overwriting existing file: ${path.relative(process.cwd(), filePath)}`);
    return true;
  }
  return false;
}

// Write a file and report success
function writeProjectFile(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf8');
  success(`Created ${path.relative(process.cwd(), filePath)}`);
}

// Create config file
function createConfigFile(isTS) {
  const ext = isTS ? 'ts' : 'js';
  const configPath = path.join(process.cwd(), `react-n-design.config.${ext}`);
  checkOverwrite(configPath);

  const content = isTS
    ? `import type { ThemeName } from 'react-n-design';

export interface ReactNDesignConfig {
  theme: {
    defaultTheme: ThemeName;
    themes: ThemeName[];
  };
}

const config: ReactNDesignConfig = {
  theme: {
    defaultTheme: 'light',
    themes: ['light', 'dark', 'system'],
  },
};

export default config;
`
    : `/** @type {import('react-n-design').ReactNDesignConfig} */
module.exports = {
  theme: {
    defaultTheme: 'light',
    themes: ['light', 'dark', 'system'],
  },
};
`;

  writeProjectFile(configPath, content);
}

// Create CSS variables file
function createThemeCSS() {
  const cssPath = path.join(process.cwd(), 'src/styles/react-n-design.css');
  checkOverwrite(cssPath);

  const content = `/* react-n-design theme variables */
/* Generated by react-n-design init */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  /* Colors (light theme) */
  --n-color-primary: #6d5dfc;
  --n-color-background: #e0e5ec;
  --n-color-surface: #ffffff;
  --n-color-text: #555555;
  --n-color-text-inverse: #ffffff;
  --n-color-shadow-dark: #bec3c9;
  --n-color-shadow-light: #ffffff;
  --n-color-hover-bg: #d1d9e6;
  --n-color-skeleton-bg: #dde1e7;
  --n-color-knob-bg: #f0f2f5;
  --n-color-card-bg: #f0f2f5;

  /* Shadows */
  --n-shadow-soft: 7px 7px 14px #bec3c9, -7px -7px 14px #ffffff;
  --n-shadow-soft-inset: inset 7px 7px 14px #bec3c9, inset -7px -7px 14px #ffffff;

  /* Spacing */
  --n-space-1: 4px;
  --n-space-2: 8px;
  --n-space-3: 12px;
  --n-space-4: 16px;
  --n-space-5: 20px;
  --n-space-6: 24px;
  --n-space-7: 28px;
  --n-space-8: 32px;
  --n-space-9: 36px;
  --n-space-10: 40px;
  --n-space-11: 44px;
  --n-space-12: 48px;

  /* Typography */
  --n-font-size-sm: 0.875rem;
  --n-font-size-base: 1rem;
  --n-font-size-lg: 1.125rem;
  --n-font-size-xl: 1.25rem;

  /* Radius */
  --n-border-radius: 12px;

  /* Font family */
  --n-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

[data-theme="dark"] {
  /* Colors (dark theme) */
  --n-color-primary: #7b6efc;
  --n-color-background: #2c2f34;
  --n-color-surface: #ffffff;
  --n-color-text: #d1d9e6;
  --n-color-text-inverse: #ffffff;
  --n-color-shadow-dark: #25282c;
  --n-color-shadow-light: #33363c;
  --n-color-hover-bg: #3c4047;
  --n-color-skeleton-bg: #3c4047;
  --n-color-knob-bg: #3c4047;
  --n-color-card-bg: #25282c;

  /* Shadows */
  --n-shadow-soft: 7px 7px 14px #25282c, -7px -7px 14px #33363c;
  --n-shadow-soft-inset: inset 7px 7px 14px #25282c, inset -7px -7px 14px #33363c;
}

html {
  font-family: var(--n-font-family);
}
`;

  writeProjectFile(cssPath, content);
}

// Create ThemeProvider wrapper component
function createThemeProvider(isTS) {
  const providerPath = path.join(process.cwd(), `src/components/ThemeProvider.${isTS ? 'tsx' : 'jsx'}`);
  checkOverwrite(providerPath);

  const content = isTS
    ? `import React from 'react';
import { ThemeContextProvider } from 'react-n-design';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
};
`
    : `import React from 'react';
import { ThemeContextProvider } from 'react-n-design';

export const ThemeProvider = ({ children }) => {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
};
`;

  writeProjectFile(providerPath, content);
}

// Init command
async function initProject() {
  log(`\n${bold('Initializing react-n-design...')}\n`);

  const projectType = detectProjectType();
  info(`Detected project type: ${colors.cyan}${projectType}${colors.reset}`);

  // Determine TS usage
  const hasTSConfig = fs.existsSync(path.join(process.cwd(), 'tsconfig.json'));
  const isTS = hasTSConfig;
  if (isTS) {
    info('TypeScript detected. Using .ts/.tsx extensions.');
  }

  // Check for existing config
  const configPath = path.join(process.cwd(), `react-n-design.config.${isTS ? 'ts' : 'js'}`);
  if (fs.existsSync(configPath)) {
    warn('Existing react-n-design config found. It will be overwritten.');
  }

  log('');

  // Create files
  createConfigFile(isTS);
  createThemeCSS();
  createThemeProvider(isTS);

  log('');
  success('Initialization complete!');
  log('');

  // Print next steps
  info(`${bold('Next steps:')}`);
  log(`  1. Import the CSS file in your app entry point:`);
  log(`     ${colors.cyan}import './styles/react-n-design.css';${colors.reset}`);
  log(`  2. Wrap your app with the ThemeProvider:`);
  if (projectType === 'Next.js') {
    log(`     Update ${colors.cyan}app/layout.tsx${colors.reset} (or ${colors.cyan}pages/_app.tsx${colors.reset}):`);
    log(`       import { ThemeProvider } from './components/ThemeProvider';`);
    log(`       ...`);
    log(`       <ThemeProvider>{children}</ThemeProvider>`);
  } else {
    log(`     In your root component (e.g., ${colors.cyan}src/App.tsx${colors.reset}):`);
    log(`       import { ThemeProvider } from './components/ThemeProvider';`);
    log(`       ...`);
    log(`       <ThemeProvider><App /></ThemeProvider>`);
  }
  log(`  3. Add components with:`);
  log(`     ${colors.cyan}npx react-n-design add <ComponentName>${colors.reset}`);
  log('');
}

// Main command handler
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === '--help' || command === '-h') {
    showHelp();
    return;
  }

  if (command === '--version' || command === '-v') {
    showVersion();
    return;
  }

  if (command === 'init') {
    await initProject();
    return;
  }

  if (command === 'list') {
    await listComponents();
    return;
  }

  if (command === 'add') {
    const componentNames = args.slice(1);

    if (componentNames.length === 0) {
      error('No component name provided');
      info(`Usage: npx react-n-design add <ComponentName>`);
      info(`Run ${colors.cyan}npx react-n-design list${colors.reset} to see available components`);
      process.exit(1);
    }

    log(`\n${bold('Installing components...')}\n`);

    const results = [];
    for (const name of componentNames) {
      const success = await installSingleComponent(name);
      results.push({ name, success });
    }

    // Show dependency info
    installDependencies(componentNames);

    // Summary
    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    log(`\n${bold('Summary:')}`);
    log(
      `  ${colors.green}${successful.length} installed${colors.reset}${failed.length > 0 ? `, ${colors.red}${failed.length} failed${colors.reset}` : ''}`
    );

    if (failed.length > 0) {
      process.exit(1);
    }

    log('');
    return;
  }

  // Unknown command
  error(`Unknown command: ${command}`);
  info(`Run ${colors.cyan}npx react-n-design --help${colors.reset} for usage information`);
  process.exit(1);
}

// Run main
main().catch((e) => {
  error(`Unexpected error: ${e.message}`);
  process.exit(1);
});
