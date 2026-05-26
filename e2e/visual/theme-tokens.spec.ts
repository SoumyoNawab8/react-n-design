import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for Theme Tokens
 * Tests all colors, shadows, typography, and border radius
 * Compares light vs dark mode visual appearance
 */

test.describe('Theme Tokens - Light Theme', () => {
  test('renders light theme background', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-card--default&globals=theme:light');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('theme-light-background.png', {
      maxDiffPixels: 200,
    });
  });

  test('light theme primary color', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-button--primary&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Button should show primary color (#6d5dfc)
    await expect(page).toHaveScreenshot('theme-light-primary.png', {
      maxDiffPixels: 100,
    });
  });

  test('light theme text colors', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-alert--info&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    // Check text contrast and color
    await expect(page).toHaveScreenshot('theme-light-text.png', {
      maxDiffPixels: 100,
    });
  });

  test('light theme soft shadows', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-card--default&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Card should show soft neomorphic shadow
    await expect(page).toHaveScreenshot('theme-light-shadows.png', {
      maxDiffPixels: 150,
    });
  });

  test('light theme border radius', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-button--primary&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    // Verify border radius (12px)
    await expect(page).toHaveScreenshot('theme-light-border-radius.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Theme Tokens - Dark Theme', () => {
  test('renders dark theme background', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-card--default&globals=theme:dark');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('theme-dark-background.png', {
      maxDiffPixels: 200,
    });
  });

  test('dark theme primary color', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-button--primary&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Button should show dark primary color (#7b6efc)
    await expect(page).toHaveScreenshot('theme-dark-primary.png', {
      maxDiffPixels: 100,
    });
  });

  test('dark theme text colors', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-alert--info&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');

    // Check dark mode text (#d1d9e6)
    await expect(page).toHaveScreenshot('theme-dark-text.png', {
      maxDiffPixels: 100,
    });
  });

  test('dark theme soft shadows', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-card--default&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Card should show dark neomorphic shadow
    await expect(page).toHaveScreenshot('theme-dark-shadows.png', {
      maxDiffPixels: 150,
    });
  });
});

test.describe('Theme Tokens - Neomorphic Effects', () => {
  test('outset shadow in light mode', async ({ page }) => {
    await page.goto('/iframe.html?args=variant:outset&id=react-n-design-card--default&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Shadow: 7px 7px 14px #bec3c9, -7px -7px 14px #ffffff
    await expect(page).toHaveScreenshot('theme-neo-outset-light.png', {
      maxDiffPixels: 150,
    });
  });

  test('inset shadow in light mode', async ({ page }) => {
    await page.goto('/iframe.html?args=variant:inset&id=react-n-design-card--default&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Shadow: inset 7px 7px 14px #bec3c9, inset -7px -7px 14px #ffffff
    await expect(page).toHaveScreenshot('theme-neo-inset-light.png', {
      maxDiffPixels: 150,
    });
  });

  test('outset shadow in dark mode', async ({ page }) => {
    await page.goto('/iframe.html?args=variant:outset&id=react-n-design-card--default&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Shadow: 7px 7px 14px #25282c, -7px -7px 14px #33363c
    await expect(page).toHaveScreenshot('theme-neo-outset-dark.png', {
      maxDiffPixels: 150,
    });
  });

  test('inset shadow in dark mode', async ({ page }) => {
    await page.goto('/iframe.html?args=variant:inset&id=react-n-design-card--default&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Shadow: inset 7px 7px 14px #25282c, inset -7px -7px 14px #33363c
    await expect(page).toHaveScreenshot('theme-neo-inset-dark.png', {
      maxDiffPixels: 150,
    });
  });
});

test.describe('Theme Tokens - Color Tokens', () => {
  test('displays success color token', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-alert--success&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('theme-color-success.png', {
      maxDiffPixels: 100,
    });
  });

  test('displays error color token', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-alert--error&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('theme-color-error.png', {
      maxDiffPixels: 100,
    });
  });

  test('displays warning color token', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-alert--warning&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('theme-color-warning.png', {
      maxDiffPixels: 100,
    });
  });

  test('displays info color token', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-alert--info&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('theme-color-info.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Theme Tokens - Typography', () => {
  test('renders typography components', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-typography--all-variants&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Check all typography variants render correctly
    await expect(page).toHaveScreenshot('theme-typography-variants.png', {
      maxDiffPixels: 200,
    });
  });

  test('light mode typography contrast', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-typography--heading&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('theme-typography-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('dark mode typography contrast', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-typography--heading&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('theme-typography-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Theme Tokens - Theme Toggle', () => {
  test('theme toggle button display', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-button--primary&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    // Initial light theme
    await expect(page).toHaveScreenshot('theme-toggle-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('theme toggle to dark', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-button--primary&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('theme-toggle-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Theme Tokens - Responsive', () => {
  test('renders on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?args=&id=react-n-design-card--default&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('theme-mobile.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?args=&id=react-n-design-card--default&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('theme-tablet.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/iframe.html?args=&id=react-n-design-card--default&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('theme-desktop.png', {
      maxDiffPixels: 150,
    });
  });
});

test.describe('Theme Tokens - Component Comparison', () => {
  test('full page component showcase - light', async ({ page }) => {
    await page.goto('/?path=/docs/react-n-design-card--docs&globals=theme:light');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('theme-showcase-light.png', {
      maxDiffPixels: 500,
    });
  });

  test('full page component showcase - dark', async ({ page }) => {
    await page.goto('/?path=/docs/react-n-design-card--docs&globals=theme:dark');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('theme-showcase-dark.png', {
      maxDiffPixels: 500,
    });
  });
});
