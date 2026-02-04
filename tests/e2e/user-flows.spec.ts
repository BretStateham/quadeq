import { test, expect } from '@playwright/test';

test.describe('Coefficient manipulation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('page loads with default values', async ({ page }) => {
		await expect(page.locator('h1')).toContainText('Quadratic Equation Visualizer');
		await expect(page.locator('figure')).toBeVisible();
	});

	test('changing coefficient a updates the graph', async ({ page }) => {
		const inputA = page.locator('input[type="number"]').first();
		await inputA.fill('2');
		await inputA.dispatchEvent('input');

		const caption = page.locator('figcaption');
		await expect(caption).toContainText('upward');
	});

	test('negative a creates downward parabola', async ({ page }) => {
		const inputA = page.locator('input[type="number"]').first();
		await inputA.fill('-1');
		await inputA.dispatchEvent('input');

		const caption = page.locator('figcaption');
		await expect(caption).toContainText('downward');
	});

	test('derivation steps expand and collapse', async ({ page }) => {
		const details = page.locator('details');
		const summary = page.getByText('Show step-by-step derivation');

		await expect(details).not.toHaveAttribute('open');
		await summary.click();
		await expect(details).toHaveAttribute('open', '');
		await summary.click();
		await expect(details).not.toHaveAttribute('open');
	});

	test('validation error shown for a=0', async ({ page }) => {
		const inputA = page.locator('input[type="number"]').first();
		await inputA.fill('0');
		await inputA.dispatchEvent('input');

		const error = page.locator('[role="alert"]');
		await expect(error).toBeVisible();
		await expect(error).toContainText('non-zero');
	});

	test('equation display shows roots correctly', async ({ page }) => {
		// Default values a=1, b=0, c=-4 should show roots at x = -2 and 2
		const equationDisplay = page.locator('.equation-display');
		await expect(equationDisplay).toContainText('Roots: x = -2.00, 2.00');
	});

	test('keyboard navigation works on inputs', async ({ page }) => {
		const inputA = page.locator('input[type="number"]').first();
		await inputA.focus();
		await inputA.press('ArrowUp');

		await expect(inputA).toHaveValue('1.1');
	});
});
