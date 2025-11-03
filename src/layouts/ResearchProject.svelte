<script>
  import { onMount } from 'svelte'
  import { Layout } from '../stores/layout.js'
  import SEO from "../components/SEO.svelte";
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
  export let redirect
  let seo_title = title
  let seo_description = description
  let seo_url = '/research/'+slug
  let seo_image = '/images/'+highlight_image

  const methods = {
    authorString: authors => {
      if (typeof redirect !== 'undefined' && redirect !== null && redirect !== '')
        return ''
      if (authors.length === 1)
        return authors[0]
      else if (authors.length === 2)
        return authors[0] + ' and ' + authors[1]
      else {
        let s = ''
        for (var i = 0; i < authors.length; i++) {
          if (i < authors.length-1)
            s = s + authors[i] + ', '
          else
            s = s + ' and ' + authors[i]
        }
        return s
      }
    }
  }

  const checkRedirect = r => {
    if (typeof r !== 'undefined' && r !== null && r !== '')
      window.location.href = r
  }

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[Research]', $Layout.page, layout)
    checkRedirect(redirect)
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
          <a href="/research">{'<-'} Back to Research</a>
        </div>
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
        <div class="mt-6
          font-hauser uppercase 
          text-md sm:text-lg text-white">
          <a href="/research">{'<-'} Back to Research</a>
        </div>
      </div>
    </div>
  </div>
{/if}
