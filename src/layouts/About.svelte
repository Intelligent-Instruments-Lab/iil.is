<!-- <script context="module">
  import p from "../components/Markdown/p.svelte"

  export {p}
</script> -->

<script>
  import { seo } from "../stores/seo.js";
  import { onMount } from 'svelte'
  import { Layout } from '../stores/layout.js'
  import Menu from "../components/Menu/Menu.svelte"
  
  export let title
  export let description
  export let layout
  $seo.title = title
  $seo.description = description
  $seo.url = '/about'

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[About]', $Layout.page, layout)
  })
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

{#if $Layout.menu}
  <Menu/>
{:else}
  <div class="bg-primary border-dashed border-secondary border-4">
    <div class="
      p-10 sm:p-12 md:p-14
      max-w-3xl">
      <h1 class="font-hauser text-secondary
        text-4xl sm:text-5xl md:text-6xl 
        mb-4">
        {title}
      </h1>
      <div class="p-2 sm:p-4"><slot/></div>
    </div>
  </div>
{/if}
