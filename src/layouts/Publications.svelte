<script>
  import { seo } from "$lib/store";
  import Publication from "../components/Publication.svelte"
  
  import { parseBibFile } from "bibtex";
  import pubs from '../routes/publications/publications.bib?raw'
  let bib = Object.values(parseBibFile(pubs).entries$)
  // bib = bib.map(e=> Object.values(e.fields))
  // console.log(bib)

  export let title;
  export let description;

  $seo = {
    title: title,
    description: description,
  };

  // TODO: generate download of .bib file

  // http://instrumentslab.org/publications/
  // TODO: Item numbering
  // TODO: Jump to year
  // TODO: Separate into years
  // TODO: Sort entries by year

</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<style>
  .post {
    margin-bottom: 4rem;
  }
</style>

<h1 class="font-bold text-6xl mb-4">{title}</h1>
<div class="post">
  <slot />
</div>

<div class="space-y-6">
  {#each bib as entry}
    <Publication pub={entry}/>
  {/each}
</div>
