---
title: Mathematical Formulas for Quadratic Equation Calculator
description: Complete mathematical reference with formulas, derivations, TypeScript implementations, and precision handling for quadratic equation educational software
author: GitHub Copilot
ms.date: 2026-02-03
ms.topic: reference
keywords:
  - quadratic equation
  - mathematics
  - parabola
  - vertex
  - discriminant
  - roots
estimated_reading_time: 20
---

## Executive Summary

This document provides complete mathematical formulas and implementation details for a quadratic equation educational application. Each concept includes LaTeX notation, step-by-step derivation, TypeScript function signatures, precision handling strategies, and worked examples.

**Standard Quadratic Equation Form:**

$$y = ax^2 + bx + c$$

Where:

* $a$ = coefficient of $x^2$ (determines parabola shape)
* $b$ = coefficient of $x$ (influences vertex position)
* $c$ = constant term (y-intercept)

> [!IMPORTANT]
> The coefficient $a$ must be non-zero for the equation to be quadratic. When $a = 0$, the equation degenerates to a linear function.

## Vertex Calculation

### Formula

The vertex of a parabola is the point $(h, k)$ where the parabola reaches its minimum (when $a > 0$) or maximum (when $a < 0$).

**X-coordinate of vertex:**

$$h = -\frac{b}{2a}$$

**Y-coordinate of vertex:**

$$k = f(h) = a\left(-\frac{b}{2a}\right)^2 + b\left(-\frac{b}{2a}\right) + c$$

Simplified:

$$k = c - \frac{b^2}{4a}$$

Alternative notation:

$$\text{Vertex} = \left(-\frac{b}{2a}, c - \frac{b^2}{4a}\right)$$

### Derivation

The vertex formula derives from completing the square on the standard form.

**Step 1: Factor out the leading coefficient from first two terms**

$$y = a\left(x^2 + \frac{b}{a}x\right) + c$$

**Step 2: Complete the square inside parentheses**

Add and subtract $\left(\frac{b}{2a}\right)^2$ inside:

$$y = a\left(x^2 + \frac{b}{a}x + \frac{b^2}{4a^2} - \frac{b^2}{4a^2}\right) + c$$

**Step 3: Factor the perfect square trinomial**

$$y = a\left(x + \frac{b}{2a}\right)^2 - a \cdot \frac{b^2}{4a^2} + c$$

**Step 4: Simplify**

$$y = a\left(x + \frac{b}{2a}\right)^2 - \frac{b^2}{4a} + c$$

$$y = a\left(x - \left(-\frac{b}{2a}\right)\right)^2 + \left(c - \frac{b^2}{4a}\right)$$

This is vertex form $y = a(x - h)^2 + k$ where:

* $h = -\frac{b}{2a}$
* $k = c - \frac{b^2}{4a}$

### TypeScript Implementation

```typescript
interface Point {
  x: number;
  y: number;
}

interface QuadraticCoefficients {
  a: number;
  b: number;
  c: number;
}

/**
 * Calculates the vertex of a parabola.
 * @param coefficients - The quadratic equation coefficients { a, b, c }
 * @returns The vertex point { x, y }
 * @throws Error if coefficient 'a' is zero
 */
function calculateVertex(coefficients: QuadraticCoefficients): Point {
  const { a, b, c } = coefficients;

  if (a === 0) {
    throw new Error("Coefficient 'a' cannot be zero for a quadratic equation");
  }

  const x = -b / (2 * a);
  const y = c - (b * b) / (4 * a);

  return { x, y };
}
```

### Step-by-Step Display Format

For educational display, show these steps:

| Step | Operation | Formula | Result |
| ---- | --------- | ------- | ------ |
| 1    | Calculate x-coordinate | $h = -\frac{b}{2a}$ | $h = -\frac{({b})}{2({a})}$ |
| 2    | Simplify x | Arithmetic | $h = {result}$ |
| 3    | Calculate y-coordinate | $k = c - \frac{b^2}{4a}$ | $k = {c} - \frac{({b})^2}{4({a})}$ |
| 4    | Simplify y | Arithmetic | $k = {result}$ |
| 5    | State vertex | Point notation | Vertex: $({h}, {k})$ |

### Worked Example

**Given:** $y = 2x^2 - 8x + 6$

**Step 1:** Identify coefficients: $a = 2$, $b = -8$, $c = 6$

**Step 2:** Calculate x-coordinate:
$$h = -\frac{-8}{2(2)} = -\frac{-8}{4} = 2$$

**Step 3:** Calculate y-coordinate:
$$k = 6 - \frac{(-8)^2}{4(2)} = 6 - \frac{64}{8} = 6 - 8 = -2$$

**Result:** Vertex is $(2, -2)$

## Y-Intercept

### Formula

The y-intercept occurs where the parabola crosses the y-axis, at $x = 0$.

$$\text{Y-intercept} = (0, c)$$

**Derivation:**

Substitute $x = 0$ into $y = ax^2 + bx + c$:

$$y = a(0)^2 + b(0) + c = c$$

### TypeScript Implementation

```typescript
/**
 * Returns the y-intercept of a quadratic equation.
 * @param coefficients - The quadratic equation coefficients { a, b, c }
 * @returns The y-intercept point
 */
function calculateYIntercept(coefficients: QuadraticCoefficients): Point {
  return { x: 0, y: coefficients.c };
}
```

### Step-by-Step Display Format

| Step | Operation | Formula | Result |
| ---- | --------- | ------- | ------ |
| 1    | Substitute x = 0 | $y = a(0)^2 + b(0) + c$ | $y = c$ |
| 2    | State y-intercept | Point notation | Y-intercept: $(0, {c})$ |

### Worked Example

**Given:** $y = 3x^2 + 5x - 7$

**Step 1:** Substitute $x = 0$:
$$y = 3(0)^2 + 5(0) - 7 = -7$$

**Result:** Y-intercept is $(0, -7)$

## X-Intercepts (Roots)

### Quadratic Formula

The x-intercepts (roots, zeros, solutions) are where $y = 0$. Solve $ax^2 + bx + c = 0$ using the quadratic formula:

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

This yields two solutions:

$$x_1 = \frac{-b + \sqrt{b^2 - 4ac}}{2a}$$

$$x_2 = \frac{-b - \sqrt{b^2 - 4ac}}{2a}$$

### Discriminant

The discriminant $D$ (or $\Delta$) determines the nature of roots:

$$D = b^2 - 4ac$$

| Discriminant | Condition | Number of Roots | Geometric Meaning |
| ------------ | --------- | --------------- | ----------------- |
| $D > 0$      | Positive  | Two distinct real roots | Parabola crosses x-axis twice |
| $D = 0$      | Zero      | One repeated real root | Parabola touches x-axis (tangent) |
| $D < 0$      | Negative  | No real roots | Parabola does not intersect x-axis |

For $D < 0$, the roots are complex conjugates:

$$x = \frac{-b \pm i\sqrt{|D|}}{2a}$$

Where $i = \sqrt{-1}$.

### TypeScript Implementation

```typescript
interface RealRoots {
  type: 'two-distinct' | 'one-repeated';
  roots: [number, number] | [number];
}

interface NoRealRoots {
  type: 'no-real-roots';
  roots: null;
  complexRoots: {
    real: number;
    imaginary: number;
  };
}

type RootResult = RealRoots | NoRealRoots;

interface DiscriminantAnalysis {
  discriminant: number;
  rootResult: RootResult;
}

/**
 * Calculates the discriminant of a quadratic equation.
 * @param coefficients - The quadratic equation coefficients { a, b, c }
 * @returns The discriminant value
 */
function calculateDiscriminant(coefficients: QuadraticCoefficients): number {
  const { a, b, c } = coefficients;
  return b * b - 4 * a * c;
}

/**
 * Calculates the x-intercepts (roots) of a quadratic equation.
 * @param coefficients - The quadratic equation coefficients { a, b, c }
 * @returns Analysis including discriminant and roots
 * @throws Error if coefficient 'a' is zero
 */
function calculateRoots(coefficients: QuadraticCoefficients): DiscriminantAnalysis {
  const { a, b, c } = coefficients;

  if (a === 0) {
    throw new Error("Coefficient 'a' cannot be zero for a quadratic equation");
  }

  const discriminant = b * b - 4 * a * c;
  const denominator = 2 * a;

  if (discriminant > 0) {
    const sqrtDiscriminant = Math.sqrt(discriminant);
    return {
      discriminant,
      rootResult: {
        type: 'two-distinct',
        roots: [
          (-b + sqrtDiscriminant) / denominator,
          (-b - sqrtDiscriminant) / denominator
        ]
      }
    };
  }

  if (discriminant === 0) {
    return {
      discriminant,
      rootResult: {
        type: 'one-repeated',
        roots: [-b / denominator]
      }
    };
  }

  // discriminant < 0: complex roots
  const realPart = -b / denominator;
  const imaginaryPart = Math.sqrt(-discriminant) / denominator;

  return {
    discriminant,
    rootResult: {
      type: 'no-real-roots',
      roots: null,
      complexRoots: {
        real: realPart,
        imaginary: imaginaryPart
      }
    }
  };
}
```

### Step-by-Step Solution Process

**Phase 1: Calculate Discriminant**

| Step | Operation | Formula | Result |
| ---- | --------- | ------- | ------ |
| 1    | Identify coefficients | $a$, $b$, $c$ | Values |
| 2    | Calculate $b^2$ | $b \times b$ | Value |
| 3    | Calculate $4ac$ | $4 \times a \times c$ | Value |
| 4    | Calculate discriminant | $D = b^2 - 4ac$ | Value |
| 5    | Analyze discriminant | Compare to 0 | Nature of roots |

**Phase 2: Calculate Roots (when $D \geq 0$)**

| Step | Operation | Formula | Result |
| ---- | --------- | ------- | ------ |
| 1    | Calculate $\sqrt{D}$ | Square root | Value |
| 2    | Calculate numerator 1 | $-b + \sqrt{D}$ | Value |
| 3    | Calculate numerator 2 | $-b - \sqrt{D}$ | Value |
| 4    | Calculate denominator | $2a$ | Value |
| 5    | Calculate root 1 | $x_1 = \frac{-b + \sqrt{D}}{2a}$ | Value |
| 6    | Calculate root 2 | $x_2 = \frac{-b - \sqrt{D}}{2a}$ | Value |

### Worked Examples

#### Example 1: Two Distinct Real Roots

**Given:** $x^2 - 5x + 6 = 0$

**Coefficients:** $a = 1$, $b = -5$, $c = 6$

**Step 1:** Calculate discriminant:
$$D = (-5)^2 - 4(1)(6) = 25 - 24 = 1$$

**Step 2:** Since $D = 1 > 0$, two distinct real roots exist.

**Step 3:** Calculate roots:
$$x_1 = \frac{-(-5) + \sqrt{1}}{2(1)} = \frac{5 + 1}{2} = 3$$
$$x_2 = \frac{-(-5) - \sqrt{1}}{2(1)} = \frac{5 - 1}{2} = 2$$

**Result:** X-intercepts at $(2, 0)$ and $(3, 0)$

#### Example 2: One Repeated Root

**Given:** $x^2 - 4x + 4 = 0$

**Coefficients:** $a = 1$, $b = -4$, $c = 4$

**Step 1:** Calculate discriminant:
$$D = (-4)^2 - 4(1)(4) = 16 - 16 = 0$$

**Step 2:** Since $D = 0$, one repeated real root exists (parabola touches x-axis).

**Step 3:** Calculate root:
$$x = \frac{-(-4)}{2(1)} = \frac{4}{2} = 2$$

**Result:** X-intercept at $(2, 0)$ (vertex touches x-axis)

#### Example 3: No Real Roots

**Given:** $x^2 + x + 1 = 0$

**Coefficients:** $a = 1$, $b = 1$, $c = 1$

**Step 1:** Calculate discriminant:
$$D = (1)^2 - 4(1)(1) = 1 - 4 = -3$$

**Step 2:** Since $D = -3 < 0$, no real roots exist.

**Step 3:** Complex roots (for advanced display):
$$x = \frac{-1 \pm \sqrt{-3}}{2} = \frac{-1 \pm i\sqrt{3}}{2}$$
$$x_1 = -\frac{1}{2} + \frac{\sqrt{3}}{2}i \approx -0.5 + 0.866i$$
$$x_2 = -\frac{1}{2} - \frac{\sqrt{3}}{2}i \approx -0.5 - 0.866i$$

**Result:** No x-intercepts (parabola entirely above x-axis)

## Axis of Symmetry

### Formula

The axis of symmetry is a vertical line passing through the vertex:

$$x = -\frac{b}{2a}$$

This is identical to the x-coordinate of the vertex, dividing the parabola into two mirror-image halves.

### Geometric Interpretation

* Every point on the parabola has a mirror point equidistant from the axis
* The two x-intercepts (when they exist) are equidistant from the axis of symmetry
* Distance from each root to axis: $\frac{\sqrt{D}}{2|a|}$

### TypeScript Implementation

```typescript
/**
 * Calculates the axis of symmetry for a parabola.
 * @param coefficients - The quadratic equation coefficients { a, b, c }
 * @returns The x-value of the axis of symmetry
 * @throws Error if coefficient 'a' is zero
 */
function calculateAxisOfSymmetry(coefficients: QuadraticCoefficients): number {
  const { a, b } = coefficients;

  if (a === 0) {
    throw new Error("Coefficient 'a' cannot be zero for a quadratic equation");
  }

  return -b / (2 * a);
}
```

### Worked Example

**Given:** $y = -2x^2 + 12x - 10$

**Coefficients:** $a = -2$, $b = 12$

**Calculate:**
$$x = -\frac{12}{2(-2)} = -\frac{12}{-4} = 3$$

**Result:** Axis of symmetry is the line $x = 3$

## Direction of Parabola

### Sign of Leading Coefficient

The coefficient $a$ determines whether the parabola opens upward or downward:

| Condition | Direction | Vertex Type | Vertex Value |
| --------- | --------- | ----------- | ------------ |
| $a > 0$   | Opens upward (∪) | Minimum point | Global minimum |
| $a < 0$   | Opens downward (∩) | Maximum point | Global maximum |

### Width of Parabola

The absolute value $|a|$ affects how wide or narrow the parabola appears:

| Condition | Effect |
| --------- | ------ |
| $|a| > 1$ | Parabola is narrower (stretched vertically) |
| $|a| = 1$ | Standard width |
| $|a| < 1$ | Parabola is wider (compressed vertically) |

### TypeScript Implementation

```typescript
type ParabolaDirection = 'upward' | 'downward';
type VertexType = 'minimum' | 'maximum';
type ParabolaWidth = 'narrow' | 'standard' | 'wide';

interface ParabolaShape {
  direction: ParabolaDirection;
  vertexType: VertexType;
  width: ParabolaWidth;
  widthFactor: number;
}

/**
 * Analyzes the shape characteristics of a parabola.
 * @param a - The leading coefficient
 * @returns Shape analysis including direction, vertex type, and width
 * @throws Error if coefficient 'a' is zero
 */
function analyzeParabolaShape(a: number): ParabolaShape {
  if (a === 0) {
    throw new Error("Coefficient 'a' cannot be zero for a quadratic equation");
  }

  const direction: ParabolaDirection = a > 0 ? 'upward' : 'downward';
  const vertexType: VertexType = a > 0 ? 'minimum' : 'maximum';
  const absA = Math.abs(a);

  let width: ParabolaWidth;
  if (absA > 1) {
    width = 'narrow';
  } else if (absA < 1) {
    width = 'wide';
  } else {
    width = 'standard';
  }

  return {
    direction,
    vertexType,
    width,
    widthFactor: absA
  };
}
```

### Step-by-Step Display Format

| Step | Check | Result |
| ---- | ----- | ------ |
| 1    | Is $a > 0$? | Opens upward, minimum at vertex |
| 1    | Is $a < 0$? | Opens downward, maximum at vertex |
| 2    | Is $\|a\| > 1$? | Narrower than $y = x^2$ |
| 2    | Is $\|a\| < 1$? | Wider than $y = x^2$ |

### Worked Examples

**Example 1:** $y = 3x^2 - 6x + 2$

* $a = 3 > 0$: Opens upward
* $|a| = 3 > 1$: Narrower parabola
* Vertex is a minimum

**Example 2:** $y = -0.5x^2 + 4x - 3$

* $a = -0.5 < 0$: Opens downward
* $|a| = 0.5 < 1$: Wider parabola
* Vertex is a maximum

## Edge Cases

### Case 1: $a = 0$ (Not a Quadratic)

When $a = 0$, the equation becomes linear: $y = bx + c$.

```typescript
/**
 * Validates that the equation is quadratic.
 * @param a - The leading coefficient
 * @throws Error if a is zero or not a finite number
 */
function validateQuadratic(a: number): void {
  if (a === 0) {
    throw new Error(
      "Coefficient 'a' cannot be zero. " +
      "When a = 0, the equation becomes linear (y = bx + c), not quadratic."
    );
  }

  if (!Number.isFinite(a)) {
    throw new Error("Coefficient 'a' must be a finite number");
  }
}
```

**Display message:** "This is a linear equation (y = bx + c), not a quadratic. Please enter a non-zero value for coefficient a."

### Case 2: $b = 0$ (Symmetric About Y-Axis)

When $b = 0$, the parabola $y = ax^2 + c$ is symmetric about the y-axis.

**Properties:**

* Axis of symmetry: $x = 0$ (the y-axis)
* Vertex: $(0, c)$
* Roots (if $D \geq 0$): $x = \pm\sqrt{-\frac{c}{a}}$

```typescript
function handleBZero(coefficients: QuadraticCoefficients): string {
  const { a, c } = coefficients;

  if (coefficients.b === 0) {
    const vertex = `(0, ${c})`;
    const symmetryNote = "The parabola is symmetric about the y-axis.";

    if (c === 0) {
      return `${symmetryNote} Vertex at origin (0, 0). Single root at x = 0.`;
    }

    const rootCondition = -c / a;
    if (rootCondition > 0) {
      const root = Math.sqrt(rootCondition);
      return `${symmetryNote} Vertex: ${vertex}. Roots: x = ±${root.toFixed(4)}`;
    }

    return `${symmetryNote} Vertex: ${vertex}. No real roots.`;
  }

  return '';
}
```

### Case 3: $c = 0$ (Passes Through Origin)

When $c = 0$, the parabola $y = ax^2 + bx$ passes through the origin.

**Properties:**

* Always has root at $x = 0$
* Second root at $x = -\frac{b}{a}$
* Y-intercept: $(0, 0)$

```typescript
function handleCZero(coefficients: QuadraticCoefficients): {
  passesThroughOrigin: boolean;
  roots: [number, number] | null;
} {
  const { a, b, c } = coefficients;

  if (c === 0 && a !== 0) {
    const secondRoot = -b / a;
    return {
      passesThroughOrigin: true,
      roots: [0, secondRoot]
    };
  }

  return {
    passesThroughOrigin: false,
    roots: null
  };
}
```

### Case 4: Very Large/Small Coefficients (Precision)

Floating-point precision issues arise with extreme coefficient values.

```typescript
const EPSILON = 1e-10;
const MAX_SAFE_COEFFICIENT = 1e10;
const MIN_SAFE_COEFFICIENT = 1e-10;

interface PrecisionWarning {
  hasWarning: boolean;
  warnings: string[];
}

/**
 * Checks coefficients for potential precision issues.
 * @param coefficients - The quadratic equation coefficients
 * @returns Precision analysis with any warnings
 */
function checkPrecision(coefficients: QuadraticCoefficients): PrecisionWarning {
  const warnings: string[] = [];
  const values = [
    { name: 'a', value: coefficients.a },
    { name: 'b', value: coefficients.b },
    { name: 'c', value: coefficients.c }
  ];

  for (const { name, value } of values) {
    const absValue = Math.abs(value);

    if (absValue > MAX_SAFE_COEFFICIENT) {
      warnings.push(
        `Coefficient '${name}' (${value}) exceeds ${MAX_SAFE_COEFFICIENT}. ` +
        `Results may have reduced precision.`
      );
    }

    if (absValue > 0 && absValue < MIN_SAFE_COEFFICIENT) {
      warnings.push(
        `Coefficient '${name}' (${value}) is very small. ` +
        `May cause precision loss in calculations.`
      );
    }

    if (!Number.isFinite(value)) {
      warnings.push(`Coefficient '${name}' is not a finite number.`);
    }
  }

  return {
    hasWarning: warnings.length > 0,
    warnings
  };
}

/**
 * Compares two numbers with floating-point tolerance.
 * @param a - First number
 * @param b - Second number
 * @param epsilon - Tolerance (default: 1e-10)
 * @returns True if numbers are approximately equal
 */
function areApproximatelyEqual(
  a: number,
  b: number,
  epsilon: number = EPSILON
): boolean {
  return Math.abs(a - b) < epsilon;
}

/**
 * Determines if a value is effectively zero.
 * @param value - Number to check
 * @param epsilon - Tolerance (default: 1e-10)
 * @returns True if value is approximately zero
 */
function isEffectivelyZero(value: number, epsilon: number = EPSILON): boolean {
  return Math.abs(value) < epsilon;
}
```

### Edge Case Summary Table

| Condition | Detection | Handling |
| --------- | --------- | -------- |
| $a = 0$ | `a === 0` | Throw error, display linear equation message |
| $b = 0$ | `b === 0` | Note y-axis symmetry, adjust root calculation |
| $c = 0$ | `c === 0` | Note origin passage, simplify factoring display |
| $\|a\| > 10^{10}$ | `Math.abs(a) > 1e10` | Warn about precision, consider scientific notation |
| $\|a\| < 10^{-10}$ | `Math.abs(a) < 1e-10` | Warn about precision, may approach linear |
| Non-finite $a$, $b$, $c$ | `!Number.isFinite()` | Reject input with error |

## Precision Handling for Floating-Point

### IEEE 754 Considerations

JavaScript numbers follow IEEE 754 double-precision floating-point, which introduces rounding errors.

**Classic Example:**

```typescript
0.1 + 0.2 === 0.3  // false
0.1 + 0.2          // 0.30000000000000004
```

### Precision Utility Functions

```typescript
/**
 * Rounds a number to a specified number of decimal places.
 * @param value - Number to round
 * @param decimals - Number of decimal places
 * @returns Rounded number
 */
function roundToDecimals(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

/**
 * Formats a number for display with appropriate precision.
 * @param value - Number to format
 * @param maxDecimals - Maximum decimal places (default: 6)
 * @returns Formatted string representation
 */
function formatForDisplay(value: number, maxDecimals: number = 6): string {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  const rounded = roundToDecimals(value, maxDecimals);

  // Remove trailing zeros
  return rounded.toFixed(maxDecimals).replace(/\.?0+$/, '');
}

/**
 * Formats a root value, handling irrational numbers appropriately.
 * @param value - Root value
 * @param discriminant - The discriminant (for detecting perfect squares)
 * @returns Formatted string with optional radical notation
 */
function formatRoot(value: number, discriminant: number): string {
  // Check if discriminant is a perfect square
  const sqrtD = Math.sqrt(discriminant);
  if (Number.isInteger(sqrtD)) {
    return formatForDisplay(value);
  }

  // For irrational roots, provide decimal approximation
  return `${formatForDisplay(value)} (≈ ${value.toFixed(6)})`;
}
```

### Discriminant Near Zero

Special handling is required when the discriminant is very close to zero:

```typescript
/**
 * Analyzes the discriminant with tolerance for near-zero values.
 * @param discriminant - The calculated discriminant
 * @param epsilon - Tolerance for zero comparison
 * @returns Interpreted discriminant category
 */
function interpretDiscriminant(
  discriminant: number,
  epsilon: number = 1e-10
): 'positive' | 'zero' | 'negative' {
  if (Math.abs(discriminant) < epsilon) {
    return 'zero';
  }
  return discriminant > 0 ? 'positive' : 'negative';
}
```

### Scientific Notation for Extreme Values

```typescript
/**
 * Formats a number using scientific notation when appropriate.
 * @param value - Number to format
 * @param threshold - When to switch to scientific notation (default: 1e6)
 * @returns Formatted string
 */
function formatWithScientificNotation(
  value: number,
  threshold: number = 1e6
): string {
  const absValue = Math.abs(value);

  if (absValue === 0) {
    return '0';
  }

  if (absValue >= threshold || absValue < 1 / threshold) {
    return value.toExponential(4);
  }

  return formatForDisplay(value);
}
```

## Complete Solution Interface

### Full TypeScript Interface

```typescript
interface Point {
  x: number;
  y: number;
}

interface QuadraticCoefficients {
  a: number;
  b: number;
  c: number;
}

interface RealRootsResult {
  hasRealRoots: true;
  count: 1 | 2;
  values: number[];
  points: Point[];
}

interface NoRealRootsResult {
  hasRealRoots: false;
  complexRoots: {
    real: number;
    imaginary: number;
  };
}

type RootsResult = RealRootsResult | NoRealRootsResult;

interface QuadraticSolution {
  // Input
  coefficients: QuadraticCoefficients;
  equation: string;

  // Key Points
  vertex: Point;
  yIntercept: Point;
  roots: RootsResult;

  // Properties
  discriminant: number;
  discriminantType: 'positive' | 'zero' | 'negative';
  axisOfSymmetry: number;
  direction: 'upward' | 'downward';
  vertexType: 'minimum' | 'maximum';

  // Edge Cases
  specialCases: {
    symmetricAboutYAxis: boolean;
    passesThroughOrigin: boolean;
  };

  // Precision
  precisionWarnings: string[];
}

/**
 * Computes a complete solution for a quadratic equation.
 * @param coefficients - The quadratic equation coefficients { a, b, c }
 * @returns Complete solution with all properties and edge cases
 * @throws Error if coefficient 'a' is zero or coefficients are invalid
 */
function solveQuadraticComplete(
  coefficients: QuadraticCoefficients
): QuadraticSolution {
  const { a, b, c } = coefficients;

  // Validation
  if (a === 0) {
    throw new Error("Coefficient 'a' cannot be zero for a quadratic equation");
  }

  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
    throw new Error("All coefficients must be finite numbers");
  }

  // Precision check
  const precisionWarnings: string[] = [];
  [a, b, c].forEach((coef, i) => {
    const name = ['a', 'b', 'c'][i];
    const absVal = Math.abs(coef);
    if (absVal > 1e10) {
      precisionWarnings.push(`Large coefficient ${name} may reduce precision`);
    }
    if (absVal > 0 && absVal < 1e-10) {
      precisionWarnings.push(`Small coefficient ${name} may cause precision loss`);
    }
  });

  // Core calculations
  const discriminant = b * b - 4 * a * c;
  const discriminantType = interpretDiscriminant(discriminant);
  const axisOfSymmetry = -b / (2 * a);
  const vertexY = c - (b * b) / (4 * a);

  // Roots calculation
  let roots: RootsResult;
  if (discriminantType === 'positive') {
    const sqrtD = Math.sqrt(discriminant);
    const root1 = (-b + sqrtD) / (2 * a);
    const root2 = (-b - sqrtD) / (2 * a);
    roots = {
      hasRealRoots: true,
      count: 2,
      values: [root1, root2],
      points: [{ x: root1, y: 0 }, { x: root2, y: 0 }]
    };
  } else if (discriminantType === 'zero') {
    roots = {
      hasRealRoots: true,
      count: 1,
      values: [axisOfSymmetry],
      points: [{ x: axisOfSymmetry, y: 0 }]
    };
  } else {
    const realPart = -b / (2 * a);
    const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
    roots = {
      hasRealRoots: false,
      complexRoots: {
        real: realPart,
        imaginary: Math.abs(imaginaryPart)
      }
    };
  }

  // Format equation string
  const formatCoef = (coef: number, variable: string, first: boolean): string => {
    if (coef === 0) return '';
    const sign = coef >= 0 ? (first ? '' : ' + ') : ' - ';
    const absCoef = Math.abs(coef);
    const coefStr = absCoef === 1 && variable ? '' : absCoef.toString();
    return `${sign}${coefStr}${variable}`;
  };

  const equation = `y = ${formatCoef(a, 'x²', true)}${formatCoef(b, 'x', false)}${formatCoef(c, '', false)}`.trim();

  return {
    coefficients,
    equation,
    vertex: { x: axisOfSymmetry, y: vertexY },
    yIntercept: { x: 0, y: c },
    roots,
    discriminant,
    discriminantType,
    axisOfSymmetry,
    direction: a > 0 ? 'upward' : 'downward',
    vertexType: a > 0 ? 'minimum' : 'maximum',
    specialCases: {
      symmetricAboutYAxis: isEffectivelyZero(b),
      passesThroughOrigin: isEffectivelyZero(c)
    },
    precisionWarnings
  };
}
```

## Example Calculations

### Example 1: Standard Case with Two Roots

**Input:** $y = x^2 - 5x + 6$

```typescript
const solution = solveQuadraticComplete({ a: 1, b: -5, c: 6 });
```

**Results:**

| Property | Value |
| -------- | ----- |
| Equation | $y = x^2 - 5x + 6$ |
| Discriminant | $1$ (positive) |
| Vertex | $(2.5, -0.25)$ |
| Y-intercept | $(0, 6)$ |
| Roots | $x = 2$, $x = 3$ |
| Axis of symmetry | $x = 2.5$ |
| Direction | Upward (minimum) |

### Example 2: Perfect Square (One Root)

**Input:** $y = 4x^2 - 12x + 9$

```typescript
const solution = solveQuadraticComplete({ a: 4, b: -12, c: 9 });
```

**Results:**

| Property | Value |
| -------- | ----- |
| Equation | $y = 4x^2 - 12x + 9$ |
| Discriminant | $0$ (zero) |
| Vertex | $(1.5, 0)$ |
| Y-intercept | $(0, 9)$ |
| Roots | $x = 1.5$ (repeated) |
| Axis of symmetry | $x = 1.5$ |
| Direction | Upward (minimum at x-axis) |

### Example 3: No Real Roots

**Input:** $y = 2x^2 + 3x + 5$

```typescript
const solution = solveQuadraticComplete({ a: 2, b: 3, c: 5 });
```

**Results:**

| Property | Value |
| -------- | ----- |
| Equation | $y = 2x^2 + 3x + 5$ |
| Discriminant | $-31$ (negative) |
| Vertex | $(-0.75, 3.875)$ |
| Y-intercept | $(0, 5)$ |
| Roots | None (complex: $-0.75 \pm 1.392i$) |
| Axis of symmetry | $x = -0.75$ |
| Direction | Upward (minimum above x-axis) |

### Example 4: Downward Parabola

**Input:** $y = -x^2 + 4x - 3$

```typescript
const solution = solveQuadraticComplete({ a: -1, b: 4, c: -3 });
```

**Results:**

| Property | Value |
| -------- | ----- |
| Equation | $y = -x^2 + 4x - 3$ |
| Discriminant | $4$ (positive) |
| Vertex | $(2, 1)$ |
| Y-intercept | $(0, -3)$ |
| Roots | $x = 1$, $x = 3$ |
| Axis of symmetry | $x = 2$ |
| Direction | Downward (maximum) |

### Example 5: Irrational Roots

**Input:** $y = x^2 - 2$ (roots at $\pm\sqrt{2}$)

```typescript
const solution = solveQuadraticComplete({ a: 1, b: 0, c: -2 });
```

**Results:**

| Property | Value |
| -------- | ----- |
| Equation | $y = x^2 - 2$ |
| Discriminant | $8$ (positive) |
| Vertex | $(0, -2)$ |
| Y-intercept | $(0, -2)$ |
| Roots | $x \approx 1.414$, $x \approx -1.414$ ($\pm\sqrt{2}$) |
| Axis of symmetry | $x = 0$ |
| Direction | Upward (minimum) |
| Special | Symmetric about y-axis |

### Example 6: Large Coefficients (Precision Test)

**Input:** $y = 10^8 x^2 - 2 \times 10^8 x + 10^8$

```typescript
const solution = solveQuadraticComplete({ a: 1e8, b: -2e8, c: 1e8 });
```

**Results:**

| Property | Value |
| -------- | ----- |
| Discriminant | $0$ |
| Vertex | $(1, 0)$ |
| Root | $x = 1$ (repeated) |
| Precision warnings | Large coefficients detected |

## Formula Quick Reference

| Concept | Formula |
| ------- | ------- |
| Standard form | $y = ax^2 + bx + c$ |
| Vertex form | $y = a(x - h)^2 + k$ |
| Vertex x-coordinate | $h = -\frac{b}{2a}$ |
| Vertex y-coordinate | $k = c - \frac{b^2}{4a}$ |
| Y-intercept | $(0, c)$ |
| Discriminant | $D = b^2 - 4ac$ |
| Quadratic formula | $x = \frac{-b \pm \sqrt{D}}{2a}$ |
| Axis of symmetry | $x = -\frac{b}{2a}$ |
| Vertex form conversion | $h = -\frac{b}{2a}$, $k = c - \frac{b^2}{4a}$ |
| Sum of roots | $x_1 + x_2 = -\frac{b}{a}$ |
| Product of roots | $x_1 \cdot x_2 = \frac{c}{a}$ |
