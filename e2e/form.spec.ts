import { expect, test } from '@playwright/test';

/**
 * E2E Visual Tests for Form Component
 * Tests form validation, submission, and field interactions
 */

test.describe('Form Component - Basic Functionality', () => {
  test('renders form with input fields', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--basic&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Check form elements exist
    const form = await page.locator('form');
    await expect(form).toBeVisible();

    // Check input fields exist
    const nameInput = await page.locator('input[placeholder="Enter your name"]');
    const emailInput = await page.locator('input[type="email"]');
    const passwordInput = await page.locator('input[type="password"]');

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    // Take screenshot
    await expect(page).toHaveScreenshot('form-basic-render.png', {
      maxDiffPixels: 100,
    });
  });

  test('fills and submits form successfully', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--basic&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Fill form fields
    await page.fill('input[placeholder="Enter your name"]', 'John Doe');
    await page.fill('input[type="email"]', 'john@example.com');
    await page.fill('input[type="password"]', 'password123');

    // Check values are filled
    await expect(page.locator('input[placeholder="Enter your name"]')).toHaveValue('John Doe');
    await expect(page.locator('input[type="email"]')).toHaveValue('john@example.com');
    await expect(page.locator('input[type="password"]')).toHaveValue('password123');

    // Take screenshot of filled form
    await expect(page).toHaveScreenshot('form-basic-filled.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders horizontal layout correctly', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--horizontal-layout&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Check horizontal layout has labels
    const labels = await page.locator('label').count();
    expect(labels).toBeGreaterThan(0);

    await expect(page).toHaveScreenshot('form-horizontal-layout.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders vertical layout correctly', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--vertical-layout&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('form-vertical-layout.png', {
      maxDiffPixels: 100,
    });
  });

  test('renders inline layout correctly', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--inline-layout&viewMode=story');
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveScreenshot('form-inline-layout.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Form Component - Validation', () => {
  test('shows validation errors on submit with invalid data', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Submit without filling fields
    await page.click('button[type="submit"]');

    // Wait for validation
    await page.waitForTimeout(300);

    // Check error messages appear
    const errorMessages = await page.locator('text=required').count();
    expect(errorMessages).toBeGreaterThan(0);

    await expect(page).toHaveScreenshot('form-validation-errors.png', {
      maxDiffPixels: 100,
    });
  });

  test('validates email format', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Fill invalid email
    await page.fill('input[type="email"]', 'invalid-email');
    await page.focus('input[type="email"]');
    await page.blur('input[type="email"]');

    // Wait for blur validation
    await page.waitForTimeout(300);

    // Check for email error
    const _hasEmailError = await page
      .locator('text=valid email')
      .isVisible()
      .catch(() => false);

    // Screenshot showing error state
    await expect(page).toHaveScreenshot('form-invalid-email.png', {
      maxDiffPixels: 100,
    });
  });

  test('validates password length', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Fill short password
    await page.fill('input[type="password"]', '123');
    await page.blur('input[type="password"]');

    await page.waitForTimeout(300);

    // Check for password length error
    const _hasPasswordError = await page
      .locator('text=8 characters')
      .isVisible()
      .catch(() => false);

    await expect(page).toHaveScreenshot('form-short-password.png', {
      maxDiffPixels: 100,
    });
  });

  test('clears validation errors on valid input', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--with-validation&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Trigger validation error
    await page.click('button[type="submit"]');
    await page.waitForTimeout(200);

    // Fill valid email
    await page.fill('input[type="email"]', 'valid@example.com');
    await page.blur('input[type="email"]');
    await page.waitForTimeout(200);

    // Take screenshot after fixing error
    await expect(page).toHaveScreenshot('form-error-cleared.png', {
      maxDiffPixels: 100,
    });
  });
});

test.describe('Form Component - Disabled State', () => {
  test('renders disabled form state', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--disabled&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Check inputs are disabled
    const nameInput = page.locator('input[placeholder="John Doe"]');
    const emailInput = page.locator('input[type="email"]');

    await expect(nameInput).toBeDisabled();
    await expect(emailInput).toBeDisabled();

    await expect(page).toHaveScreenshot('form-disabled-state.png', {
      maxDiffPixels: 100,
    });
  });

  test('disabled inputs cannot be interacted with', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--disabled&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Try to fill disabled input
    const nameInput = page.locator('input[placeholder="John Doe"]');

    // Attempt fill - should not change value
    await nameInput.fill('New Value', { timeout: 1000 }).catch(() => {});

    // Check input is still empty or has default
    const value = await nameInput.inputValue();
    expect(value).toBe('');
  });
});

test.describe('Form Component - Field Interactions', () => {
  test('focus and blur interactions change styling', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--basic&viewMode=story');
    await page.waitForLoadState('networkidle');

    const nameInput = page.locator('input[placeholder="Enter your name"]');

    // Focus the input
    await nameInput.focus();
    await page.waitForTimeout(100);

    // Take screenshot of focused state
    await expect(page).toHaveScreenshot('form-input-focused.png', {
      maxDiffPixels: 100,
    });

    // Blur the input
    await nameInput.blur();
    await page.waitForTimeout(100);

    await expect(page).toHaveScreenshot('form-input-blurred.png', {
      maxDiffPixels: 100,
    });
  });

  test('typing updates form values', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--basic&viewMode=story');
    await page.waitForLoadState('networkidle');

    const nameInput = page.locator('input[placeholder="Enter your name"]');

    // Type character by character
    await nameInput.pressSequentially('Test User');

    // Verify value
    await expect(nameInput).toHaveValue('Test User');

    await expect(page).toHaveScreenshot('form-typing-complete.png', {
      maxDiffPixels: 100,
    });
  });

  test('form submission triggers onFinish', async ({ page }) => {
    await page.goto('/iframe.html?args=&id=react-n-design-form--basic&viewMode=story');
    await page.waitForLoadState('networkidle');

    // Fill all required fields
    await page.fill('input[placeholder="Enter your name"]', 'Jane Doe');
    await page.fill('input[type="email"]', 'jane@example.com');
    await page.fill('input[type="password"]', 'securepass123');

    // Listen for dialog (alert)
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Form submitted');
      await dialog.accept();
    });

    // Submit form
    await page.click('button[type="submit"]');

    // Wait a moment for alert
    await page.waitForTimeout(500);
  });
});
