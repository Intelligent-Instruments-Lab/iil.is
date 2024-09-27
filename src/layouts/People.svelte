<script>
  import {onMount} from 'svelte'

  import { Layout } from '../stores/layout.js'
  
  import Person from "../components/People/Person.svelte"
  import SEO from "../components/SEO.svelte"
  import Menu from "../components/Menu/Menu.svelte"
  
  import order from "../routes/people/order.json"
  export let people
  let members = []
  let associates = []

  let title = "People"
  let description = "Meet the Intelligent Instruments Lab members and associates!"
  let layout = "people"
  let seo_title = title
  let seo_description = description
  let seo_url = '/people'
  let seo_image = '/seo/stacco.jpg'
  
  onMount(async () => {
    members = people.filter(p => p.metadata.type === "Member")
    associates = people.filter(p => p.metadata.type === "Associate")

    members = order.members.map(i => members.filter(m=>m.path.slice(2,-3) === i)[0])
    associates = order.associates.map(i => associates.filter(m=>m.path.slice(2,-3) === i)[0])

    $Layout.menu = false
    $Layout.page = layout
    console.log('[People]', $Layout.page, layout)
  })
</script>

<SEO
  title={seo_title}
  description={seo_description}
  url={seo_url}
  image={seo_image}
  />

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

{#if $Layout.menu}
  <Menu/>
{:else}
  <div class="bg-primary border-dashed border-secondary border-4 w">
    <div class="
      py-8 px-4 sm:p-12 md:p-14
      max-w-6xl">
      <h1 class="font-hauser text-secondary
        text-4xl sm:text-5xl md:text-6xl 
        mb-4">
        Members
      </h1>
      <div class="p-2 sm:p-4">
        <div>
          {#each members as member, index}
            <div class="md:py-6 md:px-2">
              <Person person={member.metadata}/>
            </div>
          {/each}
        </div>
      </div>
      <h1 class="font-hauser text-secondary
        text-4xl sm:text-5xl md:text-6xl 
        mb-4">
        Associates and Alumni
      </h1>
      <div class="p-2 sm:p-4">
        <div>
          {#each associates as associate, index}
            <div class="md:py-6 md:px-2">
              <Person person={associate.metadata}/>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}
