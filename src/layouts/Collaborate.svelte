<!-- <script context="module">
  import p from "../components/Markdown/p.svelte"

  export {p}
</script> -->

<script>
  import { onMount } from 'svelte'
  import { Layout } from '../stores/layout.js'
  import SEO from "../components/SEO.svelte"
  import Menu from "../components/Menu/Menu.svelte"
  
  export let title;
  export let description;
  export let layout
  export let slug
  let seo_title = title
  let seo_description = description
  let seo_url = slug
  let seo_image = '/seo/stacco.jpg'

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[Collaborate]', $Layout.page, layout)
  })
</script>

<SEO
  title={seo_title}
  description={seo_description}
  url={seo_url}
  image={seo_image}
  />

{#if $Layout.menu}
  <Menu/>
{:else}
  <div class="bg-primary border-dashed border-secondary border-4">
    <div class="
      pt-10 sm:pt-12 md:pt-14
      pb-24
      grid grid-cols-12">
      <div class="col-span-1  md:col-span-2 lg:col-span-3"></div>
      <div class="col-span-10 md:col-span-8 lg:col-span-6">
        <h1 class="font-hauser text-secondary
          text-4xl sm:text-5xl md:text-6xl 
          mb-4">{title}</h1>
        <div class="p-2 sm:p-4"><slot/></div>
      </div>
      <div class="col-span-1  md:col-span-2 lg:col-span-3"></div>
    </div>
  </div>
{/if}
