<script lang="ts">
  import type { SolutionSteps } from '$lib/math/types';
  import Math from './Math.svelte';
  import { QUADRATIC_FORMULA, VERTEX_X, DISCRIMINANT } from '$lib/math/formulas';

  export let steps: SolutionSteps | null = null;

  // Sections for display
  const sections = [
    { key: 'vertex', title: 'Finding the Vertex', formula: VERTEX_X },
    { key: 'yIntercept', title: 'Finding the Y-Intercept', formula: null },
    { key: 'discriminant', title: 'Calculating the Discriminant', formula: DISCRIMINANT },
    { key: 'xIntercepts', title: 'Finding X-Intercepts', formula: null },
    { key: 'quadraticFormula', title: 'Quadratic Formula', formula: QUADRATIC_FORMULA }
  ] as const;
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
  <h2 class="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Solution</h2>

  {#if steps}
    {#each sections as section}
      <details class="mb-4 border border-gray-200 rounded-lg overflow-hidden" open>
        <summary class="px-4 py-3 bg-gray-50 cursor-pointer font-semibold select-none hover:bg-gray-100">
          {section.title}
          {#if section.formula}
            <span class="ml-2 font-normal text-gray-600">
              <Math latex={section.formula} />
            </span>
          {/if}
        </summary>
        <ol class="p-4 m-0 list-decimal list-inside space-y-2">
          {#each steps[section.key] as step}
            <li class="text-gray-700 font-mono text-sm">{step}</li>
          {/each}
        </ol>
      </details>
    {/each}
  {:else}
    <p class="text-gray-500 italic">Enter valid coefficients to see the solution steps.</p>
  {/if}
</div>
