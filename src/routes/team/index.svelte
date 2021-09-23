<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const res = await fetch(`/team/members.json`);
    const members = await res.json();
    
    return {
      props: {
        members,
      },
    };
  }
</script>

<script>
  import Team from '../../layouts/Team.svelte'
  export let members
</script>

<Team members={members}/>
