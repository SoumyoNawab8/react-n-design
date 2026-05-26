import { test } from '@playwright/test';

/**
 * Visual Regression Tests Suite
 *
 * This file imports all visual regression tests to run them together.
 * Individual test files are in ./visual/ directory.
 */

// Import all visual test modules
// These will run in parallel by default

test.describe('Visual Regression Test Suite', () => {
  test('Visual tests suite configured', async () => {
    // This is a placeholder to ensure the suite is discoverable
    // All actual tests are in separate files
    test.skip(true, 'Tests are in e2e/visual/ directory');
  });
});

// Re-export all test modules for running as a suite
// Uncomment to run specific tests:
// import './visual/button.spec';
// import './visual/input.spec';
// import './visual/modal.spec';
// import './visual/card.spec';
// import './visual/alert.spec';
// import './visual/form-validation.spec';
// import './visual/theme-tokens.spec';
