import { test, expect, type Page } from '@playwright/test';

/**
 * Overflow detection tests
 * Verifies that content never causes unwanted horizontal scrolling
 * and that elements stay within viewport bounds.
 */

async function getPageOverflow(page: Page): Promise<{
	hasHorizontalScroll: boolean;
	documentWidth: number;
	viewportWidth: number;
	overflowAmount: number;
}> {
	return page.evaluate(() => {
		const viewportWidth = window.innerWidth;
		const documentWidth = document.documentElement.scrollWidth;
		const hasHorizontalScroll = documentWidth > viewportWidth;
		return {
			hasHorizontalScroll,
			documentWidth,
			viewportWidth,
			overflowAmount: documentWidth - viewportWidth
		};
	});
}

async function getOverflowingElements(
	page: Page
): Promise<Array<{ selector: string; width: number; overflowAmount: number }>> {
	return page.evaluate(() => {
		const viewportWidth = window.innerWidth;
		const overflowing: Array<{ selector: string; width: number; overflowAmount: number }> = [];

		// Check all elements for overflow
		const allElements = document.querySelectorAll('*');
		allElements.forEach((el) => {
			const rect = el.getBoundingClientRect();
			if (rect.right > viewportWidth + 1) {
				// 1px tolerance for rounding
				const selector =
					el.tagName.toLowerCase() +
					(el.id ? `#${el.id}` : '') +
					(el.className && typeof el.className === 'string'
						? `.${el.className.split(' ').join('.')}`
						: '');
				overflowing.push({
					selector: selector.substring(0, 100),
					width: rect.width,
					overflowAmount: rect.right - viewportWidth
				});
			}
		});
		return overflowing;
	});
}

test.describe('Horizontal Overflow Detection', () => {
	test('no horizontal scroll on initial page load', async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('figure');

		const overflow = await getPageOverflow(page);

		expect(overflow.hasHorizontalScroll, `Page has horizontal scroll: ${overflow.overflowAmount}px overflow`).toBe(
			false
		);
	});

	test('no horizontal scroll with derivation steps expanded', async ({ page }) => {
		await page.goto('/');
		await page.locator('summary').click();
		await page.waitForTimeout(100);

		const overflow = await getPageOverflow(page);

		expect(
			overflow.hasHorizontalScroll,
			`Derivation causes ${overflow.overflowAmount}px horizontal overflow`
		).toBe(false);
	});

	test('no horizontal scroll with large coefficient values', async ({ page }) => {
		await page.goto('/');

		// Use large coefficients that create longer formulas
		const inputA = page.locator('input[type="number"]').nth(0);
		const inputB = page.locator('input[type="number"]').nth(1);
		const inputC = page.locator('input[type="number"]').nth(2);

		await inputA.fill('999');
		await inputB.fill('-888');
		await inputC.fill('777');
		await inputC.dispatchEvent('input');

		await page.waitForTimeout(100);

		const overflow = await getPageOverflow(page);

		expect(
			overflow.hasHorizontalScroll,
			`Large coefficients cause ${overflow.overflowAmount}px horizontal overflow`
		).toBe(false);
	});

	test('no horizontal scroll with large coefficients and derivation expanded', async ({ page }) => {
		await page.goto('/');

		const inputA = page.locator('input[type="number"]').nth(0);
		const inputB = page.locator('input[type="number"]').nth(1);
		const inputC = page.locator('input[type="number"]').nth(2);

		await inputA.fill('12345');
		await inputB.fill('-98765');
		await inputC.fill('54321');
		await inputC.dispatchEvent('input');

		await page.locator('summary').click();
		await page.waitForTimeout(100);

		const overflow = await getPageOverflow(page);

		if (overflow.hasHorizontalScroll) {
			const overflowingElements = await getOverflowingElements(page);
			console.log('Overflowing elements:', JSON.stringify(overflowingElements, null, 2));
		}

		expect(
			overflow.hasHorizontalScroll,
			`Large coefficients with derivation cause ${overflow.overflowAmount}px horizontal overflow`
		).toBe(false);
	});

	test('equation display elements stay within viewport', async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('.equation-display');

		const viewportWidth = await page.evaluate(() => window.innerWidth);

		const mathElements = page.locator('[role="math"]');
		const count = await mathElements.count();

		for (let i = 0; i < count; i++) {
			const element = mathElements.nth(i);
			const box = await element.boundingBox();

			expect(box).not.toBeNull();
			if (box) {
				expect(
					box.x + box.width,
					`Math element ${i + 1} exceeds viewport (right edge: ${box.x + box.width}px, viewport: ${viewportWidth}px)`
				).toBeLessThanOrEqual(viewportWidth + 1);
			}
		}
	});

	test('derivation steps stay within viewport when expanded', async ({ page }) => {
		await page.goto('/');
		await page.locator('summary').click();
		await page.waitForTimeout(100);

		const viewportWidth = await page.evaluate(() => window.innerWidth);

		const derivationSteps = page.locator('.derivation-steps li');
		const count = await derivationSteps.count();

		for (let i = 0; i < count; i++) {
			const step = derivationSteps.nth(i);
			const mathElement = step.locator('[role="math"]');
			const box = await mathElement.boundingBox();

			expect(box).not.toBeNull();
			if (box) {
				expect(
					box.x + box.width,
					`Derivation step ${i + 1} exceeds viewport (right edge: ${box.x + box.width}px, viewport: ${viewportWidth}px)`
				).toBeLessThanOrEqual(viewportWidth + 1);
			}
		}
	});

	test('graph container stays within viewport', async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('figure');

		const viewportWidth = await page.evaluate(() => window.innerWidth);
		const figure = page.locator('figure');
		const box = await figure.boundingBox();

		expect(box).not.toBeNull();
		if (box) {
			expect(
				box.x + box.width,
				`Graph figure exceeds viewport width`
			).toBeLessThanOrEqual(viewportWidth + 1);
		}
	});
});

test.describe('Body overflow-x behavior', () => {
	test('body does not have visible horizontal scrollbar', async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('figure');

		// Check if body has horizontal scrollbar
		const hasScrollbar = await page.evaluate(() => {
			return document.body.scrollWidth > document.body.clientWidth;
		});

		expect(hasScrollbar, 'Body has horizontal scrollbar').toBe(false);
	});

	test('html element does not have visible horizontal scrollbar', async ({ page }) => {
		await page.goto('/');
		await page.waitForSelector('figure');

		const hasScrollbar = await page.evaluate(() => {
			const html = document.documentElement;
			return html.scrollWidth > html.clientWidth;
		});

		expect(hasScrollbar, 'HTML element has horizontal scrollbar').toBe(false);
	});
});
