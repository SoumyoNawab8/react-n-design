# Visual Regression Tests for react-n-design

This directory contains Playwright visual regression tests for the react-n-design component library.

## Structure

```
e2e/
├── visual/                    # Visual regression test files
│   ├── button.spec.ts         # Button component visual tests
│   ├── input.spec.ts          # Input component visual tests
│   ├── modal.spec.ts          # Modal component visual tests
│   ├── card.spec.ts           # Card component visual tests
│   ├── alert.spec.ts          # Alert component visual tests
│   ├── form-validation.spec.ts # Form validation state tests
│   └── theme-tokens.spec.ts   # Theme token visual tests
├── components.spec.ts         # Existing component tests
├── form.spec.ts               # Existing form tests
├── tour.spec.ts               # Existing tour tests
└── README.md                  # This file
```

## Running Tests

### Run all tests
```bash
npx playwright test
```

### Run specific test file
```bash
npx playwright test e2e/visual/button.spec.ts
```

### Run tests with UI mode
```bash
npx playwright test --ui
```

### Update snapshots
```bash
npx playwright test --update-snapshots
```

### Run in headed mode (browser visible)
```bash
npx playwright test --headed
```

## Test Coverage

### Button Component (`button.spec.ts`)
- ✅ Primary and Text variants
- ✅ Icon buttons (left, right, circle)
- ✅ Loading states (with and without text)
- ✅ Hover and pressed states
- ✅ Light and dark theme
- ✅ Responsive breakpoints (mobile, tablet, desktop)

### Input Component (`input.spec.ts`)
- ✅ Default state
- ✅ Focused state
- ✅ Prefix/suffix icons
- ✅ Addons
- ✅ Search box variant
- ✅ Password input
- ✅ Clear button
- ✅ Neomorphic shadows in both themes
- ✅ Responsive

### Modal Component (`modal.spec.ts`)
- ✅ Open/close states
- ✅ Size variants (default, large, fullscreen)
- ✅ Position variants (center, top)
- ✅ Backdrop effects
- ✅ Light and dark theme
- ✅ Responsive breakpoints

### Card Component (`card.spec.ts`)
- ✅ Default state
- ✅ With header and footer
- ✅ With cover image
- ✅ Hoverable state
- ✅ Loading state
- ✅ Inset/outset variants
- ✅ Padding variants
- ✅ Responsive

### Alert Component (`alert.spec.ts`)
- ✅ All types: success, info, warning, error
- ✅ With description
- ✅ Closable state
- ✅ Custom icon
- ✅ All types comparison
- ✅ Responsive

### Form Validation (`form-validation.spec.ts`)
- ✅ Validation error states
- ✅ Email format errors
- ✅ Required field errors
- ✅ Valid form state
- ✅ Horizontal, vertical, inline layouts
- ✅ Error styling in both themes
- ✅ Responsive

### Theme Tokens (`theme-tokens.spec.ts`)
- ✅ Light theme (colors, shadows, text)
- ✅ Dark theme (colors, shadows, text)
- ✅ Neomorphic shadows (outset/inset)
- ✅ Color tokens (success, error, warning, info)
- ✅ Typography
- ✅ Border radius
- ✅ Component showcase
- ✅ Responsive

## Snapshot Storage

Snapshots are stored in the `e2e/visual/` directory next to their corresponding test files, using the naming pattern `{test-file-name}-snapshots/`.

For example, snapshots for `button.spec.ts` will be stored in:
```
e2e/visual/button.spec.ts-snapshots/
  ├── button-primary-light-chromium-win32.png
  ├── button-primary-dark-chromium-win32.png
  └── ...
```

## Configuration

The Playwright configuration is in `playwright.config.ts` at the project root:

- Tests run against http://localhost:6006 (Storybook)
- Uses Chromium browser for consistent screenshots
- `maxDiffPixels: 100` allows for minor rendering differences
- Web server auto-starts Storybook dev server if not running

## Best Practices

1. **Wait for animations**: Most tests include `page.waitForTimeout()` to allow animations to complete
2. **Network idle**: Tests wait for `networkidle` state before screenshots
3. **Theme testing**: Both light and dark modes are tested for components
4. **Viewport testing**: Components are tested at mobile, tablet, and desktop breakpoints
5. **Interaction states**: Hover, focus, pressed, and open states are captured

## Adding New Tests

1. Create a new file in `e2e/visual/` with `.spec.ts` extension
2. Import `{ expect, test } from '@playwright/test'`
3. Use `test.describe` to group related tests
4. Navigate to Storybook stories using the pattern:
   ```typescript
   await page.goto('/iframe.html?args=&id=react-n-design-button--primary&viewMode=story');
   ```
5. Take screenshots with:
   ```typescript
   await expect(page).toHaveScreenshot('filename.png', {
     maxDiffPixels: 100,
   });
   ```

## Troubleshooting

### Screenshots don't match in CI
Differences in OS/browser rendering may cause failures. Consider:
- Running tests in Docker for consistency
- Using `maxDiffPixels` threshold
- Updating snapshots for your target platform

### Animations causing flaky tests
Increase timeout values or wait for specific elements:
```typescript
await page.waitForTimeout(500);
await page.waitForSelector('.visible-element');
```

### Storybook not loaded
Ensure Storybook is running or let Playwright handle it via webServer config.
