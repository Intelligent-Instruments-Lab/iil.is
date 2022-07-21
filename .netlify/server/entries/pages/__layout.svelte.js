import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute, n as null_to_empty, d as each, v as validate_component } from "../../_app/immutable/chunks/index-85307065.js";
import { s as seo } from "../../_app/immutable/chunks/seo-f675d5d9.js";
import { L as Layout, p as pages } from "../../_app/immutable/chunks/pages-b2802677.js";
const SEO = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  $$unsubscribe_seo();
  return `${$$result.head += `${$$result.title = `<title>${escape($seo.title)} | Intelligent Instruments Lab</title>`, ""}<meta name="${"description"}"${add_attribute("content", $seo.description, 0)} data-svelte="svelte-bspmah"><meta property="${"og:url"}"${add_attribute("content", "https://iil.is" + $seo.url, 0)} data-svelte="svelte-bspmah"><meta property="${"og:title"}"${add_attribute("content", $seo.title + " | Intelligent Instruments Lab", 0)} data-svelte="svelte-bspmah"><meta property="${"og:description"}"${add_attribute("content", $seo.description, 0)} data-svelte="svelte-bspmah"><meta property="${"og:image"}"${add_attribute("content", $seo.image, 0)} data-svelte="svelte-bspmah"><meta property="${"og:type"}" content="${"website"}" data-svelte="svelte-bspmah"><meta name="${"twitter:site"}" content="${"@_iil_is"}" data-svelte="svelte-bspmah"><meta property="${"twitter:url"}"${add_attribute("content", "https://iil.is" + $seo.url, 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:title"}"${add_attribute("content", $seo.title + " | Intelligent Instruments Lab", 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:description"}"${add_attribute("content", $seo.description, 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:image"}"${add_attribute("content", "https://iil.is" + $seo.image, 0)} data-svelte="svelte-bspmah"><meta property="${"twitter:card"}" content="${"summary_large_image"}" data-svelte="svelte-bspmah">`, ""}`;
});
const wordmark = "/_app/immutable/assets/iil_wordmark-d35ec417.svg";
const wordmark_nologo = "/_app/immutable/assets/iil_wordmark_nologo-b022fff8.svg";
const menu = "/_app/immutable/assets/iil_menu-2f8e2158.svg";
const Header_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".menuActive.svelte-l4d74k{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-rotate:180deg}.menuActive.svelte-l4d74k,.menuInactive.svelte-l4d74k{padding:1rem;transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));width:4rem}.menuInactive.svelte-l4d74k{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-rotate:270deg}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$result.css.add(css$1);
  $$unsubscribe_Layout();
  return `<div class="${"bg-secondary"}"><div class="${"grid grid-cols-8 h-42"}"><div class="${"col-span-5 md:col-span-7"}"><a href="${"/"}"><img class="${"w-96 hidden md:block"}"${add_attribute("src", wordmark, 0)} alt="${"Intelligent Instruments Lab"}">
        <img class="${"w-72 block md:hidden"}"${add_attribute("src", wordmark_nologo, 0)} alt="${"Intelligent Instruments Lab"}"></a></div>
    <div class="${"col-span-1 justify-self-end self-center pr-10 hidden md:block"}">${$Layout.page !== "home" ? `<img class="${escape(null_to_empty($Layout.menu ? "menuActive" : "menuInactive"), true) + " svelte-l4d74k"}"${add_attribute("src", menu, 0)} alt="${"Menu"}">` : ``}</div>
    <div class="${"col-span-3 justify-self-end self-center block md:hidden pr-4 sm:pr-10"}"><img class="${escape(null_to_empty($Layout.menu ? "menuActive" : "menuInactive"), true) + " svelte-l4d74k"}"${add_attribute("src", menu, 0)} alt="${"Menu"}"></div></div></div>`;
});
const ListItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  let { label } = $$props;
  let { target } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  return `<a class="${"text-white"}"${add_attribute("href", url, 0)}${add_attribute("target", target, 0)}>${escape(label)}</a>
<br>`;
});
const List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name } = $$props;
  let { list } = $$props;
  let { target } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.list === void 0 && $$bindings.list && list !== void 0)
    $$bindings.list(list);
  if ($$props.target === void 0 && $$bindings.target && target !== void 0)
    $$bindings.target(target);
  return `<div><h1 class="${"font-hauser text-white text-lg"}">${escape(name)}</h1>
  <div class="${"px-2 py-3"}">${each(list, (item, index) => {
    return `${validate_component(ListItem, "ListItem").$$render($$result, { url: item.url, label: item.label, target }, {}, {})}`;
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
const ERC = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"max-w-sm pr-8"}"><img class="${"w-96 md:h-32 lg:h-36 object-cover object-center mb-4"}"${add_attribute("src", eu_erc, 0)} alt="${"European Research Council"}">
  <p class="${"text-white text-xs"}">The Intelligent Instruments project (INTENT) is funded by the European Research Council (ERC) under the European Union\u2019s Horizon 2020 research and innovation programme (Grant agreement No. 101001848).
  </p></div>`;
});
const ERC_Mobile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"mt-8"}"><img class="${"w-72 h-28 object-cover object-center mb-8"}"${add_attribute("src", eu_erc, 0)} alt="${"European Research Council"}">
  <p class="${"text-white text-xs pr-4 max-w-sm "}">The Intelligent Instruments project (INTENT) is funded by the European Research Council (ERC) under the European Union\u2019s Horizon 2020 research and innovation programme (Grant agreement No. 101001848).
  </p></div>`;
});
const Footer_svelte_svelte_type_style_lang = "";
const css = {
  code: ".menuActive.svelte-1n6svma{--tw-border-opacity:1;border-color:rgba(255,237,0,var(--tw-border-opacity));border-style:dashed;border-width:4px}.menuActive.svelte-1n6svma,.menuInactive.svelte-1n6svma{--tw-bg-opacity:1;background-color:rgba(78,91,88,var(--tw-bg-opacity))}",
  map: null
};
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$result.css.add(css);
  $$unsubscribe_Layout();
  return `<div class="${escape(null_to_empty($Layout.menu || $Layout.page === "home" ? "menuActive" : "menuInactive"), true) + " svelte-1n6svma"}"><div class="${"pt-8 pl-6 max-w-screen-xl hidden md:block mb-4 lg:mb-10"}"><div class="${"grid grid-cols-8"}"><div class="${"col-span-2 m-4 lg:ml-12"}"><div class="${"mt-8 mb-8"}"><a href="${"/"}"><img class="${"h-24 lg:h-36"}"${add_attribute("src", logo, 0)} alt="${"Intelligent Instruments Lab"}"></a></div>
        <div class="${"text-sm"}"><a href="${"https://goo.gl/maps/jX1wteK9MjdMKsg28"}" target="${"_blank"}"><div class="${"text-white"}">Intelligent Instruments Lab</div>
            <div class="${"text-white"}">\xDEverholt 11</div>
            <div class="${"text-white"}">105 Reykjav\xEDk</div>
            <div class="${"text-white"}">Iceland</div></a></div></div>
      <div class="${"col-span-6 py-12"}"><div class="${"grid grid-cols-8"}"><div class="${"col-span-2"}">${validate_component(List, "List").$$render($$result, { list: pages, name: "Explore", target: "" }, {}, {})}</div>
          <div class="${"col-span-2"}">${validate_component(List, "List").$$render($$result, {
    list: contact,
    name: "Contact",
    target: "_blank"
  }, {}, {})}</div>
          <div class="${"col-span-4"}">${validate_component(ERC, "ERC").$$render($$result, {}, {}, {})}</div></div></div></div></div>
  <div class="${"pt-8 pl-6 py-8 max-w-screen-xl md:hidden"}"><div class="${"flex flex-col"}"><div class="${""}">${validate_component(List, "List").$$render($$result, {
    list: contact,
    name: "Contact",
    target: "_blank"
  }, {}, {})}</div>
      <div class="${""}"><h1 class="${"font-hauser text-white text-lg"}">Address</h1>
        <div class="${"px-2 py-3"}"><a href="${"https://goo.gl/maps/jX1wteK9MjdMKsg28"}" target="${"_blank"}"><div class="${"text-white"}">Intelligent Instruments Lab</div>
            <div class="${"text-white"}">\xDEverholt 11</div>
            <div class="${"text-white"}">105 Reykjav\xEDk</div>
            <div class="${"text-white"}">Iceland</div></a></div></div>
      <div>${validate_component(ERC_Mobile, "ERC_Mobile").$$render($$result, {}, {}, {})}</div></div></div></div>`;
});
const app = "";
const style = "";
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SEO, "Seo").$$render($$result, {}, {}, {})}
<div class="${""}"><div class="${"bg-secondary"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
    ${slots.default ? slots.default({}) : ``}</div>
  ${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}</div>`;
});
export {
  _layout as default
};
