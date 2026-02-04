<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import type { QuadraticResult } from '$lib/quadratic/types';

	interface Props {
		a: number;
		b: number;
		c: number;
		result: QuadraticResult;
	}

	let { a, b, c, result }: Props = $props();
	let containerRef: HTMLDivElement;
	let functionPlot: typeof import('function-plot').default | null = null;

	async function updateGraph() {
		if (!browser || !containerRef) return;

		if (!functionPlot) {
			const module = await import('function-plot');
			functionPlot = module.default;
		}

		const annotations: { x: number; text: string }[] = [{ x: result.vertex.x, text: 'Vertex' }];

		if (result.roots) {
			result.roots.forEach((root, i) => {
				annotations.push({ x: root, text: `Root ${i + 1}` });
			});
		}

		functionPlot({
			target: containerRef,
			width: containerRef.clientWidth,
			height: 400,
			yAxis: { domain: [-10, 10] },
			xAxis: { domain: [-10, 10] },
			grid: true,
			data: [
				{
					fn: `${a}*x^2 + ${b}*x + ${c}`,
					color: '#2563eb'
				}
			],
			annotations
		});
	}

	onMount(() => {
		updateGraph();
		window.addEventListener('resize', updateGraph);
	});

	onDestroy(() => {
		if (browser) {
			window.removeEventListener('resize', updateGraph);
		}
	});

	$effect(() => {
		if (browser) {
			// Explicit dependency tracking for Svelte 5 reactivity
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			(a, b, c);
			updateGraph();
		}
	});
</script>

<figure class="parabola-graph">
	<div
		bind:this={containerRef}
		role="img"
		aria-label="Graph of the quadratic function"
		aria-describedby="graph-description"
	></div>
	<figcaption id="graph-description">
		Parabola opening {a > 0 ? 'upward' : 'downward'} with vertex at ({result.vertex.x.toFixed(2)}, {result.vertex.y.toFixed(
			2
		)}). Y-intercept at (0, {result.yIntercept.toFixed(2)}).
		{#if result.roots}
			Crossing the x-axis at x = {result.roots.map((r) => r.toFixed(2)).join(' and ')}.
		{:else}
			No x-intercepts (complex roots).
		{/if}
	</figcaption>
</figure>

<style>
	.parabola-graph {
		margin: 0;
	}

	figcaption {
		padding: 0.5rem;
		background: #f8f9fa;
		border-radius: 0 0 8px 8px;
		font-size: 0.9rem;
		color: #666;
	}
</style>
