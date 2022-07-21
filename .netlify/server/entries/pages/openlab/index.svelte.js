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
  default: () => Openlab,
  load: () => load
});
module.exports = __toCommonJS(stdin_exports);
var import_index_85307065 = require("../../../_app/immutable/chunks/index-85307065.js");
var import_DarkPaginationNav_svelte_svelte_type_style_lang_c211c6b2 = require("../../../_app/immutable/chunks/DarkPaginationNav.svelte_svelte_type_style_lang-c211c6b2.js");
var import_seo_f675d5d9 = require("../../../_app/immutable/chunks/seo-f675d5d9.js");
var import_pages_b2802677 = require("../../../_app/immutable/chunks/pages-b2802677.js");
var import_Menu_d2b189d9 = require("../../../_app/immutable/chunks/Menu-d2b189d9.js");
const OpenLab = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let future;
  let past;
  let futurePaginated;
  let pastPaginated;
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = (0, import_index_85307065.a)(import_pages_b2802677.L, (value) => $Layout = value);
  $$unsubscribe_seo = (0, import_index_85307065.a)(import_seo_f675d5d9.s, (value) => $seo = value);
  let { layout = "openlab" } = $$props;
  let { title = "Open Lab" } = $$props;
  let { description = "The Intelligent Instruments Lab opens its doors on Friday afternoons, where we present some work we are developing or invite interesting people to talk about their work, in a friendly environment with tea and biscuits." } = $$props;
  let { openlabs } = $$props;
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.title = title, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.description = description, $seo);
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo.url = "/openlab", $seo);
  let items = openlabs;
  (0, import_index_85307065.h)(import_seo_f675d5d9.s, $seo = { title, description }, $seo);
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
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.openlabs === void 0 && $$bindings.openlabs && openlabs !== void 0)
    $$bindings.openlabs(openlabs);
  future = {
    size: 100,
    page: 1,
    items: items.filter((i) => new Date(i.metadata.date) > new Date()).sort((fst, snd) => fst.metadata.edition - snd.metadata.edition)
  };
  past = {
    size: 4,
    page: 1,
    items: items.filter((i) => new Date(i.metadata.date) < new Date()).sort((fst, snd) => fst.metadata.edition - snd.metadata.edition).reverse()
  };
  futurePaginated = (0, import_DarkPaginationNav_svelte_svelte_type_style_lang_c211c6b2.p)({
    items: future.items,
    pageSize: future.size,
    currentPage: future.page
  });
  pastPaginated = (0, import_DarkPaginationNav_svelte_svelte_type_style_lang_c211c6b2.p)({
    items: past.items,
    pageSize: past.size,
    currentPage: past.page
  });
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${(0, import_index_85307065.v)(import_Menu_d2b189d9.M, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><main class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><article><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${(0, import_index_85307065.e)(title)}</h1>
        <div class="${"mt-4 sm:mt-8 p-2"}">
          <p>Communicating and discussing our research is part of our research methodology. We are interested in a continuous informal conversation with people, in terms of ad-hoc visits to the lab that can result in conversations that become the seeds of new developments. For this reason, we open the doors to our lab on Friday afternoons, where we present some work we are developing or invite interesting people to talk about their work, in a friendly environment with tea and biscuits.</p>
          
          <p>We run a <a href="${"https://discord.gg/Z5HZ5quk"}">public channel</a> on Discord for questions and conversation. There you can find an <a href="${"https://discord.gg/UTFPmHgA"}">Open Lab</a> channel where we announce what is happening and perhaps continue the discussion.</p> 

          <p>Our lab is located in \xDEverholt 11 on the 4th floor. Please pop by at <b>3pm on Fridays</b>. We look forward to seeing you.</p></div>
        <div class="${"mt-2 sm:p-2"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">Upcoming</h2>
          <div class="${"grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-10"}">${(0, import_index_85307065.d)(futurePaginated, ({ metadata: { edition, theme, date, description: description2, tags }, path }) => {
    return `<div class="${"border-primary-100 hover:border-white border-dashed border-2 shadow-sm hover:shadow-md rounded-sm sm:w-72"}"><div class="${"bg-primary-100 hover:bg-white"}"><a sveltekit:prefetch${(0, import_index_85307065.b)("href", "openlab/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"px-4 py-4 h-64 grid grid-rows-2"}"><div><h2 class="${"text-2xl mt-2 text-primary-700"}">${(0, import_index_85307065.e)(theme)}</h2>
                        <p class="${"text-sm mt-4 text-primary-600"}">${(0, import_index_85307065.e)(description2)}</p></div>
                      <div class="${"self-end grid grid-cols-2 text-primary-500"}"><div class="${"text-sm font-hauser uppercase"}">Open Lab ${(0, import_index_85307065.e)(edition)}</div>
                        <div class="${"text-sm font-hauser uppercase self-end text-right"}">${(0, import_index_85307065.e)(methods.dayMonth(date))}</div>
                      </div></div>
                  </a></div>
              </div>`;
  })}</div>
          <div class="${"mx-auto"}">
            ${future.items.length > future.size ? `${(0, import_index_85307065.v)(import_DarkPaginationNav_svelte_svelte_type_style_lang_c211c6b2.P, "PaginationNav").$$render($$result, {
    totalItems: future.items.length,
    pageSize: future.size,
    currentPage: future.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div>
        <div class="${"mt-4 sm:px-2 py-2 mb-12"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">Past</h2>
          <hr class="${"border-primary-500 border-dashed border-1"}">
          <div class="${"article-list"}">${(0, import_index_85307065.d)(pastPaginated, ({ metadata: { edition, theme, date, description: description2, tags }, path }) => {
    return `<div class="${"py-2 sm:p-4 hover:bg-primary-300"}"><a sveltekit:prefetch${(0, import_index_85307065.b)("href", "openlab/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"grid grid-cols-10"}"><div class="${"col-span-10 sm:col-span-8"}"><div class="${"text-xl text-primary-900"}">${(0, import_index_85307065.e)(theme)}</div>
                      <div class="${"text-md text-primary-800 mt-2"}">${(0, import_index_85307065.e)(description2)}</div></div>
                    <div class="${"col-span-6 sm:col-span-2 mt-2 mb-2 sm:mt-0 text-xs sm:text-sm sm:text-right font-hauser uppercase text-primary-700"}"><div>Open Lab ${(0, import_index_85307065.e)(edition)}</div>
                      <div>${(0, import_index_85307065.e)(methods.dayMonth(date))}</div>
                    </div></div>
                </a></div>
              <hr class="${"border-primary-500 border-dashed border-1"}">`;
  })}</div>
          <div class="${"mx-auto"}">${past.items.length > past.size ? `${(0, import_index_85307065.v)(import_DarkPaginationNav_svelte_svelte_type_style_lang_c211c6b2.P, "PaginationNav").$$render($$result, {
    totalItems: past.items.length,
    pageSize: past.size,
    currentPage: past.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div></article></main></div>`}`;
});
async function load({ fetch }) {
  const res = await fetch(`/openlab/openlabs.json`);
  const openlabs = await res.json();
  return { props: { openlabs } };
}
const Openlab = (0, import_index_85307065.c)(($$result, $$props, $$bindings, slots) => {
  let { openlabs } = $$props;
  if ($$props.openlabs === void 0 && $$bindings.openlabs && openlabs !== void 0)
    $$bindings.openlabs(openlabs);
  return `${(0, import_index_85307065.v)(OpenLab, "OpenLab").$$render($$result, { openlabs }, {}, {})}`;
});
