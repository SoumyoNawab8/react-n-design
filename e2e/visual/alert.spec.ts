import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for Alert component
 * Tests all types: success, info, warning, error
 *
 * Stories: /iframe.html?id=react-n-design-alert--success
 */

test.describe('Alert - Success Variant', () => {
  test('renders success alert - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-alert--success&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('alert-success-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders success alert - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-alert--success&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('alert-success-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Alert - Info Variant', () => {
  test('renders info alert - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-alert--info&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-info-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders info alert - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-alert--info&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-info-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Alert - Warning Variant', () => {
  test('renders warning alert - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-alert--warning&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-warning-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders warning alert - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-alert--warning&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-warning-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Alert - Error Variant', () => {
  test('renders error alert - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-alert--error&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-error-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders error alert - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-alert--error&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-error-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Alert - Description Text', () => {
  test('renders alert with description', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-alert--with-description&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-with-description.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Alert - Closable State', () => {
  test('renders closable alert', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-alert--closable&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-closable.png', {
      maxDiffPixels: 100,
    });
  });

  test('alert closes on X button click', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-alert--closable&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Alert exists initially
    await expect(page.locator('[data-testid="alert"]')).toBeVisible();

    // Click close button
    await page.click('[data-testid="alert-close"]');
    await page.waitForTimeout(300);

    // Alert should be hidden or removed
    await expect(page.locator('[data-testid="alert"]')).not.toBeVisible();

    await expect(page).toHaveScreenshot('alert-closed.png', {
      maxDiffPixels: 50,
    });
  });
});

test.describe('Alert - Custom Icon', () => {
  test('renders alert with custom icon', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-alert--custom-icon&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-custom-icon.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Alert - All Types Comparison', () => {
  test('renders all alert types in light mode', async ({ page }) => {
    // Visit storybook main page and navigate to show all variants
    await page.goto('/?path=/docs/react-n-design-alert--docs');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-all-types-light.png', {
      maxDiffPixels: 200,
    });
  });

  test('renders all alert types in dark mode', async ({ page }) => {
    await page.goto('/?path=/docs/react-n-design-alert--docs&globals=theme:dark');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-all-types-dark.png', {
      maxDiffPixels: 200,
    });
  });
});

test.describe('Alert - Responsive', () => {
  test('renders on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?args=&id=react-n-design-alert--with-description&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-mobile.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?args=&id=react-n-design-alert--with-description&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-tablet.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/iframe.html?args=&id=react-n-design-alert--with-description&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('alert-desktop.png', {
      maxDiffPixels: 100,
    });
  });
});
