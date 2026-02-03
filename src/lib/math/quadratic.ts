import type { Coefficients, Point, QuadraticSolution, SolutionSteps } from './types';

const EPSILON = 1e-10;

export function isEffectivelyZero(value: number): boolean {
  return Math.abs(value) < EPSILON;
}

export function roundForDisplay(value: number, decimals: number = 4): string {
  if (isEffectivelyZero(value)) return '0';
  const rounded = Number(value.toFixed(decimals));
  return rounded.toString();
}

export function solveQuadratic(coefficients: Coefficients): QuadraticSolution {
  const { a, b, c } = coefficients;

  if (a === 0) {
    throw new Error('Coefficient a cannot be zero for a quadratic equation');
  }

  const discriminant = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;

  let xIntercepts: Point[] | null = null;

  if (discriminant > 0) {
    const sqrtD = Math.sqrt(discriminant);
    xIntercepts = [
      { x: (-b + sqrtD) / (2 * a), y: 0 },
      { x: (-b - sqrtD) / (2 * a), y: 0 }
    ];
  } else if (isEffectivelyZero(discriminant)) {
    xIntercepts = [{ x: -b / (2 * a), y: 0 }];
  }

  return {
    coefficients,
    vertex: { x: vertexX, y: vertexY },
    axisOfSymmetry: vertexX,
    yIntercept: { x: 0, y: c },
    xIntercepts,
    discriminant,
    opensUpward: a > 0,
    steps: generateSteps(coefficients, discriminant)
  };
}

function generateSteps(coef: Coefficients, discriminant: number): SolutionSteps {
  const { a, b, c } = coef;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;

  return {
    vertex: generateVertexSteps(a, b, c, vertexX, vertexY),
    yIntercept: generateYInterceptSteps(c),
    discriminant: generateDiscriminantSteps(a, b, c, discriminant),
    xIntercepts: generateXInterceptSteps(a, b, discriminant),
    quadraticFormula: generateQuadraticFormulaSteps(a, b, c, discriminant)
  };
}

function generateVertexSteps(
  a: number,
  b: number,
  c: number,
  x: number,
  y: number
): string[] {
  return [
    `\\text{Find the x-coordinate: } x = \\frac{-b}{2a}`,
    `x = \\frac{-(${b})}{2 \\times ${a}}`,
    `x = \\frac{${-b}}{${2 * a}}`,
    `x = ${roundForDisplay(x)}`,
    `\\text{Substitute } x \\text{ into } y = ax^2 + bx + c \\text{ to find y-coordinate}`,
    `y = ${a}(${roundForDisplay(x)})^2 + ${b}(${roundForDisplay(x)}) + ${c}`,
    `y = ${roundForDisplay(y)}`,
    `\\text{Vertex: } (${roundForDisplay(x)}, ${roundForDisplay(y)})`
  ];
}

function generateYInterceptSteps(c: number): string[] {
  return [
    `\\text{The y-intercept occurs where } x = 0`,
    `y = a(0)^2 + b(0) + c = c`,
    `y = ${c}`,
    `\\text{Y-intercept: } (0, ${c})`
  ];
}

function generateDiscriminantSteps(
  a: number,
  b: number,
  c: number,
  d: number
): string[] {
  const interpretation =
    d > 0
      ? `\\text{Since } D > 0 \\text{, there are two distinct real roots}`
      : isEffectivelyZero(d)
        ? `\\text{Since } D = 0 \\text{, there is exactly one real root}`
        : `\\text{Since } D < 0 \\text{, there are no real roots}`;

  return [
    `\\text{Calculate the discriminant: } D = b^2 - 4ac`,
    `D = (${b})^2 - 4(${a})(${c})`,
    `D = ${b * b} - ${4 * a * c}`,
    `D = ${roundForDisplay(d)}`,
    interpretation
  ];
}

function generateXInterceptSteps(a: number, b: number, d: number): string[] {
  if (d < 0) {
    return [`\\text{No real x-intercepts exist (discriminant is negative)}`];
  }

  if (isEffectivelyZero(d)) {
    const x = -b / (2 * a);
    return [
      `\\text{Since } D = 0 \\text{, there is one repeated root}`,
      `x = \\frac{-b}{2a} = ${roundForDisplay(x)}`,
      `\\text{X-intercept: } (${roundForDisplay(x)}, 0)`
    ];
  }

  const sqrtD = Math.sqrt(d);
  const x1 = (-b + sqrtD) / (2 * a);
  const x2 = (-b - sqrtD) / (2 * a);

  return [
    `\\text{Apply the quadratic formula: } x = \\frac{-b \\pm \\sqrt{D}}{2a}`,
    `x_1 = \\frac{${-b} + \\sqrt{${roundForDisplay(d)}}}{${2 * a}}`,
    `x_1 = ${roundForDisplay(x1)}`,
    `x_2 = \\frac{${-b} - \\sqrt{${roundForDisplay(d)}}}{${2 * a}}`,
    `x_2 = ${roundForDisplay(x2)}`,
    `\\text{X-intercepts: } (${roundForDisplay(x1)}, 0) \\text{ and } (${roundForDisplay(x2)}, 0)`
  ];
}

function generateQuadraticFormulaSteps(
  a: number,
  b: number,
  c: number,
  d: number
): string[] {
  return [
    `\\text{The quadratic formula: } x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`,
    `\\text{Substituting } a=${a}, b=${b}, c=${c}\\text{:}`,
    `x = \\frac{-(${b}) \\pm \\sqrt{(${b})^2 - 4(${a})(${c})}}{2(${a})}`,
    `x = \\frac{${-b} \\pm \\sqrt{${b * b} - ${4 * a * c}}}{${2 * a}}`,
    `x = \\frac{${-b} \\pm \\sqrt{${roundForDisplay(d)}}}{${2 * a}}`,
    d >= 0
      ? `x = \\frac{${-b} \\pm ${roundForDisplay(Math.sqrt(d))}}{${2 * a}}`
      : `\\text{No real solutions (negative discriminant)}`
  ];
}
