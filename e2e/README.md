# E2E Visual Testing with Playwright

This directory contains visual regression tests using Playwright for the react-n-design component library.

## Test Files

### `form.spec.ts`
Tests for the Form component covering:

#### Basic Functionality
- Form rendering with input fields
- Form field interactions and submission
- Horizontal, vertical, and inline layouts
- Disabled form state

#### Validation
- Required field validation
- Email format validation
- Password length validation
- Error message clearing

#### Field Interactions
- Focus and blur interactions
- Typing and value updates
- Form submission handling

### `tour.spec.ts`
Tests for the Tour component covering:

#### Basic Rendering
- Tour card rendering with first step
- Spotlight highlighting
- Step indicators

#### Navigation
- Next/Previous button functionality
- Multi-step navigation
- Finish button on last step
- Step indicator updates

#### Different Placements
- Top, bottom, left, right placements
- Spotlight positioning

#### Skip and Close
- Skip button functionality
- Finish button completion

#### Single Step Tours
- Single step without navigation
- Single Finish button

#### Long Tours
- Multiple step tours
- Active indicator states

#### Accessibility
- ARIA attributes (role, aria-modal, aria-live)
- Overlay interactions

### `components.spec.ts`
Existing tests for other components (Checkbox, Collapsible, Popover, RadioGroup, ScrollArea, Toggle).

## Running Tests

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npx playwright test e2e/ --reporter=list

# Run specific test file
npx playwright test e2e/form.spec.ts --reporter=list
npx playwright test e2e/tour.spec.ts --reporter=list

# Run tests with UI mode for debugging
npx playwright test --ui

# Update screenshots (visual regression)
npx playwright test --update-snapshots

# Run tests in headed mode (see browser)
npx playwright test --headed
```

## Configuration

The Playwright configuration is in `playwright.config.ts` at the project root.

### Key Settings:
- **Test Directory:** `./e2e`
- **Base URL:** `http://localhost:6006` (Storybook dev server)
- **Browser:** Chromium (Desktop Chrome)
- **Screenshots:** Captured on failure
- **Web Server:** Auto-starts Storybook dev server before tests

## Visual Regression Testing

Tests use Playwright's `toHaveScreenshot()` matcher for visual regression:

```typescript
await expect(page).toHaveScreenshot('screenshot-name.png', {
  maxDiffPixels: 100,
});
```

Screenshots are stored in:
- `e2e/__snapshots__/form.spec.ts-snapshots/`
- `e2e/__snapshots__/tour.spec.ts-snapshots/`
- `e2e/__snapshots__/components.spec.ts-snapshots/`

## Storybook Integration

Tests navigate directly to Storybook stories using the iframe.html URL pattern:

```
/iframe.html?args=&id=react-n-design-form--basic&viewMode=story
/iframe.html?args=&id=react-n-design-tour--default&viewMode=story
```

## Troubleshooting

### Tests fail due to missing screenshots
Run with `--update-snapshots` to generate baseline screenshots.

### Tests timeout
Increase timeout in `playwright.config.ts`:
```typescript
timeout: 120_000,
```

### Storybook not loading
Ensure Storybook is built or running:
```bash
npm run build-storybook  # Static build
npm run dev              # Dev server
```

## Adding New Tests

1. Create a new `.spec.ts` file in `e2e/`
2. Import Playwright test utilities
3. Navigate to the story using Storybook's iframe URL
4. Wait for networkidle state
5. Interact with components
6. Take screenshots with `toHaveScreenshot()`
