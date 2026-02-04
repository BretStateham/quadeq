import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
	test('meets WCAG 2.1 AA on initial load', async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('figure');

		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('meets WCAG 2.1 AA with derivation expanded', async ({ page }) => {
		await page.goto('/');
		await page.locator('summary').click();
		await page.waitForTimeout(100);

		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('meets WCAG 2.1 AA with validation error', async ({ page }) => {
		await page.goto('/');
		await page.locator('input[type="number"]').first().fill('0');
		await page.locator('input[type="number"]').first().dispatchEvent('input');
		await page.waitForSelector('[role="alert"]');

		const results = await new AxeBuilder({ page })
			.withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
			.analyze();

		expect(results.violations).toEqual([]);
	});

	test('live region announces changes', async ({ page }) => {
		await page.goto('/');

		const liveRegion = page.locator('[role="status"]');
		await expect(liveRegion).toHaveAttribute('aria-live', 'polite');
	});

	test('graph has accessible description', async ({ page }) => {
		await page.goto('/');

		const graph = page.locator('[role="img"]');
		await expect(graph).toHaveAttribute('aria-describedby', 'graph-description');

		const description = page.locator('#graph-description');
		await expect(description).toContainText('Parabola');
		await expect(description).toContainText('vertex');
	});
});
