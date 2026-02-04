import type { QuadraticResult } from './types';

export function calculateQuadratic(a: number, b: number, c: number): QuadraticResult {
	if (a === 0) throw new Error('Coefficient a must be non-zero');

	const discriminant = b * b - 4 * a * c;
	const vertexX = -b / (2 * a);
	const vertexY = a * vertexX * vertexX + b * vertexX + c;

	let roots: number[] | null = null;
	let rootType: 'two-real' | 'one-repeated' | 'complex';

	if (discriminant > 0) {
		const sqrtD = Math.sqrt(discriminant);
		roots = [(-b - sqrtD) / (2 * a), (-b + sqrtD) / (2 * a)];
		rootType = 'two-real';
	} else if (discriminant === 0) {
		roots = [vertexX];
		rootType = 'one-repeated';
	} else {
		rootType = 'complex';
	}

	return {
		discriminant,
		vertex: { x: vertexX, y: vertexY },
		yIntercept: c,
		roots,
		rootType
	};
}
