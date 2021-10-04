<script>
  import { Layout } from '../stores/layout.js'
  import Seo from "../components/SEO.svelte";
  import Header from "../components/Header/Header.svelte"
  import Footer from "../components/Footer/Footer.svelte"
  import "../app.postcss";
  import "../style.css";
</script>

<Seo />
<div class="">
  <div class="bg-secondary">
    <Header/>
    <slot />
  </div>
  <Footer/>
</div>
