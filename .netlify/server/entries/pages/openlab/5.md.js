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
  default: () => _5,
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
  "edition": 5,
  "theme": "The gonzo guide to loudspeaker systems",
  "description": "Josh Wilkinson and Sean Patrick O'Brien talk speaker building.",
  "date": "2021-10-08"
};
const _5 = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_OpenLabEvent_63ba4b85.O, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>In this open lab we had two presentations by people building loudspeakers. </p>
<a href="${"http://joshuawilkinsonsd.com/"}" target="${"_blank"}">Josh Wilkinson</a> offered his &quot;gonzo guide&quot; to building efficient and portable sound systems ready for festivals in the middle of the desert.
<br>
<a href="${"http://instagram.com/foreverywhere"}" target="${"_blank"}">Sean Patrick O&#39;Brien</a> discussed experiments with building speakers in various sizes and materials.
<p>Josh and Sean also collaborated on building the sound system for <a href="${"https://www.facebook.com/the.post.house.venue/"}" target="${"_blank"}">P\xF3st-H\xFAsi\xF0</a>.</p>
<br>
${(0, import_index_85307065.v)(import_CaptionedImage_6bbb271e.C, "CaptionedImage").$$render($$result, {
        src: "stock/openlab_5_roundtable.jpeg",
        alt: "People sitting around a table. Young man holding a metalic prototype of an instrument. Linnstrument, computers, pedal, coffee mug and monochord prototype are among the things on the table.",
        caption: "Jack trying out a prototype by Hjalti Nordal Gunnarsson, a student of LH\xCD. Photo by Esther."
      }, {}, {})}`;
    }
  })}`;
});
