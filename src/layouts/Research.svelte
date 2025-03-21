<script>
  import { paginate, PaginationNav } from "svelte-paginate";
  import { onMount } from 'svelte'
  import { Layout } from '../stores/layout.js'
  import SEO from "../components/SEO.svelte"
  import Menu from "../components/Menu/Menu.svelte"

  export let projects
  export let layout = "research"
  export let title = "Research"
  let seo_title = "Research"
  let seo_description = "Research Projects from the Intelligent Instruments Lab."
  let seo_url = '/research'
  let seo_image = '/seo/stacco.jpg'

  let items = projects
  
  // filter out items that include property 'redirect':
  items = items.filter(i => !i.metadata.redirect)

  $: featured = {
    size: 100, page: 1,
    items: items//.filter(i=>i.metadata.featured === true)
  }
  $: all = {
    size: 4, page: 1,
    items: items
  }
  
  $: featuredPaginated = paginate({ items: featured.items, pageSize: featured.size, currentPage: featured.page });
  $: allPaginated = paginate({ items: all.items, pageSize: all.size, currentPage: all.page });
  
  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[Research]', $Layout.page, layout)
    console.log(featured)
  })

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
<center>
  <div class="bg-primary border-dashed border-secondary border-4">
    <main class="p-6 sm:p-12 md:p-14 max-w-5xl">
      <article>
        <h1 class="font-hauser text-secondary
          text-4xl sm:text-5xl md:text-6xl 
          mb-4">
          {title}
        </h1>
        <div class="mt-4 sm:mt-8 p-2">
          <p>Information about some of the key research projects at the Intelligent Instruments Lab.</p>
        </div>
        <div class="mt-2 sm:p-2">
          <!-- <h2 class="font-hauser text-secondary
            text-2xl sm:text-3xl md:text-4xl 
            mb-8">Featured</h2> -->
          <div class="grid grid-flow-row grid-cols-1 md:grid-cols-2">
            {#each featuredPaginated as {
              metadata: {
                title, 
                date, 
                description, 
                authors,
                highlight_image,
                highlight_caption
              },
              path
            }}
              <!-- border-dashed border-2 -->
              <div class="
                border-primary-100 hover:border-white
                shadow-sm hover:shadow-md rounded-sm
                w-64 sm:w-72 lg:w-96 
                h-64 sm:h-72 lg:h-96
                mb-8 sm:mb-12 lg:mb-16">
                <div class="bg-primary-100">
                  <a sveltekit:prefetch href={'research/'+path.replace(/\.[^/.]+$/, "")}>
                    <div
                      class="bg-cover bg-no-repeat bg-center
                      h-64 sm:h-72 lg:h-96
                      flex flex-wrap content-end"
                      style={"background-image: url(images/"+highlight_image+");"}>
                      <div class="
                        px-4 py-4
                        w-64 sm:w-72 lg:w-96
                        grid grid-rows-1 pb-8
                        bg-primary-900 bg-opacity-75
                        hover:bg-primary-800 hover:bg-opacity-50
                        ">
                        <div>
                          <h2 class="text-2xl mt-2 text-white">{title}</h2>
                          <div class="text-sm font-hauser text-white uppercase mt-4">
                            {methods.authorString(authors)}
                          </div>
                          <p class="text-sm mt-2 text-white">{description}</p>
                        </div>
                        <!-- <div class="self-end grid grid-cols-1 text-white">
                          <div class="text-sm font-hauser uppercase self-end text-right">
                            {methods.authorString(authors)}
                          </div>
                        </div> -->
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            {/each}
          </div>
          <div class="mx-auto">
            <!-- Defined in style.css -->
            {#if featured.items.length > featured.size}
              <PaginationNav
                totalItems={featured.items.length}
                pageSize={featured.size}
                currentPage={featured.page}
                limit={1}
                showStepOptions={true}
                on:setPage={(e) => (featured.page = e.detail.page)}
              />
            {/if}
          </div>
        </div>
        <!-- <div class="mt-4 sm:px-2 py-2 mb-12">
          <h2 class="font-hauser text-secondary
            text-2xl sm:text-3xl md:text-4xl 
            mb-8">All Projects</h2>
          <hr class="border-primary-500 border-dashed border-1">
          <div class="article-list">
            {#each allPaginated as { metadata: { title, date, description, authors }, path }}
              <div class="py-2 sm:p-4 hover:bg-primary-300">
                <a sveltekit:prefetch href={'research/'+path.replace(/\.[^/.]+$/, "")}>
                  <div class="grid grid-cols-10">
                    <div class="col-span-10 sm:col-span-10">
                      <div class="text-xl text-primary-900">{title}</div>
                      <div class="text-md text-primary-800 mt-2">{description}</div>
                      <div class="
                        col-span-6 sm:col-span-2
                        mt-2 mb-2 sm:mt-2
                        text-xs sm:text-sm
                        font-hauser uppercase text-primary-700">
                        {methods.authorString(authors)}
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <hr class="border-primary-500 border-dashed border-1">
            {/each}
          </div>
          <div class="mx-auto">
            {#if all.items.length > all.size}
              <PaginationNav
                totalItems={all.items.length}
                pageSize={all.size}
                currentPage={all.page}
                limit={1}
                showStepOptions={true}
                on:setPage={(e) => (all.page = e.detail.page)}
              />
            {/if}
          </div>
        </div> -->
      </article>
    </main>
  </div>
  </center>
{/if}
