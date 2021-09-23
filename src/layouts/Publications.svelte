<script>
  import { seo } from "../stores/seo.js";
  import Publication from "../components/Publication.svelte"
  
  import * as bibtex from 'bibtex'
  // const { parseBibFile } = pkg
  // import { parseBibFile } from "bibtex";
  // import { parseBibFile } from "../lib/bibtex/index/";
  // import pubs from '../routes/publications/publications.bib?raw'
  
  export let publications
  const bib = Object.values(bibtex.parseBibFile(publications).entries$)

  let title = 'Title'
  let description = 'Description'

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

<h1 class="headline text-7xl leading-relaxed font-black font-display mb-4">
  Publications
</h1>
<p>This page contains papers from the Intelligent Instruments Lab, organised by date. 
Also see the latest news and events and press articles.</p>
<div class="post">
  <slot />
</div>

<div class="space-y-6">
  {#each bib as entry}
    <Publication pub={entry}/>
  {/each}
</div>
