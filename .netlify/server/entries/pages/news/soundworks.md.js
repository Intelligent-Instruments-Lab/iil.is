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
  default: () => Soundworks,
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
  "date": "2022-02-04",
  "title": "Sound Works: An Orpheus Institute Publication",
  "description": "A research article about the Threnoscope",
  "featured": false
};
const Soundworks = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Thor Magnusson\u2019s text <i>Designing the Threnoscope, or, How I Wrote One of My Pieces</i> has just been published in a new Orpheus Institute Publicaton called <a href="${"https://orpheusinstituut.be/en/publications/sound-work"}" target="${"_blank"}">Sound Work</a>. </p>
<p>Download the chapter here: <a href="${"http://users.sussex.ac.uk/~thm21/thor/pdfs/Magnusson_SoundWork.pdf"}" target="${"_blank"}">PDF</a></p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "news/soundwork.png",
        alt: "The front cover of the Sound Works book",
        caption: "A picture of medieval musicians"
      }, {}, {})}
<p>The Threnoscope live coding system started as a musical piece exploring ideas of microtonal music, surround sound, and long duration time frames. During its compositional design process the piece evolved into a live coding performance system, a hybrid of an instrument and a compositional system. The unfolding of the work took place in a context of live performances, audience feedback, user comments, and ideas that developed in concert with how the body of code grew and stabilised.</p>
<p>This chapter introduces the system, the research underpinning it, and describes how the bricoleur approach to programming served as a platform for asking questions that materialised in the engagement with the code, the physical properties of sound, and compositional ideas. The piece is a good example of a practice-based research, involving questions in the fields of music, human-computer interaction, programming language design, and user studies. </p>
<p>The chapter reflects on the nature of artistic research and how music software development goes hand in hand with music research. I demonstrate how the digital system\u2019s requirements for specifications and completeness inevitably forces a strong understanding of the source domain, namely the physical nature of sound. Such musical practice, when expressed through performance or composition, derives from a rigid research process, yet exists separately from it. </p>`;
    }
  })}`;
});
