<script lang="ts">
  import { Label } from 'bits-ui';

  interface Props {
    id: string;
    label: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    error?: string;
    onValueChange?: (value: number) => void;
  }

  let {
    id,
    label,
    value = $bindable(),
    min,
    max,
    step = 1,
    error,
    onValueChange
  }: Props = $props();

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = parseFloat(target.value);
    if (!isNaN(newValue)) {
      value = newValue;
      onValueChange?.(newValue);
    }
  }
</script>

<div class="space-y-1">
  <Label.Root for={id} class="block text-sm font-medium text-gray-700">
    {label}
  </Label.Root>
  <input
    type="number"
    {id}
    {value}
    {min}
    {max}
    {step}
    oninput={handleInput}
    class="w-full px-3 py-2 min-h-[44px] border rounded-md transition-colors
           {error
      ? 'border-error bg-error-light/10 focus:ring-error/20'
      : 'border-gray-300 focus:border-primary focus:ring-primary/20'}
           focus:outline-none focus:ring-2"
    aria-invalid={error ? 'true' : undefined}
    aria-describedby={error ? `${id}-error` : undefined}
  />
  {#if error}
    <p id="{id}-error" class="text-sm text-error" role="alert">{error}</p>
  {/if}
</div>
