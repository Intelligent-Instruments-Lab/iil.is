<script>
  import { seo } from "../stores/seo.js";
  import { onMount } from 'svelte'
  import { Layout } from '../stores/layout.js'
  import Menu from "../components/Menu/Menu.svelte"

  export let title
  export let description
  export let layout = "openlab"
  export let date

  $seo = {
    title: title,
    description: description,
  };

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[NewsItem]', $Layout.page, layout)
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
    <a href="/openlab" class="font-hauser uppercase">Back to Open Lab</a>
    <h1 class="font-bold text-6xl mb-4">{title} - {new Date(date).toDateString()}</h1>
    <div class="">
      <slot />
    </div>
  </div>
{/if}
