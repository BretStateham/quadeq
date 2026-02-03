<script lang="ts">
  import CoefficientInput from '$lib/components/CoefficientInput.svelte';
  import Graph from '$lib/components/Graph.svelte';
  import SolutionSteps from '$lib/components/SolutionSteps.svelte';
  import KeyFeatures from '$lib/components/KeyFeatures.svelte';
  import { coefficients, solution, error } from '$lib/stores/quadratic';
</script>

<svelte:head>
  <title>Quadratic Equation Visualizer</title>
  <meta name="description" content="Interactive tool to visualize and solve quadratic equations" />
</svelte:head>

<main class="min-h-screen p-4 md:p-6 lg:p-8">
  <div class="max-w-7xl mx-auto">
    <header class="text-center mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Quadratic Equation Visualizer</h1>
      <p class="text-gray-500 text-base md:text-lg">Enter coefficients to explore the parabola and step-by-step solutions</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
      <aside class="space-y-6 order-first">
        <CoefficientInput bind:coefficients={$coefficients} error={$error} />
        <KeyFeatures solution={$solution} />
      </aside>

      <section class="space-y-6" aria-live="polite" aria-atomic="false">
        <Graph solution={$solution} />
        <SolutionSteps steps={$solution?.steps ?? null} />
      </section>
    </div>
  </div>
</main>
