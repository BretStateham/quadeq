import { describe, it, expect } from 'vitest';
import { solveQuadratic, isEffectivelyZero, roundForDisplay } from './quadratic';

describe('solveQuadratic', () => {
  it('calculates two real roots when discriminant > 0', () => {
    // x² - 5x + 6 = 0 has roots x = 2 and x = 3
    const result = solveQuadratic({ a: 1, b: -5, c: 6 });

    expect(result.discriminant).toBe(1);
    expect(result.xIntercepts).toHaveLength(2);
    expect(result.xIntercepts![0].x).toBe(3);
    expect(result.xIntercepts![1].x).toBe(2);
  });

  it('calculates one repeated root when discriminant = 0', () => {
    // x² - 4x + 4 = 0 has root x = 2
    const result = solveQuadratic({ a: 1, b: -4, c: 4 });

    expect(result.discriminant).toBe(0);
    expect(result.xIntercepts).toHaveLength(1);
    expect(result.xIntercepts![0].x).toBe(2);
  });

  it('returns null x-intercepts when discriminant < 0', () => {
    // x² + 1 = 0 has no real roots
    const result = solveQuadratic({ a: 1, b: 0, c: 1 });

    expect(result.discriminant).toBe(-4);
    expect(result.xIntercepts).toBeNull();
  });

  it('throws error when a = 0', () => {
    expect(() => solveQuadratic({ a: 0, b: 2, c: 1 })).toThrow(
      'Coefficient a cannot be zero'
    );
  });

  it('handles negative coefficients', () => {
    // -x² + 4x - 3 = 0 has roots x = 1 and x = 3
    const result = solveQuadratic({ a: -1, b: 4, c: -3 });

    expect(result.opensUpward).toBe(false);
    expect(result.xIntercepts).toHaveLength(2);
  });

  it('calculates vertex correctly', () => {
    // x² - 4x + 3: vertex at (2, -1)
    const result = solveQuadratic({ a: 1, b: -4, c: 3 });

    expect(result.vertex.x).toBe(2);
    expect(result.vertex.y).toBe(-1);
  });

  it('calculates y-intercept correctly', () => {
    const result = solveQuadratic({ a: 1, b: 2, c: 5 });
    expect(result.yIntercept).toEqual({ x: 0, y: 5 });
  });

  it('determines parabola direction correctly', () => {
    const upward = solveQuadratic({ a: 2, b: 0, c: 0 });
    const downward = solveQuadratic({ a: -2, b: 0, c: 0 });

    expect(upward.opensUpward).toBe(true);
    expect(downward.opensUpward).toBe(false);
  });

  it('generates steps for each calculation', () => {
    const result = solveQuadratic({ a: 1, b: -2, c: 1 });

    expect(result.steps.vertex.length).toBeGreaterThan(0);
    expect(result.steps.yIntercept.length).toBeGreaterThan(0);
    expect(result.steps.discriminant.length).toBeGreaterThan(0);
    expect(result.steps.xIntercepts.length).toBeGreaterThan(0);
    expect(result.steps.quadraticFormula.length).toBeGreaterThan(0);
  });

  it('handles decimal coefficients', () => {
    const result = solveQuadratic({ a: 0.5, b: -1.5, c: 1 });

    expect(result.vertex.x).toBe(1.5);
    expect(result.xIntercepts).toHaveLength(2);
  });
});

describe('isEffectivelyZero', () => {
  it('returns true for very small values', () => {
    expect(isEffectivelyZero(1e-11)).toBe(true);
    expect(isEffectivelyZero(-1e-11)).toBe(true);
  });

  it('returns false for larger values', () => {
    expect(isEffectivelyZero(0.001)).toBe(false);
    expect(isEffectivelyZero(-0.001)).toBe(false);
  });
});

describe('roundForDisplay', () => {
  it('rounds to specified decimals', () => {
    expect(roundForDisplay(3.14159, 2)).toBe('3.14');
  });

  it('returns 0 for effectively zero values', () => {
    expect(roundForDisplay(1e-12)).toBe('0');
  });
});
