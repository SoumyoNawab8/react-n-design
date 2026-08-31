# 2026-07-07 Codebase Improvement Review

## Task
Explore `/Users/macworld/Desktop/dev/react-n-design` and identify concrete, actionable improvement areas across code quality, testing, accessibility, performance, build/tooling, security, documentation, and bugs.

## Key Findings Summary
- **Security / Dependencies**: DOMPurify 3.4.5 has published XSS advisories and is used in `Markdown.tsx` + `AIChat.tsx`. npm audit also reports critical/high issues in Vitest, Vite, esbuild, form-data, js-yaml.
- **Correctness Bugs**: `Button`/`Input` use `useMemo` for window-resize side effects (listener leak). `Select` virtual list ignores search filtering. `CommandPalette` Cmd+K listener is a no-op. `DatePicker` live region never re-announces because effect deps are function references. `VirtualList` reset-scroll effect doesn't run on `items` change.
- **Packaging / DX**: README incorrectly documents RSC exports (`Card`, `Stack`, `Typography`) while only `Badge`, `Divider`, `Skeleton` are exported from `react-n-design/rsc`. CLI `add` command copies files but does not rewrite internal imports.
- **Testing Gaps**: No tests for `Tree`, `Typography`, `VisuallyHidden`, `RSC`, no hook/adapter tests, and many shallow assertions.
- **Lint / Build**: Biome reports 58 lint errors + 89 warnings (useButtonType, noArrayIndexKey, noRedeclare, etc.); `build:types:safe` swallows TypeScript errors.

## Files of Interest
- `src/components/Button/Button.tsx:46-73`
- `src/components/Input/Input.tsx:65-90`
- `src/components/Select/Select.tsx:257, 725-737`
- `src/components/VirtualList/VirtualList.tsx:95-100`
- `src/components/DataGrid/DataGrid.tsx:726-761`
- `src/components/DatePicker/DatePicker.tsx:252-255`
- `src/components/CommandPalette/CommandPalette.tsx:96-108`
- `src/components/AIChat/AIChat.tsx:42-48, 161`
- `src/components/Markdown/Markdown.tsx:44-56`
- `src/rsc.ts:13-14`
- `package.json:57, 110, 126, 129-135`
- `bin/react-n-design.js:232-249`
- `README.md:264-285, 350-364`

## Completed
Full findings delivered as the session response.
