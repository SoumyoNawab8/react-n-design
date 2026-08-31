# Completion: Reduce Card Over-Wrapping in Docs Site

**Date**: 2026-06-16
**Scope**: Visual cleanup of documentation example and preview containers.

## What changed

### `site/src/components/ComponentDemo.tsx`
- Replaced `DemoCard = styled(Card)` with a neutral `DemoSurface` styled `div`.
- `DemoSurface` uses `theme.colors.background`, a 1px `theme.colors.border`, and `theme.borderRadius`, with no shadow.
- Updated both the example tab panels and the empty-state fallback to use `DemoSurface`.
- Removed the unused `Card` import.

### `site/src/pages/ComponentsPage.tsx`
- Removed the outer `Card variant="outset" bordered` wrapper around `<ComponentDemo />` on component detail pages.
- Removed the unused `Card` import.

### `site/src/pages/Home.tsx`
- Replaced `PreviewCard = styled(Card)` with a plain `PreviewItem` container.
- `PreviewItem` uses `theme.colors.background`, a 1px border, and no shadow.
- Moved the component label **above** the demo so the name is read before the example.
- The `Card` preview no longer nests an inset card inside an outset card; it renders as a single standalone `Card` in its slot.

### `site/src/components/CodePreview.tsx`
- Replaced `PreviewCard = styled(Card)` with `PreviewContainer` styled `div`.
- Removed the unused `Card` import.
- The code block keeps its existing `CodeContainer` styling; the redundant card shadow is gone.

## Verification

- `npm run build` (library build) completed.
- `npm run build:site` completed with only existing chunk-size/dep warnings.
- Previewed the built site on `http://localhost:4175/react-n-design/`.
- Captured screenshots:
  - `site-home-after-card-cleanup.png` (dark)
  - `site-home-light-after-card-cleanup.png` (light)
  - `site-button-detail-after-card-cleanup.png`
  - `site-components-list-after-card-cleanup.png`
- The only console entry was a `favicon.ico` 404, which is unrelated.

## Result

Component detail pages now show examples inside a single clean bordered surface instead of stacked cards. The home preview grid no longer looks like a wall of cards, and the `Card` demo displays one clear neomorphic card per slot. Code previews are visually subordinate to the demos.

## Remaining related work

- The dark-mode contrast sub-agent is still running to fix any remaining low-contrast examples.
- The React 19 DOM-prop warning fix and JSDoc documentation tasks are complete.
