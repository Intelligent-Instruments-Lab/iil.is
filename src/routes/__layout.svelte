<script>
  import Seo from "../components/Seo.svelte";
  import Header from "../components/Header/Header.svelte"
  import Footer from "../components/Footer/Footer.svelte"
  import "../app.postcss";
  import "../style.css";
</script>

<Seo />
<div class="body-wrapper max-w-screen-md mx-auto">
  <Header/>
  <slot />
  <Footer/>
</div>
