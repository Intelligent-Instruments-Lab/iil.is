<script>
  import { seo } from "../../stores/seo.js";
  import { onMount } from 'svelte'
  import { Layout } from '../../stores/layout.js'
  import Menu from "../../components/Menu/Menu.svelte"
  import CTARow from "../../components/Buttons/CTARow.svelte"

  import title_graphic from '../../assets/svg/moving_strings.svg?url'

  export let layout
  export let date
  export let title
  export let description
  export let featured
  export let dates_fromto
  export let copy
  $seo.title = title
  $seo.description = description
  $seo.url = '/events/moving-strings'

  let cta_links = [
    { url: "#programme", label: "Programme", theme: "light_alt", target: "_self" },
    { url: "#register", label: "Register", theme: "dark_alt", target: "_self" },
  ]

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[Events - Moving Strings]', $Layout.page, layout)
  })
  
</script>

{#if $Layout.menu}
  <Menu/>
{:else}
  <!-- Content container -->
  <div class="bg-primary-700">
    <!-- Hero section -->
    <div class="bg-primary-700
      relative flex h-screen overflow-hidden"
      >
      <video autoplay loop muted
        class="absolute z-10
          w-auto min-w-full min-h-full max-w-none"
        >
        <source src="/vid/moving_strings.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="relative z-30 p-10">
        <div class="mt-6 mb-12">
          <img class="" src={title_graphic} alt="Moving Strings"/>
        </div>
        <div class="mb-8">
          <!-- <p>{description}</p> -->
          <p class="font-hauser uppercase text-white text-xl">
            6-10 Dec, Reykjavík, Iceland
          </p>
        </div>
        <div class="max-w-lg">
          {#each copy as c}
            <p class="text-white text-md">{c}</p>
          {/each}
        </div>
        <!-- Buttons -->
        <div class="mt-10 mb-10">
          <CTARow links={cta_links}/>
        </div>
      </div>
    </div>
    <!-- Programme section -->
    <div class="bg-gray-300 h-96 m-0"></div>
    <!-- Other section -->
    <div></div>
  </div>
{/if}
