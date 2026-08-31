# Fix Example Tab Overflow on Mobile

**Date:** 2026-06-29  
**Branch:** `fix/site-component-examples`  
**Goal:** Make the example tabs scrollable so they don't overflow the viewport on narrow screens.

## Problem

On component detail pages with many example tabs (now 7–9 tabs per component), the tab bar stretched beyond the viewport width on mobile. Inspection showed the `TabsContainer` inside the `Tabs` component expanded to the intrinsic width of all tab buttons (`~1071 px` on a `375 px` viewport) instead of staying within its parent.

## Root cause

`src/components/Tabs/Tabs.styles.ts`:

```ts
export const TabsContainer = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
`;
```

As a flex child with `flex-grow: 1` and no `min-width` / overflow constraint, `TabsContainer` could grow past the available width when its children (tab buttons with `white-space: nowrap` and `flex-shrink: 0`) demanded more space.

## Fix

Added `min-width: 0` and `overflow: hidden` to `TabsContainer` so it respects the parent width, letting the inner `TabsList` (which already has `overflow-x: auto`) scroll horizontally instead of pushing the page out.

```ts
export const TabsContainer = styled.div`
  position: relative;
  flex-grow: 1;
  display: flex;
  min-width: 0;
  overflow: hidden;
`;
```

## Verification

- Rebuilt the docs site with `npm run build:site`.
- Ran Playwright at `375 × 812` viewport against `/components/Button`, `/components/Card`, `/components/Input`, `/components/CodeBlock`, and `/components/PromptBuilder`.
- Confirmed the tab list dimensions became `359 px` wide with `overflow-x: auto` and a larger `scrollWidth`, meaning tabs are contained and scrollable.
- Scrolled the tab list programmatically (`scrollLeft: 400`) and captured before/after screenshots.
- Re-ran `scripts/verify-all-components.js` across all 88 components → **88 passed, 0 failed**.

## Screenshots

- `site-tabs-mobile-initial.png` — tab bar fits the viewport, remaining tabs are off-screen.
- `site-tabs-mobile-scrolled.png` — tab bar scrolled to reveal later tabs.

## Note

The example tabs are now the only element that scrolls horizontally. A small amount of page-level horizontal overflow (~56 px) remains on some component pages and comes from the page layout / props table area, not from the tab bar itself. This change specifically addresses the tab overflow requested.
