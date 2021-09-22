<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const res = await fetch(`/research/projects.json`);
    const projects = await res.json();
    
    return {
      props: {
        projects,
      },
    };
  }
</script>

<script>
  import Research from '../../layouts/Research.svelte'
  export let projects
</script>

<Research projects={projects}/>
