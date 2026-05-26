import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for fixed components
 * Tests Checkbox, Collapsible, Popover, RadioGroup, ScrollArea, Toggle
 */

test.describe('Checkbox Component', () => {
  test('renders correctly in checked state', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=form-checkbox--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Click to check
    await page.click('[data-testid="checkbox-box"]');

    // Take screenshot
    await expect(page).toHaveScreenshot('checkbox-checked.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders disabled state', async ({ page }) => {
    await page.goto('/iframe.html?args=disabled:true&id=form-checkbox--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('checkbox-disabled.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Collapsible Component', () => {
  test('renders collapsed state', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=display-collapsible--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('collapsible-collapsed.png', {
      maxDiffPixels: 100,
    });
  });

  test('expands on click', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=display-collapsible--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Click to expand
    await page.click('[data-testid="collapsible-trigger"]');

    // Wait for animation
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('collapsible-expanded.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Popover Component', () => {
  test('opens on click', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=overlay-popover--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Click trigger
    await page.click('button');

    // Wait for animation
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('popover-open.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('RadioGroup Component', () => {
  test('renders with selected option', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=form-radiogroup--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Click second option
    await page.locator('[role="radio"]').nth(1).click();

    await expect(page).toHaveScreenshot('radiogroup-selected.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders disabled state', async ({ page }) => {
    await page.goto('/iframe.html?args=disabled:true&id=form-radiogroup--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('radiogroup-disabled.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('ScrollArea Component', () => {
  test('renders with overflow content', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=layout-scrollarea--scrollable&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Scroll to show scrollbar
    await page.locator('[data-testid="scroll-viewport"]').nth(0).scrollBy(0, 100);

    await expect(page).toHaveScreenshot('scrollarea-scrolled.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Toggle Component', () => {
  test('renders pressed state', async ({ page }) => {
    await page.goto('/iframe.html?args=defaultPressed:true&id=form-toggle--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('toggle-pressed.png', {
      maxDiffPixels: 100,
    });
  });

  test('toggle group renders with selection', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=form-togglegroup--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Click second toggle
    await page.locator('[role="button"]').nth(1).click();

    await expect(page).toHaveScreenshot('togglegroup-selected.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Component Library Smoke Test', () => {
  test('Storybook loads without errors', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for Storybook sidebar
    await expect(page.locator('#storybook-explorer-tree')).toBeVisible();

    // Check no error overlay
    await expect(page.locator('text=Failed to compile')).not.toBeVisible();
  });
});
