<script>
  import PillDashed from "./PillDashed.svelte"
  export let links
</script>

<div class="flex flex-wrap gap-4 sm:gap-10">
  {#each links as link}
    <PillDashed link={link}/>
  {/each}
</div>
