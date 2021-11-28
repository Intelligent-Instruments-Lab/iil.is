<script>
  import { Layout } from '../../stores/layout.js'

  export let page

  const onclick = e => {
    $Layout.menu = false
  }

</script>

<style>
  .default {
    @apply font-hauser uppercase 
    text-xl sm:text-xl lg:text-3xl 
    py-2 
    tracking-wider 
    text-primary-700;
  }
  .special {
    @apply font-hauser uppercase 
    text-xl sm:text-xl lg:text-3xl 
    py-2 
    tracking-wider 
    text-primary-700;
  }
</style>

{#if page.style === "default"}
  {#if page.url.slice(1) === $Layout.page}
    <a class="default"
      href='#'
      on:click|preventDefault={onclick}>
      {page.label}
    </a>
  {:else}
    <a
      class="default"
      href={page.url}>
      {page.label}
    </a>
  {/if}
{:else if page.style === "special"}
  {#if page.url.slice(1) === $Layout.page}
    <a class="special"
      href='#'
      on:click|preventDefault={onclick}>
      {page.label}
    </a>
  {:else}
    <a
      class="special"
      href={page.url}>
      {page.label}
    </a>
  {/if}  
{/if}
