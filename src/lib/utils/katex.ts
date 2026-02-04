import katex from 'katex';

export function renderMath(latex: string, displayMode = true): string {
	return katex.renderToString(latex, {
		displayMode,
		output: 'htmlAndMathml',
		throwOnError: false
	});
}

export function formatQuadraticEquation(a: number, b: number, c: number): string {
	let equation = '';

	// Handle a coefficient
	if (a === 1) {
		equation = 'x^2';
	} else if (a === -1) {
		equation = '-x^2';
	} else {
		equation = `${a}x^2`;
	}

	// Handle b coefficient
	if (b !== 0) {
		if (b === 1) {
			equation += ' + x';
		} else if (b === -1) {
			equation += ' - x';
		} else if (b > 0) {
			equation += ` + ${b}x`;
		} else {
			equation += ` - ${Math.abs(b)}x`;
		}
	}

	// Handle c coefficient
	if (c !== 0) {
		if (c > 0) {
			equation += ` + ${c}`;
		} else {
			equation += ` - ${Math.abs(c)}`;
		}
	}

	return equation + ' = 0';
}

export function formatQuadraticFormula(a: number, b: number, c: number): string {
	const discriminant = b * b - 4 * a * c;
	const negB = -b;
	const denominator = 2 * a;

	// Split formula onto two lines to prevent horizontal overflow on mobile
	return `\\begin{aligned}
x &= \\frac{${negB} \\pm \\sqrt{${b}^2 - 4(${a})(${c})}}{2(${a})} \\\\[0.5em]
&= \\frac{${negB} \\pm \\sqrt{${discriminant.toFixed(2)}}}{${denominator}}
\\end{aligned}`;
}
