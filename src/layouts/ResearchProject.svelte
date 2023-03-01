<script>
  import { onMount } from 'svelte'
  import SEO from "../components/SEO.svelte";
  import { Layout } from '../stores/layout.js'
  import Menu from "../components/Menu/Menu.svelte"
  import CaptionedImage from "../components/Images/CaptionedImage.svelte"
  
  export let title
  export let description;
  export let layout
  export let date
  export let authors
  export let highlight_image
  export let highlight_caption
  export let slug
  let seo_title = title
  let seo_description = description
  let seo_url = '/research/'+slug
  let seo_image = '/images/'+highlight_image

  console.log('seo',
    seo_title,
    seo_description,
    seo_url,
    seo_image
  )

  const methods = {
    authorString: authors => {
      if (authors.length === 1)
        return authors[0]
      else if (authors.length === 2)
        return authors[0] + ' and ' + authors[1]
      else {
        let s = ''
        for (var i = 0; i < authors.length; i++) {
          if (i < authors.length-2)
            s = s + authors[i] + ', '
          else
            s = s + ' and ' + authors[i]
        }
        return s
      }
    }
  }

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[Research]', $Layout.page, layout)
  })
</script>

<!-- <SEO
  title={seo_title}
  description={seo_description}
  url={seo_url}
  image={seo_image}
  /> -->

<svelte:head>

  <!-- Page -->
  <title>{seo_title} | Intelligent Instruments Lab</title>
  <meta name="description" content={seo_description}/>

  <!-- Open Graph -->
  <meta property="og:url" content={"https://iil.is" + seo_url}>
  <meta property="og:title" content={seo_title + " | Intelligent Instruments Lab"}>
  <meta property="og:description" content={seo_description}>
  <meta property="og:image" content={"https://iil.is" + seo_image}>
  <meta property="og:type" content="website">

  <!-- Twitter -->
  <meta name="twitter:site" content="@_iil_is">
  <meta property="twitter:url" content={"https://iil.is" + seo_url}>
  <meta property="twitter:title" content={seo_title + " | Intelligent Instruments Lab"}>
  <meta property="twitter:description" content={seo_description}>
  <meta property="twitter:image" content={"https://iil.is" + seo_image}>
  <meta property="twitter:card" content="summary_large_image">

</svelte:head>

{#if $Layout.menu}
  <Menu/>
{:else}
  <div class="bg-primary border-dashed border-secondary border-4">
    <div class="p-4 sm:p-6 mt-2
      font-hauser uppercase 
      text-md sm:text-lg text-white">
      <a href="/research">{'<-'} Back to Research</a>
    </div>
    <div class="
      px-4 md:px-10 sm:px-12 md:px-14
      max-w-3xl">
      <h1 class="font-hauser text-secondary
        text-4xl sm:text-5xl md:text-6xl 
        mt-2 mb-2 sm:mb-4">
        {title}
      </h1>
      <div class="px-2 sm:px-4 pt-4 pb-2 sm:pb-0
        text-primary-700">
        <CaptionedImage src={highlight_image} alt={highlight_caption} caption={highlight_caption}/>
        <div class="font-hauser uppercase">
          <div class="text-md sm:text-lg md:text-xl">
            {description}<br>
          </div>
          <div class="text-sm sm:text-md md:text-lg mt-2">
            By {methods.authorString(authors)}
          </div>
        </div>
      </div>
      <div class="p-2 sm:p-4"><slot/></div>
    </div>
    <div class="p-4 sm:p-6 mt-2
      font-hauser uppercase 
      text-md sm:text-lg text-white">
      <a href="/research">{'<-'} Back to Research</a>
    </div>
  </div>
{/if}
