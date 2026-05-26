import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for Modal component
 * Tests open/close states, sizes, positions
 *
 * Stories: /iframe.html?id=react-n-design-modal--default
 */

test.describe('Modal - Default State', () => {
  test('modal opens - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-modal--default&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');

    // Click to open modal
    await page.click('button');
    await page.waitForTimeout(400); // Wait for animation

    await expect(page).toHaveScreenshot('modal-open-light.png', {
      maxDiffPixels: 200,
    });
  });

  test('modal opens - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-modal--default&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');

    await page.click('button');
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('modal-open-dark.png', {
      maxDiffPixels: 200,
    });
  });

  test('modal closes on button click', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-modal--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Open modal
    await page.click('button');
    await page.waitForTimeout(400);

    // Close modal
    await page.click('[data-testid="modal-close"]');
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('modal-closed.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Modal - Size Variants', () => {
  test('large modal with footer', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-modal--large-with-footer&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.click('button');
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('modal-large-footer.png', {
      maxDiffPixels: 150,
    });
  });

  test('top positioned modal', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-modal--top-position&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.click('button');
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('modal-top-position.png', {
      maxDiffPixels: 150,
    });
  });

  test('fullscreen modal', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-modal--full-screen&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.click('button');
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('modal-fullscreen.png', {
      maxDiffPixels: 200,
    });
  });
});

test.describe('Modal - Interaction States', () => {
  test('modal with backdrop disabled', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-modal--no-backdrop-click&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.click('button');
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('modal-no-backdrop-click.png', {
      maxDiffPixels: 150,
    });
  });

  test('modal backdrop blur effect', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-modal--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Open modal and click outside
    await page.click('button');
    await page.waitForTimeout(400);

    // Screenshot should show blurred backdrop
    await expect(page).toHaveScreenshot('modal-backdrop-blur.png', {
      maxDiffPixels: 150,
    });
  });
});

test.describe('Modal - Responsive', () => {
  test('renders on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?args=&id=react-n-design-modal--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.click('button');
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('modal-mobile.png', {
      maxDiffPixels: 150,
    });
  });

  test('renders on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?args=&id=react-n-design-modal--large-with-footer&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.click('button');
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('modal-tablet.png', {
      maxDiffPixels: 150,
    });
  });

  test('renders on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/iframe.html?args=&id=react-n-design-modal--large-with-footer&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.click('button');
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('modal-desktop.png', {
      maxDiffPixels: 200,
    });
  });
});

test.describe('Modal - Theme Variations', () => {
  test('neomorphic styling in light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-modal--default&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');

    await page.click('button');
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('modal-neo-light.png', {
      maxDiffPixels: 150,
    });
  });

  test('neomorphic styling in dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-modal--default&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');

    await page.click('button');
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('modal-neo-dark.png', {
      maxDiffPixels: 150,
    });
  });
});
