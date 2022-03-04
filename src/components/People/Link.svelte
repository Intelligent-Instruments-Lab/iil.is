<script>
  export let url
  export let label
</script>

<!-- TODO: Extract into Pill Button component -->

<div class="
  border-dashed border-primary-700 border-2
  rounded-lg">
  <a
    class="
      h-9 flex items-center justify-center 
      bg-primary-700
      p-3
      text-white"
    href={url}
    target="_blank">
    {label}
  </a>
</div>
