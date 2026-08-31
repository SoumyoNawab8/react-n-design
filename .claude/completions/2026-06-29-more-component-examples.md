# Completion: More Component Examples & Usability

**Date:** 2026-06-29
**Goal:** give more examples for each component and make the components usable

## Summary

Added additional curated examples to every component that previously had only one example, plus a controlled example for the `TextArea` input. All 88 component pages now have at least 2 usable examples, and the docs site builds successfully.

## Changes Made

### `site/src/data/componentExamples.tsx`
- Added 4 new stateful helper components so hooks run at the top level:
  - `DrawerLeftExample` — opens a `Drawer` from the left
  - `CommandPaletteGroupsExample` — command palette with more items and custom placeholder
  - `TourMultiStepExample` — multi-step guided tour
  - `ControlledModelSelectorExample` — interactive model selector with React state
  - `ControlledTextAreaExample` — interactive text area with React state
- Added second examples to the 9 single-example components:
  - `SkipToContent` — custom label
  - `RSC` — compatible components list with code snippet
  - `Drawer` — left placement
  - `Empty` — with action button (also fixed the basic example to use valid props)
  - `CommandPalette` — richer item list (also fixed existing example to use `label`/`onSelect` props)
  - `Tour` — multi-step tour
  - `VisuallyHidden` — description linked to a visible input
  - `Icon` — colored icons
  - `ModelSelector` — controlled example (also fixed basic example to include required model fields)
- Added a third example for `TextArea` controlled state.
- Ran Biome to format the file consistently.

### `site/src/data/exampleCode.json`
- Regenerated via `node scripts/extract-example-code.js` so the new examples render correct code in the "View Code" toggle.

## Verification

- `npm run build:site` ✅
- `npm run build:types:safe` ✅
- Confirmed with Babel AST that all 88 components now have ≥ 2 examples.

## Notes

- Several existing examples had invalid prop usage that was only surfaced when adding the new examples (e.g., `Empty` did not accept `title`/`action`, `CommandPalette` items used `name` instead of `label` and lacked required `onSelect`, `ModelSelector` models lacked required `contextWindow`/`pricePer1kTokens`). These were corrected.
