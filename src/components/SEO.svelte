<script>
  import { seo } from "../stores/seo.js";
</script>

<svelte:head>

  <!-- Page -->
  <title>{$seo.title} | Intelligent Instruments Lab</title>
  <meta name="description" content={$seo.description}/>

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://iil.is/">
  <meta property="og:title" content="Intelligent Instruments Lab">
  <meta property="og:description" content={$seo.description}>
  <meta property="og:image" content="/seo/ogimage.jpg">

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://iil.is/">
  <meta property="twitter:title" content="Intelligent Instruments Lab">
  <meta property="twitter:description" content={$seo.description}>
  <meta name="twitter:site" content="@_iil_is">
  <meta property="twitter:image" content="https:/iil.is/seo/ogimage.jpg">

</svelte:head>
