import { expect, test } from '@playwright/test';

test.describe('TimePicker Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--default');
  });

  test('default state matches snapshot', async ({ page }) => {
    const story = page
      .frameLocator('iframe[data-testid="storybook-preview-iframe"]')
      .locator('body');
    await story.waitFor();

    // Wait for the TimePicker to be rendered
    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-default.png');
  });

  test('12h format opens with AM/PM toggle', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--format-12h');

    const iframe = page.frameLocator('iframe[data-testid="storybook-preview-iframe"]');
    const story = iframe.locator('body');
    await story.waitFor();

    // Click to open the picker
    const combobox = iframe.locator('[role="combobox"]').first();
    await combobox.click();

    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-12h-open.png');
  });

  test('24h format opens without AM/PM', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--format-24h');

    const iframe = page.frameLocator('iframe[data-testid="storybook-preview-iframe"]');
    const story = iframe.locator('body');
    await story.waitFor();

    // Click to open the picker
    const combobox = iframe.locator('[role="combobox"]').first();
    await combobox.click();

    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-24h-open.png');
  });

  test('15-minute interval variant', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--interval-15-min');

    const iframe = page.frameLocator('iframe[data-testid="storybook-preview-iframe"]');
    const story = iframe.locator('body');
    await story.waitFor();

    // Click to open the picker
    const combobox = iframe.locator('[role="combobox"]').first();
    await combobox.click();

    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-15min-interval.png');
  });

  test('restricted hours variant', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--restricted-hours');

    const iframe = page.frameLocator('iframe[data-testid="storybook-preview-iframe"]');
    const story = iframe.locator('body');
    await story.waitFor();

    // Click to open the picker
    const combobox = iframe.locator('[role="combobox"]').first();
    await combobox.click();

    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-restricted-hours.png');
  });

  test('disabled state', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--disabled');

    const story = page
      .frameLocator('iframe[data-testid="storybook-preview-iframe"]')
      .locator('body');
    await story.waitFor();

    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-disabled.png');
  });

  test('with error state', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--with-error');

    const story = page
      .frameLocator('iframe[data-testid="storybook-preview-iframe"]')
      .locator('body');
    await story.waitFor();

    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-error.png');
  });

  test('different sizes', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--size-small');

    const iframe = page.frameLocator('iframe[data-testid="storybook-preview-iframe"]');
    const story = iframe.locator('body');
    await story.waitFor();

    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-size-small.png');
  });

  test('large size variant', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--size-large');

    const iframe = page.frameLocator('iframe[data-testid="storybook-preview-iframe"]');
    const story = iframe.locator('body');
    await story.waitFor();

    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-size-large.png');
  });

  test('full width variant', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--full-width');

    const iframe = page.frameLocator('iframe[data-testid="storybook-preview-iframe"]');
    const story = iframe.locator('body');
    await story.waitFor();

    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-full-width.png');
  });

  test('with default value', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--with-default-value');

    const iframe = page.frameLocator('iframe[data-testid="storybook-preview-iframe"]');
    const story = iframe.locator('body');
    await story.waitFor();

    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-with-value.png');
  });

  test('without clear button', async ({ page }) => {
    await page.goto('/?path=/story/react-n-design-timepicker--without-clear');

    const iframe = page.frameLocator('iframe[data-testid="storybook-preview-iframe"]');
    const story = iframe.locator('body');
    await story.waitFor();

    await page.waitForTimeout(500);

    expect(await story.screenshot()).toMatchSnapshot('timepicker-no-clear.png');
  });
});
