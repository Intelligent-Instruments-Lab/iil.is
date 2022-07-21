import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { N as NewsItem } from "../../../_app/immutable/chunks/NewsItem-d440c00e.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "news",
  "date": "2022-05-11",
  "title": "Celebrating International Synthesizer Day",
  "description": "See you down at Reykjavik City Library's Den of Synth!",
  "featured": false
};
const Synthabaeli = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>We are pleased to be participating in this years Synthab\xE6li | Hlj\xF3\xF0gervlamessa at Reykjav\xEDk City Library.
We will be bringing some things we\u2019ve been working on, and are looking forward to seeing you there!</p>
<p>More info on the event below:</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/synthabaeli.jpg",
        alt: "Promotional graphic for Synthab\xE6li | Hlj\xF3\xF0gervlamessa, 14 May, Reykjavik City Library..",
        caption: "Synthab\xE6li | Hlj\xF3\xF0gervlamessa, 14 May, Reykjavik City Library."
      }, {}, {})}
<p>International Synthesizer Day is celebrated each year around the birthday of Robert Moog (May 23rd 1934), the inventor of the first commercial synth. His beloved creation has had such a massive influence across all genres that it would be difficult to imagine modern music without the synthesizer.</p>
<p>In honor of the glorious synthesizer, the downtown Reykjavik City Library will transform its first floor into a fantastic Den of Synth! On Saturday, May 14th, visitors and the curious of all ages can wander among and play with all kinds of magical synthesizers and rare gear that musicians and other synth enthusiasts will have on display. An electronic music wonderland awaits you, and everyone is invited!</p>
<p><a href="${"https://www.facebook.com/events/3298760190383641"}" rel="${"nofollow"}">https://www.facebook.com/events/3298760190383641</a></p>`;
    }
  })}`;
});
export {
  Synthabaeli as default,
  metadata
};
