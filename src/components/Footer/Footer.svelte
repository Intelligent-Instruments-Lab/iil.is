<script>
  import List from './List.svelte'
  import pages from "../../routes/pages.json"
  import contact from "../../routes/contact.json"
  
</script>

<hr>
<div class="flex">
  <div class="space-x-10 flex">
    <List list={pages} name="Explore"/>
    <List list={contact} name="Contact"/>
    <div>
      <p>Address:</p>
      <p>Intelligent Instruments Lab</p>
      <p>Þverholt 11</p>
      <p>105 Reykjavík</p>
      <p>Iceland</p>
    </div>
  </div>
</div>


