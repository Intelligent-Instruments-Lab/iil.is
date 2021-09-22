<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const res = await fetch(`/openlab/openlabs.json`);
    const openlabs = await res.json();
    
    return {
      props: {
        openlabs,
      },
    };
  }
</script>

<script>
  import OpenLab from '../../layouts/OpenLab.svelte'
  export let openlabs
</script>

<OpenLab openlabs={openlabs}/>
