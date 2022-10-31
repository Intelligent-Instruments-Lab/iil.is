<script>
  import pages from "../../routes/pages.json"
  import MenuItem from "./MenuItem.svelte"
  import {Layout} from "../../stores/layout"

  let pagesFiltered = pages.filter(p => p.label != 'Press')

</script>

<div class="bg-secondary h-screen">
  <div class="
    flex flex-col 
    md:py-6 
    md:mr-4
    ml-8 sm:ml-12 md:ml-16">
    {#each pagesFiltered as page, index}
      <MenuItem page={page}/>
    {/each}
  </div>
</div>
