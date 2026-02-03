<script lang="ts">
  import type { QuadraticSolution } from '$lib/math/types';
  import { roundForDisplay } from '$lib/math/quadratic';
  import Math from './Math.svelte';

  export let solution: QuadraticSolution | null = null;
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
  <h2 class="text-lg font-semibold text-gray-900 mb-4">Key Features</h2>

  {#if solution}
    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div class="p-3 bg-gray-50 rounded-md border border-gray-100">
        <dt class="text-sm font-medium text-gray-500">Equation</dt>
        <dd class="mt-1 text-gray-900">
          <Math latex={`y = ${solution.coefficients.a}x^2 + ${solution.coefficients.b}x + ${solution.coefficients.c}`} />
        </dd>
      </div>

      <div class="p-3 bg-gray-50 rounded-md border border-gray-100">
        <dt class="text-sm font-medium text-gray-500">Vertex</dt>
        <dd class="mt-1 text-gray-900">
          <Math latex={`(${roundForDisplay(solution.vertex.x, 3)}, ${roundForDisplay(solution.vertex.y, 3)})`} />
        </dd>
      </div>

      <div class="p-3 bg-gray-50 rounded-md border border-gray-100">
        <dt class="text-sm font-medium text-gray-500">Axis of Symmetry</dt>
        <dd class="mt-1 text-gray-900">
          <Math latex={`x = ${roundForDisplay(solution.axisOfSymmetry, 3)}`} />
        </dd>
      </div>

      <div class="p-3 bg-gray-50 rounded-md border border-gray-100">
        <dt class="text-sm font-medium text-gray-500">Y-Intercept</dt>
        <dd class="mt-1 text-gray-900">
          <Math latex={`(0, ${solution.yIntercept.y})`} />
        </dd>
      </div>

      <div class="p-3 bg-gray-50 rounded-md border border-gray-100">
        <dt class="text-sm font-medium text-gray-500">X-Intercepts</dt>
        <dd class="mt-1 text-gray-900">
          {#if solution.xIntercepts}
            {#each solution.xIntercepts as intercept, i}
              <Math latex={`(${roundForDisplay(intercept.x, 3)}, 0)`} />{#if i < solution.xIntercepts.length - 1}<span class="mx-1">,</span>{/if}
            {/each}
          {:else}
            <span class="text-gray-400 italic">No real x-intercepts</span>
          {/if}
        </dd>
      </div>

      <div class="p-3 bg-gray-50 rounded-md border border-gray-100">
        <dt class="text-sm font-medium text-gray-500">Discriminant</dt>
        <dd class="mt-1 text-gray-900">
          <Math latex={`\\Delta = ${roundForDisplay(solution.discriminant, 3)}`} />
          <span class="text-sm text-gray-500 ml-2">
            {#if solution.discriminant > 0}
              (two real roots)
            {:else if solution.discriminant === 0}
              (one repeated root)
            {:else}
              (no real roots)
            {/if}
          </span>
        </dd>
      </div>

      <div class="p-3 bg-gray-50 rounded-md border border-gray-100 sm:col-span-2">
        <dt class="text-sm font-medium text-gray-500">Opens</dt>
        <dd class="mt-1 text-gray-900">
          {solution.opensUpward ? 'Upward ↑' : 'Downward ↓'}
          <span class="text-sm text-gray-500 ml-2">
            (vertex is {solution.opensUpward ? 'minimum' : 'maximum'})
          </span>
        </dd>
      </div>
    </dl>
  {:else}
    <p class="text-gray-500 italic">Enter valid coefficients to see key features.</p>
  {/if}
</div>
