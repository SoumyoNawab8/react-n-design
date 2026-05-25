# REACT-N-DESIGN v0.7.0 TASK ASSIGNMENT

Current Status:
- Version: 0.7.0 (already in package.json)
- Components: 49 (need to make 55+)
- Tests: 86 passing (need 200+)
- Coverage: 15/49 components with tests (31%) - need 100%
- Bundle: 360KB ESM / 376KB CJS - need <150KB
- npm audit: 5 vulnerabilities (4 low, 1 moderate) - need 0
- Storybook stories: 48

## Sprint 1: Security + Infrastructure (ACTIVE)

### Task 1.1: Fix npm audit vulnerabilities
- Remove jest and jest-environment-jsdom (using Vitest only)
- Run: npm audit fix
- Verify npm audit exits 0

### Task 1.2: Set up pre-commit hooks (Husky configured)
- Test: staged .tsx with Biome error -> commit blocked
- Already configured in package.json, verify it works

### Task 1.3: Add .size-limit.json
- Path: dist/esm/index.js
- Limit: 150 KB
- Add CI step: npx size-limit (fails if exceeded)

### Task 1.4: Add bundle size measurement script
- Add to package.json: "build:size": "npm run build && npm run size-limit"

## Sprint 2: Missing Primitives (TDD - Test First)

### Task 2.1: Checkbox Component
1. Create src/components/Checkbox/Checkbox.test.tsx FIRST
2. Test: renders checked/unchecked, tri-state indeterminate, group name, keyboard space
3. Implement Checkbox.tsx + Checkbox.styles.ts
4. Create stories/Checkbox.stories.tsx
5. Export in src/components/index.ts

### Task 2.2: RadioGroup Component
1. Create src/components/RadioGroup/RadioGroup.test.tsx FIRST
2. Test: renders options, only one checked, keyboard arrows, aria-checked
3. Implement RadioGroup.tsx + RadioGroup.styles.ts
4. Create stories/RadioGroup.stories.tsx
5. Export in src/components/index.ts

### Task 2.3: Popover Component
1. Create src/components/Popover/Popover.test.tsx FIRST
2. Test: opens on click, closes on escape/click-outside, focus trap, portal
3. Implement Popover.tsx + Popover.styles.ts
4. Create stories/Popover.stories.tsx
5. Export in src/components/index.ts

### Task 2.4: Collapsible Component
1. Create src/components/Collapsible/Collapsible.test.tsx FIRST
2. Test: expands/collapses, unmount option, animated height
3. Implement Collapsible.tsx + Collapsible.styles.ts
4. Create stories/Collapsible.stories.tsx
5. Export in src/components/index.ts

## Sprint 3: Test Backfill (Existing Components Without Tests)

Components missing tests (34 total):
Priority order: AIChat, CommandPalette, Markdown, CodeBlock, DataGrid, DatePicker, Calendar, Toast

### Task 3.1: AIChat.test.tsx
- Test message list renders, streaming dots visible, send on Enter

### Task 3.2: CommandPalette.test.tsx
- Test opens on Cmd+K, filters results, arrow navigation, Escape closes

### Task 3.3: Markdown.test.tsx
- Test headings, lists, links, code blocks with XSS sanitization

### Task 3.4: CodeBlock.test.tsx
- Test renders code, copy button copies to clipboard

## Security Tasks

### Task 4.1: XSS Sanitization
- Wrap Markdown rendered HTML through DOMPurify
- Wrap AIChat message content through DOMPurify

## Documentation Tasks

### Task 5.1: Update README
- Change "40+ components" to actual count
- Change "41 tests" to actual count

## START WITH: Sprint 1, Task 1.1

Commands to run:
1. npm audit
2. Check if jest deps exist
3. npm uninstall jest jest-environment-jsdom (if present)
4. npm audit fix
5. Verify npm audit exits 0
