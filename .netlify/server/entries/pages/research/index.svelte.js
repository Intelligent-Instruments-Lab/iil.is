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
  default: () => Research_1,
  load: () => load
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_DarkPaginationNav_svelte_svelte_type_style_lang_c211c6b2 = require("../../../_app/immutable/chunks/DarkPaginationNav.svelte_svelte_type_style_lang-c211c6b2.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const Research = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let featured;
  let all;
  let featuredPaginated;
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = (0, import_index_85307065.a)(import_pages_b2802677.L, (value) => $Layout = value);
  $$unsubscribe_seo = (0, import_index_85307065.a)(import_seo_f675d5d9.s, (value) => $seo = value);
  let { layout = "research" } = $$props;
  let { title = "Research" } = $$props;
  let { description = "Research Projects from the Intelligent Instruments Lab." } = $$props;
  let { projects } = $$props;
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.title = title, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.description = description, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.url = "/research", $seo);
  let items = projects;
  const methods = {
    authorString: (authors) => {
      if (authors.length === 1)
        return authors[0];
      else if (authors.length === 2)
        return authors[0] + " and " + authors[1];
      else {
        let s = "";
        for (var i = 0; i < authors.length; i++) {
          if (i < authors.length - 2)
            s = s + authors[i] + ", ";
          else
            s = s + " and " + authors[i];
        }
        return s;
      }
    }
  };
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.projects === void 0 && $$bindings.projects && projects !== void 0)
    $$bindings.projects(projects);
  featured = {
    size: 100,
    page: 1,
    items
  };
  all = { size: 4, page: 1, items };
  featuredPaginated = (0, import_DarkPaginationNav_svelte_svelte_type_style_lang_c211c6b2.p)({
    items: featured.items,
    pageSize: featured.size,
    currentPage: featured.page
  });
  (0, import_DarkPaginationNav_svelte_svelte_type_style_lang_c211c6b2.p)({
    items: all.items,
    pageSize: all.size,
    currentPage: all.page
  });
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${(0, import_index_85307065.v)(import_Menu_d2b189d9.M, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><main class="${"p-6 sm:p-12 md:p-14 max-w-5xl"}"><article><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${(0, import_index_85307065.e)(title)}</h1>
        <div class="${"mt-4 sm:mt-8 p-2"}"><p>Here you will find our research projects.</p></div>
        <div class="${"mt-2 sm:p-2"}">
          <div class="${"grid grid-flow-row grid-cols-1 md:grid-cols-2"}">${(0, import_index_85307065.d)(featuredPaginated, ({ metadata: { title: title2, date, description: description2, authors, highlight_image, highlight_caption }, path }) => {
    return `
              <div class="${"border-primary-100 hover:border-white shadow-sm hover:shadow-md rounded-sm w-64 sm:w-72 lg:w-96 h-64 sm:h-72 lg:h-96 mb-8 sm:mb-12 lg:mb-16"}"><div class="${"bg-primary-100"}"><a sveltekit:prefetch${(0, import_index_85307065.b)("href", "research/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"bg-cover bg-no-repeat bg-center h-64 sm:h-72 lg:h-96 flex flex-wrap content-end"}"${(0, import_index_85307065.b)("style", "background-image: url(images/" + highlight_image + ");", 0)}><div class="${"px-4 py-4 w-64 sm:w-72 lg:w-96 grid grid-rows-1 pb-8 bg-primary-900 bg-opacity-75 hover:bg-primary-800 hover:bg-opacity-50 "}"><div><h2 class="${"text-2xl mt-2 text-white"}">${(0, import_index_85307065.e)(title2)}</h2>
                          <div class="${"text-sm font-hauser text-white uppercase mt-4"}">${(0, import_index_85307065.e)(methods.authorString(authors))}</div>
                          <p class="${"text-sm mt-2 text-white"}">${(0, import_index_85307065.e)(description2)}</p></div>
                        
                      </div></div>
                  </a></div>
              </div>`;
  })}</div>
          <div class="${"mx-auto"}">
            ${featured.items.length > featured.size ? `${(0, import_index_85307065.v)(import_DarkPaginationNav_svelte_svelte_type_style_lang_c211c6b2.P, "PaginationNav").$$render($$result, {
    totalItems: featured.items.length,
    pageSize: featured.size,
    currentPage: featured.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div>
        </article></main></div>`}`;
});
async function load({ fetch }) {
  const res = await fetch(`/research/projects.json`);
  const projects = await res.json();
  return { props: { projects } };
}
const Research_1 = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { projects } = $$props;
  if ($$props.projects === void 0 && $$bindings.projects && projects !== void 0)
    $$bindings.projects(projects);
  return `${(0, import_index_85307065.v)(Research, "Research").$$render($$result, { projects }, {}, {})}`;
});
