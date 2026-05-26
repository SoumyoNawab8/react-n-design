import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for Form validation states
 * Tests validation errors, success states, and field interactions
 *
 * Stories: /iframe.html?id=react-n-design-form--with-validation
 */

test.describe('Form Validation - Basic States', () => {
  test('renders form with validation rules - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('form-validation-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders form with validation rules - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('form-validation-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Form Validation - Error States', () => {
  test('shows validation errors on submit', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Submit without filling
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('form-validation-errors.png', {
      maxDiffPixels: 150,
    });
  });

  test('shows email format error', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Enter invalid email
    await page.fill('input[type="email"]', 'invalid-email');
    await page.blur('input[type="email"]');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('form-validation-email-error.png', {
      maxDiffPixels: 100,
    });
  });

  test('shows required field error', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Submit with missing required field
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    // Screenshot should show required error message
    await expect(page.locator('text=required')).toBeVisible();

    await expect(page).toHaveScreenshot('form-validation-required-error.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Form Validation - Field States', () => {
  test('input with error styling', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');

    // Trigger validation
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    // Check error input has red border (visual)
    const _input = page.locator('input').first();

    await expect(page).toHaveScreenshot('form-input-error-styling.png', {
      maxDiffPixels: 100,
    });
  });

  test('input with error in dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('form-input-error-dark.png', {
      maxDiffPixels: 100,
    });
  });

  test('error message appearance', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    // Take screenshot focusing on error messages
    await expect(page).toHaveScreenshot('form-error-messages.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Form Validation - Success State', () => {
  test('form with valid data shows success', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Fill fields with valid data
    await page.fill('input[placeholder*="name"]', 'John Doe');
    await page.fill('input[type="email"]', 'john@example.com');
    await page.fill('input[type="password"]', 'securepassword123');

    await page.waitForTimeout(300);

    // No errors should be visible
    await expect(page.locator('[data-testid="error-message"]')).toBeHidden();

    await expect(page).toHaveScreenshot('form-validation-success.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Form Validation - Different Layouts', () => {
  test('validation in horizontal layout', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--horizontal-layout&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('form-validation-horizontal.png', {
      maxDiffPixels: 100,
    });
  });

  test('validation in vertical layout', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--vertical-layout&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('form-validation-vertical.png', {
      maxDiffPixels: 100,
    });
  });

  test('validation in inline layout', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--inline-layout&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('form-validation-inline.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Form Validation - Responsive', () => {
  test('renders on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('form-validation-mobile.png', {
      maxDiffPixels: 150,
    });
  });

  test('renders on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('form-validation-tablet.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('form-validation-desktop.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Form Validation - Theme Variations', () => {
  test('error styling in light theme', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('form-validation-neo-light.png', {
      maxDiffPixels: 150,
    });
  });

  test('error styling in dark theme', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('form-validation-neo-dark.png', {
      maxDiffPixels: 150,
    });
  });
});
