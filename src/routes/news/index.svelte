<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const res = await fetch(`/news/items.json`);
    const items = await res.json();
    
    return {
      props: {
        items,
      },
    };
  }
</script>

<script>
  import News from '../../layouts/News.svelte'
  export let items
</script>

<News items={items}/>
