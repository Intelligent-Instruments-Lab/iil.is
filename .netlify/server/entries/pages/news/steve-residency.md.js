var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Steve_residency,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_NewsItem_d440c00e = require("../../../_app/immutable/chunks/NewsItem-d440c00e.js");
var import_CaptionedImage_6bbb271e = require("../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const metadata = {
  "layout": "news",
  "date": "2022-04-26",
  "title": "Residency at the IIL: Steve Symons",
  "description": "Enactive metaphors for collaborative musical instruments",
  "featured": false
};
const Steve_residency = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Last week, the Intelligent Instruments Lab welcomed visiting researcher Steve Symons! Over the years, Steve has been making sound sculptures and art in the field of creative technology. He is currently a music technology doctoral researcher at the Leverhulme Trust funded <a href="${"http://be.ai/"}" rel="${"nofollow"}">be.AI</a> Centre (University of Sussex, Brighton, UK). There he explores enactive metaphors for collaborative musical instruments that enhance intra-dependant actions between human and non-human agents.</p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
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
