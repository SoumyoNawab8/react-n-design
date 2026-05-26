import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for Collapsible component
 * Tests all states: default, expanded, disabled, nested, rich content, themes, interactions
 */

test.describe('Collapsible - Default State', () => {
  test('renders collapsed collapsible - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-collapsible--default&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-default-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders collapsed collapsible - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-collapsible--default&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-default-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Collapsible - Expanded State', () => {
  test('renders expanded collapsible - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-collapsible--initially-open&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-expanded-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders expanded collapsible - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-collapsible--initially-open&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-expanded-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Collapsible - Disabled State', () => {
  test('renders disabled collapsible - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-collapsible--disabled&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-disabled-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders disabled collapsible - dark mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-collapsible--disabled&viewMode=story&globals=theme:dark'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-disabled-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Collapsible - Nested', () => {
  test('renders nested collapsibles - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-collapsible--nested&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-nested-light.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Collapsible - Rich Content', () => {
  test('renders collapsible with rich content - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-collapsible--with-rich-content&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-rich-content-light.png', {
      maxDiffPixels: 150,
    });
  });
});

test.describe('Collapsible - Custom Trigger', () => {
  test('renders collapsible with custom trigger - light mode', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-collapsible--with-custom-trigger&viewMode=story&globals=theme:light'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-custom-trigger-light.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Collapsible - Interactions', () => {
  test('collapsible expands on click', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-collapsible--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Click the trigger
    const trigger = page.locator('button[aria-expanded="false"]').first();
    await trigger.click();
    await page.waitForTimeout(350);

    await expect(page).toHaveScreenshot('collapsible-after-expand.png', {
      maxDiffPixels: 100,
    });
  });

  test('collapsible chevron rotates on expand', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-collapsible--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Click the trigger
    const trigger = page.locator('button[aria-expanded="false"]').first();
    await trigger.click();
    await page.waitForTimeout(400);

    await expect(page).toHaveScreenshot('collapsible-chevron-rotated.png', {
      maxDiffPixels: 50,
    });
  });

  test('collapsible collapses when clicked again', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-collapsible--initially-open&viewMode=story'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Click to collapse
    const trigger = page.locator('button[aria-expanded="true"]').first();
    await trigger.click();
    await page.waitForTimeout(350);

    await expect(page).toHaveScreenshot('collapsible-after-collapse.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Collapsible - Responsive', () => {
  test('renders on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?args=&id=react-n-design-collapsible--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-mobile.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?args=&id=react-n-design-collapsible--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-tablet.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/iframe.html?args=&id=react-n-design-collapsible--default&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-desktop.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Collapsible - Controlled Mode', () => {
  test('renders controlled collapsible', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-collapsible--controlled&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-controlled.png', {
      maxDiffPixels: 100,
    });
  });

  test('controlled collapsible toggles via external button', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-collapsible--controlled&viewMode=story');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    // Click the external "Open" button
    await page.click('text=Open via external button');
    await page.waitForTimeout(350);

    await expect(page).toHaveScreenshot('collapsible-controlled-open.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Collapsible - UnmountOnExit', () => {
  test('renders collapsible with unmountOnExit', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-collapsible--unmount-on-exit&viewMode=story'
    );
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('collapsible-unmount-on-exit.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Collapsible - Playground', () => {
  test('shows playground with all features', async ({ page }) => {
    await page.goto('/?path=/docs/react-n-design-collapsible--docs');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await expect(page).toHaveScreenshot('collapsible-playground.png', {
      maxDiffPixels: 300,
    });
  });
});
