<script>
  import { onMount } from 'svelte'
  import { Layout } from '../stores/layout.js'
  import SEO from "../components/SEO.svelte"
  import Menu from "../components/Menu/Menu.svelte"
  
  export let title
  export let description
  export let layout
  export let date
  export let slug

  let seo_title = title
  let seo_description = description
  let seo_url = '/news/'+slug
  let seo_image = '/seo/sean_coils.jpg'

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[News]', $Layout.page, layout)
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
        <div class="mb-6
          font-hauser uppercase 
          text-md sm:text-lg text-white">
          <a href="/news">{'<-'} Back to News</a>
        </div>
        <h1 class="font-hauser text-secondary
          text-4xl sm:text-5xl md:text-6xl 
          mt-2 mb-2 sm:mb-4">
          {title}
        </h1>
        <div class="px-2 sm:px-4 pt-4 pb-2 sm:pb-0
          font-hauser uppercase 
          text-sm sm:text-md text-primary-700
          ">
          {description}<br>{new Date(date).toDateString()}
        </div>
        <div class="p-2 sm:p-4"><slot/></div>
        <div class="mb-6
          font-hauser uppercase 
          text-md sm:text-lg text-white">
          <a href="/news">{'<-'} Back to News</a>
        </div>
      </div>
    </div>
  </div>
{/if}
