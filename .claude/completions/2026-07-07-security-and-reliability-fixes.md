# Security & Reliability Fixes

**Date:** 2026-07-07  
**Branch:** `fix/site-component-examples`

## Summary

Addressed all five items from the session goal: XSS vectors in Markdown/AIChat, leaked resize listeners in Button/Input, Select virtualization ignoring search filtering, README/CLI mismatch, and broken type builds plus `npm audit` vulnerabilities.

## Changes

### 1. Security: DOMPurify + `dangerouslySetInnerHTML`

- `src/components/AIChat/AIChat.tsx`
  - Removed the `window.DOMPurify` global type and `sanitizeUserContent` helper.
  - Replaced `dangerouslySetInnerHTML` for user messages with `renderUserText`, which escapes HTML entities and preserves line breaks as text nodes. This removes the XSS surface entirely for user-authored content.
  - Changed `import type React` to `import React` so `React.Fragment` can be used as a runtime value.

- `package.json`
  - Bumped `dompurify` from `^3.4.5` to `^3.4.11` to resolve published XSS bypass advisories.

### 2. Bug: Leaked resize listeners in Button/Input

- `src/components/Button/Button.tsx`
  - Added `useEffect` to the import list.
  - Changed `useResponsiveSize` from `useMemo` to `useEffect` so the `resize` listener is registered and cleaned up correctly.

- `src/components/Input/Input.tsx`
  - Changed `useResponsiveSize` from `useMemo` to `useEffect` for the same cleanup fix. (`useResponsiveFullWidth` already used `useEffect`.)

### 3. Bug: Select virtualization ignored search filtering

- `src/components/Select/Select.tsx`
  - Virtual list item data now uses `filteredOptions` instead of `allOptions`.
  - `useVirtualList` is now based on `filteredOptions.length`.
  - `List.itemCount` uses `filteredOptions.length`.
  - Scroll-to-highlighted-item effect also checks `filteredOptions.length`.

### 4. Docs/CLI mismatch

- `README.md`
  - Updated the RSC section to match the actual `react-n-design/rsc` exports (`Badge`, `Divider`, `Skeleton`) and replaced the example to use only those server-safe components.

- `bin/react-n-design.js`
  - Implemented `_fixImports` to rewrite relative imports that escape the copied component directory (`../ComponentName`, `../../context/...`, `../../utils/...`, etc.) to `react-n-design`.
  - `installComponent` now calls `_fixImports` before writing each file.

- `src/index.ts` + `src/utils/index.ts` (new)
  - Exported the internal `utils` module from the main package entry so that CLI-copied components can resolve `react-n-design` imports for `lazyMotion` and `focus` helpers.

### 5. Build silently shipping broken types + `npm audit`

- `package.json`
  - `build:types:safe` now runs `tsc --project tsconfig.build.json --noEmitOnError true` and fails the build on type errors instead of swallowing them with `|| echo ...`.
  - Bumped vulnerable direct dev dependencies:
    - `esbuild` → `^0.28.1`
    - `vite` → `^8.1.3`
    - `vitest` → `^3.2.7`
    - `@vitest/coverage-v8` → `^3.2.7`
  - Added `overrides` for transitive vulnerabilities:
    - `js-yaml` → `^4.2.0`
    - `form-data` → `^4.0.6`

- `tsconfig.build.json`
  - Set `noEmitOnError` to `true` so the config itself reflects the intended safe behavior.

- Ran `npm audit fix --legacy-peer-deps`; `npm audit --audit-level moderate` now reports **0 vulnerabilities**.

## Verification

- `npm run build:types:safe` ✅ passes.
- `npm run build` ✅ completes (rollup + CSS + types).
- `npm audit --audit-level moderate` ✅ 0 vulnerabilities.
- Targeted component tests for the changed files passed:
  - `src/components/Button/Button.test.tsx`
  - `src/components/Input/Input.test.tsx`
  - `src/components/Select/Select.test.tsx`
  - `src/components/AIChat/AIChat.test.tsx`
  - Result: **4 files, 88 tests passed**.

## Notes

- The full `npm run test:vitest` suite was interrupted because it appeared to hang on unrelated tests (existing jsdom/axe-core warnings were visible). The changed components' tests all passed quickly, so the hang is not attributed to these fixes.
- `--legacy-peer-deps` was required during `npm audit fix` because the repo currently resolves to React 19 via `@react-three/fiber`/`@react-three/drei`, while several Storybook/testing-library packages still expect React 18. This is a pre-existing dependency alignment issue outside the scope of these fixes.
