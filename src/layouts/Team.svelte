<script>
  import {onMount} from 'svelte'

  import { seo } from "../stores/seo.js";
  import { Layout } from '../stores/layout.js'
  
  import Member from "../components/Team/Member.svelte"
  import Menu from "../components/Menu/Menu.svelte"
  
  import order from "../routes/team/order.json"
  export let members
  // sort members using order
  members = order.map(i => members.filter(m=>m.path.slice(2,-3) === i)[0])

  export let title = "Team"
  export let description = "Team"
  export let layout = "team"

  $seo = {
    title: title,
    description: description,
  };
  
  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[Team]', $Layout.page, layout)
  })
</script>

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
        {title}
      </h1>
      <div class="p-2 sm:p-4">
        <div>
          {#each members as member, index}
            <div class="md:py-6 md:px-2">
              <Member member={member.metadata}/>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}
