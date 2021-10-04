<script>
  import { Layout } from '../../stores/layout.js'

  export let url
  export let label
  export let active

  const onclick = e => {
    $Layout.menu = false
  }

</script>

<style>
  .link {
    @apply font-hauser uppercase text-4xl py-2 tracking-wider text-primary-700;
  }
</style>

{#if active}
<a class="link"
  href='#'
  on:click|preventDefault={onclick}>
  {label}
</a>
{:else}
<a
  class="link"
  href={url}>
  {label}
</a>
{/if}
