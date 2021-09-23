<script>
  import { seo } from "../stores/seo.js";
  import Member from "../components/Team/Member.svelte"
  import order from "../routes/team/order.json"

  export let members

  // sort members using order
  members = order.map(i => members.filter(m=>m.path.slice(2,-3) === i)[0])

  export let title = "Team"
  export let description = "Team"

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
<p>This is our team.</p>

<div class="post">
  <slot/>
</div>

<div>
  {#each members as member, index}
      <Member member={member.metadata}/>
  {/each}
</div>
