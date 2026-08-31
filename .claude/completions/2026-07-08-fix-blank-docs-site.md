# Fix blank documentation site landing page

**Date:** 2026-07-08
**Branch:** fix/site-component-examples
**Goal:** Dev server at http://localhost:5174/react-n-design/ was showing a blank page instead of the documentation site landing.

## Diagnosis

The browser console showed:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'S')
    at Tt.exports (@react-three-fiber.esm...)
    at createReconciler
```

This crash originated from `site/src/components/Hero3D.tsx`, which uses `@react-three/fiber`. The installed versions were React-19-only:

- `@react-three/fiber` `^9.6.1` (requires React `>=19`)
- `@react-three/drei` `^10.7.7` (requires React `^19`)

But the project is on React 18 (`react` `^18.3.1`), so the reconciler failed immediately and the entire React tree never mounted, leaving a blank page.

## Fix

Updated `package.json` devDependencies to React-18-compatible versions:

```diff
-    "@react-three/drei": "^10.7.7",
-    "@react-three/fiber": "^9.6.1",
+    "@react-three/drei": "^9.122.0",
+    "@react-three/fiber": "^8.18.0",
```

Installed with `--legacy-peer-deps` because of a pre-existing peer-dependency conflict between `vite@8.1.3` and `@vitejs/plugin-react@4.7.0`.

Restarted the dev server on port `5174`. The page now renders the full landing: hero with 3D shapes, feature grid, component preview grid, and footer.

## Remaining non-blocking warnings

- `THREE.Clock` deprecation warning from `three@0.184.0`.
- `favicon.ico` 404 (no favicon link in `site/index.html`).
- A11y issue: two form fields lack `id`/`name` attributes (Input preview and possibly another).

## Verification

- Browser accessibility snapshot shows all expected content.
- Full-page screenshot confirms the landing renders correctly.
- Console no longer contains the React-Three-Fiber reconciler crash.
