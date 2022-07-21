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
  default: () => Halldorophone,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_ResearchProject_50c047b7 = require("../../../_app/immutable/chunks/ResearchProject-50c047b7.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
var import_CaptionedImage_6bbb271e = require("../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js");
const metadata = {
  "layout": "researchproject",
  "title": "Halldorophone",
  "description": "The Halldorophone is a musical instrument.",
  "featured": true,
  "authors": ["Halldor \xDAlfarsson"],
  "highlight_image": "research/projects/halldorophone.jpg",
  "highlight_caption": "The Halldorophone by Halldor \xDAlfarsson."
};
const Halldorophone = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_ResearchProject_50c047b7.R, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>The halldorophone (Icelandic: d\xF3r\xF3f\xF3nn) is a cello-like electronic instrument created by artist and designer Halld\xF3r \xDAlfarsson.
The halldorophone is designed specifically to feedback the strings and the instrument gained some recognition in early 2020 when composer Hildur Gu\xF0nad\xF3ttir won the Academy Award for her original soundtrack to the movie Joker, some of which was composed with a halldorophone.</p>`;
    }
  })}`;
});
