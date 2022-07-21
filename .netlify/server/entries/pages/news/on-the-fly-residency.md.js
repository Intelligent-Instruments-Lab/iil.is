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
  default: () => On_the_fly_residency,
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
  "date": "2022-03-01",
  "title": "On-the-fly Residency in Barcelona",
  "description": "Dr. Jack Armitage spends one month with Hangar.org.",
  "featured": false
};
const On_the_fly_residency = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Lab member Jack Armitage is spending this month in Barcelona taking part in a one month residency called <a href="${"https://onthefly.space/"}" target="${"_blank"}">On-the-Fly</a>, which promotes Live Coding practice by supporting knowledge exchange between communities, engaging with critical reflections, promoting free and open source tools and approaching live coding to new audiences.</p>
<p>As part of the residency, Jack will be performing at the <a href="${"https://aaassembly.org"}" target="${"_blank"}">Algorithmic Art Assembly</a> on Saturday 12th March. Full details including lineup, tickets and streaming links can be found here:</p>
<p><a href="${"https://hangar.org/es/residents/activitats-dels-residents/espanol-algorithmic-art-assembly-aaa/"}" rel="${"nofollow"}">https://hangar.org/es/residents/activitats-dels-residents/espanol-algorithmic-art-assembly-aaa/</a></p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "news/aaabcn.png",
        alt: "Flyer for the Algorithmic Art Assembly Barcelona node.",
        caption: "Flyer for AAA BCN."
      }, {}, {})}
<p>From March 24 to 27, Jack will be participating in the VIU Festival 2022. Full details about the festival programme can be found here:</p>
<p><a href="${"https://hangar.org/es/residents/activitats-dels-residents/espanol-viu-2022-encuentro-de-live-coding/"}" rel="${"nofollow"}">https://hangar.org/es/residents/activitats-dels-residents/espanol-viu-2022-encuentro-de-live-coding/</a></p>`;
    }
  })}`;
});
