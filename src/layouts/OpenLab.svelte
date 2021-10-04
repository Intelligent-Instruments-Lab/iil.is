<script>
  import { paginate, PaginationNav } from "svelte-paginate";
  import { seo } from "../stores/seo.js";
  import { onMount } from 'svelte'
  import { Layout } from '../stores/layout.js'
  import Menu from "../components/Menu/Menu.svelte"

  // export let items
  export let layout = "openlab"
  export let openlabs;

  let items = openlabs.reverse()
  let currentPage = 1;
  let pageSize = 2;
  $: paginatedItems = paginate({ items, pageSize, currentPage });

  $seo = {
    title: "Hagura - Light",
    description: "Hagura is a light-weight theme/template built for sveltekit.",
  };

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[Home]', $Layout.page, layout)
  })
</script>

{#if $Layout.menu}
  <Menu/>
{:else}
<div class="bg-primary border-dashed border-secondary border-4">
<main>
  <article>
    <h1 class="headline text-7xl leading-relaxed font-black font-display mb-4">
      Open Lab
    </h1>
    <div>
      <p>We have developed the Collaboration Interface Protocol in order to work with other scientists and artists. Some of these collaborations are formal and focussing on specific experiments or projects, but we are also interested in a more open approach and informal exchange and collaboration.</p>

      <p>We seek to maintain a critical yet playful reflection upon the lab as a performative space, where various agents interact and produce knowledge: an “aesthetics of experimentation”. We will run open lab sessions on Friday afternoons and people can follow the project via public events. We will make regular use of social media, and use podcasts, YouTube and blogging for lasting online documentation.</p>
    </div>
    <!-- <div>
      <p><b>Next Open Lab</b></p>
    </div> -->
    <div class="article-list">
      {#each paginatedItems as { metadata: { title, description, tags, outline, slug }, path }}
        <div class="mb-4">
          <a sveltekit:prefetch href={'openlab/'+path.replace(/\.[^/.]+$/, "")}
            ><h2 class="text-3xl leading-relaxed">{title}</h2></a
          >
          <p>{description}</p>
        </div>
      {/each}
    </div>
    <div class="mx-auto">
      <PaginationNav
        totalItems={items.length}
        {pageSize}
        {currentPage}
        limit={1}
        showStepOptions={true}
        on:setPage={(e) => (currentPage = e.detail.page)}
      />
    </div>
  </article>
</main>
</div>
{/if}
