<script>
  export let src
  export let name
</script>

<div class="flex-none w-96 h-96 relative">
  <img
    class="absolute inset-0 w-full h-full object-cover"
    src={"images/team/"+src} 
    alt={name}
    >
</div>
