import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { N as NewsItem } from "../../../_app/immutable/chunks/NewsItem-d440c00e.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "news",
  "date": "2022-05-23",
  "title": "Announcing Trash Sounds workshop at RUSL Festival 2022",
  "description": "",
  "featured": false
};
const Rusl2022 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Presenting <a href="${"https://ruslfest.is/TRASH-SOUNDS"}" target="${"_blank"}">Trash Sounds</a>, a week-long intensive workshop from June 27 - July 2 on designing and performing with intelligent musical instruments made from discarded materials, as part of <a href="${"https://ruslfest.is"}" target="${"_blank"}">RUSL Festival 2022</a>.</p>

<p>In this workshop, you will gain hands-on experience with the cutting edge of musical instrument design, learning from scratch techniques for real-time audio programming, creative AI for gesture-sound mapping, sonic interaction design, physical instrument craft, and speculative design.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/ruslbanner.jpeg",
        alt: "A banner with graphic calligraphy saying RUSL: Sustainable Design Festival / Listah\xE1t\xED\xF0. June 27th to July 2nd 2022. Location Gufunes.",
        caption: "RUSL FEST is a sustainable design festival in Gufunes, Reykjav\xEDk."
      }, {}, {})}
<p>Each day you will receive direct instruction in one of the topics above, using your new skills to rehabilitate waste materials into living musical objects, and to collectively improvise music daily at one of the many unique sites at F\xDASK Gufunes.</p>
<p>We welcome beginners, musicians, makers and everyone in between, and especially those who are not well represented in music technology today. Together we will cultivate a friendly environment where everyone listens to and learns from each other.</p>
<a href="${"https://ruslfest.is"}" target="${"_blank"}">RUSL</a> is a sustainable design festival focusing on circular thinking and its application within art, design and culture. 
The festival is held within the new creative neighborhood of Gufunes. 
A week-long event with workshops, lectures, exhibitions, dinners and social gatherings. 
Included in your ticket is a workshop, daily lunch &amp; dinner, lectures, events over the week and access to the final party BUXUR.
 ${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/rusl-sigga.png",
        alt: "In the background, a woman sitting in front of four handmade instruments. Graphics say: Vinnustofur, TRASH SOUNDS, Jack Armitage, Sigga, Karl, Robin and Sean from the Intelligent Instruments Lab. RUSL logo. https://ruslfest.is.",
        caption: "Trash Sounds intructors are Jack Armitage, Sigga, Karl, Robin and Sean."
      }, {}, {})}
<p>More info and tickets at: <a href="${"https://ruslfest.is/"}" rel="${"nofollow"}">https://ruslfest.is/</a></p>
<p>Follow RUSL on Instagram: <a href="${"https://www.instagram.com/rusl.fest/"}" rel="${"nofollow"}">https://www.instagram.com/rusl.fest/</a></p>
<p>Contact RUSL festival: <a href="${"mailto:info@fusk.is"}">info@fusk.is</a></p>`;
    }
  })}`;
});
export {
  Rusl2022 as default,
  metadata
};
