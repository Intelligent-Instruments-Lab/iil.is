import { c as create_ssr_component, a as subscribe, h as set_store_value, v as validate_component, e as escape, d as each, b as add_attribute } from "../../../_app/immutable/chunks/index-85307065.js";
import { p as paginate, P as PaginationNav } from "../../../_app/immutable/chunks/DarkPaginationNav.svelte_svelte_type_style_lang-c211c6b2.js";
import { s as seo } from "../../../_app/immutable/chunks/seo-f675d5d9.js";
import { L as Layout } from "../../../_app/immutable/chunks/pages-b2802677.js";
import { M as Menu } from "../../../_app/immutable/chunks/Menu-d2b189d9.js";
let title = "News";
let description = "News about the Intelligent Instruments Lab";
const News = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let featured;
  let all;
  let featuredPaginated;
  let allPaginated;
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { items } = $$props;
  set_store_value(seo, $seo.title = title, $seo);
  set_store_value(seo, $seo.description = description, $seo);
  set_store_value(seo, $seo.url = "/news", $seo);
  const methods = {
    dayMonth: (d) => {
      d = new Date(d);
      const options = { month: "short", day: "numeric" };
      return d.toLocaleDateString("en-US", options);
    },
    dateString: (d) => {
      return new Date(d).toDateString().slice(-11);
    }
  };
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  featured = {
    size: 2,
    page: 1,
    items: items.filter((i) => i.metadata.featured === true).sort((fst, snd) => new Date(fst.metadata.date) - new Date(snd.metadata.date)).reverse()
  };
  all = {
    size: 4,
    page: 1,
    items: items.sort((fst, snd) => new Date(fst.metadata.date) - new Date(snd.metadata.date)).reverse()
  };
  featuredPaginated = paginate({
    items: featured.items,
    pageSize: featured.size,
    currentPage: featured.page
  });
  allPaginated = paginate({
    items: all.items,
    pageSize: all.size,
    currentPage: all.page
  });
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><main class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><article><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title)}</h1>
        <div class="${"mt-4 sm:mt-8 p-2"}"><p>Here you will find the latest news about the lab.</p></div>
        <div class="${"mt-2 sm:p-2"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">Featured</h2>
          <div class="${"grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-10"}">${each(featuredPaginated, ({ metadata: { title: title2, date, description: description2 }, path }) => {
    return `<div class="${"border-primary-100 hover:border-white border-dashed border-2 shadow-sm hover:shadow-md rounded-sm sm:w-72"}"><div class="${"bg-primary-100 hover:bg-white"}"><a sveltekit:prefetch${add_attribute("href", "news/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"px-4 py-4 h-64 grid grid-rows-2"}"><div><h2 class="${"text-2xl mt-2 text-primary-700"}">${escape(title2)}</h2>
                        <p class="${"text-sm mt-4 text-primary-600"}">${escape(description2)}</p></div>
                      <div class="${"self-end grid grid-cols-1 text-primary-500"}">
                        <div class="${"text-sm font-hauser uppercase self-end text-right"}">${escape(methods.dayMonth(date))}</div>
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
        <div class="${"mt-4 sm:px-2 py-2 mb-12"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">All News</h2>
          <hr class="${"border-primary-500 border-dashed border-1"}">
          <div class="${"article-list"}">${each(allPaginated, ({ metadata: { title: title2, date, description: description2, tags }, path }) => {
    return `<div class="${"py-2 sm:p-4 hover:bg-primary-300"}"><a sveltekit:prefetch${add_attribute("href", "news/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"grid grid-cols-10"}"><div class="${"col-span-10 sm:col-span-8"}"><div class="${"text-xl text-primary-900"}">${escape(title2)}</div>
                      <div class="${"text-md text-primary-800 mt-2"}">${escape(description2)}</div></div>
                    <div class="${"col-span-6 sm:col-span-2 mt-2 mb-2 sm:mt-0 text-xs sm:text-sm sm:text-right font-hauser uppercase text-primary-700"}"><div>${escape(methods.dayMonth(date))}</div>
                    </div></div>
                </a></div>
              <hr class="${"border-primary-500 border-dashed border-1"}">`;
  })}</div>
          <div class="${"mx-auto"}">${all.items.length > all.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems: all.items.length,
    pageSize: all.size,
    currentPage: all.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div></article></main></div>`}`;
});
async function load({ fetch }) {
  const res = await fetch(`/news/items.json`);
  const items = await res.json();
  return { props: { items } };
}
const News_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { items } = $$props;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  return `${validate_component(News, "News").$$render($$result, { items }, {}, {})}`;
});
export {
  News_1 as default,
  load
};
