<script>
  export let title
  export let description
  export let url
  export let image
</script>

<svelte:head>

  <!-- Page -->
  <title>{title} | Intelligent Instruments Lab</title>
  <meta name="description" content={description}/>

  <!-- Open Graph -->
  <meta property="og:url" content={"https://iil.is" + url}>
  <meta property="og:title" content={title + " | Intelligent Instruments Lab"}>
  <meta property="og:description" content={description}>
  <meta property="og:image" content={"https://iil.is" + image}>
  <meta property="og:type" content="website">

  <!-- Twitter -->
  <meta name="twitter:site" content="@_iil_is">
  <meta property="twitter:url" content={"https://iil.is" + url}>
  <meta property="twitter:title" content={title + " | Intelligent Instruments Lab"}>
  <meta property="twitter:description" content={description}>
  <meta property="twitter:image" content={"https://iil.is" + image}>
  <meta property="twitter:card" content="summary_large_image">

</svelte:head>
