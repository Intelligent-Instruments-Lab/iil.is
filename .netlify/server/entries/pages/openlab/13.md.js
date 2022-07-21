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
  default: () => _13,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_OpenLabEvent_63ba4b85 = require("../../../_app/immutable/chunks/OpenLabEvent-63ba4b85.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const metadata = {
  "layout": "openlab",
  "edition": 13,
  "theme": "Proto-Langspil Pilot Study 1",
  "description": "Soliciting feedback about the Proto-Langspil",
  "date": "2021-12-03"
};
const _13 = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_OpenLabEvent_63ba4b85.O, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>Call for study participants during Open Lab tomorrow (Dec 3rd) 15:00-17:00.</p>
<ul><li>Spend time with the Proto-Langspil and answer a brief survey</li>
<li>4x 30 minute slots available between 15:00-17:00</li>
<li>Do not attend if you have had COVID symptoms in the past 2 weeks</li></ul>
<p>To book a session, contact <a href="${"mailto:jack@lhi.is"}">jack@lhi.is</a>.</p>`;
    }
  })}`;
});
