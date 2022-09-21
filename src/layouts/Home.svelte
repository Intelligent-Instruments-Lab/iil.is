<script>
  import { seo } from "../stores/seo.js";
  import { onMount } from 'svelte'
  import { Layout } from '../stores/layout.js'
  import Menu from "../components/Menu/Menu.svelte"
  import CTARow from "../components/Buttons/CTARow.svelte"
  import YT from '../components/Video/EmbedYouTube.svelte'

  export let title
  export let description
  export let pitch
  export let layout
  export let hero_image
  export let hero_caption
  export let hero_slug

  $seo.title = title
  $seo.description = description
  $seo.url = '/'
  $seo.image = '/seo/sean_coils.jpg'

  let cta_links = [
    { url: "/research", label: "Learn More", theme: "dark", target: "_self" }
  ]

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[Home]', $Layout.page, layout)
  })
</script>

{#if $Layout.menu}
  <Menu/>
{:else}
<div class="bg-secondary h-screen">
  <div class="grid grid-cols-8 max-w-screen-xl">
    <div class="hidden md:block col-span-3">
      <Menu/>
    </div>
    <!-- <div class="
      sm:ml-4 md:ml-12
      max-w-xl
      col-span-8 md:col-span-5
      px-12 md:px-0 
      py-0 md:py-6">
      <p class="text-md md:text-xl md:pr-16 text-primary-700">{pitch}</p>
      <div class=" w-5/6 mt-8">
        <a href={hero_slug} title={hero_caption}>
          <img class="shadow-sm" src={'./images/'+hero_image} alt={hero_caption}>
          <p class="text-sm text-primary-500 mt-4">{hero_caption}</p>
        </a>
      </div>
      <div class="mt-10">
        <CTARow links={cta_links}/>
      </div>
    </div> -->
    <div class="
      sm:ml-4 md:ml-12
      max-w-xl
      col-span-8 md:col-span-5
      px-12 md:px-0 
      py-0 md:py-6">
      <div class="text-md md:text-xl md:pr-16 text-primary-700">
        <p>{pitch}</p>
      </div>
      <div class=" w-5/6 mt-8">
        <a href={hero_slug} title={hero_caption}>
          <img class="shadow-sm" src={'./images/'+hero_image} alt={hero_caption}>
          <p class="text-sm text-primary-500 mt-4">{hero_caption}</p>
        </a>
      </div>
      <div class="mt-10">
        <CTARow links={cta_links}/>
      </div>
    </div>
  </div>
</div>
{/if}
