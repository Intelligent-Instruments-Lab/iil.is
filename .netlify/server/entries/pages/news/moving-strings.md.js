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
  default: () => Moving_strings,
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
  "date": "2021-12-18",
  "title": "Moving String Symposium",
  "description": "An International Symposium in Reykjavik on New ways of Moving Strings",
  "featured": false
};
const Moving_strings = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>We ran the Moving String Symposium in Reykjavik in December 2021. The event included workshops in the Magnetic Resonator Piano, symposium with feedback musicians, and a keynote from Andrew McPherson. </p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "events/moving-strings/tabita.jpg",
        alt: "A photo of Tabita with her Tensegrity instrument. The picture is of the instrument with her in the centre performing on it."
      }, {}, {})}
<p>Tinna Thorsteinsdottir ran the MRP workshops, and we are pleased to present the result of those workshops here:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/he4wBSFEl18"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
<p>Andrew McPherson\u2019s talk is here:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/8pfybzsT4tY"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>
<p>And our Symposium day can be found here:</p>
<iframe width="${"560"}" height="${"315"}" src="${"https://www.youtube.com/embed/FQpg06Imiao"}" title="${"YouTube video player"}" frameborder="${"0"}" allow="${"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}" allowfullscreen></iframe>`;
    }
  })}`;
});
