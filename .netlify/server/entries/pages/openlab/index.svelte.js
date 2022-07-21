import { c as create_ssr_component, a as subscribe, h as set_store_value, v as validate_component, e as escape, d as each, b as add_attribute } from "../../../_app/immutable/chunks/index-85307065.js";
import { p as paginate, P as PaginationNav } from "../../../_app/immutable/chunks/DarkPaginationNav.svelte_svelte_type_style_lang-c211c6b2.js";
import { s as seo } from "../../../_app/immutable/chunks/seo-f675d5d9.js";
import { L as Layout } from "../../../_app/immutable/chunks/pages-b2802677.js";
import { M as Menu } from "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const OpenLab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let future;
  let past;
  let futurePaginated;
  let pastPaginated;
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { layout = "openlab" } = $$props;
  let { title = "Open Lab" } = $$props;
  let { description = "The Intelligent Instruments Lab opens its doors on Friday afternoons, where we present some work we are developing or invite interesting people to talk about their work, in a friendly environment with tea and biscuits." } = $$props;
  let { openlabs } = $$props;
  set_store_value(seo, $seo.title = title, $seo);
  set_store_value(seo, $seo.description = description, $seo);
  set_store_value(seo, $seo.url = "/openlab", $seo);
  let items = openlabs;
  set_store_value(seo, $seo = { title, description }, $seo);
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
  futurePaginated = paginate({
    items: future.items,
    pageSize: future.size,
    currentPage: future.page
  });
  pastPaginated = paginate({
    items: past.items,
    pageSize: past.size,
    currentPage: past.page
  });
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><main class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><article><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title)}</h1>
        <div class="${"mt-4 sm:mt-8 p-2"}">
          <p>Communicating and discussing our research is part of our research methodology. We are interested in a continuous informal conversation with people, in terms of ad-hoc visits to the lab that can result in conversations that become the seeds of new developments. For this reason, we open the doors to our lab on Friday afternoons, where we present some work we are developing or invite interesting people to talk about their work, in a friendly environment with tea and biscuits.</p>
          
          <p>We run a <a href="${"https://discord.gg/Z5HZ5quk"}">public channel</a> on Discord for questions and conversation. There you can find an <a href="${"https://discord.gg/UTFPmHgA"}">Open Lab</a> channel where we announce what is happening and perhaps continue the discussion.</p> 

          <p>Our lab is located in \xDEverholt 11 on the 4th floor. Please pop by at <b>3pm on Fridays</b>. We look forward to seeing you.</p></div>
        <div class="${"mt-2 sm:p-2"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">Upcoming</h2>
          <div class="${"grid grid-flow-row grid-cols-1 sm:grid-cols-2 gap-10"}">${each(futurePaginated, ({ metadata: { edition, theme, date, description: description2, tags }, path }) => {
    return `<div class="${"border-primary-100 hover:border-white border-dashed border-2 shadow-sm hover:shadow-md rounded-sm sm:w-72"}"><div class="${"bg-primary-100 hover:bg-white"}"><a sveltekit:prefetch${add_attribute("href", "openlab/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"px-4 py-4 h-64 grid grid-rows-2"}"><div><h2 class="${"text-2xl mt-2 text-primary-700"}">${escape(theme)}</h2>
                        <p class="${"text-sm mt-4 text-primary-600"}">${escape(description2)}</p></div>
                      <div class="${"self-end grid grid-cols-2 text-primary-500"}"><div class="${"text-sm font-hauser uppercase"}">Open Lab ${escape(edition)}</div>
                        <div class="${"text-sm font-hauser uppercase self-end text-right"}">${escape(methods.dayMonth(date))}</div>
                      </div></div>
                  </a></div>
              </div>`;
  })}</div>
          <div class="${"mx-auto"}">
            ${future.items.length > future.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
    totalItems: future.items.length,
    pageSize: future.size,
    currentPage: future.page,
    limit: 1,
    showStepOptions: true
  }, {}, {})}` : ``}</div></div>
        <div class="${"mt-4 sm:px-2 py-2 mb-12"}"><h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-8"}">Past</h2>
          <hr class="${"border-primary-500 border-dashed border-1"}">
          <div class="${"article-list"}">${each(pastPaginated, ({ metadata: { edition, theme, date, description: description2, tags }, path }) => {
    return `<div class="${"py-2 sm:p-4 hover:bg-primary-300"}"><a sveltekit:prefetch${add_attribute("href", "openlab/" + path.replace(/\.[^/.]+$/, ""), 0)}><div class="${"grid grid-cols-10"}"><div class="${"col-span-10 sm:col-span-8"}"><div class="${"text-xl text-primary-900"}">${escape(theme)}</div>
                      <div class="${"text-md text-primary-800 mt-2"}">${escape(description2)}</div></div>
                    <div class="${"col-span-6 sm:col-span-2 mt-2 mb-2 sm:mt-0 text-xs sm:text-sm sm:text-right font-hauser uppercase text-primary-700"}"><div>Open Lab ${escape(edition)}</div>
                      <div>${escape(methods.dayMonth(date))}</div>
                    </div></div>
                </a></div>
              <hr class="${"border-primary-500 border-dashed border-1"}">`;
  })}</div>
          <div class="${"mx-auto"}">${past.items.length > past.size ? `${validate_component(PaginationNav, "PaginationNav").$$render($$result, {
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
const Openlab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { openlabs } = $$props;
  if ($$props.openlabs === void 0 && $$bindings.openlabs && openlabs !== void 0)
    $$bindings.openlabs(openlabs);
  return `${validate_component(OpenLab, "OpenLab").$$render($$result, { openlabs }, {}, {})}`;
});
export {
  Openlab as default,
  load
};
