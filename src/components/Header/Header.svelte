<script>
  import wordmark from '../../assets/svg/iil_wordmark_primary_dark.svg?url'
  import pages from "../../routes/pages.json"
</script>

<div class="bg-secondary">
  <div class="grid grid-cols-8 h-42 max-w-screen-xl">
    <div class="col-span-3">
      <a href="/">
        <img
          class="w-96"
          src={wordmark}
          style="--color_fill: #555;"
          alt="Intelligent Instruments Lab"/>
      </a>
    </div>
    <div class="col-span-4 py-12">
      <div class="grid grid-flow-col grid-cols-3 grid-rows-3 gap-4">
        {#each pages as page}
          <a class="font-hauser uppercase text-primary-700" href={page.url}>{page.label}</a>
        {/each}
      </div>
    </div>
  </div>
</div>
