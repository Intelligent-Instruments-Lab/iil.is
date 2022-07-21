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
  default: () => Enrike,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_People_ffe3e5f6 = require("../../../_app/immutable/chunks/People-ffe3e5f6.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const metadata = {
  "name": "Enrique Hurtado",
  "type": "Associate",
  "role": "Associate",
  "email": "enrique.hurtado@ehu.eus",
  "image": "images/people/enrike_1500.jpg",
  "links": {
    "github": "enrike",
    "website": "enrike.ixi-audio.net"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I teach Fine Arts at the UPV/EHU University in Bilbao where I did my doctoral thesis on generative music and the txalaparta. I studied Art in Bilbao and MA Design for Interactive Media in London. I am part of www.ixi-audio.net since 2001 and I like developing software to make weird music. I am interested in that place where popular music, contemporary music, art and the creative use of technology meet."
};
const Enrike = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_People_ffe3e5f6.P, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
