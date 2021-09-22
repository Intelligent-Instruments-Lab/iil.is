<script>
  import ListItem from './ListItem.svelte'
  export let name
  export let list
</script>

<div>
  <div>
    <p>{name}</p>
  </div>
  <div>
    {#each list as item, index}
      <ListItem url={item.url} label={item.label}/>
    {/each}
  </div>
</div>
