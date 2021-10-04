<script>
  import List from './List.svelte'
  import logo from '../../assets/svg/iil_logo_white.svg?url'
  import pages from "../../routes/pages.json"
  import contact from "../../routes/contact.json"
  
</script>

<div class="bg-primary-700">
  <div class="pt-8 pl-6 max-w-screen-xl">
    <div class="grid grid-cols-6">
      <div class="col-span-2">
        <a href="/">
          <img
            class="h-72"
            src={logo}
            alt="Intelligent Instruments Lab"/>
        </a>
      </div>
      <div class="grid grid-cols-8 col-span-4 py-12">
        <div class="col-span-2"><List list={pages} name="Explore"/></div>
        <div class="col-span-2"><List list={contact} name="Contact"/></div>
        <div class="col-span-4">
          <h1 class="font-hauser text-white text-lg">Address</h1>
          <div class="px-2 py-3">
            <a href="https://goo.gl/maps/jX1wteK9MjdMKsg28" target="_blank">
              <div class="text-white">Intelligent Instruments Lab</div>
              <div class="text-white">Þverholt 11</div>
              <div class="text-white">105 Reykjavík</div>
              <div class="text-white">Iceland</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


