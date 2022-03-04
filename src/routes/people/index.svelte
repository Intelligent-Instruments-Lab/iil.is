<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const res = await fetch(`/people/people.json`);
    const people = await res.json();
    
    return {
      props: {
        people,
      },
    };
  }
</script>

<script>
  import People from '../../layouts/People.svelte'
  export let people
</script>

<People people={people}/>
