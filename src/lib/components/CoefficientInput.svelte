<script lang="ts">
  import type { Coefficients } from '$lib/math/types';
  import Math from './Math.svelte';

  export let coefficients: Coefficients = { a: 1, b: 0, c: 0 };
  export let error: string = '';

  $: error = coefficients.a === 0 ? 'Coefficient a cannot be zero for a quadratic equation' : '';
</script>

<div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6">
  <h2 class="text-lg font-semibold text-gray-900 mb-2">Enter Coefficients</h2>
  <p class="text-gray-600 mb-4">
    <Math latex="y = ax^2 + bx + c" />
  </p>

  <div class="space-y-4">
    <div class="flex flex-col gap-1">
      <label for="coef-a" class="flex items-center gap-2 font-medium text-gray-700">
        <Math latex="a" /> =
        <input
          type="number"
          id="coef-a"
          name="a"
          bind:value={coefficients.a}
          step="any"
          class="flex-1 max-w-[120px] px-3 py-2 min-h-[44px] border rounded-md text-base
                 focus:outline-none focus:ring-2 focus:ring-primary/20
                 {error ? 'border-error bg-error-light/10 focus:border-error' : 'border-gray-300 focus:border-primary'}"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'error-a' : undefined}
        />
      </label>
      {#if error}
        <span id="error-a" class="text-sm text-error" role="alert">{error}</span>
      {/if}
    </div>

    <div class="flex flex-col gap-1">
      <label for="coef-b" class="flex items-center gap-2 font-medium text-gray-700">
        <Math latex="b" /> =
        <input
          type="number"
          id="coef-b"
          name="b"
          bind:value={coefficients.b}
          step="any"
          class="flex-1 max-w-[120px] px-3 py-2 min-h-[44px] border border-gray-300 rounded-md text-base
                 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>
    </div>

    <div class="flex flex-col gap-1">
      <label for="coef-c" class="flex items-center gap-2 font-medium text-gray-700">
        <Math latex="c" /> =
        <input
          type="number"
          id="coef-c"
          name="c"
          bind:value={coefficients.c}
          step="any"
          class="flex-1 max-w-[120px] px-3 py-2 min-h-[44px] border border-gray-300 rounded-md text-base
                 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>
    </div>
  </div>
</div>
