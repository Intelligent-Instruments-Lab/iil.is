<script>
  export let link
</script>

{#if link.theme === 'dark'}
  <div class="
    border-dashed border-primary-500 border-2
    hover:border-primary-600
    rounded-md">
    <a
      class="
        pl-7 pr-7 pt-2 pb-2
        bg-primary-500 hover:bg-primary-600
        h-9 flex items-center justify-center 
        text-white
        font-hauser
        uppercase"
      href={link.url}
      target={link.target}>
      {link.label}
    </a>
  </div>
{:else if link.theme === 'light'}
  <div class="
    border-dashed border-primary-500 border-2
    rounded-md">
    <a
      class="
        pl-7 pr-7 pt-2 pb-2
        h-9 flex items-center justify-center 
        hover:bg-primary-400
        text-primary-500 hover:text-white
        font-hauser
        uppercase"
      href={link.url}
      target={link.target}>
      {link.label}
    </a>
  </div>
{:else if link.theme === 'dark_alt'}
  <div class="
    border-dashed border-white border-2
    hover:border-primary-500
    rounded-md">
    <a
      class="
        pl-7 pr-7 pt-2 pb-2
        bg-white hover:bg-primary-500
        h-9 flex items-center justify-center 
        text-primary-700 hover:text-white
        font-hauser
        uppercase"
      href={link.url}
      target={link.target}>
      {link.label}
    </a>
  </div>
{:else if link.theme === 'light_alt'}
  <div class="
    border-dashed border-white border-2
    rounded-md">
    <a
      class="
        pl-7 pr-7 pt-2 pb-2
        h-9 flex items-center justify-center 
        hover:bg-primary-500
        text-white
        font-hauser
        uppercase"
      href={link.url}
      target={link.target}>
      {link.label}
    </a>
  </div>
{/if}
