#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function toPascalCase(str) {
  return str
    .replace(/[-_](.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (_, char) => char.toUpperCase());
}

function readTemplate(name) {
  const templatePath = path.join(ROOT, 'bin', 'templates', `${name}.template`);
  if (!fs.existsSync(templatePath)) {
    console.error(`Error: Template not found: ${templatePath}`);
    process.exit(1);
  }
  return fs.readFileSync(templatePath, 'utf-8');
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}

function updateComponentsIndex(componentName) {
  const indexPath = path.join(ROOT, 'src', 'components', 'index.ts');
  if (!fs.existsSync(indexPath)) {
    console.warn('Warning: src/components/index.ts not found. Skipping index update.');
    return;
  }
  let content = fs.readFileSync(indexPath, 'utf-8');
  const exportLine = `export * from './${componentName}';`;

  if (content.includes(exportLine)) {
    console.log(`Already exported in src/components/index.ts`);
    return;
  }

  content = content.trimEnd() + `\n${exportLine}\n`;
  fs.writeFileSync(indexPath, content, 'utf-8');
}

function scaffoldComponent(name) {
  const pascalName = toPascalCase(name);
  const componentDir = path.join(ROOT, 'src', 'components', pascalName);
  const storiesDir = path.join(ROOT, 'stories');

  const componentTsx = path.join(componentDir, `${pascalName}.tsx`);
  const componentStyles = path.join(componentDir, `${pascalName}.styles.ts`);
  const componentIndex = path.join(componentDir, `index.ts`);
  const storyPath = path.join(storiesDir, `${pascalName}.stories.tsx`);

  if (fs.existsSync(componentDir)) {
    console.error(`Error: Component "${pascalName}" already exists at src/components/${pascalName}`);
    process.exit(1);
  }
  if (fs.existsSync(storyPath)) {
    console.error(`Error: Story "${pascalName}.stories.tsx" already exists at stories/${pascalName}.stories.tsx`);
    process.exit(1);
  }

  const templates = [
    { file: componentTsx, tpl: 'component.tsx' },
    { file: componentStyles, tpl: 'component.styles.ts' },
    { file: componentIndex, tpl: 'component.index.ts' },
    { file: storyPath, tpl: 'component.stories.tsx' },
  ];

  for (const { file, tpl } of templates) {
    const content = readTemplate(tpl).replace(/\{\{name\}\}/g, pascalName);
    writeFile(file, content);
    console.log(`Created: ${path.relative(ROOT, file)}`);
  }

  updateComponentsIndex(pascalName);
  console.log(`Updated: src/components/index.ts`);
  console.log(`\nComponent "${pascalName}" scaffolded successfully!`);
}

function scaffoldHook(name) {
  const pascalName = toPascalCase(name);
  const hooksDir = path.join(ROOT, 'src', 'hooks');
  const filePath = path.join(hooksDir, `${pascalName}.ts`);

  if (fs.existsSync(filePath)) {
    console.error(`Error: Hook "${pascalName}" already exists at src/hooks/${pascalName}.ts`);
    process.exit(1);
  }

  const content = readTemplate('hook.ts').replace(/\{\{name\}\}/g, pascalName);
  writeFile(filePath, content);
  console.log(`Created: ${path.relative(ROOT, filePath)}`);
  console.log(`\nHook "${pascalName}" scaffolded successfully!`);
}

function scaffoldUtil(name) {
  const pascalName = toPascalCase(name);
  const utilsDir = path.join(ROOT, 'src', 'utils');
  const filePath = path.join(utilsDir, `${pascalName}.ts`);

  if (fs.existsSync(filePath)) {
    console.error(`Error: Utility "${pascalName}" already exists at src/utils/${pascalName}.ts`);
    process.exit(1);
  }

  const content = readTemplate('util.ts').replace(/\{\{name\}\}/g, pascalName);
  writeFile(filePath, content);
  console.log(`Created: ${path.relative(ROOT, filePath)}`);
  console.log(`\nUtility "${pascalName}" scaffolded successfully!`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2 || args[0] !== 'add') {
    console.log('Usage: npx react-n-design add <Name> [--type=component|hook|util]');
    console.log('');
    console.log('Examples:');
    console.log('  npx react-n-design add DatePicker');
    console.log('  npx react-n-design add useCounter --type=hook');
    console.log('  npx react-n-design add focusTrap --type=util');
    process.exit(1);
  }

  const name = args[1];
  let type = 'component';

  for (let i = 2; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--type=')) {
      type = arg.split('=')[1];
    }
  }

  if (!name) {
    console.error('Error: Name is required.');
    process.exit(1);
  }

  switch (type) {
    case 'component':
      scaffoldComponent(name);
      break;
    case 'hook':
      scaffoldHook(name);
      break;
    case 'util':
      scaffoldUtil(name);
      break;
    default:
      console.error(`Error: Unknown type "${type}". Use component, hook, or util.`);
      process.exit(1);
  }
}

main();
