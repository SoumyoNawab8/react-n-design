const fs = require('node:fs');
const path = require('node:path');
const parser = require('@babel/parser');

const srcFile = path.resolve(__dirname, '../site/src/data/componentExamples.tsx');
const configFile = path.resolve(__dirname, './example-additions.json');
const outFile = srcFile;

let code = fs.readFileSync(srcFile, 'utf8');
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

const additions = config.additions || {};

// ─── Controlled example components (auto-defined when referenced) ──────────────
const CONTROLLED_SOURCES = {
  ControlledSwitchExample: `const ControlledSwitchExample: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  return <Switch checked={checked} onChange={setChecked} label="Notifications" />;
};`,
  ControlledCheckboxExample: `const ControlledCheckboxExample: React.FC = () => {
  const [checked, setChecked] = React.useState(false);
  return <Checkbox checked={checked} onChange={setChecked} label="Accept terms" />;
};`,
  ControlledRadioGroupExample: `const ControlledRadioGroupExample: React.FC = () => {
  const [value, setValue] = React.useState('a');
  return (
    <RadioGroup
      options={[
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B' },
        { value: 'c', label: 'Option C' },
      ]}
      value={value}
      onChange={setValue}
    />
  );
};`,
  ControlledSliderExample: `const ControlledSliderExample: React.FC = () => {
  const [value, setValue] = React.useState(30);
  return <Slider value={value} onChange={setValue} label="Volume" />;
};`,
  ControlledSegmentedExample: `const ControlledSegmentedExample: React.FC = () => {
  const [value, setValue] = React.useState('Day');
  return <Segmented options={['Day', 'Week', 'Month']} value={value} onChange={setValue} />;
};`,
  ControlledRatingExample: `const ControlledRatingExample: React.FC = () => {
  const [value, setValue] = React.useState(3);
  return <Rating value={value} onChange={setValue} precision={0.5} />;
};`,
  ControlledToggleExample: `const ControlledToggleExample: React.FC = () => {
  const [pressed, setPressed] = React.useState(false);
  return <Toggle pressed={pressed} onPressedChange={setPressed}>{pressed ? 'On' : 'Off'}</Toggle>;
};`,
  ControlledDatePickerExample: `const ControlledDatePickerExample: React.FC = () => {
  const [date, setDate] = React.useState<Date | null>(new Date());
  return <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />;
};`,
  ControlledTimePickerExample: `const ControlledTimePickerExample: React.FC = () => {
  const [time, setTime] = React.useState<{ hours: number; minutes: number } | null>({ hours: 10, minutes: 0 });
  return <TimePicker value={time} onChange={setTime} />;
};`,
  ControlledColorPickerExample: `const ControlledColorPickerExample: React.FC = () => {
  const [color, setColor] = React.useState('#6d5dfc');
  return <ColorPicker value={color} onChange={setColor} />;
};`,
  ControlledFileUploadExample: `const ControlledFileUploadExample: React.FC = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  return <FileUpload accept="image/*" multiple onFilesChange={setFiles} />;
};`,
  ControlledOTPInputExample: `const ControlledOTPInputExample: React.FC = () => {
  const [otp, setOtp] = React.useState('');
  return <OTPInput length={6} value={otp} onChange={setOtp} />;
};`,
  ControlledPinInputExample: `const ControlledPinInputExample: React.FC = () => {
  const [pin, setPin] = React.useState('');
  return <PinInput length={4} value={pin} onChange={setPin} />;
};`,
  ControlledSelectExample: `const ControlledSelectExample: React.FC = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  return (
    <Select
      options={[
        { value: '1', label: 'Option One' },
        { value: '2', label: 'Option Two' },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Select an option"
    />
  );
};`,
  ControlledMultiSelectExample: `const ControlledMultiSelectExample: React.FC = () => {
  const [value, setValue] = React.useState<string[]>([]);
  return (
    <MultiSelect
      options={['React', 'Vue', 'Angular', 'Svelte']}
      value={value}
      onChange={setValue}
      placeholder="Pick frameworks"
    />
  );
};`,
  ControlledComboBoxExample: `const ControlledComboBoxExample: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <ComboBox
      options={[
        { value: 'react', label: 'React' },
        { value: 'vue', label: 'Vue' },
        { value: 'angular', label: 'Angular' },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Search framework..."
    />
  );
};`,
  ControlledMentionInputExample: `const ControlledMentionInputExample: React.FC = () => {
  const [value, setValue] = React.useState('');
  return (
    <MentionInput
      options={[{ id: '1', label: 'Alice', value: 'alice' }]}
      value={value}
      onChange={setValue}
      placeholder="Type @ to mention"
    />
  );
};`,
  ControlledPromptInputExample: `const ControlledPromptInputExample: React.FC = () => {
  const [value, setValue] = React.useState('');
  return <PromptInput value={value} onChange={setValue} onSend={setValue} placeholder="Ask anything…" />;
};`,
  ControlledRichTextEditorExample: `const ControlledRichTextEditorExample: React.FC = () => {
  const [value, setValue] = React.useState('<p>Edit <strong>rich text</strong> content.</p>');
  return <RichTextEditor value={value} onChange={setValue} />;
};`,
};

// ─── Broken / misleading examples to replace entirely ─────────────────────────
// NOTE: replacements are currently disabled because the base file already contains
// the corrected examples. Re-enable only if you need to overwrite specific arrays.
const REPLACEMENTS = {};

// ─── Toast demo controlled components (required by replacements) ────────────────
const TOAST_DEMO_COMPONENTS = {
  ToastDemoExample: `const ToastDemoExample: React.FC = () => {
  const { success } = useToast();
  return <Button size="small" onClick={() => success('Saved successfully!')}>Show Toast</Button>;
};`,
  ToastVariantsExample: `const ToastVariantsExample: React.FC = () => {
  const { success, error, warning } = useToast();
  return (
    <Stack direction="row" gap={12}>
      <Button size="small" onClick={() => success('Operation completed')}>Success</Button>
      <Button size="small" variant="secondary" onClick={() => warning('Please review')}>Warning</Button>
      <Button size="small" variant="danger" onClick={() => error('Something went wrong')}>Error</Button>
    </Stack>
  );
};`,
};

// ─── Determine which controlled components we need ─────────────────────────────
const neededControlled = new Set();
for (const compName of Object.keys(additions)) {
  for (const ex of additions[compName]) {
    if (ex.render?.includes('Controlled') && ex.render.includes('Example')) {
      const match = ex.render.match(/(Controlled\w+Example)/);
      if (match) neededControlled.add(match[1]);
    }
  }
}

// ─── Parse source and prepare edits ───────────────────────────────────────────
const ast = parser.parse(code, {
  sourceType: 'module',
  plugins: ['jsx', 'typescript'],
});

// Collect names that are already declared at the top level so we don't duplicate them.
const existingNames = new Set();
for (const node of ast.program.body) {
  if (node.type === 'VariableDeclaration') {
    for (const decl of node.declarations) {
      if (decl.id?.type === 'Identifier') existingNames.add(decl.id.name);
    }
  }
}

const controlledSourcesToInsert = [];
for (const name of Array.from(neededControlled).sort()) {
  if (CONTROLLED_SOURCES[name] && !existingNames.has(name)) {
    controlledSourcesToInsert.push(CONTROLLED_SOURCES[name]);
  }
}
if (REPLACEMENTS.Toast && !existingNames.has('ToastDemoExample')) {
  controlledSourcesToInsert.unshift(
    TOAST_DEMO_COMPONENTS.ToastDemoExample,
    TOAST_DEMO_COMPONENTS.ToastVariantsExample
  );
}

const edits = [];

// 1. Add imports (ToastProvider, useToast)
const importDecl = ast.program.body.find(
  (n) => n.type === 'ImportDeclaration' && n.source.value === 'react-n-design'
);
if (importDecl) {
  const existingNames = new Set(
    importDecl.specifiers.map((s) => s.imported?.name || s.local?.name)
  );
  const toAdd = ['ToastProvider', 'useToast'].filter((n) => !existingNames.has(n));
  if (toAdd.length > 0) {
    // Insert before the closing brace of the import specifier list.
    const _importEnd = importDecl.end;
    const sourceStart = importDecl.source.start;
    // Find the '}' just before 'from'
    let bracePos = -1;
    for (let i = sourceStart - 1; i > importDecl.start; i--) {
      if (code[i] === '}') {
        bracePos = i;
        break;
      }
    }
    if (bracePos >= 0) {
      // Check whether the specifier list already ends with a comma.
      let prevNonSpace = bracePos - 1;
      while (prevNonSpace >= 0 && /\s/.test(code[prevNonSpace])) prevNonSpace--;
      const hasTrailingComma = code[prevNonSpace] === ',';
      const text = hasTrailingComma ? `${toAdd.join(', ')}, ` : `, ${toAdd.join(', ')}, `;
      edits.push({
        start: bracePos,
        end: bracePos,
        text,
      });
    }
  }
}

// 2. Find componentExamples object and each array
const exportDecl = ast.program.body.find(
  (n) =>
    n.type === 'ExportNamedDeclaration' &&
    n.declaration?.type === 'VariableDeclaration' &&
    n.declaration.declarations.some((d) => d.id?.name === 'componentExamples')
);
if (!exportDecl) {
  throw new Error('Could not find componentExamples export');
}

const componentExamplesDecl = exportDecl.declaration.declarations.find(
  (d) => d.id?.name === 'componentExamples'
);
const objectExpr = componentExamplesDecl.init;

for (const prop of objectExpr.properties) {
  if (prop.type !== 'ObjectProperty' || prop.value?.type !== 'ArrayExpression') continue;
  const compName = prop.key.name || prop.key.value;
  const arrayStart = prop.value.start;
  const arrayEnd = prop.value.end;

  if (REPLACEMENTS[compName]) {
    const replacementArray = formatExampleArray(REPLACEMENTS[compName]);
    edits.push({
      start: arrayStart,
      end: arrayEnd,
      text: replacementArray,
    });
    continue;
  }

  const newExamples = additions[compName];
  if (!newExamples || newExamples.length === 0) continue;

  // Insert before the closing ']' of the array
  const insertPos = arrayEnd - 1;
  let text = '';
  for (const ex of newExamples) {
    text += formatExampleObject(ex);
  }
  edits.push({
    start: insertPos,
    end: insertPos,
    text,
  });
}

// 3. Insert controlled components before the export
const controlledText =
  controlledSourcesToInsert.length > 0 ? `\n${controlledSourcesToInsert.join('\n\n')}\n\n` : '';
if (controlledText) {
  edits.push({
    start: exportDecl.start,
    end: exportDecl.start,
    text: controlledText,
  });
}

// Apply edits in reverse order (last positions first)
edits.sort((a, b) => b.start - a.start);
for (const edit of edits) {
  code = code.slice(0, edit.start) + edit.text + code.slice(edit.end);
}

fs.writeFileSync(outFile, code);
console.log('Updated', outFile);

// Regenerate example code JSON
require('./extract-example-code.js');

// Helpers
function formatExampleObject(ex) {
  return `    {
      title: '${escapeString(ex.title)}',
      description: '${escapeString(ex.description)}',
      render: ${ex.render},
    },
`;
}

function formatExampleArray(examples) {
  const parts = examples.map(formatExampleObject).join('');
  return `[
${parts}  ]`;
}

function escapeString(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}
