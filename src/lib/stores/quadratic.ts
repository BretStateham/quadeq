import { writable, derived } from 'svelte/store';
import { solveQuadratic } from '$lib/math/quadratic';
import type { Coefficients, QuadraticSolution } from '$lib/math/types';

export const coefficients = writable<Coefficients>({ a: 1, b: 0, c: 0 });

export const solution = derived(coefficients, ($coefficients): QuadraticSolution | null => {
  try {
    if ($coefficients.a === 0) {
      return null;
    }
    return solveQuadratic($coefficients);
  } catch {
    return null;
  }
});

export const isValid = derived(coefficients, ($coefficients): boolean => {
  return $coefficients.a !== 0;
});

export const error = derived(coefficients, ($coefficients): string => {
  if ($coefficients.a === 0) {
    return 'Coefficient a cannot be zero for a quadratic equation';
  }
  return '';
});
