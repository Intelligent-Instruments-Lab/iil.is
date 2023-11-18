<script>
  import { paginate, PaginationNav } from "svelte-paginate";
  import { onMount } from 'svelte'
  import { Layout } from '../stores/layout.js'
  import SEO from "../components/SEO.svelte"
  import Menu from "../components/Menu/Menu.svelte"

  export let items

  let layout = "news"
  let title = "News"
  let description = "News about the Intelligent Instruments Lab"
  let seo_title = title
  let seo_description = description
  let seo_url = '/news'
  let seo_image = '/seo/stacco.jpg'

  $: featured = {
    size: 2, page: 1,
    items:
      items
        .filter(i=>i.metadata.featured === true)
        .sort((fst,snd)=>new Date(fst.metadata.date) - new Date(snd.metadata.date))
        .reverse()
  }
  $: all = {
    size: 10, page: 1,
    items:
      items.sort((fst,snd)=>new Date(fst.metadata.date) - new Date(snd.metadata.date))
      .reverse()
  }

  $: featuredPaginated = paginate({ items: featured.items, pageSize: featured.size, currentPage: featured.page });
  $: allPaginated = paginate({ items: all.items, pageSize: all.size, currentPage: all.page });


  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[News]', $Layout.page, layout)
  })

  const methods = {
    dayMonth: d => {
      d = new Date(d)
      const options = { year: 'numeric',  month: 'short', day: 'numeric' };
      return d.toLocaleDateString('en-US', options)
      // return (d.getDate().toString()+'.'+d.getMonth().toString())
    },
    dateString: d => {
      return new Date(d).toDateString().slice(-11)
    },
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
    <main class="p-10 sm:p-12 md:p-14 max-w-3xl">
      <article>
        <h1 class="font-hauser text-secondary
          text-4xl sm:text-5xl md:text-6xl 
          mb-4">
          {title}
        </h1>
        <div class="mt-4 sm:mt-8 p-2">
          <p>Here you will find the latest news about the lab.</p>
        </div>
        <div class="mt-2 sm:p-2">
          <h2 class="font-hauser text-secondary
            text-2xl sm:text-3xl md:text-4xl 
            mb-8">Featured</h2>
          <div class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-10">
            {#each featuredPaginated as { metadata: { title, date, description, }, path }}
              <div class="
                border-primary-100 hover:border-white border-dashed border-2
                shadow-sm hover:shadow-md rounded-sm
                sm:w-72">
                <div class="bg-primary-100 hover:bg-white">
                  <a sveltekit:prefetch href={'news/'+path.replace(/\.[^/.]+$/, "")}>
                    <div class="px-4 py-4 h-64 grid grid-rows-2">
                      <div>
                        <h2 class="text-2xl mt-2 text-primary-700">{title}</h2>
                        <p class="text-sm mt-4 text-primary-600">{description}</p>
                      </div>
                      <div class="self-end grid grid-cols-1 text-primary-500">
                        <!-- <div class="text-sm font-hauser uppercase">
                          {title}
                        </div> -->
                        <div class="text-sm font-hauser uppercase self-end text-right">
                          {methods.dayMonth(date)}
                        </div>
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
        <div class="mt-4 sm:px-2 py-2 mb-12">
          <h2 class="font-hauser text-secondary
            text-2xl sm:text-3xl md:text-4xl 
            mb-8">All News</h2>
          <hr class="border-primary-500 border-dashed border-1">
          <div class="article-list">
            {#each allPaginated as { metadata: { title, date, description, tags }, path }}
              <div class="py-2 sm:p-4 hover:bg-primary-300">
                <a sveltekit:prefetch href={'news/'+path.replace(/\.[^/.]+$/, "")}>
                  <div class="grid grid-cols-10">
                    <div class="col-span-10 sm:col-span-8">
                      <div class="text-xl text-primary-900">{title}</div>
                      <div class="text-md text-primary-800 mt-2">{description}</div>
                    </div>
                    <div class="
                      col-span-6 sm:col-span-2
                      mt-2 mb-2 sm:mt-0
                      text-xs sm:text-sm sm:text-right 
                      font-hauser uppercase text-primary-700">
                      <div>{methods.dayMonth(date)}</div>
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
        </div>
      </article>
    </main>
  </div>
  </center>
{/if}
