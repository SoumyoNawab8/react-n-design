import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for Input component
 * Tests states: default, focused, error, disabled
 *
 * Stories: /iframe.html?id=react-n-design-input--default
 */

test.describe('Input - Default State', () => {
  test('renders default input - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-input--default&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('input-default-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders default input - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-input--default&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('input-default-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Input - Focused State', () => {
  test('shows focused state styling', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-input--default&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');

    await page.focus('input');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('input-focused.png', {
      maxDiffPixels: 100,
    });
  });

  test('shows focused state in dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-input--default&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');

    await page.focus('input');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('input-focused-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Input - With Prefix and Suffix', () => {
  test('renders input with icons', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-input--with-prefix-and-suffix&viewMode=story'
    );
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('input-prefix-suffix.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders input with addons', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-input--with-addons&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('input-addons.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders search box variant', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-input--search-box&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('input-search-box.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Input - Password Input', () => {
  test('renders password input', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-input--password-input&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('input-password.png', {
      maxDiffPixels: 100,
    });
  });

  test('shows password visibility toggle', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-input--password-input&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Fill with password
    await page.fill('input', 'secret123');

    await expect(page).toHaveScreenshot('input-password-filled.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Input - Clear Button', () => {
  test('renders input with clear button', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-input--with-clear-button&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Type something to show clear button
    await page.fill('input', 'Sample text');
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('input-with-clear.png', {
      maxDiffPixels: 100,
    });
  });

  test('clear button appears on hover', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-input--with-clear-button&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.fill('input', 'Sample text');
    await page.hover('input');
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('input-clear-hover.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Input - Responsive', () => {
  test('renders on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(
      '/iframe.html?args=&id=react-n-design-input--with-prefix-and-suffix&viewMode=story'
    );
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('input-mobile.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?args=&id=react-n-design-input--with-addons&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('input-tablet.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/iframe.html?args=&id=react-n-design-input--search-box&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('input-desktop.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Input - Theme Variations', () => {
  test('light theme neomorphic shadows', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-input--default&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');

    // Check the visual styling of the neomorphic shadow
    await expect(page).toHaveScreenshot('input-neo-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('dark theme neomorphic shadows', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-input--default&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('input-neo-dark.png', {
      maxDiffPixels: 100,
    });
  });
});
