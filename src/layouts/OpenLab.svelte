<script>
  import { paginate, PaginationNav } from "svelte-paginate";
  import { onMount } from 'svelte'
  import { Layout } from '../stores/layout.js'
  import SEO from "../components/SEO.svelte"
  import Menu from "../components/Menu/Menu.svelte"

  export let layout = "openlab"
  export let title = "Open Lab"
  export let description = "The Intelligent Instruments Lab opens its doors on Friday afternoons, where we present some work we are developing or invite interesting people to talk about their work, in a friendly environment with tea and biscuits."
  export let openlabs

  let upcoming_placeholder = `Please check back later for further Open Lab announcements, or <a href="/collaborate">get in touch</a> if you'd like to present!`
    
  let seo_title = title
  let seo_description = description
  let seo_url = '/openlab'
  let seo_image = '/seo/openlab.jpeg'

  let items = openlabs

  $: future = {
    size: 100, page: 1,
    items:
      items
        .filter(i => new Date(i.metadata.date).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0))
        .sort((fst,snd)=>fst.metadata.edition - snd.metadata.edition)
  }
  $: past = {
    size: 20, page: 1,
    items:
      items
        .filter(i => new Date(i.metadata.date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))
        .sort((fst,snd)=>fst.metadata.edition - snd.metadata.edition)
        .reverse()
  }

  $: futurePaginated = paginate({ items: future.items, pageSize: future.size, currentPage: future.page });
  $: pastPaginated = paginate({ items: past.items, pageSize: past.size, currentPage: past.page });

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[Open Lab]', $Layout.page, layout)
  })

  const methods = {
    dayMonth: d => {
      d = new Date(d)
      const options = {  year: 'numeric', month: 'short', day: 'numeric' };
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
        <div class="mt-4 sm:mt-8 p-2 text-left">
          <!-- TODO: hidden paragraphs on small -->
          <p>Communicating and discussing our research is part of our research methodology. We are interested in a continuous informal conversation with people, in terms of ad-hoc visits to the lab that can result in conversations that become the seeds of new developments. For this reason, we open the doors to our lab on Friday afternoons, where we present some work we are developing or invite people to talk about all kinds of work, in a friendly environment, sometimes with kaffi and kleinur.</p>
          
          <p>We run a <a href="https://discord.gg/84UgedKepk">public server</a> on Discord for an ongoing conversation about music, technology and the humanities. There you can find an <a href="https://discord.gg/6uGt5u7HJ2">Open Lab</a> channel where we announce what is happening and perhaps continue the discussion.</p> 

          <p>Our lab is located at the University of Iceland in <a href="https://maps.app.goo.gl/bMXzdGoQFkDfGAfSA">Veröld - Hús Vigdísar</a> on the first floor. Please pop by at <b>3pm on Fridays</b>. We look forward to seeing you.</p>
        </div>
        <div class="mt-2 sm:p-2 text-left">
            <h2 class="font-hauser text-secondary
            text-2xl sm:text-3xl md:text-4xl 
            mb-8">Upcoming</h2>
            {#if future.items.length > 0}
                <div class="grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-10">
                    {#each futurePaginated as { metadata: { edition, theme, date, description, tags }, path }}
                        <div class="
                        border-primary-100 hover:border-white border-dashed border-2
                        shadow-sm hover:shadow-md rounded-sm
                        sm:w-72">
                            <div class="bg-primary-100 hover:bg-white">
                                <a sveltekit:prefetch href={'openlab/'+path.replace(/\.[^/.]+$/, "")}>
                                    <div class="px-4 py-4 h-64 grid grid-rows-2">
                                        <div>
                                            <h2 class="text-2xl mt-2 text-primary-700">{theme}</h2>
                                            <p class="text-sm mt-4 text-primary-600">{description}</p>
                                        </div>
                                        <div class="self-end grid grid-cols-2 text-primary-500">
                                            <div class="text-sm font-hauser uppercase">
                                                Open Lab {edition}
                                            </div>
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
            <!-- {/if} -->
            <!-- {#if future.items.length > 0} -->
                <div class="mx-auto">
                    <!-- Defined in style.css -->
                    {#if future.items.length > future.size}
                        <PaginationNav
                        totalItems={future.items.length}
                        pageSize={future.size}
                        currentPage={future.page}
                        limit={1}
                        showStepOptions={true}
                        on:setPage={(e) => (future.page = e.detail.page)}
                        />
                    {/if}
                </div>
            {:else}
                <p class="mt-4 sm:mt-8 p-2">{@html upcoming_placeholder}</p>
            {/if}
        </div>
        <div class="mt-4 sm:px-2 py-2 mb-12 text-left">
          <h2 class="font-hauser text-secondary
            text-2xl sm:text-3xl md:text-4xl 
            mb-8">Past</h2>
          <hr class="border-primary-500 border-dashed border-1">
          <div class="article-list">
            {#each pastPaginated as { metadata: { edition, theme, date, description, tags }, path }}
              <div class="py-2 sm:p-4 hover:bg-primary-300">
                <a sveltekit:prefetch href={'openlab/'+path.replace(/\.[^/.]+$/, "")}>
                  <div class="grid grid-cols-10">
                    <div class="col-span-10 sm:col-span-8">
                      <div class="text-xl text-primary-900">{theme}</div>
                      <div class="text-md text-primary-800 mt-2">{description}</div>
                    </div>
                    <div class="
                      col-span-6 sm:col-span-2
                      mt-2 mb-2 sm:mt-0
                      text-xs sm:text-sm sm:text-right 
                      font-hauser uppercase text-primary-700">
                      <div>Open Lab {edition}</div>
                      <div>{methods.dayMonth(date)}</div>
                    </div>
                  </div>
                </a>
              </div>
              <hr class="border-primary-500 border-dashed border-1">
            {/each}
          </div>
          <div class="mx-auto">
            {#if past.items.length > past.size}
              <PaginationNav
                totalItems={past.items.length}
                pageSize={past.size}
                currentPage={past.page}
                limit={1}
                showStepOptions={true}
                on:setPage={(e) => (past.page = e.detail.page)}
              />
            {/if}
          </div>
        </div>
      </article>
    </main>
  </div>
</center>
{/if}
