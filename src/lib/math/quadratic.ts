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
    'Find the x-coordinate: x = -b/(2a)',
    `x = -(${b})/(2 × ${a})`,
    `x = ${-b}/${2 * a}`,
    `x = ${roundForDisplay(x)}`,
    'Substitute x into y = ax² + bx + c to find y-coordinate',
    `y = ${a}(${roundForDisplay(x)})² + ${b}(${roundForDisplay(x)}) + ${c}`,
    `y = ${roundForDisplay(y)}`,
    `Vertex: (${roundForDisplay(x)}, ${roundForDisplay(y)})`
  ];
}

function generateYInterceptSteps(c: number): string[] {
  return [
    'The y-intercept occurs where x = 0',
    'y = a(0)² + b(0) + c = c',
    `y = ${c}`,
    `Y-intercept: (0, ${c})`
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
      ? 'Since D > 0, there are two distinct real roots'
      : isEffectivelyZero(d)
        ? 'Since D = 0, there is exactly one real root'
        : 'Since D < 0, there are no real roots';

  return [
    'Calculate the discriminant: D = b² - 4ac',
    `D = (${b})² - 4(${a})(${c})`,
    `D = ${b * b} - ${4 * a * c}`,
    `D = ${roundForDisplay(d)}`,
    interpretation
  ];
}

function generateXInterceptSteps(a: number, b: number, d: number): string[] {
  if (d < 0) {
    return ['No real x-intercepts exist (discriminant is negative)'];
  }

  if (isEffectivelyZero(d)) {
    const x = -b / (2 * a);
    return [
      'Since D = 0, there is one repeated root',
      `x = -b/(2a) = ${roundForDisplay(x)}`,
      `X-intercept: (${roundForDisplay(x)}, 0)`
    ];
  }

  const sqrtD = Math.sqrt(d);
  const x1 = (-b + sqrtD) / (2 * a);
  const x2 = (-b - sqrtD) / (2 * a);

  return [
    'Apply the quadratic formula: x = (-b ± √D) / (2a)',
    `x₁ = (${-b} + √${roundForDisplay(d)}) / ${2 * a}`,
    `x₁ = ${roundForDisplay(x1)}`,
    `x₂ = (${-b} - √${roundForDisplay(d)}) / ${2 * a}`,
    `x₂ = ${roundForDisplay(x2)}`,
    `X-intercepts: (${roundForDisplay(x1)}, 0) and (${roundForDisplay(x2)}, 0)`
  ];
}

function generateQuadraticFormulaSteps(
  a: number,
  b: number,
  c: number,
  d: number
): string[] {
  return [
    'The quadratic formula: x = (-b ± √(b² - 4ac)) / (2a)',
    `Substituting a=${a}, b=${b}, c=${c}:`,
    `x = (-(${b}) ± √((${b})² - 4(${a})(${c}))) / (2(${a}))`,
    `x = (${-b} ± √(${b * b} - ${4 * a * c})) / ${2 * a}`,
    `x = (${-b} ± √${roundForDisplay(d)}) / ${2 * a}`,
    d >= 0
      ? `x = (${-b} ± ${roundForDisplay(Math.sqrt(d))}) / ${2 * a}`
      : 'No real solutions (negative discriminant)'
  ];
}
