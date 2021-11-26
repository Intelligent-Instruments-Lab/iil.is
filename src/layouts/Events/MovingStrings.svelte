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
        let p = presenters[i]
        p.starttime = methods.addMins(start, elapsed + parseInt(p.duration))
        elapsed += parseInt(p.duration)
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
  <div class="bg-primary-700">
    <!-- Top section -->
    <div id="top" class="bg-primary-700
      relative flex h-screen overflow-hidden"
      >
      <video loop muted
        class="absolute z-10
          w-auto min-w-full  max-w-none"
        >
        <source src="/vid/moving_strings.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div class="relative z-30 p-10">
        <div class="mt-6 mb-12">
          <img class="" src={title_graphic} alt="Moving Strings"/>
        </div>
        <div class="mb-8">
          <p class="font-hauser uppercase text-white text-xl">
            {copy.top.info.details}
          </p>
        </div>
        <div class="max-w-lg">
          <p class="text-white text-lg">{copy.top.info.tagline}</p>
          {#each copy.top.info.description as d}
            <p class="text-white text-md">{d}</p>
          {/each}
        </div>
        <div class="mt-10 mb-10">
          <CTARow links={copy.top.buttons}/>
        </div>
      </div>
    </div>
    <!-- Symposium -->
    <div id="symposium" class="bg-primary border-dashed border-secondary border-4 pt-10 pb-10">
      <!-- p-10 sm:p-12 md:p-14 -->
      <div class="
        px-10 sm:px-12 md:px-14
        max-w-6xl">
        <Section
          title={copy.symposium.info.title}
          details={copy.symposium.info.details}
          description={copy.symposium.info.description}/>
        <!-- Programme -->
        <div>
          <!-- Column 1 -->
          <div>
            <div>Presentations</div>
            <ul>
              {#each copy.symposium.programme.presentations.presenters as p, i}
                <li>{p.starttime}: <a href={p.url}>{p.name}</a> - {p.title}</li>
              {/each}
            </ul> 
            <div>Chair: {copy.symposium.programme.presentations.chair}</div>
          </div>
          <!-- Column 2 -->
          <div>
            <div>Panel</div>
            <ul>
              {#each copy.symposium.programme.panel.speakers as s}
                <li><a href={s.url}>{s.name}</a></li>
              {/each}
            </ul> 
            <div>Chair: {copy.symposium.programme.panel.chair}</div>
          </div>
        </div>
        <!-- CTA -->
        <div>
          <CTARow links={copy.symposium.buttons}/>
        </div>
      </div>
    </div>
    <!-- Concert -->
    <div id="concert" class="bg-primary border-dashed border-secondary border-4 w">
      <div class="
        py-8 px-4 sm:p-12 md:p-14
        max-w-6xl">
        <Section
          title={copy.concert.info.title}
          details={copy.concert.info.details}
          description={copy.concert.info.description}/>
        <!-- CTA -->
        <div>
          <CTARow links={copy.concert.buttons}/>
        </div>
        <div class="p-2 sm:p-4">
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
    <div id="mrp" class="bg-primary border-dashed border-secondary border-4 w">
      <div class="
        py-8 px-4 sm:p-12 md:p-14
        max-w-6xl">
        <Section
          title={copy.mrp.info.title}
          details={copy.mrp.info.details}
          description={copy.mrp.info.description}/>
        <!-- Videos -->
        <div class="grid grid-flow-row grid-cols-1 lg:grid-cols-2
        px-2 sm:px-4
        mt-4 mb-4">
          <YTP class="mt-20" scale="0.75" id="PL0HKnypdS9i9DNlk-pOr7M1zrDX06o1Xg"/>
          <YT  class="mt-20" scale="0.75" id="GAb8RRKg8oo"/>
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
