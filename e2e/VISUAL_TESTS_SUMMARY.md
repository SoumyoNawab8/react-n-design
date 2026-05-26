# Playwright Visual Regression Tests - Summary

## Overview

Created comprehensive visual regression tests for the react-n-design component library using Playwright. Tests navigate to Storybook stories and capture screenshots to verify visual appearance across themes, viewports, and states.

## Files Created

### Test Files (in `e2e/visual/`)

1. **button.spec.ts** - Button component visual regression tests
   - Primary, Text, Icon variants
   - Loading states
   - Hover and pressed states
   - Light/dark themes
   - Responsive breakpoints

2. **input.spec.ts** - Input component visual regression tests
   - Default and focused states
   - Prefix/suffix icons
   - Password input
   - Clear button
   - Neomorphic shadows in themes

3. **modal.spec.ts** - Modal component visual regression tests
   - Open/close states
   - Size variants (default, large, fullscreen)
   - Position variants (center, top)
   - Backdrop effects
   - Theme variations

4. **card.spec.ts** - Card component visual regression tests
   - Default, header/footer, cover image
   - Hoverable state with lift effect
   - Inset/outset variants
   - Loading state
   - Padding variants

5. **alert.spec.ts** - Alert component visual regression tests
   - Success, info, warning, error types
   - With description
   - Closable state
   - Custom icon
   - All types comparison

6. **form-validation.spec.ts** - Form validation visual regression tests
   - Validation error states
   - Email format errors
   - Required field errors
   - Valid form state
   - Horizontal, vertical, inline layouts
   - Theme variations

7. **theme-tokens.spec.ts** - Theme tokens visual regression tests
   - Light/dark theme colors
   - Neomorphic shadows (outset/inset)
   - Color tokens
   - Typography
   - Border radius
   - Component showcase

### Configuration Updates

8. **playwright.config.ts** - Enhanced configuration
   - Updated reporters for CI/CD
   - Added locale, timezone, viewport settings
   - Mobile browser projects (Mobile Chrome, Mobile Safari)
   - Snapshot directory configuration
   - Expect configuration for screenshots (maxDiffPixels: 100)

9. **.storybook/preview.tsx** - Added theme support
   - Added global theme controls (light/dark)
   - Background colors for testing
   - Dynamic theme switching via decorator

10. **e2e/visual/README.md** - Documentation
    - Test structure and organization
    - Running instructions
    - Best practices
    - Troubleshooting guide

## Test Statistics

- **Total Tests:** 165
- **Test Files:** 7
- **Components Covered:** 7 main components + theme tokens
- **Viewports:** Mobile (375x667px), Tablet (768x1024px), Desktop (1920x1080px)
- **Themes:** Light and Dark mode for each component
- **Snapshots:** ~70+ unique screenshot scenarios

## Running the Tests

### Run all visual tests
```bash
npx playwright test e2e/visual
```

### Run specific component tests
```bash
npx playwright test e2e/visual/button.spec.ts
```

### Update snapshots (after intentional changes)
```bash
npx playwright test e2e/visual --update-snapshots
```

### Run with UI mode
```bash
npx playwright test e2e/visual --ui
```

## Key Features

1. **Theme Testing** - Every component tested in both light and dark themes
2. **Responsive Testing** - All components tested at mobile, tablet, and desktop sizes
3. **Interaction States** - Hover, focus, pressed, open, and error states captured
4. **Animations** - Tests wait for animations to complete before screenshots
5. **Storybook Integration** - Tests use Storybook URLs for consistent rendering

## Screenshot Locations

Snapshots are generated in `{test-file-name}-snapshots/` directories next to each test file:
```
e2e/visual/
├── button.spec.ts-snapshots/
│   ├── button-primary-light-chromium-darwin.png
│   └── ...
├── input.spec.ts-snapshots/
│   └── ...
└── ...
```

## Requirements

- Playwright installed: `@playwright/test` is a dev dependency
- Storybook running (auto-started by webServer config)
- Chromium browser (downloads automatically)

## CI/CD Integration

The configuration is optimized for CI with:
- HTML reports that don't auto-open (`{ open: 'never' }`)
- List reporter for console output
- Retry on failure (2 retries on CI)
- Single worker on CI for consistency

## Next Steps

1. Run initial test pass to generate baseline snapshots:
   ```bash
   npx playwright test e2e/visual --update-snapshots
   ```

2. Review snapshots to ensure they match expected designs

3. Commit snapshots to repository for regression detection

4. Add tests to CI pipeline for automated visual regression testing
