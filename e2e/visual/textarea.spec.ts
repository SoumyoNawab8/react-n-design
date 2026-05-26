import { expect, test } from '@playwright/test';

/**
 * Visual regression tests for TextArea component
 * Tests states: default, focused, error, disabled, auto-resize
 *
 * Stories: /iframe.html?id=react-n-design-textarea--default
 */

test.describe('TextArea - Default State', () => {
  test('renders default textarea - light mode', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--default&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('textarea-default-light.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders default textarea - dark mode', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--default&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot('textarea-default-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Labeled State', () => {
  test('renders textarea with label', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--with-label&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-with-label.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Focused State', () => {
  test('shows focused state styling', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--default&viewMode=story&globals=theme:light');
    await page.waitForLoadState('networkidle');

    await page.focus('textarea');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('textarea-focused.png', {
      maxDiffPixels: 100,
    });
  });

  test('shows focused state in dark mode', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--default&viewMode=story&globals=theme:dark');
    await page.waitForLoadState('networkidle');

    await page.focus('textarea');
    await page.waitForTimeout(300);

    await expect(page).toHaveScreenshot('textarea-focused-dark.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - With Helper Text', () => {
  test('renders textarea with helper text', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--with-helper-text&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-helper-text.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Character Counter', () => {
  test('renders textarea with character count', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--with-character-count&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-with-count.png', {
      maxDiffPixels: 100,
    });
  });

  test('shows near limit styling', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--near-limit&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-near-limit.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Error State', () => {
  test('renders textarea with error message', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--with-error&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-error.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Disabled State', () => {
  test('renders disabled textarea', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--disabled&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-disabled.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Read Only State', () => {
  test('renders read-only textarea', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--read-only&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-readonly.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Auto-Resize', () => {
  test('renders auto-resize textarea', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--auto-resize&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-autoresize.png', {
      maxDiffPixels: 100,
    });
  });

  test('shows auto-resize with content', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--auto-resize-with-content&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-autoresize-content.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Required State', () => {
  test('renders required field indicator', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--required&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-required.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Size Variations', () => {
  test('renders small size', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--small-size&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-small.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders large size', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--large-size&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-large.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Full Width', () => {
  test('renders full width textarea', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--full-width&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-fullwidth.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Responsive', () => {
  test('renders on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--with-character-count&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-mobile.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--with-character-count&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-tablet.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--with-character-count&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-desktop.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('TextArea - Contact Form Example', () => {
  test('renders complete form example', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-textarea--contact-form-example&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('textarea-form-example.png', {
      maxDiffPixels: 100,
    });
  });
});
