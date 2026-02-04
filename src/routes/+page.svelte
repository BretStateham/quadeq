<script lang="ts">
	import 'katex/dist/katex.min.css';
	import CoefficientInputs from '$lib/components/CoefficientInputs.svelte';
	import EquationDisplay from '$lib/components/EquationDisplay.svelte';
	import ParabolaGraph from '$lib/components/ParabolaGraph.svelte';
	import DerivationSteps from '$lib/components/DerivationSteps.svelte';
	import { calculateQuadratic } from '$lib/quadratic/calculations';
	import { validateCoefficients } from '$lib/quadratic/validation';

	let a = $state(1);
	let b = $state(0);
	let c = $state(-4);

	let validation = $derived(validateCoefficients({ a, b, c }));
	let result = $derived(validation.valid ? calculateQuadratic(a, b, c) : null);

	function handleCoefficientChange(coefficients: { a: number; b: number; c: number }) {
		a = coefficients.a;
		b = coefficients.b;
		c = coefficients.c;
	}
</script>

<svelte:head>
	<title>Quadratic Equation Visualizer</title>
</svelte:head>

<main>
	<h1>Quadratic Equation Visualizer</h1>
	<p class="intro">Explore how coefficients affect the shape and position of a parabola.</p>

	<div class="layout">
		<aside class="controls">
			<CoefficientInputs bind:a bind:b bind:c onchange={handleCoefficientChange} />

			{#if !validation.valid}
				<div role="alert" class="error">
					{#each validation.errors as error, i (i)}
						<p>{error}</p>
					{/each}
				</div>
			{/if}
		</aside>

		<section class="visualization">
			{#if result}
				<EquationDisplay {a} {b} {c} {result} />
				<ParabolaGraph {a} {b} {c} {result} />
				<DerivationSteps {a} {b} {c} {result} />
			{/if}

			<div role="status" aria-live="polite" class="sr-only">
				{#if result}
					The equation {a}x² + {b}x + {c} = 0
					{#if result.roots}
						has {result.roots.length === 2 ? 'two roots' : 'one repeated root'} at x = {result.roots.join(
							' and '
						)}.
					{:else}
						has no real roots.
					{/if}
				{/if}
			</div>
		</section>
	</div>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		margin-bottom: 0.5rem;
	}

	.intro {
		color: #666;
		margin-bottom: 2rem;
	}

	.layout {
		display: grid;
		grid-template-columns: 300px 1fr;
		gap: 2rem;
	}

	@media (max-width: 768px) {
		.layout {
			grid-template-columns: 1fr;
		}
	}

	/* Grid items need min-width: 0 to respect cell boundaries */
	.controls,
	.visualization {
		min-width: 0;
	}

	.error {
		margin-top: 1rem;
		padding: 1rem;
		background: #fee;
		border: 1px solid #fcc;
		border-radius: 8px;
		color: #c00;
	}

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}
</style>
