<script>
  import { Layout } from '../../stores/layout.js'

  // Assets
  import wordmark from '../../assets/svg/iil_wordmark.svg?url'
  import wordmark_nologo from '../../assets/svg/iil_wordmark_nologo.svg?url'
  import menu from '../../assets/svg/iil_menu.svg?url'

  import pages from "../../routes/pages.json"

  const methods = {
    menuToggle: e => {
      let m = Layout.menuToggle()
      console.log('[Menu]', m)
    },
  }
</script>

<style>
  .menuActive {
    @apply w-16 p-4 transform rotate-180;
  }
  .menuInactive {
    @apply w-16 p-4 transform rotate-270;
  }
</style>

<div class="bg-secondary">
  <div class="grid grid-cols-8 h-42">
    <div class="col-span-5 md:col-span-7">
      <a href="/">
        <img
          class="w-96 hidden md:block"
          src={wordmark}
          alt="Intelligent Instruments Lab"/>
        <img
          class="w-72 block md:hidden"
          src={wordmark_nologo}
          alt="Intelligent Instruments Lab"/>
      </a>
    </div>
    <div class="col-span-1 justify-self-end self-center pr-10 hidden md:block">
      {#if $Layout.page !== 'home'}
        <img
          class="{$Layout.menu ? 'menuActive' : 'menuInactive'}"
          src={menu}
          alt="Menu"
          on:click|preventDefault={methods.menuToggle}/>
      {/if}
    </div>
    <div class="col-span-3 justify-self-end self-center block md:hidden pr-4 sm:pr-10">
      <img
        class="{$Layout.menu ? 'menuActive' : 'menuInactive'}"
        src={menu}
        alt="Menu"
        on:click|preventDefault={methods.menuToggle}/>
    </div>
  </div>
</div>
