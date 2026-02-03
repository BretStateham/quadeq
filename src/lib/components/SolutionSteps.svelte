<script lang="ts">
  import type { SolutionSteps } from '$lib/math/types';
  import Math from './Math.svelte';
  import { QUADRATIC_FORMULA, VERTEX_X, DISCRIMINANT, AXIS_OF_SYMMETRY } from '$lib/math/formulas';

  export let steps: SolutionSteps | null = null;

  let activeSection: string | null = null;

  // Sections for display
  const sections = [
    { key: 'vertex', title: 'Vertex', formula: VERTEX_X },
    { key: 'axisOfSymmetry', title: 'Axis of Symmetry', formula: AXIS_OF_SYMMETRY },
    { key: 'yIntercept', title: 'Y-Intercept', formula: null },
    { key: 'discriminant', title: 'Discriminant', formula: DISCRIMINANT },
    { key: 'xIntercepts', title: 'X-Intercepts', formula: null },
    { key: 'quadraticFormula', title: 'Quadratic Formula', formula: QUADRATIC_FORMULA }
  ] as const;

  function toggleSection(key: string) {
    activeSection = activeSection === key ? null : key;
  }
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
  <h2 class="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Solution</h2>

  {#if steps}
    <div class="flex flex-wrap gap-2 mb-4">
      {#each sections as section}
        <button
          type="button"
          class="px-3 py-1.5 text-sm font-medium rounded-full border transition-colors
            {activeSection === section.key
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}"
          on:click={() => toggleSection(section.key)}
        >
          {section.title}
        </button>
      {/each}
    </div>

    {#if activeSection}
      {@const section = sections.find(s => s.key === activeSection)}
      {#if section}
        <div class="border border-gray-200 rounded-lg overflow-hidden">
          <div class="px-4 py-3 bg-gray-50 font-semibold">
            {section.title}
            {#if section.formula}
              <span class="ml-2 font-normal text-gray-600">
                <Math latex={section.formula} />
              </span>
            {/if}
          </div>
          <ol class="p-4 m-0 list-decimal list-inside space-y-2">
            {#each steps[section.key] as step}
              <li class="text-gray-700 text-sm"><Math latex={step} /></li>
            {/each}
          </ol>
        </div>
      {/if}
    {:else}
      <p class="text-gray-500 italic text-sm">Select a topic above to see step-by-step solution.</p>
    {/if}
  {:else}
    <p class="text-gray-500 italic">Enter valid coefficients to see the solution steps.</p>
  {/if}
</div>
