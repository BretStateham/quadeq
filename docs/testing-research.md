---
title: Testing Research for Quadratic Equation Calculator
description: Comprehensive research on testing approaches for a TypeScript SPA with math calculations and interactive graphing
author: GitHub Copilot
ms.date: 2026-02-03
ms.topic: research
keywords:
  - testing
  - vitest
  - playwright
  - typescript
  - quadratic equation
estimated_reading_time: 15
---

## Executive Summary

This document presents research findings on testing strategies for a TypeScript single-page application featuring quadratic equation calculations and interactive graph visualization. The recommended testing stack combines Vitest for unit/component testing and Playwright for end-to-end testing, providing comprehensive coverage with excellent TypeScript integration.

## Recommended Testing Stack

| Layer | Tool | Purpose |
| ----- | ---- | ------- |
| Unit Testing | Vitest | Math calculations, utility functions |
| Component Testing | Vitest + Testing Library | UI components, form validation |
| E2E Testing | Playwright | User workflows, visual regression |
| Coverage | Vitest + Istanbul | Code coverage reporting |

## Unit Testing Research

### Vitest vs Jest Comparison

| Aspect | Vitest | Jest |
| ------ | ------ | ---- |
| TypeScript Support | Native ESM, first-class TS | Requires ts-jest transformer |
| Configuration | Minimal, Vite-compatible | Separate jest.config |
| Performance | Fast, native ESM | Slower transform step |
| Watch Mode | Instant HMR-based | File-based watching |
| Compatibility | Jest-compatible API | Industry standard |
| Ecosystem | Growing rapidly | Mature, extensive |

**Recommendation:** Vitest offers superior TypeScript integration and faster execution. Its native ESM support eliminates transformation overhead, making it ideal for modern TypeScript SPAs.

### Vitest Setup and Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', 'src/**/*.d.ts'],
      thresholds: {
        statements: 90,
        branches: 85,
        functions: 90,
        lines: 90
      }
    },
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.json'
    }
  }
});
```

```json
// package.json scripts
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

### Testing Math Calculation Functions

Math calculations require careful attention to floating-point precision and edge cases.

```typescript
// src/math/quadratic.ts
export interface QuadraticCoefficients {
  a: number;
  b: number;
  c: number;
}

export interface QuadraticSolution {
  vertex: { x: number; y: number };
  roots: number[] | null;
  discriminant: number;
  yIntercept: number;
  axisOfSymmetry: number;
}

export function solveQuadratic(coefficients: QuadraticCoefficients): QuadraticSolution {
  const { a, b, c } = coefficients;

  if (a === 0) {
    throw new Error('Coefficient "a" cannot be zero for a quadratic equation');
  }

  const discriminant = b * b - 4 * a * c;
  const axisOfSymmetry = -b / (2 * a);
  const vertexY = a * axisOfSymmetry * axisOfSymmetry + b * axisOfSymmetry + c;

  let roots: number[] | null = null;

  if (discriminant > 0) {
    const sqrtDiscriminant = Math.sqrt(discriminant);
    roots = [
      (-b + sqrtDiscriminant) / (2 * a),
      (-b - sqrtDiscriminant) / (2 * a)
    ];
  } else if (discriminant === 0) {
    roots = [axisOfSymmetry];
  }

  return {
    vertex: { x: axisOfSymmetry, y: vertexY },
    roots,
    discriminant,
    yIntercept: c,
    axisOfSymmetry
  };
}
```

```typescript
// src/math/quadratic.test.ts
import { describe, it, expect } from 'vitest';
import { solveQuadratic, type QuadraticCoefficients } from './quadratic';

describe('solveQuadratic', () => {
  describe('discriminant cases', () => {
    it('returns two distinct real roots when discriminant is positive', () => {
      // x² - 5x + 6 = 0 → roots at x = 2, x = 3
      const coefficients: QuadraticCoefficients = { a: 1, b: -5, c: 6 };
      const result = solveQuadratic(coefficients);

      expect(result.discriminant).toBe(1);
      expect(result.roots).toHaveLength(2);
      expect(result.roots).toContain(2);
      expect(result.roots).toContain(3);
    });

    it('returns one repeated root when discriminant is zero', () => {
      // x² - 4x + 4 = 0 → root at x = 2
      const coefficients: QuadraticCoefficients = { a: 1, b: -4, c: 4 };
      const result = solveQuadratic(coefficients);

      expect(result.discriminant).toBe(0);
      expect(result.roots).toEqual([2]);
    });

    it('returns null roots when discriminant is negative', () => {
      // x² + x + 1 = 0 → no real roots
      const coefficients: QuadraticCoefficients = { a: 1, b: 1, c: 1 };
      const result = solveQuadratic(coefficients);

      expect(result.discriminant).toBe(-3);
      expect(result.roots).toBeNull();
    });
  });

  describe('vertex calculation', () => {
    it('calculates vertex correctly for standard parabola', () => {
      // y = x² - 2x + 1 → vertex at (1, 0)
      const coefficients: QuadraticCoefficients = { a: 1, b: -2, c: 1 };
      const result = solveQuadratic(coefficients);

      expect(result.vertex.x).toBe(1);
      expect(result.vertex.y).toBe(0);
    });

    it('calculates vertex for downward-opening parabola', () => {
      // y = -x² + 4x - 3 → vertex at (2, 1)
      const coefficients: QuadraticCoefficients = { a: -1, b: 4, c: -3 };
      const result = solveQuadratic(coefficients);

      expect(result.vertex.x).toBe(2);
      expect(result.vertex.y).toBe(1);
    });
  });

  describe('edge cases', () => {
    it('throws error when a equals zero', () => {
      const coefficients: QuadraticCoefficients = { a: 0, b: 2, c: 1 };

      expect(() => solveQuadratic(coefficients)).toThrowError(
        'Coefficient "a" cannot be zero'
      );
    });

    it('handles very small coefficients', () => {
      const coefficients: QuadraticCoefficients = { a: 0.001, b: -0.002, c: 0.001 };
      const result = solveQuadratic(coefficients);

      expect(result.roots).toHaveLength(1);
      expect(result.roots![0]).toBeCloseTo(1, 10);
    });

    it('handles very large coefficients', () => {
      const coefficients: QuadraticCoefficients = { a: 1e10, b: -2e10, c: 1e10 };
      const result = solveQuadratic(coefficients);

      expect(result.vertex.x).toBeCloseTo(1, 5);
    });
  });

  describe('floating-point precision', () => {
    it('uses toBeCloseTo for floating-point comparisons', () => {
      // y = 0.1x² - 0.3x + 0.2 → roots at x = 1, x = 2
      const coefficients: QuadraticCoefficients = { a: 0.1, b: -0.3, c: 0.2 };
      const result = solveQuadratic(coefficients);

      expect(result.roots).toHaveLength(2);
      expect(result.roots![0]).toBeCloseTo(2, 10);
      expect(result.roots![1]).toBeCloseTo(1, 10);
    });

    it('handles irrational roots correctly', () => {
      // x² - 2 = 0 → roots at ±√2
      const coefficients: QuadraticCoefficients = { a: 1, b: 0, c: -2 };
      const result = solveQuadratic(coefficients);

      const sqrt2 = Math.sqrt(2);
      expect(result.roots![0]).toBeCloseTo(sqrt2, 10);
      expect(result.roots![1]).toBeCloseTo(-sqrt2, 10);
    });
  });
});
```

### Custom Matchers for Math Testing

```typescript
// src/test/matchers.ts
import { expect } from 'vitest';

interface CustomMatchers<R = unknown> {
  toBeWithinPrecision(expected: number, precision?: number): R;
  toBeValidRoot(coefficients: { a: number; b: number; c: number }): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}

expect.extend({
  toBeWithinPrecision(received: number, expected: number, precision = 1e-10) {
    const pass = Math.abs(received - expected) < precision;
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be within ${precision} of ${expected}`
          : `expected ${received} to be within ${precision} of ${expected}, difference: ${Math.abs(received - expected)}`
    };
  },

  toBeValidRoot(received: number, { a, b, c }: { a: number; b: number; c: number }) {
    const result = a * received * received + b * received + c;
    const pass = Math.abs(result) < 1e-10;
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be a root of ${a}x² + ${b}x + ${c}`
          : `expected ${received} to be a root, but f(${received}) = ${result}`
    };
  }
});
```

## Component Testing Research

### Testing Library Integration

Testing Library provides user-centric testing utilities that work seamlessly with Vitest.

```typescript
// vitest.config.ts (updated)
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  }
});
```

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/dom';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

### Form Input Testing

```typescript
// src/components/CoefficientForm.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

// Example component test structure
describe('CoefficientForm', () => {
  const createForm = () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <form id="coefficient-form">
        <label for="coef-a">Coefficient a:</label>
        <input type="number" id="coef-a" name="a" step="any" required />

        <label for="coef-b">Coefficient b:</label>
        <input type="number" id="coef-b" name="b" step="any" required />

        <label for="coef-c">Coefficient c:</label>
        <input type="number" id="coef-c" name="c" step="any" required />

        <button type="submit">Calculate</button>
      </form>
    `;
    return container;
  };

  it('accepts numeric input for coefficients', async () => {
    const container = createForm();
    document.body.appendChild(container);

    const inputA = screen.getByLabelText(/coefficient a/i) as HTMLInputElement;
    const inputB = screen.getByLabelText(/coefficient b/i) as HTMLInputElement;
    const inputC = screen.getByLabelText(/coefficient c/i) as HTMLInputElement;

    await userEvent.type(inputA, '1');
    await userEvent.type(inputB, '-5');
    await userEvent.type(inputC, '6');

    expect(inputA.value).toBe('1');
    expect(inputB.value).toBe('-5');
    expect(inputC.value).toBe('6');

    document.body.removeChild(container);
  });

  it('validates that coefficient a is not zero', async () => {
    const container = createForm();
    document.body.appendChild(container);

    const inputA = screen.getByLabelText(/coefficient a/i) as HTMLInputElement;
    await userEvent.type(inputA, '0');

    // Custom validation logic would be tested here
    expect(inputA.value).toBe('0');

    document.body.removeChild(container);
  });

  it('handles decimal inputs correctly', async () => {
    const container = createForm();
    document.body.appendChild(container);

    const inputA = screen.getByLabelText(/coefficient a/i) as HTMLInputElement;
    await userEvent.type(inputA, '0.5');

    expect(inputA.value).toBe('0.5');
    expect(parseFloat(inputA.value)).toBe(0.5);

    document.body.removeChild(container);
  });

  it('handles negative inputs correctly', async () => {
    const container = createForm();
    document.body.appendChild(container);

    const inputB = screen.getByLabelText(/coefficient b/i) as HTMLInputElement;
    await userEvent.type(inputB, '-3.14');

    expect(parseFloat(inputB.value)).toBeCloseTo(-3.14);

    document.body.removeChild(container);
  });
});
```

### Snapshot Testing Considerations

Snapshot testing provides value for stable UI components but requires careful management for dynamic math content.

```typescript
// src/components/SolutionDisplay.test.ts
import { describe, it, expect } from 'vitest';

describe('SolutionDisplay', () => {
  const createSolutionHTML = (solution: {
    roots: number[] | null;
    vertex: { x: number; y: number };
    discriminant: number;
  }) => {
    let rootsHTML = '';
    if (solution.roots === null) {
      rootsHTML = '<p>No real roots (discriminant &lt; 0)</p>';
    } else if (solution.roots.length === 1) {
      rootsHTML = `<p>One repeated root: x = ${solution.roots[0]}</p>`;
    } else {
      rootsHTML = `
        <p>Root 1: x = ${solution.roots[0]}</p>
        <p>Root 2: x = ${solution.roots[1]}</p>
      `;
    }

    return `
      <div class="solution-display">
        <h2>Solution</h2>
        <div class="vertex">
          <h3>Vertex</h3>
          <p>(${solution.vertex.x}, ${solution.vertex.y})</p>
        </div>
        <div class="roots">
          <h3>Roots</h3>
          ${rootsHTML}
        </div>
        <div class="discriminant">
          <p>Discriminant: ${solution.discriminant}</p>
        </div>
      </div>
    `;
  };

  it('renders two roots solution correctly', () => {
    const solution = {
      roots: [3, 2],
      vertex: { x: 2.5, y: -0.25 },
      discriminant: 1
    };

    const html = createSolutionHTML(solution);
    expect(html).toMatchSnapshot();
  });

  it('renders no real roots correctly', () => {
    const solution = {
      roots: null,
      vertex: { x: -0.5, y: 0.75 },
      discriminant: -3
    };

    const html = createSolutionHTML(solution);
    expect(html).toMatchSnapshot();
  });
});
```

> [!TIP]
> For math applications, avoid snapshot testing on computed values. Instead, use snapshots for structural HTML and explicit assertions for calculated results.

## End-to-End Testing with Playwright

### Playwright Setup and Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
});
```

```json
// package.json scripts (additional)
{
  "scripts": {
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

### User Interaction Testing

```typescript
// e2e/quadratic-calculator.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Quadratic Calculator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('calculates solution for equation with two real roots', async ({ page }) => {
    // Input coefficients for x² - 5x + 6 = 0
    await page.getByLabel(/coefficient a/i).fill('1');
    await page.getByLabel(/coefficient b/i).fill('-5');
    await page.getByLabel(/coefficient c/i).fill('6');

    await page.getByRole('button', { name: /calculate/i }).click();

    // Verify roots are displayed
    await expect(page.getByText(/x.*=.*2/)).toBeVisible();
    await expect(page.getByText(/x.*=.*3/)).toBeVisible();

    // Verify vertex
    await expect(page.getByText(/vertex/i)).toBeVisible();
    await expect(page.getByText(/2\.5/)).toBeVisible();
  });

  test('handles equation with no real roots', async ({ page }) => {
    // Input coefficients for x² + x + 1 = 0
    await page.getByLabel(/coefficient a/i).fill('1');
    await page.getByLabel(/coefficient b/i).fill('1');
    await page.getByLabel(/coefficient c/i).fill('1');

    await page.getByRole('button', { name: /calculate/i }).click();

    await expect(page.getByText(/no real roots/i)).toBeVisible();
  });

  test('validates coefficient a cannot be zero', async ({ page }) => {
    await page.getByLabel(/coefficient a/i).fill('0');
    await page.getByLabel(/coefficient b/i).fill('2');
    await page.getByLabel(/coefficient c/i).fill('1');

    await page.getByRole('button', { name: /calculate/i }).click();

    await expect(page.getByText(/cannot be zero/i)).toBeVisible();
  });

  test('updates graph when coefficients change', async ({ page }) => {
    const canvas = page.locator('canvas, svg').first();

    // Enter initial coefficients
    await page.getByLabel(/coefficient a/i).fill('1');
    await page.getByLabel(/coefficient b/i).fill('0');
    await page.getByLabel(/coefficient c/i).fill('0');
    await page.getByRole('button', { name: /calculate/i }).click();

    // Verify graph container is visible
    await expect(canvas).toBeVisible();

    // Change coefficients and verify graph updates
    await page.getByLabel(/coefficient a/i).fill('-1');
    await page.getByRole('button', { name: /calculate/i }).click();

    // Graph should still be visible (indicating update)
    await expect(canvas).toBeVisible();
  });

  test('handles decimal coefficients', async ({ page }) => {
    await page.getByLabel(/coefficient a/i).fill('0.5');
    await page.getByLabel(/coefficient b/i).fill('-1.5');
    await page.getByLabel(/coefficient c/i).fill('1');

    await page.getByRole('button', { name: /calculate/i }).click();

    // Verify calculation completes without error
    await expect(page.getByText(/vertex/i)).toBeVisible();
  });

  test('handles negative coefficients', async ({ page }) => {
    await page.getByLabel(/coefficient a/i).fill('-2');
    await page.getByLabel(/coefficient b/i).fill('4');
    await page.getByLabel(/coefficient c/i).fill('-1');

    await page.getByRole('button', { name: /calculate/i }).click();

    await expect(page.getByText(/vertex/i)).toBeVisible();
  });
});
```

### Visual Regression Testing for Graphs

```typescript
// e2e/visual-regression.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Graph Visual Regression', () => {
  test('standard parabola renders correctly', async ({ page }) => {
    await page.goto('/');

    // y = x² (simplest parabola)
    await page.getByLabel(/coefficient a/i).fill('1');
    await page.getByLabel(/coefficient b/i).fill('0');
    await page.getByLabel(/coefficient c/i).fill('0');
    await page.getByRole('button', { name: /calculate/i }).click();

    // Wait for graph to render
    await page.waitForSelector('canvas, svg');
    await page.waitForTimeout(500); // Allow animation to complete

    const graphContainer = page.locator('.graph-container, [data-testid="graph"]');
    await expect(graphContainer).toHaveScreenshot('standard-parabola.png', {
      maxDiffPixels: 100,
      threshold: 0.1
    });
  });

  test('downward parabola renders correctly', async ({ page }) => {
    await page.goto('/');

    // y = -x² + 4 (downward opening)
    await page.getByLabel(/coefficient a/i).fill('-1');
    await page.getByLabel(/coefficient b/i).fill('0');
    await page.getByLabel(/coefficient c/i).fill('4');
    await page.getByRole('button', { name: /calculate/i }).click();

    await page.waitForSelector('canvas, svg');
    await page.waitForTimeout(500);

    const graphContainer = page.locator('.graph-container, [data-testid="graph"]');
    await expect(graphContainer).toHaveScreenshot('downward-parabola.png', {
      maxDiffPixels: 100
    });
  });

  test('parabola with no x-intercepts renders correctly', async ({ page }) => {
    await page.goto('/');

    // y = x² + 1 (no real roots)
    await page.getByLabel(/coefficient a/i).fill('1');
    await page.getByLabel(/coefficient b/i).fill('0');
    await page.getByLabel(/coefficient c/i).fill('1');
    await page.getByRole('button', { name: /calculate/i }).click();

    await page.waitForSelector('canvas, svg');
    await page.waitForTimeout(500);

    const graphContainer = page.locator('.graph-container, [data-testid="graph"]');
    await expect(graphContainer).toHaveScreenshot('no-intercepts-parabola.png', {
      maxDiffPixels: 100
    });
  });
});
```

### Accessibility Testing

```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('form inputs have proper labels', async ({ page }) => {
    await page.goto('/');

    const inputA = page.getByLabel(/coefficient a/i);
    const inputB = page.getByLabel(/coefficient b/i);
    const inputC = page.getByLabel(/coefficient c/i);

    await expect(inputA).toBeVisible();
    await expect(inputB).toBeVisible();
    await expect(inputC).toBeVisible();
  });

  test('solution results are announced to screen readers', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel(/coefficient a/i).fill('1');
    await page.getByLabel(/coefficient b/i).fill('-5');
    await page.getByLabel(/coefficient c/i).fill('6');
    await page.getByRole('button', { name: /calculate/i }).click();

    // Check for aria-live region or role="status"
    const resultsRegion = page.locator('[aria-live], [role="status"], [role="alert"]');
    await expect(resultsRegion).toBeVisible();
  });

  test('graph has accessible description', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel(/coefficient a/i).fill('1');
    await page.getByLabel(/coefficient b/i).fill('0');
    await page.getByLabel(/coefficient c/i).fill('0');
    await page.getByRole('button', { name: /calculate/i }).click();

    // Canvas should have aria-label or figure with figcaption
    const graph = page.locator('canvas[aria-label], figure:has(figcaption)');
    await expect(graph).toBeVisible();
  });

  test('keyboard navigation works correctly', async ({ page }) => {
    await page.goto('/');

    // Tab through form elements
    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/coefficient a/i)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/coefficient b/i)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByLabel(/coefficient c/i)).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: /calculate/i })).toBeFocused();

    // Submit with Enter
    await page.getByLabel(/coefficient a/i).fill('1');
    await page.getByLabel(/coefficient b/i).fill('-2');
    await page.getByLabel(/coefficient c/i).fill('1');
    await page.keyboard.press('Enter');

    await expect(page.getByText(/vertex/i)).toBeVisible();
  });
});
```

## Special Considerations for Math Applications

### Floating-Point Precision Testing

JavaScript floating-point numbers follow IEEE 754, leading to precision issues that require explicit handling.

```typescript
// src/math/precision.ts
export const EPSILON = 1e-10;

export function areEqual(a: number, b: number, epsilon = EPSILON): boolean {
  return Math.abs(a - b) < epsilon;
}

export function isZero(value: number, epsilon = EPSILON): boolean {
  return Math.abs(value) < epsilon;
}

export function roundToPrecision(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
```

```typescript
// src/math/precision.test.ts
import { describe, it, expect } from 'vitest';
import { areEqual, isZero, roundToPrecision } from './precision';

describe('floating-point precision utilities', () => {
  it('handles 0.1 + 0.2 !== 0.3 case', () => {
    const result = 0.1 + 0.2;
    expect(result).not.toBe(0.3); // JavaScript quirk
    expect(areEqual(result, 0.3)).toBe(true);
  });

  it('detects near-zero values', () => {
    expect(isZero(1e-11)).toBe(true);
    expect(isZero(1e-9)).toBe(false);
  });

  it('rounds to specified precision', () => {
    expect(roundToPrecision(3.14159265, 2)).toBe(3.14);
    expect(roundToPrecision(2.5, 0)).toBe(3);
  });
});
```

### Testing Graph Rendering

For canvas-based graphs, pixel-perfect testing is impractical. Use these strategies instead.

```typescript
// e2e/graph-rendering.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Graph Rendering', () => {
  test('canvas dimensions are correct', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel(/coefficient a/i).fill('1');
    await page.getByLabel(/coefficient b/i).fill('0');
    await page.getByLabel(/coefficient c/i).fill('0');
    await page.getByRole('button', { name: /calculate/i }).click();

    const canvas = page.locator('canvas');
    const boundingBox = await canvas.boundingBox();

    expect(boundingBox?.width).toBeGreaterThan(200);
    expect(boundingBox?.height).toBeGreaterThan(200);
  });

  test('graph container responds to window resize', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1200, height: 800 });

    await page.getByLabel(/coefficient a/i).fill('1');
    await page.getByLabel(/coefficient b/i).fill('0');
    await page.getByLabel(/coefficient c/i).fill('0');
    await page.getByRole('button', { name: /calculate/i }).click();

    const initialBox = await page.locator('canvas').boundingBox();

    await page.setViewportSize({ width: 600, height: 400 });
    await page.waitForTimeout(300);

    const resizedBox = await page.locator('canvas').boundingBox();

    expect(resizedBox?.width).toBeLessThan(initialBox!.width);
  });
});
```

### Edge Case Test Matrix

| Coefficient a | Coefficient b | Coefficient c | Expected Behavior |
| ------------- | ------------- | ------------- | ----------------- |
| 0             | any           | any           | Error: not quadratic |
| 1             | -5            | 6             | Two roots: 2, 3 |
| 1             | -4            | 4             | One root: 2 |
| 1             | 1             | 1             | No real roots |
| -1            | 0             | 4             | Two roots: ±2 |
| 0.001         | -0.002        | 0.001         | One root: 1 (precision test) |
| 1e10          | -2e10         | 1e10          | One root: 1 (large numbers) |
| 1e-10         | -2e-10        | 1e-10         | One root: 1 (small numbers) |

## CI/CD Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

  visual-regression:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run visual tests
        run: npm run test:e2e -- --project=chromium e2e/visual-regression.spec.ts

      - name: Upload snapshots
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: visual-diff
          path: test-results/
          retention-days: 7
```

### Package.json Test Configuration

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:all": "npm run test:run && npm run test:e2e"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4.8.0",
    "@playwright/test": "^1.40.0",
    "@testing-library/dom": "^9.3.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "@vitest/coverage-istanbul": "^1.0.0",
    "@vitest/ui": "^1.0.0",
    "vitest": "^1.0.0"
  }
}
```

## Best Practices Summary

### Unit Testing

* Use `toBeCloseTo()` for all floating-point comparisons
* Create custom matchers for domain-specific assertions
* Test boundary conditions systematically
* Parameterize tests using `it.each()` for coefficient combinations

### Component Testing

* Use Testing Library for user-centric assertions
* Test form validation as users experience it
* Avoid snapshot testing for computed math values
* Focus on behavior over implementation details

### E2E Testing

* Use visual regression for graph stability
* Implement accessibility testing with axe-core
* Test across multiple browsers and viewports
* Use data-testid attributes for reliable selectors

### Math-Specific Testing

* Document expected precision in tests
* Create utilities for floating-point comparison
* Test extreme values (very large, very small, negative)
* Verify mathematical properties (quadratic formula, vertex formula)
