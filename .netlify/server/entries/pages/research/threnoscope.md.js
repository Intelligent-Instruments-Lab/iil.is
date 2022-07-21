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
  default: () => Threnoscope,
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
  "title": "Threnoscope",
  "description": "The Threnoscope is a live coding environment for long durations.",
  "featured": true,
  "authors": ["Thor Magnusson"],
  "highlight_image": "research/projects/threnoscope.png",
  "highlight_caption": "The Threnoscope by Thor Magnusson."
};
const Threnoscope = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_ResearchProject_50c047b7.R, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>The <a href="${"https://thormagnusson.github.io/threnoscope/"}" title="${"Threnoscope"}">Threnoscope</a> is a live coding system focusing on three key areas of music: spatial sound, timbre and texture, and tunings and scales. It has affordances that result in long durational notes that can move around in space, change timbre (through filtering, resonance frequencies and waveforms) and pitch according to implementation of numerous tunings and scales.</p>
<p>The Threnoscope was intitially intended to be a musical piece, but became an expressive system, an investigation into spatial sound, wave interferences and the relationship of harmonic ratios and tuning systems from the world\u2019s various musical systems.</p>
<p>Implementing the Scala tuning library standard, the Thrensocope has access over 5000 tuning systems and scales, and it contains an application for creating your own microtonal tunings and scales.</p>`;
    }
  })}`;
});
