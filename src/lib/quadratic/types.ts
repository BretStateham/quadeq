export interface QuadraticResult {
	discriminant: number;
	vertex: { x: number; y: number };
	yIntercept: number;
	roots: number[] | null;
	rootType: 'two-real' | 'one-repeated' | 'complex';
}

export interface CoefficientInput {
	a: number;
	b: number;
	c: number;
}
