<script lang="ts">
	import { renderMath } from '$lib/utils/katex';
	import type { QuadraticResult } from '$lib/quadratic/types';

	interface Props {
		a: number;
		b: number;
		c: number;
		result: QuadraticResult;
	}

	let { a, b, c, result }: Props = $props();

	let steps = $derived([
		{ label: 'Start with the quadratic equation', latex: `${a}x^2 + ${b}x + ${c} = 0` },
		{
			label: 'Apply the quadratic formula',
			latex: `x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`
		},
		{
			label: 'Substitute coefficients',
			latex: `x = \\frac{-${b} \\pm \\sqrt{${b}^2 - 4(${a})(${c})}}{2(${a})}`
		},
		{
			label: 'Calculate the discriminant',
			latex: `\\Delta = ${b}^2 - 4(${a})(${c}) = ${result.discriminant}`
		},
		result.roots
			? { label: 'Solve for x', latex: `x = ${result.roots.map((r) => r.toFixed(2)).join(', ')}` }
			: { label: 'No real solutions', latex: `\\Delta < 0 \\Rightarrow \\text{complex roots}` }
	]);
</script>

<details>
	<summary>Show step-by-step derivation</summary>
	<ol class="derivation-steps">
		{#each steps as step, i (i)}
			<li>
				<span class="step-label">{step.label}</span>
				<div role="math" aria-label={step.label}>
					{@html renderMath(step.latex)}
				</div>
			</li>
		{/each}
	</ol>
</details>

<style>
	details {
		margin-top: 1rem;
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 8px;
	}

	summary {
		cursor: pointer;
		font-weight: 600;
	}

	.derivation-steps {
		margin-top: 1rem;
		padding-left: 1.5rem;
	}

	.derivation-steps li {
		margin-bottom: 1rem;
	}

	.step-label {
		display: block;
		font-size: 0.9rem;
		color: #666;
		margin-bottom: 0.25rem;
	}
</style>
