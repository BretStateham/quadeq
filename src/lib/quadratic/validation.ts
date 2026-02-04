import type { CoefficientInput } from './types';

export interface ValidationResult {
	valid: boolean;
	errors: string[];
}

export function validateCoefficients(input: CoefficientInput): ValidationResult {
	const errors: string[] = [];
	if (input.a === 0) errors.push('Coefficient a must be non-zero');
	if (!Number.isFinite(input.a)) errors.push('Coefficient a must be a finite number');
	if (!Number.isFinite(input.b)) errors.push('Coefficient b must be a finite number');
	if (!Number.isFinite(input.c)) errors.push('Coefficient c must be a finite number');
	return { valid: errors.length === 0, errors };
}
