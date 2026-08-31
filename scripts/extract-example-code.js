const fs = require('node:fs');
const path = require('node:path');
const parser = require('@babel/parser');

const srcFile = path.resolve(__dirname, '../site/src/data/componentExamples.tsx');
const outFile = path.resolve(__dirname, '../site/src/data/exampleCode.json');

const code = fs.readFileSync(srcFile, 'utf8');
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx', 'typescript'],
});

const result = {};

for (const node of ast.program.body) {
  if (node.type === 'ExportNamedDeclaration' && node.declaration) {
    const decl = node.declaration;
    if (decl.type === 'VariableDeclaration') {
      for (const vd of decl.declarations) {
        if (vd.id?.name === 'componentExamples' && vd.init?.type === 'ObjectExpression') {
          for (const prop of vd.init.properties) {
            if (prop.type === 'ObjectProperty' && prop.value?.type === 'ArrayExpression') {
              const compName = prop.key.name || prop.key.value;
              result[compName] = {};
              prop.value.elements.forEach((el, idx) => {
                if (!el) return;
                if (el.type === 'ObjectExpression') {
                  const renderProp = el.properties.find(
                    (p) =>
                      p.type === 'ObjectProperty' &&
                      (p.key.name === 'render' || p.key.value === 'render')
                  );
                  if (renderProp) {
                    const start = renderProp.value.start;
                    const end = renderProp.value.end;
                    const raw = code.slice(start, end);
                    let body = raw;
                    const arrowMatch = body.match(
                      /^\(\)\s*=>\s*(?:\(\s*|\{?\s*)([\s\S]*?)(?:\s*\)\s*|\s*\}?\s*)$/
                    );
                    if (arrowMatch) {
                      body = arrowMatch[1].trim();
                      if (body.startsWith('(') && body.endsWith(')')) {
                        let depth = 0;
                        let remove = true;
                        for (let i = 0; i < body.length; i++) {
                          if (body[i] === '(') depth++;
                          else if (body[i] === ')') {
                            depth--;
                            if (depth === 0 && i < body.length - 1) {
                              remove = false;
                              break;
                            }
                          }
                        }
                        if (remove) body = body.slice(1, -1).trim();
                      }
                    }
                    result[compName][String(idx)] = body;
                  }
                }
              });
            }
          }
        }
      }
    }
  }
}

fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log('Wrote', outFile);
