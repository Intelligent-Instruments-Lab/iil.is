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
  default: () => About,
  metadata: () => metadata
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../_app/immutable/chunks/index-85307065.js");
var import_seo_f675d5d9 = require("../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../_app/immutable/chunks/Menu-d2b189d9.js");
const About$1 = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = (0, import_index_85307065.a)(import_pages_b2802677.L, (value) => $Layout = value);
  $$unsubscribe_seo = (0, import_index_85307065.a)(import_seo_f675d5d9.s, (value) => $seo = value);
  let { title } = $$props;
  let { description } = $$props;
  let { layout } = $$props;
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.title = title, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.description = description, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.url = "/about", $seo);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `



${$Layout.menu ? `${(0, import_index_85307065.v)(import_Menu_d2b189d9.M, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"pt-10 sm:pt-12 md:pt-14 pb-24 grid grid-cols-12"}"><div class="${"col-span-1 md:col-span-2 lg:col-span-3"}"></div>
      <div class="${"col-span-10 md:col-span-8 lg:col-span-6"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${(0, import_index_85307065.e)(title)}</h1>
        <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div>
      <div class="${"col-span-1 md:col-span-2 lg:col-span-3"}"></div></div></div>`}`;
});
const metadata = {
  "layout": "about",
  "title": "About",
  "slug": "about",
  "description": "About the Intelligent Instruments Lab"
};
const About = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  return `${(0, import_index_85307065.v)(About$1, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `
<p>The Intelligent Instruments Lab is an interdisciplinary research lab that investigates the role of artificial intelligence in new musical instruments. Music is our research base, but the reach and impact is wider and we explore how musical interfaces can be applied as scientific instruments, for example through sonification.</p>
<p>We study creative AI from a broad humanities basis, involving musicians, computer scientists, philosophers and cognitive scientists in key international institutions. We explore the emerging language and discourse of creative AI, addressing how notions such as agency, autonomy, authenticity, authorship, creativity and originality change with these new technologies.</p>

<p>Our technical approach is to implement new machine learning in embodied musical instruments. We invent instruments that interact, learn and evolve in the hands of the performer. Our theoretical approach is to collaborate with researchers, artists and the public across in key studies of how creative AI alter our relationship with technology, social interaction and knowledge production.  </p>
<p>The ii Lab is located at the Iceland University of the Arts, where we work on designing, building and testing new instruments in collaboration with other researchers, music students and local artists. We have access to the advanced workshops and labs as well as the artistic infrastructure of the university. We seek to maintain a strong public engagement, for example through our Friday Open Labs, symposia and musical events.</p>
`;
    }
  })}`;
});
