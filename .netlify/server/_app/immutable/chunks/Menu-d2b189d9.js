import { c as create_ssr_component, a as subscribe, e as escape, b as add_attribute, d as each, v as validate_component } from "./index-85307065.js";
import { L as Layout, p as pages } from "./pages-b2802677.js";
const MenuItem_svelte_svelte_type_style_lang = "";
const css = {
  code: ".default.svelte-d47nz{--tw-text-opacity:1;color:rgba(78,91,88,var(--tw-text-opacity));font-family:SMHauser-60;font-size:1.25rem;letter-spacing:.05em;line-height:1.75rem;padding-bottom:.5rem;padding-top:.5rem;text-transform:uppercase}@media(min-width:640px){.default.svelte-d47nz{font-size:1.25rem;line-height:1.75rem}}@media(min-width:1024px){.default.svelte-d47nz{font-size:1.875rem;line-height:2.25rem}}.special.svelte-d47nz{--tw-text-opacity:1;color:rgba(78,91,88,var(--tw-text-opacity));font-family:SMHauser-60;font-size:1.25rem;letter-spacing:.05em;line-height:1.75rem;padding-bottom:.5rem;padding-top:.5rem;text-transform:uppercase}@media(min-width:640px){.special.svelte-d47nz{font-size:1.25rem;line-height:1.75rem}}@media(min-width:1024px){.special.svelte-d47nz{font-size:1.875rem;line-height:2.25rem}}",
  map: null
};
const MenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  let { page } = $$props;
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  $$result.css.add(css);
  $$unsubscribe_Layout();
  return `${page.style === "default" ? `${page.url.slice(1) === $Layout.page ? `<a class="${"default svelte-d47nz"}" href="${"#"}">${escape(page.label)}</a>` : `<a class="${"default svelte-d47nz"}"${add_attribute("href", page.url, 0)}>${escape(page.label)}</a>`}` : `${page.style === "special" ? `${page.url.slice(1) === $Layout.page ? `<a class="${"special svelte-d47nz"}" href="${"#"}">${escape(page.label)}</a>` : `<a class="${"special svelte-d47nz"}"${add_attribute("href", page.url, 0)}>${escape(page.label)}</a>`}` : ``}`}`;
});
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"bg-secondary h-screen"}"><div class="${"flex flex-col md:py-6 md:mr-4 ml-8 sm:ml-12 md:ml-16"}">${each(pages, (page, index) => {
    return `${validate_component(MenuItem, "MenuItem").$$render($$result, { page }, {}, {})}`;
  })}</div></div>`;
});
export {
  Menu as M
};
