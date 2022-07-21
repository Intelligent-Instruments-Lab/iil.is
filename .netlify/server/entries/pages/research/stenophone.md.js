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
  default: () => Stenophone,
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
  "title": "Stenophone",
  "description": "The Stenophone is a musical instrument for live coding.",
  "featured": true,
  "authors": ["Jack Armitage"],
  "highlight_image": "research/projects/stenophone.jpg",
  "highlight_caption": "The Stenophone by Jack Armitage."
};
const Stenophone = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_ResearchProject_50c047b7.R, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>The <a href="${"https://github.com/jarmitage/Stenophone"}" target="${"_blank"}" title="${"Stenophone"}">Stenophone</a> is a musical instrument combining stenotype and live coding.</p>
<p>Though laptop live coders are known to use other devices and instruments and play with other musicians, laptop live coding generally shares the common physical interface of the QWERTY keyboard. This project seeks to provide a means to explore alternatives to the QWERTY keyboard as a physical interface to laptop live coding. This project proposes a live coding keyboard which is also a digital musical instrument, called the Stenophone. </p>
<p>The Stenophone is an augmented stenotype or chorded keyboard, which permits continuous gestural control of keys and features an ergonomic design. These capabilities are exploited to enable the manipulation of algorithms and their parameterisation simultaneously.</p>`;
    }
  })}`;
});
