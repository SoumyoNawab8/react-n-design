# Task Completion: Fix Framer Motion prop forwarding to DOM

**Date:** 2026-06-16

## Problem
The documentation site showed React 19 console warnings because Framer Motion props (`whileTap`, `whileHover`, `layoutId`, etc.) were reaching DOM nodes.

## Root Cause
The library's lazy-loaded motion wrapper (`src/utils/lazyMotion.tsx`) renders a plain HTML fallback while `framer-motion` is still loading. This fallback was blindly spreading all motion props onto the DOM element, triggering React 19 "unknown prop" warnings.

Additionally, a few `styled(motion.*)` components had custom styling props (`size`, `isOpen`, `$orientation`, etc.) that were not filtered with `shouldForwardProp`, so they could also leak to the DOM.

## Changes Made

### 1. `src/utils/lazyMotion.tsx`
Added a `MOTION_PROP_DENYLIST` and `filterMotionProps` helper. The SSR/initial-load fallback now strips motion-only props before rendering the plain DOM element, eliminating the React 19 warnings while still forwarding valid DOM props (`style`, `className`, `onClick`, `aria-*`, etc.).

Filtered motion props include:
`initial`, `animate`, `exit`, `variants`, `transition`, `whileHover`, `whileTap`, `whileFocus`, `whileDrag`, `whileInView`, `layout`, `layoutId`, `layoutScroll`, `layoutRoot`, `drag`, `dragConstraints`, `dragElastic`, `dragMomentum`, `dragPropagation`, `dragControls`, `dragListener`, `dragSnapToOrigin`, `onHoverStart`, `onHoverEnd`, `onTap`, `onTapStart`, `onTapCancel`, `onPan`, `onPanStart`, `onPanEnd`, `onDrag`, `onDragStart`, `onDragEnd`, `onDragTransitionEnd`, `viewport`, `onViewportEnter`, `onViewportLeave`, `custom`, `transformTemplate`, `transformValues`, `onUpdate`, `onAnimationStart`, `onAnimationComplete`.

### 2. `src/components/Select/Select.styles.ts`
Added `shouldForwardProp` to `SelectDropdown` to filter the `size` styling prop.

### 3. `src/components/Collapsible/Collapsible.styles.ts`
Added `shouldForwardProp` to `CollapsibleContent` to filter the `isOpen` styling prop.

### 4. `src/components/Stepper/Stepper.styles.ts`
Added `shouldForwardProp` to:
- `StepperWrapper`: filters `$orientation`, `$variant`
- `StepperContent`: filters `$orientation`

### 5. `src/components/Menu/Menu.styles.ts`
Added `shouldForwardProp` to `MenuDropdown` to filter `$isMobile`, `$mobileFullscreen`.

### 6. `src/components/Segmented/Segmented.styles.ts`
Added `shouldForwardProp` to `SegmentedItem` to filter `$active`, `$size`, `$block`.

## Verification
- `npm run build` (library build) passed.
- `npm run build:site` passed.
- Playwright runtime check on the built site:
  - Home page: no motion-prop warnings.
  - `/components` page: no motion-prop warnings.
  - `/components/tabs` page: no motion-prop warnings (previously showed `layoutId` warning).
  - Remaining console messages are only the unrelated `THREE.Clock` deprecation warning and a missing `favicon.ico` 404.

## Notes
- Animations remain intact because the real `framer-motion` components still receive all motion props once the module loads; only the temporary plain-DOM fallback strips them.
- `npm run build:lib` does not exist in `package.json`; `npm run build` is the equivalent library build script.
