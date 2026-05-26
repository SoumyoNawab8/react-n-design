import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for Card component
 * Tests variants: outset, inset, hoverable, loading
 *
 * Stories: /iframe.html?id=react-n-design-card--default
 */

test.describe('Card - Default State', () => {
  test('renders default card - light mode', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-card--default&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('card-default-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders default card - dark mode', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-card--default&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('card-default-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Card - Header and Footer', () => {
  test('renders card with header and footer', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-card--with-header-and-footer&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('card-header-footer.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders card with cover image', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-card--with-cover-image&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Wait for image to load
    await page.waitForSelector('img');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('card-cover-image.png', {
      maxDiffPixels: 200,
    });
  });
});

test.describe('Card - Hoverable State', () => {
  test('renders hoverable card', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-card--hoverable&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('card-hoverable.png', {
      maxDiffPixels: 100,
    });
  });

  test('card hover effect - light mode', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-card--hoverable&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    await page.hover('[data-testid="card"]');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('card-hover-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('card hover effect - dark mode', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-card--hoverable&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');

    await page.hover('[data-testid="card"]');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('card-hover-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Card - Loading State', () => {
  test('renders loading card', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-card--loading-state&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500); // Wait for spinner

    await expect(page).toHaveScreenshot('card-loading.png', {
      maxDiffPixels: 150,
    });
  });
});

test.describe('Card - Variant Styles', () => {
  test('outset variant - light mode', async ({ page }) => {
    await page.goto('/iframe.html?args=variant:outset&id=react-n-design-card--default&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('card-outset-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('inset variant - light mode', async ({ page }) => {
    await page.goto('/iframe.html?args=variant:inset&id=react-n-design-card--default&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('card-inset-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('outset variant - dark mode', async ({ page }) => {
    await page.goto('/iframe.html?args=variant:outset&id=react-n-design-card--default&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('card-outset-dark.png', {
      maxDiffPixels: 100,
    });
  });

  test('inset variant - dark mode', async ({ page }) => {
    await page.goto('/iframe.html?args=variant:inset&id=react-n-design-card--default&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('card-inset-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Card - Padding Variants', () => {
  test('render card with small padding', async ({ page }) => {
    await page.goto('/iframe.html?args=padding:small&id=react-n-design-card--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('card-padding-small.png', {
      maxDiffPixels: 100,
    });
  });

  test('render card with medium padding', async ({ page }) => {
    await page.goto('/iframe.html?args=padding:medium&id=react-n-design-card--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('card-padding-medium.png', {
      maxDiffPixels: 100,
    });
  });

  test('render card with large padding', async ({ page }) => {
    await page.goto('/iframe.html?args=padding:large&id=react-n-design-card--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('card-padding-large.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Card - Responsive', () => {
  test('renders on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?args=&id=react-n-design-card--with-header-and-footer&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('card-mobile.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?args=&id=react-n-design-card--with-header-and-footer&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('card-tablet.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/iframe.html?args=&id=react-n-design-card--with-cover-image&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Wait for image
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('card-desktop.png', {
      maxDiffPixels: 200,
    });
  });
});
