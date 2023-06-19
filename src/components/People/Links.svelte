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
  {#if links.website2}
    <Link url={'http://'+links.website2} label={links.website2}/>
  {/if}
  {#if links.website3}
    <Link url={'http://'+links.website3} label={links.website3}/>
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
  {#if links.soundcloud}
    <Link url={"https://soundcloud.com/"+links.soundcloud} label="SoundCloud"/>
  {/if}
  {#if links.youtube}
    <Link url={"https://youtube.com/"+links.youtube} label="YouTube"/>
  {/if}
</div>
