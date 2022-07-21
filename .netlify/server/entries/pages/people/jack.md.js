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
  default: () => Jack,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_People_ffe3e5f6 = require("../../../_app/immutable/chunks/People-ffe3e5f6.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const metadata = {
  "name": "Jack Armitage",
  "type": "Member",
  "role": "Postdoctoral Research Fellow",
  "email": "jack@lhi.is",
  "image": "images/people/jack.jpg",
  "links": {
    "twitter": "jdkarmitage",
    "github": "jarmitage",
    "scholar": "APvoBhUAAAAJ",
    "instagram": "jdkarmitage",
    "website": "jackarmitage.com"
  },
  "projects": [""],
  "pronouns": "he/him, they/them",
  "bio": "I have a doctorate in Media and Arts Technologies from Queen Mary University of London, where I studied in Prof. Andrew McPherson's Augmented Instruments Lab. During my PhD I was a Visiting Scholar at Georgia Tech under Prof. Jason Freeman. Before then, I was a Research Engineer at ROLI after graduating with a BSc in Music, Multimedia & Electronics from the University of Leeds. My research interests include embodied interaction, craft practice and design cognition. I also produce, perform and live code music as Lil Data, as part of the PC Music record label."
};
const Jack = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_People_ffe3e5f6.P, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
