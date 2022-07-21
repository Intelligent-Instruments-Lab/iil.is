import { c as create_ssr_component, v as validate_component } from "../../../_app/immutable/chunks/index-85307065.js";
import { O as OpenLabEvent } from "../../../_app/immutable/chunks/OpenLabEvent-63ba4b85.js";
import "../../../_app/immutable/chunks/seo-f675d5d9.js";
import "../../../_app/immutable/chunks/pages-b2802677.js";
import "../../../_app/immutable/chunks/Menu-d2b189d9.js";
const metadata = {
  "layout": "openlab",
  "edition": 20,
  "theme": "Living Algorithm x Raflost.",
  "description": "Outcomes of the first IIL 2022 concert series workshops.",
  "date": "2022-05-20"
};
const _20 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(OpenLabEvent, "Layout_MDSVEX_DEFAULT").$$render($$result, Object.assign($$props, metadata), {}, {
    default: () => {
      return `<p>In this Open Lab, participants of the <a href="${"https://iil.is/news/living-algorithms"}">Living Algorithms</a> will reflect on their experiences of learning live coding, and we will have the organisers of Raflost festival visiting.</p>`;
    }
  })}`;
});
export {
  _20 as default,
  metadata
};
