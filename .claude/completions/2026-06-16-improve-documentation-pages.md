# Completion: Visually Check and Improve Documentation Pages

**Date:** 2026-06-16
**Branch:** fix/site-component-examples

## Summary
Visually inspected the react-n-design documentation site (Vite SPA under `site/`), fixed layout/visual bugs, and filled every missing component example so all 88 component pages now render curated demos.

## Changes Made

### Site Layout & Visual Polish
- `site/src/components/Layout.tsx`
  - Kept `MainContent` padding at `32px`; added per-page top spacing instead so the sticky header never overlaps titles while the hero stays flush to the top.
- `site/src/pages/Home.tsx`
  - Wrapped hero title/subtitle/CTAs in a glassmorphic card for better readability over the 3D canvas.
  - Pulled the hero flush to the top of the viewport with a negative margin and added `padding-top` so content clears the sticky header.
  - Repositioned 3D shapes so they frame the title card instead of overlapping it.
  - Fixed all preview-card text/copy issues:
    - Card demo text now on separate lines.
    - Modal/Toast button labels shortened to avoid duplication with the card label.
    - Tabs demo text now uses theme `text` color for dark-mode readability.
    - Table preview uses `size="small"` and `bordered` and fits the card.
    - Badge placeholder uses theme-aware contrast.
  - Preview section background now adapts to light/dark mode.
- `site/src/pages/ComponentsPage.tsx`
  - Added `padding-top: 72px` so the component title clears the sticky header.
- `site/src/pages/GetStarted.tsx`
  - Added `padding-top: 72px` for consistent header clearance.
- `site/src/components/ComponentDemo.tsx`
  - Reduced demo card padding (`24px`) and min-height (`120px`).
  - Made the "View Code" toggle smaller, transparent, and less prominent.

### Component Examples
- `site/src/data/componentExamples.tsx`
  - Fixed missing `Tooltip` import.
  - Added imports for `Icon`, `RichTextEditor`, `SkipToContent`, `Text`, `VisuallyHidden`.
  - Added curated examples for all previously missing components:
    `Carousel`, `Drawer`, `Empty`, `Icon`, `RichTextEditor`, `SkipToContent`, `Stack`, `ThinkingBlock`, `Toast`, `Toggle`, `VisuallyHidden`, and a code-only `RSC` example.
  - Refactored stateful examples (`Modal`, `Drawer`, `CommandPalette`, `Tour`) into real top-level components so hooks no longer run inside `useMemo`, eliminating React rules-of-hooks errors.
  - Fixed `ThinkingBlock` example to use the correct `steps` prop API.
  - Fixed `Icon` example to use existing icon names (`home`, `user`, `cog`).

### Documentation
- `TODO.md`
  - Updated all checkboxes to reflect completed work. All 88 components now have curated examples and load without runtime errors.

## Verification
- `npm run build:site` completes successfully.
- All 88 component pages render curated examples.
- No runtime crashes on previously broken pages (`MultiSelect`, `Resizable`).
- Sticky header no longer overlaps page titles on Components/Get Started pages.

## Known Remaining Issues (out of scope for this pass)
- React 19 is installed due to `@react-three/fiber`/`drei` peer deps; several library components forward Framer Motion props (`whileTap`, `whileHover`, `layoutId`) to DOM elements, causing console warnings. These require library component fixes, not site changes.
- Some component previews (e.g., `Toggle`) have dark-on-dark contrast issues that stem from the component styling itself.
- Props table descriptions are mostly empty because source files lack JSDoc comments.

## Screenshots Generated
- `site-home-hero-dark.png`
- `site-button-detail-top.png`
- `site-button-detail-dark.png`
- `site-components-list-top.png`
- `site-toggle-detail.png`
- `site-home-viewport.png`
- `site-home-top.png`
- `site-home-light-v2.png`
- `site-home-dark-v2.png`
- `site-getstarted-top.png`
