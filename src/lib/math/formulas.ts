// Static LaTeX formula strings for quadratic equations

export const QUADRATIC_FORMULA = 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}';
export const DISCRIMINANT = '\\Delta = b^2 - 4ac';
export const VERTEX_X = 'x_v = \\frac{-b}{2a}';
export const VERTEX_Y = 'y_v = f(x_v)';
export const AXIS_OF_SYMMETRY = 'x = \\frac{-b}{2a}';
export const STANDARD_FORM = 'f(x) = ax^2 + bx + c';

// Dynamic formula generation functions

export function formatQuadraticEquation(a: number, b: number, c: number): string {
  const parts: string[] = [];

  // ax^2 term
  if (a === 1) parts.push('x^2');
  else if (a === -1) parts.push('-x^2');
  else parts.push(`${a}x^2`);

  // bx term
  if (b !== 0) {
    if (b === 1) parts.push('+ x');
    else if (b === -1) parts.push('- x');
    else if (b > 0) parts.push(`+ ${b}x`);
    else parts.push(`- ${Math.abs(b)}x`);
  }

  // c term
  if (c !== 0) {
    if (c > 0) parts.push(`+ ${c}`);
    else parts.push(`- ${Math.abs(c)}`);
  }

  return `f(x) = ${parts.join(' ')}`;
}

export function formatDiscriminant(b: number, a: number, c: number): string {
  const discriminant = b * b - 4 * a * c;
  return `\\Delta = ${b}^2 - 4(${a})(${c}) = ${discriminant}`;
}

export function formatVertexX(a: number, b: number): string {
  const vertexX = -b / (2 * a);
  return `x_v = \\frac{-(${b})}{2(${a})} = ${formatNumber(vertexX)}`;
}

export function formatSolution(x: number): string {
  return formatNumber(x);
}

function formatNumber(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(4).replace(/\.?0+$/, '');
}
