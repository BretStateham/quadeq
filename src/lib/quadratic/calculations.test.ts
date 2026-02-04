import { describe, it, expect } from 'vitest';
import { calculateQuadratic } from './calculations';

describe('calculateQuadratic', () => {
	it('calculates two real roots for positive discriminant', () => {
		// x² - 5x + 6 = 0 has roots at x = 2 and x = 3
		const result = calculateQuadratic(1, -5, 6);
		expect(result.rootType).toBe('two-real');
		expect(result.roots).toContain(2);
		expect(result.roots).toContain(3);
	});

	it('calculates one repeated root for zero discriminant', () => {
		// x² - 4x + 4 = 0 has root at x = 2
		const result = calculateQuadratic(1, -4, 4);
		expect(result.rootType).toBe('one-repeated');
		expect(result.roots).toEqual([2]);
	});

	it('returns complex root type for negative discriminant', () => {
		// x² + 1 = 0 has no real roots
		const result = calculateQuadratic(1, 0, 1);
		expect(result.rootType).toBe('complex');
		expect(result.roots).toBeNull();
	});

	it('calculates vertex correctly', () => {
		// y = x² - 2x + 1 has vertex at (1, 0)
		const result = calculateQuadratic(1, -2, 1);
		expect(result.vertex.x).toBe(1);
		expect(result.vertex.y).toBeCloseTo(0);
	});

	it('throws error when a is zero', () => {
		expect(() => calculateQuadratic(0, 1, 1)).toThrow('Coefficient a must be non-zero');
	});

	it('calculates y-intercept correctly', () => {
		const result = calculateQuadratic(1, 2, 5);
		expect(result.yIntercept).toBe(5);
	});

	it('calculates discriminant correctly', () => {
		// For x² - 5x + 6: discriminant = 25 - 24 = 1
		const result = calculateQuadratic(1, -5, 6);
		expect(result.discriminant).toBe(1);
	});

	it('handles negative a coefficient', () => {
		// -x² + 4 = 0 has roots at x = ±2
		const result = calculateQuadratic(-1, 0, 4);
		expect(result.rootType).toBe('two-real');
		expect(result.roots?.sort()).toEqual([-2, 2]);
		expect(result.vertex.y).toBe(4);
	});
});
