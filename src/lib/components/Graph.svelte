<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import functionPlot from 'function-plot';
  import type { QuadraticSolution } from '$lib/math/types';
  import { roundForDisplay } from '$lib/math/quadratic';

  export let solution: QuadraticSolution | null = null;

  let graphContainer: HTMLDivElement;
  let resizeObserver: ResizeObserver;

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

<div class="graph-wrapper">
  <h2>Graph</h2>
  {#if solution}
    <div
      bind:this={graphContainer}
      class="graph-container"
      role="img"
      aria-label="Parabola graph showing the quadratic equation"
    ></div>
  {:else}
    <div class="graph-placeholder">
      <p>Enter valid coefficients to see the graph</p>
    </div>
  {/if}
</div>

<style>
  .graph-wrapper {
    width: 100%;
  }

  .graph-container {
    width: 100%;
    min-height: 400px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }

  .graph-placeholder {
    width: 100%;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f3f4f6;
    border-radius: 8px;
    color: #6b7280;
  }

  h2 {
    margin-bottom: 1rem;
  }
</style>
