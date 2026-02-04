<script lang="ts">
	import { renderMath, formatQuadraticEquation, formatQuadraticFormula } from '$lib/utils/katex';
	import type { QuadraticResult } from '$lib/quadratic/types';

	interface Props {
		a: number;
		b: number;
		c: number;
		result: QuadraticResult;
	}

	let { a, b, c, result }: Props = $props();

	let equationHtml = $derived(renderMath(formatQuadraticEquation(a, b, c)));
	let formulaHtml = $derived(renderMath(formatQuadraticFormula(a, b, c)));
</script>

<div class="equation-display">
	<div role="math" aria-label="Quadratic equation">
		{@html equationHtml}
	</div>

	<div role="math" aria-label="Quadratic formula applied">
		{@html formulaHtml}
	</div>

	<div class="results">
		<p><strong>Discriminant:</strong> {result.discriminant.toFixed(2)}</p>
		<p><strong>Root type:</strong> {result.rootType}</p>
		{#if result.roots}
			<p><strong>Roots:</strong> x = {result.roots.map((r) => r.toFixed(2)).join(', ')}</p>
		{:else}
			<p><strong>Roots:</strong> Complex (no real solutions)</p>
		{/if}
	</div>
</div>

<style>
	.equation-display {
		padding: 1rem;
		background: #f8f9fa;
		border-radius: 8px;
		max-width: 100%;
		overflow-x: auto;
	}

	.equation-display > [role='math'] {
		max-width: 100%;
		overflow-x: auto;
		-webkit-overflow-scrolling: touch;
	}

	/* Scale down KaTeX on narrow screens */
	@media (max-width: 480px) {
		.equation-display :global(.katex) {
			font-size: 0.85em;
		}
	}

	@media (max-width: 360px) {
		.equation-display :global(.katex) {
			font-size: 0.75em;
		}
	}

	.results {
		margin-top: 1rem;
		padding-top: 1rem;
		border-top: 1px solid #ddd;
	}
</style>
