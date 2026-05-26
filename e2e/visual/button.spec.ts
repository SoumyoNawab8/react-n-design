import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for Button component
 * Tests all variants, sizes, and states
 *
 * Stories: /iframe.html?id=react-n-design-button--primary
 */

test.describe('Button - Primary Variant', () => {
  test('renders primary button - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-button--primary&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Wait for styles to apply

    await expect(page).toHaveScreenshot('button-primary-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders primary button - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-button--primary&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('button-primary-dark.png', {
      maxDiffPixels: 100,
    });
  });

  test('primary button hover state', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-button--primary&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.hover('button');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('button-primary-hover.png', {
      maxDiffPixels: 100,
    });
  });

  test('primary button active/pressed state', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-button--primary&viewMode=story');
    await page.waitForLoadState('networkidle');

    const button = page.locator('button');
    await button.dispatchEvent('mousedown');
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('button-primary-pressed.png', {
      maxDiffPixels: 100,
    });

    await button.dispatchEvent('mouseup');
  });
});

test.describe('Button - Text Variant', () => {
  test('renders text button - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-button--text-button&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('button-text-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders text button - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-button--text-button&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('button-text-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Button - Icon Variants', () => {
  test('renders button with left icon', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-button--with-left-icon&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('button-left-icon.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders button with right icon', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-button--with-right-icon&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('button-right-icon.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders icon-only circle button', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-button--icon-only&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('button-icon-only.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Button - Loading State', () => {
  test('renders loading spinner', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-button--loading&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Wait for spinner animation

    await expect(page).toHaveScreenshot('button-loading.png', {
      maxDiffPixels: 150,
    });
  });

  test('renders loading with text', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-button--loading-with-text&viewMode=story'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('button-loading-text.png', {
      maxDiffPixels: 150,
    });
  });
});

test.describe('Button - Link Variant', () => {
  test('renders button as link - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-button--as-link&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('button-link-light.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Button - Responsive Breakpoints', () => {
  test('renders correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?args=&id=react-n-design-button--primary&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('button-mobile.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?args=&id=react-n-design-button--primary&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('button-tablet.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/iframe.html?args=&id=react-n-design-button--primary&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('button-desktop.png', {
      maxDiffPixels: 100,
    });
  });
});
