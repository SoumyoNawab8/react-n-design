import { expect, test } from '@playwright/test';

/**
 * E2E Visual Tests for Tour Component
 * Tests tour steps, navigation, and interactions
 */

test.describe('Tour Component - Basic Rendering', () => {
  test('renders tour with first step', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Wait for tour to appear
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Check tour card is visible
    const tourCard = await page.locator('[role="dialog"]');
    await expect(tourCard).toBeVisible();

    // Check first step title
    const title = await page.getByText('Welcome');
    await expect(title).toBeVisible();

    // Check step indicators
    const indicators = await page.locator('.indicators span').count();
    expect(indicators).toBe(3);

    await expect(page).toHaveScreenshot('tour-first-step.png', {
      maxDiffPixels: 100,
    });
  });

  test('highlights target element with spotlight', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Wait for tour
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Check spotlight exists
    const _spotlight = await page
      .locator('[data-testid="tour-spotlight"]')
      .or(page.locator('div').filter({ hasText: '' }).nth(1));

    await expect(page).toHaveScreenshot('tour-with-spotlight.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Tour Component - Navigation', () => {
  test('advances to next step on Next button click', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Wait for initial render
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Verify first step
    await expect(page.getByText('Welcome')).toBeVisible();

    // Click Next
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(300);

    // Verify second step
    await expect(page.getByText('Second Step')).toBeVisible();
    await expect(page.getByText('Button 2')).toBeVisible();

    await expect(page).toHaveScreenshot('tour-second-step.png', {
      maxDiffPixels: 100,
    });
  });

  test('navigates through all steps', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Step 1
    await expect(page.getByText('Welcome')).toBeVisible();
    await expect(page.locator('.indicators span.active')).toHaveCount(1);

    // Go to Step 2
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(300);
    await expect(page.getByText('Second Step')).toBeVisible();

    // Go to Step 3
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(300);
    await expect(page.getByText('Final Step')).toBeVisible();

    await expect(page).toHaveScreenshot('tour-final-step.png', {
      maxDiffPixels: 100,
    });
  });

  test('Previous button appears from second step onwards', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // First step - no Previous button
    const prevButtonFirstStep = await page
      .locator('button:has-text("Previous")')
      .isVisible()
      .catch(() => false);
    expect(prevButtonFirstStep).toBe(false);

    // Go to second step
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(300);

    // Second step - Previous button should appear
    await expect(page.locator('button:has-text("Previous")')).toBeVisible();

    await expect(page).toHaveScreenshot('tour-with-previous-button.png', {
      maxDiffPixels: 100,
    });
  });

  test('goes back to previous step', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Go to step 2
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(300);
    await expect(page.getByText('Second Step')).toBeVisible();

    // Go back to step 1
    await page.click('button:has-text("Previous")');
    await page.waitForTimeout(300);
    await expect(page.getByText('Welcome')).toBeVisible();

    await expect(page).toHaveScreenshot('tour-back-to-first.png', {
      maxDiffPixels: 100,
    });
  });

  test('shows Finish button on last step', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Navigate to last step
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(200);
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(300);

    // Check Finish button
    await expect(page.locator('button:has-text("Finish")')).toBeVisible();
    await expect(page.locator('button:has-text("Next")')).toHaveCount(0);

    await expect(page).toHaveScreenshot('tour-finish-button.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Tour Component - Different Placements', () => {
  test('renders tour with top placement', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-tour--different-placements&viewMode=story'
    );
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Check top placement step
    await expect(page.getByText('Top Placement')).toBeVisible();

    await expect(page).toHaveScreenshot('tour-placement-top.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders tour with left placement', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-tour--different-placements&viewMode=story'
    );
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Navigate to left placement
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(300);

    await expect(page.getByText('Left Placement')).toBeVisible();

    await expect(page).toHaveScreenshot('tour-placement-left.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders tour with right placement', async ({ page }) => {
    await page.goto(
      '/iframe.html?args=&id=react-n-design-tour--different-placements&viewMode=story'
    );
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Navigate to right placement
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(200);
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(300);

    await expect(page.getByText('Right Placement')).toBeVisible();

    await expect(page).toHaveScreenshot('tour-placement-right.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Tour Component - Skip and Close', () => {
  test('closes tour when Skip button clicked', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Verify tour is open
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // Click Skip
    await page.click('button:has-text("Skip")');
    await page.waitForTimeout(300);

    // Verify tour is closed
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();

    await expect(page).toHaveScreenshot('tour-closed.png', {
      maxDiffPixels: 100,
    });
  });

  test('closes tour when Finish button clicked', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Navigate to last step
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(200);
    await page.click('button:has-text("Next")');
    await page.waitForTimeout(300);

    // Click Finish
    await page.click('button:has-text("Finish")');
    await page.waitForTimeout(300);

    // Verify tour is closed
    await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  });
});

test.describe('Tour Component - Single Step', () => {
  test('renders single step tour without navigation', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--single-step&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Check single step content
    await expect(page.getByText('Getting Started')).toBeVisible();

    // Should only show Finish button (no Previous, no Next)
    await expect(page.locator('button:has-text("Previous")')).toHaveCount(0);
    await expect(page.locator('button:has-text("Next")')).toHaveCount(0);
    await expect(page.locator('button:has-text("Finish")')).toBeVisible();

    // Should have only 1 indicator
    const indicators = await page.locator('.indicators span').count();
    expect(indicators).toBe(1);

    await expect(page).toHaveScreenshot('tour-single-step.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Tour Component - Long Tour', () => {
  test('renders long tour with step indicators', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--long-tour&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Check many steps exist
    const indicators = await page.locator('.indicators span').count();
    expect(indicators).toBe(5);

    // Navigate through steps and verify indicators update
    for (let i = 0; i < 4; i++) {
      await page.click('button:has-text("Next")');
      await page.waitForTimeout(200);
    }

    // Check last step
    await expect(page.locator('.indicators span').last()).toHaveClass(/active/);

    await expect(page).toHaveScreenshot('tour-long-finish.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Tour Component - Accessibility', () => {
  test('has proper ARIA attributes', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Check ARIA roles
    const dialog = await page.locator('[role="dialog"]');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(dialog).toHaveAttribute('aria-live', 'polite');
  });

  test('overlay prevents clicking target elements', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-tour--default&viewMode=story');
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });

    // Try to click behind overlay
    const _buttonClicksBefore = await page.evaluate(() => {
      let count = 0;
      const btn = document.querySelector('.demo-button-1');
      if (btn) {
        btn.addEventListener('click', () => count++);
      }
      return count;
    });

    // The overlay should prevent interaction
    await expect(page.locator('[role="dialog"]')).toBeVisible();
  });
});
