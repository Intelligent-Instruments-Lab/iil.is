import { c as create_ssr_component, b as add_attribute, e as escape, d as each, v as validate_component } from "./index-85307065.js";
const PillDashed = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { link } = $$props;
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  return `${link.theme === "dark" ? `<div class="${"border-dashed border-primary-500 border-2 hover:border-primary-600 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 bg-primary-500 hover:bg-primary-600 h-9 flex items-center justify-center text-white font-hauser uppercase"}"${add_attribute("href", link.url, 0)}${add_attribute("target", link.target, 0)}>${escape(link.label)}</a></div>` : `${link.theme === "light" ? `<div class="${"border-dashed border-primary-500 border-2 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 h-9 flex items-center justify-center hover:bg-primary-400 text-primary-500 hover:text-white font-hauser uppercase"}"${add_attribute("href", link.url, 0)}${add_attribute("target", link.target, 0)}>${escape(link.label)}</a></div>` : `${link.theme === "dark_alt" ? `<div class="${"border-dashed border-white border-2 hover:border-primary-500 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 bg-white hover:bg-primary-500 h-9 flex items-center justify-center text-primary-700 hover:text-white font-hauser uppercase"}"${add_attribute("href", link.url, 0)}${add_attribute("target", link.target, 0)}>${escape(link.label)}</a></div>` : `${link.theme === "light_alt" ? `<div class="${"border-dashed border-white border-2 rounded-md"}"><a class="${"pl-7 pr-7 pt-2 pb-2 h-9 flex items-center justify-center hover:bg-primary-500 text-white font-hauser uppercase"}"${add_attribute("href", link.url, 0)}${add_attribute("target", link.target, 0)}>${escape(link.label)}</a></div>` : ``}`}`}`}`;
});
const CTARow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { links } = $$props;
  if ($$props.links === void 0 && $$bindings.links && links !== void 0)
    $$bindings.links(links);
  return `<div class="${"flex flex-wrap gap-4 sm:gap-10"}">${each(links, (link) => {
    return `${validate_component(PillDashed, "PillDashed").$$render($$result, { link }, {}, {})}`;
  })}</div>`;
});
const EmbedYouTube_svelte_svelte_type_style_lang = "";
export {
  CTARow as C
};
