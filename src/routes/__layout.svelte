<script>
  import Seo from "../components/Seo.svelte";
  import Header from "../components/Header/Header.svelte"
  import Footer from "../components/Footer/Footer.svelte"
  import "../app.postcss";
  import "../style.css";
</script>

<Seo />
<div class="">
  <Header/>
  <slot />
  <Footer/>
</div>
