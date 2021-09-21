<script>
  import pages from "../routes/pages.json"
</script>

{#each pages as page, index}
  <div>
    <a href={page.slug}>{page.title}</a> 
  </div>
{/each}
<hr>