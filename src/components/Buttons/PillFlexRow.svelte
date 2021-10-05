<script>
  import PillDashed from "./PillDashed.svelte"
  export let links
</script>

<div class="
  flex flex-wrap gap-2
  mt-4
  ">
  {#each links as link}
    <PillDashed url={link.url} label={link.label}/>
  {/each}
</div>
