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
  default: () => _6,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_OpenLabEvent_63ba4b85 = require("../../../_app/immutable/chunks/OpenLabEvent-63ba4b85.js");
var import_CaptionedImage_6bbb271e = require("../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const metadata = {
  "layout": "openlab",
  "edition": 6,
  "theme": "Electric Langspil and Sea weed instrument",
  "description": "Linus Orri and Design students presenting their new instruments.",
  "date": "2021-10-15"
};
const _6 = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_OpenLabEvent_63ba4b85.O, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Folk music expert, Linus Orri presented his electric Langspil and LHI product design students, Arngr\xEDmur Gu\xF0mundsson, Birna S\xEDs\xED J\xF3hannsd\xF3ttir og J\xF3n S\xF6lvi Walderhaug Eir\xEDksson demonstrating their new instrument based on 3D scanning sea weed.</p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "openlabs/ol6a.jpg",
        alt: "A picture of Linus Orri talking about his electric langspil. The instrument is in front of him on the table.",
        caption: "Linus Orri talking about his electric langspil. Photo by Thor."
      }, {}, {})}
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "openlabs/ol6b.jpg",
        alt: "A picture of the langspil. A wooden block with three strings, a jack and two knobs.",
        caption: "The electric langspil. Photo by Thor."
      }, {}, {})}
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "openlabs/ol6c.jpg",
        alt: "A group of people discussing the instrument.",
        caption: "A group of people discussing the instrument. Photo by Thor."
      }, {}, {})}`;
    }
  })}`;
});
