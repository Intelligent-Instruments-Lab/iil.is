<script>
  export let src
  export let name
</script>

<div class="
  hidden lg:block
  flex-none self-center 
  sm:w-72
  sm:h-72
  relative
  border-dashed border-primary-200 border-4 rounded-sm
  shadow-sm">
  <img
    class="absolute inset-0 w-full h-full object-cover"
    src={src} 
    alt={name}
    >
</div>
