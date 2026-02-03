<script lang="ts">
  import type { Coefficients } from '$lib/math/types';

  export let coefficients: Coefficients = { a: 1, b: 0, c: 0 };
  export let error: string = '';

  $: error = coefficients.a === 0 ? 'Coefficient a cannot be zero for a quadratic equation' : '';
</script>

<div class="coefficient-input">
  <h2>Enter Coefficients</h2>
  <p class="equation-form">y = ax² + bx + c</p>

  <div class="input-group">
    <label for="coef-a">
      a =
      <input
        type="number"
        id="coef-a"
        name="a"
        bind:value={coefficients.a}
        step="any"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? 'error-a' : undefined}
      />
    </label>
    {#if error}
      <span id="error-a" class="error" role="alert">{error}</span>
    {/if}
  </div>

  <div class="input-group">
    <label for="coef-b">
      b =
      <input
        type="number"
        id="coef-b"
        name="b"
        bind:value={coefficients.b}
        step="any"
      />
    </label>
  </div>

  <div class="input-group">
    <label for="coef-c">
      c =
      <input
        type="number"
        id="coef-c"
        name="c"
        bind:value={coefficients.c}
        step="any"
      />
    </label>
  </div>
</div>

<style>
  .coefficient-input {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .equation-form {
    font-family: 'Times New Roman', serif;
    font-size: 1.2rem;
    font-style: italic;
    margin-bottom: 1rem;
  }

  .input-group {
    margin-bottom: 0.75rem;
  }

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }

  input {
    width: 100px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  input:focus {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }

  input[aria-invalid='true'] {
    border-color: #dc2626;
  }

  .error {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }
</style>
