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
  default: () => Halldor,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_People_ffe3e5f6 = require("../../../_app/immutable/chunks/People-ffe3e5f6.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const metadata = {
  "name": "Halldor \xDAlfarsson",
  "type": "Member",
  "role": "Fabricator",
  "email": "hau@lhi.is",
  "image": "images/people/halldor.jpg",
  "links": {
    "instagram": "halldorophone",
    "website": "halldorophone.info"
  },
  "projects": [""],
  "pronouns": "he/him",
  "bio": "I am the inventor of the halldorophone, an electro acoustic string instrument intended for working with string based feedback. For the past decade I have been seeking out and working with musicians to make music with halldorophones and noting their thoughts and feelings on the process to inform further development. I am currently working on a PhD documenting and expanding on this work under the supervision of Thor Magnusson and Chris Kiefer at the University of Sussex. Besides working on this project I am currently funded by an innovation grant from the Icelandic Technology Development Fund on further development of halldorophones. I enjoy using my skills as a fabricator to collaborate with musicians and instrument makers in the NIME context."
};
const Halldor = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_People_ffe3e5f6.P, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
