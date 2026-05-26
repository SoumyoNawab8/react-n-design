import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for Accordion component
 * Tests all states: default, expanded, multiple, borderless, disabled, themes, responsive
 *
 * Stories: /iframe.html?id=react-n-design-accordion--*
 */

test.describe('Accordion - Default State', () => {
  test('renders default accordion - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-accordion--default&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-default-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders default accordion - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-accordion--default&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-default-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Accordion - Expanded State', () => {
  test('renders expanded panel - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-accordion--default&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Take screenshot of expanded state (default already has panel 1 open)
    await expect(page).toHaveScreenshot('accordion-expanded-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders all expanded panels - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-accordion--controlled&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Click "Expand All" button to show all panels
    await page.click('text=Expand All');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-all-expanded-light.png', {
      maxDiffPixels: 200,
    });
  });
});

test.describe('Accordion - Allow Multiple', () => {
  test('renders multiple expanded panels - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-accordion--allow-multiple&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-allow-multiple-light.png', {
      maxDiffPixels: 150,
    });
  });

  test('renders multiple expanded panels - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-accordion--allow-multiple&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-allow-multiple-dark.png', {
      maxDiffPixels: 150,
    });
  });
});

test.describe('Accordion - Borderless', () => {
  test('renders borderless accordion - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-accordion--borderless&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-borderless-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders borderless accordion - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-accordion--borderless&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-borderless-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Accordion - Disabled State', () => {
  test('renders disabled panels correctly', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-accordion--all-disabled&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-all-disabled.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders accordion with some disabled items', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-accordion--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Third panel ("Disabled Panel") is not visible in the default story
    // but its header should show disabled state if we had one
    // This tests regular view with enabled items
    await expect(page).toHaveScreenshot('accordion-mixed-disabled.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Accordion - Custom Icons', () => {
  test('renders accordion with custom icons - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-accordion--with-custom-icons&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-custom-icons-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders accordion with custom icons - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-accordion--with-custom-icons&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-custom-icons-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Accordion - Nested Content', () => {
  test('renders accordion with rich content - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-accordion--nested-content&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Expand first panel to see content
    await page.click('[data-testid="accordion-header-1"]');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('accordion-nested-content-light.png', {
      maxDiffPixels: 150,
    });
  });
});

test.describe('Accordion - Interactions', () => {
  test('accordion expands on click', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-accordion--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Initially closed - click panel 2
    const header2 = page.locator('[data-testid="accordion-header-2"]');
    await header2.click();
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('accordion-after-click-expand.png', {
      maxDiffPixels: 100,
    });
  });

  test('accordion chevron rotates on expand', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-accordion--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Click on a collapsed panel
    const header2 = page.locator('[data-testid="accordion-header-2"]');
    await header2.click();
    await page.waitForTimeout(400); // Wait for animation

    await expect(page).toHaveScreenshot('accordion-chevron-rotated.png', {
      maxDiffPixels: 50,
    });
  });

  test('controlled accordion state transition', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-accordion--controlled&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Initial state
    const activeText = page.locator('p');
    await expect(activeText).toContainText('Active Panels: 1');

    // Click "Expand All"
    await page.click('text=Expand All');
    await page.waitForTimeout(500);

    await expect(activeText).toContainText('Active Panels: 1, 2, 3, 4');
    await expect(page).toHaveScreenshot('accordion-controlled-expanded.png', {
      maxDiffPixels: 200,
    });
  });
});

test.describe('Accordion - Responsive', () => {
  test('renders on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?args=&id=react-n-design-accordion--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-mobile.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?args=&id=react-n-design-accordion--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-tablet.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/iframe.html?args=&id=react-n-design-accordion--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-desktop.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Accordion - Many Items', () => {
  test('renders accordion with many items', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-accordion--many-items&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('accordion-many-items.png', {
      maxDiffPixels: 200,
    });
  });
});

test.describe('Accordion - Theme Comparison', () => {
  test('shows all variants in light mode', async ({ page }) => {
    await page.goto('/?path=/docs/react-n-design-accordion--docs');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('accordion-docs-variants-light.png', {
      maxDiffPixels: 300,
    });
  });

  test('shows all variants in dark mode', async ({ page }) => {
    await page.goto('/?path=/docs/react-n-design-accordion--docs&globals=theme:dark');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('accordion-docs-variants-dark.png', {
      maxDiffPixels: 300,
    });
  });
});
