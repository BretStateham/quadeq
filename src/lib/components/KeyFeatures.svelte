<script lang="ts">
  import type { QuadraticSolution } from '$lib/math/types';
  import { roundForDisplay } from '$lib/math/quadratic';

  export let solution: QuadraticSolution | null = null;
</script>

<div class="key-features">
  <h2>Key Features</h2>

  {#if solution}
    <dl class="features-list">
      <div class="feature">
        <dt>Equation</dt>
        <dd>
          y = {solution.coefficients.a}x² + {solution.coefficients.b}x + {solution.coefficients.c}
        </dd>
      </div>

      <div class="feature">
        <dt>Vertex</dt>
        <dd>
          ({roundForDisplay(solution.vertex.x, 3)}, {roundForDisplay(solution.vertex.y, 3)})
        </dd>
      </div>

      <div class="feature">
        <dt>Axis of Symmetry</dt>
        <dd>x = {roundForDisplay(solution.axisOfSymmetry, 3)}</dd>
      </div>

      <div class="feature">
        <dt>Y-Intercept</dt>
        <dd>(0, {solution.yIntercept.y})</dd>
      </div>

      <div class="feature">
        <dt>X-Intercepts</dt>
        <dd>
          {#if solution.xIntercepts}
            {#each solution.xIntercepts as intercept, i}
              ({roundForDisplay(intercept.x, 3)}, 0){#if i < solution.xIntercepts.length - 1}, {/if}
            {/each}
          {:else}
            <span class="no-intercepts">No real x-intercepts</span>
          {/if}
        </dd>
      </div>

      <div class="feature">
        <dt>Discriminant</dt>
        <dd>
          {roundForDisplay(solution.discriminant, 3)}
          <span class="discriminant-info">
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

      <div class="feature">
        <dt>Opens</dt>
        <dd>
          {solution.opensUpward ? 'Upward ↑' : 'Downward ↓'}
          <span class="vertex-type">
            (vertex is {solution.opensUpward ? 'minimum' : 'maximum'})
          </span>
        </dd>
      </div>
    </dl>
  {:else}
    <p class="no-solution">Enter valid coefficients to see key features.</p>
  {/if}
</div>

<style>
  .key-features {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
  }

  h2 {
    margin-bottom: 1rem;
  }

  .features-list {
    display: grid;
    gap: 0.75rem;
  }

  .feature {
    display: grid;
    grid-template-columns: 140px 1fr;
    gap: 0.5rem;
    padding: 0.5rem;
    background: white;
    border-radius: 4px;
    border: 1px solid #e5e7eb;
  }

  dt {
    font-weight: 600;
    color: #374151;
  }

  dd {
    margin: 0;
    font-family: 'Courier New', monospace;
  }

  .discriminant-info,
  .vertex-type {
    font-size: 0.875rem;
    color: #6b7280;
    font-family: sans-serif;
  }

  .no-intercepts {
    color: #9ca3af;
    font-style: italic;
    font-family: sans-serif;
  }

  .no-solution {
    color: #6b7280;
    font-style: italic;
  }
</style>
