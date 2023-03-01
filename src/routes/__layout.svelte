<script>
  import { Layout } from '../stores/layout.js'
  import Header from "../components/Header/Header.svelte"
  import Footer from "../components/Footer/Footer.svelte"
  import "../app.postcss";
  import "../style.css";
</script>

<div class="">
  <div class="bg-secondary">
    <Header/>
    <slot />
  </div>
  <Footer/>
</div>
