import * as fs from 'node:fs';
import * as path from 'node:path';
import { withDefaultConfig } from 'react-docgen-typescript';

const componentsDir = path.resolve(__dirname, '../src/components');
const outputPath = path.resolve(__dirname, '../site/src/data/componentProps.json');

const parser = withDefaultConfig({
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  propFilter: (prop) => {
    if (prop.parent) {
      return !prop.parent.fileName.includes('node_modules');
    }
    return true;
  },
});

const componentFolders = fs.readdirSync(componentsDir).filter((name) => {
  const fullPath = path.join(componentsDir, name);
  return fs.statSync(fullPath).isDirectory() && name !== 'index.ts';
});

const results: Record<string, any> = {};

for (const folder of componentFolders) {
  const tsxPath = path.join(componentsDir, folder, `${folder}.tsx`);
  const tsPath = path.join(componentsDir, folder, `${folder}.ts`);
  const targetPath = fs.existsSync(tsxPath) ? tsxPath : fs.existsSync(tsPath) ? tsPath : null;

  if (!targetPath) continue;

  try {
    const docs = parser.parse(targetPath);
    if (docs.length > 0) {
      // Flatten into array of prop rows keyed by component displayName
      for (const doc of docs) {
        const key = doc.displayName || folder;
        const props = Object.entries(doc.props).map(([name, prop]: [string, any]) => ({
          name,
          type: prop.type?.name || 'unknown',
          required: prop.required,
          defaultValue: prop.defaultValue?.value ?? null,
          description: prop.description || '',
        }));
        results[key] = props;
      }
    }
  } catch {
    // Skip files that fail to parse
  }
}

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

console.log(`Generated component docs for ${Object.keys(results).length} components`);
