<script>
  import Link from "./Link.svelte"
  export let links  
</script>

<div class="flex items-baseline mt-4 mb-6">
  <div class="space-x-2 flex">
    {#if links.twitter}
      <Link url={"https://twitter.com/"+links.twitter} label="Twitter"/>
    {/if}
    {#if links.scholar}
      <Link url={"https://scholar.google.com/citations?user="+links.scholar} label="Scholar"/>
    {/if}
    {#if links.github}
      <Link url={"https://github.com/"+links.github} label="GitHub"/>
    {/if}
    {#if links.instagram}
      <Link url={"https://instagram.com/"+links.instagram} label="Instagram"/>
    {/if}
    {#if links.website}
      <Link url={links.website} label="Website"/>
    {/if}
  </div>
</div>
