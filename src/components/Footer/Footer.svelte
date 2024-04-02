<script>

  import { Layout } from '../../stores/layout.js'

  import List from './List.svelte'
  import logo from '../../assets/svg/iil_logo_white_fit.svg?url'
  import pages from "../../routes/pages.json"
  import contact from "../../routes/contact.json"

  import ERC from './ERC.svelte'
  import ERC_Mobile from './ERC_Mobile.svelte'

</script>

<style>
  .menuActive {
    @apply bg-primary-700 border-dashed border-secondary border-4;
  }
  .menuInactive {
    @apply bg-primary-700;
  }
</style>

<center>
<div class="{($Layout.menu || $Layout.page === 'home') ? 'menuActive' : 'menuInactive'}">
  <div class="pt-8 pl-6 max-w-screen-xl hidden md:block mb-4 lg:mb-10">
    <div class="grid grid-cols-8">
      <div class="col-span-2 m-4 lg:ml-12">
        <div class="mt-8 mb-8">
          <a href="/">
            <img
              class="h-24 lg:h-36"
              src={logo}
              alt="Intelligent Instruments Lab"/>
          </a>
        </div>
        <div class="text-sm">
          <a href="https://goo.gl/maps/jX1wteK9MjdMKsg28" target="_blank">
            <div class="text-white">Intelligent Instruments Lab</div>
            <div class="text-white">Þverholt 11</div>
            <div class="text-white">105 Reykjavík</div>
            <div class="text-white">Iceland</div>
          </a>
        </div>
      </div>
      <div class="col-span-6 py-12">
        <div class="grid grid-cols-8">
          <div class="col-span-2">
            <List list={pages} name="Explore" target=""/>
          </div>
          <div class="col-span-2">
            <List list={contact} name="Contact" target="_blank"/>
          </div>
          <div class="col-span-4">
            <ERC/>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pt-8 pl-6 py-8 max-w-screen-xl md:hidden">
    <div class="flex flex-col">
      <div class="">
        <List list={contact} name="Contact" target="_blank"/>
      </div>
      <div class="">
        <h1 class="font-hauser text-white text-lg">Address</h1>
        <div class="px-2 py-3">
          <a href="https://maps.app.goo.gl/VXYYfzR9Apv8mnp98" target="_blank">
            <div class="text-white">Intelligent Instruments Lab</div>
            <div class="text-white">Veröld - Hús Vigdísar</div>
            <div class="text-white">University of Iceland</div>
            <div class="text-white">Brynjólfsgötu 1</div>
            <div class="text-white">107 Reykjavik</div>
            <div class="text-white">Iceland</div>
          </a>
        </div>
      </div>
      <div>
        <ERC_Mobile/>
      </div>
    </div>
  </div>
</div>
</center>