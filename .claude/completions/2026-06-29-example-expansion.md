# Example Expansion & Visual Verification

**Date:** 2026-06-29  
**Branch:** `fix/site-component-examples`  
**Goal:** Add 5 more usable, visible examples for every component and verify all 88 components render without errors.

## What changed

- `site/src/data/componentExamples.tsx` — appended 5 additional examples to all 88 components. Final counts: 78 components have 8 examples, 9 have 7, and 1 has 9. All components now have at least 5 more examples than before.
- `site/src/data/exampleCode.json` — regenerated so every new example has a matching code snippet.
- `scripts/apply-example-additions.js` — hardened to:
  - disable outdated full-array replacements,
  - skip controlled-component definitions that already exist in the file,
  - avoid inserting duplicate `ToastDemoExample` / `ToastVariantsExample`.
- `scripts/generate-example-additions-workflow.js` — updated to generate 5 examples per component across all 88 components.
- `scripts/generate-example-additions-missing-workflow.js` — new workflow to fill in components missed by the first run.
- `scripts/verify-all-components.js` — new Playwright script that visits every component detail page, captures console/page errors, and reports pass/fail.

## Generated examples workflow

1. Ran `generate-example-additions-workflow.js` covering all 88 components in 12 groups.
2. First run returned 66 components; 3 subagents failed to call StructuredOutput.
3. Ran `generate-example-additions-missing-workflow.js` for the 22 missing components.
4. Second run returned 15 components; 1 group still failed.
5. Used a single subagent to generate the final 7 components (ComboBox, GanttChart, GradientBorder, Icon, OrgChart, VirtualList, VisuallyHidden).
6. Combined all generated additions into `scripts/example-additions.json` and applied them.

## Fixes applied after generation

- Removed duplicate controlled-component declarations inserted by the first (buggy) run.
- Fixed `AIThinking` examples to always pass the required `steps` prop.
- Fixed `GanttChart` examples to use `Date` objects instead of strings.
- Fixed `OrgChart` examples to use `label` instead of `name`.
- Fixed `PromptBuilder` examples to pass required `examples` and `onChange` props.
- Fixed a JSX string-attribute escaping issue in one `DiffViewer` example.

## Verification

- `npm run build:site` — builds successfully.
- `node scripts/verify-all-components.js` — **88 passed, 0 failed**. No console or page errors on any component detail page.

## Notes

- The preview server (`npm run preview:site`) was used for visual testing and then stopped.
- No library source changes were made; only docs-site examples and helper scripts.
- Temporary files created during the process were cleaned up.
