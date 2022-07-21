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
  default: () => _3,
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
  "edition": 3,
  "theme": "Acoustic and Sonic Heritages",
  "description": "Barcelona Patrimoni Acoustic collective and Ragnar \xC1rni \xD3lafsson.",
  "date": "2021-09-24"
};
const _3 = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(import_OpenLabEvent_63ba4b85.O, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>We had a visit from the Barcelona Patrimoni Acoustic collective. They presented their interesting work. After that Ragnar Arni presented his machine learning work with Jennifer Walshe on her text scores.</p>
<p>Info:</p>
<p><a href="${"http://patrimoniacustic.cat"}" rel="${"nofollow"}">Patrimoni Acustic</a>
<a href="${"https://www.rncm.ac.uk/research/research-centres-rncm/prism/prism-blog/ai-text-scores/"}" rel="${"nofollow"}">Walshe\u2019s text scores</a></p>`;
    }
  })}`;
});
