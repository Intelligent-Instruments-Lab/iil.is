import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { N as NewsItem } from "../../../_app/immutable/chunks/NewsItem-d440c00e.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "news",
  "date": "2022-04-26",
  "title": "Residency at the IIL: Steve Symons",
  "description": "Enactive metaphors for collaborative musical instruments",
  "featured": false
};
const Steve_residency = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Last week, the Intelligent Instruments Lab welcomed visiting researcher Steve Symons! Over the years, Steve has been making sound sculptures and art in the field of creative technology. He is currently a music technology doctoral researcher at the Leverhulme Trust funded <a href="${"http://be.ai/"}" rel="${"nofollow"}">be.AI</a> Centre (University of Sussex, Brighton, UK). There he explores enactive metaphors for collaborative musical instruments that enhance intra-dependant actions between human and non-human agents.</p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/steve.jpg",
        alt: "A man using a Gametrak control system with strings tied to his hands. Standing in front of a yellow and blue shelving system. In the foreground, a large instrument.",
        caption: "Steve Symons using the Gametrak at the IIL."
      }, {}, {})}
<p>Steve is mostly known for his interactive sound systems and instruments that he improvises with or exhibits for the public to play. He has also gained recognition for his involvement in the Owl Project, a sculptural collective with sound art.</p>
<p>For his month long residency he will experiment with collaborative instruments using an old Gametrak control system, originally made for video games in the early 2000s, this interface has become quite popular among musicians. The device has a pair of joy sticks that are controlled by moving nylon strings.\xA0These strings are retractable and the Gametrak measures how far you pull them out.\xA0This makes a great movement sensor for tracking the positions of two hands.\xA0Steve gives two performers one sensor each and his instruments then respond as they move them in a coordinated way.</p>
<p>Furthermore, Steve is interested in doing research with another kind of collaborative music making using a volumetric camera which measures distance, like X-box\u2019s Connect. Six to eight people, for example, could stand around a table and make music using movement picked up by the camera.</p>
<p>When Steve is not in Iceland researching collaborative instruments or working on his doctoral thesis, he\u2019s busy running his consultation company on technology for artists, both visual artists and musicians. His project range from helping artists getting tidal waves in Bangladesh to control <a href="${"http://alisonneighbourdesign.com/work-in-progress/the-future-wales-coast-path/"}">a lighthouse in Wales</a> to leading people to secret locations using sounds in mysterious <a href="${"https://www.invisible-forces.com/projects/congregation/"}">silver spheres</a>.</p>`;
    }
  })}`;
});
export {
  Steve_residency as default,
  metadata
};
