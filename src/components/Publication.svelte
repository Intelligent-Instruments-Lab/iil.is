<script>
  import * as bibtex from 'bibtex'
  // import { normalizeFieldValue } from 'bibtex';
  // import pkg from 'bibtex';
  // const { normalizeFieldValue } = pkg;
  export let pub
  //console.log(pub.fields)

  const field = f => bibtex.normalizeFieldValue(pub.getField(f))

</script>

<div>
  <p>
    {#if pub.type === "inproceedings"}
      {field("AUTHOR")}. 
      <i>{field("TITLE")}.</i> 
      {field("BOOKTITLE")}. 
      {field("YEAR")}.
    {:else if pub.type === "article"}
      {field("AUTHOR")}. 
      <i>{field("TITLE")}.</i> 
      {field("JOURNAL")}. 
      {field("YEAR")}.
    {:else if pub.type === "book"}
      {field("AUTHOR")}. 
      <i>{field("TITLE")}.</i>
      {field("YEAR")}.
    {/if}
  </p>
</div>
