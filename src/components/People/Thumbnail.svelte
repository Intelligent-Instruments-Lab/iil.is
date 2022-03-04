<script>
  export let src
  export let name
</script>


<div class="
  lg:hidden
  self-start
  w-32
  h-32
  relative
  border-dashed border-primary-200 border-4 rounded-sm
  shadow-sm">
  <img
    class="absolute inset-0 w-full h-full object-cover"
    src={src} 
    alt={name}
    >
</div>
