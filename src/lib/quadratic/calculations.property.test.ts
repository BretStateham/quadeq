import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { calculateQuadratic } from './calculations';

// fast-check requires 32-bit floats for min/max constraints
const floatA = () => fc.float({ min: Math.fround(0.1), max: Math.fround(100), noNaN: true });
const floatBC = () => fc.float({ min: Math.fround(-100), max: Math.fround(100), noNaN: true });

describe('quadratic properties', () => {
	it('roots satisfy the equation ax² + bx + c = 0', () => {
		fc.assert(
			fc.property(floatA(), floatBC(), floatBC(), (a, b, c) => {
				const result = calculateQuadratic(a, b, c);
				if (result.roots) {
					result.roots.forEach((root) => {
						const value = a * root * root + b * root + c;
						expect(Math.abs(value)).toBeLessThan(1e-6);
					});
				}
			})
		);
	});

	it('vertex y-coordinate equals f(vertex.x)', () => {
		fc.assert(
			fc.property(floatA(), floatBC(), floatBC(), (a, b, c) => {
				const result = calculateQuadratic(a, b, c);
				const expectedY = a * result.vertex.x * result.vertex.x + b * result.vertex.x + c;
				expect(result.vertex.y).toBeCloseTo(expectedY, 6);
			})
		);
	});

	it('discriminant sign determines root type', () => {
		fc.assert(
			fc.property(floatA(), floatBC(), floatBC(), (a, b, c) => {
				const result = calculateQuadratic(a, b, c);
				if (result.discriminant > 0) {
					expect(result.rootType).toBe('two-real');
				} else if (result.discriminant === 0) {
					expect(result.rootType).toBe('one-repeated');
				} else {
					expect(result.rootType).toBe('complex');
				}
			})
		);
	});

	it('vertex x equals -b/(2a)', () => {
		fc.assert(
			fc.property(floatA(), floatBC(), floatBC(), (a, b, c) => {
				const result = calculateQuadratic(a, b, c);
				expect(result.vertex.x).toBeCloseTo(-b / (2 * a), 6);
			})
		);
	});

	it('y-intercept equals c', () => {
		fc.assert(
			fc.property(floatA(), floatBC(), floatBC(), (a, b, c) => {
				const result = calculateQuadratic(a, b, c);
				expect(result.yIntercept).toBe(c);
			})
		);
	});
});
