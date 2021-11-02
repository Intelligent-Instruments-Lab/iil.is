<script>

  export let src
  export let caption
  export let alt
</script>

<div class="py-2 my-4">
  <img class="
    max-h-96
    object-cover object-center"
    src={"/images/"+src} alt={alt}>
  <p class="text-primary-800 mt-2 text-sm">{caption}</p>
</div>
