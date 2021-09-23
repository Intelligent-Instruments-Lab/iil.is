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
  import Publications from '../../layouts/Publications.svelte'
  export let publications
</script>

<Publications publications={publications}/>
