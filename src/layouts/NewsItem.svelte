<script>
  import { seo } from "$lib/store";

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
