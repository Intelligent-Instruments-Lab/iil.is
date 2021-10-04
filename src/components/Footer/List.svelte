<script>
  import ListItem from './ListItem.svelte'
  export let name
  export let list
  export let target
</script>

<div>
  <h1 class="font-hauser text-white text-lg">{name}</h1>
  <div class="px-2 py-3">
    {#each list as item, index}
      <ListItem url={item.url} label={item.label} target={target}/>
    {/each}
  </div>
</div>
