<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const res = await fetch(`/publications.bib`);
    const publications = await res.text();
    
    return {
      props: {
        publications,
      },
    };
  }
</script>

<script>
  import Outputs from '../../layouts/Outputs.svelte'
  export let publications
</script>

<Outputs publications={publications}/>
