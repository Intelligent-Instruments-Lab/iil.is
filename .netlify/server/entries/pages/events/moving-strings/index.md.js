import { c as create_ssr_component, e as escape, b as add_attribute, v as validate_component, a as subscribe, h as set_store_value, d as each } from "../../../../_app/immutable/chunks/index-85307065.js";
import { s as seo } from "../../../../_app/immutable/chunks/seo-f675d5d9.js";
import { L as Layout } from "../../../../_app/immutable/chunks/pages-b2802677.js";
import { M as Menu } from "../../../../_app/immutable/chunks/Menu-d2b189d9.js";
import { C as CTARow } from "../../../../_app/immutable/chunks/EmbedYouTube.svelte_svelte_type_style_lang-0d1d4efc.js";
const Section = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  let { details } = $$props;
  let { description } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.details === void 0 && $$bindings.details && details !== void 0)
    $$bindings.details(details);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  return `<section><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mt-2 mb-2 sm:mb-4"}">${escape(title)}</h1>
  <div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-md sm:text-lg text-primary-700 "}">${escape(details)}<br></div>
  <div class="${"p-2 sm:p-4"}"><p>${escape(description)}</p></div>
  ${slots.default ? slots.default({}) : ``}</section>`;
});
const Photo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"hidden lg:block flex-none self-center sm:w-72 sm:h-72 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${add_attribute("src", src, 0)}${add_attribute("alt", name, 0)}></div>`;
});
const Thumbnail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src } = $$props;
  let { name } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<div class="${"lg:hidden self-start w-32 h-32 relative border-dashed border-primary-200 border-4 rounded-sm shadow-sm"}"><img class="${"absolute inset-0 w-full h-full object-cover"}"${add_attribute("src", src, 0)}${add_attribute("alt", name, 0)}></div>`;
});
const Link = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  let { label } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  return `

<div class="${"border-dashed border-primary-700 border-2 rounded-lg"}"><a class="${"h-9 flex items-center justify-center bg-primary-700 p-3 text-white"}"${add_attribute("href", url, 0)} target="${"_blank"}">${escape(label)}</a></div>`;
});
const Links = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { links } = $$props;
  if ($$props.links === void 0 && $$bindings.links && links !== void 0)
    $$bindings.links(links);
  return `<div class="${"flex flex-wrap gap-2 mt-4 "}">${links.event ? `${validate_component(Link, "Link").$$render($$result, { url: links.event, label: "Event Page" }, {}, {})}` : ``}
  ${links.signup ? `${validate_component(Link, "Link").$$render($$result, { url: links.signup, label: "Sign-up Form" }, {}, {})}` : ``}
  ${links.website ? `${validate_component(Link, "Link").$$render($$result, {
    url: "http://" + links.website,
    label: "Website"
  }, {}, {})}` : ``}
  ${links.website2 ? `${validate_component(Link, "Link").$$render($$result, {
    url: "http://" + links.website2,
    label: links.website2
  }, {}, {})}` : ``}
  ${links.twitter ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://twitter.com/" + links.twitter,
    label: "Twitter"
  }, {}, {})}` : ``}
  ${links.instagram ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://instagram.com/" + links.instagram,
    label: "Instagram"
  }, {}, {})}` : ``}
  ${links.github ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://github.com/" + links.github,
    label: "GitHub"
  }, {}, {})}` : ``}
  ${links.scholar ? `${validate_component(Link, "Link").$$render($$result, {
    url: "https://scholar.google.com/citations?user=" + links.scholar,
    label: "Scholar"
  }, {}, {})}` : ``}
  ${links.video ? `${validate_component(Link, "Link").$$render($$result, { url: links.video, label: "Video" }, {}, {})}` : ``}</div>`;
});
const Module = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { content } = $$props;
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  return `<div class="${"flex"}"><div class="${"flex lg:space-x-10 space-y-8"}">${validate_component(Photo, "Photo").$$render($$result, { src: content.image, name: content.name }, {}, {})}
    <div><div class="${"flex flex-wrap"}">${validate_component(Thumbnail, "Thumb").$$render($$result, { src: content.image, name: content.name }, {}, {})}
        <div class="${"flex flex-col ml-4 lg:ml-0"}"><h1 class="${"font-hauser text-secondary text-3xl mt-4"}">${escape(content.name)}</h1>
          ${content.details ? `<h3 class="${"text-primary-900 text-1xl px-2 mt-4"}">${escape(content.details)}</h3>` : ``}</div></div>
      <div class="${"px-2"}"><p class="${"mt-2 sm:mt-4 mb-6 md:max-w-xl lg:max-w-1xl "}">${escape(content.description)}</p>
        ${validate_component(Links, "Links").$$render($$result, { links: content.links }, {}, {})}</div></div></div></div>`;
});
const EmbedYouTubePlaylist_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".videoWrapper.svelte-eym11.svelte-eym11{height:0;padding-bottom:56.25%;padding-top:25px;position:relative}.videoWrapper.svelte-eym11 iframe.svelte-eym11{height:100%;left:0;position:absolute;top:0;width:100%}",
  map: null
};
const EmbedYouTubePlaylist = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { scale } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  $$result.css.add(css$1);
  return `<div class="${"videoWrapper svelte-eym11"}"><iframe${add_attribute("width", scale ? scale * 560 : 560, 0)}${add_attribute("height", scale ? scale * 315 : 315, 0)}${add_attribute("src", "https://www.youtube.com/embed/videoseries?list=" + id, 0)} title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen class="${"svelte-eym11"}"></iframe></div>`;
});
const css = {
  code: ".videoWrapper.svelte-eym11.svelte-eym11{height:0;padding-bottom:56.25%;padding-top:25px;position:relative}.videoWrapper.svelte-eym11 iframe.svelte-eym11{height:100%;left:0;position:absolute;top:0;width:100%}",
  map: null
};
const EmbedYouTube = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { scale } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.scale === void 0 && $$bindings.scale && scale !== void 0)
    $$bindings.scale(scale);
  $$result.css.add(css);
  return `<div class="${"videoWrapper svelte-eym11"}"><iframe${add_attribute("width", scale ? scale * 560 : 560, 0)}${add_attribute("height", scale ? scale * 315 : 315, 0)}${add_attribute("src", "https://www.youtube.com/embed/" + id, 0)} title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen class="${"svelte-eym11"}"></iframe></div>`;
});
const title_graphic = "/_app/immutable/assets/moving_strings-c4776730.svg";
const top = {
  info: {
    tagline: "Events on new and modified, electronically actuated string instruments, augmented with code and AI.",
    details: "7-10 Dec, Reykjav\xEDk, Iceland",
    description: [
      "In the first international gathering hosted by the newly formed Intelligent Instruments Lab, at the Iceland University of the Arts, we bring together musicians and instrument makers who are using contemporary technologies to rethink how we play strings.",
      "How can digital processing, including dynamical systems and AI, augment the nature of the string, a technical element we have used in our instruments for thousands of years? How do new digital technologies change our interaction with strings and string instruments in general?"
    ]
  },
  buttons: [
    {
      url: "#symposium",
      label: "Symposium",
      theme: "dark_alt",
      target: "_self"
    },
    {
      url: "#concert",
      label: "Concert",
      theme: "dark_alt",
      target: "_self"
    },
    {
      url: "#mrp",
      label: "Magnetic Resonator Piano",
      theme: "dark_alt",
      target: "_self"
    }
  ]
};
const symposium = {
  info: {
    title: "Symposium",
    details: "Wednesday, Online - Zoom, Free",
    description: "The Intelligent Instruments Lab invites everyone interested in new musical instruments to come to an open symposium where practicing musicians and instrument inventors present and discuss their work. The presentations consist of short talks followed by Q&A. After the presentations we will have a panel discussing common themes, opening up for further interaction by the audience."
  },
  programme: {
    presentations: {
      starttime: "14:00",
      chair: "Jack Armitage",
      presenters: [
        {
          duration: "10",
          name: "Thor Magnusson (IS)",
          title: "Introduction",
          url: "https://thormagnusson.github.io/"
        },
        {
          duration: "15",
          name: "Andrew McPherson (US/UK)",
          title: "The Magnetic Resonator Piano so far",
          url: "http://andrewmcpherson.org"
        },
        {
          duration: "15",
          name: "Chris Kiefer (UK)",
          title: "Feedback Cellos",
          url: "https://luuma.net/"
        },
        {
          duration: "15",
          name: "Adam Pultz (DK/DE)",
          title: "The Feedback Actuated Augmented Double Bass",
          url: "http://adampultz.com/"
        },
        {
          duration: "15",
          name: "Tabita Cargnel (DE)",
          title: "Venus smiles in nature",
          url: "https://tabitacargnel.com/work"
        },
        {
          duration: "15",
          name: "",
          title: "Coffee Break -",
          url: "#"
        },
        {
          duration: "15",
          name: "Halld\xF3r and Gu\xF0mundur Steinn Gunnarsson (IS)",
          title: "Composing for halldorophone",
          url: "https://www.halldorophone.info/"
        },
        {
          duration: "15",
          name: "Dav\xED\xF0 Brynjar Franzson (IS/US)",
          title: "Drone Box: Autocoder",
          url: "http://franzson.com/"
        },
        {
          duration: "15",
          name: "Victor Shepardson (US/IS)",
          title: "No input mixer and Living Looper",
          url: "https://victor-shepardson.github.io/"
        },
        {
          duration: "15",
          name: "",
          title: "Coffee Break -",
          url: "#"
        }
      ]
    },
    panel: {
      chair: "Thor Magnusson",
      speakers: [
        {
          name: "Andrew McPherson (US/UK)",
          url: "http://andrewmcpherson.org"
        },
        {
          name: "Chris Kiefer (UK)",
          url: "https://luuma.net/"
        },
        {
          name: "Adam Pultz (DK/DE)",
          url: "http://adampultz.com/"
        },
        {
          name: "Tabita Cargnel (DE)",
          url: "https://tabitacargnel.com/work"
        },
        {
          name: "Dav\xED\xF0 Brynjar Franzson (IS)",
          url: "http://franzson.com/"
        }
      ]
    }
  },
  buttons: [
    {
      url: "https://www.facebook.com/events/584294452831227",
      label: "Event Page",
      theme: "dark_alt",
      target: "_blank"
    }
  ]
};
const concert = {
  info: {
    title: "Concert CANCELLED",
    details: "Thursday 9, Mengi, 2000 ISK",
    description: "Unfortunately, due to a COVID related incident, we must cancel the Moving Strings Concert. Some of our guests were scheduled to perform. The theme of the evening was meant to be feedback instruments and resonating strings. Performers: Tabita Cargnel (DE) with her singing tensegrity sculpture, Chris Kiefer (UK) with his new feedback instrument and Adam Pultz (DK) with his feedback-actuated bass. All are focusing on new ways of treating string instruments. This event is cancelled."
  },
  buttons: [
    {
      url: "https://www.facebook.com/events/1003688887028231",
      label: "Event Page",
      theme: "dark_alt",
      target: "_blank"
    },
    {
      url: "https://www.mengi.net/events",
      label: "Buy Tickets",
      theme: "dark_alt",
      target: "_blank"
    }
  ],
  performers: [
    {
      name: "Tabita Cargnel (DE)",
      image: "/images/events/moving-strings/tabita.jpg",
      links: {
        instagram: "singing_tensegrity",
        video: "https://www.youtube.com/watch?v=KIy9Hm1NsaU",
        website: "tabitacargnel.com/work"
      },
      description: "Venus Smiles is a sound sculpture for communal performance. Ringing copper tubes, suspended in an architectural tensegrity system, can be played as a musical instrument by using your hands, a bow or your voice. Every element of the Venus Smiles instrument is tuned to the tubes main resonance note. The highly resonant and reverby sound creates an intense, immersive experience."
    },
    {
      name: "Chris Kiefer (UK)",
      image: "/images/events/moving-strings/chris.jpg",
      links: {
        website: "luuma.net",
        scholar: "66uLtDEAAAAJ",
        twitter: "luuma"
      },
      description: "Chris Kiefer is an instrument designer and experimental musician from Brighton, UK. He will be playing an improvised piece with a new feedback string instrument, the Xiasri, The piece will explore two coupled feedback systems, one within the physical materials of the instrument, and one within software, using self-concatenative synthesis, where new sound is resynthesised from the instruments recent past."
    },
    {
      name: "Adam Pultz (DK/DE)",
      image: "/images/events/moving-strings/adam.jpg",
      links: {
        website: "adampultz.com",
        video: "https://vimeo.com/adampultz",
        twitter: "AdamPultz",
        scholar: "ZwIT6hgAAAAJ"
      },
      description: "Adam Pultz Melbye is a Berlin-based composer, musician and researcher He has released three double bass solo albums, appears on an additional 40+ releases and has toured Europe, the US, Australia and Japan. Adam has created fixed media pieces and sound installations for festivals, galleries and museums in Denmark, Australia, Germany and Austria. His writing has been published in international journals and conferences and he is currently guest editing an issue on feedback practices for the ECHO Journal at Orpheus Instituut, Gent."
    }
  ]
};
const mrp = {
  info: {
    title: "Magnetic Resonator Piano (MRP)",
    details: "Various dates, Fr\xE6\xF0astofa 1, Skipholt, Free",
    description: "The magnetic resonator piano (MRP) is an augmented piano which uses electromagnets to elicit new sounds from the strings of a grand piano. The MRP extends the sonic vocabulary of the piano to include infinite sustain, crescendos from silence, harmonics, pitch bends and new timbres, all produced acoustically without the use of speakers."
  },
  videos: [
    {
      url: "https://www.youtube.com/watch?list=PL0HKnypdS9i9DNlk-pOr7M1zrDX06o1Xg&v=f79d_oVqv4Y"
    },
    {
      url: "https://www.youtube.com/watch?v=GAb8RRKg8oo"
    }
  ],
  events: [
    {
      name: "Andrew McPherson Lecture",
      details: "Weds 8, 11:00-12:00, Online - Zoom",
      image: "/images/events/moving-strings/mrp_andrew.jpg",
      description: "In this online talk Andrew will present the functionality of the Magnetic Resonator Piano. He will talk about how the instrument has been received by composers, performers and the public, and how the innovation of the instrument has happened. Andrew will also discuss how composers have rethought their relationship with the piano when encountering the instrument, for example through new notational practices.",
      links: {
        event: "https://www.facebook.com/events/596517608339693",
        website: "andrewmcpherson.org",
        website2: "instrumentslab.org",
        scholar: "9Je-3c4AAAAJ",
        twitter: "instrumentslab"
      }
    },
    {
      name: "MRP Workshops",
      details: "Tue 7 - Thu 9, Fr\xE6\xF0astofa 1, Skipholt (Sign-up required)",
      image: "/images/events/moving-strings/mrp_workshops.jpg",
      description: "We are excited to invite people interested in the Magnetic Resonator Piano to a workshop with the instrument. This new instrument will be located at the Music Department for years to come, and there will be plenty of opportunities to compose and perform with the instrument. The workshop will be lead by Tinna \xDEorsteinsd\xF3ttir who will introduce you to the instrument and give support, but equally give you time to spend alone with the instrument. People can sign up for the workshop as individuals or groups (e.g. composer-performer duo).",
      links: {
        event: "https://www.facebook.com/events/459429968869963",
        signup: "https://forms.office.com/r/5kE6JXerJf"
      }
    },
    {
      name: "MRP Concert",
      details: "Fri 10, 17:00-18:30, Fr\xE6\xF0astofa 1, Skipholt",
      image: "/images/events/moving-strings/mrp_concert.jpg",
      description: "The Intelligent Instruments Lab is happy to present the results of the workshop in the Magnetic Resonator Piano. Here Tinna \xDEorsteinsd\xF3ttir has been leading sessions with composers and performers who have been getting to know the MRP for a short time. The concert is a showcase of work-in-progress pieces, and it should be interesting to anyone who is interested in new music and how the piano can be expanded into future sounds.",
      links: {
        event: "https://www.facebook.com/events/3007719246107553"
      }
    }
  ]
};
const copy = {
  top,
  symposium,
  concert,
  mrp
};
const MovingStrings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { layout } = $$props;
  let { date } = $$props;
  let { title } = $$props;
  let { description } = $$props;
  let { featured } = $$props;
  let { dates_fromto } = $$props;
  set_store_value(seo, $seo.title = title, $seo);
  set_store_value(seo, $seo.description = description, $seo);
  set_store_value(seo, $seo.url = "/events/moving-strings", $seo);
  const methods = {
    setPresenterTimes: (p) => {
      const { starttime, presenters } = p;
      let start = methods.parseTime(starttime);
      let elapsed = 0;
      for (var i = 0; i < presenters.length; i++) {
        let p2 = presenters;
        if (i > 0) {
          p2[i].starttime = methods.addMins(start, elapsed + parseInt(p2[i - 1].duration));
          elapsed += parseInt(p2[i - 1].duration);
        } else
          p2[i].starttime = starttime;
      }
      console.log();
    },
    parseTime: (t) => {
      var d = new Date();
      var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
      d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
      d.setMinutes(parseInt(time[2]) || 0);
      return d;
    },
    addMins: (original, add) => {
      return new Date(original.getTime() + add * 6e4).toLocaleTimeString("en-UK", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    }
  };
  methods.setPresenterTimes(copy.symposium.programme.presentations);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.featured === void 0 && $$bindings.featured && featured !== void 0)
    $$bindings.featured(featured);
  if ($$props.dates_fromto === void 0 && $$bindings.dates_fromto && dates_fromto !== void 0)
    $$bindings.dates_fromto(dates_fromto);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `
  <div class="${"bg-primary border-dashed border-secondary border-4 pt-4 pb-4"}">
    <div id="${"top"}"><div class="${"py-8 px-4 sm:p-12 md:p-14 max-w-6xl"}"><div class="${"mb-8"}"><img class="${""}"${add_attribute("src", title_graphic, 0)} alt="${"Moving Strings"}"></div>
        <div class="${"mb-8 px-4"}"><p class="${"font-hauser uppercase text-white text-xl"}">${escape(copy.top.info.details)}</p></div>
        <div class="${"grid grid-flow-row grid-cols-1 lg:grid-cols-2 px-2 sm:px-4 mt-4 mb-4"}">${validate_component(EmbedYouTube, "YT").$$render($$result, { scale: "1", id: "B0UIsDUzrD4" }, {}, {})}</div>
        <div class="${"max-w-6xl px-4"}"><p class="${"text-lg"}">${escape(copy.top.info.tagline)}</p>
          ${each(copy.top.info.description, (d) => {
    return `<p class="${"text-md"}">${escape(d)}</p>`;
  })}</div>
        <div class="${"mt-10 mb-10 px-4"}">${validate_component(CTARow, "CTARow").$$render($$result, { links: copy.top.buttons }, {}, {})}</div></div></div>
    
    <div id="${"symposium"}"><div class="${"px-4 sm:p-12 md:p-14 max-w-6xl"}">${validate_component(Section, "Section").$$render($$result, {
    title: copy.symposium.info.title,
    details: copy.symposium.info.details,
    description: copy.symposium.info.description
  }, {}, {})}
        
        <div class="${"p-4 pt-0"}">${validate_component(CTARow, "CTARow").$$render($$result, { links: copy.symposium.buttons }, {}, {})}</div>
        
        <div>
          <div><div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-md sm:text-lg text-primary-700 "}">Presentations (Chair: ${escape(copy.symposium.programme.presentations.chair)})</div>
            <ul class="${"p-2 sm:p-4 text-primary-900"}">${each(copy.symposium.programme.presentations.presenters, (p, i) => {
    return `<li>${escape(p.starttime)}: <a${add_attribute("href", p.url, 0)} target="${"_blank"}">${escape(p.name)}</a> - ${escape(p.title)}</li>`;
  })}</ul></div>
          
          <div><div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-md sm:text-lg text-primary-700 "}">Panel (Chair: ${escape(copy.symposium.programme.panel.chair)})</div>
            <div class="${"pl-2 sm:pl-4 text-primary-700"}">16:25-17:00</div>
            <ul class="${"p-2 sm:p-4"}">${each(copy.symposium.programme.panel.speakers, (s) => {
    return `<li class="${"text-primary-700"}"><a${add_attribute("href", s.url, 0)}>${escape(s.name)}</a></li>`;
  })}</ul></div></div></div></div>
    
    <div id="${"concert"}"><div class="${"px-4 sm:p-12 md:p-14 max-w-6xl"}">${validate_component(Section, "Section").$$render($$result, {
    title: copy.concert.info.title,
    details: copy.concert.info.details,
    description: copy.concert.info.description
  }, {}, {})}
        
        <div class="${"px-4"}">${validate_component(CTARow, "CTARow").$$render($$result, { links: copy.concert.buttons }, {}, {})}</div>
        <div class="${"p-2 sm:p-4 mt-8"}"><div>${each(copy.concert.performers, (performer, index) => {
    return `<div class="${"md:py-6 md:px-2"}">${validate_component(Module, "Module").$$render($$result, { content: performer }, {}, {})}
              </div>`;
  })}</div></div></div></div>  
    
    <div id="${"mrp"}"><div class="${"px-4 sm:p-12 md:p-14 max-w-6xl"}">${validate_component(Section, "Section").$$render($$result, {
    title: copy.mrp.info.title,
    details: copy.mrp.info.details,
    description: copy.mrp.info.description
  }, {}, {})}
        
        <div class="${"grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-10 px-2 sm:px-4 mt-4 mb-4"}">${validate_component(EmbedYouTubePlaylist, "YTP").$$render($$result, {
    scale: "0.75",
    id: "PL0HKnypdS9i9DNlk-pOr7M1zrDX06o1Xg"
  }, {}, {})}
          ${validate_component(EmbedYouTube, "YT").$$render($$result, { scale: "0.75", id: "GAb8RRKg8oo" }, {}, {})}</div>
        <div class="${"p-2 sm:p-4"}"><div>${each(copy.mrp.events, (event, index) => {
    return `<div class="${"md:py-6 md:px-2"}">${validate_component(Module, "Module").$$render($$result, { content: event }, {}, {})}
              </div>`;
  })}</div></div></div></div></div>`}`;
});
const metadata = {
  "layout": "movingstrings",
  "date": "2021-12-06",
  "title": "Moving Strings",
  "description": "Moving Strings: A symposium on strings and feedback. Dec 6-10, Reykjav\xEDk, Iceland.",
  "featured": true
};
const Moving_strings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(MovingStrings, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Moving_strings as default,
  metadata
};
