<script lang="ts">
  import katex from 'katex';
  import 'katex/dist/katex.min.css';

  interface Props {
    latex: string;
    displayMode?: boolean;
  }

  let { latex, displayMode = false }: Props = $props();

  const html = $derived(
    katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      output: 'htmlAndMathml'
    })
  );
</script>

<span class="math" class:display={displayMode}>{@html html}</span>

<style>
  .math {
    font-size: inherit;
  }
  .display {
    display: block;
    text-align: center;
    margin: 1rem 0;
  }
</style>
