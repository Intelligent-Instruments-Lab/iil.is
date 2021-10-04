<script>

  export let src
  export let caption  
</script>

<div class="py-2 my-4">
  <img class="h-64 object-cover object-center"
    src={src} alt={caption}>
  <p class="text-primary-800 mt-2 text-sm">{caption}</p>
</div>
