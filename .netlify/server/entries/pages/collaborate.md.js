import { c as create_ssr_component, a as subscribe, h as set_store_value, v as validate_component, e as escape } from "../../_app/immutable/chunks/index-85307065.js";
import { s as seo } from "../../_app/immutable/chunks/seo-f675d5d9.js";
import { L as Layout } from "../../_app/immutable/chunks/pages-b2802677.js";
import { M as Menu } from "../../_app/immutable/chunks/Menu-d2b189d9.js";
const Collaborate$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { title } = $$props;
  let { description } = $$props;
  let { layout } = $$props;
  set_store_value(seo, $seo = { title, description }, $seo);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `



${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title)}</h1>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div></div>`}`;
});
const metadata = {
  "layout": "collaborate",
  "title": "Collaborate",
  "slug": "collaborate",
  "description": "Collaborate with us"
};
const Collaborate = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Collaborate$1, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>The Intelligent Instruments Lab is open for collaborations with artists and scientists on experimental projects, equally as part of our work programme and as collaborations with other projects. We work with various research institutions around the world.</p>
<p>We also run a visiting researcher scheme. We welcome people to come and work with us in our wonderful Reykjavik lab over a specified period of time. The aim with this scheme is to enable artists, composers and musicians to develop technologies for their musical expression, but in turn the collaboration will help us answer our research questions. </p>
<p>Please get in touch with the Principal Investigator, Thor Magnusson, or the lab members you\u2019d like to work with - all the relevant contact information can be found in our <a href="${"/team"}">Team Page</a>.</p>
<p>We also have a <a href="${"https://discord.gg/Z5HZ5quk"}">public channel</a> on Discord for any questions or conversation. We also have an <a href="${"https://discord.gg/UTFPmHgA"}">Open Lab</a> Discord Channel. </p>`;
    }
  })}`;
});
export {
  Collaborate as default,
  metadata
};
