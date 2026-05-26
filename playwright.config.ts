import { defineConfig, devices } from '@playwright/test';

/**
 * Enhanced Playwright configuration for react-n-design visual testing
 * @see https://playwright.dev/docs/test-configuration
 *
 * Supports visual regression testing across multiple viewports and themes
 */
export default defineConfig({
  testDir: './e2e',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use */
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'html',

  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'http://localhost:6006',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    /* Ensure consistent locale and timezone */
    locale: 'en-US',
    timezoneId: 'America/New_York',

    /* Consistent viewport size */
    viewport: { width: 1280, height: 720 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        /* Disable animations for consistent screenshots */
        launchOptions: {
          args: ['--force-color-profile=srgb'],
        },
      },
    },
    // Uncomment below to test on additional browsers
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // Mobile projects for responsive testing
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      grep: /@mobile|responsive/i,
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
      grep: /@mobile|responsive/i,
    },
  ],

  /* Run local dev server before starting the tests */
  webServer: {
    command: process.env.CI
      ? 'npm run build-storybook && npx serve storybook-static -p 6006'
      : 'npm run dev',
    url: 'http://localhost:6006',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },

  /* Snapshot configuration */
  snapshotDir: './e2e/__snapshots__',
  snapshotPathTemplate: '{testDir}/{testFileName}-snapshots/{arg}{ext}',

  /* Expect configuration for screenshots */
  expect: {
    timeout: 10000,
    toHaveScreenshot: {
      maxDiffPixels: 100,
      /* Threshold for pixel comparison */
      threshold: 0.2,
    },
  },

  /* Output directory for test artifacts */
  outputDir: './e2e/test-results',
});
