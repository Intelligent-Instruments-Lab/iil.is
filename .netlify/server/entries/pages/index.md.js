import { c as create_ssr_component, a as subscribe, v as validate_component, e as escape, b as add_attribute } from "../../_app/immutable/chunks/index-85307065.js";
import { L as Layout } from "../../_app/immutable/chunks/pages-b2802677.js";
import { M as Menu } from "../../_app/immutable/chunks/Menu-d2b189d9.js";
import { C as CTARow } from "../../_app/immutable/chunks/EmbedYouTube.svelte_svelte_type_style_lang-0d1d4efc.js";
const Home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  let { title } = $$props;
  let { description } = $$props;
  let { pitch } = $$props;
  let { layout } = $$props;
  let { hero_image } = $$props;
  let { hero_caption } = $$props;
  let { hero_slug } = $$props;
  let cta_links = [
    {
      url: "/news/nime-2022-workshop",
      label: "Learn More",
      theme: "dark",
      target: "_self"
    }
  ];
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.pitch === void 0 && $$bindings.pitch && pitch !== void 0)
    $$bindings.pitch(pitch);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.hero_image === void 0 && $$bindings.hero_image && hero_image !== void 0)
    $$bindings.hero_image(hero_image);
  if ($$props.hero_caption === void 0 && $$bindings.hero_caption && hero_caption !== void 0)
    $$bindings.hero_caption(hero_caption);
  if ($$props.hero_slug === void 0 && $$bindings.hero_slug && hero_slug !== void 0)
    $$bindings.hero_slug(hero_slug);
  $$unsubscribe_Layout();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-secondary h-screen"}"><div class="${"grid grid-cols-8 max-w-screen-xl"}"><div class="${"hidden md:block col-span-3"}">${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}</div>
    
    <div class="${"sm:ml-4 md:ml-12 max-w-xl col-span-8 md:col-span-5 px-12 md:px-0 py-0 md:py-6"}"><div class="${"text-md md:text-xl md:pr-16 text-primary-700"}"><p>${escape(pitch)}</p>
        <p>The call for abstracts is now live for our NIME 2022 workshop on <em>Embedded AI for NIME: Challenges and Opportunities</em>:
        </p></div>
      <div class="${"w-5/6 mt-8"}"><a${add_attribute("href", hero_slug, 0)}${add_attribute("title", hero_caption, 0)}><img class="${"shadow-sm"}"${add_attribute("src", "./images/" + hero_image, 0)}${add_attribute("alt", hero_caption, 0)}>
          <p class="${"text-sm text-primary-500 mt-4"}">${escape(hero_caption)}</p></a></div>
      <div class="${"mt-10"}">${validate_component(CTARow, "CTARow").$$render($$result, { links: cta_links }, {}, {})}</div></div></div></div>`}`;
});
const metadata = {
  "layout": "home",
  "title": "Intelligent Instruments Lab",
  "slug": "",
  "pitch": "We design instruments embedded with creative AI for musical performance. New instruments for new music! Our aim is to understand ourselves as users of intelligent technologies. ",
  "hero_image": "research/projects/protolangspil2.jpg",
  "hero_caption": "Working on Embedded AI for musical instruments? This is the workshop for you!",
  "hero_slug": "news/nime-2022-workshop"
};
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Home, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
export {
  Routes as default,
  metadata
};
