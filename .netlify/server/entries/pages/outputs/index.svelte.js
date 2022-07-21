import { c as create_ssr_component, e as escape, a as subscribe, h as set_store_value, b as add_attribute, v as validate_component, d as each } from "../../../_app/immutable/chunks/index-85307065.js";
import { s as seo } from "../../../_app/immutable/chunks/seo-f675d5d9.js";
import { L as Layout } from "../../../_app/immutable/chunks/pages-b2802677.js";
import { M as Menu } from "../../../_app/immutable/chunks/Menu-d2b189d9.js";
import * as bibtex from "bibtex";
const Publication = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pub } = $$props;
  const field = (f) => bibtex.normalizeFieldValue(pub.getField(f));
  if ($$props.pub === void 0 && $$bindings.pub && pub !== void 0)
    $$bindings.pub(pub);
  return `<div><p>${pub.type === "inproceedings" ? `${escape(field("AUTHOR"))}. 
      <i>${escape(field("TITLE"))}.</i> 
      ${escape(field("BOOKTITLE"))}. 
      ${escape(field("YEAR"))}.` : `${pub.type === "article" ? `${escape(field("AUTHOR"))}. 
      <i>${escape(field("TITLE"))}.</i> 
      ${escape(field("JOURNAL"))}. 
      ${escape(field("YEAR"))}.` : `${pub.type === "book" ? `${escape(field("AUTHOR"))}. 
      <i>${escape(field("TITLE"))}.</i>
      ${escape(field("YEAR"))}.` : ``}`}`}</p></div>`;
});
let title = "Outputs";
let description = "This page contains outputs from the Intelligent Instruments Lab.";
const Outputs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $Layout, $$unsubscribe_Layout;
  let $seo, $$unsubscribe_seo;
  $$unsubscribe_Layout = subscribe(Layout, (value) => $Layout = value);
  $$unsubscribe_seo = subscribe(seo, (value) => $seo = value);
  let { layout } = $$props;
  let { publications } = $$props;
  const bib = Object.values(bibtex.parseBibFile(publications).entries$);
  set_store_value(seo, $seo.title = title, $seo);
  set_store_value(seo, $seo.description = description, $seo);
  set_store_value(seo, $seo.url = "/outputs", $seo);
  if ($$props.layout === void 0 && $$bindings.layout && layout !== void 0)
    $$bindings.layout(layout);
  if ($$props.publications === void 0 && $$bindings.publications && publications !== void 0)
    $$bindings.publications(publications);
  $$unsubscribe_Layout();
  $$unsubscribe_seo();
  return `



${$$result.head += `${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="${"description"}"${add_attribute("content", description, 0)} data-svelte="svelte-1law5hj">`, ""}

${$Layout.menu ? `${validate_component(Menu, "Menu").$$render($$result, {}, {}, {})}` : `<div class="${"bg-primary border-dashed border-secondary border-4"}"><div class="${"p-10 sm:p-12 md:p-14 max-w-3xl"}"><h1 class="${"font-hauser text-secondary text-4xl sm:text-5xl md:text-6xl mb-4"}">${escape(title)}</h1>
      <div class="${"p-2 sm:p-4"}"><p>${escape(description)}</p>
        
        <div class="${"h-6"}"></div>
        <h2 class="${"font-hauser text-secondary text-2xl sm:text-3xl md:text-4xl mb-4"}">Publications
        </h2>
        ${each(bib, (entry) => {
    return `${validate_component(Publication, "Publication").$$render($$result, { pub: entry }, {}, {})}`;
  })}</div></div></div>`}`;
});
async function load({ fetch }) {
  const res = await fetch(`/publications.bib`);
  const publications = await res.text();
  return { props: { publications } };
}
const Outputs_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { publications } = $$props;
  if ($$props.publications === void 0 && $$bindings.publications && publications !== void 0)
    $$bindings.publications(publications);
  return `${validate_component(Outputs, "Outputs").$$render($$result, { publications }, {}, {})}`;
});
export {
  Outputs_1 as default,
  load
};
