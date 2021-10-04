<script>
  import {onMount} from 'svelte'
  import { seo } from "../stores/seo.js";
  import { Layout } from '../stores/layout.js'
  import Menu from "../components/Menu/Menu.svelte"

  export let title
  export let description
  export let pitch
  export let layout

  $seo = {
    title: title,
    description: description,
  };

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[Home]', $Layout.page, layout)
  })
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

{#if $Layout.menu}
  <Menu/>
{:else}
<div class="bg-secondary h-screen">
  <div class="grid grid-cols-6 max-w-screen-xl">
    <div class="hidden sm:hidden md:block col-span-2">
      <Menu/>
    </div>
    <div class="col-span-4 px-20 py-6">
      <p class="text-xl pr-16">{pitch}</p>
      <!-- TODO: Carousel -->
      <!-- TODO: CtA's -->
    </div>
  </div>
</div>
{/if}
