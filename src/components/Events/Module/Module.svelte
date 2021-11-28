<script>
  import Photo from './Photo.svelte'
  import Thumb from './Thumbnail.svelte'
  import Links from './Links.svelte'

  export let content

</script>

<div class="flex">
  <div class="flex lg:space-x-10 space-y-8">
    <Photo src={content.image} name={content.name}/>
    <div>
      <div class="flex flex-wrap">
        <Thumb src={content.image} name={content.name}/>
        <div class="flex flex-col ml-4 lg:ml-0">
          <h1 class="font-hauser text-secondary text-3xl mt-4">
            {content.name}
          </h1>
          {#if content.details}
            <h3 class="text-primary-900 text-1xl px-2 mt-4">{content.details}</h3>
          {/if}
        </div>
      </div>
      <div class="px-2">
        <p class="
          mt-2 sm:mt-4 mb-6 
          md:max-w-xl lg:max-w-1xl
          ">{content.description}</p>
        <Links links={content.links}/>
      </div>
    </div>
  </div>
</div>
