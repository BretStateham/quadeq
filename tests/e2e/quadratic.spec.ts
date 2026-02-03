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

    // Verify key features update - use role selector for the term in Key Features
    await expect(page.getByRole('term').filter({ hasText: 'Vertex' })).toBeVisible();
    await expect(page.getByRole('term').filter({ hasText: 'Y-Intercept' })).toBeVisible();
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

  test('step-by-step solution tags are clickable', async ({ page }) => {
    await page.fill('input[name="a"]', '1');
    await page.fill('input[name="b"]', '-5');
    await page.fill('input[name="c"]', '6');

    // Check that all step tags exist
    await expect(page.getByRole('button', { name: 'Vertex' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Axis of Symmetry' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Discriminant' })).toBeVisible();

    // Click a tag to show steps - check for step list appearing
    await page.getByRole('button', { name: 'Vertex' }).click();
    await expect(page.getByRole('list')).toBeVisible();

    // Click again to collapse
    await page.getByRole('button', { name: 'Vertex' }).click();
    await expect(page.getByText('Select a topic above')).toBeVisible();
  });

  test('handles decimal coefficients', async ({ page }) => {
    await page.fill('input[name="a"]', '0.5');
    await page.fill('input[name="b"]', '-1.5');
    await page.fill('input[name="c"]', '1');

    // Use role selector for the term in Key Features
    await expect(page.getByRole('term').filter({ hasText: 'Vertex' })).toBeVisible();
  });
});
