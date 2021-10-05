<script>
  import Link from "./Link.svelte"
  export let links  
</script>

<div class="
  flex flex-wrap gap-2
  mt-4
  ">
  {#if links.website}
    <Link url={'http://'+links.website} label="Website"/>
  {/if}
  {#if links.twitter}
    <Link url={"https://twitter.com/"+links.twitter} label="Twitter"/>
  {/if}
  {#if links.instagram}
    <Link url={"https://instagram.com/"+links.instagram} label="Instagram"/>
  {/if}
  {#if links.github}
    <Link url={"https://github.com/"+links.github} label="GitHub"/>
  {/if}
  {#if links.scholar}
    <Link url={"https://scholar.google.com/citations?user="+links.scholar} label="Scholar"/>
  {/if}
</div>
