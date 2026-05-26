import { expect, test } from '@playwright/test';
import type { StoryID } from './storyTypes';

/**
 * VRT Tests for Collapsible component
 *
 * These tests capture visual snapshots of the Collapsible component in various states
 * to detect unintended visual regressions.
 */

const component = 'Collapsible';

test.describe('Collapsible Visual Regression', () => {
  // Test basic collapsed state
  test('renders correctly in collapsed state', async ({ page }) => {
    await page.goto(`http://localhost:6006/?path=/story/react-n-design-${component}--default`);
    // Wait for the story to render
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`${component}-collapsed.png`);
  });

  // Test expanded state
  test('renders correctly in expanded state', async ({ page }) => {
    await page.goto(`http://localhost:6006/?path=/story/react-n-design-${component}--initially-open`);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`${component}-expanded.png`);
  });

  // Test disabled state
  test('renders correctly when disabled', async ({ page }) => {
    await page.goto(`http://localhost:6006/?path=/story/react-n-design-${component}--disabled`);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`${component}-disabled.png`);
  });

  // Test nested collapsibles
  test('renders nested collapsibles correctly', async ({ page }) => {
    await page.goto(`http://localhost:6006/?path=/story/react-n-design-${component}--nested`);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`${component}-nested.png`);
  });

  // Test with rich content
  test('renders rich content correctly', async ({ page }) => {
    await page.goto(`http://localhost:6006/?path=/story/react-n-design-${component}--with-rich-content`);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`${component}-rich-content.png`);
  });

  // Test interaction: expanding animation
  test('animates correctly when expanded', async ({ page }) => {
    await page.goto(`http://localhost:6006/?path=/story/react-n-design-${component}--default`);
    await page.waitForTimeout(500);

    const trigger = await page.locator('button[aria-expanded="false"]').first();
    await trigger.click();
    await page.waitForTimeout(350); // Wait for animation
    await expect(page).toHaveScreenshot(`${component}-expanded-animation.png`);
  });

  // Test custom trigger
  test('renders custom trigger correctly', async ({ page }) => {
    await page.goto(`http://localhost:6006/?path=/story/react-n-design-${component}--with-custom-trigger`);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(`${component}-custom-trigger.png`);
  });
});
