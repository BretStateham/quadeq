import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('form inputs have labels', async ({ page }) => {
    await expect(page.locator('label[for="coef-a"]')).toBeVisible();
    await expect(page.locator('label[for="coef-b"]')).toBeVisible();
    await expect(page.locator('label[for="coef-c"]')).toBeVisible();
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="a"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="b"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('input[name="c"]')).toBeFocused();
  });

  test('error messages are associated with inputs', async ({ page }) => {
    await page.fill('input[name="a"]', '0');

    // Wait for error message to be visible first
    await expect(page.locator('#error-a')).toBeVisible();

    // Then verify aria attribute is set
    await expect(page.locator('input[name="a"]')).toHaveAttribute('aria-describedby', 'error-a');
  });

  test('graph has accessible label', async ({ page }) => {
    await page.fill('input[name="a"]', '1');
    await page.fill('input[name="b"]', '0');
    await page.fill('input[name="c"]', '0');

    const graphContainer = page.locator('.graph-container');
    await expect(graphContainer).toHaveAttribute('role', 'img');
    await expect(graphContainer).toHaveAttribute('aria-label', /parabola/i);
  });

  test('headings follow hierarchy', async ({ page }) => {
    const h1 = await page.locator('h1').count();
    expect(h1).toBe(1);

    // All sections should use h2
    const h2s = await page.locator('h2').count();
    expect(h2s).toBeGreaterThan(0);
  });
});
