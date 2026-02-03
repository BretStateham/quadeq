# Quadratic Equation Visualizer

An interactive web application for solving and visualizing quadratic equations. Enter coefficients for ax² + bx + c and see real-time graphing, step-by-step solutions using the quadratic formula, and key features of the parabola.

![Quadratic Equation Visualizer](images/QuadraticEquazionVisualizer.jpg)

Built with SvelteKit, TypeScript, Tailwind CSS, KaTeX for math rendering, and function-plot for graphing.

## Setup

```sh
npm install
npx playwright install  # Required for E2E tests
```

## Testing

```sh
npm test              # Run unit tests in watch mode
npm run test:unit     # Run unit tests once
npm run test:coverage # Run unit tests with coverage report
npm run test:e2e      # Run Playwright E2E tests
npm run test:e2e:ui   # Run Playwright tests with UI
```

## Development

```sh
npm run dev           # Start dev server
npm run dev -- --open # Start and open in browser
```

## Production Build

```sh
npm run build   # Create production build
npm run preview # Preview production build locally
```
