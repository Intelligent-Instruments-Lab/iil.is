<!-- <script context="module">
  import p from "../components/Markdown/p.svelte"

  export {p}
</script> -->

<script>
  import { seo } from "../stores/seo.js";
  
  export let title;
  export let description;

  $seo = {
    title: title,
    description: description,
  };
</script>

<div class="border-dashed border-secondary border-4">
  <div class="py-16 max-w-lg ml-32">
    <h1 class="font-hauser text-secondary text-6xl mb-4">{title}</h1>
    <div class="p-3"><slot/></div>
  </div>
</div>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>
