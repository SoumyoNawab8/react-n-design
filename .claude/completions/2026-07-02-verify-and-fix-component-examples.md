# Verify and Fix Component Examples

**Date:** 2026-07-02
**Goal:** Verify all component examples are good enough, impactful, and presentable; fix any issues found.

## Summary

All 88 component pages now render without JavaScript errors, and the previously broken or low-quality examples have been fixed. Automated screenshot verification confirms every component example produces a visible, non-blank screenshot in both light and dark themes.

## Issues Found and Fixed

### 1. CopyButton examples were completely blank

**Root cause:** The `Sizes` example used `size="small"` and `size="large"`, but `CopyButton` only accepts `'sm' | 'md' | 'lg'`. This caused `buttonSizes[size]` to be `undefined`, crashing the styled-components render and producing blank screenshots for every CopyButton tab in both themes.

**Fix:** Updated all CopyButton examples to use the correct size enum values (`sm`, `md`, `lg`) and reformatted the section for readability.

### 2. Duplicate "Controlled" examples reduced quality

Seven components had two identical "Controlled" tabs (auto-generated filler). These were replaced with unique, presentable examples:

| Component | Replaced duplicate with |
|-----------|--------------------------|
| Switch | Sizes with Labels — three switches with descriptive labels |
| Checkbox | Card Selection — checkboxes inside selectable feature cards |
| ColorPicker | Form Row — color picker paired with a "Brand color" label |
| FileUpload | Validation Error — upload area with a strict 1 KB size limit |
| MentionInput | Single User — mention input with only one available option |
| MultiSelect | Compact Dropdown — multi-select with a small `maxHeight` |
| Toggle | Pressed Toolbar — formatting toolbar with mixed pressed states |

### 3. Invalid icon names in Toggle toolbar

The new Toggle toolbar initially used `Icon name="bold" | "italic" | "underline"`, which do not exist in the built-in icon map. Replaced with styled text content (`<strong>B</strong>`, `<em>I</em>`, underlined `U`) so the example renders reliably without console warnings.

## Verification Performed

1. **Runtime errors:** `scripts/verify-all-components.js` — 88/88 passed, 0 failed.
2. **Blank screenshots:** Programmatic scan of all 1,398 captured screenshots — no files below 20 KB, no blank pages.
3. **Duplicate tabs:** Programmatic scan — no duplicate tab labels within any component/theme.
4. **Theme consistency:** Light and dark tab labels match for every component except `Tabs`, where the difference is expected because the examples render nested tab bars.
5. **Home / components list:** Checked for console errors — both OK.
6. **Visual spot checks:** Confirmed the fixed CopyButton, Switch, Checkbox, ColorPicker, FileUpload, MentionInput, MultiSelect, and Toggle examples render correctly and look presentable.

## Files Changed

- `site/src/data/componentExamples.tsx` — fixed CopyButton props, replaced 7 duplicate controlled examples, improved formatting.
- `site/src/data/exampleCode.json` — regenerated from the updated examples so "View Code" matches the rendered demos.

## Commands Run

```bash
npm run build:site
node scripts/extract-example-code.js
node scripts/verify-all-components.js
node scripts/capture-component-examples.js
```

## Result

Component examples are now error-free, visually presentable, and free of duplicate or broken demos.
