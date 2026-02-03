<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import functionPlot from 'function-plot';
  import type { QuadraticSolution } from '$lib/math/types';
  import { roundForDisplay } from '$lib/math/quadratic';

  export let solution: QuadraticSolution | null = null;

  let graphContainer: HTMLDivElement;
  let resizeObserver: ResizeObserver;

  // Generate dynamic aria-label based on equation
  $: ariaLabel = solution
    ? `Graph of quadratic function f(x) = ${solution.coefficients.a}x² + ${solution.coefficients.b}x + ${solution.coefficients.c}, parabola ${solution.opensUpward ? 'opens upward' : 'opens downward'}`
    : 'Quadratic equation graph placeholder';

  function renderGraph() {
    if (!graphContainer || !solution) return;

    const { coefficients, vertex, xIntercepts, yIntercept, axisOfSymmetry } = solution;
    const { a, b, c } = coefficients;

    // Calculate appropriate domain/range
    const points = [vertex, yIntercept, ...(xIntercepts ?? [])];
    const xValues = points.map((p) => p.x);
    const yValues = points.map((p) => p.y);

    const xMin = Math.min(...xValues, -10) - 2;
    const xMax = Math.max(...xValues, 10) + 2;
    const yMin = Math.min(...yValues, -10) - 2;
    const yMax = Math.max(...yValues, 10) + 2;

    // Clear previous graph
    graphContainer.innerHTML = '';

    const annotations = [
      {
        x: axisOfSymmetry,
        text: `x = ${roundForDisplay(axisOfSymmetry, 2)}`
      }
    ];

    const scatterPoints: [number, number][] = [
      [vertex.x, vertex.y],
      [yIntercept.x, yIntercept.y]
    ];

    if (xIntercepts) {
      xIntercepts.forEach((pt) => {
        scatterPoints.push([pt.x, pt.y]);
      });
    }

    functionPlot({
      target: graphContainer,
      width: graphContainer.clientWidth,
      height: 400,
      grid: true,
      xAxis: {
        label: 'x',
        domain: [xMin, xMax]
      },
      yAxis: {
        label: 'y',
        domain: [yMin, yMax]
      },
      data: [
        {
          fn: `${a}*x^2 + ${b}*x + ${c}`,
          graphType: 'polyline',
          color: '#2563eb'
        },
        {
          points: scatterPoints,
          fnType: 'points',
          graphType: 'scatter',
          color: '#dc2626'
        }
      ],
      annotations
    });
  }

  onMount(() => {
    renderGraph();

    resizeObserver = new ResizeObserver(() => {
      renderGraph();
    });

    resizeObserver.observe(graphContainer);
  });

  $: if (solution && graphContainer) {
    renderGraph();
  }

  onDestroy(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
  <h2 class="text-lg font-semibold text-gray-900 mb-4">Graph</h2>
  {#if solution}
    <div
      bind:this={graphContainer}
      class="w-full min-h-[400px] border border-gray-200 rounded-lg overflow-hidden"
      role="img"
      aria-label={ariaLabel}
    ></div>
  {:else}
    <div class="w-full h-[400px] flex items-center justify-center bg-gray-50 rounded-lg text-gray-500">
      <p>Enter valid coefficients to see the graph</p>
    </div>
  {/if}
</div>
