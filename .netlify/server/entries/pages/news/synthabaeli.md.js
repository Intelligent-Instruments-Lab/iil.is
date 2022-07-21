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
  default: () => Synthabaeli,
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
  "date": "2022-05-11",
  "title": "Celebrating International Synthesizer Day",
  "description": "See you down at Reykjavik City Library's Den of Synth!",
  "featured": false
};
const Synthabaeli = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_NewsItem_d440c00e.N, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>We are pleased to be participating in this years Synthab\xE6li | Hlj\xF3\xF0gervlamessa at Reykjav\xEDk City Library.
We will be bringing some things we\u2019ve been working on, and are looking forward to seeing you there!</p>
<p>More info on the event below:</p>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "news/synthabaeli.jpg",
        alt: "Promotional graphic for Synthab\xE6li | Hlj\xF3\xF0gervlamessa, 14 May, Reykjavik City Library..",
        caption: "Synthab\xE6li | Hlj\xF3\xF0gervlamessa, 14 May, Reykjavik City Library."
      }, {}, {})}
<p>International Synthesizer Day is celebrated each year around the birthday of Robert Moog (May 23rd 1934), the inventor of the first commercial synth. His beloved creation has had such a massive influence across all genres that it would be difficult to imagine modern music without the synthesizer.</p>
<p>In honor of the glorious synthesizer, the downtown Reykjavik City Library will transform its first floor into a fantastic Den of Synth! On Saturday, May 14th, visitors and the curious of all ages can wander among and play with all kinds of magical synthesizers and rare gear that musicians and other synth enthusiasts will have on display. An electronic music wonderland awaits you, and everyone is invited!</p>
<p><a href="${"https://www.facebook.com/events/3298760190383641"}" rel="${"nofollow"}">https://www.facebook.com/events/3298760190383641</a></p>`;
    }
  })}`;
});
