import { c as create_ssr_component, a as subscribe, h as set_store_value, v as validate_component, e as escape } from "./index-85307065.js";
import { s as seo } from "./seo-f675d5d9.js";
import { L as Layout } from "./pages-b2802677.js";
import { M as Menu } from "./Menu-d2b189d9.js";
const NewsItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { title } = $$props;
  let { description } = $$props;
  let { layout } = $$props;
  let { date } = $$props;
  set_store_value(seo, $seo.title = title, $seo);
  set_store_value(seo, $seo.description = description, $seo);
  set_store_value(seo, $seo.url = "/news", $seo);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0)
    $$bindings.date(date);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/news"}">${escape("<-")} Back to News</a></div>
    
    <div class="${"px-10 sm:px-12 md:px-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mt-2 mb-2 sm:mb-4"}">${escape(title)}</h1>
      <div class="${"px-2 sm:px-4 pt-4 pb-2 sm:pb-0 font-hauser uppercase text-sm sm:text-md text-primary-700 "}">${escape(description)}<br>${escape(new Date(date).toDateString())}</div>
      <div class="${"p-2 sm:p-4"}">${slots.default ? slots.default({}) : ``}</div></div>
    <div class="${"p-4 sm:p-6 mt-2 font-hauser uppercase text-md sm:text-lg text-white"}"><a href="${"/news"}">${escape("<-")} Back to News</a></div></div>`}`;
});
export {
  NewsItem as N
};
