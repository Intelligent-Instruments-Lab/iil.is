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
  default: () => _layout
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../_app/immutable/chunks/index-85307065.js");
var import_seo_f675d5d9 = require("../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../_app/immutable/chunks/pages-b2802677.js");
const SEO = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_seo = (0, import_index_85307065.a)(import_seo_f675d5d9.s, (value) => $seo = value);
  $$unsubscribe_seo();
  return `${$$result.head += `${$$result.title = `<title>${(0, import_index_85307065.e)($seo.title)} | Intelligent Instruments Lab</title>`, ""}<meta name="${"description"}"${(0, import_index_85307065.b)("content", $seo.description, 0)} data-svelte="svelte-bspmah"><meta property="${"og:url"}"${(0, import_index_85307065.b)("content", "https://iil.is" + $seo.url, 0)} data-svelte="svelte-bspmah"><meta property="${"og:title"}"${(0, import_index_85307065.b)("content", $seo.title + " | Intelligent Instruments Lab", 0)} data-svelte="svelte-bspmah"><meta property="${"og:description"}"${(0, import_index_85307065.b)("content", $seo.description, 0)} data-svelte="svelte-bspmah"><meta property="${"og:image"}"${(0, import_index_85307065.b)("content", $seo.image, 0)} data-svelte="svelte-bspmah"><meta property="${"og:type"}" content="${"website"}" data-svelte="svelte-bspmah"><meta name="${"twitter:site"}" content="${"@_iil_is"}" data-svelte="svelte-bspmah"><meta property="${"twitter:url"}"${(0, import_index_85307065.b)("content", "https://iil.is" + $seo.url, 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:title"}"${(0, import_index_85307065.b)("content", $seo.title + " | Intelligent Instruments Lab", 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:description"}"${(0, import_index_85307065.b)("content", $seo.description, 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:image"}"${(0, import_index_85307065.b)("content", "https://iil.is" + $seo.image, 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:card"}" content="${"summary_large_image"}" data-svelte="svelte-bspmah">`, ""}`;
});
const wordmark = "/_app/immutable/assets/iil_wordmark-d35ec417.svg";
const wordmark_nologo = "/_app/immutable/assets/iil_wordmark_nologo-b022fff8.svg";
const menu = "/_app/immutable/assets/iil_menu-2f8e2158.svg";
const Header_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".menuActive.svelte-l4d74k{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-rotate:180deg}.menuActive.svelte-l4d74k,.menuInactive.svelte-l4d74k{padding:1rem;transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));width:4rem}.menuInactive.svelte-l4d74k{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-rotate:270deg}",
  map: null
};
const Header = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = (0, import_index_85307065.a)(import_pages_b2802677.L, (value) => $Layout = value);
  $$result.css.add(css$1);
  $$unsubscribe_Layout();
  return `<div class="${"bg-secondary"}"><div class="${"grid grid-cols-8 h-42"}"><div class="${"col-span-5 md:col-span-7"}"><a href="${"/"}"><img class="${"w-96 hidden md:block"}"${(0, import_index_85307065.b)("src", wordmark, 0)} alt="${"Intelligent Instruments Lab"}">
        <img class="${"w-72 block md:hidden"}"${(0, import_index_85307065.b)("src", wordmark_nologo, 0)} alt="${"Intelligent Instruments Lab"}"></a></div>
    <div class="${"col-span-1 justify-self-end self-center pr-10 hidden md:block"}">${$Layout.page !== "home" ? `<img class="${(0, import_index_85307065.e)((0, import_index_85307065.n)($Layout.menu ? "menuActive" : "menuInactive"), true) + " svelte-l4d74k"}"${(0, import_index_85307065.b)("src", menu, 0)} alt="${"Menu"}">` : ``}</div>
    <div class="${"col-span-3 justify-self-end self-center block md:hidden pr-4 sm:pr-10"}"><img class="${(0, import_index_85307065.e)((0, import_index_85307065.n)($Layout.menu ? "menuActive" : "menuInactive"), true) + " svelte-l4d74k"}"${(0, import_index_85307065.b)("src", menu, 0)} alt="${"Menu"}"></div></div></div>`;
});
const ListItem = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  let { label } = $$props;
  let { target } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  return `<a class="${"text-white"}"${(0, import_index_85307065.b)("href", url, 0)}${(0, import_index_85307065.b)("target", target, 0)}>${(0, import_index_85307065.e)(label)}</a>
<br>`;
});
const List = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { list } = $$props;
  let { target } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.list === void 0 && $$bindings.list && list !== void 0)
    $$bindings.list(list);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  return `<div><h1 class="${"font-hauser text-white text-lg"}">${(0, import_index_85307065.e)(name)}</h1>
  <div class="${"px-2 py-3"}">${(0, import_index_85307065.d)(list, (item, index) => {
    return `${(0, import_index_85307065.v)(ListItem, "ListItem").$$render($$result, { url: item.url, label: item.label, target }, {}, {})}`;
  })}</div></div>`;
});
const logo = "/_app/immutable/assets/iil_logo_white_fit-610860e0.svg";
const contact = [
  {
    url: "mailto:iil@lhi.is",
    label: "Email"
  },
  {
    url: "https://facebook.com/intelligentinstrumentslab",
    label: "Facebook"
  },
  {
    url: "https://instagram.com/intelligentinstruments",
    label: "Instagram"
  },
  {
    url: "https://twitter.com/_iil_is",
    label: "Twitter"
  },
  {
    url: "https://discord.gg/fY9GYMebtJ",
    label: "Discord"
  },
  {
    url: "https://github.com/intelligent-instruments-lab",
    label: "GitHub"
  }
];
const eu_erc = "/_app/immutable/assets/eu_erc-603ae00c.svg";
const ERC = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"max-w-sm pr-8"}"><img class="${"w-96 md:h-32 lg:h-36 object-cover object-center mb-4"}"${(0, import_index_85307065.b)("src", eu_erc, 0)} alt="${"European Research Council"}">
  <p class="${"text-white text-xs"}">The Intelligent Instruments project (INTENT) is funded by the European Research Council (ERC) under the European Union\u2019s Horizon 2020 research and innovation programme (Grant agreement No. 101001848).
  </p></div>`;
});
const ERC_Mobile = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"mt-8"}"><img class="${"w-72 h-28 object-cover object-center mb-8"}"${(0, import_index_85307065.b)("src", eu_erc, 0)} alt="${"European Research Council"}">
  <p class="${"text-white text-xs pr-4 max-w-sm "}">The Intelligent Instruments project (INTENT) is funded by the European Research Council (ERC) under the European Union\u2019s Horizon 2020 research and innovation programme (Grant agreement No. 101001848).
  </p></div>`;
});
const Footer_svelte_svelte_type_style_lang = "";
const css = {
  code: ".menuActive.svelte-1n6svma{--tw-border-opacity:1;border-color:rgba(255,237,0,var(--tw-border-opacity));border-style:dashed;border-width:4px}.menuActive.svelte-1n6svma,.menuInactive.svelte-1n6svma{--tw-bg-opacity:1;background-color:rgba(78,91,88,var(--tw-bg-opacity))}",
  map: null
};
const Footer = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = (0, import_index_85307065.a)(import_pages_b2802677.L, (value) => $Layout = value);
  $$result.css.add(css);
  $$unsubscribe_Layout();
  return `<div class="${(0, import_index_85307065.e)((0, import_index_85307065.n)($Layout.menu || $Layout.page === "home" ? "menuActive" : "menuInactive"), true) + " svelte-1n6svma"}"><div class="${"pt-8 pl-6 max-w-screen-xl hidden md:block mb-4 lg:mb-10"}"><div class="${"grid grid-cols-8"}"><div class="${"col-span-2 m-4 lg:ml-12"}"><div class="${"mt-8 mb-8"}"><a href="${"/"}"><img class="${"h-24 lg:h-36"}"${(0, import_index_85307065.b)("src", logo, 0)} alt="${"Intelligent Instruments Lab"}"></a></div>
        <div class="${"text-sm"}"><a href="${"https://goo.gl/maps/jX1wteK9MjdMKsg28"}" target="${"_blank"}"><div class="${"text-white"}">Intelligent Instruments Lab</div>
            <div class="${"text-white"}">\xDEverholt 11</div>
            <div class="${"text-white"}">105 Reykjav\xEDk</div>
            <div class="${"text-white"}">Iceland</div></a></div></div>
      <div class="${"col-span-6 py-12"}"><div class="${"grid grid-cols-8"}"><div class="${"col-span-2"}">${(0, import_index_85307065.v)(List, "List").$$render($$result, { list: import_pages_b2802677.p, name: "Explore", target: "" }, {}, {})}</div>
          <div class="${"col-span-2"}">${(0, import_index_85307065.v)(List, "List").$$render($$result, {
    list: contact,
    name: "Contact",
    target: "_blank"
  }, {}, {})}</div>
          <div class="${"col-span-4"}">${(0, import_index_85307065.v)(ERC, "ERC").$$render($$result, {}, {}, {})}</div></div></div></div></div>
  <div class="${"pt-8 pl-6 py-8 max-w-screen-xl md:hidden"}"><div class="${"flex flex-col"}"><div class="${""}">${(0, import_index_85307065.v)(List, "List").$$render($$result, {
    list: contact,
    name: "Contact",
    target: "_blank"
  }, {}, {})}</div>
      <div class="${""}"><h1 class="${"font-hauser text-white text-lg"}">Address</h1>
        <div class="${"px-2 py-3"}"><a href="${"https://goo.gl/maps/jX1wteK9MjdMKsg28"}" target="${"_blank"}"><div class="${"text-white"}">Intelligent Instruments Lab</div>
            <div class="${"text-white"}">\xDEverholt 11</div>
            <div class="${"text-white"}">105 Reykjav\xEDk</div>
            <div class="${"text-white"}">Iceland</div></a></div></div>
      <div>${(0, import_index_85307065.v)(ERC_Mobile, "ERC_Mobile").$$render($$result, {}, {}, {})}</div></div></div></div>`;
});
const app = "";
const style = "";
const _layout = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(SEO, "Seo").$$render($$result, {}, {}, {})}
<div class="${""}"><div class="${"bg-secondary"}">${(0, import_index_85307065.v)(Header, "Header").$$render($$result, {}, {}, {})}
    ${slots.default ? slots.default({}) : ``}</div>
  ${(0, import_index_85307065.v)(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
