<script>
  import pages from "../../routes/pages.json"
  import MenuItem from "./MenuItem.svelte"
  import {Layout} from "../../stores/layout"

</script>

<div class="bg-secondary h-screen">
  <div class="flex flex-col px-20 py-6">
    {#each pages as page, index}
      <MenuItem 
        url={page.url} 
        label={page.label}
        active={page.url.slice(1) === $Layout.page}/>
    {/each}
  </div>
</div>
