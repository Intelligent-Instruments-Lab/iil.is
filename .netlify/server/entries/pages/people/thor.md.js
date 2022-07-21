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
  default: () => Thor,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_People_ffe3e5f6 = require("../../../_app/immutable/chunks/People-ffe3e5f6.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const metadata = {
  "name": "Thor Magnusson",
  "type": "Member",
  "role": "Principal Investigator",
  "email": "thor.magnusson@lhi.is",
  "image": "images/people/thor.jpg",
  "links": {
    "twitter": "thormagnusson",
    "github": "thormagnusson",
    "scholar": "cCgOZ_gAAAAJ",
    "website": "thormagnusson.github.io"
  },
  "projects": ["sonicwriting"],
  "pronouns": "he/him",
  "bio": "I\u2019m a professor of future music in the Music Department at the University of Sussex and a research professor at the Iceland University of the Arts. I\u2019ve recently served as an Edgard-Var\xE8se guest professor at the Technische Universit\xE4t Berlin. My research interests include musical performance, improvisation, new technologies for musical expression, live coding, musical notation, artificial intelligence and computational creativity."
};
const Thor = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_People_ffe3e5f6.P, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
