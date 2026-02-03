export interface Coefficients {
  a: number;
  b: number;
  c: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface SolutionSteps {
  vertex: string[];
  yIntercept: string[];
  discriminant: string[];
  xIntercepts: string[];
  quadraticFormula: string[];
}

export interface QuadraticSolution {
  coefficients: Coefficients;
  vertex: Point;
  axisOfSymmetry: number;
  yIntercept: Point;
  xIntercepts: Point[] | null;
  discriminant: number;
  opensUpward: boolean;
  steps: SolutionSteps;
}
