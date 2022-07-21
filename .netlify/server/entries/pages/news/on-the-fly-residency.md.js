import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { N as NewsItem } from "../../../_app/immutable/chunks/NewsItem-d440c00e.js";
import { C as CaptionedImage } from "../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "news",
  "date": "2022-03-01",
  "title": "On-the-fly Residency in Barcelona",
  "description": "Dr. Jack Armitage spends one month with Hangar.org.",
  "featured": false
};
const On_the_fly_residency = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NewsItem, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Lab member Jack Armitage is spending this month in Barcelona taking part in a one month residency called <a href="${"https://onthefly.space/"}" target="${"_blank"}">On-the-Fly</a>, which promotes Live Coding practice by supporting knowledge exchange between communities, engaging with critical reflections, promoting free and open source tools and approaching live coding to new audiences.</p>
<p>As part of the residency, Jack will be performing at the <a href="${"https://aaassembly.org"}" target="${"_blank"}">Algorithmic Art Assembly</a> on Saturday 12th March. Full details including lineup, tickets and streaming links can be found here:</p>
<p><a href="${"https://hangar.org/es/residents/activitats-dels-residents/espanol-algorithmic-art-assembly-aaa/"}" rel="${"nofollow"}">https://hangar.org/es/residents/activitats-dels-residents/espanol-algorithmic-art-assembly-aaa/</a></p>
${validate_component(CaptionedImage, "CaptionedImage").$$render($$result, {
        src: "news/aaabcn.png",
        alt: "Flyer for the Algorithmic Art Assembly Barcelona node.",
        caption: "Flyer for AAA BCN."
      }, {}, {})}
<p>From March 24 to 27, Jack will be participating in the VIU Festival 2022. Full details about the festival programme can be found here:</p>
<p><a href="${"https://hangar.org/es/residents/activitats-dels-residents/espanol-viu-2022-encuentro-de-live-coding/"}" rel="${"nofollow"}">https://hangar.org/es/residents/activitats-dels-residents/espanol-viu-2022-encuentro-de-live-coding/</a></p>`;
    }
  })}`;
});
export {
  On_the_fly_residency as default,
  metadata
};
