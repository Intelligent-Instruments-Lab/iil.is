<script>
  export let title
  export let details
  export let description  
</script>

<section>
  <h1 class="font-hauser text-secondary
    text-4xl sm:text-5xl md:text-6xl 
    mt-2 mb-2 sm:mb-4">
    {title}
  </h1>
  <div class="px-2 sm:px-4 pt-4 pb-2 sm:pb-0
    font-hauser uppercase 
    text-sm sm:text-md text-primary-700
    ">
    {details}<br>
  </div>
  <div class="p-2 sm:p-4">
    <p>{description}</p>
  </div>
  <slot/>  
</section>
