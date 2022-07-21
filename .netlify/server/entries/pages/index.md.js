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
  default: () => Routes,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../_app/immutable/chunks/index-85307065.js");
var import_pages_b2802677 = require("../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../_app/immutable/chunks/Menu-d2b189d9.js");
var import_EmbedYouTube_svelte_svelte_type_style_lang_0d1d4efc = require("../../_app/immutable/chunks/EmbedYouTube.svelte_svelte_type_style_lang-0d1d4efc.js");
const Home = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  $$unsubscribe_Layout = (0, import_index_85307065.a)(import_pages_b2802677.L, (value) => $Layout = value);
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
  return `${$Layout.menu ? `${(0, import_index_85307065.v)(import_Menu_d2b189d9.M, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-secondary h-screen"}"><div class="${"grid grid-cols-8 max-w-screen-xl"}"><div class="${"hidden md:block col-span-3"}">${(0, import_index_85307065.v)(import_Menu_d2b189d9.M, "Menu").$$render($$result, {}, {}, {})}</div>
    
    <div class="${"sm:ml-4 md:ml-12 max-w-xl col-span-8 md:col-span-5 px-12 md:px-0 py-0 md:py-6"}"><div class="${"text-md md:text-xl md:pr-16 text-primary-700"}"><p>${(0, import_index_85307065.e)(pitch)}</p>
        <p>The call for abstracts is now live for our NIME 2022 workshop on <em>Embedded AI for NIME: Challenges and Opportunities</em>:
        </p></div>
      <div class="${"w-5/6 mt-8"}"><a${(0, import_index_85307065.b)("href", hero_slug, 0)}${(0, import_index_85307065.b)("title", hero_caption, 0)}><img class="${"shadow-sm"}"${(0, import_index_85307065.b)("src", "./images/" + hero_image, 0)}${(0, import_index_85307065.b)("alt", hero_caption, 0)}>
          <p class="${"text-sm text-primary-500 mt-4"}">${(0, import_index_85307065.e)(hero_caption)}</p></a></div>
      <div class="${"mt-10"}">${(0, import_index_85307065.v)(import_EmbedYouTube_svelte_svelte_type_style_lang_0d1d4efc.C, "CTARow").$$render($$result, { links: cta_links }, {}, {})}</div></div></div></div>`}`;
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
const Routes = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(Home, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {})}`;
});
