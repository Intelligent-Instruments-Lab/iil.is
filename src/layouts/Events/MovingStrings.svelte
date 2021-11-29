<script>
  import { seo } from "../../stores/seo.js";
  import { onMount } from 'svelte'
  import { Layout } from '../../stores/layout.js'

  // Components
  import Menu from "../../components/Menu/Menu.svelte"
  import CTARow from "../../components/Buttons/CTARow.svelte"
  import Section from '../../components/Section/Section.svelte'
  import Module from "../../components/Events/Module/Module.svelte"
  import YTP from '../../components/Video/EmbedYouTubePlaylist.svelte'
  import YT from '../../components/Video/EmbedYouTube.svelte'

  // Assets
  import title_graphic from '../../assets/svg/moving_strings.svg?url'
  import copy from '../../routes/events/moving-strings/copy.json'

  export let layout
  export let date
  export let title
  export let description
  export let featured
  export let dates_fromto

  $seo.title = title
  $seo.description = description
  $seo.url = '/events/moving-strings'

  const methods = {
    setPresenterTimes: p => {
      const { starttime, presenters } = p
      let start = methods.parseTime(starttime)
      let elapsed = 0
      for (var i = 0; i < presenters.length; i++) {
        let p = presenters
        if (i>0) {
          p[i].starttime = methods.addMins(start, elapsed + parseInt(p[i-1].duration))
          elapsed += parseInt(p[i-1].duration)
        } else p[i].starttime = starttime
      }
      console.log()
    },
    parseTime: t => {
      var d = new Date();
      var time = t.match( /(\d+)(?::(\d\d))?\s*(p?)/ );
      d.setHours( parseInt( time[1]) + (time[3] ? 12 : 0) );
      d.setMinutes( parseInt( time[2]) || 0 );
      return d;
    },
    addMins: (original, add) => {
      return new Date(original.getTime() + add * 60000)
        .toLocaleTimeString('en-UK',
          { hour: '2-digit', minute: '2-digit', hour12: false }
        );
    }
  }

  methods.setPresenterTimes(copy.symposium.programme.presentations)

  onMount(async () => {
    $Layout.menu = false
    $Layout.page = layout
    console.log('[Events - Moving Strings]', $Layout.page, layout)
  })
  
</script>

{#if $Layout.menu}
  <Menu/>
{:else}
  <!-- Content container -->
  <div class="bg-primary border-dashed border-secondary border-4 pt-4 pb-4">
    <!-- Top section -->
    <div id="top">
      <div class="
        py-8 px-4 sm:p-12 md:p-14
        max-w-6xl">
        <div class="mb-8">
          <img class="" src={title_graphic} alt="Moving Strings"/>
        </div>
        <div class="mb-8 px-4">
          <p class="font-hauser uppercase text-white text-xl">
            {copy.top.info.details}
          </p>
        </div>
        <div class="grid grid-flow-row grid-cols-1 lg:grid-cols-2
          px-2 sm:px-4 mt-4 mb-4">
          <YT scale="1" id="aVMfArmsBag"/>
        </div>
        <div class="max-w-6xl px-4">
          <p class="text-lg">{copy.top.info.tagline}</p>
          {#each copy.top.info.description as d}
            <p class="text-md">{d}</p>
          {/each}
        </div>
        <div class="mt-10 mb-10 px-4">
          <CTARow links={copy.top.buttons}/>
        </div>
      </div>
    </div>
    <!-- Symposium -->
    <div id="symposium">
      <div class="
        px-4 sm:p-12 md:p-14
        max-w-6xl">
        <Section
          title={copy.symposium.info.title}
          details={copy.symposium.info.details}
          description={copy.symposium.info.description}/>
        <!-- CTA -->
        <div class="p-4 pt-0">
          <CTARow links={copy.symposium.buttons}/>
        </div>
        <!-- Programme -->
        <div>
          <!-- Column 1 -->
          <div>
            <div class="px-2 sm:px-4 pt-4 pb-2 sm:pb-0
              font-hauser uppercase 
              text-md sm:text-lg text-primary-700
              ">Presentations (Chair: {copy.symposium.programme.presentations.chair})</div>
            <ul class="p-2 sm:p-4 text-primary-900">
              {#each copy.symposium.programme.presentations.presenters as p, i}
                <li>{p.starttime}: <a href={p.url} target="_blank">{p.name}</a> - {p.title}</li>
              {/each}
            </ul> 
          </div>
          <!-- Column 2 -->
          <div>
            <div class="px-2 sm:px-4 pt-4 pb-2 sm:pb-0
              font-hauser uppercase 
              text-md sm:text-lg text-primary-700
              ">Panel (Chair: {copy.symposium.programme.panel.chair})</div>
            <div class="pl-2 sm:pl-4 text-primary-700">16:25-17:00</div>
            <ul class="p-2 sm:p-4">
              {#each copy.symposium.programme.panel.speakers as s}
                <li class="text-primary-700"><a href={s.url}>{s.name}</a></li>
              {/each}
            </ul> 
          </div>
        </div>
      </div>
    </div>
    <!-- Concert -->
    <div id="concert">
      <div class="
        px-4 sm:p-12 md:p-14
        max-w-6xl">
        <Section
          title={copy.concert.info.title}
          details={copy.concert.info.details}
          description={copy.concert.info.description}/>
        <!-- CTA -->
        <div class="px-4">
          <CTARow links={copy.concert.buttons}/>
        </div>
        <div class="p-2 sm:p-4 mt-8">
          <div>
            {#each copy.concert.performers as performer, index}
              <div class="md:py-6 md:px-2">
                <Module content={performer}/>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>  
    <!-- MRP -->
    <div id="mrp">
      <div class="
        px-4 sm:p-12 md:p-14
        max-w-6xl">
        <Section
          title={copy.mrp.info.title}
          details={copy.mrp.info.details}
          description={copy.mrp.info.description}/>
        <!-- Videos -->
        <div class="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-10
          px-2 sm:px-4 mt-4 mb-4">
          <YTP scale="0.75" id="PL0HKnypdS9i9DNlk-pOr7M1zrDX06o1Xg"/>
          <YT  scale="0.75" id="GAb8RRKg8oo"/>
        </div>
        <div class="p-2 sm:p-4">
          <div>
            {#each copy.mrp.events as event, index}
              <div class="md:py-6 md:px-2">
                <Module content={event}/>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>  
  </div>
{/if}
