var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => Outputs_1,
  load: () => load
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
var bibtex = __toESM(require("bibtex"));
const Publication = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { pub } = $$props;
  const field = (f) => bibtex.normalizeFieldValue(pub.getField(f));
  if ($$props.pub === void 0 && $$bindings.pub && pub !== void 0)
    $$bindings.pub(pub);
  return `<div><p>${pub.type === "inproceedings" ? `${(0, import_index_85307065.e)(field("AUTHOR"))}. 
      <i>${(0, import_index_85307065.e)(field("TITLE"))}.</i> 
      ${(0, import_index_85307065.e)(field("BOOKTITLE"))}. 
      ${(0, import_index_85307065.e)(field("YEAR"))}.` : `${pub.type === "article" ? `${(0, import_index_85307065.e)(field("AUTHOR"))}. 
      <i>${(0, import_index_85307065.e)(field("TITLE"))}.</i> 
      ${(0, import_index_85307065.e)(field("JOURNAL"))}. 
      ${(0, import_index_85307065.e)(field("YEAR"))}.` : `${pub.type === "book" ? `${(0, import_index_85307065.e)(field("AUTHOR"))}. 
      <i>${(0, import_index_85307065.e)(field("TITLE"))}.</i>
      ${(0, import_index_85307065.e)(field("YEAR"))}.` : ``}`}`}</p></div>`;
});
let title = "Outputs";
let description = "This page contains outputs from the Intelligent Instruments Lab.";
const Outputs = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = (0, import_index_85307065.a)(import_pages_b2802677.L, (value) => $Layout = value);
  $$unsubscribe_seo = (0, import_index_85307065.a)(import_seo_f675d5d9.s, (value) => $seo = value);
  let { layout } = $$props;
  let { publications } = $$props;
  const bib = Object.values(bibtex.parseBibFile(publications).entries$);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.title = title, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.description = description, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.url = "/outputs", $seo);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.publications === void 0 && $$bindings.publications && publications !== void 0)
    $$bindings.publications(publications);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `



${$$result.head += `${$$result.title = `<title>${(0, import_index_85307065.e)(title)}</title>`, ""}<meta name="${"description"}"${(0, import_index_85307065.b)("content", description, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${(0, import_index_85307065.v)(import_Menu_d2b189d9.M, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${(0, import_index_85307065.e)(title)}</h1>
      <div class="${"p-2 sm:p-4"}"><p>${(0, import_index_85307065.e)(description)}</p>
        
        <div class="${"h-6"}"></div>
        <h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-4"}">Publications
        </h2>
        ${(0, import_index_85307065.d)(bib, (entry) => {
    return `${(0, import_index_85307065.v)(Publication, "Publication").$$render($$result, { pub: entry }, {}, {})}`;
  })}</div></div></div>`}`;
});
async function load({ fetch }) {
  const res = await fetch(`/publications.bib`);
  const publications = await res.text();
  return { props: { publications } };
}
const Outputs_1 = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { publications } = $$props;
  if ($$props.publications === void 0 && $$bindings.publications && publications !== void 0)
    $$bindings.publications(publications);
  return `${(0, import_index_85307065.v)(Outputs, "Outputs").$$render($$result, { publications }, {}, {})}`;
});
