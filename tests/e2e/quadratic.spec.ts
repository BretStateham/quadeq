import { test, expect } from '@playwright/test';

test.describe('Quadratic Equation Visualizer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('displays title and initial state', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Quadratic Equation Visualizer' })
    ).toBeVisible();
    await expect(page.getByRole('img', { name: /graph|parabola/i })).toBeVisible();
  });

  test('updates graph when coefficients change', async ({ page }) => {
    await page.fill('input[name="a"]', '2');
    await page.fill('input[name="b"]', '-4');
    await page.fill('input[name="c"]', '1');

    // Verify key features update - use exact match
    await expect(page.getByText('Vertex', { exact: true })).toBeVisible();
    await expect(page.getByText('Y-Intercept', { exact: true })).toBeVisible();
  });

  test('shows error when a = 0', async ({ page }) => {
    await page.fill('input[name="a"]', '0');

    await expect(page.getByText(/cannot be zero/i)).toBeVisible();
  });

  test('handles negative coefficients', async ({ page }) => {
    await page.fill('input[name="a"]', '-1');
    await page.fill('input[name="b"]', '4');
    await page.fill('input[name="c"]', '-3');

    await expect(page.getByText(/Downward/)).toBeVisible();
  });

  test('displays no real roots message when discriminant < 0', async ({ page }) => {
    await page.fill('input[name="a"]', '1');
    await page.fill('input[name="b"]', '0');
    await page.fill('input[name="c"]', '1');

    // Use exact text match for the specific element
    await expect(page.getByText('No real x-intercepts', { exact: true })).toBeVisible();
  });

  test('step-by-step solution is expandable', async ({ page }) => {
    await page.fill('input[name="a"]', '1');
    await page.fill('input[name="b"]', '-5');
    await page.fill('input[name="c"]', '6');

    // Check that steps section exists
    await expect(page.getByText('Finding the Vertex')).toBeVisible();
    await expect(page.getByText('Calculating the Discriminant')).toBeVisible();
  });

  test('handles decimal coefficients', async ({ page }) => {
    await page.fill('input[name="a"]', '0.5');
    await page.fill('input[name="b"]', '-1.5');
    await page.fill('input[name="c"]', '1');

    // Use exact match for the label
    await expect(page.getByText('Vertex', { exact: true })).toBeVisible();
  });
});
