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

<main class="app">
  <header>
    <h1>Quadratic Equation Visualizer</h1>
    <p class="subtitle">Enter coefficients to explore the parabola and step-by-step solutions</p>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <CoefficientInput bind:coefficients={$coefficients} error={$error} />
      <KeyFeatures solution={$solution} />
    </aside>

    <section class="main-content">
      <Graph solution={$solution} />
      <SolutionSteps steps={$solution?.steps ?? null} />
    </section>
  </div>
</main>

<style>
  .app {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: #111827;
  }

  .subtitle {
    color: #6b7280;
    font-size: 1.1rem;
  }

  .layout {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 2rem;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .main-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  @media (max-width: 900px) {
    .layout {
      grid-template-columns: 1fr;
    }

    .sidebar {
      order: -1;
    }
  }
</style>
