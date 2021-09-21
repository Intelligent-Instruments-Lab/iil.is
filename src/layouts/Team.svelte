<script>
  import { seo } from "$lib/store";
  import Member from "./TeamMember.svelte"
  import team from "../routes/team/team.json"

  export let title;
  export let description;

  $seo = {
    title: title,
    description: description,
  };
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<style>
  .post {
    margin-bottom: 4rem;
  }
</style>

<h1 class="font-bold text-6xl mb-4">{title}</h1>
<div class="post">
  <slot />
</div>
<div>
  {#each team as member, index}
    <Member member={member}/>        
  {/each}
</div>
