<script>
  import MenuItem from './MenuItem.svelte'
  import pages from "../../routes/pages.json"
</script>

<div class="flex items-baseline mt-4 mb-6">
  <div class="space-x-2 flex">
    {#each pages as page, index}
      <MenuItem url={page.url} label={page.label}/>
    {/each}
  </div>
</div>

<hr>
