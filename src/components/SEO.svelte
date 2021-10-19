<script>
  import { seo } from "../stores/seo.js";

  let desc = "Intelligent Instruments Lab"
</script>

<svelte:head>

  <!-- Page basics -->
  <title>{$seo.title}</title>
  <meta name="description" content={$seo.description} />

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://iil.is/">
  <meta property="og:title" content="Intelligent Instruments Lab">
  <meta property="og:description" content={desc}>
  <meta property="og:image" content="/ogimage.jpg">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://iil.is/">
  <meta property="twitter:title" content="Intelligent Instruments Lab">
  <meta property="twitter:description" content={desc}>
  <meta name="twitter:site" content="@_iil_is">
  <meta property="twitter:image" content="https:/iil.is/ogimage.jpg">

  

</svelte:head>
