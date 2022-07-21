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
  M: () => Menu
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("./index-85307065.js");
var import_pages_b2802677 = require("./pages-b2802677.js");
const MenuItem_svelte_svelte_type_style_lang = "";
const css = {
  code: ".default.svelte-d47nz{--tw-text-opacity:1;color:rgba(78,91,88,var(--tw-text-opacity));font-family:SMHauser-60;font-size:1.25rem;letter-spacing:.05em;line-height:1.75rem;padding-bottom:.5rem;padding-top:.5rem;text-transform:uppercase}@media(min-width:640px){.default.svelte-d47nz{font-size:1.25rem;line-height:1.75rem}}@media(min-width:1024px){.default.svelte-d47nz{font-size:1.875rem;line-height:2.25rem}}.special.svelte-d47nz{--tw-text-opacity:1;color:rgba(78,91,88,var(--tw-text-opacity));font-family:SMHauser-60;font-size:1.25rem;letter-spacing:.05em;line-height:1.75rem;padding-bottom:.5rem;padding-top:.5rem;text-transform:uppercase}@media(min-width:640px){.special.svelte-d47nz{font-size:1.25rem;line-height:1.75rem}}@media(min-width:1024px){.special.svelte-d47nz{font-size:1.875rem;line-height:2.25rem}}",
  map: null
};
const MenuItem = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = (0, import_index_85307065.a)(import_pages_b2802677.L, (value) => $Layout = value);
  let { page } = $$props;
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  $$result.css.add(css);
  $$unsubscribe_Layout();
  return `${page.style === "default" ? `${page.url.slice(1) === $Layout.page ? `<a class="${"default svelte-d47nz"}" href="${"#"}">${(0, import_index_85307065.e)(page.label)}</a>` : `<a class="${"default svelte-d47nz"}"${(0, import_index_85307065.b)("href", page.url, 0)}>${(0, import_index_85307065.e)(page.label)}</a>`}` : `${page.style === "special" ? `${page.url.slice(1) === $Layout.page ? `<a class="${"special svelte-d47nz"}" href="${"#"}">${(0, import_index_85307065.e)(page.label)}</a>` : `<a class="${"special svelte-d47nz"}"${(0, import_index_85307065.b)("href", page.url, 0)}>${(0, import_index_85307065.e)(page.label)}</a>`}` : ``}`}`;
});
const Menu = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"bg-secondary h-screen"}"><div class="${"flex flex-col md:py-6 md:mr-4 ml-8 sm:ml-12 md:ml-16"}">${(0, import_index_85307065.d)(import_pages_b2802677.p, (page, index) => {
    return `${(0, import_index_85307065.v)(MenuItem, "MenuItem").$$render($$result, { page }, {}, {})}`;
  })}</div></div>`;
});
