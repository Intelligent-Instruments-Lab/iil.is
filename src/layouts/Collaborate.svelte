<script>
  import { seo } from "../stores/seo.js";

  export let title;
  export let description;

  $seo = {
    title: title,
    description: description,
  };
</script>

<h1 class="font-bold text-6xl mb-4">{title}</h1>
<div class="post">
  <slot />
</div>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<style>
  .post {
    margin-bottom: 4rem;
  }
</style>
