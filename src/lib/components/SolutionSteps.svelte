<script lang="ts">
  import { onMount } from 'svelte';
  import type { SolutionSteps } from '$lib/math/types';

  export let steps: SolutionSteps | null = null;

  onMount(async () => {
    // Dynamically import KaTeX CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css';
    document.head.appendChild(link);
  });

  // Sections for display
  const sections = [
    { key: 'vertex', title: 'Finding the Vertex' },
    { key: 'yIntercept', title: 'Finding the Y-Intercept' },
    { key: 'discriminant', title: 'Calculating the Discriminant' },
    { key: 'xIntercepts', title: 'Finding X-Intercepts' },
    { key: 'quadraticFormula', title: 'Quadratic Formula' }
  ] as const;
</script>

<div class="solution-steps">
  <h2>Step-by-Step Solution</h2>

  {#if steps}
    {#each sections as section}
      <details class="step-section" open>
        <summary>{section.title}</summary>
        <ol class="steps-list">
          {#each steps[section.key] as step}
            <li>{step}</li>
          {/each}
        </ol>
      </details>
    {/each}
  {:else}
    <p class="no-steps">Enter valid coefficients to see the solution steps.</p>
  {/if}
</div>

<style>
  .solution-steps {
    padding: 1rem;
  }

  h2 {
    margin-bottom: 1rem;
  }

  .step-section {
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }

  summary {
    padding: 0.75rem 1rem;
    background: #f8f9fa;
    cursor: pointer;
    font-weight: 600;
    user-select: none;
  }

  summary:hover {
    background: #e9ecef;
  }

  .steps-list {
    padding: 1rem;
    margin: 0;
    list-style-position: inside;
  }

  .steps-list li {
    margin-bottom: 0.5rem;
    font-family: 'Courier New', monospace;
  }

  .no-steps {
    color: #6b7280;
    font-style: italic;
  }
</style>
