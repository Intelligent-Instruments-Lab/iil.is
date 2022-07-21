import { c as create_ssr_component, a as subscribe, h as set_store_value, v as validate_component, e as escape, d as each, b as add_attribute } from "../../../_app/immutable/chunks/index-85307065.js";
import { p as paginate, P as PaginationNav } from "../../../_app/immutable/chunks/DarkPaginationNav.svelte_svelte_type_style_lang-c211c6b2.js";
import { s as seo } from "../../../_app/immutable/chunks/seo-f675d5d9.js";
import { L as Layout } from "../../../_app/immutable/chunks/pages-b2802677.js";
import { M as Menu } from "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const Research = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let featured;
  let all;
  let featuredPaginated;
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { layout = "research" } = $$props;
  let { title = "Research" } = $$props;
  let { description = "Research Projects from the Intelligent Instruments Lab." } = $$props;
  let { projects } = $$props;
  set_store_value(seo, $seo.title = title, $seo);
  set_store_value(seo, $seo.description = description, $seo);
  set_store_value(seo, $seo.url = "/research", $seo);
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
  featuredPaginated = paginate({
    items: featured.items,
    pageSize: featured.size,
    currentPage: featured.page
  });
  paginate({
    items: all.items,
    pageSize: all.size,
    currentPage: all.page
  });
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><main class="${"p-6 sm:p-12 md:p-14 max-w-5xl"}"><article><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title)}</h1>
        <div class="${"mt-4 sm:mt-8 p-2"}"><p>Here you will find our research projects.</p></div>
        <div class="${"mt-2 sm:p-2"}">
          <div class="${"grid grid-flow-row grid-cols-1 md:grid-cols-2"}">${each(featuredPaginated, ({ metadata: { title: title2, date, description: description2, authors, highlight_image, highlight_caption }, path }) => {
    return `
              <div class="${"border-primary-100 hover:border-white shadow-sm hover:shadow-md rounded-sm w-64 sm:w-72 lg:w-96 h-64 sm:h-72 lg:h-96 mb-8 sm:mb-12 lg:mb-16"}"><div class="${"bg-primary-100"}"><a sveltekit:prefetch${add_attribute("href", "research/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"bg-cover bg-no-repeat bg-center h-64 sm:h-72 lg:h-96 flex flex-wrap content-end"}"${add_attribute("style", "background-image: url(images/" + highlight_image + ");", 0)}><div class="${"px-4 py-4 w-64 sm:w-72 lg:w-96 grid grid-rows-1 pb-8 bg-primary-900 bg-opacity-75 hover:bg-primary-800 hover:bg-opacity-50 "}"><div><h2 class="${"text-2xl mt-2 text-white"}">${escape(title2)}</h2>
                          <div class="${"text-sm font-hauser text-white uppercase mt-4"}">${escape(methods.authorString(authors))}</div>
                          <p class="${"text-sm mt-2 text-white"}">${escape(description2)}</p></div>
                        
                      </div></div>
                  </a></div>
              </div>`;
  })}</div>
          <div class="${"mx-auto"}">
            ${featured.items.length > featured.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
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
const Research_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { projects } = $$props;
  if ($$props.projects === void 0 && $$bindings.projects && projects !== void 0)
    $$bindings.projects(projects);
  return `${validate_component(Research, "Research").$$render($$result, { projects }, {}, {})}`;
});
export {
  Research_1 as default,
  load
};
