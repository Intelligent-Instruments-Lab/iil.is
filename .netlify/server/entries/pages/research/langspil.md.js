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
  default: () => Langspil,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_ResearchProject_50c047b7 = require("../../../_app/immutable/chunks/ResearchProject-50c047b7.js");
var import_CaptionedImage_6bbb271e = require("../../../_app/immutable/chunks/CaptionedImage-6bbb271e.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const metadata = {
  "layout": "researchproject",
  "title": "Proto-Langspil",
  "description": "The Proto-Langspil is a feedback instrument with intelligent behaviour.",
  "featured": true,
  "authors": ["Thor Magnusson", "Jack Armitage", "Halldor Ulfarsson", "Victor Shepardson"],
  "highlight_image": "research/projects/protolangspil.jpg",
  "highlight_caption": "The ii lab Proto-Langspil"
};
const Langspil = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_ResearchProject_50c047b7.R, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>The Proto-Langspil is our first prototype instrument, made in the first week of the lab, made out of plywood, cut out in the lasercutter in the LHI lab downstairs. We experimented with some versions and are in collaboration with performers who are interested in working with the instrument.</p>
<p>The Langspil is a traditional Icelandic instrument with an interesting, albeit vague history. We are interested in exploring the cultural connotations of the instrument, studying the cultural reception of it as it becomes used and played as part of musical practice. It also extends the millennia old practice - perhaps first documented in the work of Greek philosopher Pythagoras - of using a monochord to study acoustics and music theory.</p>
<p>The Proto-Langspil is an ongoing work in progress where we implement various types of adaptive behaviour in the instrument, ranging from feedback to user gestures, and where we investigate how performers interact with the instrument. A simple object that has triggered a lot of interesting conversations and ideas!</p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "research/projects/protolangspil2.jpg",
        alt: "An image of the proto-langspil with the electronics drawer removed.",
        caption: "The proto-langspil."
      }, {}, {})}`;
    }
  })}`;
});
