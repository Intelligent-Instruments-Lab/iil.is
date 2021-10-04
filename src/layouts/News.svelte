<script>
  import { paginate, PaginationNav } from "svelte-paginate";
  import { seo } from "../stores/seo.js";
  import { onMount } from 'svelte'
  import { Layout } from '../stores/layout.js'
  import Menu from "../components/Menu/Menu.svelte"

  export let items
  export let layout = "news"

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
    console.log('[News]', $Layout.page, layout)
  })
</script>

{#if $Layout.menu}
  <Menu/>
{:else}
<div class="bg-primary border-dashed border-secondary border-4">
<main>
  <article>
    <h1 class="headline text-7xl leading-relaxed font-black font-display mb-4">
      News
    </h1>
    <p>Here's some text that comes before the news</p>
    <div class="article-list">
      {#each paginatedItems as { metadata: { title, description, tags, outline, slug }, path }}
        <div class="mb-4">
          <a sveltekit:prefetch href={'news/'+path.replace(/\.[^/.]+$/, "")}
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