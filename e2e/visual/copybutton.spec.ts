import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for CopyButton component
 * Tests all sizes, states, and variations
 *
 * Stories: /iframe.html?id=react-n-design-copybutton--default
 */

test.describe('CopyButton - Default', () => {
  test('renders default copy button - light mode', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--default&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('copybutton-default-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders default copy button - dark mode', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--default&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('copybutton-default-dark.png', {
      maxDiffPixels: 100,
    });
  });

  test('hover state', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.hover('[data-testid="copy-button"]');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('copybutton-hover.png', {
      maxDiffPixels: 100,
    });
  });

  test('active/pressed state', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    const button = page.locator('[data-testid="copy-button"]');
    await button.dispatchEvent('mousedown');
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('copybutton-pressed.png', {
      maxDiffPixels: 100,
    });

    await button.dispatchEvent('mouseup');
  });
});

test.describe('CopyButton - Sizes', () => {
  test('renders small size', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--small-size&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('copybutton-size-sm.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders medium size', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--medium-size&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('copybutton-size-md.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders large size', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--large-size&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('copybutton-size-lg.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders all sizes side by side', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--all-sizes&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('copybutton-all-sizes.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('CopyButton - Disabled State', () => {
  test('renders disabled button', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--disabled&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('copybutton-disabled.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('CopyButton - Custom Tooltip', () => {
  test('shows custom tooltip on hover', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--with-custom-tooltip&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.hover('[data-testid="copy-button"]');
    await page.waitForTimeout(300); // Wait for tooltip animation

    await expect(page).toHaveScreenshot('copybutton-custom-tooltip.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('CopyButton - Auto Detect Feature', () => {
  test('renders with auto-detect from element', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--with-auto-detect&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('copybutton-auto-detect.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('CopyButton - Interactive States', () => {
  test('shows checkmark after click (success state)', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Grant clipboard permissions
    await page.context().grantPermissions(['clipboard-write']);

    const button = page.locator('[data-testid="copy-button"]');
    await button.click();
    await page.waitForTimeout(200);

    await expect(page).toHaveScreenshot('copybutton-success-state.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('CopyButton - Responsive Breakpoints', () => {
  test('renders correctly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('copybutton-mobile.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders correctly on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('copybutton-tablet.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders correctly on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/iframe.html?args=&id=react-n-design-copybutton--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('copybutton-desktop.png', {
      maxDiffPixels: 100,
    });
  });
});
