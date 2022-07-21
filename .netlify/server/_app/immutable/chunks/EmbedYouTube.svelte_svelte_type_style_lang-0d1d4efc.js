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
  C: () => CTARow
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("./index-85307065.js");
const PillDashed = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { link } = $$props;
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  return `${link.theme === "dark" ? `<div class="${"border-dashed border-primary-500 border-2 hover:border-primary-600 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 bg-primary-500 hover:bg-primary-600 h-9 flex items-center justify-center text-white font-hauser uppercase"}"${(0, import_index_85307065.b)("href", link.url, 0)}${(0, import_index_85307065.b)("target", link.target, 0)}>${(0, import_index_85307065.e)(link.label)}</a></div>` : `${link.theme === "light" ? `<div class="${"border-dashed border-primary-500 border-2 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 h-9 flex items-center justify-center hover:bg-primary-400 text-primary-500 hover:text-white font-hauser uppercase"}"${(0, import_index_85307065.b)("href", link.url, 0)}${(0, import_index_85307065.b)("target", link.target, 0)}>${(0, import_index_85307065.e)(link.label)}</a></div>` : `${link.theme === "dark_alt" ? `<div class="${"border-dashed border-white border-2 hover:border-primary-500 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 bg-white hover:bg-primary-500 h-9 flex items-center justify-center text-primary-700 hover:text-white font-hauser uppercase"}"${(0, import_index_85307065.b)("href", link.url, 0)}${(0, import_index_85307065.b)("target", link.target, 0)}>${(0, import_index_85307065.e)(link.label)}</a></div>` : `${link.theme === "light_alt" ? `<div class="${"border-dashed border-white border-2 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 h-9 flex items-center justify-center hover:bg-primary-500 text-white font-hauser uppercase"}"${(0, import_index_85307065.b)("href", link.url, 0)}${(0, import_index_85307065.b)("target", link.target, 0)}>${(0, import_index_85307065.e)(link.label)}</a></div>` : ``}`}`}`}`;
});
const CTARow = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { links } = $$props;
  if ($$props.links === void 0 && $$bindings.links && links !== void 0)
    $$bindings.links(links);
  return `<div class="${"flex flex-wrap gap-4 sm:gap-10"}">${(0, import_index_85307065.d)(links, (link) => {
    return `${(0, import_index_85307065.v)(PillDashed, "PillDashed").$$render($$result, { link }, {}, {})}`;
  })}</div>`;
});
const EmbedYouTube_svelte_svelte_type_style_lang = "";
